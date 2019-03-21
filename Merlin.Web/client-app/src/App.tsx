import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Layout } from './components/Layout';
import NavMenu from './components/NavMenu';
import SurveySearch from './components/survey/SurveySearch';
import SurveyPreview from './components/survey/SurveyPreview';
import SurveyEdit from './components/survey/SurveyEdit';
import SurveyCreate from './components/survey/SurveyCreate';
import Edit from './components/survey/layout/Edit';
import LayoutSearchPage from './components/survey/layout/LayoutSearchPage';
import LayoutPreview from './components/survey/layout/LayoutPreview';
import QuestionManager from './components/survey/layout/QuestionManager';
import QuestionEdit from './components/survey/layout/QuestionEdit';
import QuestionCreate from './components/survey/layout/QuestionCreate';
import LoadFailure from './components/common/LoadFailure';
import { defaults } from './utils/Global';
import MerlinSurvey from './components/survey/MerlinSurvey';
import NewLayoutPage from './components/survey/layout/NewLayoutPage';
import AttachSurveys from './components/survey/AttachSurveys';
import PageNotFound from './components/common/PageNotFound';
import Home from './components/Home';
import OutbreakDetailPage from './components/Outbreak/OutbreakDetailPage';
import LogOff from './components/LogOff';
import ELRSearchPage from './components/ELRSearch/ElrSearchPage';
import SmartGoalsPage from './components/SmartGoals/SmartGoalsPage';
import PerformanceReport from './components/SmartGoals/PerformanceReport';
import StatusHistoryPage from './components/Outbreak/StatusHistoryPage';

export default class App extends Component {
    public render() {
        return (
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Switch>

                    <Route exact path={'/survey/merlin' + '/:surveyId/:caseId'} component={MerlinSurvey} />
                    <Route exact path={defaults.urls.ELRSearch} component={ELRSearchPage} />
                    <Route exact path={defaults.urls.smartGoals} component={SmartGoalsPage} />
                    <Route exact path={defaults.urls.performanceReport} component={PerformanceReport} />
                    <Route exact path={defaults.urls.outbreak + '/:outbreakId/'} component={OutbreakDetailPage} />
                


                    <Layout>
                        <Route path="/" component={NavMenu} />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/LayoutSearch" component={LayoutSearchPage} />
                            <Route path="/layout/edit/:layoutId" component={Edit} />
                            <Route path="/layout/preview/:layoutId" component={LayoutPreview} />
                            <Route path="/layout/new" component={NewLayoutPage} />
                            <Route path={defaults.urls.attachSurveysUrl + '/:layoutId'} component={AttachSurveys} />
                            <Route path={defaults.urls.surveyCreateUrl + '/:layoutId'} component={SurveyCreate} />
                            <Route path={defaults.urls.surveySearchUrl} component={SurveySearch} />
                            <Route path={defaults.urls.surveyPreviewUrl + '/:surveyId/'} component={SurveyPreview} />
                            <Route path={defaults.urls.surveyEditUrl + '/:surveyId'} component={SurveyEdit} />
                            <Route path={defaults.urls.questionManagerUrl + '/:layoutId?'} component={QuestionManager} />
                            <Route path={defaults.urls.questionEditUrl + '/:questionId'} component={QuestionEdit} />
                            <Route path={defaults.urls.questionCreateUrl + '/:layoutId?'} component={QuestionCreate} />
                            <Route path={defaults.urls.layoutEditUrl + '/:layoutId'} component={Edit} />
                            <Route path={defaults.urls.logOff} component={LogOff} />
                            <Route path={defaults.urls.loadFailureUrl} component={LoadFailure} />
                            <Route path="/outbreak/:outbreakId/status-history" component={StatusHistoryPage} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Layout>
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}
