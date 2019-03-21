import * as React from 'react';
import { ChangeEvent } from 'react';
import asHorizontalFormField from './HorizontalFormField';
import FormField from './FormField';
import withAddOn from './WithAddOn';

type NumberInputProps = {
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
    allowNegative?: boolean;
    min?: number;
    max?: number;
}

class NumberInput extends React.Component<NumberInputProps>{
    private onChange(event: ChangeEvent<HTMLInputElement>) {

        let value = parseInt(event.currentTarget.value);
        const { min, max, allowNegative } = this.props;

        if (!allowNegative && value < 0) {
            value = 0;
        }

        if (min && (value < min)) {
            return;
        }

        if (max && (value > max)) {
            return;
        }

        this.props.onChange(this.props.name, value);
    }
    private moveCaretAtEnd(e: any) {
        var temp_value = e.target.value;
        e.target.value = '';
        e.target.value = temp_value;
    }
    public render() {

        const { name, label, placeholder, cols, autoComplete, value, inputRef, isReadOnly, min, max } = this.props;

        return <input type="number"
            value={value || ''}
            className={`form-control ${isReadOnly ? "disabled" : ""}`}
            id={name}
            name={name}
            aria-describedby={label}
            placeholder={placeholder}
            onChange={this.onChange.bind(this)}
            onFocus={this.moveCaretAtEnd}
            ref={inputRef}
            readOnly={isReadOnly}
            autoComplete={autoComplete || "on"}
            min={min}
            max={max}
        />;
    }
}

export default FormField(NumberInput);

export const HorizontalNumberInput = asHorizontalFormField(NumberInput);

export const NumberWithAddOn = FormField(withAddOn(NumberInput));