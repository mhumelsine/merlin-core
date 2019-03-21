import * as React from 'react';
import { LayoutItem as Item, layoutItemType, LayoutItemState, LayoutItemActivation, LayoutItemValidation } from '../../store/Layout';
import Question from './Question';
import Section from './Section';
import Message from './Message'
import provideWidth from './WidthProvider';
import Spacer from './Spacer';
import { answers } from '../../store/Survey';
import SurveyControl from './SurveyControl';
import LineBreak from './LineBreak';
import RepeatingQuestionGroupView from './layout/RepeatingQuestionGroupView';
import * as Interpreter from '../../utils/Interpreter'
import { getValidationMessageFor } from '../../utils/ValidationUtils';
import { getFirstIndexIfObject } from '../../utils/ArrayUtils';
import { defaults } from '../../utils/Global';
import Secure from '../common/Secure';
import { ClaimType } from '../../store/Session';

export type LayoutItemProps = {
    isEditable?: boolean;
    item: Item;
    answers?: answers;
    onAnswerChanged?: (name: string, value: any, index?: any) => void;
    disabled?: boolean;
    isSubQuestion?: boolean;
    errors?: any;
    isSelected?: boolean;
    activationsInterpreter?: any;
    validationsInterpreter?: any;
    activation?: LayoutItemActivation,
    validations?: LayoutItemValidation[],
    groupAccess?: string[];
};

const previewAnswers = {} as any;
const previewOnAnswerChanged = (name: string, value: any) => {
    console.trace();
    previewAnswers[name] = value;
};

export function getAnswerChangeHandler(props: any) {
    return props.onAnswerChanged || previewOnAnswerChanged;
}

class LayoutItem extends React.Component<LayoutItemProps> {

    private renderChildren(item: Item, answers: any, onAnswerChanged: (name: string, value: any) => void, errors: any, activationsInterpreter?: any, validationsInterpreter?: any, groupAccess? : any): any {
        if (!item.items || !item.items.length) {
            return null;
        }

        return <div className="row">
            {item.items.map(child => <LayoutItemWithWidth
                key={child.id}
                item={child}
                answers={answers}
                onAnswerChanged={onAnswerChanged}
                isSubQuestion={item.type === layoutItemType.question && child.type === layoutItemType.question}
                errors={errors}
                activationsInterpreter={activationsInterpreter}
                validationsInterpreter={validationsInterpreter}
                groupAccess={child.groupAccess}
            />)}
        </div>;
    }

    public renderItem() {

        const { item, isEditable, isSubQuestion, errors, activationsInterpreter, validationsInterpreter, groupAccess } = this.props;
        const onAnswerChanged = getAnswerChangeHandler(this.props);
        const answers = this.props.answers || previewAnswers;

        const itemActivation = (item.activation != null) ? item.activation : defaults.activation;

        const itemValidations = (item.validations != null) ? item.validations : defaults.validations;

        const { initialState, triggerQuestionId, triggerValues, operator} = itemActivation;

        const activationEvaluatedToTrue : boolean = (activationsInterpreter as any).evaluate(triggerQuestionId, operator, triggerValues) == 1;

        const matchedValidation = itemValidations.find((validation: any) => validationsInterpreter.evaluate(item.id, validation.operator, validation.arg) == 0);

        if (matchedValidation != undefined) {
            errors[item.id] = [getValidationMessageFor((defaults.validationAliases as any)[matchedValidation.operator], getFirstIndexIfObject(matchedValidation.arg))];
        }

        if ([LayoutItemState.Hidden, LayoutItemState.Disabled].some(x => x === itemActivation.initialState) && !activationEvaluatedToTrue && answers[item.id] && answers[item.id] != "") {
            onAnswerChanged(item.id,"");
        }

        if (itemActivation.initialState === LayoutItemState.Hidden && !activationEvaluatedToTrue) {
            return null;
        }


        switch (item.type) {
            case layoutItemType.question:
                return <Question
                    key={item.id}
                    item={item}
                    answers={answers}
                    onAnswerChanged={onAnswerChanged}
                    disabled={(initialState === LayoutItemState.Disabled) && !activationEvaluatedToTrue}
                    isEditable={isEditable}
                    isSubQuestion={isSubQuestion}
                    errors={errors}
                >
                    {this.renderChildren(item, answers, onAnswerChanged, errors, activationsInterpreter, validationsInterpreter, groupAccess)}
                </Question>;
            case layoutItemType.section:
                return <Section
                    key={item.id}
                    item={item}
                    answers={answers}
					onAnswerChanged={onAnswerChanged}
                >
                    {this.renderChildren(item, answers, onAnswerChanged, errors, activationsInterpreter, validationsInterpreter, groupAccess)}
                </Section>;
            case layoutItemType.message:
                return <Message
                    key={item.id}
                    item={item}
                    errors={errors}
                />;
            case layoutItemType.spacer:
                return <Spacer />;
            case layoutItemType.lineBreak:
                return <LineBreak />;
            case layoutItemType.control:
                return <SurveyControl item={item} errors={errors} isEditable={false}/>;
            case layoutItemType.repeatingQuestionsGroup:
                return <RepeatingQuestionGroupView
                    key={item.id}
                    item={item}
                    answers={answers}
                    onAnswerChanged={onAnswerChanged}
                    errors={errors}
                >               
				</RepeatingQuestionGroupView>
                default:
                return <div>Unrecognized layout item type: "{item.type}"</div>;
        }
    }
    public render() {
        return <Secure requireClaim={ClaimType.role} requireClaimValue={this.props.item.groupAccess}>{this.renderItem()}</Secure>;
    }

}

const LayoutItemWithWidth = provideWidth<LayoutItemProps>(LayoutItem, props => props.item.width || 12);

export default LayoutItemWithWidth;
