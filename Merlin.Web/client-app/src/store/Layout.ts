import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as AjaxUtils from '../utils/AjaxUtils';
import { defaults } from '../utils/Global';
import { PagedList } from './SurveySearch';
import * as LayoutUtils from '../utils/LayoutUtils'

export enum layoutItemType {
    section = 'section',
    question = 'question',
    message = 'message',
    control = 'control',
    spacer = 'spacer',
    layout = 'layout',
    lineBreak = 'lineBreak',
	repeatingQuestionsGroup = 'repeatingQuestionsGroup',
	genericQuery = "genericQuery"
}

export enum ControlType { 
    LabResults = "Lab Results",
    Symptoms = "Symptoms",
    HealthCareVisits = "Health Care Visits",
    TravelHistory = "Travel History",
    VaccinationHistory = "Vaccination History",
    LabSummary = "Lab Summary",
    Epilinks = "Epi-Link Relationships",
    Treatments = "Treatments",
    OutbreakLabList = "Outbreak Lab List"
};

export enum LayoutItemState {
    Active = "ACTIVE",
    Disabled = "DISABLED",
    Hidden = "HIDDEN"
}


export enum LayoutQuestionAnswer {
    IsAnswered = "IS ANSWERED",
    IsNotAnswered = "IS NOT ANSWERED",
    HasSpecificAnswer = "HAS SPECIFIC ANSWER"
}

export enum LayoutQuestionMessageType {
    Default = "DEFAULT",
    Custom = "CUSTOM"
}

export enum LayoutQuestionType {
    YesNo = 'YN',
    YesNoUnknown = 'YNU',
    Text = 'TEXT',
    Multi_Line_Text = 'MULTI_LINE_TEXT',
    Dropdown = 'DROPDOWN',
    Radio = 'RADIO',
    Date = 'DATE',
    Number = 'NUMBER',
    Phone = 'PHONE',
    Email = 'EMAIL',
    Check = 'CHECK'
}

export enum LayoutQuestionOperator {
    Equals = "=",
    GreaterThan = ">",
    LessThan = "<",
    GreaterThanOrEqualTo = ">=",
    LessThanOrEqualTo = "<=",
    NotEqual = "<>",
    In = "IN",
    NotIn = "NOT IN"
}

export const messageType = {
    info: 'info',
    danger: 'danger',
    warning: 'warning',
    light: 'light',
    success: 'success'
}

export enum ValidationType {
    HasValue = 'HAS ANY VALUE',
    HasSpecificValue = "HAS SPECIFIC VALUE",
    IsNotFutureDate = 'IS NOT FUTURE DATE',
    IsValidDate = 'IS VALID DATE',
    IsLessThan = 'NUMBER IS LESS THAN',
    IsGreaterThan = 'NUMBER IS GREATER THAN',
    IsLessThanOrEqualTo = 'NUMBER IS LESS THAN OR EQUAL TO',
    IsGreaterThanOrEqualTo = 'NUMBER IS GREATER THAN OR EQUAL TO',
    IsEqualTo = 'NUMBER IS EQUAL TO',
    IsNotEqualTo = 'NUMBER IS NOT EQUAL TO',    
    MatchesPattern = 'TEXT MATCHES PATTERN',
    InValid = 'INVALID QUESTION TYPE',
    MaxLength = 'TEXT IS SHORTER THAN'
}

export enum ValidationTypeMessage {
    HasValue = 'REQUIRED',    
    InValid = 'INVALID QUESTION TYPE',
    IsNotFutureDate = 'NOT A FUTURE DATE',
    IsValidDate = 'IS VALID DATE',
    HasSpecificValue = "VALUE EQUALS: ",
    IsLessThan = 'NUMBER IS LESS THAN: ',
    IsGreaterThan = 'NUMBER IS GREATER THAN: ',
    IsLessThanOrEqualTo = 'NUMBER IS LESS THAN OR EQUAL TO: ',
    IsGreaterThanOrEqualTo = 'NUMBER IS GREATER THAN OR EQUAL TO: ',
    IsEqualTo = 'NUMBER IS EQUAL TO: ',
    IsNotEqualTo = 'NUMBER IS NOT EQUAL TO: ',
    MatchesPattern = 'TEXT MATCHES PATTERN: ',    
    MaxLength = 'TEXT IS SHORTER THAN: '
}

export interface Activation {
    targetItemId: string;
    rules: string[];
    //outcome: "hide" | "disable" | "show";
    outcome: string;
}

export interface LayoutItemActivation {
    triggerQuestionId?: string;
    triggerValues?: any[];
    initialState: LayoutItemState;
    operator?: string;
    activationType?: string;
}

export interface LayoutItemValidation {
    operator: string;
    arg: any;
}

export interface Validation {
    itemId: string;
    validationRules: ValidationRule[];
}

export interface ValidationRule {
    rule: string;
    message: string;
}

export interface Activations {
    ruleID: string;
    behaviour: string;
    itemID: string;
    questionId: string;
    answer: string;
    relation: string;
    questionType: string;
}


export interface LayoutState {
    layout: Layout;
    allTags: string[];
    selectedTags: string[];
    layoutList: PagedList<any>;
    isLoading: boolean;
    affectedLayouts: PagedList<Layout>;
    lastAddedContext: {
        parentId: string,
        itemId: string
    };
    questions: LayoutItem[];
}

export interface Layout {
    layoutId: string;
    layoutName: string;
    lastSaveTime: string;
    lastSavedBy: string;
    items: LayoutItem[];
    // activations: Activation[];
    // validations: Validation[];
    // EditRule?: Activation
    tags: string[]
    surveys: any[]
    savedOn: string
    hasBeenEdited: boolean
}

export interface LayoutItem {
    id: string;
    width: number;
    type: layoutItemType;
    number?: string;
    isNumbered?: boolean;
    title?: string;
    text?: any; //any needed to support highlighting
    messageType?: string;
    activation: LayoutItemActivation;
    validations: LayoutItemValidation[];
    groupAccess: string[];
    questionType?: string;
    // activationRules?: string;
    // validationRules?: string;
    items?: LayoutItem[];
    choices?: any;
    isEditMode?: boolean;
    parentId?: string;
    textHidden?: boolean;
    [key: string]: any;
}

interface RequestPackagedLayoutAction {
    type: 'REQUEST_PACKAGED_LAYOUT';
}

interface GetAllQuestionAction {
    type: 'GET_ALL_QUESTION'
    layout: Layout;
}

interface UpdateActivationAction {
    type: 'UPDATE_ACTIVATION'
    activation: LayoutItemActivation
    itemId: string
}
interface ReceivePackagedLayoutAction {
    type: 'RECEIVE_PACKAGED_LAYOUT';
    layout: Layout;
}

interface ReceivePackagedLayoutErrorsAction {
    type: 'RECEIVE_PACKAGED_LAYOUT_ERRORS';
    errors: any;
}

interface SaveLayoutAction {
    type: 'SAVE_LAYOUT';
    layout: Layout;
}

interface LayoutSavedAction {
    type: 'LAYOUT_SAVED';
}

interface LoadLayoutTagsAction {
    type: 'LOAD_LAYOUT_TAGS',
    tags: string[]
}

interface LoadedLayoutListFromTagsAction {
    type: 'LOAD_LAYOUTLIST_FROM_TAGS',
    layoutList: PagedList<any>
}

interface SetSelectedTagsAction {
    type: 'SET_SELECTED_TAGS',
    tags: string[]
}

interface LoadedLayoutListFromTagsAction {
    type: 'LOAD_LAYOUTLIST_FROM_TAGS',
    layoutList: PagedList<any>
}

interface ReceivedLayoutAction {
    type: 'RECEIVED_LAYOUT',
    layout: Layout
}

interface SaveLayoutItemAction {
    type: 'SAVE_LAYOUT_ITEM';
    layoutItem: LayoutItem;
    parentId: string;
}

interface RemoveLayoutItemAction {
    type: 'REMOVE_LAYOUT_ITEM';
    itemId: string;
    parentId: string;
}

interface UpdateLayoutItemWidthAction {
    type: 'UPDATE_LAYOUT_ITEM_WIDTH';
    width: number;
    parentId: string;
    itemId: string;
}

interface MoveItemAction {
    type: 'MOVE_ITEM';
    direction: "UP" | "DOWN"
    parentId: string;
    itemId: string;
}

interface ToggleQuestionNumberingAction {
    type: 'TOGGLE_QUESTION_NUMBERING';
    itemId: string;
    isNumbered: boolean;
}

interface ToggleQuestionTextAction {
    type: 'TOGGLE_QUESTION_TEXT';
    itemId: string;
    isTextHidden: boolean;
}

interface RenumberLayoutAction {
    type: "RENUMBER_LAYOUT"
}

interface RequestAffectedLayoutsAction {
    type: 'REQUEST_AFFECTED_LAYOUTS';
    questionId: string;
}

interface ReceiveAffectedLayoutsAction {
    type: 'RECEIVE_AFFECTED_LAYOUTS';
    affectedLayouts: PagedList<Layout>;
}

interface ImportLayoutAction {
    type: 'IMPORT_LAYOUT',
    layout: Layout
}

interface RemoveLayoutAction {
	type: 'REMOVE_LAYOUT',
	layout: Layout
}

interface UpdateItemAccess {
    type: 'UPDATE_ITEM_ACCESS',
    itemId: string,
    parentId: string,
    groupAccess: string []
}

type KnownAction = RequestPackagedLayoutAction
    | ReceivePackagedLayoutAction
    | SaveLayoutAction
    | LayoutSavedAction
    | LoadLayoutTagsAction
    | SetSelectedTagsAction
    | LoadedLayoutListFromTagsAction
    | ReceivedLayoutAction
    | SaveLayoutItemAction
    | RemoveLayoutItemAction
    | UpdateLayoutItemWidthAction
    | MoveItemAction
    | ToggleQuestionNumberingAction
    | ToggleQuestionTextAction
    | RenumberLayoutAction
    | ReceiveAffectedLayoutsAction
    | RequestAffectedLayoutsAction
    | ImportLayoutAction
    //| UpdateLayoutName
    //| RemoveLayoutTag
    //| AddLayoutTag
    | GetAllQuestionAction
	| UpdateActivationAction
    | RemoveLayoutAction
    | UpdateItemAccess;

export const actionCreators = {
    createLayout: (layoutName: string, tags: string[]): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const layout = await AjaxUtils.post('api/layout', {
                    layoutName,
                    tags
                });

                dispatch({
                    type: 'RECEIVED_LAYOUT',
                    layout
                });

                return layout.layoutId;
            } catch (err) {
                throw err;
            }
		},
	deleteLayout: (layoutId: any): AppThunkAction<KnownAction> =>
		async (dispatch, getState) => {
			try {
				const layout = await AjaxUtils.remove(`api/layout/${layoutId}`);

				dispatch({
					type: 'REMOVE_LAYOUT',
					layout
				});

				return layout.layoutId;
			} catch (err) {
				throw err;
			}
		},
	editLayoutProperties: (layoutName: string, tags: string[]): AppThunkAction<KnownAction> =>
		async (dispatch, getState) => {
			try {

				const layout = getState().layout.layout as Layout;

				layout.layoutName = layoutName;
				layout.tags = tags;

				dispatch({
					type: 'SAVE_LAYOUT',
					layout
				});

				return await AjaxUtils.put('api/layout', layout)
					.then(() => {
						dispatch({ type: 'LAYOUT_SAVED' });
					});

			} catch (err) {
				throw err;
			}
		},        
    updateActivationState: (itemId: string, activation: LayoutItemActivation): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            dispatch({
                type: "UPDATE_ACTIVATION",
                itemId,
                activation
            });
        },
    loadLayoutTags: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const tags = await AjaxUtils.get('api/layout/tags');
                dispatch({
                    type: "LOAD_LAYOUT_TAGS",
                    tags
                });
            }
            catch (err) {
                console.log(err);
            }
        },
    loadLayouListFromTags: (tags: string[], page: number): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {

                dispatch({
                    type: 'SET_SELECTED_TAGS',
                    tags
                });

                let paramList = tags
                    .map(tag => `tags=${encodeURIComponent(tag)}`)
                    .join('&');
                paramList = paramList + `&page=${page}`;
                let url = `api/layout`;

                if (paramList) {
                    url = `${url}?${paramList}`;
                }
                const layoutList = await AjaxUtils.get(url) as PagedList<Layout>;

                dispatch({
                    type: 'LOAD_LAYOUTLIST_FROM_TAGS',
                    layoutList
                });

            } catch (err) {
                console.log(err);
            }
        },
    requestLayout: (layoutId: string, returnPromise?: boolean): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            console.log('layout load');
            if (returnPromise) {
                return await AjaxUtils.get(`api/layout/${layoutId}`);
            }
            try {
                const layout = await AjaxUtils.get(`api/layout/${layoutId}`);
                dispatch({
                    type: 'RECEIVED_LAYOUT',
                    layout
                });
                dispatch({
                    type: 'GET_ALL_QUESTION',
                    layout
                });
            } catch (err) {
                console.log(err);
            }
        },
    requestSurvey: (surveyId: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const layout = await AjaxUtils.get(`api/survey/${surveyId}`);
                dispatch({
                    type: 'RECEIVED_LAYOUT',
                    layout
                });
                dispatch({
                    type: 'GET_ALL_QUESTION',
                    layout
                });
            } catch (err) {
                console.log(err);
            }
        },
    requestOutbreakSurvey: (outbreakId: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {
                const layout = await AjaxUtils.get(`api/layout/${outbreakId}`);
                dispatch({
                    type: 'RECEIVED_LAYOUT',
                    layout
                });
                dispatch({
                    type: 'GET_ALL_QUESTION',
                    layout
                });
            } catch (err) {
                console.log(err);
            }
        },
    copyLayout: (selectedlayoutId: string): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            try {

                //get selected layout
                const layout = await AjaxUtils.get(`api/layout/${selectedlayoutId}`);

                //copy selected layout to new layout
                dispatch({
                    type: 'IMPORT_LAYOUT',
                    layout
                });

                //save new layout along with copied items
                const newlayout = getState().layout.layout;

                return await AjaxUtils.put('api/layout', newlayout)
                    .then(() => {
                        dispatch({ type: 'LAYOUT_SAVED' });
                    });

            } catch (err) {
                console.log(err);
            }
        },
    saveLayoutItem: (parentId: string, layoutItem: LayoutItem): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            //see if needs ID generated
            if (!layoutItem.id) {
                layoutItem.id = Date.now().toString();
            }
            if (layoutItem.type == "repeatingQuestionsGroup") {
                layoutItem.id = "RG-" + layoutItem.id.replace("RG-","");
            }
            dispatch({
                type: 'SAVE_LAYOUT_ITEM',
                layoutItem,
                parentId
            });

            dispatch({ type: "RENUMBER_LAYOUT" });
        },
    toggleQuestionNumbering: (itemId: string, isNumbered: boolean): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'TOGGLE_QUESTION_NUMBERING',
                itemId,
                isNumbered
            });

            dispatch({ type: "RENUMBER_LAYOUT" });
        },
    toggleQuestionTextHidden: (itemId: string, isTextHidden: boolean): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'TOGGLE_QUESTION_TEXT',
                itemId,
                isTextHidden
            });
        },
    removeLayoutItem: (parentId: string, itemId: string): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'REMOVE_LAYOUT_ITEM',
                itemId,
                parentId
            });

            dispatch({ type: "RENUMBER_LAYOUT" });
        },
    updateLayoutItemWidth: (parentId: string, itemId: string, width: number): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {

            dispatch({
                type: 'UPDATE_LAYOUT_ITEM_WIDTH',
                itemId,
                parentId,
                width
            });
        },
    moveItem: (parentId: string, itemId: string, direction: "UP" | "DOWN"): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: "MOVE_ITEM",
                parentId,
                itemId,
                direction
            });
            dispatch({ type: "RENUMBER_LAYOUT" });
        },

    requestAffectedLayouts: (questionId: string, page: number, history: any): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {
            AjaxUtils.get(`api/Survey/question/${questionId}/layouts/${page}`)
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

    saveLayout: (): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            const layout = getState().layout.layout;
            dispatch({
                type: 'SAVE_LAYOUT',
                layout
            });

            return await AjaxUtils.put('api/layout', layout)
                .then(() => {
                    dispatch({ type: 'LAYOUT_SAVED' });
                    dispatch({
                        type: 'GET_ALL_QUESTION',
                        layout
                    });
                });
        },
    updateLayout: (layout: Layout): AppThunkAction<KnownAction> =>
        async (dispatch, getState) => {

            return await AjaxUtils.put('api/layout', layout);
        },
    importLayout: (layout: Layout): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'IMPORT_LAYOUT',
                layout
            });

            dispatch({ type: "RENUMBER_LAYOUT" });
        },
    updateItemAccess: (itemId: string, parentId: string, groupAccess: string[]): AppThunkAction<KnownAction> =>
        (dispatch, getState) => {
            dispatch({
                type: 'UPDATE_ITEM_ACCESS',
                itemId,
                parentId,
                groupAccess
            });
        },
};

const unloadedState: LayoutState = {
    layout: {
        items: [] as LayoutItem[]
    } as Layout,
    allTags: [] as string[],
    selectedTags: [] as string[],
    isLoading: defaults.boolean,
    layoutList: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Layout>,
    affectedLayouts: { paging: Object.assign({}, defaults.paging), list: [] } as PagedList<Layout>,
    lastAddedContext: {
        parentId: '',
        itemId: ''
    },
    questions: [] as LayoutItem[]
};

export const reducer: Reducer<LayoutState> = (state: LayoutState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PACKAGED_LAYOUT':
            return Object.assign({}, state, {
                isLoading: true
            });
        case 'RECEIVE_PACKAGED_LAYOUT':
            return Object.assign({}, state, {
                layout: action.layout,
                isLoading: false
            });
        case 'SAVE_LAYOUT':
            return state;
        case 'GET_ALL_QUESTION':
            return Object.assign({}, state, { questions: LayoutUtils.getItemBytype(action.layout, layoutItemType.question) });
        case 'UPDATE_ACTIVATION':
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                const item = LayoutUtils.getItemById(newState.layout, action.itemId) as LayoutItem;

                if (item) {
                    item.activation = action.activation;
                }

                return newState;
            })();
        case 'LAYOUT_SAVED':
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                newState.layout.savedOn = new Date().toString();
                newState.layout.hasBeenEdited = false;

                return newState;
            })();

        case 'LOAD_LAYOUT_TAGS':
            return Object.assign({}, state, { allTags: action.tags });

        case 'SET_SELECTED_TAGS':
            return Object.assign({}, state, { selectedTags: action.tags });

        case 'LOAD_LAYOUTLIST_FROM_TAGS':
            return Object.assign({}, state, { layoutList: action.layoutList });

        case 'RECEIVED_LAYOUT':
            return Object.assign({}, state, { layout: action.layout });

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

        //layout editor
        case 'SAVE_LAYOUT_ITEM':
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });
                const parent = LayoutUtils.getItemById(newState.layout, action.parentId);

                if (!parent) {
                    return state;
                }

                parent.items = parent.items || [];

                const itemIndex = parent.items
                    .findIndex(item => item.id === action.layoutItem.id);

                //update
                if (itemIndex > -1) {
                    parent.items[itemIndex] = action.layoutItem;
                } else { //insert
                    parent.items.push(action.layoutItem);
                    newState.lastAddedContext = {
                        parentId: action.parentId,
                        itemId: action.layoutItem.id
                    };
                }

                return newState;
            })();

        case 'TOGGLE_QUESTION_NUMBERING':
            return (function () {

                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                const item = LayoutUtils.getItemById(newState.layout, action.itemId) as LayoutItem;

                if (item) {
                    item.isNumbered = action.isNumbered;

                    if (!action.isNumbered) {
                        item.number = '';
                    }
                }

                return newState;

            })();

        case 'TOGGLE_QUESTION_TEXT':
            return (function () {

                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                const item = LayoutUtils.getItemById(newState.layout, action.itemId) as LayoutItem;

                if (item) {
                    item.textHidden = action.isTextHidden;
                }

                return newState;

            })();

        case 'MOVE_ITEM':
            const newState = Object.assign({}, state, {
                layout: Object.assign({}, state.layout)
            });

            let parent = LayoutUtils.getItemById(newState.layout, action.parentId) as any;

            if (!parent || !parent.items) {
                return state;
            }

            let itemIndex = parent.items.findIndex((item: LayoutItem) => item.id === action.itemId);
            const existingItem = parent.items[itemIndex];

            if (action.direction === 'UP') {
                itemIndex--;
            } else {
                itemIndex++;
            }

            if (itemIndex < 0 || itemIndex >= parent.items.length) {
                return state;
            }

            parent.items = parent.items.filter((item: LayoutItem) => item.id !== action.itemId);

            parent.items.splice(itemIndex, 0, existingItem);

            return newState;

        case "RENUMBER_LAYOUT":
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                newState.layout = LayoutUtils.autoNumber(newState.layout);

                newState.layout.hasBeenEdited = true;

                return newState;
            })();

        case 'UPDATE_LAYOUT_ITEM_WIDTH':
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                const parent = LayoutUtils.getItemById(newState.layout, action.parentId);

                if (!parent || !parent.items) {
                    return state;
                }

                const items = [...parent.items];
                const index = items.findIndex(item => item.id === action.itemId);

                items[index].width = action.width;

                return newState;
            })();

        case 'REMOVE_LAYOUT_ITEM':
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                const parent = LayoutUtils.getItemById(newState.layout, action.parentId);

                if (!parent) {
                    return state;
                }

                parent.items = (parent.items || [])
                    .filter(item => item.id !== action.itemId);

                let allItemIds = {} as any;

                LayoutUtils.getAllIds(allItemIds, newState.layout.items);

                // if (newState.layout.activations) {
                //     newState.layout.activations.map((activation: Activation) => {
                //         activation.rules = activation.rules.filter(rule => {
                //             const interpreter = getDefaultInterpreter({});
                //             const tree = interpreter.parser.getTree(interpreter.lexer.getTokens(rule));
                //             const left = (tree[0] as any).left;
                //             const triggerItemId = left.args[0].value;

                //             return ((triggerItemId != action.itemId) && (allItemIds[triggerItemId] == 1))
                //         });
                //     });

                //     newState.layout.activations = newState.layout.activations
                //         .filter(activation => activation.targetItemId !== action.itemId && activation.rules.length > 0 && allItemIds[activation.targetItemId] == 1);
                // }

                // if (newState.layout.validations) {
                //     newState.layout.validations = newState.layout.validations
                //         .filter(validation => validation.itemId !== action.itemId && validation.validationRules.length > 0 && allItemIds[validation.itemId] == 1);
                // }

                return newState;
            })();

        case "IMPORT_LAYOUT":
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                newState.layout.items = JSON.parse(JSON.stringify(newState.layout.items.concat(action.layout.items)));

                // newState.layout.activations = JSON.parse(JSON.stringify(newState.layout.activations.concat(action.layout.activations)));

                // newState.layout.validations = JSON.parse(JSON.stringify(newState.layout.validations.concat(action.layout.validations)));

                return newState;
            })();
		case "REMOVE_LAYOUT":
			return (function () {
				const newState = Object.assign({}, state, {
					layout: Object.assign({}, unloadedState.layout)
				});
				return newState;
			})();
        case "UPDATE_ITEM_ACCESS":
            return (function () {
                const newState = Object.assign({}, state, {
                    layout: Object.assign({}, state.layout)
                });

                const parent = LayoutUtils.getItemById(newState.layout, action.parentId);

                if (!parent || !parent.items) {
                    return state;
                }

                const items = [...parent.items];
                const index = items.findIndex(item => item.id === action.itemId);

                items[index].groupAccess = action.groupAccess;

                return newState;
            })();

        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};