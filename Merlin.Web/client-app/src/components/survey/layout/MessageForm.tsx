import * as React from 'react';
import TextInput from '../../common/TextInput';
import * as LayoutStore from '../../../store/Layout';
import { defaults } from '../../../utils/Global';
import { ApplicationState } from '../../../store';
import * as utils from '../../../utils/UIUtils';
import Message from '.././Message';
import SingleSelectListGroup from '../../common/SingleSelectListGroup';
import SaveButton from '../../common/SaveButton';

interface MessageFormProps {
    saveLayoutItem: (parentId: string, item: LayoutStore.LayoutItem) => void;
    layoutItem: LayoutStore.LayoutItem;
    parentId: string;
}

export default class MessageForm extends React.Component<MessageFormProps> {
    state = {
        message: this.props.layoutItem,
        messageTypes: [
            { 'value': LayoutStore.messageType.light, 'label': 'Default' },
            { 'value': LayoutStore.messageType.info, 'label': 'Info' },
            { 'value': LayoutStore.messageType.warning, 'label': 'Warning' },
            { 'value': LayoutStore.messageType.danger, 'label': 'Danger' },
            { 'value': LayoutStore.messageType.success, 'label': 'Success' }],
        error: defaults.string
    };
    constructor(props: any) {
        super(props);

        this.onSave = this.onSave.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    public componentWillReceiveProps(nextProps: MessageFormProps) {
        this.setState({ message: nextProps.layoutItem });
    }

    public render() {
        const { error, message } = this.state;
        const { text, width, messageType } = this.state.message;
        const { messageTextInput } = defaults.inputs.textInputs;
        const { messageWidthInput } = defaults.inputs.rangeSliders;
        const { messageTypeInput } = defaults.inputs.singleSelectListGroups;

        return <div>
            <form>
                <TextInput
                    cols={12}
                    label={messageTextInput.label}
                    hideLabel={false}
                    name={messageTextInput.name}
                    value={text}
                    placeholder={messageTextInput.placeholder}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={error}
                />
                <SingleSelectListGroup
                    cols={12}
                    label={messageTypeInput.label}
                    hideLabel={false}
                    name={messageTypeInput.name}
                    value={messageType}
                    options={this.state.messageTypes}
                    placeholder={messageTypeInput.placeholder}
                    onChange={this.onChange}
                    isMulti={false}
                    error={defaults.string}
                />
                <div className="form-group col-sm-12">
                    <SaveButton onClick={this.onSave} />
                </div>
            </form>

            <h4 className="text-center">Preview</h4>
            <Message parentId="empty" item={message} onEdit={this.onEdit} />
        </div>;
    }

    private onEdit(parentId: string, itemId: string) {
        // nothing
    }

    private onChange(name: string, value: string) {
        let message = Object.assign({}, this.state.message) as any;

        message[name] = value;

        this.setState({ message });
    }

    private onSave(e: any) {
        e.preventDefault();

        const { message } = this.state;

        if (utils.isNullOrEmpty(message.text)) {
            this.setState({
                error: 'Message Text is required'
            });
            return;
        }

        this.props.saveLayoutItem(this.props.parentId, message);
    }
}
