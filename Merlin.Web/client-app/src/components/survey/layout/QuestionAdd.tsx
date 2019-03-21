import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as SurveyQuestionStore from '../../../store/SurveyQuestion';
import TextInput from '../../common/TextInput';
import * as CodeStore from '../../../store/Code';
import * as LayoutStore from '../../../store/Layout';
import { SurveyState } from '../../../store/Survey';
import Alert from '../../common/Alert';
import ErrorSummary from '../../common/ErrorSummary';
import { defaults } from '../../../utils/Global';
import Loading from '../../common/Loading';
import { questionTypesWithCodesArray } from '../../../store/Code';
import Question from '../Question';
import { PagedList } from '../../../store/SurveySearch';
import QuestionList from './QuestionList';
import { LayoutItem, layoutItemType, Layout } from '../../../store/Layout';
import Dropdown from '../../common/Dropdown';
import { getOptions, isNullOrEmpty } from '../../../utils/UIUtils';
import * as Codes from '../../../store/Code';
import YesNo from '../../common/YesNo';
import { getItemById } from '../../../utils/LayoutUtils';
import AddButton from '../../common/AddButton';
import { ClaimType, Role } from '../../../store/Session';
import { FontSize } from '../../../utils/Global';
import Secure from '../../common/Secure';

type QuestionAddProps = {
    subText?: string;
    questions?: PagedList<SurveyQuestionStore.Question>;
    requestQuestions?: any;
    history?: any;
    isInManageMode?: boolean;
    survey?: SurveyState;
    layout?: Layout;
    addQuestion?: (parentId: string, item: LayoutItem) => void;
    parentId?: string;
    layoutId?: string;
} & typeof Codes.actionCreators
    & Codes.CodeState
    & typeof SurveyQuestionStore.actionCreators;

class QuestionAdd extends React.Component<QuestionAddProps, {}> {

    state = {
        question: {
            uid: defaults.guid,
            questionId: defaults.string,
            legacyId: defaults.number.toString(),
            questionType: defaults.string,
            choices: [] as any,
            codeType: defaults.string,
            questionText: defaults.string,
            saveToBank: defaults.boolean,
            hasBeenAnswered: defaults.boolean

        },
        errors: {} as any,
        saveMessage: defaults.boolean,
        saveTimeout: defaults.number,
        isLoading: defaults.boolean,
        answers: {} as any
    };
    questionIsDirty = defaults.boolean;
    timeout = defaults.NULL;
    constructor(props: QuestionAddProps) {
        super(props);
        this.resetForm = this.resetForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.canAddQuestion = this.canAddQuestion.bind(this);
        this.onAddNewQuestion = this.onAddNewQuestion.bind(this);
        this.onAddQuestionToLayout = this.onAddQuestionToLayout.bind(this);
        this.onSaveQuestionToggle = this.onSaveQuestionToggle.bind(this);
        this.onAnswerChange = this.onAnswerChange.bind(this);
    }

    public async componentWillMount() {
        try {
            this.setState({ isLoading: true });

            await this.props.loadDropdown(CodeStore.CodeType.questionType);
            await this.props.loadDropdown(CodeStore.CodeType.distinctCodeType);

        } catch (e) {
            this.setState({ errors: e });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    public componentWillReceiveProps(nextProps: QuestionAddProps) {
        const newState = Object.assign({}, this.state);
        const { question } = this.state;
        if (question.codeType) {
            const choices = this.props.codes[question.codeType];
            if (choices) {
                newState.question.choices = choices;
                this.setState(newState);
            }
        }
    }

    public performSearch() {
        const { question } = this.state;
        const { history, requestQuestions } = this.props;

        // cancel previous timeout
        this.removeTimeout();
        this.timeout = window.setTimeout(
            () => requestQuestions(question.questionText, 1, history),
            defaults.wait_delay);
    }

    public componentWillUnmount() {
        clearTimeout(this.state.saveTimeout);
        this.removeTimeout();
    }

    public render() {
        const { history, questions, requestQuestions, isInManageMode, codes } = this.props;
        const { errors, question, isLoading, saveMessage, answers } = this.state;
        const { questionTextInput, objectMappingValueInput } = defaults.inputs.textInputs;
        const { questionTypeInput, questionCodeTypeInput } = defaults.inputs.dropdowns;
        const { layoutItemType } = LayoutStore;
        const canAdd = question.questionText && question.questionType &&
            ((questionTypesWithCodesArray.indexOf(question.questionType) >= 0) !== isNullOrEmpty(question.codeType));

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <div style={{ 'border': '1px solid gray', padding: '10px' }}>
                <div className="row">
                    <div className="col-md-8">
                        <TextInput
                            cols={12}
                            label={questionTextInput.label}
                            hideLabel={false}
                            name={questionTextInput.name}
                            value={question.questionText || defaults.string}
                            placeholder={questionTextInput.placeholder}
                            onChange={this.onChange}
                            inputRef={(input) => { }}
                            isReadOnly={false}
                            autoFocus={true}
                            error={errors[questionTextInput.name]}
                        />
                        {(Object.keys(errors).length > 0) &&
                            <ErrorSummary
                                errors={errors}
                            />
                        }
                        {saveMessage &&
                            <Alert alertType="success">
                                {saveMessage}
                            </Alert>
                        }
                    </div>
                    <div className="col-md-3">
                        <Secure requireClaim={ClaimType.role} requireClaimValue={[Role.Admin]}>
                            <YesNo
                                name={'saveToBank'}
                                label={'Save question to bank?'}
                                value={question.saveToBank ? 'YES' : 'NO'}
                                hideLabel={false}
                                onChange={this.onSaveQuestionToggle}
                            />
                        </Secure>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" >

                        <Dropdown
                            cols={12}
                            label={questionTypeInput.label}
                            hideLabel={false}
                            name={questionTypeInput.name}
                            value={question.questionType}
                            options={getOptions(codes.SURVEY_ANSWER_TYPE)}
                            placeholder={questionTypeInput.placeholder}
                            onChange={this.onChange}
                            isMulti={false}
                            error={errors[questionTypeInput.name]}
                        />
                    </div>
                    <div className="col-md-8 ">
                        {(question.questionType != defaults.string &&
                            questionTypesWithCodesArray.indexOf(question.questionType) >= 0) &&
                            <Dropdown
                                cols={12}
                                label={questionCodeTypeInput.label}
                                hideLabel={false}
                                name={questionCodeTypeInput.name}
                                value={question.codeType}
                                options={this.getOptions(codes.SYSTEM)}
                                placeholder={questionCodeTypeInput.placeholder}
                                onChange={this.onChange}
                                isMulti={false}
                                error={errors[questionCodeTypeInput.name]}
                            />
                        }
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 order-first">
                        <h4>Preview</h4>
                        <hr />

                        <Question
                            item={
                                {
                                    id: question.questionId,
                                    questionType: question.questionType,
                                    text: question.questionText,
                                    width: 12,
                                    type: layoutItemType.question,
                                    choices: question.choices || [],
                                    activation: defaults.activation,
                                    validations: defaults.validations,
                                    groupAccess: []
                                }
                            }
                            answers={answers}
                            onAnswerChanged={this.onAnswerChange}
                            smallViewport={true}
                        />
                    </div>
                    <div className="col-md-4 offset-10">
                        <AddButton onClick={this.onAddNewQuestion} disabled={!canAdd} />
                    </div>
                </div>
            </div>
            <br />
            <h4> Suggested Questions </h4>
            <div className="col-md-12" style={{ 'border': '1px solid gray', padding: '10px' }}>
                <QuestionList
                    questions={questions}
                    subText={question.questionText}
                    onQuestionAdd={this.onAddQuestionToLayout}
                    canAddQuestion={this.canAddQuestion}
                    requestQuestions={requestQuestions}
                    history={history}
                    isLoading={isLoading}
                    maxHeight={'200px'}
                    className={'pagedList smaller-font'}
                    fontSize={FontSize.medium}
                    hideNumbersFound={true}
                />
            </div>
        </div>;
    }

    private resetForm() {
        let newState = Object.assign({}, this.state);
        newState.question.questionText = defaults.string;
        newState.question.codeType = defaults.string;
        newState.question.choices = [] as any;
        newState.question.questionId = defaults.string;
        newState.question.questionType = defaults.string;
        newState.question.uid = defaults.guid;
        newState.question.saveToBank = defaults.boolean;
        this.setState(newState, () => this.performSearch());
    }

    private onAnswerChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
        this.setState(newState);
    }

    private async onChange(name: string, newValue: any) {
        const { questionCodeTypeInput } = defaults.inputs.dropdowns;
        let newState = Object.assign({}, this.state);
        (newState.question as any)[name] = newValue;

        if (name === questionCodeTypeInput.name) {
            await this.props.loadDropdown(newValue);
        }
        this.setState(newState, () => this.performSearch());
    }

    private removeTimeout() {
        if (this.timeout !== defaults.NULL) {
            clearTimeout(this.timeout);
            this.timeout = defaults.NULL;
        }
    }

    private canAddQuestion(questionId: any) {

        const { layout } = this.props;

        if (layout) {
            const item = getItemById(layout, questionId);
            return item === undefined;
        }

        return undefined;
    }

    private onAddQuestionToLayout(question: LayoutStore.LayoutItem) {

        const { addQuestion, parentId, layout } = this.props;

        if (addQuestion) {
            if (layout && parentId) {
                let parentItem = getItemById(layout, parentId);
                question.isNumbered = parentItem ? ((parentItem as LayoutItem).type !== layoutItemType.repeatingQuestionsGroup) : true;
            }

            addQuestion(parentId || '', question);
        }
        this.resetForm();
    }

    private async onAddNewQuestion() {
        this.setState({ isLoading: true });

        try {
            let res = await await (this.props.saveQuestion(this.state.question) as any);
            let newState = Object.assign({}, this.state);
            newState.isLoading = false;
            newState.errors = {} as any;
            this.onAddQuestionToLayout({
                id: res.questionId,
                questionType: res.questionType,
                text: res.questionText,
                width: 12,
                type: layoutItemType.question,
                choices: res.codeType ? this.props.codes[res.codeType] : [],
                isNumbered: true,
                activation: defaults.activation,
                validations: defaults.validations,
                groupAccess: defaults.groupAccess
            });
            this.setState(newState, () => this.showQuestionSaved());

        } catch (errors) {
            this.setState({ errors, isLoading: false });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    private showQuestionSaved() {
        const component = this;

        this.setState({
            saveTimeout: setTimeout(() => {
                component.setState({ saveMessage: defaults.string });
            },                      10000),
            saveMessage: `Question Added !`
        });
    }

    private onSaveQuestionToggle() {
        const newState = Object.assign({}, this.state);
        newState.question.saveToBank = !this.state.question.saveToBank;
        this.setState(newState);
    }

    private getOptions(options: any[]) {
        return options.map(option => {
            return {
                label: `${option.description} - ${option.code}`, value: option.code
            };
        });
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            survey: state.survey,
            questions: state.surveyQuestion.questionList,
            subText: state.surveyQuestion.subText,
            isLoading: state.surveys.isLoading,
            codes: state.codes.codes,
            layout: state.layout.layout,
            session: state.session
        };
    },
    Object.assign({}, Codes.actionCreators, SurveyQuestionStore.actionCreators)
)(QuestionAdd);
