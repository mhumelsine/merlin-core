import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import BackButton from '../../common/BackButton';
import * as SurveyQuestionStore from '../../../store/SurveyQuestion';
import { ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import TextInput from '../../common/TextInput';
import Dropdown from '../../common/Dropdown';
import { ChangeEvent } from 'react';
import CustomDatePicker from '../../common/CustomDatePicker';
import Moment from 'moment';
import AffectedLayoutList from './AffectedLayoutList';
import Alert from '../../common/Alert';
import ErrorSummary from '../../common/ErrorSummary';
import { FaCheck } from 'react-icons/fa';
import Loading from '../../common/Loading';
import { defaults } from '../../../utils/Global';
import * as CodeStore from '../../../store/Code'
import * as LayoutStore from '../../../store/Layout';
import QuestionTypeControl from '../QuestionTypeControl';
import { questionTypesWithCodesArray } from '../../../store/Code';
import Question from '../Question';
import ObjectMappingManager from '../ObjectMappingManager';
import SaveButton from '../../common/SaveButton';

type QuestionEditProps =
    SurveyQuestionStore.SurveyQuestionState
    & LayoutStore.LayoutState
    & CodeStore.CodeState
    & typeof SurveyQuestionStore.actionCreators
    & typeof LayoutStore.actionCreators
    & typeof CodeStore.actionCreators
    & RouteComponentProps<{}>;

class QuestionEdit extends React.Component<QuestionEditProps, {}> {
    state = {
        question: {
            uid: defaults.string,
            questionId: defaults.guid,
            legacyId: defaults.number.toString(),
            questionType: defaults.string,
            choices: [] as any,
            codeType: defaults.string,
            questionText: defaults.string,
            saveToBank: defaults.boolean,
            hasBeenAnswered: defaults.boolean
        },
        errors: {} as any,
        saveSuccessful: defaults.boolean,
        isLoading: defaults.boolean,
        answers: {} as any
    };
    input: any = undefined;
    initialLoad: boolean = true;
    questionIsDirty: boolean = defaults.boolean;


    constructor(props: QuestionEditProps) {
        super(props);
        this.state.question = props.question;
        this.onChange = this.onChange.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAnswerChange = this.onAnswerChange.bind(this);
    }

    componentWillMount() {
        try {         
            this.setState({ isLoading: true });
            this.props.requestQuestion((this.props.match.params as any).questionId, this.props.history);
            this.props.requestAffectedLayouts((this.props.match.params as any).questionId, 1, this.props.history);
            this.props.requestObjectMappings((this.props.match.params as any).questionId, this.props.history);
        } catch (e) {
            console.log(e);
        }

    }

    componentWillReceiveProps(newProps: QuestionEditProps) {
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


    private resetFields() {
        let newState = Object.assign({}, this.state);
        newState.question.codeType = defaults.string;
        newState.question.choices = [] as any;
        this.setState(newState);
    }

    private onDropdownChange(name: string, newValue: any) {
        if (name === defaults.inputs.dropdowns.questionTypeInput.name && (questionTypesWithCodesArray.indexOf(newValue) < 0)) {
            this.resetFields();
        }
        if (name === defaults.inputs.dropdowns.questionCodeTypeInput.name) {
            this.questionIsDirty = true;
            this.props.loadDropdown(newValue, this.props.history, 'QUESTION_CHOICES');
        }
        this.onChange(name, newValue);
    }

    private onAnswerChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
        this.setState(newState);
    }

    private getDescription(array: CodeStore.DropdownCode[], value: string): string {
        return value !== defaults.string && array ? array.filter(code => code.code == value)[0]["description"] : defaults.string;
    }

    private onChange(name: string, newValue: any) {
        const newState = Object.assign({}, this.state);
        (newState.question as any)[name] = newValue;
        this.setState(newState);
    }

    private onSave(event: any) {
        event.preventDefault();
        this.setState({ isLoading: true });

        (this.props.updateQuestion(this.state.question) as any)
            .then((res: any) => this.setState({ errors: {} as any, saveSuccessful: true, isLoading: defaults.boolean }))
            .catch((errors: any) => this.setState({ errors, isLoading: defaults.boolean }));
    }

    componentDidUpdate() {
        if (this.input !== undefined && this.initialLoad) {
            this.input.focus();
            this.initialLoad = false;
        }
    }

    public render() {
        const { history, codes, loadDropdown } = this.props
        const { errors, question, isLoading, saveSuccessful, answers } = this.state
        const { } = defaults.inputs.dropdowns
        const { questionTextInput } = defaults.inputs.textInputs
        const { layoutItemType } = LayoutStore
                
        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <h1>Edit Question <span style={{ 'fontSize': '12px', 'whiteSpace': 'nowrap' }}>ID: {question.questionId}</span></h1>
            {question.hasBeenAnswered &&
                <div>
                    <Alert alertType='danger'>
                        {`The question '${question.questionText}' cannot be edited because it has been answered.`}
                    </Alert>
                    <div className="row">
                        <div className="col-md-12">
                            <BackButton
                                goBack={history.goBack}
                                className="btn-space-right"
                            />
                        </div>
                    </div>
                </div>
            }

            {!question.hasBeenAnswered &&
                ((Object.keys(errors).length > 0) &&
                    <ErrorSummary
                        errors={errors}
                    />)
                    }
            {!question.hasBeenAnswered && (saveSuccessful &&
                <Alert alertType="success">
                    {"Question saved!"}
                </Alert>
            )}
            {!question.hasBeenAnswered && (<div className="row">
                <div className="col-md-6">
                    <form>
                        <TextInput
                            cols={12}
                            label={questionTextInput.label}
                            hideLabel={false}
                            name={questionTextInput.name}
                            value={question.questionText || defaults.string}
                            placeholder={questionTextInput.placeholder}
                            onChange={this.onChange}
                            inputRef={(input: any) => { this.input = input }}
                            isReadOnly={false}
                            error={errors[questionTextInput.name]}
                        />
                        <QuestionTypeControl
                            history={this.props.history}
                            questionType={question.questionType}
                            codeType={question.codeType}
                            onChange={this.onDropdownChange}
                            errors={errors}
                        />
                        <div className="form-group col-md-12">
                            <BackButton
                                goBack={history.goBack}
                                className="btn-space-right"
                            />
                            <SaveButton onClick={this.onSave} className={"btn-space-right"}/>
                        </div>
                    </form>
                    <div>
                        <h2>Preview</h2>
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
                                    groupAccess:[]
                                }
                            }
                            answers={answers}
                            onAnswerChanged={this.onAnswerChange}
                            smallViewport={true}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <AffectedLayoutList
                        {...this.props}
                        className="form-group col-sm-12"
                        questionId={question.questionId}
                        maxHeight="400px"
                        noResultsMessage={
                            <Alert alertType="success">
                                <FaCheck /> This question is not being used in any layouts.
                            </Alert>
                        }
                    />
                </div>
                
                <div className="col-md-12">
                    <ObjectMappingManager
                        questionId={question.questionId}
                        questionUid={question.uid}
                        {...this.props}
                    />

                </div>
            </div>)}               

            
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            question: state.surveyQuestion.question
        }
    },
    Object.assign(SurveyQuestionStore.actionCreators, CodeStore.actionCreators, LayoutStore.actionCreators)
)(QuestionEdit);