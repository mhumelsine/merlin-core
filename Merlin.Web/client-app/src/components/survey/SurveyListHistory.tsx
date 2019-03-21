import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";
import SurveyListItemDetail from './SurveyListItemDetail';
import {Survey} from '../../store/SurveySearch'

type SurveyListHistoryProps = {
    survey: Survey;
}

export default class SurveyListHistory extends React.Component<SurveyListHistoryProps, {}> {
    public render() {
        const { survey } = this.props;

        return <div className="card border-dark mb-3">
                    <div className="card-header"><h1>History</h1></div>
                    <div className="card-body text-dark">
                        <ul className="list-group">
                            {survey.surveyHistory.map((surveyItem, i) =>{
                             return <li className={`list-group-item ${survey.surveyId === surveyItem.surveyId ? "active" : ""}`}>
                                        <SurveyListItemDetail
                                            key={i}
                                            survey={surveyItem} 
                                        />
                                    </li>
                            })
                            }
                        </ul>
                    </div>
                </div>;
    }
}