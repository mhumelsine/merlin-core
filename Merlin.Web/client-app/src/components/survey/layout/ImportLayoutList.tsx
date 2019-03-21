import * as React from 'react';
import { Layout, actionCreators } from '../../../store/Layout';
import * as SurveySearchStore from '../../../store/SurveySearch';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import Loading from '../../common/Loading';
import Alert from '../../common/Alert';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaEdit } from 'react-icons/fa';
import Pagination from '../../common/Pagination';
import PagedList from '../../common/PagedList';
import { defaults } from '../../../utils/Global';

type ImportLayoutListProps = {
    layoutList: SurveySearchStore.PagedList<Layout>
    selectedTags: string[]
    addLayout: (layoutId: string) => void
    canAddLayout: (layoutId: string) => boolean
    className?: any
    maxHeight?: any
} & typeof actionCreators;

class ImportLayoutList extends React.Component<ImportLayoutListProps> {
    state = {
        isLoading: false
    };

    public render() {

        const { isLoading } = this.state;
        const { layoutList } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (layoutList && layoutList.list && layoutList.list.length > 0) {
            return <ul className="list-group">
                {layoutList.list.map(layout => this.createListItem(layout))}
            </ul>;
        }

        return <Alert alertType="warning">
            No layouts found
        </Alert>;
    }

    private movePage(page: number) {
        const { selectedTags } = this.props;

        this.props.loadLayouListFromTags(selectedTags, page);
    }

    private createListItem(layout: any) {
        const { addLayout, canAddLayout } = this.props;
        const disabled = !(canAddLayout && canAddLayout(layout.layoutId));

        return <li key={layout.layoutId} className="list-group-item">
            <h5>
                <div className="d-flex justify-content-sm-between">
                    <span>{layout.layoutName}</span>
                </div>

            </h5>
            <h5>
                Tags:
                {layout.tags && layout.tags.map((tag: string) =>
                    <span key={tag} className="badge badge-pill badge-info ml-1">{tag}</span>)}
            </h5>
            <button id={layout.layoutId} className="btn btn-primary" onClick={() => addLayout(layout.layoutId)} disabled={disabled}>
                Add
            </button>




        </li>;
    }
}

const pagedImportLayoutList = PagedList(ImportLayoutList,
                                        '',
                                        (props: any) => props.isLoading,
                                        (props: any) => props.layoutList.paging || defaults.paging,
                                        (props: any) => {
        const { selectedTags } = props;

        return (page: number) => props.loadLayouListFromTags(selectedTags, page);
    }
);


export default connect(
    (state: ApplicationState) => {
        return {
            layoutList: state.layout.layoutList,
            selectedTags: state.layout.selectedTags
        };
    },
    actionCreators
)(pagedImportLayoutList as typeof ImportLayoutList);
