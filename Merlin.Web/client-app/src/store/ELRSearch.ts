import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as AjaxUtils from '../utils/AjaxUtils';
import { DropdownCode } from '../utils/Global';
import { isNullOrEmpty, compareValues, columnOrder } from '../utils/UIUtils';

export interface ELRSearchState {
    basicSearch: BasicSearch;
    searchData: any[];
    columnInfo: ColumnInfo[];
    advancedCriteria: SearchCriteria[];
    selectedObservationKeys: number[];
    county: SelectedCounties[];
    columnProperties: ColumnProperty[];
    templates: DropdownCode[];
    templateName: string;
    templateID: number;
    templateType: string;
}

export interface ColumnProperty {
    name: string;
    wasSearched: boolean;
}

export interface ColumnInfo {
    fqColumnName: string;
    columnName: string;
    dataType: string;
}

export interface BasicSearch {
    patientFirstName: string;
    patientLastName: string;
    patientDOB: any;
    specimenID: string;
    pageSize: string;
}

export interface SearchCriteria {
    id: number;
    fqColumnName: string;
    columnName: string;
    operator: string;
    value: string;
    dataType: string;
}

export interface SelectedCounties {
    county: string;
    observationKey: number;
}

export enum Details {
    profileId = 'ProfileID',
    stateNo = 'StateNo'
}

export enum TemplateType {
    master = 'MASTER',
    user   = 'USER'
}

// actions
interface ReceiveElrDataAction {
    type: 'RECEIVE_ELR_DATA';
    searchData: any;
}

interface ReceiveElrDataNamesAction {
    type: 'RECEIVE_COLUMN_INFO';
    columnInfo: ColumnInfo[];
}

interface SaveSearchCriteria {
    type: 'SAVE_SEARCH_ITEM';
    expressions: SearchCriteria[];
}

interface UpdateBasicSearch {
    type: 'UPDATE_BASIC_SEARCH';
    basicSearch: BasicSearch;
}

interface UpdateAdvancedSearch {
    type: 'UPDATE_ADVANCED_SEARCH';
    advancedCriteria: SearchCriteria[];
}

interface SelectObservation {
    type: 'SELECT_OBSERVATION';
    observationKey: number;
    county: string;
}

interface UnSelectObservation {
    type: 'UN_SELECT_OBSERVATION';
    observationKey: number;
    county: string;
}

interface ClearSelectedObservations {
    type: 'CLEAR_SELECTED_OBSERVATIONS';
}

interface ClearSearch {
    type: 'CLEAR_SEARCH';
}

interface SetColumnProperties {
    type: 'SET_COLUMN_PROPERTIES';
    properties: ColumnProperty[];
}

interface ReceiveTemplateList {
    type: 'RECEIVE_TEMPLATE_LIST';
    templates: DropdownCode[];
}

interface SaveTemplate {
    type: 'SAVE_TEMPLATE';
    templateDetails: any;
}

interface CreateTemplate {
    type: 'CREATE_TEMPLATE';
    name: string;
    id: number;
}

type KnownAction = ReceiveElrDataAction
    | ReceiveElrDataNamesAction
    | SaveSearchCriteria
    | UpdateBasicSearch
    | UpdateAdvancedSearch
    | SelectObservation
    | UnSelectObservation
    | ClearSelectedObservations
    | ClearSearch
    | SetColumnProperties
    | ReceiveTemplateList
    | SaveTemplate
    | CreateTemplate;

export const actionCreators = {
    updateBasicSearch: (basicSearch: BasicSearch): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_BASIC_SEARCH',
                basicSearch
            });
        },
    addCriteria: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const advancedCriteria = getState().elrSearch.advancedCriteria;

            dispatch({
                type: 'UPDATE_ADVANCED_SEARCH',
                advancedCriteria: [...advancedCriteria,
                    {
                        id: Date.now(),
                        fqColumnName: '',
                        columnName: '',
                        operator: '=',
                        value: '',
                        dataType: ''
                    }
                ]
            });
        },
    loadColumnInfo: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {

                const columnInfo = await AjaxUtils.get(`api/elrsearch/advanced-search`);

                dispatch({
                    type: 'RECEIVE_COLUMN_INFO',
                    columnInfo
                });

            } catch (err) {
                console.log(err);
            }
        },
    updateCriteria: (criteria: SearchCriteria): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const advancedCriteria = getState().elrSearch.advancedCriteria;
            const columnInfo = getState().elrSearch.columnInfo;

            if (criteria.fqColumnName) {
                const columnName = columnInfo
                    .filter(info => info.fqColumnName === criteria.fqColumnName)[0].columnName;

                // need to match camelCasing
                criteria.columnName = `${columnName.charAt(0).toLowerCase()}${columnName.slice(1)}`;
            }

            dispatch({
                type: 'UPDATE_ADVANCED_SEARCH',
                advancedCriteria: [...advancedCriteria.filter(w => w.id !== criteria.id), criteria].sort((x, y) => x.id - y.id)
            });
        },
    removeCriteria: (criteria: SearchCriteria): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const advancedCriteria = getState().elrSearch.advancedCriteria;

            dispatch({
                type: 'UPDATE_ADVANCED_SEARCH',
                advancedCriteria: [...advancedCriteria.filter(w => w.id !== criteria.id)]
            });
        },
    search: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const advancedCriteria = getState().elrSearch.advancedCriteria;
            const basicSearch = getState().elrSearch.basicSearch;

            const combinedSearchCriteria = [...advancedCriteria] as SearchCriteria[];

            if (basicSearch.patientFirstName) {
                combinedSearchCriteria.push({
                    id: 4,
                    dataType: 'string',
                    fqColumnName: 'elrRequest.PatientFirstName',
                    columnName: 'patientFirstName',
                    operator: 'LIKE',
                    value: `${basicSearch.patientFirstName.trim()}%`
                });

            }
            if (basicSearch.patientLastName) {
                combinedSearchCriteria.push({
                    id: 3,
                    dataType: 'string',
                    fqColumnName: 'elrRequest.PatientLastName',
                    columnName: 'patientLastName',
                    operator: 'LIKE',
                    value: `${basicSearch.patientLastName.trim()}%`
                });
            }
            if (basicSearch.patientDOB) {
                combinedSearchCriteria.push({
                    id: 2,
                    dataType: 'date',
                    fqColumnName: 'elrRequest.PatientDOB',
                    columnName: 'patientDOB',
                    operator: '=',
                    value: basicSearch.patientDOB
                });
            }
            if (basicSearch.specimenID) {
                combinedSearchCriteria.push({
                    id: 1,
                    dataType: 'string',
                    fqColumnName: 'elrOrder.SpecimenID',
                    columnName: 'specimenID',
                    operator: 'LIKE',
                    value: `${basicSearch.specimenID.trim()}%`
                });
            }

            try {
                const searchData = await AjaxUtils.post(`api/elrsearch/search`, { pageSize: basicSearch.pageSize, criteria: combinedSearchCriteria });

                if (searchData.length > 0) {

                    const keys = Object.keys(searchData[0]).sort(columnOrder('insertedDateTime'));

                    const properties = keys.sort((a, b) => {

                        const foundA = combinedSearchCriteria.some(c => c.columnName === a);
                        const foundB = combinedSearchCriteria.some(c => c.columnName === b);

                        if (foundA && foundB) {
                            return 0;
                        }

                        if (foundA && !foundB) {
                            return -1;
                        }

                        return 1;
                    })
                    .map(property => {
                        return {
                            name: property,
                            wasSearched: combinedSearchCriteria.some(c => c.columnName === property)
                        };
                    });

                    dispatch({
                        type: 'SET_COLUMN_PROPERTIES',
                        properties
                    });
                }

                dispatch({
                    type: 'RECEIVE_ELR_DATA',
                    searchData: searchData.sort(compareValues('assignedICD9Code'))
                });
                return {};

            } catch (err) {
                return err;
            }
        },
    selectObservation: (observationKey: number, county: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'SELECT_OBSERVATION',
                observationKey,
                county
            });
        },
    unSelectObservation: (observationKey: number, county: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'UN_SELECT_OBSERVATION',
                observationKey,
                county
            });
        },
    clearSelectedObservations: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'CLEAR_SELECTED_OBSERVATIONS'
            });
        },
    refilter: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const observationKeys = getState().elrSearch.selectedObservationKeys;
            try {
                const result = await AjaxUtils.post(`api/elrsearch/Refilter`, {
                    observationKeys: observationKeys
                });
                dispatch({
                    type: 'CLEAR_SELECTED_OBSERVATIONS'
                });
                return {};
            } catch (err) {
                return err;
            }
        },

    saveSearchExpressions: (expressions: SearchCriteria[]): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            dispatch({
                type: 'SAVE_SEARCH_ITEM',
                expressions
            });
        },
    clearSearch: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'CLEAR_SEARCH'
            });
        },

    loadTemplates: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {

                const templates = await AjaxUtils.get(`api/elrsearch/templates`);

                dispatch({
                    type: 'RECEIVE_TEMPLATE_LIST',
                    templates
                });

                return {};
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    selectTemplate: (name: string, id: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {

                if (id > 0) {
                    let templateDetails = await AjaxUtils.get(`api/elrsearch/template/${id}`);

                    dispatch({
                        type: 'SAVE_TEMPLATE',
                        templateDetails
                    });
                } else {
                    dispatch({
                        type: 'CREATE_TEMPLATE',
                        name,
                        id
                    });
                }
            } catch (err) { console.log(err); }

        },
    deleteTemplate: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const id = getState().elrSearch.templateID;
                const templates = getState().elrSearch.templates;

                if (id > 0) {
                    await AjaxUtils.remove(`api/elrsearch/template/${id}`);
                }

                dispatch({
                    type: 'CLEAR_SEARCH'
                });

                dispatch({
                    type: 'RECEIVE_TEMPLATE_LIST',
                    templates: [...templates.filter(item => parseInt(item.code) !== id)]
                });
                return {};
            } catch (err) {
                console.log(err);
                return err;
            }
        },
    saveTemplate: (name: string, id: number, templateType: string): AppThunkAction<KnownAction> =>
       async (dispatch, getState) => {
           const advancedCriteria = getState().elrSearch.advancedCriteria;
           let templateDetails = {
               templateName: name.toUpperCase(),
               templateID: id,
               templateType: templateType,
               criteria: advancedCriteria
           };

           if (id > 0)
               await AjaxUtils.put(`api/elrsearch/template`, templateDetails);
           else {
               const details = await AjaxUtils.post(`api/elrsearch/template`, templateDetails);
               templateDetails.templateID = details.templateID;
           }
           dispatch({
               type: 'SAVE_TEMPLATE',
               templateDetails
           });
        },
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ELRSearchState = {
    searchData: [],
    columnInfo: [],
    basicSearch: { patientFirstName: '', patientLastName: '', patientDOB: '', specimenID: '', pageSize: '25' },
    advancedCriteria: [],
    selectedObservationKeys: [],
    county: [],
    columnProperties: [],
    templates: [],
    templateName: '',
    templateID: 0,
    templateType: ''
};

export const reducer: Reducer<ELRSearchState> = (state: ELRSearchState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_BASIC_SEARCH':
            return Object.assign({}, state, { basicSearch: action.basicSearch });
        case 'UPDATE_ADVANCED_SEARCH':
            return Object.assign({}, state, { advancedCriteria: action.advancedCriteria });
        case 'RECEIVE_ELR_DATA':
            return Object.assign({}, state, {
                searchData: action.searchData
            });

        case 'RECEIVE_COLUMN_INFO':
            return Object.assign({}, state, {
                columnInfo: action.columnInfo
            });
        case 'SAVE_SEARCH_ITEM':
            return Object.assign({}, state, {
                expressions: action.expressions
            });
        case 'SELECT_OBSERVATION':
            return Object.assign({}, state, {
                selectedObservationKeys: [...state.selectedObservationKeys.filter(key => key !== action.observationKey), action.observationKey],
                county: [...state.county.filter(item => item.observationKey !== action.observationKey), { county: action.county, observationKey: action.observationKey }]
            });
        case 'UN_SELECT_OBSERVATION':
            return Object.assign({}, state, {
                selectedObservationKeys: state.selectedObservationKeys.filter(key => key !== action.observationKey),
                county: state.county.filter(key => key.observationKey !== action.observationKey)
            });
        case 'CLEAR_SELECTED_OBSERVATIONS':
            return Object.assign({}, state, {
                selectedObservationKeys: [],
                county: unloadedState.county,
            });
        case 'CLEAR_SEARCH':
            return Object.assign({}, state, {
                searchData: unloadedState.searchData,
                basicSearch: unloadedState.basicSearch,
                advancedCriteria: unloadedState.advancedCriteria,
                selectedObservationKeys: unloadedState.selectedObservationKeys,
                templateName: unloadedState.templateName,
                templateID: unloadedState.templateID,
                templateType: unloadedState.templateType,
                county: unloadedState.county,
            });
        case 'SET_COLUMN_PROPERTIES':
            return { ...state, columnProperties: action.properties };

        case 'SAVE_TEMPLATE':
            return Object.assign({}, state, {
                advancedCriteria: action.templateDetails.criteria.sort((x: any, y: any) => x.id - y.id),
                templateName: action.templateDetails.templateName,
                templateID: action.templateDetails.templateID,
                templateType: action.templateDetails.templateType,
            });
        case 'RECEIVE_TEMPLATE_LIST':
            return Object.assign({}, state, {
                templates: action.templates
            });
        case 'CREATE_TEMPLATE':
            return Object.assign({}, state, {
                advancedCriteria: unloadedState.advancedCriteria,
                templateName: action.name,
                templateID: action.id,
            });

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
