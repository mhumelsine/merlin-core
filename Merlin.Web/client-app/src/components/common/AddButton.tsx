import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type AddButtonProps =
    {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        disabled?: boolean;
    }

export default class AddButton extends React.Component<AddButtonProps, {}> {
    public render() {
        const { onClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const className = this.props.className || defaults.string;
        const buttonText = this.props.buttonText || ' Add';
        const disableAdd = this.props.disabled || defaults.boolean;

        return <button type="button" className={`${defaults.theme.buttons.class} ${className}`} onClick={onClick} disabled={disableAdd}>
            <FaPlus fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />{" "}{buttonText}
        </button>;
    }
}