import Moment from 'moment';
import { stringContains } from './UIUtils';
import { hasValue, isNotFutureDate, isValidDate, isLessThan, isLessThanOrEqualTo, isGreaterThan, isGreaterThanOrEqualTo, isEqualTo, isNotEqualTo, isShorterThan, matchesPattern } from './ValidationUtils';
import { FaTrash, FaCheck, FaRegSave, FaTimes } from 'react-icons/fa';
import { getFirstIndexIfObject } from './ArrayUtils';

function createInputObject(label: any, name: any, placeholder: any) {
    return {
        label: label,
        name: name,
        placeholder: placeholder
    };
}

export enum FontSize {
	small = 'small',
	medium = 'medium',
	large = 'large',
	default = 'inherit'
}

export enum int32 {
    min = 0,
    max = 2147483647
}

export interface DropdownCode {
    code: string;
    description: string;
}

export const defaults = {
    activation: {
        triggerQuestionId: null,
        initialState: "ACTIVE",
        operator: null,
        triggerValues: null
    } as any,
    validations: [] as {
        operator: string;
        arg: any;
    }[],
    activationAliases: {
        "stringContains": 1,
        "hasValue": 2,
        "isNotFutureDate": 3,
        "isValidDate": 4,
        "isLessThan": 5,
        "<": 5,
        "isLessThanOrEqualTo": 6,
        "<=": 6,
        "isGreaterThan": 7,
        ">": 7,
        "isGreaterThanOrEqualTo": 8,
        ">=": 8,
        "isEqualTo": 9,
        "=": 9,
        "isNotEqualTo": 10,
        "!=": 10,
        "isShorterThan": 11,
        "matchesPattern": 12
    },
    validationAliases: {
        "stringContains": 1,
        "hasValue": 2,
        "isNotFutureDate": 3,
        "isValidDate": 4,
        "isLessThan": 5,
        "<": 5,
        "isLessThanOrEqualTo": 6,
        "<=": 6,
        "isGreaterThan": 7,
        ">": 7,
        "isGreaterThanOrEqualTo": 8,
        ">=": 8,
        "isEqualTo": 9,
        "=": 9,
        "isNotEqualTo": 10,
        "!=": 10,
        "isShorterThan": 11,
        "matchesPattern": 12
    },
    activationFunctionsNew: {
        1: function (testValue: any, keyword: string) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : stringContains(testValue, keyword).toString());
        },
        2: function (testValue: any) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return hasValue(testValue).toString();
        },
        3: function (testDate: any) {
            var realTestDate = getFirstIndexIfObject(testDate);

            return (testDate == undefined ? 'false' : isNotFutureDate(testDate).toString());
        },
        4: function (testDate: any) {
            var realTestDate = getFirstIndexIfObject(testDate);

            return (testDate == undefined ? 'false' : isValidDate(testDate).toString());
        },
        5: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isLessThan(testValue, limit).toString());
        },
        6: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isLessThanOrEqualTo(testValue, limit).toString());
        },
        7: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isGreaterThan(testValue, limit).toString());
        },
        8: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isGreaterThanOrEqualTo(testValue, limit).toString());
        },
        9: function (testValue: any, number: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isEqualTo(testValue, number).toString());
        },
        10: function (testValue: any, number: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isNotEqualTo(testValue, number).toString());
        },
        11: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : isShorterThan(testValue, limit).toString());
        },
        12: function (testValue: any, regExp: string) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'false' : matchesPattern(testValue, regExp).toString());
        }
    },
    validationFunctionsNew: {
        1: function (testValue: any, keyword: string) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : stringContains(testValue, keyword).toString());
        },
        2: function (testValue: any) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return hasValue(testValue).toString();
        },
        3: function (testDate: any) {
            var realTestDate = getFirstIndexIfObject(testDate);

            return (testDate == undefined ? 'true' : isNotFutureDate(testDate).toString());
        },
        4: function (testDate: any) {
            var realTestDate = getFirstIndexIfObject(testDate);

            return (testDate == undefined ? 'true' : isValidDate(testDate).toString());
        },
        5: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isLessThan(testValue, limit).toString());
        },
        6: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isLessThanOrEqualTo(testValue, limit).toString());
        },
        7: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isGreaterThan(testValue, limit).toString());
        },
        8: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isGreaterThanOrEqualTo(testValue, limit).toString());
        },
        9: function (testValue: any, number: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isEqualTo(testValue, number).toString());
        },
        10: function (testValue: any, number: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isNotEqualTo(testValue, number).toString());
        },
        11: function (testValue: any, limit: number) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : isShorterThan(testValue, limit).toString());
        },
        12: function (testValue: any, regExp: string) {
            var realTestValue = getFirstIndexIfObject(testValue);

            return (testValue == undefined ? 'true' : matchesPattern(testValue, regExp).toString());
        }
    },
    groupAccess: new Array(),
    string: '',
    number: 0,
    panelFontSize: "0.75em",
    deleteIcon: FaTrash,
    confirmIcon: FaCheck,
    cancelIcon: FaTimes,
    saveIcon: FaRegSave,
    iconSize: 20,
    backButtonIconSize: 22,
    boolean: false,
    object: {},
    guid: '00000000-0000-0000-0000-000000000000',
    useLayoutOptionValue: 'use',
    useLayoutOptionText: 'Use survey layout without making any changes to the layout.',
    copyLayoutOptionValue: 'copy',
    copyLayoutOptionText: 'Use survey layout as a starting point for a new layout that I can customize.',
    dropdownValue: 'value',
    wait_delay: 200,
    autoSaveTimeout: 60000,
    NULL: -1,
    loadErrorConsoleMessage: 'Encountered error while loading: ',
    loadErrorDisplayMessage: 'Failed loading resource. Please contact support.',
    paging: {
        page: 1,
        orderBy: '',
        totalPages: 0,
        totalItems: 0,
        pageSize:10
    },
    charmWidth: 300,
    lastSaveTime: '---',
    lastSavedBy: '---',
    effectiveDate: Moment(new Date()).format("MM/DD/YYYY"),
    urls: {
        surveyEditUrl: '/survey/edit',
        surveySearchUrl: '/surveys',
        surveyPreviewUrl: '/survey/preview',
        surveyCreateUrl: '/survey/create',
        surveyUseUrl: '/survey/use',
        attachSurveysUrl: '/survey/attachSurveys',
        layoutEditUrl: '/survey/layout/edit',
        questionManagerUrl: '/survey/layout/questionManager',
        questionEditUrl: '/survey/layout/questionEdit',       
        questionCreateUrl: '/survey/layout/questionCreate',
        rulesUrl: '/survey/layout/rules',
		loadFailureUrl: '/common/LoadFailure',
		logOff: '/logOff',
       // outbreak: '/Start/CODMenu.aspx',
		outbreak: '/Outbreak',
		lab: 'Lab/lab_result_dtl.aspx',
        case: '/Case/cas_case_dtl.aspx',
        analysis: '/Analysis/anl_reports_lst.aspx',
        resources: '/Resource/res_resource_srch.aspx',
        task: '/Task/tas_task_lst.aspx',
		admin: 'https://merlindev.doh.ad.state.fl.us/Merlin/Administration/adm_admin_lst.aspx',
		help: '/Merlin/Administration/adm_help_lst.aspx',
        logoff: '/Logoff',
        activationManagerUrl: '/survey/layout/activationManager',
        validationManagerUrl: '/survey/layout/validationManager',
		rulesPageUrl: '/survey/layout/rulesPage',
        questionManager: '/survey/layout/questionManager',
        ELRSearch: '/elr-search',
        smartGoals: '/smart-goals',
        performanceReport: '/smart-goals/performanceReport'
	},
	theme: {
		buttons: {
			class: 'btn btn-outline-dark'
		}
	},
    inputs: {
        dropdowns: {
            outbreakInput: createInputObject('Outbreak code', 'outbreakId', 'Select an outbreak code'),
            diseaseCodeInput: createInputObject('FL Disease Code', 'icd9Code', 'Select a FL Disease Code'),
            surveyTypeInput: createInputObject('Survey Type', 'surveyType', 'Select a survey type'),
            surveyTypesInput: createInputObject('Survey Types', 'surveyTypes', 'Select a survey type'),
            layoutDescriptionInput: createInputObject('Layout', 'layoutDescription', ''),
            questionTypeInput: createInputObject('Question Type', 'questionType', 'Select an answer type'),
            questionCodeTypeInput: createInputObject('Code Type', 'codeType', 'Select a code type'),
            objectMappingTypeInput: createInputObject('Mapping Type', 'mappingType', 'Select a mapping type'),
            antibioticTypeInput: createInputObject('Antibiotic Type', 'antibioticType', 'Select a antibiotic type')
        },
        datePickers: {
            effectiveDateInput: createInputObject('Effective Date', 'effectiveDate', 'Select an outbreak code'),
            dateStartedInput: createInputObject('Date Started', 'dateStarted', 'Select a date'),
            ElrDOBInput: createInputObject('Date Of Birth', 'dob','Select a date')
        },
        textInputs: {
            surveyNameInput: createInputObject('Name', 'name', 'Enter name'),
            surveySearchInput: createInputObject('Name', 'name', 'Enter keywords'),
            surveyDescriptionInput: createInputObject('Description', 'description', 'Enter Description'),
            sectionTitleInput: createInputObject('Title', 'title', 'Title'),
            messageTextInput: createInputObject('Text', 'text', 'Enter a message'),
            questionSearchInput: createInputObject('Question', 'subText', 'Enter keywords'),
            questionTextInput: createInputObject('Question', 'questionText', 'Enter text'),
            objectMappingValueInput: createInputObject('Mapping Value', 'mappingValue', 'Enter Mapping Value'),
            numberOfDaysTakenInput: createInputObject('Number of days antibiotic taken', 'numberOfDaysTaken', 'Enter a Value'),
            ElrFNameInput: createInputObject('First Name', 'fname', 'Enter First name'),
            ElrLNameInput: createInputObject('Last Name', 'lname', 'Enter last name'),
            ElrAccessionInput: createInputObject('Accession #', 'accessionNum', 'Enter number')
        },
        rangeSliders: {
            sectionWidthInput: createInputObject('Section width', 'width', ''),
            messageWidthInput: createInputObject('Message width', 'width', '')
        },
        singleSelectListGroups: {
            messageTypeInput: createInputObject('Message Type', 'messageType', 'Select a message type')
        }
    },
    titles: {
        Add: "Add",
        Edit: "Edit",
        Search:"Search",
        LayoutSearch: "Active Layouts",
        NewLayout: "Create Layout",
        EditLayout: "Edit Layout",
        SurveySearch : "Active Surveys",
        SurveyCreate: "Create Survey",
        Preview: "Preview", 
        AttachSurveys: "Attach Survey",
        QuestionManager: "Question Manager",
		CreateQuestion: "Create Question",
		SurveySearchPage: "Survey Search - Merlin",
		LayoutSearchPage: "Layout Search - Merlin",
		CreateLayoutPage: "Create Layout - Merlin",
		CreateSurveyPage: "Create Survey - Merlin",
		EditLayoutPage: "Edit Layout - Merlin",
		PreviewPage: "Preview - Merlin"
    }
};