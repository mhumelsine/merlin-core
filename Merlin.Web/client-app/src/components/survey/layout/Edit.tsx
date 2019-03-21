import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { SurveyState } from '../../../store/Survey';
import * as LayoutStore from '../../../store/Layout';
import * as SurveyStore from '../../../store/Survey';
import { ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import Loading from '../../common/Loading';
import LayoutViewer from '../LayoutViewer';
import BackButton from '../../common/BackButton';
import SideMenu from '../../common/SideMenu';
import SideMenuItem from '../../common/SideMenuItem';
import { FaPlayCircle, FaEdit, FaListAlt, FaCog, FaTasks, FaRegSave, FaNewspaper } from 'react-icons/fa';
import MessageForm from './MessageForm';
import { defaults } from '../../../utils/Global';
import { layoutItemType, Layout } from '../../../store/Layout';
import EditCharm from '../../common/EditCharm';
import * as LayoutUtils from '../../../utils/LayoutUtils';
import EditLayoutViewer from '../EditLayoutViewer';
import Alert from '../../common/Alert';
import { MdDashboard } from 'react-icons/md';
import ControlList from '../ControlList';
import PropertyManager from './PropertyManager';
import moment from 'moment';
import { isNullOrEmpty } from '../../../utils/UIUtils';
import DeleteButton from '../../common/DeleteButton';
import { ClaimType, Role } from '../../../store/Session';
import Sticky from '../../common/Sticky';
import Secure from '../../common/Secure';
import { actionCreators as CodeActions, Codes, CodeType } from '../../../store/Code';
import { Survey } from '../../../store/Survey';

type LayoutEditProps = {
    lastAddedContext: {
        parentId: string,
        itemId: string
    },
    layout: Layout,
    survey: Survey
}
    & typeof LayoutStore.actionCreators
    & typeof SurveyStore.actionCreators
    & typeof CodeActions
    & RouteComponentProps<{}>;

export interface EditContext {
    selectedItemType: layoutItemType;
    selectedItemId: string;
    parentId: string;
    menuItemSelected: layoutItemType;
    action: ActionContext;
}

export enum ActionContext {
    none,
    addQuestion,
    deleteLayoutItem,
    editLayoutItem,
    addControl // << Open Charm
}

class LayoutEdit extends React.Component<LayoutEditProps, {}> {
    state = {
        survey: this.props.survey,
        layout: {} as Layout,
        //selectedItem: defaults.string,
        sideMenuIsCollapsed: defaults.boolean,
        propertySelected: defaults.boolean,
        isSaving: defaults.boolean,
        saveTimeout: defaults.number,
        errorMessage: defaults.string,
        isLoading: defaults.boolean,
        isEditMode: defaults.boolean,
        //selectedId: defaults.string,
        isPreviewMode: defaults.boolean,
        editContext: {
            selectedItemId: '',
            parentId: '',
            action: ActionContext.none
        } as EditContext,
        answers: {} as any,
        errors: {} as any,
        timeSinceLastSave: defaults.string,
        shouldResetCountdownTimer: defaults.boolean,
        saveFailed: defaults.boolean
    };
    lastSavedInterval: any;

    constructor(props: LayoutEditProps) {
        super(props);
        this.lastSavedInterval = defaults.NULL;
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.clearEditContext = this.clearEditContext.bind(this);
        this.toggleMenuCollapse = this.toggleMenuCollapse.bind(this);
        this.onSaveLayout = this.onSaveLayout.bind(this);
        this.onItemEdit = this.onItemEdit.bind(this);
        this.saveLayoutItem = this.saveLayoutItem.bind(this);
        this.canAddQuestion = this.canAddQuestion.bind(this);
        this.onAnswerChange = this.onAnswerChange.bind(this);
        this.togglePreviewMode = this.togglePreviewMode.bind(this);
        this.menuNavigate = this.menuNavigate.bind(this);
        this.onPropertyManagerClick = this.onPropertyManagerClick.bind(this);
        this.onPropertyClose = this.onPropertyClose.bind(this);
        this.addLayout = this.addLayout.bind(this);
        this.canAddLayout = this.canAddLayout.bind(this);
        this.getLayoutNow = this.getLayoutNow.bind(this);
        this.removeLayout = this.removeLayout.bind(this);
        this.getAllDuplicateIdErrors = this.getAllDuplicateIdErrors.bind(this);
        this.onSectionMenuItemClick = this.onSectionMenuItemClick.bind(this);
        this.setLastSavedInterval = this.setLastSavedInterval.bind(this);
        this.showTimeSinceLastSave = this.showTimeSinceLastSave.bind(this);
        this.onSectionMenuItemClick = this.onSectionMenuItemClick.bind(this);
        this.LayoutItemMenuClick = this.LayoutItemMenuClick.bind(this);
        this.ShowEditCharm = this.ShowEditCharm.bind(this);
        this.getOffset = this.getOffset.bind(this);
        this.clearErrorMessage = this.clearErrorMessage.bind(this);
    }

    public async componentWillMount() {
        try {
            this.setState({ isLoading: true });
            const { layoutId } = this.props.match.params as any;

            await this.props.requestLayout(layoutId);
            await this.props.loadDropdown(CodeType.access);
        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    public componentWillReceiveProps(newProps: LayoutEditProps) {
        if (newProps.layout && newProps.layout !== this.state.layout) {
            const newState = Object.assign({}, this.state);
            newState.layout = newProps.layout;
            newState.isLoading = defaults.boolean;
            newState.errors = {} as any;
            if ((newProps.layout.savedOn !== this.state.layout.savedOn) && !isNullOrEmpty(newProps.layout.savedOn)) {
                newState.timeSinceLastSave = this.getDateDifferenceAsString(new Date(), new Date(newProps.layout.savedOn.replace(/["']/g, "")));
                this.setLastSavedInterval();
                newState.shouldResetCountdownTimer = true;
                newState.saveFailed = defaults.boolean;
            }
            this.setState(newState, () => {
                if (newState.shouldResetCountdownTimer) {
                    this.setState({ shouldResetCountdownTimer: defaults.boolean });
                }
            });
        }
    }

    public componentWillUnmount() {
        clearTimeout(this.state.saveTimeout);
        clearInterval(this.lastSavedInterval);
        this.lastSavedInterval = defaults.NULL;
    }

    public componentDidMount() {
        document.title = defaults.titles.EditLayoutPage;
    }

    private async addLayout(layoutId: string) {
        const { requestLayout, history } = this.props;
        const { layout } = this.state;
        let layoutToBeImported = await this.getLayoutNow(layoutId);
        let allIds = {} as any;
        LayoutUtils.getAllIds(allIds, this.state.layout.items);
        let allDuplicateIdErrors = [] as any;
        this.getAllDuplicateIdErrors(allIds, layoutToBeImported.items, allDuplicateIdErrors);
        if (allDuplicateIdErrors.length > 0) {
            let newState = Object.assign({}, this.state);
            newState.errors[""] = allDuplicateIdErrors;
            this.setState(newState);
        }
        else {
            this.props.importLayout(layoutToBeImported);
        }
    }

    private getDateDifferenceAsString(d1: Date, d2: Date) {
        var m1 = moment(d1);
        var m2 = moment(d2);

        var s2 = moment.max(m1, m2);

        var s1 = moment.min(m1, m2);

        var years = s2.diff(s1, "years");
        var months = s2.diff(s1, "months");
        var days = s2.diff(s1, "days");
        var hours = s2.diff(s1, "hours");
        var minutes = s2.diff(s1, "minutes");
        var seconds = s2.diff(s1, "seconds");

        var differenceDescription = defaults.string;

        if (seconds >= 0) {
            differenceDescription = "less than a minute";
        }
        if (minutes > 0) {
            differenceDescription = `${minutes} ${minutes == 1 ? 'minute' : 'minutes'}`;
        }
        if (hours > 0) {
            differenceDescription = `${hours} ${hours == 1 ? 'hour' : 'hours'}`;
        }
        if (days > 0) {
            differenceDescription = `${days} ${days == 1 ? 'day' : 'days'}`;
        }
        if (months > 0) {
            differenceDescription = `${months} ${months == 1 ? 'month' : 'months'}`;
        }
        if (years > 0) {
            differenceDescription = `${years} ${years == 1 ? 'year' : 'years'}`;
        }

        return differenceDescription;

    }

    private async getLayoutNow(layoutId: string) {
        const { requestLayout, history } = this.props;

        let layout = undefined;
        return (requestLayout(layoutId, true) as any).then((latestLayout: Layout) => {
            return latestLayout;
        }).catch((errors: any) => {
            history.replace(defaults.urls.loadFailureUrl);
        });
    }

    private canAddLayout(layoutId: string) {
        return this.state.layout.layoutId !== layoutId;
    }

    private getAllDuplicateIdErrors(allIds: any, items: any, duplicateIdErrors: any) {
        items.map((item: any) => {
            const foundItem = allIds[item.id];
            if (foundItem == 1) {
                const layoutItem = LayoutUtils.getItemById(this.state.layout, item.id) as LayoutStore.LayoutItem;
                let itemType = 'undefined';
                let itemDescription = 'undefined';
                if (layoutItem) {
                    itemType = layoutItem.type;
                    switch (layoutItem.type) {
                        case layoutItemType.question:
                        case layoutItemType.message:
                            itemDescription = layoutItem.text;
                        case layoutItemType.control:
                        case layoutItemType.section:
                            itemDescription = layoutItem.title || itemDescription;
                        case layoutItemType.spacer:
                        default:
                        //do nothing
                    }
                }
                duplicateIdErrors.push(`Please remove the ${itemType} '${itemDescription}' from the current layout before importing.`);
            }
            this.getAllDuplicateIdErrors(allIds, item.items, duplicateIdErrors);
        });
    }

    private toggleMenuCollapse() {
        this.setState({ sideMenuIsCollapsed: !this.state.sideMenuIsCollapsed });
    }

    private onSectionMenuItemClick(event: any) {
        event.preventDefault();
        const { layoutId } = this.state.layout;

        const newItem = {
            id: '',
            type: layoutItemType.section,
            title: '',
            width: 12,
            items: [],
            isEditMode: true,
            parentId: layoutId,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess: defaults.groupAccess
        } as LayoutStore.LayoutItem

        this.props.saveLayoutItem(layoutId, newItem);
    }

    private onMenuItemClick(event: any) {
        event.preventDefault();

        const clickedItemType = event.currentTarget.name;

        const { editContext, layout } = this.state;

        const newEditContext = Object.assign({}, editContext, {
            menuItemSelected: clickedItemType,
            selectedItemType: editContext.selectedItemType || clickedItemType,
            parentId: editContext.parentId || layout.layoutId,
            action: ActionContext.addControl
        });

        this.setState({ editContext: newEditContext });
    }

    private onPropertyManagerClick(event: any) {
        event.preventDefault();
        const clickedItemType = event.currentTarget.name;

        let newState = Object.assign({}, this.state);
        newState.propertySelected = true;
        this.setState(newState);
    }

    private canAddQuestion(questionId: string): boolean {
        const item = LayoutUtils.getItemById(this.state.layout, questionId);

        return item === undefined;
    }

    private showSaved() {
        //capture this
        const component = this;
        const date = new Date();

        const newState = Object.assign({}, component.state, {
            layout: Object.assign({}, component.state.layout)
        });

        newState.timeSinceLastSave = component.getDateDifferenceAsString(date, date);

        newState.errorMessage = defaults.string;

        component.setState(newState, () => { component.setLastSavedInterval(); });
    }

    private async onSaveLayout(event?: any | undefined) {
        var id = defaults.string;

        if (event) {
            event.preventDefault();
            id = event.currentTarget.id;
        }

        this.setState({ isSaving: true });

        try {
            await this.props.saveLayout();
        } catch (err) {
            var errorMessage = defaults.string;
            try {
                if (!isNullOrEmpty(err[""])) {
                    errorMessage = err[""];
                }
            }
            catch (e) {
                //do nothing
            }
            this.setState({ saveMessage: `Layout save failed. ${errorMessage}`, saveFailed: true, isSaving: defaults.boolean });
        } finally {
            if (this.state.isSaving) {
                this.showSaved();
                this.setState({ isSaving: false, saveFailed: false });
            }
        }
    }

    private setLastSavedInterval() {
        if (this.lastSavedInterval > 0) {
            clearInterval(this.lastSavedInterval);
            this.lastSavedInterval = defaults.NULL;
        }
        this.lastSavedInterval = setInterval(() => {
            this.setState({ timeSinceLastSave: this.getDateDifferenceAsString(new Date(), new Date(this.state.layout.savedOn.replace(/["']/g, ""))) });
        },
            60000);
    }

    private showTimeSinceLastSave() {
        const { timeSinceLastSave } = this.state;

        return (
            <p className="btn-space-right" style={{ "fontSize": 13, "display": "inline" }}>
                {!isNullOrEmpty(timeSinceLastSave) &&
                    <span>
                        {'Last saved '}
                        <span className="text-success">
                            {timeSinceLastSave}
                        </span>
                        {' ago. '}
                    </span>
                }
            </p>
        );
    }

    private charmChildSelected() {
        const { editContext, layout } = this.state;
        let item = undefined;
        let parentId = editContext.selectedItemId;

        //if is it an edit fetch the item
        if (editContext.menuItemSelected === editContext.selectedItemType
            && editContext.selectedItemType !== layoutItemType.question) { //no edit for question, this is add sub-question

            item = LayoutUtils.getItemById(this.props.layout, editContext.selectedItemId) as LayoutStore.LayoutItem;
            parentId = editContext.parentId;
        }

        switch (editContext.menuItemSelected) {
            case layoutItemType.message:
                return <MessageForm
                    saveLayoutItem={this.saveLayoutItem}
                    parentId={parentId}
                    layoutItem={item || {
                        id: '',
                        type: layoutItemType.message,
                        messageType: LayoutStore.messageType.light,
                        title: '',
                        width: 12,
                        activation: defaults.activation,
                        validations: defaults.validations,
                        groupAccess: defaults.groupAccess
                    }}
                />;
            case layoutItemType.control:
                return <ControlList
                    parentId={parentId}
                    canAddControl={this.canAddQuestion}
                    onAdd={this.saveLayoutItem}
                />;

            default:
                break;
        }
    }

    private clearEditContext() {
        this.setState({
            editContext: {
                selectedItemId: '',
                parentId: '',
                selectedItemType: undefined,
                menuItemSelected: undefined
            }, isEditMode: defaults.boolean
        });
    }

    private LayoutItemMenuClick(parentId: string, itemId: string) {
        if (this.state.editContext.selectedItemId === itemId) {
            this.clearEditContext();
            return;
        }

        return LayoutUtils.getItemById(this.state.layout, itemId) as LayoutStore.LayoutItem;
    }

    private onItemEdit(parentId: string, itemId: string) {
        const selectedItem = this.LayoutItemMenuClick(parentId, itemId);

        if (!selectedItem) {
            return;
        }

        if (selectedItem.type === layoutItemType.section ||
            selectedItem.type === layoutItemType.repeatingQuestionsGroup) {
            selectedItem.isEditMode = true;
            selectedItem.parentId = parentId;
            this.props.saveLayoutItem(parentId, selectedItem);
        }

        this.setState({
            editContext: {
                selectedItemType: selectedItem.type,
                menuItemSelected: selectedItem.type,
                selectedItemId: itemId,
                parentId,
                action: ActionContext.editLayoutItem
            }, isEditMode: true
        });
    }

    private isInContext(...itemTypes: layoutItemType[]) {
        const { editContext } = this.state;

        return itemTypes.some(type => type === editContext.selectedItemType);
    }

    private onPropertyClose() {
        let newState = Object.assign({}, this.state);
        newState.propertySelected = !newState.propertySelected
        this.setState(newState);
    }

    private onAnswerChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
        Object.keys(newState.answers)
            .filter((key: any) => (newState.answers[key] === defaults.string) || (newState.answers[key] == undefined))
            .forEach(key => delete newState.answers[key]);
        this.setState(newState);
    }

    private togglePreviewMode(event: any) {
        event.preventDefault();

        this.setState({
            isPreviewMode: !this.state.isPreviewMode,
            answers: {} as any
        });
    }

    private menuNavigate(event: any) {
        event.preventDefault();

        this.props.history.push(event.currentTarget.getAttribute("data-href"));
    }

    private saveLayoutItem(parentId: string, item: LayoutStore.LayoutItem) {

        if (parentId) {
            this.props.saveLayoutItem(parentId, item);

            if (item.type !== layoutItemType.question) {
                this.clearEditContext();
            }
        }
    }
    private async removeLayout() {
        const { layout } = this.state;
        const { deleteLayout, history } = this.props;

        try {
            this.setState({ errorMessage: defaults.string });
            await deleteLayout(layout.layoutId);
            history.goBack();
        }
        catch (err) {
            //console.log(err);
            this.setState({ errorMessage: 'Cannot delete a layout in use.' });
        }
    }

    private clearErrorMessage() {
        console.log("CLICKED");
        this.setState({ errorMessage: '' });
    }

    private ShowEditCharm() {
        const { editContext } = this.state;
        const offset = this.getOffset();

        return <EditCharm
            title={editContext.menuItemSelected}
            isOpen={editContext.menuItemSelected !== undefined}
            offset={offset}
            onCloseCharm={this.clearEditContext}
        >
            {this.charmChildSelected()}
        </EditCharm>
    }

    private getOffset() {
        const { sideMenuIsCollapsed } = this.state;
        return sideMenuIsCollapsed ? '55px' : '180px';
    }

    public render() {
        const { isLoading, isPreviewMode, editContext, sideMenuIsCollapsed, survey, layout, isSaving, errorMessage, isEditMode, answers, propertySelected, errors, saveFailed, timeSinceLastSave, shouldResetCountdownTimer } = this.state;
        const { history, updateLayoutItemWidth, deleteLayout } = this.props;
        const offset = this.getOffset();
        const useSlideMenu = editContext.selectedItemType !== undefined && editContext.action === ActionContext.addControl;
        const contentOffset = useSlideMenu ? (sideMenuIsCollapsed ? '355px' : '480px') : offset;
        const layoutId = (this.props.match.params as any).layoutId;
        if (isLoading) {
            return <Loading />
        }
        return <div className="layout-edit">
            <div>
                <SideMenu isCollapsed={sideMenuIsCollapsed} toggleCollapse={this.toggleMenuCollapse}>
                    {/* SubMenuItems HERE */}
                    <SideMenuItem
                        isCollapsed={sideMenuIsCollapsed}
                        isActive={this.isInContext(layoutItemType.section)}
                        itemType={layoutItemType.section}
                        icon={<FaNewspaper fontSize={30} />}
                        onClick={this.onSectionMenuItemClick}
                    >
                        Section
                    </SideMenuItem>

                    <SideMenuItem
                        isCollapsed={sideMenuIsCollapsed}
                        isActive={this.isInContext(layoutItemType.control)}
                        itemType={layoutItemType.control}
                        icon={<MdDashboard fontSize={30} />}
                        onClick={this.onMenuItemClick}
                    >
                        Controls
                    </SideMenuItem>

                    <div className="Separator" style={{ "border": "1px solid #009FB0" }} ></div>

                    <SideMenuItem
                        isCollapsed={sideMenuIsCollapsed}
                        isActive={isPreviewMode}
                        icon={isPreviewMode ? <FaEdit fontSize={30} /> : <FaPlayCircle fontSize={30} />}
                        onClick={this.togglePreviewMode}>
                        {isPreviewMode ? "Edit" : "Preview"}
                    </SideMenuItem>

                    <div className="Separator" style={{ "border": "1px solid #009FB0" }}></div>

                    <SideMenuItem
                        isCollapsed={sideMenuIsCollapsed}
                        isActive={false}
                        icon={<FaListAlt fontSize={30} />}
                        href={`${defaults.urls.questionManagerUrl}/${layoutId}`}
                        onClick={this.menuNavigate}
                    >
                        Question Manager
                    </SideMenuItem>

                    <SideMenuItem
                        isCollapsed={sideMenuIsCollapsed}
                        isActive={false}
                        icon={<FaTasks fontSize={30} />}
                        href={`${defaults.urls.attachSurveysUrl}/${layout.layoutId}`}
                        onClick={this.menuNavigate}
                    >
                        Attach Surveys
                    </SideMenuItem>

                    <SideMenuItem
                        isCollapsed={sideMenuIsCollapsed}
                        isActive={false}
                        icon={<FaCog fontSize={30} />}
                        onClick={this.onPropertyManagerClick}
                    >
                        Property Manager
                    </SideMenuItem>

                </SideMenu>
                {
                    // Show/Hide Charm
                    useSlideMenu && this.ShowEditCharm()
                }
            </div>

            <div className={"fadeIn"} style={{ "paddingLeft": contentOffset, "transitionProperty": "padding" }}>
                <Sticky>
                    <h1 className="position-sticky-state row" style={{ "top": 96, "zIndex": 1080, "backgroundColor": "#fff" }}>
                        <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
                            <span>{isPreviewMode ? `Preview - ${layout.layoutName}` : `Edit Layout - ${layout.layoutName} ${layout.hasBeenEdited ? '*(unsaved)' : ''}`}</span>
                            {(!isSaving && !isPreviewMode) && this.showTimeSinceLastSave()}
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                            {/*<SaveButton
								saveOnClick={this.onSaveLayout}
								saveIconFontSize={20}                            
							/>*/}
                            {!isPreviewMode &&
                                <button className={`${defaults.theme.buttons.class} pull-righ`} onClick={this.onSaveLayout}>
                                    <FaRegSave fontSize={20} style={{ verticalAlign: 'bottom' }} />
                                    {isSaving && <Loading />}
                                    <span> {isSaving ? "Saving" : "Save"} </span>
                                </button>
                            }
                        </div>
                        {(!isPreviewMode && this.state.saveFailed) || errorMessage &&
                            <div className="col-lg-12 col-md-12 col-sm-12" style={{ "fontSize": 20 }}>
                                <Alert alertType="danger" autoFocus={true} onBlur={this.clearErrorMessage}>
                                    {errorMessage}
                                </Alert>
                            </div>
                        }
                    </h1>
                </Sticky>
                {!isPreviewMode && <EditLayoutViewer
                    onResize={updateLayoutItemWidth}
                    onEdit={this.onItemEdit}
                    answers={answers}
                    layout={layout}
                    onAnswerChanged={this.onAnswerChange}
                    selectedItemId={editContext.selectedItemId}
                    errors={errors}
                />}
                {isPreviewMode && <LayoutViewer
                    layout={layout}
                    answers={answers}
                    onAnswerChanged={this.onAnswerChange}
                />
                }
                <Secure requireClaim={ClaimType.role} requireClaimValue={[Role.Admin]}>
                    <BackButton className="btn-space-right" goBack={history.goBack} />
                    <DeleteButton onClick={this.removeLayout} />
                </Secure>
            </div>
            <PropertyManager toggle={this.onPropertyClose} visible={propertySelected} title={"Edit Layout Properties"} />

        </div>;
    }

    public componentDidUpdate(prevProps: LayoutEditProps) {

        const { lastAddedContext } = this.props;

        if (lastAddedContext !== prevProps.lastAddedContext) {
            const node = document.getElementById(lastAddedContext.itemId);

            if (node) {
                window.scrollTo(0, node.getBoundingClientRect().top + (window.scrollY - 200));

                //need to highlight item once added.
            }
        }
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout.layout,
            survey: state.survey.survey,
            lastAddedContext: state.layout.lastAddedContext
        };
    },
    Object.assign(LayoutStore.actionCreators, SurveyStore.actionCreators, CodeActions)
)(LayoutEdit);