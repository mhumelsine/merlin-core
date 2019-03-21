import * as React from 'react';
import Select from 'react-select';
import { ChangeEvent } from 'react';
import FormField from './FormField';
import asHorizontalFormField from './HorizontalFormField';

type DropdownProps = {
    name: string;
    label: string;
    hideLabel?: boolean;
    placeholder: string;
    value: any;
    options: any[];
    cols?: number;
    isMulti?: boolean;
    onChange: (name: string, selectedValue: any) => void;
    isReadOnly?: boolean;
    inputRef?: (ref: any) => void;
    className?: string;
};

class Dropdown extends React.Component<DropdownProps> {

    public render() {

        const { name, placeholder, value, isMulti, isReadOnly, options, inputRef, className } = this.props;

        const onChange = (isMulti ? this.onMultiChange : this.onChange)
            .bind(this);

        return <span>
            <Select
                id={name}
                className={`${className || ''} dropdown`}
                ref={inputRef}
                options={options}
                placeholder={placeholder}
                name={name}
                value={this.getSelectedOptions()}
                onChange={onChange}
                isMulti={isMulti}
                isDisabled={isReadOnly}
            />
        </span>;
    }
    // we are expecting the format of { label: '', value: ''}
    private onChange(newValue: any) {
        const value = newValue.value || '';

        console.log(value);

        this.props.onChange(this.props.name, value);
    }

    // we are expecting the format of [ { label: '', value: ''}, { label: '', value: ''},  ... ]
    private onMultiChange(newValue: any) {
        const values = newValue.map((option: any) => option.value);

        console.log(values);

        this.props.onChange(this.props.name, values);
    }

    private getSelectedOptions() {
        const { options, isMulti } = this.props;

        if (isMulti) {
            const values = this.props.value || [];
            return options.filter(option => values.some((value: any) => value == option.value));
        } else {
            const filteredOptions = options.filter(option => this.props.value == option.value);

            if (filteredOptions.length) {
                return filteredOptions[0];
            } else {
                return '';
            }
        }
    }
}

export default FormField(Dropdown);

export const HorizontalDropdown = asHorizontalFormField(Dropdown);
