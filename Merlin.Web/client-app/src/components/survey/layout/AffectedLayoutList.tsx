import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as LayoutStore from '../../../store/Layout';

import Loading from '../../common/Loading';
import Pagination from '../../common/Pagination';
import PagedList from '../../common/PagedList';

type AffectedLayoutListProps =
    {
        history?: any,
        questionId: string,
        className: string,
        maxHeight: string,
        noResultsMessage: any
    }
    & LayoutStore.LayoutState
    & typeof LayoutStore.actionCreators;

class AffectedLayoutList extends React.Component<AffectedLayoutListProps, {}> {

    public render() {
        const { affectedLayouts } = this.props;
        return <ul className="list-group">
            {affectedLayouts.list.map((layout, i) =>
                <li className="list-group-item" key={layout.layoutId}>
                    <h4>{layout.layoutName}</h4>
                    <div className="row">
                        <div className="col-xs-9">
                            <p>ID: {layout.layoutId}</p>
                            <p>Name: {layout.layoutName}</p>
                            <p>Last Saved By: {layout.lastSavedBy}</p>
                            <p>Last Save Time: {layout.lastSaveTime}</p>
                        </div>
                    </div>
                </li>
            )
            }
        </ul>;
    }
    private movePage(page: number) {
        const { questionId } = this.props;

        this.props.requestAffectedLayouts(questionId, page, this.props.history);
    }
}

const pagedLayoutList = PagedList(AffectedLayoutList,
                                  'Affected Layouts',
                                  (props: any) => props.isLoading,
                                  (props: any) => props.affectedLayouts.paging,
                                  (props: any) => {
        const { questionId } = props;
        return (page: number) => props.requestAffectedLayouts(questionId, page);
    });

export default connect(
    (state: ApplicationState) => state.layout,
    LayoutStore.actionCreators
)(pagedLayoutList);
