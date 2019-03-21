import * as React from 'react';
import { ChangeEvent } from 'react';
import asHorizontalFormField from './HorizontalFormField';
import FormField from './FormField';

type ButtonRadioProps = {
    name: string
    value: string
    label: string
    hideLabel: boolean
    cols: number
    inputRef: (ref: any) => void
    onChange: (name: string, selectedValue: any) => void
    error?: string
    options: any[],
    isReadOnly?: boolean;
    isVertical?: boolean;
    block?: boolean;
}

class ButtonRadio extends React.Component<ButtonRadioProps, {}>{
    
    private onChange(event: any) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }

    public render() {        
        const { name, label, cols, options, value, isReadOnly, isVertical, block } = this.props;

        const className = `${isReadOnly ? "disabled btn-outline-dark" : ""} ${block ? "text-left" : ""}`;

        const buttons = options.map((option: any, index: any) => {
            const isActive = option.value === value;
            
            return (<label key={index} className={`btn btn-outline-primary ${isActive ? 'active' : ''} ${className}`} tabIndex={0}>
                <input type="radio" name={name} className="hidden" autoComplete={"off"} value={option.value} onChange={this.onChange.bind(this)} checked={isActive}/>
                {option.label}
            </label>);
        }
        );

        return <div className="form-group">
            <div className="field">
                <div className={`${isVertical ? "btn-group-vertical" : "btn-group"} ${block ? "d-block" : ""}`}>
                    {buttons}
                </div>
            </div>
        </div>;
    }
}

export default FormField(ButtonRadio);

export const HorizontalButtonRadio = asHorizontalFormField(ButtonRadio);