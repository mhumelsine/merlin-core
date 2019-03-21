import React from 'react';
import { LayoutItem as Item, layoutItemType } from '../../store/Layout';
import Question from './Question';
import Section from './Section';
import Message from './Message';
import provideWidth from './WidthProvider';
import Spacer from './Spacer';
import { answers } from '../../store/Survey';
import TextInput from '../common/TextInput';

type MerlinSurveyAnsweredProps = {
    answers: answers;
    item: Item;
    history?: any;
};

class MerlinSurveyAnswered extends React.Component<MerlinSurveyAnsweredProps> {

    public render() {
        const { item, answers,  history} = this.props;

        switch (item.type) {
            case layoutItemType.question:
                const answer = answers ? answers[item.id] : 'undefined' ;
                return  <TextInput
                            name={item.id}
                            value={answer}
                            label={item.text}
                            hideLabel={false}
                            placeholder={''}
                            isReadOnly={true}
                            onChange={() => {}}
                                />;
            case layoutItemType.section:
                return <Section
                    key={item.id}
                    item={item}
                    answers={answers}
                    onAnswerChanged={() => {}}
                >
                    {this.renderChildren(item, answers)}
                </Section>;
            case layoutItemType.message:
                return <Message
                    key={item.id}
                    item={item}
                />;
            case layoutItemType.spacer:
                return <Spacer />;
            default:
                return <div>Unrecognized layout item type: "{item.type}"</div>;
        }
    }

    private renderChildren(item: Item, answers: any): any {
        if (!item.items) {
            return null;
        }

        return <div className="row">
            {item.items.map(child => <MerlinSurveyAnsweredWithWidth
                key={child.id}
                item={child}
                answers={answers}
            />)}
        </div>;
    }
}
const MerlinSurveyAnsweredWithWidth = provideWidth<MerlinSurveyAnsweredProps>(MerlinSurveyAnswered, props => props.item.width || 12);

export default MerlinSurveyAnsweredWithWidth;
