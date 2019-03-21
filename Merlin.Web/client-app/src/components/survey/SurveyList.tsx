import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as SurveyStore from '../../store/SurveySearch';
import PagedList from '../common/PagedList';
import SurveyListItem from './SurveyListItem';
import { FaEdit, FaPlayCircle, FaPlus, FaCopy } from 'react-icons/fa';
import { defaults } from '../../utils/Global'; 
import CopyExistingLayout from './layout/CopyExistingLayout';

type SurveyListProps =  SurveyStore.SurveySearchState
    & typeof SurveyStore.actionCreators
    & RouteComponentProps<{}>;

class SurveyList extends React.Component<SurveyListProps, {}> {

	state = {
		selected: defaults.boolean,
		selectedlayoutId: defaults.string
	}

    private movePage(page: number) {
        const { surveyTypes, name, icd9, history } = this.props;

        this.props.requestSurveys(surveyTypes, name, icd9, page, history);
    }

	private onCopyLayoutClick(layoutid: string) {
		this.setState({ selectedlayoutId: layoutid, selected: true });
	}

	private onClose() {
		this.setState({ selectedlayoutId: '', selected: false });
	}

    public render() {
		const { surveys } = this.props;
		const { selected, selectedlayoutId } = this.state;
		return <ul className="list-group">  
			{surveys.list.map((survey, i) => {
				return <li key={i} className={`list-group-item`} >
					<h2>
						<div className="d-flex flex-row-reverse">
							<div>
								<Link to={`survey/create/${survey.layoutId}`} className={defaults.theme.buttons.class} >
									<FaPlus fontSize={defaults.iconSize} />
									{" "}
									Create
								</Link>
								{" "}
								<button className={defaults.theme.buttons.class} type="button" onClick={this.onCopyLayoutClick.bind(this, survey.layoutId)}>
									<FaCopy fontSize={defaults.iconSize} />{" "}Copy Layout
								</button>
								{" "}
								<Link to={`layout/edit/${survey.layoutId}`} className={`${defaults.theme.buttons.class}`} >
									<FaEdit fontSize={defaults.iconSize} />
									{" "}
									Edit
								</Link>
								{" "}
								<Link to={`layout/preview/${survey.layoutId}`} className={`${defaults.theme.buttons.class} `} >
									<FaPlayCircle fontSize={defaults.iconSize} />
									{" "}
									Preview
								</Link>
							</div>
						</div>
					</h2>
                        <SurveyListItem
                            index={i}
                            survey={survey}
                        />
                    </li>
			})}
			<CopyExistingLayout toggle={this.onClose.bind(this)} visible={selected} selectedlayoutId={selectedlayoutId} />
        </ul>;
    }
}

const pagedSurveyList = PagedList(SurveyList,
    "Surveys",
    (props: any) => props.isLoading,
    (props: any) => props.surveys.paging,
    (props: any) => {
        const { surveyTypes, name, icd9, history } = props;
        return  (page: number) =>  props.requestSurveys(surveyTypes, name, icd9, page, history);
    });

export default connect((state: ApplicationState) => Object.assign({},state.surveys)
,	SurveyStore.actionCreators
)(pagedSurveyList as any);	