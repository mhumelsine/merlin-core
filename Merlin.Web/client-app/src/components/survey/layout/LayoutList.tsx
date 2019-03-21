import * as React from 'react';
import { Layout, actionCreators } from '../../../store/Layout';
import * as SurveySearchStore from '../../../store/SurveySearch';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store/index';
import Loading from '../../common/Loading';
import Alert from '../../common/Alert';
import { Link , RouteComponentProps} from 'react-router-dom';
import { FaPlayCircle, FaCopy, FaPlus, FaEdit } from 'react-icons/fa';
import PagedList from '../../common/PagedList';
import { defaults } from '../../../utils/Global';
import CopyExistingLayout from './CopyExistingLayout';
import LayoutSurveyList from './LayoutSurveyList';

type LayoutListProps = {
    layoutList: SurveySearchStore.PagedList<Layout>
    selectedTags: string[]
    className?: any
}
& typeof actionCreators
& RouteComponentProps<{}>;

class LayoutList extends React.Component<LayoutListProps> {
    state = {
        isLoading: false,
        selected: defaults.boolean,
        selectedlayoutId: defaults.string
    };

    constructor(props: LayoutListProps) {
        super(props);

        this.onCopyLayoutClick = this.onCopyLayoutClick.bind(this);
    }

    public render() {

        const { isLoading, selected, selectedlayoutId } = this.state;
        const { layoutList } = this.props;

        if (isLoading) {
            return <Loading />;
		}

        if (layoutList && layoutList.list && layoutList.list.length > 0) {
            return <ul className="list-group">
                {layoutList.list.map(layout => this.createListItem(layout))}
                <CopyExistingLayout
                    toggle={this.onClose.bind(this)}
                    visible={selected}
                    selectedlayoutId={selectedlayoutId}
                />
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

    private onCopyLayoutClick(layoutid: string) {
		this.setState({ selectedlayoutId: layoutid, selected: true });
    }

    private onClose() {
		this.setState({ selectedlayoutId: '', selected: false });
    }

    private createListItem(layout: any) {
        return <li key={layout.layoutId} className="list-group-item">
            <h2>
                <div className="d-flex justify-content-sm-between">
                    <span>{layout.layoutName}</span>
                    <div>
						<Link to={`survey/create/${layout.layoutId}`} className={defaults.theme.buttons.class} >
                            <FaPlus fontSize={defaults.iconSize} />
                            {' '}
                            Create
                        </Link>
                        {' '}
						<button className={defaults.theme.buttons.class}  type="button" onClick={this.onCopyLayoutClick.bind(this, layout.layoutId)}><FaCopy fontSize={defaults.iconSize} />{' '}Copy Layout</button>
                        {' '}
						<Link to={`layout/edit/${layout.layoutId}`} className={defaults.theme.buttons.class} >
                            <FaEdit fontSize={defaults.iconSize} />
                            {' '}
                            Edit
                        </Link>
                        {' '}
						<Link to={`layout/preview/${layout.layoutId}`} className={defaults.theme.buttons.class} >
                            <FaPlayCircle fontSize={defaults.iconSize} />
                            {' '}
                            Preview
                        </Link>
                    </div>
                </div>
            </h2>

            <LayoutSurveyList layout={layout} initiallyCollapsed={true} />

            {layout.tags && layout.tags.map((tag: string) =>
                <span key={tag} className="badge badge-pill badge-info badge-text-100 mr-1">{tag}</span>)}


        </li>;
    }

    private createSurveyItem(survey: any) {

    }
}

const pagedLayoutList = PagedList(LayoutList,
                                  'Layouts',
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
            selectedTags: state.layout.selectedTags,
        };
    },
    actionCreators
)(pagedLayoutList);
