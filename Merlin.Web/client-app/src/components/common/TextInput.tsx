import * as React from 'react';
import { ChangeEvent } from 'react';
import asHorizontalFormField from './HorizontalFormField';
import FormField from './FormField';
import { isNullOrEmpty } from '../../utils/UIUtils';
import withAddOn from './WithAddOn';

export type TextInputProps = {
    name: string;
    value: string;
    label: string;
    hideLabel: boolean;
    placeholder: string;
    cols?: number;
    isReadOnly: boolean;
    inputRef?: (ref: any) => void;
    onChange: (name: string, selectedValue: any) => void;
    error?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    onKeyPress?: (event: any) => void;
    onBlur?: (event: any) => void;
    inputClassName?: string;
    maxLength?: number;
}

class TextInput extends React.Component<TextInputProps>{

    private onChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }

    private onKeyPress(event: any) {
        const { onKeyPress } = this.props;

        if (onKeyPress) {
            onKeyPress(event);
        }
    }

    private onBlur() {
        const { onBlur } = this.props;

        if (onBlur) {
            onBlur(event);
        }
    }

    private moveCaretAtEnd(e: any) {
        e.preventDefault();
        var temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;
    }
    public render() {

        const { name, label, placeholder, cols, autoComplete, value, inputRef, isReadOnly, autoFocus, inputClassName, maxLength } = this.props;

        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onBlur = this.onBlur.bind(this);

        return <input type="text"
            value={value ? value : ""}
            className={`form-control ${isReadOnly ? "disabled" : ""} ${!isNullOrEmpty(inputClassName) ? inputClassName : ''}`}
            id={name}
            name={name}
            aria-describedby={label}
            placeholder={placeholder}
            onChange={this.onChange}
            onFocus={this.moveCaretAtEnd}
            ref={inputRef}
            readOnly={isReadOnly}
            autoComplete={autoComplete || "on"}
            autoFocus={autoFocus || false}
            onKeyPress={this.onKeyPress}
            onBlur={this.onBlur}
            maxLength={maxLength}
        />;
    }
}

export default FormField(TextInput);

export const HorizontalTextInput = asHorizontalFormField(TextInput);
export const TextInputWithAddOn = FormField(withAddOn(TextInput));