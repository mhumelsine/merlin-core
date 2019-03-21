import * as React from 'react';
import { Creatable } from 'react-select';
import asFormField from './FormField';

interface TagInputProps {
    name: string;
    label: string;
    hideLabel?: boolean;
    placeholder: string;
    value: any;
    options?: any[];
    cols?: number;
    multi: boolean;
    onChange: (name: string, selectedValue: any) => void;
    isReadOnly?: boolean;
    inputRef?: (ref: any) => void;
}

class TagInput extends React.Component<TagInputProps> {


    public render() {
        const { name, label, placeholder, value, onChange, cols, multi, isReadOnly, options, inputRef } = this.props;

        return <Creatable
            id={name}
            ref={inputRef}
            options={options}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={this.onChange.bind(this)}
            isMulti={multi}
            isDisabled={isReadOnly}
        />;
    }

    private onChange(newValue: any) {
        let value: any = '';

        if (newValue) {
            const values = newValue.split(',');
            value = this.props.multi ? values : values[0];
        }

        this.props.onChange(this.props.name, value);
    }
}

export default asFormField(TagInput);
