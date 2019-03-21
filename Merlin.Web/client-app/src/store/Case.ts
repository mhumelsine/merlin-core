import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import * as AjaxUtils from '../utils/AjaxUtils';
import { defaults } from '../utils/Global';
import { DropdownCode, CodeType } from './Code'; 
import TravelHistory from '../components/case/TravelHistory';
import { TravelType } from '../components/case/TravelHistoryItem';


export interface CaseState {
    symptoms: CaseSymptom[]; //should not need paging here since the list of labs on a case are finite and small
    caseId: number;
    epiLinks: EpiLink[];
    labSummary: LabResult[];
    labs: Lab[]; //should not need paging here since the list of labs on a case are finite and small
    healthCareVisits: HealthCareVisit[]; //should not need paging here since the list of labs on a case are finite and small
    travelHistory: TravelHistoryCase;
    vaccineHistory: VaccineHistory[];
    caseDetails: CaseDetails;
    vaccines: DropdownCode[];
    treatments: TreatmentItem[];
}

export interface CaseDetails {
    caseId: number;
    profileId: number;
    name: string;
    dateOfBirth: string;
    icd9: string;
    caseEventDate: string;
    caseStatus: string;
}

export interface LabResult {
    caseId: number;
    label: string;
    value: string;
    values?: DropdownCode[];
}

export interface CaseSymptom {
    symptomCode: string;
    symptomName: string;
    caseId: number;
    onsetDate: string;
    onsetTime: string;
    other: string;
    hasSymptom: boolean;
}

export interface EpiLink {
    profileId: string;
    relationshipType: string;
    firstName: string
    lastName: string;
    caseId: string;
    dxStatus: string;
    icd9: string;
    flDiseaseCode: string;
    eventDate: string;
}

export interface HealthCareVisit {
    id: number;
    caseId: number;
    visitStartedOn: string;
    visitEndedOn: string;
    roomNumber: string;
    visitType: string;
    medication: string;
    xray: string;
    emergencyVisit: string;
    hospitalName: string;
}

export interface Lab {
	profileId: string;
    labId: number;
    reportDate: string;
    eventDate: string;
    specimen: string;
    labTest: string;
    resultDetail: string;
	accession: string;
	nameIcd9: string;
    icd9: string;
	stateLab: boolean;
	overallResult: string;
}

export interface VaccineHistory {
    vaccineType: string;
    dateGiven: string;
    manufacturer: string;
    lotNumber: string;
    doseNumber: string;
    profileID: number;
    caseId: number;
    icd9: string;
    vaccineID: number;
}

export interface TravelHistoryCase {
    travelHistoryItems: TravelHistoryItem[];
    exposureLocation: ExposureLocationCase;
    addressFound: Address;
}

export interface TravelHistoryItem {
    travelId: number;
    travelType: TravelType;
    locationExposed: string;
    locationName: string;
    address: Address;
    beginDate: string;
    endDate: string;
    notes: string;
}

export interface TreatmentItem {
    [index: string]: any;
    treatmentId: number;
    antibioticType: string;
    dateStarted: string;
    numberOfDaysTaken: string;
}

export interface ExposureLocationCase {
    locationExposedSelected: string[];
    locationsExposed: DropdownCode[]; 
    imported: DropdownCode[];  
    origin: string[]; 
}

export interface Address {
    addressLine1: string;
    addressLine2: string;
    county: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    [index: string]: any;
}

//actions
interface RequestSymptomsForCase {
    type: "REQUEST_SYMPTOMS_FOR_CASE",
    caseId: number;
}

interface ReceiveSymptomsForCase {
    type: "RECEIVE_SYMPTOMS_FOR_CASE",
    symptoms: CaseSymptom[];
}

interface RequestTravelHistoryForCase {
    type: "REQUEST_TRAVEL_HISTORY_FOR_CASE",
    caseId: number;
}

interface ReceiveTravelHistorysForCase {
    type: "RECEIVE_TRAVEL_HISTORY_FOR_CASE",
    travelHistory: TravelHistoryCase;
}

interface RequestExposureLocation {
    type: "REQUEST_EXPOSURE_LOCATION",
    caseId: number;
}

interface ReceiveExposureLocation {
    type: "RECEIVE_EXPOSURE_LOCATION",
    exposureLocation: ExposureLocationCase;
}

interface RequestEpiLinksForCase {
    type: "REQUEST_EPILINKS_FOR_CASE",
    caseId: number;
}

interface ReceiveEpiLinksForCase {
    type: "RECEIVE_EPILINKS_FOR_CASE",
    epiLinks: EpiLink[];
}

interface RequestLabsForCase {
    type: "REQUEST_LABS_FOR_CASE",
    caseId: number;
}

interface ReceiveLabsForCase {
    type: "RECEIVE_LABS_FOR_CASE",
    labs: Lab[];
}

interface RequestLabSummaryForCase {
    type: "REQUEST_LABSUMMARY_FOR_CASE",
    caseId: number,
    diseaseId: string;
}

interface ReceiveLabSummaryForCase {
    type: "RECEIVE_LABSUMMARY_FOR_CASE",
    LabSummary: LabResult[];
}

interface RequestHealthCareVisitsForCase {
    type: 'REQUEST_HEALTHCARE_VISITS_FOR_CASE',
    caseId: number;
}

interface ReceiveHealthCareVisitsForCase {
    type: 'RECEIVE_HEALTHCARE_VISITS_FOR_CASE',
    healthCareVisits: HealthCareVisit[];
}

interface ReceiveAddressByZip {
    type: "RECEIVE_ADDRESS_BY_ZIP",
    address: Address;
}

interface RemoveTravelHistoryAction {
    type: "REMOVE_TRAVEL_HISTORY";
    travelId: number;
}

interface AddTravelHistoryAction {
    type: "ADD_TRAVEL_HISTORY";
    travelHistoryItem: TravelHistoryItem;
}

interface EditTravelHistoryAction {
    type: "EDIT_TRAVEL_HISTORY";
    travelHistoryItem: TravelHistoryItem;
}

interface RequestVaccineHistoryForCase {
    type: 'REQUEST_VACCINE_HISTORY_FOR_CASE',
    caseId: number;
}

interface ReceiveVaccineHistoryForCase {
    type: 'RECEIVE_VACCINE_HISTORY_FOR_CASE',
    vaccineHistory: VaccineHistory[];
}

interface RequestDetailsForCase {
    type: 'REQUEST_DETAILS_FOR_CASE',
    caseId: number;
}

interface ReceiveDetailsForCase {
    type: 'RECEIVE_DETAILS_FOR_CASE',
    caseDetails: CaseDetails;
}

interface ReceiveVaccinesForCase {
    type: 'RECEIVE_VACCINES_FOR_CASE',
    vaccines:DropdownCode[]
}

interface SaveVaccineHistory {
    type: 'SAVE_VACCINEHIST_FOR_CASE',
    vaccineHistory: VaccineHistory
}

interface DeleteVaccineHistoryItem {
    type: 'DELETE_VACCINEHIST_FOR_CASE',
    vaccineID: number;
}

interface EditVaccineHistoryItem {
    type: 'EDIT_VACCINEHIST_FOR_CASE',
    vaccineHistory: VaccineHistory
}

interface AddTreatmentAction {
    type: "ADD_TREATMENT";
    treatmentItem: TreatmentItem;
}

interface RemoveTreatmentAction {
    type: "REMOVE_TREATMENT";
    treatmentId: number;
}

interface EditTreatmentAction {
    type: "EDIT_TREATMENT";
    treatmentItem: TreatmentItem;
}

type KnownAction = RequestSymptomsForCase
    | ReceiveSymptomsForCase
    | RequestLabsForCase
    | ReceiveLabsForCase
    | RequestHealthCareVisitsForCase
    | ReceiveHealthCareVisitsForCase
    | RequestEpiLinksForCase
    | ReceiveEpiLinksForCase
    | RequestLabSummaryForCase
    | ReceiveLabSummaryForCase
    | RequestExposureLocation
    | ReceiveExposureLocation
    | RequestTravelHistoryForCase
    | ReceiveTravelHistorysForCase
    | ReceiveAddressByZip
    | AddTravelHistoryAction
    | RemoveTravelHistoryAction
    | EditTravelHistoryAction
    | RequestVaccineHistoryForCase
    | ReceiveVaccineHistoryForCase
    | RequestDetailsForCase
    | ReceiveDetailsForCase
    | ReceiveVaccinesForCase
    | SaveVaccineHistory
    | EditVaccineHistoryItem
    | DeleteVaccineHistoryItem
    | AddTreatmentAction
    | RemoveTreatmentAction
    | EditTreatmentAction;

export const actionCreators = {
    loadTravelHistoryForCase: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const currentState = getState().case;

            if (caseId !== currentState.caseId) {
                dispatch({
                    type: "REQUEST_TRAVEL_HISTORY_FOR_CASE",
                    caseId
                });

                try {
                    const travelHistoryItems = await AjaxUtils.get(`api/Case/${caseId}/travelhistory`);

                    const exposureLocation = (!currentState.travelHistory.exposureLocation)
                        ? await AjaxUtils.get(`api/Case/${caseId}/exposurelocation`)
                        : currentState.travelHistory.exposureLocation;

                    const travelHistory = Object.assign({}, currentState.travelHistory, {
                        travelHistoryItems,
                        exposureLocation
                    });

                    dispatch({
                        type: "RECEIVE_TRAVEL_HISTORY_FOR_CASE",
                        travelHistory
                    });

                } catch (err) {
                    console.log(err);
                }
            }
        },
    loadLabSummaryForCase: (caseId: number, diseaseId: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const currentState = getState().case;

            if (caseId !== currentState.caseId || currentState.labSummary.length === 0) {
                dispatch({
                    type: "REQUEST_LABSUMMARY_FOR_CASE",
                    caseId,
                    diseaseId
                });

                try {
                    const LabSummary = await AjaxUtils.get(`api/Case/${caseId}/labsummary`);

                    dispatch({
                        type: "RECEIVE_LABSUMMARY_FOR_CASE",
                        LabSummary
                    });

                } catch (err) {
                    console.log(err);
                }
            }
        },
    loadSymptomsForCase: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const currentState = getState().case;

            if (caseId !== currentState.caseId || currentState.symptoms.length === 0) {

                dispatch({
                    type: "REQUEST_SYMPTOMS_FOR_CASE",
                    caseId
                });

                try {
                    var symptoms = await AjaxUtils.get(`api/Case/${caseId}/symptoms`);

                    dispatch({
                        type: 'RECEIVE_SYMPTOMS_FOR_CASE',
                        symptoms
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        },
    loadLabsForCase: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const currentState = getState().case;
			
                dispatch({
                    type: "REQUEST_LABS_FOR_CASE",
                    caseId
                });

                try {
                    const labs = await AjaxUtils.get(`api/Case/${caseId}/labs`);

                    dispatch({
                        type: "RECEIVE_LABS_FOR_CASE",
                        labs
                    });

                } catch (err) {
                    console.log(err);
                }
        },
    loadHealthCareVisits: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const currentState = getState().case;

            if (caseId !== currentState.caseId || currentState.healthCareVisits.length === 0) {
                dispatch({
                    type: "REQUEST_HEALTHCARE_VISITS_FOR_CASE",
                    caseId
                });

                try {
                    const healthCareVisits = await AjaxUtils.get(`api/Case/${caseId}/healthcarevisits`);

                    dispatch({
                        type: "RECEIVE_HEALTHCARE_VISITS_FOR_CASE",
                        healthCareVisits
                    });

                } catch (err) {
                    console.log(err);
                }
            }
        },
    loadEpiLinksForCase: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const currentState = getState().case;

            if (caseId !== currentState.caseId || currentState.symptoms.length === 0) {

                dispatch({
                    type: "REQUEST_EPILINKS_FOR_CASE",
                    caseId
                });

                try {
                    var epiLinks = await AjaxUtils.get(`api/Case/${caseId}/epilinks`);

                    dispatch({
                        type: 'RECEIVE_EPILINKS_FOR_CASE',
                        epiLinks
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        },
    saveExposureLocation: (origin: string[], locationsExposed: string[]): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const currentState = getState().case.travelHistory;
            const exposureLocation = Object.assign({}, currentState.exposureLocation, {
                origin:  [...origin],
                locationExposedSelected: locationsExposed
            });

            dispatch({
                type: 'RECEIVE_EXPOSURE_LOCATION',
                exposureLocation
            });
        },
    requestAddress: (zipCode: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            try {
                const address = await AjaxUtils.get(`api/Address/${zipCode}`);

                dispatch({
                    type: "RECEIVE_ADDRESS_BY_ZIP",
                    address
                });

            } catch (err) {
                console.log(err);
            }

        },
    addTravelHistory: (travelHistoryItem: TravelHistoryItem): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "ADD_TRAVEL_HISTORY",
                travelHistoryItem
            });
        },
    removeTravelHistory: (travelId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "REMOVE_TRAVEL_HISTORY",
                travelId
            });
        },
    editTravelHistory: (travelHistoryItem: TravelHistoryItem): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "EDIT_TRAVEL_HISTORY",
                travelHistoryItem
            });
        },
    loadVaccineHistory: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const currentState = getState().case;

            if (caseId !== currentState.caseId || currentState.vaccineHistory.length === 0) {
                dispatch({
                    type: "REQUEST_VACCINE_HISTORY_FOR_CASE",
                    caseId
                });

                try {
                    const vaccineHistory = await AjaxUtils.get(`api/Case/${caseId}/vaccinehistory`);

                    dispatch({
                        type: "RECEIVE_VACCINE_HISTORY_FOR_CASE",
                        vaccineHistory
                    });

                } catch (err) {
                    console.log(err);
                }
            }
        },
    loadDetailsForCase: (caseId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const currentState = getState().case;

            if (caseId !== currentState.caseId) {

                dispatch({
                    type: "REQUEST_DETAILS_FOR_CASE",
                    caseId
                });

                try {
                    var caseDetails = await AjaxUtils.get(`api/Case/${caseId}/details`) as CaseDetails;

                    dispatch({
                        type: 'RECEIVE_DETAILS_FOR_CASE',
                        caseDetails
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
        }, 
    loadVaccines: (icd9Code: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                var vaccines = await AjaxUtils.get(`api/Case/${CodeType.vaccineType}/${icd9Code}`);

                dispatch({
                    type: 'RECEIVE_VACCINES_FOR_CASE',
                    vaccines
                });
            }
            catch (err) {
                console.log(err);
            }
    },
    SaveVaccineHistoryItem: (vaccineHistory: VaccineHistory): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            const currentState = getState().case;
            const vaccineHist = currentState.vaccineHistory.find(hist => { return (hist.vaccineID === vaccineHistory.vaccineID); })

            if (vaccineHist !== undefined) {
                dispatch({
                    type: "EDIT_VACCINEHIST_FOR_CASE",
                    vaccineHistory
                });
            }
            else {
                dispatch({
                    type: "SAVE_VACCINEHIST_FOR_CASE",
                    vaccineHistory
                });
            }
        },
    DeleteVaccineHistoryItem: (vaccineID: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            dispatch({
                type: "DELETE_VACCINEHIST_FOR_CASE",
                vaccineID
            });

        }, 
    addTreatment: (treatmentItem: TreatmentItem): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "ADD_TREATMENT",
                treatmentItem
            });
        },
    removeTreatment: (treatmentId: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "REMOVE_TREATMENT",
                treatmentId
            });
        },
    editTreatment: (treatmentItem: TreatmentItem): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "EDIT_TREATMENT",
                treatmentItem
            });
        }
};

const unloadedState: CaseState = {
    symptoms: [] as CaseSymptom[],
    epiLinks: [] as EpiLink[],
    labSummary: [] as LabResult[],
    caseId: 0,
    labs: [] as Lab[],
    healthCareVisits: [] as HealthCareVisit[],
    travelHistory: {} as TravelHistoryCase,
    vaccineHistory: [] as VaccineHistory[],
    caseDetails: {} as CaseDetails,
    vaccines :[], 
    treatments: [] as TreatmentItem[]
};

//reducer
export const reducer: Reducer<CaseState> = (state: CaseState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_LABS_FOR_CASE':
        case "REQUEST_SYMPTOMS_FOR_CASE":
        case "REQUEST_HEALTHCARE_VISITS_FOR_CASE":
        case "REQUEST_EPILINKS_FOR_CASE":
        case "REQUEST_EXPOSURE_LOCATION":
        case "REQUEST_VACCINE_HISTORY_FOR_CASE":
        case "REQUEST_DETAILS_FOR_CASE":
        case "REQUEST_TRAVEL_HISTORY_FOR_CASE":
            return Object.assign({}, state, { caseId: action.caseId });
        case "REQUEST_LABSUMMARY_FOR_CASE":
            return Object.assign({}, state, { caseId: action.caseId, diseaseId: action.diseaseId });
        case "RECEIVE_SYMPTOMS_FOR_CASE":
            return Object.assign({}, state, {
                symptoms: action.symptoms
            });
        case 'RECEIVE_LABS_FOR_CASE':
            return Object.assign({}, state, {
                labs: action.labs
            });
        case "RECEIVE_EPILINKS_FOR_CASE":
            return Object.assign({}, state, {
                epiLinks: action.epiLinks
            });
        case "RECEIVE_HEALTHCARE_VISITS_FOR_CASE":
            return Object.assign({}, state, {
                healthCareVisits: action.healthCareVisits
            });
        case "RECEIVE_LABSUMMARY_FOR_CASE":
            return Object.assign({}, state, {
                labSummary: action.LabSummary
            });
        case "RECEIVE_EXPOSURE_LOCATION":
            const newState = Object.assign({}, state.travelHistory, {
                exposureLocation: action.exposureLocation
            });
            return Object.assign({}, state, {
                travelHistory: newState
            });
        case "RECEIVE_TRAVEL_HISTORY_FOR_CASE":
            return Object.assign({}, state, {
                travelHistory: action.travelHistory
            });
        case "RECEIVE_HEALTHCARE_VISITS_FOR_CASE":
            return Object.assign({}, state, {
                healthCareVisits: action.healthCareVisits
            });
        case "RECEIVE_ADDRESS_BY_ZIP":
            const newTravelHistory = Object.assign({}, state.travelHistory, {
                  addressFound: action.address
            });
            return Object.assign({}, state, {
                travelHistory: newTravelHistory
            });
        case "RECEIVE_VACCINE_HISTORY_FOR_CASE":
            return Object.assign({}, state, {
                vaccineHistory: action.vaccineHistory
            });
        case "RECEIVE_DETAILS_FOR_CASE":
            return Object.assign({}, state, {
                caseDetails: action.caseDetails

            });
        case "RECEIVE_VACCINES_FOR_CASE":

            return Object.assign({}, state, {
                vaccines: action.vaccines
            });
        case "ADD_TRAVEL_HISTORY":
            return (function () {

                const newItem = Object.assign({}, action.travelHistoryItem);
                const newState = Object.assign({}, state, {
                    travelHistory: Object.assign({}, state.travelHistory)
                });
                const travelHistory = newState.travelHistory;

                if (!newItem.travelId) {
                    newItem.travelId = Date.now();
                }

                travelHistory.travelHistoryItems.push(newItem);

                return newState;
            })();
        case "REMOVE_TRAVEL_HISTORY":
            return (function () {

                const newState = Object.assign({}, state, {
                    travelHistory: Object.assign({}, state.travelHistory)
                });
                const travelHistory = newState.travelHistory;

                const indexToRemove = newState.travelHistory.travelHistoryItems.findIndex(item => {
                    return item.travelId == action.travelId;
                });

                travelHistory.travelHistoryItems.splice(indexToRemove, 1)

                return newState;
            })();
        case "EDIT_TRAVEL_HISTORY":
            return (function () {

                const newState = Object.assign({}, state, {
                    travelHistory: Object.assign({}, state.travelHistory)
                });
                const travelHistory = newState.travelHistory;

                const indexToEdit = newState.travelHistory.travelHistoryItems.findIndex(item => {
                    return item.travelId == action.travelHistoryItem.travelId;
                });

                travelHistory.travelHistoryItems[indexToEdit] = action.travelHistoryItem;

                return newState;
            })();
        case "ADD_TREATMENT":
            return (function () {

                 const newItem = Object.assign({}, action.treatmentItem);
                 const treatments = [...state.treatments]; 

                 if (!newItem.treatmentId) {
                     newItem.treatmentId = Date.now();
                 }

                 treatments.push(newItem);

                return Object.assign({}, state, {
                    treatments: treatments
                });
            })();
        case "REMOVE_TREATMENT":
            return (function () { 
                const treatments = [...state.treatments]; 
                const indexToRemove =   treatments.findIndex(item => {
                    return item.treatmentId == action.treatmentId
                });
                
                treatments.splice(indexToRemove,1); 

                return Object.assign({}, state, {
                   treatments: treatments
               });
            })();
        case "EDIT_TREATMENT":
            return (function () {
               const treatments = [...state.treatments]; 
               const indexToEdit =   treatments.findIndex(item => {
                return item.treatmentId == action.treatmentItem.treatmentId
                });
              
                treatments[indexToEdit] = action.treatmentItem; 
              
                return Object.assign({}, state, {
                treatments: treatments
            });

            })();
        case "SAVE_VACCINEHIST_FOR_CASE":
            return (function () {
                const newItem = Object.assign({}, action.vaccineHistory);
                const newState1 = Object.assign({}, state)

                const vaccineHistory = [...newState1.vaccineHistory];


                vaccineHistory.push(newItem);

                const newState = Object.assign({}, state, {
                    vaccineHistory: [...vaccineHistory]
                });
                return newState;
            })();
        case "EDIT_VACCINEHIST_FOR_CASE":
            return (function () {
                const newItem = Object.assign({}, action.vaccineHistory);
                const newState1 = Object.assign({}, state)

                const vaccineHistory = [...newState1.vaccineHistory];

                const vaccineHistoryNew = vaccineHistory.filter(item => { return (item.vaccineID !== newItem.vaccineID) })
                vaccineHistoryNew.push(newItem);

                const newState = Object.assign({}, state, {
                    vaccineHistory: [...vaccineHistoryNew]
                });
                return newState;
            })();
        case "DELETE_VACCINEHIST_FOR_CASE":
            return (function () {

                const newState1 = Object.assign({}, state)
                const vaccineHistory = [...newState1.vaccineHistory];
                const vaccineHistoryNew = vaccineHistory.filter(item => { return (item.vaccineID !== action.vaccineID) })

                const newState = Object.assign({}, state, {
                    vaccineHistory: [...vaccineHistoryNew]
                });

                return newState;
            })();
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
}