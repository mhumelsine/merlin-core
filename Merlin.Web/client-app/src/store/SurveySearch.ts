import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as ArrayUtils from '../utils/ArrayUtils';
import * as AjaxUtils from '../utils/AjaxUtils';
import { DropdownCode } from './Code';
import { defaults } from '../utils/Global';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SurveySearchState {
    isLoading: boolean;
    surveyTypes: string[];
    name: string;
    icd9: string;   
    surveys: PagedList<Survey>;
    questions: PagedList<Question>;
    subText: string;
}

export interface Survey {
	surveyType: string;
	surveyIdNumber: string
    surveyId: number;
    description: string;
    name: string;
    icd9: string;
    icd9Description: string;
    effectiveDate: string;
    layoutId: string;
    layoutDescription: string;
	outbreakId: number;
	outbreakDescription: string;
    surveyHistory: Survey[];
}

export interface Question {
    questionId: string;
    legacyId: string;
    questionType: string;
    choices: any;
    codeType: string;
    text: string;
    shortName: string;
    storageLocation: string;
}

export interface PagedList<T> {
    paging: Paging,
    list: T[]
}

export interface Paging {
    page: number;
    totalPages: number;
    totalItems: number;
    orderBy: string;
    pageSize: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestSurveysAction {
    type: 'REQUEST_SURVEYS';
    surveyTypes: string[];
    name: string;
    icd9: string;
}

interface ReceiveSurveysAction {
    type: 'RECEIVE_SURVEYS';
    surveys: PagedList<Survey>;
}

interface RequestSurveyTypesAction {
    type: 'REQUEST_SURVEY_TYPES';
}

interface ReceiveSurveyTypesAction {
    type: 'RECEIVE_SURVEY_TYPES';
    surveyTypeCodes: DropdownCode[];
}

interface RequestIcd9CodesAction {
    type: 'REQUEST_ICD9_CODES';
}

interface ReceiveIcd9CodesAction {
    type: 'RECEIVE_ICD9_CODES';
    icd9Codes: DropdownCode[];
}



// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestSurveysAction
    | ReceiveSurveysAction
    | RequestSurveyTypesAction
    | ReceiveSurveyTypesAction
    | RequestIcd9CodesAction
    | ReceiveIcd9CodesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestSurveys: (surveyTypes: string[], name: string, icd9: string, page: number, history: any): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            // Only load data if it's something we don't already have (and are not already loading)
            const currentState = getState().surveys;

            const isNewSearch = icd9 !== currentState.icd9
                || name !== currentState.name
                || !ArrayUtils.containSameItems(surveyTypes, currentState.surveyTypes)
                || page !== currentState.surveys.paging.page
                || currentState.surveys.list.length === 0;
			
            if (isNewSearch) {
				AjaxUtils.get(`api/Survey?name=${name}&icd9=${icd9}&page=${page}&${ArrayUtils.queryStringEncode('surveyTypes', surveyTypes, code => code)}`)
				    .then(response => response as Promise<PagedList<Survey>>)
                    .then(surveys => {
                            dispatch({
                                type: 'RECEIVE_SURVEYS',
                                surveys
                            });
                    })
                    .catch((errors: any) => {
                        console.log(defaults.loadErrorConsoleMessage, errors);
                        history.replace(defaults.urls.loadFailureUrl);
                    });

                dispatch({
                    type: 'REQUEST_SURVEYS',
                    icd9,
                    name,
                    surveyTypes
                });
            }
        }
    //requestQuestions: (subText: string, page: number, history: any): AppThunkAction<KnownAction> =>
    //    async (dispatch, getState) => {
    //        // Only load data if it's something we don't already have (and are not already loading)
    //        const currentState = getState().questions;

    //        const isNewSearch = subText !== currentState.subText
    //            || page !== currentState.questions.paging.page
    //            || currentState.questions.list.length === 0;

    //        if (isNewSearch) {
    //            AjaxUtils.get(`api/Survey/question?subText=${subText}&page=${page}`)
    //                .then(response => response as Promise<PagedList<Question>>)
    //                .then(questions => {
    //                    dispatch({
    //                        type: 'RECEIVE_QUESTIONS',
    //                        questions
    //                    });
    //                })
    //                .catch((errors: any) => {
    //                    console.log(defaults.loadErrorConsoleMessage, errors);
    //                    history.replace(defaults.urls.loadFailureUrl);
    //                });

    //            dispatch({
    //                type: 'REQUEST_QUESTIONS',
    //                subText
    //            });
    //        }
    //    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SurveySearchState = {
    surveys: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Survey>,
    questions: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Question>,
    subText: defaults.string,
    isLoading: defaults.boolean,
    icd9: defaults.string,
    name: defaults.string,
    surveyTypes: []
};

export const reducer: Reducer<SurveySearchState> = (state: SurveySearchState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SURVEYS':
            return Object.assign({}, state, {
                surveyTypes: action.surveyTypes,
                name: action.name,
                icd9: action.icd9,
                isLoading: true
            });
        
        case 'RECEIVE_SURVEYS':
            return Object.assign({}, state, {
                surveys: action.surveys,
                isLoading: false
            });

        case 'REQUEST_SURVEY_TYPES':
            return Object.assign({}, state, { 
                isLoading: true 
            });

        case 'RECEIVE_SURVEY_TYPES':
            return Object.assign({}, state, {
                isLoading: false,
                surveyTypeCodes: action.surveyTypeCodes
            });

        case 'REQUEST_ICD9_CODES':
            return Object.assign({}, state, { 
                isLoading: true 
            });

        case 'RECEIVE_ICD9_CODES':
            return Object.assign({}, state, {
                isLoading: false,
                icd9Codes: action.icd9Codes
            });

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};

