import * as React from 'react';
import { ChangeEvent } from 'react';
import asHorizontalFormField from './HorizontalFormField';
import FormField from './FormField';

type TextAreaInputProps = {
    name: string;
    value: string;
    label: string;
    hideLabel: boolean;
    placeholder: string;
    cols?: number;
    isReadOnly: boolean;
    inputRef: (ref: any) => void;
    onChange: (name: string, selectedValue: any) => void;
    error?: string;
    autoComplete?: string;
    maxLength?: number;
    rows?: number;
}

class TextAreaInput extends React.Component<TextAreaInputProps>{

    constructor(props: TextAreaInputProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    private onChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }
    private moveCaretAtEnd(e: any) {
        var temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;
    }
    public render() {

        const { name, label, placeholder, cols, autoComplete, value, inputRef, isReadOnly, maxLength, rows } = this.props;

        return <textarea
            value={value || ""}
            className={`form-control ${isReadOnly ? "disabled" : ""}`}
            id={name}
            name={name}
            aria-describedby={label}
            placeholder={placeholder}
            onChange={this.onChange}
            onFocus={this.moveCaretAtEnd}
            ref={inputRef}
            readOnly={isReadOnly}
            autoComplete={autoComplete || "on"}
            maxLength={maxLength}
            rows={rows}
        />;
    }
}

export default FormField(TextAreaInput);

export const HorizontalTextAreaInput = asHorizontalFormField(TextAreaInput);