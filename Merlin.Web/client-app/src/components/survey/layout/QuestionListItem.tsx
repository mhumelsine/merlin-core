import * as React from 'react';
import { Link } from 'react-router-dom';
import * as SurveyQuestionStore from '../../../store/SurveyQuestion';
import * as LayoutStore from '../../../store/Layout';
import QuestionInfo from './QuestionInfo';
import Highlight from 'react-highlighter';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import Question from '../../survey/Question';
import { layoutItemType, LayoutItem } from '../../../store/Layout';
import { defaults, FontSize } from '../../../utils/Global';
import { FaEdit } from 'react-icons/fa';

interface QuestionListItemProps {
    question: SurveyQuestionStore.Question;
    subText: string;
    onQuestionAdd?: (item: LayoutStore.LayoutItem) => void;
    canAddQuestion?: (questionId: string) => boolean;
    isInManageMode?: boolean;
    onAnswerChanged: (name: string, value: any) => void;
    answers: any;
    fontSize?: FontSize;
    hideNumbersFound?: boolean;
}

class QuestionListItem extends React.Component<QuestionListItemProps> {
    constructor(props: QuestionListItemProps) {
        super(props);
        this.onQuestionAdd = this.onQuestionAdd.bind(this);
    }
    state = {
        visible: false
    };

    private onclick() {
        let newState = Object.assign({}, this.state);
        newState.visible = !this.state.visible;
        this.setState(newState);
    }

    private onQuestionAdd() {
        const { onQuestionAdd, canAddQuestion, question } = this.props;

        if (onQuestionAdd
            && canAddQuestion
            && canAddQuestion(question.questionId)) {
            onQuestionAdd(this.createLayoutItem(false));
        }
    }

    private createLayoutItem(highlightKeywords: boolean) {
        const { question } = this.props;

        return {
            id: question.questionId,
            questionType: question.questionType,
            text: highlightKeywords ? this.renderHighlightedText() : question.questionText,
            width: 12,
            type: layoutItemType.question,
            isNumbered: true,
            choices: question.choices,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess: defaults.groupAccess
        };
    }

    private renderHighlightedText() {
        return <Highlight search={this.props.subText} matchStyle={{ "backgroundColor": "yellow" }} >
            {this.props.question.questionText}
        </Highlight>
    }

    public render() {
        const { question, isInManageMode, canAddQuestion, onAnswerChanged, answers, fontSize } = this.props;
        const disabled = !(canAddQuestion && canAddQuestion(question.questionId));
        const fontSizeUsed = fontSize ? fontSize : FontSize.default;

        return <li className="list-group-item">
            <div className="row">
                <div className="col-md-12" style={{ fontSize: fontSizeUsed }}>
                    <p>- ID: {question.questionId}</p>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className='col-md-8' style={{ marginLeft: "25px", fontSize: fontSizeUsed }}>
                            <Question
                                item={this.createLayoutItem(true)}
                                smallViewport={true}
                                answers={answers}
                                onAnswerChanged={onAnswerChanged}
                            />
                        </div>
                        <div className={`${isInManageMode ? 'col-md-1' : 'col-md-3'}`} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            {!isInManageMode &&
                                <button id={question.questionId} className="btn btn-outline-dark" onClick={this.onQuestionAdd} disabled={disabled}>
                                    Add
								</button>
                            }
                            {isInManageMode &&
                                <Link className="btn btn-info pull-right" to={`${defaults.urls.questionEditUrl}/${question.questionId}`}>
                                    <FaEdit fontSize={15} />
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </li>;
    }
}

export default QuestionListItem;
