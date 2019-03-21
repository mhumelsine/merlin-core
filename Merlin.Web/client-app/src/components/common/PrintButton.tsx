import * as React from 'react';
import { FaPrint } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type PrintButtonProps =
    {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        disabled?: boolean;
        id?: string;
    }

export default class PrintButton extends React.Component<PrintButtonProps, {}> {
    public render() {
        const onClick = this.props.onClick || window.print;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const buttonText = this.props.buttonText || 'Print';
        const className = this.props.className || defaults.string;
        const disableSave = this.props.disabled || defaults.boolean;
        const id = this.props.id || defaults.string;

        return <button type="submit" id={id} className={`${defaults.theme.buttons.class}  ${className}`} onClick={onClick} disabled={disableSave} >
            <FaPrint fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />{" "}{buttonText}
        </button>;
    }
}