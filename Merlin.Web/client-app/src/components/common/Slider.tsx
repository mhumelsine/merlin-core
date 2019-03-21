import * as React from 'react';
import { ChangeEvent } from 'react';

import FormField from './FormField';

type RangeSliderProps = {
    name: string;
    value: number;
    label: string;
    min: number;
    max: number;
    hideLabel: boolean;
    cols: number;
    isReadOnly: boolean;
    inputRef: (ref: any) => void;
    onChange: (name: string, selectedValue: any) => void;
    error?: string;
};

class RangeSlider extends React.Component<RangeSliderProps, {}> {
    public render() {
        const { name, label, cols, min, max, value, inputRef, isReadOnly } = this.props;

        return <input type="range"
                id={name}
                min={min}
                max={max}
                value={value}
                step={1}
                className="form-control"
                aria-describedby={label}
                onChange={this.onChange.bind(this)}
                ref={inputRef}
                readOnly={isReadOnly}
            />;
    }
    private onChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }
}
export default FormField(RangeSlider);
