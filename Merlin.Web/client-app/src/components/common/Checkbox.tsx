import * as React from 'react';
import { defaults } from '../../utils/Global';
import FormField from './FormField';

type CheckboxProps = {    
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
    isChecked: boolean;
}

export default class Checkbox extends React.Component<CheckboxProps> {

    constructor(props: CheckboxProps) {
        super(props);
        this.onClick = this.onClick.bind(this);        
    }

    private onClick(e: any) {        
        const { name, value, onChange, isChecked } = this.props;
        onChange(name, isChecked ? value : "");
    };
        
    public render() {
        const { label, cols, isChecked, hideLabel  } = this.props;
        const value = this.props.value || label;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={value}
                        checked={isChecked}
                        onChange={this.onClick}
                    />
                    {label}
                </label>
            </div>
        );
    }
}

//export default FormField(Checkbox);
