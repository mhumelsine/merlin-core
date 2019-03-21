import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import ButtonRadio, { HorizontalButtonRadio } from '../../common/ButtonRadio';
import Dropdown, { HorizontalDropdown } from '../../common/Dropdown';
import Checkbox from '../../common/Checkbox';
import TextInput, { HorizontalTextInput } from '../../common/TextInput';
import { LayoutItemActivation, LayoutItem, actionCreators, LayoutItemState, LayoutQuestionAnswer, LayoutQuestionType, LayoutQuestionOperator } from '../../../store/Layout';
import YesNo, { HorizontalYesNo } from '../../common/YesNo';
import YesNoUnknown, { HorizontalYesNoUnknown } from '../../common/YesNoUnknown';
import TextAreaInput, { HorizontalTextAreaInput } from '../../common/TextAreaInput';
import CustomDatePicker, { HorizontalCustomDatePicker } from '../../common/CustomDatePicker';
import NumberInput, { HorizontalNumberInput } from '../../common/NumberInput';
import EmailInput, { HorizontalEmailInput } from '../../common/EmailInput';
import PhoneInput, { HorizontalPhoneInput } from '../../common/PhoneInput';
import ButtonCheckGroup from '../../common/ButtonCheckGroup';


type QuestionActivationProps = {
    questionId: string;
    activation: LayoutItemActivation;
    questionList?: LayoutItem[];
} & typeof actionCreators;

class QuestionActivation extends React.Component<QuestionActivationProps> {



    constructor(props: QuestionActivationProps) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTriggerAnswerChange = this.onTriggerAnswerChange.bind(this);
        this.getQuestionOperators = this.getQuestionOperators.bind(this);
    }

    public render() {
        const { questionId, activation, questionList, updateActivationState } = this.props;
        const questionChoices = (questionList || [])
            .filter(question => question.id !== questionId)
            .map(question => {
                return { label: `${question.number} - ${question.text}`, value: question.id };
            });
        let activationRadioValue = (function () {
            switch (activation.operator) {
                case LayoutQuestionAnswer.IsAnswered:
                case LayoutQuestionAnswer.IsNotAnswered:
                    return activation.operator;
                default:
                    return LayoutQuestionAnswer.HasSpecificAnswer;
            }
        })();

        return <div className="border border-light rounded p-1 row">
            <ButtonRadio
                name={`initialState${questionId}`}
                onChange={this.onRadioChange}
                hideLabel={false}
                label="Initial State"
                value={activation.initialState}
                isRequired={true}
                options={[
                    { value: LayoutItemState.Active, label: LayoutItemState.Active },
                    { value: LayoutItemState.Disabled, label: LayoutItemState.Disabled },
                    { value: LayoutItemState.Hidden, label: LayoutItemState.Hidden }
                ]}
                cols={6}
            />

            {activation.initialState !== LayoutItemState.Active &&
                <div className="col-md-12">
                    <div className="row">
                        <Dropdown
                            name="triggerQuestionId"
                            label="Activate when question"
                            onChange={this.onChange}
                            value={activation.triggerQuestionId}
                            options={questionChoices}
                            cols={12}
                            isRequired={true}
                        />
                        {activation.triggerQuestionId &&
                            <ButtonRadio
                                label=""
                                name={`activationType${questionId}`}
                                onChange={this.onChange}
                                hideLabel={true}
                                value={activation.activationType}
                                isRequired={true}
                                options={[
                                    { value: LayoutQuestionAnswer.IsAnswered, label: LayoutQuestionAnswer.IsAnswered },
                                    { value: LayoutQuestionAnswer.IsNotAnswered, label: LayoutQuestionAnswer.IsNotAnswered },
                                    { value: LayoutQuestionAnswer.HasSpecificAnswer, label: LayoutQuestionAnswer.HasSpecificAnswer }
                                ]}
                                cols={12}
                            />
                        }
                    </div>
                    {activation.activationType === LayoutQuestionAnswer.HasSpecificAnswer &&
                        <div className="row">
                            <Dropdown
                                name="operator"
                                label="Operator"
                                value={activation.operator}
                                placeholder="Select"
                                options={this.getQuestionOperators()}
                                onChange={this.onChange}
                                cols={3}
                                isRequired={true}
                            />

                            {this.renderTriggerValues()}
                        </div>
                    }
                </div>
            }
        </div>;
    }

    private onRadioChange(name: string, value: any) {
        const { questionId, activation, updateActivationState } = this.props;
        const changedActivation = Object.assign({}, activation) as any;
        const filteredName = name.replace(questionId, '');

        changedActivation[filteredName] = value;

        if (filteredName === 'initialState' && value === 'ACTIVE') {
            changedActivation.operator = '';
            changedActivation.triggerQuestionId = '';
            changedActivation.activationType = '';
            changedActivation.triggerValues = [];
        }

        updateActivationState(questionId, changedActivation);

    }
    // private onClickOperator(name: string, value: any) {

    //    const { questionId, activation, updateActivationState } = this.props;
    //    const newActivation = Object.assign({}, activation, { operator: value });

    //    updateActivationState(questionId, newActivation);
    // }

    private onChange(name: string, value: any) {
        const { questionId, activation, updateActivationState } = this.props;
        const newActivation = Object.assign({}, activation) as any;
        const filteredName = name.replace(questionId, '');

        newActivation[filteredName] = value;

        updateActivationState(questionId, newActivation);
    }

    private onTriggerAnswerChange(name: string, value: any) {
        const { questionId, activation, updateActivationState } = this.props;
        const newActivation = Object.assign({}, activation) as any;

        newActivation[name] = [value];
        updateActivationState(questionId, newActivation);
    }

    private getQuestionOperators() {
        const { questionId, activation, questionList, updateActivationState } = this.props;
        const triggerQuestion = (questionList || [])
            .filter(trigger => trigger.id === activation.triggerQuestionId)[0];

        if (triggerQuestion && triggerQuestion.questionType) {
            switch (triggerQuestion.questionType) {
                case LayoutQuestionType.Dropdown:
                case LayoutQuestionType.YesNo:
                case LayoutQuestionType.YesNoUnknown:
                case LayoutQuestionType.Radio:
                    return [
                        { label: LayoutQuestionOperator.Equals, value: LayoutQuestionOperator.Equals },
                        { label: LayoutQuestionOperator.NotEqual, value: LayoutQuestionOperator.NotEqual }
                    ];
                case LayoutQuestionType.Text:
                case LayoutQuestionType.Email:
                case LayoutQuestionType.Phone:
                case LayoutQuestionType.Multi_Line_Text:
                    return [
                        { label: LayoutQuestionOperator.Equals, value: LayoutQuestionOperator.Equals }
                    ];

                case LayoutQuestionType.Number:
                case LayoutQuestionType.Date:
                    return [
                        { label: LayoutQuestionOperator.GreaterThan, value: LayoutQuestionOperator.GreaterThan },
                        { label: LayoutQuestionOperator.LessThan, value: LayoutQuestionOperator.LessThan },
                        { label: LayoutQuestionOperator.LessThanOrEqualTo, value: LayoutQuestionOperator.LessThanOrEqualTo },
                        { label: LayoutQuestionOperator.GreaterThanOrEqualTo, value: LayoutQuestionOperator.GreaterThanOrEqualTo },
                        { label: LayoutQuestionOperator.Equals, value: LayoutQuestionOperator.Equals },
                        { label: LayoutQuestionOperator.NotEqual, value: LayoutQuestionOperator.NotEqual }
                    ];
                default:
                    return [
                        { label: LayoutQuestionOperator.Equals, value: LayoutQuestionOperator.Equals }
                    ];
            }
        }
    }

    private renderTriggerValues() {
        const { questionId, activation, questionList, updateActivationState } = this.props;
        const triggerQuestion = (questionList || [])
            .filter(trigger => trigger.id === activation.triggerQuestionId)[0];

        if (triggerQuestion) {
            const props = {
                name: 'triggerValues',
                value: (activation.triggerValues || [''])[0],
                label: 'Value',
                isRequired: true,
                hideLabel: false,
                placeholder: '',
                multi: false,
                isReadOnly: false,
                labelCols: 0,
                inputCols: 12,
                offsetCols: 0,
                options: this.getCodeOptions(triggerQuestion.choices || []),
                onChange: this.onTriggerAnswerChange
            };

            switch (triggerQuestion.questionType) {
                case LayoutQuestionType.YesNo:
                    return <YesNo {...props} />;
                case LayoutQuestionType.YesNoUnknown:
                    return <YesNoUnknown  {...props} />;
                case LayoutQuestionType.Text:
                    return <TextInput  {...props} />;
                case LayoutQuestionType.Multi_Line_Text:
                    return <TextAreaInput {...props} />;
                case LayoutQuestionType.Dropdown:
                    return <Dropdown {...props} />;
                case LayoutQuestionType.Radio:
                    return <ButtonRadio {...props} />;
                case LayoutQuestionType.Date:
                    return <CustomDatePicker {...props} />;
                case LayoutQuestionType.Number:
                    return <NumberInput {...props} />;
                case LayoutQuestionType.Phone:
                    return <PhoneInput {...props} />;
                case LayoutQuestionType.Email:
                    return <EmailInput {...props} />;
                case LayoutQuestionType.Check:
                    return <ButtonCheckGroup {...props} isVertical={true} />;
            }
        }
        return null;
    }
    private getCodeOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code };
        });
    }
}

export default connect(
    (state: ApplicationState) => { return { questionList: state.layout.questions }; }, actionCreators
)(QuestionActivation);
