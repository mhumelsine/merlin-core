import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as SurveyStore from '../../store/SurveySearch';
import * as CodeStore from '../../store/Code';
import Loading from '../common/Loading';
import SurveyList from './SurveyList';
import SurveySearchForm from './SurveySearchForm';
import { ChangeEvent } from 'react';
import { defaults } from '../../utils/Global';

type SurveySearchProps =
 	SurveyStore.SurveySearchState
	& CodeStore.CodeState
	& typeof CodeStore.actionCreators
	& typeof SurveyStore.actionCreators 
    & RouteComponentProps<{}>;

class SurveySearch extends React.Component<SurveySearchProps, {}> {
    state = {
        name: defaults.string,
        icd9: defaults.string,
        surveyTypes: [defaults.string]
    };

    timeout: number;

    constructor(props: SurveySearchProps) {
        super(props);
        this.state.name = props.name;
        this.state.icd9 = props.icd9;
        this.state.surveyTypes = props.surveyTypes;
        this.timeout = defaults.number;
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    public handleSearch(event: any) {
        event.preventDefault();
        this.performSearch;
    }

    public performSearch() {
        const { surveyTypes, name, icd9 } = this.state;

        //cancel previous timeout
        this.removeTimeout();

        this.timeout = window.setTimeout(
            () => this.props.requestSurveys(surveyTypes, name, icd9, 1, this.props.history),
            defaults.wait_delay);
    }

	public  componentWillMount() {
		const { loadDropdown, requestSurveys } = this.props;

		try {
			loadDropdown(CodeStore.CodeType.surveyType, this.props.history);
			loadDropdown(CodeStore.CodeType.icd9, this.props.history);
			 requestSurveys(this.state.surveyTypes, this.state.name, this.state.icd9, this.props.surveys.paging.page, this.props.history);
		} catch (err) {
			console.log(err);
		}
	}

	public componentDidMount() {
		document.title = defaults.titles.SurveySearchPage;
	}

    public componentWillUnmount() {
        this.removeTimeout();
    }

    private removeTimeout() {

        if (this.timeout !== defaults.NULL) {
            clearTimeout(this.timeout);
            this.timeout = defaults.NULL;
        }
    }

    private onDropdownChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        (newState as any)[name] = newValue;
        this.setState(newState, () => this.performSearch());
    }

    public render() {
        const { codes, isLoading } = this.props
        const { surveyTypes, name, icd9 } = this.state

        if (isLoading) {
            return <Loading />;
        }
		return <div>
			<h1>Survey Search</h1>
            <SurveySearchForm
                surveyTypeCodes={codes.DYN_SURVEY_TYPE}
                icd9Codes={codes.ICD9}
                onChange={this.onDropdownChange}
                name={name}
                surveyTypes={surveyTypes}
                icd9={icd9}
                onSearch={this.handleSearch}
            />
			{ <SurveyList/>
			}
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => Object.assign({}, state.surveys, state.codes),
    Object.assign({}, SurveyStore.actionCreators, CodeStore.actionCreators)
)(SurveySearch);