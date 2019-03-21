import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as AjaxUtils from '../utils/AjaxUtils';

export interface SmartGoalsState {
    criteria: PerformanceSearch;
    performanceInfo: any[];
    userNameInfo: any[];
}

export interface PerformanceSearch {
    startDate: string;
    endDate: string;
    user: string;
}

interface LoadPerformanceSearch {
    type: 'LOAD_PERFORMANCE_SEARCH';
    lastQuarterInfo: any;
    userNameInfo: any[];
    userName: string;
}

interface UpdatePerformanceSearch {
    type: 'UPDATE_PERFORMANCE_SEARCH';
    criteria: PerformanceSearch;
}

interface ReceivePerformanceAction {
    type: 'RECEIVE_PERFORMANCE';
    performanceInfo: any;
}
interface ClearPerformanceInfo {
    type: 'CLEAR_PERFORMANCE_INFO';
}

type KnownAction = UpdatePerformanceSearch
    | ReceivePerformanceAction
    | ClearPerformanceInfo
    | LoadPerformanceSearch;

export const actionCreators = {
    updatePerformanceSearch: (criteria: PerformanceSearch): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'UPDATE_PERFORMANCE_SEARCH',
                criteria
            });
        },
    loadPerformanceResults: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

                const criteria = Object.assign({}, getState().smartGoals.criteria);
                const performanceInfo = await AjaxUtils.post(`api/SmartGoals/results`,  criteria);

                dispatch({
                    type: 'RECEIVE_PERFORMANCE',
                    performanceInfo
                });
        },
    clearPerformanceInfo: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'CLEAR_PERFORMANCE_INFO',
            });
        },
    loadPerformanceSearch: (userName: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const lastQuarterInfo = await AjaxUtils.get(`api/smartgoals/last-quarter`);
            const userNameInfo = await AjaxUtils.get(`api/smartgoals/user-search`);

            dispatch({
                type: 'LOAD_PERFORMANCE_SEARCH',
                lastQuarterInfo,
                userNameInfo,
                userName
            });
        },
};

// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SmartGoalsState = {
    criteria: { startDate: '', endDate: '', user: '' },
    performanceInfo: [],
    userNameInfo: []
};


export const reducer: Reducer<SmartGoalsState> = (state: SmartGoalsState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_PERFORMANCE_SEARCH':
            return Object.assign({}, state, { criteria: action.criteria });

        case 'RECEIVE_PERFORMANCE':
            return Object.assign({}, state, {
                performanceInfo: action.performanceInfo
            });
        case 'CLEAR_PERFORMANCE_INFO':
            return Object.assign({}, state, {
                performanceInfo: unloadedState.performanceInfo
            });
        case 'LOAD_PERFORMANCE_SEARCH':
            return Object.assign({}, state, {
                criteria: {
                    startDate: action.lastQuarterInfo.startDate,
                    endDate: action.lastQuarterInfo.endDate,
                    user: action.userName
                },
                userNameInfo: action.userNameInfo
            });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
