import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as AjaxUtils from '../utils/AjaxUtils';
import { PagedList } from './SurveySearch';
import { defaults } from '../utils/Global';

export interface SurveyQuestionState {
    question: Question;
    questionList: PagedList<Question>;
    subText: string;
    objectMappings: ObjectMapping[];
}

export interface Question {
    uid: string;
    questionType: string;
    choices: any;
    codeType: string;
    questionId: string;
    legacyId: string;
    questionText: string;
    saveToBank: boolean;
    hasBeenAnswered: boolean;
}

export interface ObjectMapping {
    questionId: string;
    mappingType: string;
    mappingValue: string;
    uid: string;
}

export enum QuestionType {
    radio = 'RADIO',
    text = 'TEXT',
    multiLineText = 'MULTI_LINE_TEXT',
    dropdown = 'DROPDOWN',
    yn = 'YN',
    ynu = 'YNU',
    phone = 'PHONE',
    email = 'EMAIL',
    number = 'NUMBER',
    date = 'DATE'
}

// actions
interface RequestQuestionAction {
    type: 'REQUEST_QUESTION';
}

interface ReceiveQuestionAction {
    type: 'RECEIVE_QUESTION';
    question: Question;
}

interface UpdateQuestionAction {
    type: 'UPDATE_QUESTION';
    question: Question;
}

interface UpdatedQuestionAction {
    type: 'UPDATED_QUESTION';
    updatedQuestion: Question;
}

interface SaveQuestionAction {
    type: 'SAVE_QUESTION';
}

interface SavedQuestionAction {
    type: 'SAVED_QUESTION';
    savedQuestion: Question;
}

interface RequestQuestionsAction {
    type: 'REQUEST_QUESTIONS';
    subText: string;
}

interface ReceiveQuestionsAction {
    type: 'RECEIVE_QUESTIONS';
    questionList: PagedList<Question>;
}

interface RequestObjectMappingsAction {
    type: 'REQUEST_OBJECT_MAPPINGS';
}

interface ReceiveObjectMappingsAction {
    type: 'RECEIVE_OBJECT_MAPPINGS';
    objectMappings: ObjectMapping[];
}

type KnownAction = RequestQuestionAction
    | ReceiveQuestionAction
    | UpdateQuestionAction
    | UpdatedQuestionAction
    | SaveQuestionAction
    | SavedQuestionAction
    | RequestQuestionsAction
    | ReceiveQuestionsAction
    | RequestObjectMappingsAction
    | ReceiveObjectMappingsAction;

export const actionCreators = {
    requestQuestion: (questionId: string, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {

                dispatch({
                    type: 'REQUEST_QUESTION'
                });

                const question = await AjaxUtils.get(`api/Survey/question/${questionId}`);

                dispatch({
                    type: 'RECEIVE_QUESTION',
                    question
                });

            } catch (err) {
                console.log(err);
            }
        },
    updateQuestion: (question: Question): AppThunkAction<KnownAction> =>
		async (dispatch, getState) => {
            return await AjaxUtils.put(`api/Survey/question/`, question);
        },
    saveQuestion: (question: Question): AppThunkAction<KnownAction> =>
		async (dispatch, getState) => {
            return await AjaxUtils.post(`api/Survey/question/`, question);
        },
    requestQuestions: (subText: string, page: number, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            dispatch({
                type: 'REQUEST_QUESTIONS',
                subText
            });

            // Only load data if it's something we don't already have (and are not already loading)
            const currentState = getState().surveyQuestion;

            // const isNewSearch = subText !== currentState.subText
            //    || page !== currentState.questionList.paging.page
            //    || currentState.questionList.list.length === 0;

            const isNewSearch = true;

            if (isNewSearch) {

                try {

                    const questionList = await AjaxUtils.get(`api/Survey/question/?subText=${subText}&page=${page}`) as PagedList<Question>;

                    dispatch({
                        type: 'RECEIVE_QUESTIONS',
                        questionList
                    });

                } catch (err) {
                    console.log(err);
                }
            }
        },
    requestObjectMappings: (questionId: string, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            AjaxUtils.get(`api/Survey/question/${questionId}/mapping`)
                .then(response => response as Promise<ObjectMapping[]>)
                .then(objectMappings => {
                    dispatch({
                        type: 'RECEIVE_OBJECT_MAPPINGS',
                        objectMappings
                    });
                })
                .catch((errors: any) => {
                    history.replace(defaults.urls.loadFailureUrl);
                });
            dispatch({
                type: 'REQUEST_OBJECT_MAPPINGS'
            });
        },
    saveObjectMapping: (objectMapping: ObjectMapping): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.post(`api/Survey/question/${objectMapping.questionId}/mapping`, objectMapping);
        },
    removeObjectMapping: (objectMapping: ObjectMapping, questionUid: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const data = {
                questionUid: questionUid,
                mappingType: objectMapping.mappingType,
                uId: objectMapping.uid,
                mappingValue: objectMapping.mappingValue
            };
            return await AjaxUtils.remove(`api/Survey/question/${objectMapping.questionId}/mapping/${questionUid}`, data);
        },
    replaceObjectMapping: (objectMapping: ObjectMapping, mappingTypeOfMappingToBeReplaced: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.put(`api/Survey/question/${objectMapping.questionId}/mapping`, objectMapping);
        }
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SurveyQuestionState = {
    question: {} as Question,
    questionList: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Question>,
    objectMappings: [],
    subText: defaults.string
};

export const reducer: Reducer<SurveyQuestionState> = (state: SurveyQuestionState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {

        case 'REQUEST_QUESTIONS':
            return Object.assign({}, state, {
                subText: action.subText
            });

        case 'RECEIVE_QUESTIONS':
            return Object.assign({}, state, {
                questionList: action.questionList
			});

        case 'REQUEST_QUESTION':
            return state;

        case 'RECEIVE_QUESTION':
            return Object.assign({}, state, {
                question: action.question
            });

        case 'SAVE_QUESTION':
            return state;

        case 'SAVED_QUESTION':
            return Object.assign({}, state, {
                question: action.savedQuestion,
                saveSuccessful: true
            });
        case 'UPDATE_QUESTION':
            return Object.assign({}, state, {
                question: action.question,
                isLoading: true
            });

        case 'UPDATED_QUESTION':
            return Object.assign({}, state, {
                updatedQuestion: action.updatedQuestion,
                saveSuccessful: true,
                isLoading: defaults.boolean
            });

        case 'REQUEST_OBJECT_MAPPINGS':
            return Object.assign({}, state, {
                isLoading: true
            });

        case 'RECEIVE_OBJECT_MAPPINGS':
            const objectMapping = action.objectMappings || [];
            return Object.assign({}, state, {
                objectMappings: objectMapping,
                isLoading: false
            });

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
