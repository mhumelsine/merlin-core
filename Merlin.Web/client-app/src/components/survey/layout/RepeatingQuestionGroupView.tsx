import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import { LayoutItem as Item, layoutItemType, LayoutItem } from '../../../store/Layout';
import { answers } from '../../../store/Survey';
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import Question from '../Question';
import { defaults } from '../../../utils/Global';
import RepeatingQuestionGroupRow from './RepeatingQuestionGroupRow';

type RepeatingQuestionGroupViewProps = {
    item: Item;
    answers?: answers;
    onAnswerChanged?: (name: string, value: any) => void;
    errors?: any;
}

type questionRow = {
    rowId: number;
    index: number;
    questions: LayoutItem[];
}

class RepeatingQuestionGroupView extends React.Component<RepeatingQuestionGroupViewProps> {

    state = {
        questionGrid: [] as questionRow[],
        answers: {} as answers
    }

    constructor(props: any) {
        super(props);

        this.onAnswerChanged = this.onAnswerChanged.bind(this);
        this.addRow = this.addRow.bind(this);
        this.removeRow = this.removeRow.bind(this);
    }

    public componentWillMount() {
        const { item, answers } = this.props;

        const rgAnswers = answers![item.id] || [];

        if (rgAnswers.length == 0) {
          // adds default row - 1st
            this.addRow();
        }
    }

    private onAnswerChanged(name: string, value: any, index?: number) {
        const { item, answers, onAnswerChanged } = this.props;

        if (item === undefined || answers === undefined || onAnswerChanged === undefined) {
            return;
        }

        const rgAnswers = (answers[item.id] || []) as any[];

        const answer = Object.assign({}, rgAnswers.filter(a => a.index == index)[0]);

        answer[name.replace("-" + index, "")] = value;

        const newAnswers = [...rgAnswers.filter(a => a.index != index), answer]
            .sort((x, y) => x.index - y.index);

        onAnswerChanged(item.id, newAnswers);
    }

    //private onAnswerChanged(name: string, value: any) {
    //    const { onAnswerChanged } = this.props;

    //    onAnswerChanged(name, value)
    //}

    private addRow() {
        const { item, answers, onAnswerChanged } = this.props;

        if (item === undefined || answers === undefined || onAnswerChanged === undefined) {
            return;
        }

        const rgAnswers = answers[item.id] || [];

        const answer = {} as any;

        answer["index"] = rgAnswers.length;

        (item.items || []).map(item => answer[item.id] = '');

        onAnswerChanged(item.id, [...rgAnswers,answer]);
    }

    private removeRow(e: any) {
        const { item, answers, onAnswerChanged } = this.props;

        if (item === undefined || answers === undefined || onAnswerChanged === undefined) {
            return;
        }

        const rgAnswers = (answers[item.id] || []) as any[];

        const index = e.currentTarget.name;

        const newAnswers = [...rgAnswers.filter(a => a.index != index)];

        onAnswerChanged(item.id, newAnswers);
    }

    public render() {
        const { questionGrid } = this.state;
        const { answers, item, onAnswerChanged } = this.props;
        const rgAnswers = (answers![item.id] || []) as any[];

        return <div className="mb-2">
            {
                rgAnswers && rgAnswers.map((answer,index) => <RepeatingQuestionGroupRow
                    key={answer.index}
                    item={item}
                    index={answer.index as number}
                    rgAnswers={rgAnswers[index]}
                    onAnswerChanged={this.onAnswerChanged}
                    removeRow={this.removeRow}
                />
                )
            }
            <button
                role="buton"
                title="Add Entry"
                onClick={this.addRow}
                className="btn btn-link p-0 text-capitalize"
            >
                <FaPlusCircle fontSize={defaults.iconSize} style={{ verticalAlign: 'bottom' }} />
                {" "}Add Entry
                <span className="sr-only">Add Entry</span>
            </button>
        </div>
    }
} export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout
        }
    }, {}
)(RepeatingQuestionGroupView);