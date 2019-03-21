import * as React from 'react';
import { ChangeEvent } from 'react';
import * as LayoutStore from '../../store/Layout';
import Card from '../common/Card';
import Alert from '../common/Alert';
import * as utils from '../../utils/UIUtils';
import { LayoutItemProps } from './LayoutItem';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import WysiwygEditor from '../common/WysiwygEditor';
import { MdCallEnd } from 'react-icons/md';

type MessageProps = {
    parentId?: string;
    onEdit?: (parentId: string, itemId: string) => void;
}
    & typeof LayoutStore.actionCreators
    & LayoutItemProps;

class Message extends React.Component<MessageProps> {
    state = {
        currentEncodedHtml: '',
        item: {} as LayoutStore.LayoutItem
    };

    constructor(props: MessageProps) {
        super(props);

        this.state.currentEncodedHtml = props.item.text;
        this.state.item = props.item;

        this.save = this.save.bind(this);
        this.onHtmlChange = this.onHtmlChange.bind(this);
        this.onMessageTypeChange = this.onMessageTypeChange.bind(this);
    }

    public componentWillReceiveProps(newProps: MessageProps) {
        this.setState({ item: newProps.item });
    }

    public render() {
        const { isSelected } = this.props;
        const { item } = this.state;

        const alertStyle = { marginBottom: '0' };
        const sampleText = 'Text';

        if (isSelected) {
            return <div>
                <WysiwygEditor
                    encodedHtml={item.text}
                    onEditComplete={this.save}
                />
                <hr />
                <div className="btn-group d-flex justify-content-center" role="group">
                    <button type="button" onClick={this.onMessageTypeChange} name="none" className={this.getButtonClass('none')}>
                        <div style={alertStyle} className="alert alert-none">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="light" className={this.getButtonClass('light')}>
                        <div style={alertStyle} className="alert alert-light">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="secondary" className={this.getButtonClass('secondary')}>
                        <div style={alertStyle} className="alert alert-secondary">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="dark" className={this.getButtonClass('dark')}>
                        <div style={alertStyle} className="alert alert-dark">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="info" className={this.getButtonClass('info')}>
                        <div style={alertStyle} className="alert alert-info">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="primary" className={this.getButtonClass('primary')}>
                        <div style={alertStyle} className="alert alert-primary">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="success" className={this.getButtonClass('success')}>
                        <div style={alertStyle} className="alert alert-success">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="warning" className={this.getButtonClass('warning')}>
                        <div style={alertStyle} className="alert alert-warning">{sampleText}</div>
                    </button>
                    <button type="button" onClick={this.onMessageTypeChange} name="danger" className={this.getButtonClass('danger')}>
                        <div style={alertStyle} className="alert alert-danger">{sampleText}</div>
                    </button>
                </div>
            </div>;
        }

        return <div className={`alert alert-${item.messageType}`}
            dangerouslySetInnerHTML={{ __html: decodeURIComponent(item.text) }} />;
    }

    private onHtmlChange(encodedHtml: string) {
        this.setState({ currentEncodedHtml: encodedHtml });
    }

    private onMessageTypeChange(event: any) {
        const item = Object.assign({}, this.state.item);

        item.messageType = event.currentTarget.name;

        this.setState({ item });
    }

    private async save(encodedHtml: string) {
        const { saveLayoutItem, parentId, onEdit } = this.props;
        const { item } = this.state;
        const newItem = Object.assign({}, item);
        newItem.text = encodedHtml;

        if (onEdit && parentId) {
            await this.props.saveLayoutItem(parentId, newItem);
            onEdit(parentId, item.id);
        }
    }

    private getButtonClass(contextClass: string): string {
        return `btn btn-light ${this.state.item.messageType === contextClass ? 'active' : ''}`;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {};
    }, LayoutStore.actionCreators
)(Message);
