import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as SurveyQuestionStore from '../../../store/SurveyQuestion';
import TextInput from '../../common/TextInput';
import * as CodeStore from '../../../store/Code';
import * as LayoutStore from '../../../store/Layout';
import BackButton from '../../common/BackButton';
import Alert from '../../common/Alert';
import ErrorSummary from '../../common/ErrorSummary';
import { defaults } from '../../../utils/Global';
import Loading from '../../common/Loading';
import QuestionTypeControl from '../QuestionTypeControl';
import { questionTypesWithCodesArray, Codes } from '../../../store/Code';
import Question from '../Question';
import SaveButton from '../../common/SaveButton';
import YesNo from '../../common/YesNo';

type QuestionCreateProps = {
    codes: Codes
}
    & typeof CodeStore.actionCreators
    & typeof SurveyQuestionStore.actionCreators
    & RouteComponentProps<{}>;

class QuestionCreate extends React.Component<QuestionCreateProps, {}> {

    state = {
        question: {
            uid: defaults.string,
            questionId: defaults.guid,
            legacyId: defaults.number.toString(),
            questionType: defaults.string,
            choices: [] as any,
            codeType: defaults.string,
            questionText: defaults.string,
            mappingValue: defaults.string,
            saveToBank: defaults.boolean,
            hasBeenAnswered: defaults.boolean
        },
        errors: {} as any,
        saveSuccessful: defaults.boolean,
        isLoading: defaults.boolean,
        answers: {} as any
    };
    questionIsDirty = defaults.boolean;
    constructor(props: QuestionCreateProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this);
        this.onSave = this.onSave.bind(this);
		      this.onAnswerChange = this.onAnswerChange.bind(this);
		      this.onSaveQuestionToggle = this.onSaveQuestionToggle.bind(this);
    }

    public componentWillReceiveProps(newProps: QuestionCreateProps) {
        if (this.questionIsDirty && !this.state.saveSuccessful) {
            const newState = Object.assign({}, this.state);
            newState.question.choices = newProps.codes.QUESTION_CHOICES;
            this.setState(newState);
        }
    }

    public componentDidMount() {
        document.title = defaults.titles.CreateQuestion;
    }

    public render() {
        const { history, loadDropdown, codes } = this.props;
        const { errors, question, isLoading, saveSuccessful, answers } = this.state;
        const { questionTextInput, objectMappingValueInput } = defaults.inputs.textInputs;
        const { layoutItemType } = LayoutStore;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <h1>Create Question</h1>

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
								inputRef={(input: any) => { }}
								isReadOnly={false}
								error={errors[questionTextInput.name]}
							/>
							<TextInput
								cols={12}
								label={objectMappingValueInput.label}
								hideLabel={false}
								name={objectMappingValueInput.name}
								value={question.mappingValue || defaults.string}
								placeholder={objectMappingValueInput.placeholder}
								onChange={this.onChange}
								inputRef={(input: any) => { }}
								isReadOnly={false}
								error={errors[objectMappingValueInput.name]}
							/>

							<QuestionTypeControl
								history={this.props.history}
								questionType={question.questionType}
								codeType={question.codeType}
								onChange={this.onDropdownChange}
								errors={errors}
							/>
						</div>
						<div className="col-md-4">
							{/*<YesNo
								name={"saveToBank"}
								label={"Save Question to Bank?"}
								value={question.saveToBank ? "YES" : "NO"}
								hideLabel={false}
								onChange={this.onSaveQuestionToggle}
							/>*/}
						</div>
						<div className="col-md-4" style={{ textAlign: 'center' }}>
							{(Object.keys(errors).length > 0) &&
								<ErrorSummary
									errors={errors}
								/>
							}
							{saveSuccessful &&
								<Alert alertType="success">
								{'Question saved!'}
								</Alert>
							}
						</div>
					</div>
		<hr/>

            <div className="col-md-6" style={{ 'padding': 0 }}>
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
                            groupAccess: []
                        }
                    }
                    answers={answers}
                    onAnswerChanged={this.onAnswerChange}
                    smallViewport={true}
                />
			</div>
			<h1>
				<BackButton
					goBack={history.goBack}
					className="btn-space-right"
				/>
				<SaveButton onClick={this.onSave} />
			</h1>

        </div>;
    }

    private resetFields() {
        let newState = Object.assign({}, this.state);
        newState.question.codeType = defaults.string;
        newState.question.choices = [] as any;
        this.setState(newState);
    }

    private onAnswerChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
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

    private getDescription(array: CodeStore.DropdownCode[], value: string): string {
        return value !== defaults.string && array ? array.filter(code => code.code == value)[0].description : defaults.string;
    }

    private onChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        (newState.question as any)[name] = newValue;
        this.setState(newState);
    }

    private onSave(event: any) {
        const layoutId = (this.props.match.params as any).layoutId;
        event.preventDefault();
        this.setState({ isLoading: true });
        (this.props.saveQuestion(this.state.question) as any)
            .then((res: any) => {
                let newState = Object.assign({}, this.state);
                newState.saveSuccessful = true;
                newState.question = res;
                newState.isLoading = false;
                newState.errors = {} as any;
                this.setState(newState);
                this.props.history.push(`${defaults.urls.questionManagerUrl}${layoutId ? `/${layoutId}` : ''}`);
            })
            .catch((errors: any) => this.setState({ errors, isLoading: false }));
	}

	private onSaveQuestionToggle() {
		const newState = Object.assign({}, this.state);
		newState.question.saveToBank = !this.state.question.saveToBank;
		this.setState(newState);
	}
}
export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes
        };
    },
    Object.assign(SurveyQuestionStore.actionCreators, CodeStore.actionCreators)
)(QuestionCreate);
