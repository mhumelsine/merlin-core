import { Action, Reducer } from 'redux';
import { AddressType } from '../components/common/Address';
import * as AjaxUtils from '../utils/AjaxUtils';
import { defaults } from '../utils/Global';
import { AppThunkAction } from './';
import { DropdownCode } from './Code';
import Conclusions from '../components/Outbreak/Conclusions';

export enum OutbreakControlsTitle {
    Background = 'Background',
    GeographicLocation = 'Geographic Location',
    SettingInformation = 'Setting Information',
    Transmission = 'Transmission',
    Methods = 'Methods',
    Epicom = 'Epicom',
    Layout = 'Survey',
    Results = 'Results',
    ClinicalResults = 'Clinical Results',
    LaboratoryResults = 'Laboratory Results',
    Conclusions = 'Conclusions/Lessons Learned',
    Documents = 'Documents',
    Notes = 'Notes',
    AuditFields = 'Audit Fields',
    CaseReview = 'Case Review',
}

export enum resultTypes {
    cases = 'Total Cases',
    gender = 'Gender',
    staff = 'Staff Exposures',
    age = 'Age (in Years)',
    outcome = 'Case Outcomes'
}

export enum OutbreakCommonListItems {
    noteType = 'notes',
    documentsType = 'documents',
    settingInfoType = 'settingInformation'
}

export enum OutbreakCommonItems {
    geographicLocationType = 'geographicLocation',
    transmissionType = 'transmission',
    methodsType = 'methods',
    clinicalResultsType = 'clinicalResults',
    conclusionsType = 'conclusions',
    caseReviewType = 'caseReview',
    laboratoryResultsType = 'laboratoryResults',
    survey = 'survey',
    epicomType = 'epicom',
    resultsType = 'results',
    auditFieldsType = 'auditFields',
    background = 'background'
}

type OutbreakAllSectionsType = OutbreakCommonListItems | OutbreakCommonItems;
export const OutbreakAllSections = {
    ...OutbreakCommonListItems,
    ...OutbreakCommonItems
};

export interface OutbreakState {
    outbreakId: string;
    isSubmit: boolean;
    background: Background;
    auditInfo: AuditInfo;
    notes: Note[];
    documents: Document[];
    documentBeingEdited: Document | undefined;
    settingInfo: SettingInfo[];
    settingBeingEdited: SettingInfo | undefined;
    geographicLocation: GeographicLocation;
    transmission: Transmission;
    methods: Methods;
    clinicalResults: ClinicalResults;
    conclusions: Conclusions;
    caseReview: CaseReview;
    laboratoryResults: LaboratoryResults;
    epiComPostBeingEdited: EpiComPost | undefined;
    epiComPost: EpiComPost;
    epicomForumNameList: DropdownCode[];
    epicomForumTopicList: DropdownCode[];
    results: Results;
    layoutUid: string;
    surveyUid: string;
    surveyAnswers: {};
    outbreakLabList: any[];
    [index: string]: any;
}

export interface CommonListItems {
    id: string;
    itemType: OutbreakCommonListItems;
    [index: string]: any;
}

export interface Note {
    eventId: string;
    note: string;
    dateAdded: string;
    authorName: string;
    noteType: string;
}

export interface Document {
    id: string;
    fileReference: any;
    description: string;
    fileName: string;
    documentName: string;
    documentType: string;
    documentDate: string;
    userAdded: string;
    dateAdded: string;
}

export interface SettingInfo {
    id: string;
    outbreakId: string;
    settingName: string;
    settingFacilityId: string;
    isPrimary: boolean;
    settingType: string;
    otherType: string;
    settingContact: string;
    settingContactPhone: string;
    address: AddressType;
}

export interface Background {
    outbreakId: string;
    eventName: string;
    notifiedDate: string;
    firstNotified: string;
    reporterName: string;
    outbreakStatus: string;
    investigationStarted: string;
    investigationClosed: string;
    syndrome: string;
    otherSyndrome: string;
    diseaseHazard: string;
    otherDiseaseHazard: string;
    estimatedNumber: string;
    isOutbreak: string;
    isInvestigated: string;
}

export interface AuditInfo {
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
}

export interface GeographicLocation {
    county: string;
    otherCountiesAffected: string;
    otherCountiesList: string[];
    otherStatesAffected: string;
    otherStatesList: string[];
    otherCountriesList: string[];
}

export interface Transmission {
    transmissionMode: string;
    foodOrWaterRelated: string;
    isVehicleIdentified: string;
    vehicle: string;
    healthRelated: string;
    causeForOutbreak: string;
    description: string;
}

export interface Methods {
    caseDefinition: string;
    studyDesigns: string[];
    investigationMethods: string[];
    isLabTestingConducted: string;
    staffConsulted: string;
    regulatoryAgencies: string[];
    investigator: string;
}

export interface ClinicalResults {
    symptom: string[];
    otherSymptom: string;
    firstExposureDate: string;
    lastExposureDate: string;
    firstOnsetDate: string;
    lastOnsetDate: string;
    duration: string;
    timeUnit: string;
    outbreakEventDate: string;
}

export interface Conclusions {
    decisions: string;
    recommendations: string;
    controlMeasures: string;
    isRecProvided: string;
    methodofRec: string;
    recImplemented: string;
    improvementAreas: string;
    isReportCompleted: string;
}

export interface LaboratoryResults {
    isHumanSpecimens: string;
    noOfCases: number;
    isLabTestingConducted: string;
    isFoodSpecimens: string;
    labFindings: string;
}

export interface CaseReview {
    reviewStatus: string;
    comments: string;
    reviewedBy: string;
    reviewedOn: string;
    isSubmitted: boolean;
}

export interface EpiComPost {
    outbreakId: string;
    postId: string;
    pendingPostId: string;
    forumId: string;
    topicId: string;
    title: string;
    date: string;
    message: string;
    epicomUserId: string;
    forumDescription: string;
    topicDescription: string;
}

export interface Results {
    totalCases: number;
    totalCaseType: string;
    nonStaffCases: number;
    staffCases: number;
    unknownCases: number;
    emergencyVisits: number;
    emergencyVisitsType: string;
    inpatientHospitalizations: number;
    inpatientHospitalizationsType: string;
    deaths: number;
    deathsType: string;
}

export interface TotalCasesDtls {
    totalCases: number;
    totalExposed: number;
}

export interface GenderDetails {
    maleCases: number;
    femaleCases: number;
    unknownGenderCases: number;
}

export interface StaffDtls {
    staffCases: number;
    staffExposed: number;
    nonstaffCases: number;
    nonstaffExposed: number;
    unknownCases: number;
    unknownExposed: number;
}

export interface AgeDtls {
    ageLessthan1: number;
    age1to4: number;
    age5to9: number;
    age10to19: number;
    age20to49: number;
    age50to74: number;
    ageGreater74: number;
    ageUnknown: number;
}

export interface CaseOutComeDtls {
    infoAvailable: number;
    soughtCases: number;
    erCases: number;
    inpatientCases: number;
    diedCases: number;
    soughtCasesWithInfo: number;
    erCasesWithInfo: number;
    inpatientCasesWithInfo: number;
    diedCasesWithInfo: number;
}

// Actions

interface SetOutbreakId {
    type: 'SET_OUTBREAK_ID';
    outbreakId: string;
}

interface ReceiveBackground {
    type: 'RECEIVE_BACKGROUND';
    background: Background;
}

interface ReceiveGeographicLocation {
    type: 'RECEIVE_GEOGRAPHIC_LOCATION';
    geographicLocation: GeographicLocation;
}

interface ReceiveSettingInfo {
    type: 'RECEIVE_SETTING_INFO';
    settingInfo: SettingInfo;
}

interface CreateSetting {
    type: 'CREATE_SETTING';
    outbreakId: string;
}

interface UpdateSetting {
    type: 'UPDATE_SETTING';
    setting: SettingInfo;
}

interface SaveSettingSuccess {
    type: 'SAVE_SETTING_SUCCESS';
    settings: SettingInfo[];
}

interface CancelSettingEdit {
    type: 'CANCEL_SETTING_EDIT';
}

interface SelectSettingEdit {
    type: 'SELECT_SETTING_EDIT';
    settingToEdit: SettingInfo;
}
interface DeleteSettingSuccess {
    type: 'DELETE_SETTING_SUCCESS';
    deletedSettingId: string;
}
interface ReceiveTransmission {
    type: 'RECEIVE_TRANSMISSION';
    transmission: Transmission;
}
interface UpdateTransmission {
    type: 'UPDATE_TRANSMISSION';
    transmission: Transmission;
}
interface ReceiveMethod {
    type: 'RECEIVE_METHOD';
    methods: Methods;
}
interface UpdateMethod {
    type: 'UPDATE_METHOD';
    methods: Methods;
}
interface ReceiveResults {
    type: 'RECEIVE_RESULTS';
    results: Results;
}
interface UpdateResults {
    type: 'UPDATE_RESULTS';
    results: Results;
}
interface ReceiveClinicalResults {
    type: 'RECEIVE_CLINICAL_RESULTS';
    results: Results;
}
interface UpdateClinicalResults {
    type: 'UPDATE_CLINICAL_RESULTS';
    results: ClinicalResults;
}
interface ReceiveLaboratoryResults {
    type: 'RECEIVE_LABORATORY_RESULTS';
    results: LaboratoryResults;
}
interface UpdateLaboratoryResults {
    type: 'UPDATE_LABORATORY_RESULTS';
    results: LaboratoryResults;
}
interface ReceiveConclusions {
    type: 'RECEIVE_CONCLUSIONS';
    conclusions: Conclusions;
}
interface UpdateConclusions {
    type: 'UPDATE_CONCLUSIONS';
    conclusions: Conclusions;
}

/* using doc instead of document to eliminate as possible conflist with the document object in the DOM */
interface ReceiveDocumentList {
    type: 'RECEIVE_DOCUMENT_LIST';
    documentList: Document[];
}

interface CreateDocument {
    type: 'CREATE_DOCUMENT';
    outbreakId: string;
}

interface UpdateDocument {
    type: 'UPDATE_DOCUMENT';
    documentBeingEdited: Document;
}

interface UploadDocumentSuccess {
    type: 'UPLOAD_DOCUMENT_SUCCESS';
    savedDocument: Document;
}

interface CancelDocumentEdit {
    type: 'CANCEL_DOCUMENT_EDIT';
}

interface SelectDocumentEdit {
    type: 'SELECT_DOCUMENT_EDIT';
    documentToEdit: Document;
}
interface DeleteDocumentSuccess {
    type: 'DELETE_DOCUMENT_SUCCESS';
    deletedDocumentId: string;
}
interface ReceiveNotesList {
    type: 'RECEIVE_NOTES_LIST';
    noteList: Note[];
}

interface CreateNote {
    type: 'CREATE_NOTE';
    outbreakId: string;
}

interface UpdateNote {
    type: 'UPDATE_NOTE';
    note: Note;
}

interface SaveNoteSuccess {
    type: 'SAVE_NOTE_SUCCESS';
    savedNote: Note;
}

interface CancelNoteEdit {
    type: 'CANCEL_NOTE_EDIT';
}

interface SelectNoteEdit {
    type: 'SELECT_NOTE_EDIT';
    noteToEdit: Note;
}
interface DeleteNoteSuccess {
    type: 'DELETE_NOTE_SUCCESS';
    deletedNoteId: string;
}
interface ReceiveAuditInfo {
    type: 'RECEIVED_AUDIT_INFO';
    auditInfo: AuditInfo;
}
interface ReceiveCaseReview {
    type: 'RECEIVED_CASE_REVIEW';
    caseReview: CaseReview;
}
interface UpdateCaseReview {
    type: 'UPDATE_CASE_REVIEW';
    caseReview: CaseReview;
}
interface ReceiveSurveyInfo {
    type: 'RECEIVED_SURVEY_INFO';
    layoutUid: string;
    surveyUid: string;
}
interface ReceiveEpiComForumNames {
    type: 'RECEIVED_EPICOM_FORUM_NAMES';
    epicomForumNameList: DropdownCode[];
}
interface ReceiveEpiComForumTopics {
    type: 'RECEIVED_EPICOM_FORUM_TOPICS';
    epicomForumTopicList: DropdownCode[];
}
interface ReceivedEpiComPost {
    type: 'RECEIVED_EPICOM_POST';
    post: EpiComPost;
}
interface CreateEpiComPost {
    type: 'CREATE_EPICOM_POST';
    epiComPostBeingEdited: EpiComPost;
}
interface UpdateEpiComPost {
    type: 'UPDATE_EPICOM_POST';
    epiComPostBeingEdited: EpiComPost;
}

interface SaveEpiComPostSuccess {
    type: 'SAVE_EPICOM_POST_SUCCESS';
    epiComPost: EpiComPost;
}

interface CancelEpiComPostEdit {
    type: 'CANCEL_EPICOM_POST_EDIT';
}

interface UpdateEpiComPostID {
    type: 'UPDATE_EPICOM_POST_ID';
    postId: number;
}

interface UpdateSurveyAnswers {
    type: 'UPDATE_SURVEY_ANSWERS';
    answers: any;
}

interface ReceiveOutbreakLabList {
    type: 'RECEIVE_OUTBREAK_LAB_LIST';
    outbreakLabList: any[];
}

type KnownAction =
    SetOutbreakId
    | ReceiveBackground
    | ReceiveGeographicLocation
    | ReceiveSettingInfo
    | CreateSetting
    | UpdateSetting
    | SaveSettingSuccess
    | CancelSettingEdit
    | SelectSettingEdit
    | DeleteSettingSuccess
    | ReceiveTransmission
    | UpdateTransmission
    | ReceiveMethod
    | UpdateMethod
    | ReceiveResults
    | UpdateResults
    | ReceiveClinicalResults
    | UpdateClinicalResults
    | ReceiveLaboratoryResults
    | UpdateLaboratoryResults
    | ReceiveConclusions
    | UpdateConclusions
    | ReceiveDocumentList
    | CreateDocument
    | UpdateDocument
    | UploadDocumentSuccess
    | CancelDocumentEdit
    | SelectDocumentEdit
    | DeleteDocumentSuccess
    | ReceiveNotesList
    | CreateNote
    | UpdateNote
    | SaveNoteSuccess
    | CancelNoteEdit
    | SelectNoteEdit
    | DeleteNoteSuccess
    | ReceiveAuditInfo
    | ReceiveCaseReview
    | UpdateCaseReview
    | ReceiveSurveyInfo
    | ReceiveEpiComForumNames
    | ReceiveEpiComForumTopics
    | CreateEpiComPost
    | UpdateEpiComPost
    | SaveEpiComPostSuccess
    | CancelEpiComPostEdit
    | ReceivedEpiComPost
    | UpdateEpiComPostID
    | UpdateSurveyAnswers
    | ReceiveOutbreakLabList;

export const actionCreators = {
    setOutbreak: (outbreakId: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'SET_OUTBREAK_ID',
                outbreakId
            });
        },
    loadBackground: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const background = await AjaxUtils.get(`api/Outbreak/${outbreakId}/background`);

                dispatch({
                    type: 'RECEIVE_BACKGROUND',
                    background
                });

            } catch (err) {
                console.log(err);
            }
        },
    updateBackground: (background: Background): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'RECEIVE_BACKGROUND',
                background
            });
        },
    loadGeographicLocation: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const geographicLocation = await AjaxUtils.get(`api/Outbreak/${outbreakId}/GeographicLocation`);

                dispatch({
                    type: 'RECEIVE_GEOGRAPHIC_LOCATION',
                    geographicLocation
                });

            } catch (err) {
                console.log(err);
            }
        },
    updateGeographicLocation: (geographicLocation: GeographicLocation): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'RECEIVE_GEOGRAPHIC_LOCATION',
                geographicLocation
            });
        },
    loadSettingInfo: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const settingInfo = await AjaxUtils.get(`api/Outbreak/${outbreakId}/SettingInformation`);

                dispatch({
                    type: 'RECEIVE_SETTING_INFO',
                    settingInfo
                });

            } catch (err) {
                console.log(err);
            }
        },
    createSetting: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            dispatch({
                type: 'CREATE_SETTING',
                outbreakId
            });
        },
    updateSetting: (setting: SettingInfo): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_SETTING',
                setting
            });
        },
    saveSetting: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            let setting = getState().outbreak.settingBeingEdited;
            let newSettings = getState().outbreak.settingInfo || [];

            if (setting === undefined) {
                return;
            }

            try {

                if (setting.id) {
                    await AjaxUtils.put('api/outbreak/setting', setting);
                } else {
                    setting = await AjaxUtils.post('api/outbreak/setting', setting);
                }

                if (setting === undefined) {
                    throw 'Setting came back null from server';
                }

                // if saved setting is primary, make sure all others are not
                // this happens on the server-side
                if (setting.isPrimary) {
                    newSettings = newSettings.map(s => Object.assign({}, s, { isPrimary: false }));
                }

                dispatch({
                    type: 'SAVE_SETTING_SUCCESS',
                    settings: [...newSettings.filter(s => s.id !== setting!.id), setting]
                        .sort((settingA, settingB) => parseInt(settingA.id) - parseInt(settingB.id)) // this will keep the list ordered
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    cancelSettingEdit: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'CANCEL_SETTING_EDIT'
            });
        },
    selectSettingEdit: (id: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const settings = getState().outbreak.settingInfo;

            const selectedSettings = settings.filter(setting => setting.id == id);

            if (selectedSettings.length === 1) {
                dispatch({
                    type: 'SELECT_SETTING_EDIT',
                    settingToEdit: selectedSettings[0]
                });
            } else {
                console.log(`Setting with setting ID: ${id} not found`);
            }
        },
    deleteSetting: (id: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            try {
                await AjaxUtils.remove(`api/outbreak/setting/${id}`, undefined);

                dispatch({
                    type: 'DELETE_SETTING_SUCCESS',
                    deletedSettingId: id
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    loadTransmission: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const transmission = await AjaxUtils.get(`api/outbreak/${outbreakId}/transmission`);

                dispatch({
                    type: 'RECEIVE_TRANSMISSION',
                    transmission
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateTransmission: (transmission: Transmission): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_TRANSMISSION',
                transmission
            });
        },
    loadMethods: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const methods = await AjaxUtils.get(`api/outbreak/${outbreakId}/methods`);

                if (methods) {
                    dispatch({
                        type: 'RECEIVE_METHOD',
                        methods
                    });
                }

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateMethods: (methods: Methods): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_METHOD',
                methods
            });
        },
    loadResults: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const results = await AjaxUtils.get(`api/outbreak/${outbreakId}/results`);

                dispatch({
                    type: 'RECEIVE_RESULTS',
                    results
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateResults: (results: Results): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_RESULTS',
                results
            });
        },
    loadClinicalResults: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const results = await AjaxUtils.get(`api/outbreak/${outbreakId}/clinical-results`);

                if (results) {
                    dispatch({
                        type: 'RECEIVE_CLINICAL_RESULTS',
                        results
                    });
                }

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateClinicalResults: (results: ClinicalResults): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CLINICAL_RESULTS',
                results
            });
        },
    loadLaboratoryResults: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const results = await AjaxUtils.get(`api/outbreak/${outbreakId}/laboratory-results`);

                dispatch({
                    type: 'RECEIVE_LABORATORY_RESULTS',
                    results
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateLaboratoryResults: (results: LaboratoryResults): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_LABORATORY_RESULTS',
                results
            });
        },
    loadConclusions: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const conclusions = await AjaxUtils.get(`api/outbreak/${outbreakId}/conclusions`);

                if (conclusions) {
                    dispatch({
                        type: 'RECEIVE_CONCLUSIONS',
                        conclusions
                    });
                }

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateConclusions: (conclusions: Conclusions): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CONCLUSIONS',
                conclusions
            });
        },
    loadDocumentList: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const documentList = await AjaxUtils.get(`api/Outbreak/${outbreakId}/documents`);

                dispatch({
                    type: 'RECEIVE_DOCUMENT_LIST',
                    documentList
                });

            } catch (err) {
                console.log(err);
            }
        },
    createDocument: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            dispatch({
                type: 'CREATE_DOCUMENT',
                outbreakId
            });
        },
    updateDocument: (documentBeingEdited: Document): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_DOCUMENT',
                documentBeingEdited
            });
        },
    uploadDocument: (formData: FormData): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            let document = getState().outbreak.documentBeingEdited;

            if (document === undefined) {
                return;
            }

            try {

                const savedDocument = await AjaxUtils.uploadFile('api/outbreak/document', formData);

                document.id = savedDocument.id;

                dispatch({
                    type: 'UPLOAD_DOCUMENT_SUCCESS',
                    savedDocument
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    cancelDocumentEdit: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'CANCEL_DOCUMENT_EDIT'
            });
        },
    deleteDocument: (id: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            try {
                await AjaxUtils.remove(`api/outbreak/document/${id}`, undefined);

                dispatch({
                    type: 'DELETE_DOCUMENT_SUCCESS',
                    deletedDocumentId: id
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },

    loadNoteList: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const outbreakId = getState().outbreak.outbreakId;

                const noteList = await AjaxUtils.get(`api/Outbreak/${outbreakId}/notes`);

                dispatch({
                    type: 'RECEIVE_NOTES_LIST',
                    noteList
                });

            } catch (err) {
                console.log(err);
            }
        },
    createNote: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            dispatch({
                type: 'CREATE_NOTE',
                outbreakId
            });
        },
    updateNote: (note: Note): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_NOTE',
                note
            });
        },
    saveNote: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            let note = getState().outbreak.noteBeingEdited;

            try {

                if (note.eventId) {
                    await AjaxUtils.put('api/outbreak/note', note);
                } else {
                    note = await AjaxUtils.post('api/outbreak/note', note);
                }

                dispatch({
                    type: 'SAVE_NOTE_SUCCESS',
                    savedNote: note
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    cancelNoteEdit: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'CANCEL_NOTE_EDIT'
            });
        },
    selectNoteEdit: (eventId: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            const noteList = getState().outbreak.noteList as Note[];

            const selectedNotes = noteList.filter(note => note.eventId == eventId);

            if (selectedNotes.length === 1) {
                dispatch({
                    type: 'SELECT_NOTE_EDIT',
                    noteToEdit: selectedNotes[0]
                });
            } else {
                console.log(`Note with eventId: ${eventId} not found`);
            }
        },
    deleteNote: (id: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            try {
                await AjaxUtils.remove(`api/outbreak/note/${id}`, undefined);

                dispatch({
                    type: 'DELETE_NOTE_SUCCESS',
                    deletedNoteId: id
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    loadAuditInfo: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            try {
                const auditInfo = await AjaxUtils.get(`api/outbreak/${outbreakId}/audit`);

                dispatch({
                    type: 'RECEIVED_AUDIT_INFO',
                    auditInfo
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    loadCaseReview: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            try {
                const caseReview = await AjaxUtils.get(`api/outbreak/${outbreakId}/caseReview`);

                if (caseReview) {
                    dispatch({
                        type: 'RECEIVED_CASE_REVIEW',
                        caseReview
                    });
                }

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateCaseReview: (caseReview: CaseReview): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_CASE_REVIEW',
                caseReview
            });
        },
    loadOutbreakLayoutUid: (outbreakId: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            try {
                const info = await AjaxUtils.get(`api/outbreak/${outbreakId}/layout`);

                dispatch({
                    type: 'RECEIVED_SURVEY_INFO',
                    layoutUid: info.layoutUid,
                    surveyUid: info.surveyUid
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    loadEpiComForumNames: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            try {
                const epicomForumNameList = await AjaxUtils.get('api/outbreak/forum-names');

                dispatch({
                    type: 'RECEIVED_EPICOM_FORUM_NAMES',
                    epicomForumNameList
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    loadEpiComForumTopics: (forumId: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            if (!forumId) {
                dispatch({
                    type: 'RECEIVED_EPICOM_FORUM_TOPICS',
                    epicomForumTopicList: unloadedState.epicomForumTopicList
                });

                return;
            }

            try {
                const epicomForumTopicList = await AjaxUtils.get(`api/outbreak/forum-topics/${forumId}`);

                dispatch({
                    type: 'RECEIVED_EPICOM_FORUM_TOPICS',
                    epicomForumTopicList
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    loadEpiComPost: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            try {
                const post = await AjaxUtils.get(`api/outbreak/${outbreakId}/epicom`);

                dispatch({
                    type: 'RECEIVED_EPICOM_POST',
                    post
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    findEpiComPost: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const epiComPost = getState().outbreak.epiComPost;

            console.log(epiComPost);

            try {
                const post = await AjaxUtils.get(`api/outbreak/epicom/${epiComPost.postId}`);

                dispatch({
                    type: 'RECEIVED_EPICOM_POST',
                    post
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    createEpiComPost: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            try {

                const post = await AjaxUtils.get(`api/outbreak/${outbreakId}/epicom-post-body`);

                dispatch({
                    type: 'CREATE_EPICOM_POST',
                    epiComPostBeingEdited: {
                        outbreakId,
                        pendingPostId: '0',
                        date: '',
                        epicomUserId: '',
                        forumDescription: '',
                        topicDescription: '',
                        message: post.message,
                        postId: post.postId || '0',
                        forumId: post.forumId || '0',
                        topicId: post.topicId || '0',
                        title: post.title || ''
                    }
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateEpiComPost: (epiComPostBeingEdited: EpiComPost): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'UPDATE_EPICOM_POST',
                epiComPostBeingEdited
            });
        },
    updateEpiComPostID: (postId: number): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'UPDATE_EPICOM_POST_ID',
                postId
            });
        },
    saveEpiComPost: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            let epiComPost = getState().outbreak.epiComPostBeingEdited;

            if (epiComPost === undefined) {
                return;
            }

            try {

                epiComPost = await AjaxUtils.post('api/outbreak/epicom', epiComPost);

                if (epiComPost === undefined) {
                    throw 'EpiCom Post returned null from server';
                }

                dispatch({
                    type: 'SAVE_EPICOM_POST_SUCCESS',
                    epiComPost
                });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    cancelEpiComPostEdit: (): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'CANCEL_EPICOM_POST_EDIT'
            });
        },






    saveOutbreak: (isSubmit?: boolean): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const o = getState().outbreak;

            try {

                // TODO:  This needs to be refactored once the shape of state is corrected; there should not be sub-objects

                const outbreak = {
                    outbreakId: o.outbreakId,
                    eventName: o.background.eventName,
                    notifiedDate: o.background.notifiedDate,
                    firstNotified: o.background.firstNotified,
                    reporterName: o.background.reporterName,
                    outbreakState: o.background.outbreakStatus,
                    investigationStarted: o.background.investigationStarted,
                    investigationClosed: o.background.investigationClosed,
                    syndrome: o.background.syndrome,
                    otherSyndrome: o.background.otherSyndrome,
                    diseaseHazard: o.background.diseaseHazard,
                    otherDiseaseHazard: o.background.otherDiseaseHazard,
                    estimatedNumber: o.background.estimatedNumber,
                    isInvestigated: o.background.isInvestigated,
                    isOutbreak: o.background.isOutbreak,
                    symptom: o.clinicalResults.symptom,
                    otherSymptom: o.clinicalResults.otherSymptom,
                    firstExposureDate: o.clinicalResults.firstExposureDate,
                    lastExposureDate: o.clinicalResults.lastExposureDate,
                    firstOnsetDate: o.clinicalResults.firstOnsetDate,
                    lastOnsetDate: o.clinicalResults.lastOnsetDate,
                    duration: o.clinicalResults.duration,
                    timeUnit: o.clinicalResults.timeUnit,
                    outbreakEventDate: o.clinicalResults.outbreakEventDate,
                    county: o.geographicLocation.county,
                    otherCountiesAffected: o.geographicLocation.otherCountiesAffected,
                    otherCountiesList: o.geographicLocation.otherCountiesList,
                    otherStatesAffected: o.geographicLocation.otherStatesAffected,
                    otherStatesList: o.geographicLocation.otherStatesList,
                    otherCountriesList: o.geographicLocation.otherCountriesList,
                    transmissionMode: o.transmission.transmissionMode,
                    foodOrWaterRelated: o.transmission.foodOrWaterRelated,
                    isVehicleIdentified: o.transmission.isVehicleIdentified,
                    vehicle: o.transmission.vehicle,
                    healthRelated: o.transmission.healthRelated,
                    causeForOutbreak: o.transmission.causeForOutbreak,
                    description: o.transmission.description,

                    caseDefinition: o.methods.caseDefinition,
                    studyDesigns: o.methods.studyDesigns,
                    investigationMethods: o.methods.investigationMethods,
                    staffConsulted: o.methods.staffConsulted,
                    regulatoryAgencies: o.methods.regulatoryAgencies,
                    investigator: o.methods.investigator,

                    reviewedBy: o.caseReview.reviewedBy,
                    reviewedOn: o.caseReview.reviewedOn,
                    reviewStatus: o.caseReview.reviewStatus,
                    comments: o.caseReview.comments,
                    isSubmitted: o.caseReview.isSubmitted,
                    isHumanSpecimens: o.laboratoryResults.isHumanSpecimens,
                    isLabTestingConducted: o.laboratoryResults.isLabTestingConducted,
                    noOfCases: o.laboratoryResults.noOfCases,
                    isFoodSpecimens: o.laboratoryResults.isFoodSpecimens,
                    labFindings: o.laboratoryResults.labFindings,

                    postId: o.epiComPost.postId,

                    decisions: o.conclusions.decisions,
                    isRecProvided: o.conclusions.isRecProvided,
                    methodofRec: o.conclusions.methodofRec,
                    recommendations: o.conclusions.recommendations,
                    improvementAreas: o.conclusions.improvementAreas,
                    isReportCompleted: o.conclusions.isReportCompleted,
                    wereRecommendationsImplemented: o.conclusions.recImplemented,

                    totalCases: o.results.totalCases,
                    totalCaseType: o.results.totalCaseType,
                    emergencyVisits: o.results.emergencyVisits,
                    emergencyVisitsType: o.results.emergencyVisitsType,
                    inpatientHospitalizations: o.results.inpatientHospitalizations,
                    inpatientHospitalizationsType: o.results.inpatientHospitalizationsType,
                    deaths: o.results.deaths,
                    deathsType: o.results.deathsType,
                    nonStaffCases: o.results.nonStaffCases,
                    staffCases: o.results.staffCases,
                    unknownCases: o.results.unknownCases,

                    surveyAnswers: o.surveyAnswers,
                    surveyUid: o.surveyUid
                };

                await AjaxUtils.put(`api/outbreak${isSubmit ? '/submit' : ''}`, outbreak);


                // dispatch({
                //    type: ""
                // });

                return {};

            } catch (err) {
                console.log(err);
                return err;
            }
        },
    updateSurveyAnswers: (answers: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_SURVEY_ANSWERS',
                answers
            });
        },

    submitEpicomPost: (outbreakId: any, epicomPost: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            return await AjaxUtils.post(`api/Outbreak/submitepicompost`, epicomPost);
        },

    loadSurveyAnswers: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;
            const surveyUid = getState().outbreak.surveyUid;

            if (surveyUid) {
                const answers = await AjaxUtils.get(`api/survey/${surveyUid}/answers/outbreak/${outbreakId}`);

                dispatch({
                    type: 'UPDATE_SURVEY_ANSWERS',
                    answers
                });
            }
        },
    loadOutbreakLabList: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const outbreakId = getState().outbreak.outbreakId;

            const outbreakLabList = await AjaxUtils.get(`api/outbreak/${outbreakId}/labs`);

            dispatch({
                type: 'RECEIVE_OUTBREAK_LAB_LIST',
                outbreakLabList
            });

        },

};

const unloadedState: OutbreakState = {
    outbreakId: '',
    layoutUid: '',
    surveyUid: '',
    isSubmit: defaults.boolean,
    background: {} as Background,
    errors: {},
    geographicLocation: {} as GeographicLocation,
    settingInfo: [] as SettingInfo[],
    settingBeingEdited: undefined,
    auditInfo: {
        createdBy: '',
        createdOn: '',
        modifiedBy: '',
        modifiedOn: ''
    } as AuditInfo,
    notes: [],
    documents: [],
    documentBeingEdited: undefined,
    transmission: {
        transmissionMode: defaults.string,
        foodOrWaterRelated: defaults.string,
        isVehicleIdentified: defaults.string,
        vehicle: defaults.string,
        healthRelated: defaults.string,
        causeForOutbreak: defaults.string,
        description: defaults.string
    } as Transmission,

    methods: {} as Methods,
    clinicalResults: {
        symptom: [],
        outbreakEventDate: '',
        otherSymptom: defaults.string,
        firstExposureDate: defaults.string,
        lastExposureDate: defaults.string,
        firstOnsetDate: defaults.string,
        lastOnsetDate: defaults.string,
        duration: defaults.string,
        timeUnit: defaults.string
    } as ClinicalResults,
    surveyAnswers: {},
    conclusions: {
        decisions: defaults.string,
        controlMeasures: defaults.string,
        isRecProvided: defaults.string,
        methodofRec: defaults.string,
        recImplemented: defaults.string,
        improvementAreas: defaults.string,
        isReportCompleted: defaults.string,
    } as Conclusions,
    caseReview: {
        reviewStatus: defaults.string,
        comments: defaults.string,
        reviewedBy: defaults.string,
        reviewedOn: defaults.string,
    } as CaseReview,
    laboratoryResults: {
        isHumanSpecimens: defaults.string,
        noOfCases: 0,
        isLabTestingConducted: defaults.string,
        isFoodSpecimens: defaults.string,
        labFindings: defaults.string
    } as LaboratoryResults,
    epiComPostBeingEdited: undefined,
    epiComPost: {} as EpiComPost,
    results: {
        nonStaffCases: 0,
        staffCases: 0,
        totalCases: 0,
        totalCaseType: '',
        unknownCases: 0,
        emergencyVisits: 0,
        emergencyVisitsType: '',
        inpatientHospitalizations: 0,
        inpatientHospitalizationsType: '',
        deaths: 0,
        deathsType: ''
    } as Results,
    settingNameCodes: [],
    epicomForumNameList: [],
    epicomForumTopicList: [],
    outbreakLabList: []
};

// Reducer
export const reducer: Reducer<OutbreakState> = (state: OutbreakState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_OUTBREAK_ID':
            return Object.assign({}, state, { outbreakId: action.outbreakId });
        case 'RECEIVE_BACKGROUND':
            return Object.assign({}, state, { background: action.background });
        case 'RECEIVE_GEOGRAPHIC_LOCATION':
            return Object.assign({}, state, { geographicLocation: action.geographicLocation });
        case 'RECEIVE_SETTING_INFO':
            return Object.assign({}, state, { settingInfo: action.settingInfo });
        case 'CREATE_SETTING':
            return Object.assign({}, state, {
                settingBeingEdited: {
                    id: '',
                    outbreakId: state.outbreakId,
                    settingName: '',
                    settingFacilityId: '',
                    isPrimary: false,
                    settingType: '',
                    otherType: '',
                    settingContact: '',
                    settingContactPhone: '',
                    address: {
                        addressLine1: '',
                        addressLine2: '',
                        county: '',
                        city: '',
                        state: '',
                        zip: '',
                        country: ''
                    }
                }
            });
        case 'UPDATE_SETTING':
            return Object.assign({}, state, { settingBeingEdited: action.setting });
        case 'SAVE_SETTING_SUCCESS':
            return Object.assign({}, state, {
                settingBeingEdited: undefined,
                settingInfo: action.settings
            });
        case 'CANCEL_SETTING_EDIT':
            return Object.assign({}, state, { settingBeingEdited: undefined });
        case 'SELECT_SETTING_EDIT':
            return Object.assign({}, state, { settingBeingEdited: action.settingToEdit });
        case 'DELETE_SETTING_SUCCESS':
            return Object.assign({}, state, { settingInfo: [...state.settingInfo.filter(setting => setting.id != action.deletedSettingId)] });
        case 'RECEIVE_TRANSMISSION':
            return Object.assign({}, state, { transmission: action.transmission });
        case 'UPDATE_TRANSMISSION':
            return Object.assign({}, state, { transmission: action.transmission });
        case 'RECEIVE_METHOD':
            return Object.assign({}, state, { methods: action.methods });
        case 'UPDATE_METHOD':
            return Object.assign({}, state, { methods: action.methods });
        case 'RECEIVE_RESULTS':
            return Object.assign({}, state, { results: action.results });
        case 'UPDATE_RESULTS':
            return Object.assign({}, state, { results: action.results });
        case 'RECEIVE_CLINICAL_RESULTS':
            return Object.assign({}, state, { clinicalResults: action.results });
        case 'UPDATE_CLINICAL_RESULTS':
            return Object.assign({}, state, { clinicalResults: action.results });
        case 'RECEIVE_LABORATORY_RESULTS':
            return Object.assign({}, state, { laboratoryResults: action.results });
        case 'UPDATE_LABORATORY_RESULTS':
            return Object.assign({}, state, { laboratoryResults: action.results });
        case 'RECEIVE_CONCLUSIONS':
            return Object.assign({}, state, { conclusions: action.conclusions });
        case 'UPDATE_CONCLUSIONS':
            return Object.assign({}, state, { conclusions: action.conclusions });
        case 'RECEIVE_DOCUMENT_LIST':
            return Object.assign({}, state, { documentList: action.documentList });
        case 'CREATE_DOCUMENT':
            return Object.assign({}, state, {
                documentBeingEdited: {
                    id: '',
                    outbreakId: action.outbreakId,
                    documentName: '',
                    documentType: '',
                    documentDate: ''
                }
            });
        case 'UPDATE_DOCUMENT':
            return Object.assign({}, state, { documentBeingEdited: action.documentBeingEdited });
        case 'UPLOAD_DOCUMENT_SUCCESS':
            return Object.assign({}, state, {
                documentBeingEdited: undefined,
                documentList: [...state.documentList.filter((doc: Document) => doc.id !== action.savedDocument.id), action.savedDocument]
                    .sort((a: Document, b: Document) => parseInt(a.id) - parseInt(b.id)) // this will keep the list ordered
            });
        case 'CANCEL_DOCUMENT_EDIT':
            return Object.assign({}, state, { documentBeingEdited: undefined });
        case 'SELECT_DOCUMENT_EDIT':
            return Object.assign({}, state, { documentBeingEdited: action.documentToEdit });
        case 'DELETE_DOCUMENT_SUCCESS':
            return Object.assign({}, state, {
                documentList: [...state.documentList.filter((doc: Document) => doc.id != action.deletedDocumentId)]
            });
        case 'RECEIVE_NOTES_LIST':
            return Object.assign({}, state, { noteList: action.noteList });
        case 'CREATE_NOTE':
            return Object.assign({}, state, {
                noteBeingEdited: {
                    note: '',
                    noteType: 'OB_NOTE',
                    outbreakId: state.outbreakId
                }
            });
        case 'UPDATE_NOTE':
            return Object.assign({}, state, { noteBeingEdited: action.note });
        case 'SAVE_NOTE_SUCCESS':
            return Object.assign({}, state, {
                noteBeingEdited: undefined,
                noteList: [...state.noteList.filter((note: Note) => note.eventId !== action.savedNote.eventId), action.savedNote]
                    .sort((a, b) => a.eventId - b.eventId) // this will keep the list ordered
            });
        case 'CANCEL_NOTE_EDIT':
            return Object.assign({}, state, { noteBeingEdited: undefined });
        case 'SELECT_NOTE_EDIT':
            return Object.assign({}, state, { noteBeingEdited: action.noteToEdit });
        case 'DELETE_NOTE_SUCCESS':
            return Object.assign({}, state, { noteList: [...state.noteList.filter((note: Note) => note.eventId != action.deletedNoteId)] });
        case 'RECEIVED_AUDIT_INFO':
            return Object.assign({}, state, { auditInfo: action.auditInfo });
        case 'RECEIVED_CASE_REVIEW':
            return Object.assign({}, state, { caseReview: action.caseReview });
        case 'UPDATE_CASE_REVIEW':
            return Object.assign({}, state, { caseReview: action.caseReview });
        case 'RECEIVED_SURVEY_INFO':
            return Object.assign({}, state, { layoutUid: action.layoutUid, surveyUid: action.surveyUid });
        case 'RECEIVED_EPICOM_FORUM_NAMES':
            return Object.assign({}, state, { epicomForumNameList: action.epicomForumNameList });
        case 'RECEIVED_EPICOM_FORUM_TOPICS':
            return Object.assign({}, state, { epicomForumTopicList: action.epicomForumTopicList });
        case 'CREATE_EPICOM_POST':
            return Object.assign({}, state, { epiComPostBeingEdited: action.epiComPostBeingEdited });
        case 'UPDATE_EPICOM_POST':
            return Object.assign({}, state, { epiComPostBeingEdited: action.epiComPostBeingEdited });
        case 'CANCEL_EPICOM_POST_EDIT':
            return Object.assign({}, state, { epiComPostBeingEdited: undefined });
        case 'SAVE_EPICOM_POST_SUCCESS':
            return Object.assign({}, state, { epiComPostBeingEdited: undefined, epiComPost: action.epiComPost });
        case 'RECEIVED_EPICOM_POST':
            return Object.assign({}, state, { epiComPost: action.post });
        case 'UPDATE_EPICOM_POST_ID':
            return Object.assign({}, state, {
                epiComPost: Object.assign({}, state.epiComPost, { postId: action.postId })
            });
        case 'UPDATE_SURVEY_ANSWERS':
            return Object.assign({}, state, { surveyAnswers: action.answers });
        case 'RECEIVE_OUTBREAK_LAB_LIST':
            return Object.assign({}, state, { outbreakLabList: action.outbreakLabList });
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
