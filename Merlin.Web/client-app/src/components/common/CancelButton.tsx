import * as React from 'react';
import { FaTimes } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type CancelButtonProps =
    {
        onClick?: any;
        icon?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        id?: string;
    }

export default class CancelButton extends React.Component<CancelButtonProps, {}> {
    public render() {
        const { onClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const icon = this.props.icon || defaults.cancelIcon;
        const className = this.props.className || defaults.string;
        const buttonText = this.props.buttonText || ' Close';
        const id =this.props.id || defaults.string

        return <button type="button" id={id} className={`${defaults.theme.buttons.class} ${className}`} onClick={onClick}><FaTimes fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />{buttonText}</button>
    }
}