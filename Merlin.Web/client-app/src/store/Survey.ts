import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import * as AjaxUtils from '../utils/AjaxUtils';
import { PagedList } from './SurveySearch';
import { defaults } from '../utils/Global';
import { Layout, LayoutItem, Activations } from './Layout';
import * as LayoutUtils from '../utils/LayoutUtils'

export interface SurveyState {
    survey: Survey;
    layout: Layout;
    question: Question;
    affectedSurveys: PagedList<Survey>;
    errors: any;
    saveSuccessful: boolean;
    isLoading: boolean;
    affectedLayouts: PagedList<Layout>;
    selectedItemId: string;
    answers: any;
}

export interface Question {
    questionType: string;
    choices: any;
    codeType: string;
    questionId: string;
    legacyId: string;
    questionText: string;
}

export interface ObjectMapping {
    questionId: string;
    mappingType: string;
    mappingValue: string;
}

export interface answers {
    [id: string]: any;
}

export interface Survey {
    [key: string]: any;
    surveyIdNumber: string
    surveyType: string;
    surveyId: string;
    description: string;
    name: string;
    icd9: string;
    icd9Description: string;
    effectiveDate: string;
    layoutId: string;
    layoutDescription: string;
    outbreakId: number;
    outbreakDescription: string;
}

interface RequestSurveyAction {
    type: 'REQUEST_SURVEY';
}

interface ReceiveSurveyAction {
    type: 'RECEIVE_SURVEY';
    survey: Survey;
}

interface RequestAffectedSurveysAction {
    type: 'REQUEST_AFFECTED_SURVEYS';
    surveyId: string;
}

interface ReceiveAffectedSurveysAction {
    type: 'RECEIVE_AFFECTED_SURVEYS';
    surveys: PagedList<Survey>;
}

interface UpdateSurveyAction {
    type: 'UPDATE_SURVEY';
    survey: Survey;
}

interface UpdatedSurveyAction {
    type: 'UPDATED_SURVEY';
    updatedSurvey: Survey;
}

interface SaveSurveyAction {
    type: 'SAVE_SURVEY';
    survey: Survey;
}

interface RequestSurveyAndLayoutAction {
    type: 'REQUEST_SURVEY_AND_LAYOUT';
}

interface ReceiveSurveyAndLayoutAction {
    type: 'RECEIVE_SURVEY_AND_LAYOUT';
    survey: Survey;
    layout: Layout;
}

interface SavedSurveyAction {
    type: 'SAVED_SURVEY';
    savedSurvey: Survey;
}

interface createSurveyAndUseOrCopyLayout {
    type: 'SAVE_SURVEY';
    survey: Survey;
}

interface RequestAffectedLayoutsAction {
    type: 'REQUEST_AFFECTED_LAYOUTS';
    questionId: string;
}

interface ReceiveAffectedLayoutsAction {
    type: 'RECEIVE_AFFECTED_LAYOUTS';
    affectedLayouts: PagedList<Layout>;
}

interface AddActivation {
    type: 'ADD_ACTIVATION';
    rules: Activations[];
}

interface EditActivation {
    type: 'EDIT_ACTIVATION';
    Editrule: Activations;
}

interface ReceiveSurveyAnswers {
    type: 'RECEIVE_SURVEY_ANSWERS';
    answers: any;
}

type KnownAction = RequestSurveyAction
    | ReceiveSurveyAction
    | SaveSurveyAction
    | SavedSurveyAction
    | createSurveyAndUseOrCopyLayout
    | ReceiveSurveyAction
    | RequestAffectedSurveysAction
    | ReceiveAffectedSurveysAction
    | UpdateSurveyAction
    | UpdatedSurveyAction
    | RequestSurveyAndLayoutAction
    | ReceiveSurveyAndLayoutAction
    | RequestAffectedLayoutsAction
    | ReceiveAffectedLayoutsAction
    | ReceiveAffectedLayoutsAction
    | AddActivation
    | EditActivation
    | ReceiveSurveyAnswers;

export const actionCreators = {
    requestSurveyAndLayout: (surveyId: string, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const surveyState = getState().survey;

            dispatch({
                type: 'REQUEST_SURVEY_AND_LAYOUT'
            });

            // if ((surveyId != surveyState.survey.surveyId) ||
            //     (surveyState.layout.layoutId == null || (surveyState.layout.layoutId !== surveyState.survey.layoutId))) {
            //everything
            return AjaxUtils.get(`api/Survey/surveyandlayout/${surveyId}`)
                .then(surveyAndLayout => {
                    dispatch({
                        type: 'RECEIVE_SURVEY_AND_LAYOUT',
                        survey: surveyAndLayout,
                        layout: surveyAndLayout.layout
                    })
                }).catch((errors: any) => {
                    console.log(defaults.loadErrorConsoleMessage, errors);
                    history.replace(defaults.urls.loadFailureUrl);
                });
            // } else {
            //     // return Redux State
            //     dispatch({
            //         type: 'RECEIVE_SURVEY_AND_LAYOUT',
            //         survey: surveyState.survey,
            //         layout: surveyState.layout
            //     })
            // }
        },
    updateSurvey: (survey: Survey): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.put(`api/Survey/`, survey);
        },
    requestAffectedSurveys: (surveyId: string, page: number, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const currentState = getState().surveys;
            AjaxUtils.get(`api/Survey/${surveyId}/${page}`)
                .then(response => response as Promise<PagedList<Survey>>)
                .then(surveys => {
                    dispatch({
                        type: 'RECEIVE_AFFECTED_SURVEYS',
                        surveys
                    });
                })
                .catch((errors: any) => {
                    console.log(defaults.loadErrorConsoleMessage, errors);
                    history.replace(defaults.urls.loadFailureUrl);
                });
            dispatch({
                type: 'REQUEST_AFFECTED_SURVEYS',
                surveyId
            });
        },
    saveSurvey: (survey: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const layoutId = survey.layoutId;
            dispatch({
                type: 'SAVE_SURVEY',
                survey
            });
            return await AjaxUtils.post(`api/Survey/create/${layoutId}`, survey);
        },
    saveAttachSurveys: (surveys: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.post(`api/Survey/attach`, surveys);
        },
    createSurveyAndUseOrCopyLayout: (survey: Survey, option: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: 'SAVE_SURVEY',
                survey
            });
            return await AjaxUtils.post(`api/Survey/useorcopy/${option}`, survey);
        },
    updateQuestion: (question: Question): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.put(`api/Survey/question/`, question);
        },
    saveQuestion: (question: Question): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.post(`api/Survey/question/`, question);
        },
    requestAffectedLayouts: (questionId: string, page: number, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            AjaxUtils.get(`api/Survey/layout/${questionId}/${page}`)
                .then(response => response as Promise<PagedList<Layout>>)
                .then(affectedLayouts => {
                    dispatch({
                        type: 'RECEIVE_AFFECTED_LAYOUTS',
                        affectedLayouts
                    });
                })
                .catch((errors: any) => {
                    console.log(defaults.loadErrorConsoleMessage, errors);
                    history.replace(defaults.urls.loadFailureUrl);
                });
            dispatch({
                type: 'REQUEST_AFFECTED_LAYOUTS',
                questionId
            });
        },
    addActivation: (rules: Activations[]): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'ADD_ACTIVATION',
                rules
            });
        },

    editActivation: (Editrule: Activations): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'EDIT_ACTIVATION',
                Editrule
            });
        },
    saveAnswers: (surveyId: string, saveAnswersObject: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
                return await AjaxUtils.post(`api/survey/${surveyId}/answers`, saveAnswersObject);
        },
    requestAnswers: (surveyId: string, type: string, id: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            AjaxUtils.get(`api/Survey/${surveyId}/answers/${type}/${id}`)
                .then(answers => {
                    dispatch({
                        type: 'RECEIVE_SURVEY_ANSWERS',
                        answers: answers
                    })
                }).catch((errors: any) => {
                    console.log(defaults.loadErrorConsoleMessage, errors);
                });
        }

};

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SurveyState = {
    answers: {} as any,
    survey: {
        surveyIdNumber: defaults.string,
        surveyType: defaults.string,
        surveyId: defaults.guid,
        description: defaults.string,
        name: defaults.string,
        icd9: defaults.string,
        icd9Description: defaults.string,
        effectiveDate: defaults.string,
        layoutId: defaults.guid,
        layoutDescription: defaults.string,
        outbreakId: defaults.number,
        outbreakDescription: defaults.string
    },
    question: {
        questionType: defaults.string,
        choices: [],
        codeType: defaults.string,
        questionId: defaults.string,
        legacyId: defaults.string,
        questionText: defaults.string
    },
    layout: {} as Layout,
    selectedItemId: defaults.string,
    affectedSurveys: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Survey>,
    errors: {},
    saveSuccessful: defaults.boolean,
    isLoading: defaults.boolean,
    affectedLayouts: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Layout>
};


export const reducer: Reducer<SurveyState> = (state: SurveyState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SURVEY':
            return Object.assign({}, state, {
                isLoading: true
            });

        case 'RECEIVE_SURVEY':
            return Object.assign({}, state, {
                survey: action.survey,
                isLoading: false
            });

        case 'REQUEST_AFFECTED_SURVEYS':
            return Object.assign({}, state, {
                surveyId: action.surveyId,
                isLoading: false
            });

        case 'RECEIVE_AFFECTED_SURVEYS':
            return Object.assign({}, state, {
                affectedSurveys: action.surveys,
                isLoading: false
            });
        case 'SAVE_SURVEY':
            return Object.assign({}, state, {
                isLoading: true
            });

        case 'SAVED_SURVEY':
            return Object.assign({}, state, {
                survey: action.savedSurvey,
                saveSuccessful: true
            });
        case 'UPDATE_SURVEY':

            return Object.assign({}, state, {
                survey: action.survey,
                isLoading: true
            });

        case 'UPDATED_SURVEY':
            return Object.assign({}, state, {
                updatedSurvey: action.updatedSurvey,
                saveSuccessful: true,
                isLoading: defaults.boolean
            });

        case 'REQUEST_SURVEY_AND_LAYOUT':
            return Object.assign({}, state, {
                isLoading: true
            });

        case 'RECEIVE_SURVEY_AND_LAYOUT':
            return Object.assign({}, state, {
                survey: action.survey,
                layout: action.layout,
                isLoading: false
            });


        case 'REQUEST_AFFECTED_LAYOUTS':
            return Object.assign({}, state, {
                questionId: action.questionId,
                isLoading: true
            });

        case 'RECEIVE_AFFECTED_LAYOUTS':
            return Object.assign({}, state, {
                affectedLayouts: action.affectedLayouts,
                isLoading: false
            });


        case 'ADD_ACTIVATION':

            const newLayout1List = Object.assign({}, state.layout, { activationRules: action.rules, EditRule: {} })
            return Object.assign({}, state, {
                layout: newLayout1List
            });

        case 'EDIT_ACTIVATION':

            const selectedrule = Object.assign({}, state.layout, { EditRule: action.Editrule })
            return Object.assign({}, state, {
                layout: selectedrule
            });
        case 'RECEIVE_SURVEY_ANSWERS':

            return Object.assign({}, state, {
                answers: Object.assign({}, action.answers)
            });

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
};
function addQuestionToLayout(layout: Layout | undefined, item: LayoutItem, selectedItemId: string): LayoutItem[] | undefined {
    if (!layout || selectedItemId == defaults.string) {
        return undefined;
    }

    let itemSelected = <LayoutItem>(LayoutUtils.getItemById(layout, selectedItemId) as any);

    if (!itemSelected.items) {

        itemSelected.items = [];
    }
    itemSelected.items.push(item);

    return replaceItem([...layout.items], itemSelected);
}

function replaceItem(items: LayoutItem[] | undefined, itemToReplace: LayoutItem): LayoutItem[] | undefined {

    if (!items) {
        return items;
    }
    const index = items.findIndex(item => item.id === itemToReplace.id);

    if (index > -1) {
        const newLayoutList = [...items.splice(index, 1, itemToReplace)];
        return items;
    }
    else {
        items.map(item => item.items = replaceItem(item.items, itemToReplace));
        return items;
    }
}

function updateItemProps(items: LayoutItem[] | undefined, newProps: any): LayoutItem[] | undefined {

    if (!items) {
        return items;
    }

    return items.map(item => {
        if (item.id === newProps.id) {
            return Object.assign(item, newProps);
        }

        item.items = updateItemProps(item.items, newProps);

        return item;
    });
}