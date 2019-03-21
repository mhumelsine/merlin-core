import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators, LayoutItem, LayoutItemState, Layout } from '../../../store/Layout';
import { Codes } from '../../../store/Code';
import {
    MdSave,
    MdRemove,
    MdSpaceBar,
    MdFormatClear,
    MdNotifications,
    MdFormatListNumbered,

} from 'react-icons/md';
import {
    FaQuestionCircle,
    FaPlusCircle,
    FaComment,
    FaArrowCircleUp,
    FaArrowCircleDown,
    FaTimesCircle,
    FaEdit,
    FaRegObjectGroup,

    FaDatabase,

    FaLock,
    FaUser
} from 'react-icons/fa';
import { layoutItemType } from '../../../store/Layout';
import DropdownMenu from '../../common/DropdownMenu';
import DropdownMenuItem from '../../common/DropdownMenuItem';
import { ApplicationState } from '../../../store/index';
import Modal, { ModalWidth } from '../../common/Modal';
import QuestionAdd from './QuestionAdd';
import { Portal } from 'react-portal';
import QuestionEditFromLayout from './QuestionEditFromLayout';
import { defaults } from '../../../utils/Global';
import ButtonCheckGroup from '../../common/ButtonCheckGroup';
import Checkbox from '../../common/Checkbox';
import DropDownForm from '../../common/DropDownForm';
import * as utils from "../../../utils/UIUtils";

type EditItemProps = {
    onEdit: (parentId: string, itemId: string) => void;
    id: string;
    parentId: string;
    type: string;
    isLast: boolean;
    isFirst: boolean;
    showNumbering: boolean;
    isTextHidden: boolean;
    isNumbered: boolean;
    groupAccess: string[];
    codes?: Codes;
} & typeof actionCreators;

class EditItem extends React.Component<EditItemProps> {
    state = {
        showRemoveModal: false,
        showAddQuestionModal: false,
        showEditQuestionModal: false
    }

    constructor(props: any) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onAddRepeatingGroup = this.onAddRepeatingGroup.bind(this);
        this.onAddMessage = this.onAddMessage.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onMoveUp = this.onMoveUp.bind(this);
        this.onMoveDown = this.onMoveDown.bind(this);
        this.onNumberedChanged = this.onNumberedChanged.bind(this);
        this.onTextHiddenChanged = this.onTextHiddenChanged.bind(this);
        this.onAddLineBreak = this.onAddLineBreak.bind(this);
        this.onAddSpacer = this.onAddSpacer.bind(this);;
        this.deleteLayoutItemModal = this.deleteLayoutItemModal.bind(this);
        this.onItemRemovalConfirmed = this.onItemRemovalConfirmed.bind(this);
        this.addQuestionModal = this.addQuestionModal.bind(this);
        this.editQuestionModal = this.editQuestionModal.bind(this);
        this.toggleAddQuestionModal = this.toggleAddQuestionModal.bind(this);
        this.toggleItemRemoveModal = this.toggleItemRemoveModal.bind(this);
        this.toggleUpdateQuestionModal = this.toggleUpdateQuestionModal.bind(this);
        this.toggleGroupAccess = this.toggleGroupAccess.bind(this);
    }

    private onEdit(event: any) {
        const { id, parentId, type, onEdit } = this.props;

        if (type === layoutItemType.question) {
            this.setState({ showEditQuestionModal: true });
        }
        else {
            onEdit(parentId, id);
        }
    }

    private async onAddMessage(event: any) {
        const { id, saveLayoutItem, onEdit } = this.props;

        const newItem = {
            id: '',
            type: layoutItemType.message,
            width: 12,
            items: [],
            text: '',
            messageType: 'none',
            isEditMode: true,
            parentId: id,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess: defaults.groupAccess
        } as LayoutItem

        await saveLayoutItem(id, newItem);
        onEdit(id, newItem.id);
    }

    /* 
        could just have toggleAddQuestionModal called when the remove button is clicked,
        but leaving onAddQuestion here for readability/consistency 
    */
    private onAddQuestion(event: any) {
        this.toggleAddQuestionModal();
    }

    /* 
        could just have toggleItemRemoveModal called when the remove button is clicked,
        but leaving onRemoveItem here for readability/consistency 
    */
    private onRemoveItem(event: any) {
        this.toggleItemRemoveModal();
    }

    private onAddLineBreak(event: any) {
        const { id, saveLayoutItem } = this.props;

        const newItem = {
            id: '',
            type: layoutItemType.lineBreak,
            width: 12,
            items: [],
            text: '',
            parentId: id,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess: defaults.groupAccess
        } as LayoutItem

        saveLayoutItem(id, newItem);
    }

    private onAddSpacer(event: any) {
        const { id, saveLayoutItem } = this.props;

        const newItem = {
            id: '',
            type: layoutItemType.spacer,
            width: 12,
            items: [],
            text: '',
            parentId: id,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess: defaults.groupAccess
        } as LayoutItem

        saveLayoutItem(id, newItem);
    }

    private onAddRepeatingGroup(event: any) {
        const { id, saveLayoutItem } = this.props;

        const newItem = {
            id: '',
            type: layoutItemType.repeatingQuestionsGroup,
            width: 12,
            items: [],
            text: '',
            title: '',
            parentId: id,
            isEditMode: true,
            activation: defaults.activation,
            validations: defaults.validations,
            groupAccess: defaults.groupAccess
        } as LayoutItem

        saveLayoutItem(id, newItem);
    }

    private onMoveUp(event: any) {
        const { id, parentId, moveItem } = this.props;

        moveItem(parentId, id, 'UP');
    }

    private onMoveDown(event: any) {
        const { id, parentId, moveItem } = this.props;

        moveItem(parentId, id, 'DOWN');
    }

    private onNumberedChanged(event: any) {
        const { id, isNumbered, toggleQuestionNumbering } = this.props;

        toggleQuestionNumbering(id, !isNumbered);
    }

    private onTextHiddenChanged(event: any) {
        const { id, isTextHidden, toggleQuestionTextHidden } = this.props;

        toggleQuestionTextHidden(id, !isTextHidden);
    }

    private toggleItemRemoveModal(event?: any) {
        const { showRemoveModal } = this.state;

        this.setState({ showRemoveModal: !showRemoveModal });
    }

    private async onItemRemovalConfirmed() {
        const { id, parentId } = this.props;

        try {
            this.setState({ showRemoveModal: false }, async () => { await this.props.removeLayoutItem(parentId, id); })
        } catch (e) {
            console.log(e);
        }
    }

    private deleteLayoutItemModal() {
        const { type } = this.props;

        return <Portal><Modal
            toggle={this.toggleItemRemoveModal}
            visible={true}
            title="Confirm Delete"
            body={
                <div className="alert alert-danger">
                    {`Are you sure you want to delete this ${type}?`}
                </div>
            }
            footer={
                <div>
                    <button type="button" className="btn btn-danger" onClick={this.onItemRemovalConfirmed}>Yes</button>
                    <button type="button" className="btn btn-default" onClick={this.toggleItemRemoveModal}>No</button>
                </div>
            }
        /></Portal>
    }

    private toggleUpdateQuestionModal(event?: any) {
        const { showEditQuestionModal } = this.state;

        this.setState({ showEditQuestionModal: !showEditQuestionModal });
    }

    private editQuestionModal() {
        const { id, type, saveLayoutItem, parentId } = this.props;

        if (type === layoutItemType.section || type === layoutItemType.question) {
            return <Portal><Modal
                toggle={this.toggleUpdateQuestionModal}
                modalWidth={ModalWidth.large}
                visible={true}
                title="Edit Question"
                body={
                    <div>
                        <QuestionEditFromLayout
                            onQuestionSaved={saveLayoutItem}
                            parentId={parentId}
                            questionId={id}
                        />
                    </div>
                }
                footer={
                    <div>
                        <button type="button" className="btn btn-default" onClick={this.toggleUpdateQuestionModal}>Done</button>
                    </div>
                }
            /></Portal>
        }
    }

    private toggleAddQuestionModal(event?: any) {
        const { showAddQuestionModal } = this.state;

        this.setState({ showAddQuestionModal: !showAddQuestionModal });
    }

    private addQuestionModal() {
        const { id, type, saveLayoutItem } = this.props;

        if (type === layoutItemType.section || type === layoutItemType.question || type === layoutItemType.repeatingQuestionsGroup) {
            return <Portal>
                <Modal
                    toggle={this.toggleAddQuestionModal}
                    modalWidth={ModalWidth.large}
                    visible={true}
                    title="Add Question"
                    body={
                        <div>
                            <QuestionAdd
                                addQuestion={saveLayoutItem}
                                parentId={id}
                            />
                        </div>
                    }
                    footer={
                        <div>
                            <button type="button" className="btn btn-default" onClick={this.toggleAddQuestionModal}>Done</button>
                        </div>
                    }
                />
            </Portal>
        }
    }

    private toggleGroupAccess(name: string, value: any) {
        const { updateItemAccess, id, parentId } = this.props;

        updateItemAccess(id, parentId, value);
        /*
                [...groupAccess, value]
                [...groupAccess.filter(group => group !== value)]
                if (event.target.checked) {
                    groupAccess.push(event.target.value);
                }
                else {
                    groupAccess.pop(event.target.value);
                }
         */
    }

    public render() {
        const { isFirst, isLast, showNumbering, isNumbered, type, isTextHidden, groupAccess } = this.props;
        const { showRemoveModal, showAddQuestionModal, showEditQuestionModal } = this.state;
        const fontSize = 15;

        return <div style={{ borderRadius: "6px" }}>
            <div className="edit-controls">
                {showNumbering &&
                    <button
                        type="button"
                        title="Toggle Numbering"
                        className={`btn btn-outline-success btn-round ${isNumbered ? 'active' : ''}`}
                        onClick={this.onNumberedChanged}
                    >
                        <MdFormatListNumbered fontSize={fontSize} />
                        <span className="sr-only">Toggle Numbering</span>
                    </button>
                }
                {" "}
                {type === layoutItemType.question &&
                    <button
                        type="button"
                        title="Toggle Question Text"
                        className={`btn btn-outline-success btn-round ${isTextHidden ? 'active' : ''}`}
                        onClick={this.onTextHiddenChanged}
                    >
                        <MdFormatClear fontSize={fontSize} />
                        <span className="sr-only">Toggle Question Text</span>
                    </button>
                }
                {" "}
                {!isFirst &&
                    <button
                        type="button"
                        title="Move Up"
                        className="btn btn-outline-warning btn-round"
                        onClick={this.onMoveUp}
                    >
                        <FaArrowCircleUp fontSize={fontSize} />
                        <span className="sr-only">Move Up</span>
                    </button>
                }
                {" "}
                {!isLast &&
                    <button
                        type="button"
                        title="Move Down"
                        className="btn btn-outline-warning btn-round"
                        onClick={this.onMoveDown}
                    >
                        <FaArrowCircleDown fontSize={fontSize} />
                        <span className="sr-only">Move Down</span>
                    </button>
                }
                {" "}
                {(type === layoutItemType.section ||
                    type === layoutItemType.message ||
                    type === layoutItemType.question) &&
                    <button
                        type="button"
                        title="Edit"
                        className="btn btn-outline-primary btn-round"
                        onClick={this.onEdit}
                    >
                        <FaEdit fontSize={fontSize} />
                        <span className="sr-only">Edit</span>
                    </button>
                }
                {" "}
                {(type === layoutItemType.section ||
                    type === layoutItemType.question ||
                    type === layoutItemType.repeatingQuestionsGroup) &&
                    <DropdownMenu
                        menuText={<FaPlusCircle fontSize={fontSize} />}
                        menuContextClass="outline-info"
                        direction="dropleft"
                        title="Add Item"
                    >
                        <DropdownMenuItem onClick={this.onAddMessage}>
                            <FaComment fontSize={20} /> {" "}Message
						</DropdownMenuItem>
                        <DropdownMenuItem onClick={this.onAddQuestion}>
                            <FaQuestionCircle fontSize={20} /> {" "}{type === layoutItemType.question ? "Sub Question" : "Question"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={this.onAddRepeatingGroup} visible={type === layoutItemType.section}>
                            <FaRegObjectGroup fontSize={20} /> {" "}Repeating Group
						</DropdownMenuItem>
                        <DropdownMenuItem onClick={this.onAddSpacer}>
                            <MdSpaceBar fontSize={20} /> {" "}Spacer
						</DropdownMenuItem>
                        <DropdownMenuItem onClick={this.onAddLineBreak}>
                            <MdRemove fontSize={20} /> {" "}Line Break
						</DropdownMenuItem>
                    </DropdownMenu>
                }
                {" "}
                <DropDownForm
                    menuText={<FaLock fontSize={fontSize} />}
                    menuContextClass="outline-info"
                    direction="dropleft"
                    title="Access"
                >
                    <ButtonCheckGroup
                        label="Group Acess"
                        name="groupAccess"
                        isVertical={true}
                        onChange={this.toggleGroupAccess}
                        options={utils.getOptions(this.props.codes!.ACCESS || [])}
                        value={groupAccess} hideLabel={true}
                    />
                </DropDownForm>
                {" "}
                <button
                    type="button"
                    title="Remove"
                    className="btn btn-outline-danger btn-round"
                    onClick={this.onRemoveItem}
                >
                    <FaTimesCircle fontSize={fontSize} />
                    <span className="sr-only">Remove</span>
                </button>
            </div>

            {this.props.children}
            {showRemoveModal && this.deleteLayoutItemModal()}
            {showAddQuestionModal && this.addQuestionModal()}
            {showEditQuestionModal && this.editQuestionModal()}
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes
        };
    },
    actionCreators
)(EditItem);