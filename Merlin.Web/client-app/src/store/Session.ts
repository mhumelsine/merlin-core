import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import moment from 'moment';

export enum ClaimType {
    county = "merlin/COUNTY",
    fullName = "merlin/FullName",
    role = "merlin/role",
    epicomUserId = "merlin/epicom-userId",
    nameidentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
}

export enum Role {
    Admin = "ADMIN"
}

export interface SessionState {
    claims: any[],
    expiresOn: moment.Moment
    refreshing: boolean,
    expired: boolean
}

interface TokenResponse {
    token: string
}

interface RequestTokenAction {
    type: 'REQUEST_TOKEN',
    expired: boolean
}

interface ReceiveTokenAction {
    type: 'RECEIVE_TOKEN',
    token: string
}
interface LogOffAction {
    type: 'LOGOFF_SESSION'
}

type KnownAction =
    RequestTokenAction
    | ReceiveTokenAction
    | LogOffAction;

export const actionCreators = {
    refreshToken: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const expiresOn = getState().session.expiresOn;
            const refreshing = getState().session.refreshing;
            const diff = expiresOn.diff(moment.utc(), 'minutes');

            //if token will expire in the next 2 minutes, refresh
            const needsRefresh = diff < 2;

            if (needsRefresh && !refreshing) {

                dispatch({
                    type: "REQUEST_TOKEN",
                    expired: diff < 1
                });

                const response = await fetch(`api/token/${btoa(window.location.href)}`, {
                    method: 'GET',
                    cache: 'no-cache',
                    credentials: 'include'
                });

                //redirect
                if (response.redirected) {
                    if (window.location.href !== response.url) {
                        window.location.href = response.url;
                    }
                    return;
                } else {

                    const token = (await response.json()).token;

                    dispatch({
                        type: 'RECEIVE_TOKEN',
                        token
                    });
                }
            }

        },
    logOff: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "LOGOFF_SESSION"
            });
        }
}

const unloadedState: SessionState = {
    claims: [],
    expiresOn: moment.utc(),
    expired: true,
    refreshing: false
};


export const reducer: Reducer<SessionState> = (state: SessionState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;

    switch (action.type) {
        case "REQUEST_TOKEN":
            return Object.assign({}, state, { refreshing: true, expired: action.expired });
        case 'RECEIVE_TOKEN':

            const tokenParts = action.token.split('.');

            //invalid token; do not process
            if (tokenParts.length !== 3) {
                throw new Error(`Invalid Token: ${action.token}`);
            }
            const binaryClaims = tokenParts[1];

            const claims = JSON.parse(atob(binaryClaims));

            //ASP.NET returns seconds since epoc JS wants milliseconds since epoc
            const expiresOn = moment.utc(claims.exp*1000);

            //put token in sessionStorage to use from AjaxUtils
            //see if this can be moved so it is always served out of the redux store
            sessionStorage.setItem('token', action.token);

            return {
                claims,
                expiresOn: expiresOn,
                refreshing: false,
                expired: false
            };
        case "LOGOFF_SESSION":
            window.sessionStorage.removeItem("token");

            return Object.assign({}, unloadedState);
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};

