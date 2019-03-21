import * as React from 'react';
import {Link} from 'react-router-dom';
import * as SurveyStore from '../../store/SurveySearch';
import SurveyInfo from './SurveyInfo';
import { defaults } from '../../utils/Global';
import Highlight from 'react-highlighter';

interface SurveyListItemDetailProps {
    survey: SurveyStore.Survey 
}

class SurveyListItemDetail extends React.Component<SurveyListItemDetailProps, {}> {
   
    public render() {
        const { survey } = this.props;
        const {urls} = defaults;
        const title = `${survey.name} - ${survey.effectiveDate}`;
        
        return <div>
            <h4> {title} </h4>

            <div className="row">
                <div className="col-sm-9">
                    <SurveyInfo
                        survey={survey}
                    />
                </div>
                <div className="col-sm-3">
                    <p><Link to={`${urls.surveyPreviewUrl}/${survey.surveyId}`}>Preview</Link></p>
                    <p><Link to={`${urls.surveyEditUrl}/${survey.surveyId}`}>Edit survey and layout</Link></p>
                    <p><Link to={`${urls.surveyUseUrl}/${survey.surveyId}`}>Use this survey as a template for a new layout</Link></p>
                </div>
            </div>
        </div>;
    }
}

export default SurveyListItemDetail;