import * as React from 'react';
import { Link } from 'react-router-dom';
import * as SurveyStore from '../../store/SurveySearch';

interface SurveyInfoProps {
    survey: any;
}

export default class SurveyInfo extends React.Component<SurveyInfoProps, {}> {
    public render() {
        const { survey } = this.props;

        return <div>
            <p>{survey.surveyType}</p>
            <p>{survey.icd9}-{survey.icd9Description}</p>
            <p>Layout: {survey.layoutDescription}</p>
        </div>;
    }
}
