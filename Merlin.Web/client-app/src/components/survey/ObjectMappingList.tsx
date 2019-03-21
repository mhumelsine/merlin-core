import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as SurveyQuestionStore from '../../store/SurveyQuestion';
import { FaEdit } from 'react-icons/fa';
import DeleteButton from '../common/DeleteButton';
import EditButton from '../common/EditButton';

type ObjectMappingListProps =
    {
        questionId: string,
        className: string,
        maxHeight: string,
        noResultsMessage: any,
        onEdit: (objectMapping: any) => void,
        onRemove: (objectMapping: any) => void
    }
    & SurveyQuestionStore.SurveyQuestionState
    & typeof SurveyQuestionStore.actionCreators
    & RouteComponentProps<{}>;

class ObjectMappingList extends React.Component<ObjectMappingListProps, {}> {
    private movePage(page: number) {
        const { questionId } = this.props;

        this.props.requestObjectMappings(questionId, this.props.history);
    }

    public render() {
        const { objectMappings, onEdit, onRemove } = this.props;

        return <ul className="list-group">
            {objectMappings.map((objectMapping, i) =>
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-9">
                            <p>Type: {objectMapping.mappingType}</p>
                            <p>Value: {objectMapping.mappingValue}</p>
                        </div>
                        <div className="col-3">
                            <DeleteButton onClick={() => onRemove(objectMapping)} buttonText =""/>
                            <EditButton className="pull-right btn-space-right" onClick={() => onEdit(objectMapping)} buttonText="" />
                        </div>
                    </div>
                </li>
            )
            }
        </ul>;
    }
}

// const pagedObjectMappingList = PagedList(ObjectMappingList,
//     "Current Mappings",
//     (props: any) => props.isLoading,
//     (props: any) => props.objectMappings.paging || defaults.paging,
//     (props: any) => {
//         const { questionId } = props;
//         return (page: number) => props.requestObjectMappings(questionId, page);
//     });

export default connect(
    (state: ApplicationState) => state.surveyQuestion,
    SurveyQuestionStore.actionCreators
)(ObjectMappingList);