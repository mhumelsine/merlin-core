import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as SurveyQuestionStore from '../../../store/SurveyQuestion';
import * as LayoutStore from '../../../store/Layout';
import Loading from '../../common/Loading';
import QuestionList from './QuestionList';
import QuestionSearchForm from './QuestionSearchForm';
import { ChangeEvent } from 'react';
import Card from '../../common/Card';
import { defaults } from '../../../utils/Global';
import TextInput from '../../common/TextInput';
import { PagedList } from '../../../store/SurveySearch';
import { SurveyState } from '../../../store/Survey';
import * as LayoutUtils from '../../../utils/LayoutUtils';
import * as SurveyStore from '../../../store/Survey';
import { LayoutItem, LayoutState } from '../../../store/Layout';
import * as UIUtils from '../../../utils/UIUtils';

type QuestionSearchProps = {
    subText?: string;
    questions?: PagedList<SurveyQuestionStore.Question>;
    requestQuestions?: any;
    history?: any;
    isInManageMode?: boolean;
    survey?: SurveyState;
    addQuestion?: (parentId: string, item: LayoutItem) => void;
    canAddQuestion?: (questionId: string) => boolean;
    parentId?: string;
    layoutId?: string;
    isLoading?: boolean;
};

class QuestionSearch extends React.Component<QuestionSearchProps, {}> {
    state = {
        subText: defaults.string,
        questions: { list: [], paging: defaults.paging } as PagedList<SurveyQuestionStore.Question>
    };

    timeout: number;
    input: any = undefined;

    constructor(props: QuestionSearchProps) {
        super(props);
        this.timeout = defaults.number;
        this.state.subText = this.props.subText || this.state.subText;
        // this.state.questions = (this.props.questions as any) || this.state.questions;
        this.onQuestionAdd = this.onQuestionAdd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    public componentWillMount() {
        if (!UIUtils.isNullOrEmpty(this.state.subText)) {
            this.performSearch();
        }
    }

    public componentWillReceiveProps(nextProps: QuestionSearchProps) {
        if (nextProps.questions !== this.state.questions) {
            this.setState({ questions: nextProps.questions });
        }


        // if (nextProps.subText !== this.state.subText) {
        //     this.setState({ subText: nextProps.subText });
        // }
    }

    public handleSearch(event: any) {
        event.preventDefault();
        this.performSearch();
    }

    public performSearch() {
        const { subText } = this.state;
        const { history, requestQuestions } = this.props;

        // cancel previous timeout
        this.removeTimeout();
        this.timeout = window.setTimeout(
            () => requestQuestions(subText, 1, history),
            defaults.wait_delay);
    }

    public componentWillUnmount() {
        this.removeTimeout();
    }

    public render() {

        const { subText } = this.state;
        const { questions, requestQuestions, isInManageMode, history, canAddQuestion, layoutId, isLoading } = this.props;

        return <div className="containsPagedList">

            <form className="row searchForm" onSubmit={this.handleSearch}>
                <TextInput
                    cols={12}
                    label="Keywords"
                    hideLabel={true}
                    name="subText"
                    value={subText}
                    placeholder="Enter some keywords"
                    onChange={this.onChange}
                    inputRef={(input: any) => { this.input = input; }}
                />
                {isInManageMode &&
                    <div className="form-group col-sm-12">
					<Link className={`${defaults.theme.buttons.class} btn-space-right`} to={`${defaults.urls.questionCreateUrl}${layoutId ? `/${layoutId}` : ''}`}><FaPlus fontSize={15} style={{ paddingRight: '5px' }}/>Create Question</Link>
                    </div>
                }
            </form>

                <QuestionList
                    questions={questions}
                    subText={subText}
                    onQuestionAdd={this.onQuestionAdd}
                    canAddQuestion={canAddQuestion}
                    requestQuestions={requestQuestions}
                    isInManageMode={isInManageMode}
                    history={history}
                    isLoading={isLoading}
                    className={!isInManageMode ? 'pagedList smaller-font' : 'pagedList'}
                />
        </div>;
    }

    private removeTimeout() {

        if (this.timeout !== defaults.NULL) {
            clearTimeout(this.timeout);
            this.timeout = defaults.NULL;
        }
    }

    private onQuestionAdd(question: LayoutStore.LayoutItem) {

        const { addQuestion, parentId } = this.props;

        if (addQuestion) {
            addQuestion(parentId || '', question);
        }
    }

    private onChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        (newState as any)[name] = newValue;
        this.setState(newState, () => this.performSearch());
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            survey: state.survey,
            questions: state.surveyQuestion.questionList,
            subText: state.surveyQuestion.subText,
            isLoading: state.surveys.isLoading
        };
    },
    SurveyQuestionStore.actionCreators
)(QuestionSearch);
