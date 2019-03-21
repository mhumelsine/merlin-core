import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as SurveyStore from '../../../store/SurveySearch';
import * as SurveyQuestionStore from '../../../store/SurveyQuestion';
import * as LayoutStore from '../../../store/Layout';
import QuestionListItem from './QuestionListItem';
import Loading from '../../common/Loading';
import Pagination from '../../common/Pagination';
import PagedList from '../../common/PagedList';
import { FontSize } from '../../../utils/Global';


type QuestionListProps = {
    onQuestionAdd?: (item: LayoutStore.LayoutItem) => void
    maxHeight?: string;
    questions: SurveyStore.PagedList<SurveyQuestionStore.Question>;
    subText: string;
    requestQuestions: (subText: string, page: number, history: any) => void;
    canAddQuestion?: (questionId: string) => boolean;
    isInManageMode?: boolean;
    history?: any;
    isLoading?: boolean;
	className?: any;
	fontSize?: FontSize;
	hideNumbersFound?: boolean;
}

class QuestionList extends React.Component<QuestionListProps> {
    state = {
        answers: {} as any
    };

    private movePage(page: number) {
        const { subText, history } = this.props;

        this.props.requestQuestions(subText, page, history);
    }

    private onAnswerChanged(name: string, value: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = value;
        this.setState(newState);
    }

    public render() {

		const { questions, subText, onQuestionAdd, isInManageMode, canAddQuestion, isLoading, fontSize, hideNumbersFound} = this.props;
		const { answers } = this.state;

		return <ul className="list-group">
			{questions.list.map((question, i) =>
				<QuestionListItem
					key={i}
					question={question}
					subText={subText}
					onQuestionAdd={onQuestionAdd}
					canAddQuestion={canAddQuestion}
					isInManageMode={isInManageMode}
					onAnswerChanged={this.onAnswerChanged.bind(this)}
					answers={answers}
					fontSize={fontSize}
					hideNumbersFound={hideNumbersFound ? hideNumbersFound : false}
					
		/>
	)}
        </ul>;
    }
}

const pagedQuestionList = PagedList(QuestionList,
    "",
	(props: any) => props.isLoading,
    (props: any) => props.questions.paging,
    (props: any) => {
        const { subText, history } = props;

        return (page: number) => props.requestQuestions(subText, page, history);
    });

export default pagedQuestionList;

