import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store/index';
import ButtonRadio, { HorizontalButtonRadio } from '../../common/ButtonRadio';
import Dropdown, { HorizontalDropdown } from '../../common/Dropdown';
import Checkbox from '../../common/Checkbox';
import TextInput, { HorizontalTextInput } from '../../common/TextInput';
import { LayoutItem, actionCreators, LayoutItemValidation, LayoutItemState, LayoutQuestionMessageType, LayoutQuestionType, ValidationType, ValidationTypeMessage } from '../../../store/Layout';
import { HorizontalYesNo } from '../../common/YesNo';
import { HorizontalYesNoUnknown } from '../../common/YesNoUnknown';
import { HorizontalTextAreaInput } from '../../common/TextAreaInput';
import { HorizontalCustomDatePicker } from '../../common/CustomDatePicker';
import { HorizontalNumberInput } from '../../common/NumberInput';
import { HorizontalEmailInput } from '../../common/EmailInput';
import { HorizontalPhoneInput } from '../../common/PhoneInput';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

type QuestionValidationProps = {
    question: LayoutItem;
    parentId: string;
} & typeof actionCreators;



class QuestionValidation extends React.Component<QuestionValidationProps> {

    constructor(props: QuestionValidationProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.getValidationTypes = this.getValidationTypes.bind(this);
        this.addValidation = this.addValidation.bind(this);
        this.getValidationLabel = this.getValidationLabel.bind(this);
        this.removeValidation = this.removeValidation.bind(this);
        this.renderQuestionValues = this.renderQuestionValues.bind(this);
        this.onValidationAnswerChange = this.onValidationAnswerChange.bind(this);
    }

    private onChange(name: string, value: any) {
        const { question, saveLayoutItem, parentId } = this.props;
        const property = name.split("-")[0];
        const index = parseInt(name.split("-")[1]);

        const newQuestion = Object.assign({}, question);

        newQuestion.validations = newQuestion.validations.map((item: any, ii) => {
            if (ii === index) {
                item[property] = value;
                return item;
            }
            return item;
        });

        saveLayoutItem(parentId, newQuestion);
    };

    simpleAnswers = [
        ValidationTypeMessage.HasValue as string,
        ValidationTypeMessage.IsNotFutureDate as string,
        ValidationTypeMessage.IsValidDate as string,
        ValidationTypeMessage.InValid as string
    ];

    public getValidationLabel(index: number) {
        const { question } = this.props;

        const questionType = question ? question.questionType : "";

        const operator = question.validations[index].operator;

        switch (operator) {
            case ValidationType.HasValue:
                return ValidationTypeMessage.HasValue;
            case ValidationType.HasSpecificValue:
                return ValidationTypeMessage.HasSpecificValue;
            case ValidationType.MaxLength:
                return ValidationTypeMessage.MaxLength;
            case ValidationType.MatchesPattern:
                return ValidationTypeMessage.MatchesPattern;
            case ValidationType.IsGreaterThan:
                return ValidationTypeMessage.IsGreaterThan;
            case ValidationType.IsLessThan:
                return ValidationTypeMessage.IsLessThan;
            case ValidationType.IsLessThanOrEqualTo:
                return ValidationTypeMessage.IsLessThanOrEqualTo;
            case ValidationType.IsGreaterThanOrEqualTo:
                return ValidationTypeMessage.IsGreaterThanOrEqualTo;
            case ValidationType.IsEqualTo:
                return ValidationTypeMessage.IsEqualTo;
            case ValidationType.IsNotEqualTo:
                return ValidationTypeMessage.IsNotEqualTo;
            case ValidationType.IsNotFutureDate:
                return ValidationTypeMessage.IsNotFutureDate;
            case ValidationType.IsValidDate:
                return ValidationTypeMessage.IsValidDate;
            default:
                return ValidationTypeMessage.InValid;
        }
    }

    private getValidationTypes() {
        const { question } = this.props;

        const questionType = question ? question.questionType : "";

        switch (questionType) {
            case LayoutQuestionType.Dropdown:
            case LayoutQuestionType.YesNo:
            case LayoutQuestionType.YesNoUnknown:
            case LayoutQuestionType.Radio:
                return [
                    { label: ValidationType.HasValue, value: ValidationType.HasValue },
                    { label: ValidationType.HasSpecificValue, value: ValidationType.HasSpecificValue }
                ]
            case LayoutQuestionType.Text:
            case LayoutQuestionType.Email:
            case LayoutQuestionType.Phone:
            case LayoutQuestionType.Multi_Line_Text:
                return [
                    { label: ValidationType.HasValue, value: ValidationType.HasValue },
                    { label: ValidationType.MaxLength, value: ValidationType.MaxLength },
                    { label: ValidationType.MatchesPattern, value: ValidationType.MatchesPattern }
                ]

            case LayoutQuestionType.Number:
                return [
                    { label: ValidationType.IsGreaterThan, value: ValidationType.IsGreaterThan },
                    { label: ValidationType.IsLessThan, value: ValidationType.IsLessThan },
                    { label: ValidationType.IsLessThanOrEqualTo, value: ValidationType.IsLessThanOrEqualTo },
                    { label: ValidationType.IsGreaterThanOrEqualTo, value: ValidationType.IsGreaterThanOrEqualTo },
                    { label: ValidationType.IsEqualTo, value: ValidationType.IsEqualTo },
                    { label: ValidationType.IsNotEqualTo, value: ValidationType.IsNotEqualTo }
                ]
            case LayoutQuestionType.Date:
                return [
                    { label: ValidationType.HasValue, value: ValidationType.HasValue },
                    { label: ValidationType.IsNotFutureDate, value: ValidationType.IsNotFutureDate },
                    { label: ValidationType.IsValidDate, value: ValidationType.IsValidDate }
                ]
            default:
                return [
                    { label: ValidationType.InValid, value: `${questionType} ${ValidationType.InValid}` }
                ]
        }
    }

    private getCodeOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code }
        });
    }

    private onValidationAnswerChange(name: string, value: any) {
        const { question } = this.props;
        const newValidation = Object.assign({}, question);
        console.dir("onValidationAnswerChange");
        //newActivation[name] = [value];
        //updateActivationState(questionId, newActivation);
    }

    private renderQuestionValues(name: string) {
        const { question, updateActivationState } = this.props;
        const choices = question.choices;

        if (choices) {
            const props = {
                name: name,
                value: choices,
                label: "",
                hideLabel: true,
                placeholder: '',
                multi: false,
                isReadOnly: false,
                labelCols: 0,
                inputCols: 12,
                offsetCols: 0,
                options: this.getCodeOptions(choices),
                onChange: this.onValidationAnswerChange
            };

            switch (question.questionType) {
                case LayoutQuestionType.YesNo:
                    return <HorizontalYesNo {...props} />
                case LayoutQuestionType.YesNoUnknown:
                    return <HorizontalYesNoUnknown  {...props} />
                case LayoutQuestionType.Text:
                    return <HorizontalTextInput  {...props} />
                case LayoutQuestionType.Multi_Line_Text:
                    return <HorizontalTextAreaInput {...props} />
                case LayoutQuestionType.Dropdown:
                    return <HorizontalDropdown {...props} />
                case LayoutQuestionType.Radio:
                    return <HorizontalButtonRadio {...props} />
                case LayoutQuestionType.Date:
                    return <HorizontalCustomDatePicker {...props} />
                case LayoutQuestionType.Number:
                    return <HorizontalNumberInput {...props} />
                case LayoutQuestionType.Phone:
                    return <HorizontalPhoneInput {...props} />
                case LayoutQuestionType.Email:
                    return <HorizontalEmailInput {...props} />
            }
        }
        return null;
    };

    public removeValidation(e: any) {

        const index = parseInt(e.currentTarget.name.split("-")[1]);
        const { question, parentId, saveLayoutItem } = this.props;
        const newQuestion = Object.assign({}, question);

        newQuestion.validations = [...newQuestion.validations.filter((validations, i) => i !== index)];

        saveLayoutItem(parentId, newQuestion);
    }

    public addValidation() {

        const { question, parentId, saveLayoutItem } = this.props;

        const newQuestion = Object.assign({}, question);

        newQuestion.validations = [...newQuestion.validations, { operator: "", arg: "" }];

        saveLayoutItem(parentId, newQuestion);
    }

    public render() {
        const { question } = this.props;

        return <div className="border border-light rounded p-1">
            {question.validations.map((validation, index) => <div className="row" style={{ fontSize: "0.73em" }}>
                <span className="col-md-1 ml-1">{index > 0 ? 'AND' : ""}</span>
                <span className="col-md-1 ml-1 mt-2">Validation:</span>
                <div className="col-md-4">
                    <Dropdown
                        name={`operator-${index}`}
                        value={validation.operator}
                        label={"Validation Type:"}
                        hideLabel={true}
                        placeholder={'Select Type'}
                        options={this.getValidationTypes()}
                        cols={12}
                        isMulti={false}
                        onChange={this.onChange}
                        isReadOnly={false}
                    />
                </div>
                <span className="col-md-1 ml-1 mt-2">{this.getValidationLabel(index) !== ValidationTypeMessage.InValid && this.getValidationLabel(index)}</span>

                <div className="col-md-3">
                    {this.simpleAnswers.indexOf(this.getValidationLabel(index)) === -1 &&
                        this.renderQuestionValues(`arg-${index}`)
                        //<TextInput
                        //    name={`arg-${index}`}
                        //    value={validation.arg}
                        //    label={this.getValidationLabel}
                        //    hideLabel={true}
                        //    placeholder={'Enter Value'}
                        //    cols={12}
                        //    multi={false}
                        //    onChange={this.onChange}
                        //    isReadOnly={false}
                        ///>
                    }
                </div>
                <div className="col-md-1 ">
                    <button name={`deleteBtn-${index}`} className="btn btn-outline-danger pull-right" type='button' onClick={this.removeValidation}><FaTrash fontSize={18} /></button>
                </div>
            </div>)}
            <button className="btn btn-sm btn-link" type='button' onClick={this.addValidation}><FaPlus fontSize={8} /> Add Validation</button>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => { return { questionList: state.layout.questions }; }, actionCreators
)(QuestionValidation);
