import * as React from 'react';
import { ChangeEvent } from 'react';
import asHorizontalFormField from './HorizontalFormField';
import FormField from './FormField';

type ButtonCheckGroupProps = {
    name: string
    value: string[]
    label: string
    hideLabel: boolean
    cols: number
    inputRef: (ref: any) => void
    onChange: (name: string, selectedValue: any) => void
    error?: string
    options: any[],
    isReadOnly?: boolean;
    isVertical?: boolean;
};

class ButtonCheckGroup extends React.Component<ButtonCheckGroupProps> {

    public render() {
        const { name, label, cols, options, isReadOnly, isVertical } = this.props;
        const values = this.props.value || [];

        const className = `${isReadOnly ? 'disabled btn-outline-dark' : ''}`;

        const buttons = options.map((option: any, index: any) => {
            const isActive = values.indexOf(option.value) > -1;

            return (<label key={index} className={`btn btn-outline-primary ${isActive ? 'active' : ''} ${className} ${isVertical ? 'text-left' : ''}`} tabIndex={0}>
                <input type="checkbox" className="hidden" autoComplete={'off'} value={option.value} onChange={this.onChange.bind(this)} checked={isActive} />
                {option.label}
            </label>);
        }
        );

        return <div className="form-group">
            <div className="field">
                <div className={`${isVertical ? 'btn-group-vertical' : 'btn-group'}`}>
                    {buttons}
                </div>
            </div>
        </div>;
    }

    private onChange(event: any) {
        let values = this.props.value || [];
        const newValue = event.currentTarget.value;

        // if array has new value, remove it
        if (values.indexOf(newValue) > -1) {
            values = values.filter(value => value !== newValue);
        } else { // add the value
            values = [...values, newValue];
        }

        this.props.onChange(this.props.name, values);
    }
}

export default FormField(ButtonCheckGroup);

export const HorizontalButtonCheck = asHorizontalFormField(ButtonCheckGroup);
