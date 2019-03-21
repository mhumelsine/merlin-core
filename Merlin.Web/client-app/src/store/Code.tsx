import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as ArrayUtils from '../utils/ArrayUtils';
import * as AjaxUtils from '../utils/AjaxUtils';
import { defaults } from '../utils/Global';

export enum CodeType {
    icd9 = 'ICD9',
    surveyType = 'DYN_SURVEY_TYPE',
    outbreak = 'OUTBREAK',
    questionType = 'SURVEY_ANSWER_TYPE',
    distinctCodeType = 'SYSTEM',
    mappingType = 'CD_MAPPING_TYPE',
    onsettime = 'TIME',
    traveltype = 'TRAVEL_TYPE',
    counties = 'COUNTIES',
    states = 'STATE',
    countries = 'COUNTRIES',
    vaccineMFRType = 'VACCINE_MFR',
    vaccineType = 'VACCINE',
    antibiotics = 'ANTIBIOTICS',
    ynu = 'YNUTYPE',
    syndromes = 'OB_SYNDROMES',
    settings = 'OB_SETTING',
    county = 'COUNTY',
    diseases = 'DISEASES',
    symptoms = 'SYMPTOMS',
    transmissionModes = 'OB_MODE',
    vehicleIdentified = 'VEHICLE_IDENTIFIED',
    studyDesigns = 'OB_STUDY_DESIGN',
    investigationMethods = 'OB_INVESTIGATION',
    regulatoryAgencies = 'OB_REGULATORY',
    recommendationTypes = 'OB_RECOMMENDATIONS_H',
    reviewStatus = 'OB_REVIEW_STATUS',
    timeUnits = 'TIME_UNIT',
    settingName = 'SETTING_NAME',
    reported = 'REPORTER',
    docsEvent = 'DOCS_EVENT',
    outbreakCaseType = 'OB_CASE_TYPE',
    AssignmentType = 'ASSIGNMENT_TYPE',
    access = 'ACCESS'
}

export const outbreakSurveyTypesArray = ['OUTBREAK', 'OUTBREAK_LEVEL', 'OUTBREAK_ROSTER', 'EVENT'];

export const diseaseSurveyTypesArray = ['BASIC_CASE', 'EXTENDED_DATA', 'OUTBREAK_TEMPLATE'];

export const questionTypesWithCodesArray = ['DROPDOWN', 'RADIO', 'CHECK'];

export interface DropdownCode {
    code: string;
    description: string;
}

export interface Codes {
    [key: string]: any;
    ICD9: DropdownCode[];
    DYN_SURVEY_TYPE: DropdownCode[];
    OUTBREAK: DropdownCode[];
    SURVEY_ANSWER_TYPE: DropdownCode[];
    SYSTEM: DropdownCode[];
    QUESTION_CHOICES: DropdownCode[];
    CD_MAPPING_TYPE: DropdownCode[];
    TIME: DropdownCode[];
    TRAVEL_TYPE: DropdownCode[];
    COUNTIES: DropdownCode[];
    STATE: DropdownCode[];
    COUNTRIES: DropdownCode[];
    VACCINE_MFR: DropdownCode[];
    ANTIBIOTICS: DropdownCode[];
    YNUTYPE: DropdownCode[];
    OB_SYNDROMES: DropdownCode[];
    OB_SETTING: DropdownCode[];
    COUNTY: DropdownCode[];
    SYMPTOMS: DropdownCode[];
    DISEASES: DropdownCode[];
    OB_MODE: DropdownCode[];
    VEHICLE_IDENTIFIED: DropdownCode[];
    OB_STUDY_DESIGN: DropdownCode[];
    OB_INVESTIGATION: DropdownCode[];
    OB_REGULATORY: DropdownCode[];
    OB_RECOMMENDATIONS_H: DropdownCode[];
    OB_REVIEW_STATUS: DropdownCode[];
    TIME_UNIT: DropdownCode[];
    SETTING_NAME: DropdownCode[];
    REPORTER: DropdownCode[];
    OB_CASE_TYPE: DropdownCode[];
    ASSIGNMENT_TYPE: DropdownCode[];
    ACCESS: DropdownCode[];
}

export interface CodeState {
    codes: Codes;
    isLoading: boolean;
}

// actions
interface RequestCodeAction {
    type: 'REQUEST_CODE';
    isLoading: boolean;
}

interface ReceiveCodeAction {
    type: 'RECEIVE_CODE';
    codeType: string;
    codes: DropdownCode[];
    isLoading: boolean;
}

type KnownAction = RequestCodeAction
    | ReceiveCodeAction;

export const actionCreators = {
    loadDropdown: (codeType: string, history?: any, containerName?: string): AppThunkAction<KnownAction> =>
        async (dispatch, getstate) => {
            // may need to add caching here; right now rely on server-side HTTP response caching
            AjaxUtils.get(`api/Code/${codeType}`)
                .then(response => response as Promise<DropdownCode[]>)
                .then(codes => {
                    dispatch({
                        type: 'RECEIVE_CODE',
                        codeType: containerName || codeType,
                        codes,
                        isLoading: false
                    });
                })
                .catch((errors: any) => {
                    console.log(defaults.loadErrorConsoleMessage, errors);
                    history.replace(defaults.urls.loadFailureUrl);
                });

            dispatch({
                type: 'REQUEST_CODE',
                isLoading: true
            });
        },
    loadSettingsDropdown: (settingType: string): AppThunkAction<KnownAction> =>
        async (dispatch, getstate) => {
            const codes = await AjaxUtils.get(`api/Code/settings/${settingType}`);

            dispatch({
                type: 'RECEIVE_CODE',
                codeType: CodeType.settingName,
                codes,
                isLoading: false
            });
        }
};

const unloadedState: CodeState = {
    codes: {
        ICD9: [],
        DYN_SURVEY_TYPE: [],
        OUTBREAK: [],
        SURVEY_ANSWER_TYPE: [],
        SYSTEM: [],
        QUESTION_CHOICES: [],
        CD_MAPPING_TYPE: [],
        TIME: [],
        TRAVEL_TYPE: [],
        COUNTIES: [],
        STATE: [],
        COUNTRIES: [],
        VACCINE_MFR: [],
        ANTIBIOTICS: [],
        YNUTYPE: [],
        OB_SYNDROMES: [],
        OB_SETTING: [],
        COUNTY: [],
        SYMPTOMS: [],
        DISEASES: [],
        OB_MODE: [],
        VEHICLE_IDENTIFIED: [],
        OB_STUDY_DESIGN: [],
        OB_INVESTIGATION: [],
        OB_REGULATORY: [],
        OB_RECOMMENDATIONS_H: [],
        OB_REVIEW_STATUS: [],
        TIME_UNIT: [],
        SETTING_NAME: [],
        REPORTER: [],
        DOCS_EVENT: [],
        OB_CASE_TYPE: [],
        ASSIGNMENT_TYPE: [],
        ACCESS: []
    },
    isLoading: false
};

// reducer
export const reducer: Reducer<CodeState> = (state: CodeState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CODE':
            return Object.assign({}, state, {
                isLoading: action.isLoading
            });

        case 'RECEIVE_CODE':
            let newCodes = Object.assign({}, state.codes);

            newCodes[action.codeType] = (action as ReceiveCodeAction).codes;

            let newState = Object.assign({}, state, {
                isLoading: action.isLoading,
                codes: Object.assign({}, newCodes)
            });
            return newState;

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
