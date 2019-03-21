import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

type SearchButtonProps =
    {
        onClick?: any;
        iconFontSize?: number;
        buttonText?: string;
        className?: string;
        disabled?: boolean;
        isSubmit?: boolean;
        title?: string;
    }

export default class SearchButton extends React.Component<SearchButtonProps, {}> {
    public render() {
        const { onClick, isSubmit } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const className = this.props.className || defaults.string;
        const buttonText = this.props.buttonText || ' Search';
        const disableAdd = this.props.disabled || defaults.boolean;
        const title = this.props.title || defaults.string;

        return <button type={isSubmit ? "submit" : "button"} className={`${defaults.theme.buttons.class} ${className}`} title={title} onClick={onClick} disabled={disableAdd}>
            <FaSearch fontSize={iconFontSize} style={{ verticalAlign: 'bottom' }} />{" "}{buttonText}
        </button>;
    }
}