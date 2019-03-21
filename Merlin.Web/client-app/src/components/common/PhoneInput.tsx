import * as React from 'react';
import { ChangeEvent } from 'react';
import asHorizontalFormField from './HorizontalFormField';
import FormField from './FormField';

type PhoneInputProps = {
    name: string;
    value: string;
    label: string;
    hideLabel: boolean;
    placeholder: string;
    cols: number;
    isReadOnly: boolean;
    inputRef: (ref: any) => void;
    onChange: (name: string, selectedValue: any) => void;
    error?: string;
    autoComplete?: string;
}

class PhoneInput extends React.Component<PhoneInputProps, {}>{
    private onChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }
    private moveCaretAtEnd(e: any) {
        var temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;
    }
    public render() {

        const { name, label, placeholder, cols, autoComplete, value, inputRef, isReadOnly } = this.props;

        return <input type="text"
            value={value || ''}
            className="form-control"
            id={name}
            name={name}
            aria-describedby={label}
            placeholder={placeholder}
            onChange={this.onChange.bind(this)}
            onFocus={this.moveCaretAtEnd}
            ref={inputRef}
            readOnly={isReadOnly}
            autoComplete={autoComplete || "on"}
        />;
    }
}

export default FormField(PhoneInput);

export const HorizontalPhoneInput = asHorizontalFormField(PhoneInput);