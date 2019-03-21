import * as React from 'react';
import { ChangeEvent } from 'react';
import * as LayoutStore from '../../store/Layout';
import { Layout, ValidationType, LayoutItem } from '../../store/Layout';
import * as LayoutUtils from '../../utils/LayoutUtils';
import Card from '../common/Card';
import TextInput, { HorizontalTextInput } from '../common/TextInput';
import TextAreaInput, { HorizontalTextAreaInput } from '../common/TextAreaInput';
import Dropdown, { HorizontalDropdown } from '../common/Dropdown';
import ButtonRadio, { HorizontalButtonRadio } from '../common/ButtonRadio';
import { HorizontalButtonCheck } from '../common/ButtonCheckGroup';
import provideWidth from './WidthProvider';
import { LayoutItemProps, getAnswerChangeHandler } from './LayoutItem';
import CustomDatePicker, { HorizontalCustomDatePicker } from '../common/CustomDatePicker';
import NumberInput, { HorizontalNumberInput } from '../common/NumberInput';
import PhoneInput, { HorizontalPhoneInput } from '../common/PhoneInput';
import EmailInput, { HorizontalEmailInput } from '../common/EmailInput';
import QuestionLabel from './QuestionLabel';
import YesNo, { HorizontalYesNo } from '../common/YesNo';
import YesNoUnknown, { HorizontalYesNoUnknown } from '../common/YesNoUnknown';
import Accordion from '../common/Accordion';
import AccordionPanel from '../common/AccordionPanel';
import SaveCancelButton from '../common/SaveCancelButton';
import RadioButton from '../common/RadioButton';
import Checkbox from '../common/Checkbox';
import { defaults } from '../../utils/Global';
import { QuestionType } from '../../store/SurveyQuestion';
import ErrorSummary from '../common/ErrorSummary';
import QuestionActivation from './layout/QuestionActivation';

const { radio, dropdown, yn, ynu, text, email, phone, multiLineText, number, date } = QuestionType;

type QuestionProps = {
    smallViewport?: boolean,
    index? : number
} & LayoutItemProps;

export default class Question extends React.Component<QuestionProps> {
    state = {
        selectedValue: "ACTIVE",
        questionList: {} as any,
        validation: defaults.string,
        validationValue: defaults.string,
        message: defaults.string,
        messageType: "DEFAULT",
        errors: {} as any,
        targetItemId: defaults.string,

    };

    constructor(props: QuestionProps) {
        super(props);
        this.onAnswerChange = this.onAnswerChange.bind(this);

        this.getDefaultMessageFor = this.getDefaultMessageFor.bind(this);

    }


    private getDefaultMessageFor(validation: string, validationValue: string) {
        switch (validation) {
            case ValidationType.HasValue:
                return 'Required';
            case ValidationType.MaxLength:
                return `Text must be less than ${validationValue} characters`;
            case ValidationType.IsGreaterThan:
                return `Number must be greater than ${validationValue}`;
            case ValidationType.IsGreaterThanOrEqualTo:
                return `Number must be greater than or equal to ${validationValue}`;
            case ValidationType.IsLessThan:
                return `Number must be less than ${validationValue}`;
            case ValidationType.IsLessThanOrEqualTo:
                return `Number must be less than or equal to ${validationValue}`;
            case ValidationType.IsNotFutureDate:
                return 'Cannot not be future date';
            case ValidationType.IsValidDate:
                return 'Invalid date';
            case ValidationType.MatchesPattern:
                return 'Invalid input';
            case ValidationType.IsEqualTo:
            case ValidationType.IsNotEqualTo:
                return 'Invalid number';
            default:
                return defaults.string;
        }
    }

    private onAnswerChange(name: string, newValue: any) {
        const { onAnswerChanged, index } = this.props;

        if (onAnswerChanged) {
            onAnswerChanged(name, newValue, index);
        }
    }

    private getCodeOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code }
        });
    }

    public render() {
        const question = this.props.item;
        const { targetItemId, questionList, messageType, message, validation, validationValue } = this.state;
        const { answers, disabled, children, isSubQuestion, smallViewport, errors } = this.props;
        //const onAnswerChanged = this.props.onAnswerChanged || getAnswerChangeHandler(this.props);
        const onAnswerChanged = this.onAnswerChange;
        const questionId = question.id.replace(/-\d$/, '');
        const answer = answers ? answers[questionId] : 'undefined';
        const text = question.text || '';
        const questionType = (question.questionType || "").toUpperCase();
        const choices = question.choices || [] as any;
        const getCodeOptions = this.getCodeOptions.bind(this);
        let labelCols = isSubQuestion ? 6 : 7;
        let inputCols = 5;
        const offsetCols = isSubQuestion ? 1 : 0;

        //force full width stacking
        if (smallViewport) {
            labelCols = 12;
            inputCols = 12;
        }

        const props = {
            name: question.id,
            value: answer,
            label: <QuestionLabel text={text} questionNumber={question.number} />,
            hideLabel: question.textHidden,
            placeholder: '',
            multi: false,
            onChange: onAnswerChanged,
            isReadOnly: disabled,
            labelCols: labelCols,
            inputCols: inputCols,
            offsetCols: offsetCols,
            options: getCodeOptions(choices) || [],
            error: errors && (Array.isArray(errors[question.id.toLowerCase()]) ? errors[question.id.toLowerCase()][0] : errors[question.id])
        };
        

        return <div title={question.id}>
            {(function () {
                switch (questionType) {
                    case 'YN':
                        return <HorizontalYesNo {...props} />
                    case 'YNU':
                        return <HorizontalYesNoUnknown  {...props} />
                    case 'TEXT':
                        return <HorizontalTextInput  {...props} />
                    case 'MULTI_LINE_TEXT':
                        return <HorizontalTextAreaInput {...props} />
                    case 'DROPDOWN':
                        return <HorizontalDropdown {...props} />
                    case 'RADIO':
                        return <HorizontalButtonRadio {...props} />
                    case 'DATE':
                        return <HorizontalCustomDatePicker {...props} />
                    case 'NUMBER':
                        return <HorizontalNumberInput {...props} />
                    case 'PHONE':
                        return <HorizontalPhoneInput {...props} />
                    case 'EMAIL':
                        return <HorizontalEmailInput {...props} />
                    case 'CHECK':
                        return <HorizontalButtonCheck {...props} isVertical={true} />
                    default:
                        return <div className="col-md-6">
                            <p>{question.text}</p>

                            {question.questionType != "" &&
                                <div className="alert alert-danger">
                                    Unrecognized question type: '{questionType}'
                        </div>}
                        </div>;
                }
            })()}
            {children}
        </div >
    }
};
