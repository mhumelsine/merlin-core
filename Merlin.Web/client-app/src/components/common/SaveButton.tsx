import * as React from 'react';
import { FaRegSave } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type SaveButtonProps =
    {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        disabled?: boolean;
    }

export default class SaveButton extends React.Component<SaveButtonProps, {}> {
    public render() {
        const { onClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const buttonText = this.props.buttonText || 'Save';
        const className = this.props.className || defaults.string;
        const disableSave = this.props.disabled || defaults.boolean;

        return <button type="submit" className={`${defaults.theme.buttons.class}  ${className}`} onClick={onClick} disabled={disableSave} >
            <FaRegSave fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />{" "}{buttonText}
        </button>;
    }
}