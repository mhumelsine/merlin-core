import * as React from 'react';
import Select from 'react-select';
import { ChangeEvent } from 'react';
import FormField from './FormField';

type SingleSelectListGroupProps = {
    name: string;
    label: string;
    hideLabel: boolean;
    value: any;
    options: any[];
    cols: number;
    onChange: (name: string, selectedValue: any) => void;
    isReadOnly: boolean;
}

class SingleSelectListGroup extends React.Component<SingleSelectListGroupProps, {}> {
    private onChange(event: any) {
        event.preventDefault();
        this.props.onChange(this.props.name, event.target.value);
    }

    public render() {

        const { name, label, value, onChange, cols, isReadOnly, options } = this.props;

        return <div className="list-group">
            {
                options.map((option) => {
                    return <button
                        key={option.value}
                        className={`btn-primary list-group-item ${value === option.value ? 'active' : ''}`}
                        value={option.value}
                        disabled={isReadOnly}
                        onClick={this.onChange.bind(this)}>
                        {option.label}
                    </button>
                })
            }
        </div>;
    }
}

export default FormField(SingleSelectListGroup);