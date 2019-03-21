import * as React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type SubmitButtonProps =
    {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        disabled?: boolean;
    }

export default class SubmitButton extends React.Component<SubmitButtonProps, {}> {
    public render() {
        const { onClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const buttonText = this.props.buttonText || 'Submit';
        const className = this.props.className || defaults.string;
        const disableSave = this.props.disabled || defaults.boolean;

        return <button type="submit" className={`${defaults.theme.buttons.class}  ${className}`} onClick={onClick} disabled={disableSave} >
            <FaPaperPlane fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />{" "}{buttonText}
        </button>;
    }
}