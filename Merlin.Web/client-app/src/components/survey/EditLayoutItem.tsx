import * as React from 'react';
import { Layout, LayoutItem as Item, layoutItemType } from '../../store/Layout';
import { Survey, answers } from '../../store/Survey';
import LayoutItem, { LayoutItemProps } from './LayoutItem';
import createDefaultInterpreter from '../../utils/Interpreter';
import { LayoutViewerProps } from './LayoutViewer';
import EditItem from './layout/EditItem';
import DragItem from '../common/DragItem';
import Question from './Question';
import Section from './Section';
import Message from './Message'
import DragContainer from '../common/DragContainer';
import Spacer from './Spacer';
import SurveyControl from './SurveyControl';
import LineBreak from './LineBreak';
import RepeatingQuestionGroup from './layout/RepeatingQuestionGroup';
import Accordion from '../common/Accordion';
import AccordionItem from '../common/AccordionItem';
import QuestionActivation from './layout/QuestionActivation';
import QuestionValidation from './layout/QuestionValidation';

type EditLayoutItemProps = {
    onResize: (parentId: string, itemId: string, newColWidth: number) => void;
    onEdit: (parentId: string, itemId: string) => void;
    id: string;
    parentId: string;
    itemWidthAccessor: (id: string) => number;
    itemClassAccessor: (id: string) => string;
    isSubQuestion?: boolean;
    selectedItemId: string | null | undefined;
    layout: Layout;
    answers?: answers;
    item: Item;
    onAnswerChanged?: (name: string, value: any, index?: any) => void;
    groupAccess?: string[];
}


const previewAnswers = {};
const previewOnAnswerChanged = (name: string, value: any) => console.log(`answer: ${name} changed to: ${value}`);

export function getAnswerChangeHandler(props: any) {
    return props.onAnswerChanged || previewOnAnswerChanged;
}

export function getAnswers(props: any) {
    return props.answers || previewAnswers;
}

export default class EditLayoutItem extends React.Component<EditLayoutItemProps> {

    private renderChildren(item: Item): any {
        const { layout, answers, onAnswerChanged, onEdit, onResize, itemWidthAccessor, itemClassAccessor, selectedItemId, groupAccess } = this.props;

        if (!item.items) {
            return null;
        }

        const lastIndex = item.items.length - 1;

        return item.items.map((child, index) =>
            <EditItem
                onEdit={onEdit}
                id={child.id}
                parentId={item.id}
                type={child.type}
                key={child.id}
                isLast={index === lastIndex}
                isFirst={index === 0}
                isTextHidden={child.textHidden === true}
                showNumbering={child.type === layoutItemType.question
                    && !(item.type === layoutItemType.question && item.isNumbered !== true)
                    && item.type !== layoutItemType.repeatingQuestionsGroup
                }
                isNumbered={child.isNumbered === true}
                groupAccess={child.groupAccess}
            >
                <EditLayoutItem
                    selectedItemId={selectedItemId}
                    onEdit={onEdit}
                    onResize={onResize}
                    onAnswerChanged={onAnswerChanged}
                    answers={answers}
                    id={child.id}
                    parentId={item.id}
                    key={child.id}
                    item={child}
                    itemWidthAccessor={itemWidthAccessor}
                    itemClassAccessor={itemClassAccessor}
                    isSubQuestion={item.type === layoutItemType.question && child.type === layoutItemType.question}
                    layout={layout}
                />
            </EditItem>
        );
    }

    public render() {

        const { layout, item, onResize, onEdit, itemWidthAccessor,
            itemClassAccessor, selectedItemId, parentId, groupAccess } = this.props;

        const onAnswerChanged = getAnswerChangeHandler(this.props);
        const answers = getAnswers(this.props);

        switch (item.type) {
            case layoutItemType.question:
                return <Question
                    item={item}
                    answers={answers}
                    onAnswerChanged={onAnswerChanged}
                >
                    {item.items && item.items.length > 0 &&
                        <DragContainer
                            id={item.id}
                            onResize={onResize}
                            itemWidthAccessor={itemWidthAccessor}
                            itemClassAccessor={itemClassAccessor}
                        >
                            {this.renderChildren(item)}
                        </DragContainer>
                    }
                    <Accordion defaultPanelHeading="">
                        <AccordionItem heading="Activation">
                            <QuestionActivation
                                questionId={item.id}
                                activation={item.activation}                                
                            />
                        </AccordionItem >
                        <AccordionItem heading="Validations">
                            <QuestionValidation
                                question={item}
                                parentId={parentId}
                            />
                        </AccordionItem>
                    </Accordion>
                </Question>;
            case layoutItemType.repeatingQuestionsGroup:
                return <RepeatingQuestionGroup
                    item={item}
                    answers={answers}
                    onAnswerChanged={onAnswerChanged}
                >
                    {item.items && item.items.length > 0 &&
                        <DragContainer
                            id={item.id}
                            onResize={onResize}
                            itemWidthAccessor={itemWidthAccessor}
                            itemClassAccessor={itemClassAccessor}
                        >
                            {this.renderChildren(item)}
                        </DragContainer>
                    }
				</RepeatingQuestionGroup>
            case layoutItemType.section:
                return <Section
                    item={item}
                    answers={answers}
                    onAnswerChanged={onAnswerChanged}
                >
                    {item.items && item.items.length > 0 &&
                        <DragContainer
                            id={item.id}
                            onResize={onResize}
                            itemWidthAccessor={itemWidthAccessor}
                            itemClassAccessor={itemClassAccessor}
                        >
                            {this.renderChildren(item)}
                        </DragContainer>
                    }
                </Section>;
            case layoutItemType.message:
                return <Message
                    item={item}
                    isSelected={item.id === selectedItemId}
                    parentId={parentId}
                    onEdit={onEdit}
                />;
            case layoutItemType.spacer:
                return <Spacer showBackGround={true} />;
            case layoutItemType.lineBreak:
                return <LineBreak />;
            case layoutItemType.control:
                return <SurveyControl item={item} isEditable={true} />;
            default:
                return <div>Unrecognized layout item type: "{item.type}"</div>;
        }
    }
}
