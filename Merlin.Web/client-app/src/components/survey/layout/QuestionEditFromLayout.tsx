import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { Question as SurveyQuestion, actionCreators as SurveyActions } from '../../../store/SurveyQuestion';
import TextInput from '../../common/TextInput';
import * as CodeStore from '../../../store/Code';
import * as LayoutStore from '../../../store/Layout';
import Alert from '../../common/Alert';
import ErrorSummary from '../../common/ErrorSummary';
import { defaults } from '../../../utils/Global';
import Loading from '../../common/Loading';
import { questionTypesWithCodesArray } from '../../../store/Code';
import Question from '../Question';
import { LayoutItem, layoutItemType, Layout } from '../../../store/Layout';
import Dropdown from '../../common/Dropdown';
import { getOptions, isNullOrEmpty } from '../../../utils/UIUtils';
import * as Codes from '../../../store/Code';
import YesNo from '../../common/YesNo';
import * as LayoutUtils from '../../../utils/LayoutUtils';
import SaveButton from '../../common/SaveButton';

type QuestionEditFromLayoutProps = {
    requestQuestion?: any;
    history?: any;
    requestAffectedLayouts?: any;
    requestObjectMappings?: any;
    questionId: string;
    loadDropdown?: any;
    updateQuestion?: any;
    onQuestionSaved?: (parentId: string, item: LayoutItem) => void;
    isInManageMode?: boolean;
    parentId?: string;
    layoutId?: string;
    layout: Layout;
    question: SurveyQuestion,
    codes: CodeStore.Codes
}
    & typeof SurveyActions
    & typeof LayoutStore.actionCreators
    & typeof CodeStore.actionCreators;


class QuestionEditFromLayout extends React.Component<QuestionEditFromLayoutProps> {

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

    constructor(props: QuestionEditFromLayoutProps) {
        super(props);

        this.state.question = props.question;
        this.resetForm = this.resetForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.removeTimeout = this.removeTimeout.bind(this);
        this.onSaveQuestionToLayout = this.onSaveQuestionToLayout.bind(this);
        this.onSaveQuestion = this.onSaveQuestion.bind(this);
        this.showQuestionSaved = this.showQuestionSaved.bind(this);
        this.onEditQuestionToggle = this.onEditQuestionToggle.bind(this);
        this.onAnswerChange = this.onAnswerChange.bind(this);

    }

    async componentWillMount() {
        const {
            questionId,
            history,
            requestQuestion,
            requestAffectedLayouts,
            requestObjectMappings,
            loadDropdown
        } = this.props;

        const {
            questionType,
            distinctCodeType
        } = CodeStore.CodeType;

        try {
            this.setState({ isLoading: true });
            await loadDropdown(questionType);
            await loadDropdown(distinctCodeType);
            await requestQuestion(questionId, history);
            await requestAffectedLayouts(questionId, 1, history);
            await requestObjectMappings(questionId, history);
        } catch (e) {
            this.setState({ errors: e });
        }
        finally {
            this.setState({ isLoading: false });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.state.saveTimeout);
        this.removeTimeout();
    }

    componentWillReceiveProps(newProps: QuestionEditFromLayoutProps) {
        if (newProps.question != this.state.question) {
            const newState = Object.assign({}, this.state);
            newState.question = newProps.question;
            newState.isLoading = defaults.boolean;
            this.setState(newState);
        }
        if (this.questionIsDirty) {
            const newState = Object.assign({}, this.state);
            newState.question.choices = newProps.codes.QUESTION_CHOICES;
            this.setState(newState);
        }
    }

    public render() {
        const { history, requestQuestions, isInManageMode, codes, loadDropdown } = this.props;
        const { errors, question, isLoading, saveMessage, answers } = this.state;
        const { questionTextInput } = defaults.inputs.textInputs;
        const { questionTypeInput, questionCodeTypeInput } = defaults.inputs.dropdowns;
        const { layoutItemType } = LayoutStore;
        const canUpdate = question.questionText && question.questionType &&
            ((questionTypesWithCodesArray.indexOf(question.questionType) >= 0) !== isNullOrEmpty(question.codeType));


        if (isLoading) {
            return <Loading />;
        }

        if (question.hasBeenAnswered) {
            return <Alert alertType="danger">
                {`The question '${question.questionText}' cannot be edited because it has been answered.`}
            </Alert>;
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
                            error={errors[questionTextInput.name]}
                        />
                    </div>
                    <div className="col-md-4" style={{ textAlign: 'center' }}>
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
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-6">
                                <Dropdown
                                    cols={12}
                                    label={questionTypeInput.label}
                                    hideLabel={false}
                                    name={questionTypeInput.name}
                                    value={question.questionType}
                                    options={getOptions(codes.SURVEY_ANSWER_TYPE)}
                                    placeholder={questionTypeInput.placeholder}
                                    onChange={this.onDropdownChange}
                                    isMulti={false}
                                    error={errors[questionTypeInput.name]}
                                />
                            </div>
                            <div className="col-md-6">
                                {(question.questionType != defaults.string &&
                                    questionTypesWithCodesArray.indexOf(question.questionType) >= 0) &&
                                    <Dropdown
                                        cols={12}
                                        label={questionCodeTypeInput.label}
                                        hideLabel={false}
                                        name={questionCodeTypeInput.name}
                                        value={question.codeType}
                                        options={getOptions(codes.SYSTEM)}
                                        placeholder={questionCodeTypeInput.placeholder}
                                        onChange={this.onDropdownChange}
                                        isMulti={false}
                                        error={errors[questionCodeTypeInput.name]}
                                    />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
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
                        </div>
                    </div>
                    <div className="col-md-4">

                        <YesNo
                            name={'saveToBank'}
                            label={'Save Question to Bank?'}
                            value={question.saveToBank ? 'YES' : 'NO'}
                            hideLabel={false}
                            onChange={this.onEditQuestionToggle}
                        />
                        <SaveButton onClick={this.onSaveQuestion} disabled={!canUpdate} />
                    </div>
                </div>
            </div>
        </div>;
    }

    private resetForm() {
        let newState = Object.assign({}, this.state);
        newState.question.codeType = defaults.string;
        newState.question.choices = [] as any;
        this.setState(newState);
    }

    private removeTimeout() {
        if (this.timeout !== defaults.NULL) {
            clearTimeout(this.timeout);
            this.timeout = defaults.NULL;
        }
    }

    private async onDropdownChange(name: string, newValue: any) {
        if (name === defaults.inputs.dropdowns.questionTypeInput.name && (questionTypesWithCodesArray.indexOf(newValue) < 0)) {
            this.resetForm();
        }
        if (name === defaults.inputs.dropdowns.questionCodeTypeInput.name) {
            this.questionIsDirty = true;
            await this.props.loadDropdown(newValue, this.props.history, 'QUESTION_CHOICES');
        }
        this.onChange(name, newValue);
    }

    private onChange(name: string, newValue: any) {
        const newState = Object.assign({}, this.state);
        (newState.question as any)[name] = newValue;
        this.setState(newState);
    }

    private onSaveQuestionToLayout(question: LayoutStore.LayoutItem) {
        const { onQuestionSaved, parentId } = this.props;
        if (onQuestionSaved) {
            onQuestionSaved(parentId || '', question);
        }
    }

    private onSaveQuestion(event: any) {
        event.preventDefault();
        this.setState({ isLoading: true });
        const { question } = this.state;
        const layoutItem = LayoutUtils.getItemById(this.props.layout, question.questionId) as LayoutItem;

        (this.props.updateQuestion(question) as any)
            .then((res: any) => {
                this.onSaveQuestionToLayout({
                    id: question.questionId,
                    questionType: question.questionType,
                    text: question.questionText,
                    width: 12,
                    type: layoutItemType.question,
                    choices: question.choices || [],
                    isNumbered: true,
                    activation: layoutItem.activation,
                    validations: layoutItem.validations,
                    groupAccess: defaults.groupAccess
                });
                this.setState({ errors: {} as any, isLoading: defaults.boolean }, () => { this.showQuestionSaved(); });
            })
            .catch((errors: any) => this.setState({ errors, isLoading: defaults.boolean }));
    }

    private showQuestionSaved() {
        const component = this;

        this.setState({
            saveTimeout: setTimeout(() => {
                component.setState({ saveMessage: defaults.string });
            },                      10000),
            saveMessage: `Question Saved!`
        });
    }

    private onEditQuestionToggle() {
        const newState = Object.assign({}, this.state);
        newState.question.saveToBank = !this.state.question.saveToBank;
        this.setState(newState);
    }

    private onAnswerChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
        this.setState(newState);
    }




}
export default connect(
    (state: ApplicationState) => {
        return {
            survey: state.survey,
            question: state.surveyQuestion.question,
            isLoading: state.surveys.isLoading,
            codes: state.codes.codes,
            affectedLayouts: state.layout.affectedLayouts,
            layout: state.layout.layout
        };
    },
    Object.assign(Codes.actionCreators, SurveyActions, LayoutStore.actionCreators)
)(QuestionEditFromLayout);
