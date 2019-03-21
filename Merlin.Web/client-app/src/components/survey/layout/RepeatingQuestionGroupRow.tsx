import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { LayoutItem as Item, layoutItemType, LayoutItem } from '../../../store/Layout';
import { answers } from '../../../store/Survey';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import Question from '../Question';
import { defaults } from '../../../utils/Global';

type Props = {
    item: Item,
    index: number,
    rgAnswers?: answers,
    onAnswerChanged?: (name: string, value: any, index?: number) => void;
    removeRow?: (e: any) => void;
};

export default class RepeatingQuestionGroupRow extends React.Component<Props> {


    constructor(props: Props) {
        super(props);

        this.onAnswerChanged = this.onAnswerChanged.bind(this);
    }
    public render() {
        const { item, index, rgAnswers, removeRow } = this.props;

        const questions = item.items || [];

        return <div className="row">
            {questions.map(question => <div key={question.id} className={`col-md-${this.columnSize()}`} >
                <Question
                    item={
                        {
                            id: `${question.id}-${index}`,
                            textHidden: index > 0,
                            questionType: question.questionType,
                            text: question.text,
                            width: 12,
                            type: layoutItemType.question,
                            choices: question.choices || [],
                            isNumbered: false,
                            activation: question.activation,
                            validations: question.validations,
                            groupAccess: defaults.groupAccess,
                            index
                        }
                    }
                    answers={rgAnswers}
                    onAnswerChanged={this.onAnswerChanged}
                    smallViewport={true}
                />
            </div>
            )}
            <div className="col-md-1">
                {
                    index > 0 &&
                    <button
                        name={`${index}`}
                        type="button"
                        title="Remove Entry"
                        className="btn btn-outline-danger btn-round"
                        onClick={removeRow}
                    >
                        <FaTimesCircle fontSize={defaults.iconSize} />
                        <span className="sr-only">Remove Entry</span>
                    </button>
                }
            </div>
        </div>;

    }

    private columnSize() {
        const { item } = this.props;
        const length = item.items!.length || 0;

        if (length < 1) {
            return 11;
        }

        return Math.floor(11 / (length));
    }

    private onAnswerChanged(name: string, value: any) {
        const { index, onAnswerChanged } = this.props;

        if (onAnswerChanged) {
            onAnswerChanged(name, value, index);
        }
    }

}
