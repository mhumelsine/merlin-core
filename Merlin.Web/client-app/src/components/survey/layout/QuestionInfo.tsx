import * as React from 'react';
import { Link } from 'react-router-dom';
import * as SurveyStore from '../../../store/SurveySearch';

interface QuestionInfoProps {
    question: any
}

export default class QuestionInfo extends React.Component<QuestionInfoProps, {}> {
    public render() {
        const { question } = this.props;

        return <div>
            <p>ID: {question.questionId}</p>
            <p>Question Type: {question.questionType}</p>
            <p>Display Type: {question.type}</p>
            <p>Code Type: {question.codeType}</p>
            <p>Storage Location: {question.storageLocation}</p>
        </div>;
    }
}