import * as React from 'react';
import { defaults } from '../../utils/Global';
import { FaEdit } from 'react-icons/fa';

type EditButtonProps = {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string
    };

export default class EditButton extends React.Component<EditButtonProps, {}> {
    public render() {
        const { onClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const buttonText = this.props.buttonText || ' Edit';
        const className = this.props.className || defaults.string;

        return <button className={`btn btn-info ${className}`} type="button" onClick={onClick}><FaEdit fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }}/>{buttonText}</button>;
    }
}
