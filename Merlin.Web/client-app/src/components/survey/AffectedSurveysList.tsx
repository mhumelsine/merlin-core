import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as SurveyStore from '../../store/Survey';

import SurveyListItem from './SurveyListItem';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';
import PagedList from '../common/PagedList';

type AffectedSurveyListProps =
    {
        surveyId: string,
        className: string,
        maxHeight: string,
        noResultsMessage: any
    }
    & SurveyStore.SurveyState
    & typeof SurveyStore.actionCreators
    & RouteComponentProps<{}>;

class AffectedSurveyList extends React.Component<AffectedSurveyListProps, {}> {

    public render() {
        const { affectedSurveys } = this.props;

        return <ul className="list-group">
            {affectedSurveys.list.map((survey, i) =>
                <li className="list-group-item">
                    <h4>{survey.name}</h4>
                    <div className="row">
                        <div className="col-xs-9">
                            <p>{survey.description}</p>
                            <p>Effective: {survey.effectiveDate}</p>
                        </div>
                    </div>
                </li>
            )
            }
        </ul>;
    }
    private movePage(page: number) {
        const { surveyId } = this.props;

        this.props.requestAffectedSurveys(surveyId, page, this.props.history);
    }
}

const pagedSurveyList = PagedList(AffectedSurveyList,
                                  'Affected Surveys',
                                  (props: any) => props.isLoading,
                                  (props: any) => props.affectedSurveys.paging,
                                  (props: any) => {
        const { surveyId } = props;
        return (page: number) => props.requestAffectedSurveys(surveyId, page);
    });

export default connect(
    (state: ApplicationState) => state.survey,
    SurveyStore.actionCreators
)(pagedSurveyList);
