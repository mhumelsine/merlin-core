import * as React from 'react';
import { defaults } from '../../utils/Global';
import { FaTrash, FaExclamationCircle } from 'react-icons/fa';


type DeleteButtonProps = {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        name?: string;
        disabled?: boolean;
        confirmationText?: string;
    };

export default class DeleteButton extends React.Component<DeleteButtonProps> {
    state = {
        expanded: false
    };

    constructor(props: DeleteButtonProps) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        const { expanded } = this.state;
        const { name, disabled } = this.props;
        const buttonText = this.props.buttonText || 'Delete';
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const className = this.props.className || 'btn btn-danger';
        const text = this.props.confirmationText || 'Confirm Delete?';

        return <div className={`btn-group dropleft ${expanded ? 'show' : ''}`}>
            <button
                type="button"
                title="Delete"
                className={`dropdown-toggle ${className}`}
                aria-haspopup="true"
                aria-expanded={expanded}
                onClick={this.toggle}
                disabled={disabled}
            >
                <FaTrash fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />
                {' '}
                {className.indexOf('btn-round') === -1 && buttonText}
                <span className="sr-only">Remove</span>
            </button>
            <div className={`dropdown-menu ${expanded ? 'show' : ''}`}>
                <button type="button" name={name} title="Confirm delete" onClick={this.onDelete} className="dropdown-item">
                    <FaExclamationCircle fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />
                    {' '}
                    {text}
                </button>
                <span className="sr-only">Confirm</span>
            </div>
        </div>;
    }

    private toggle() {
        this.setState({ expanded: !this.state.expanded });
    }

    private onDelete(event: any) {
        this.toggle();
        this.props.onClick(event);
    }
}
