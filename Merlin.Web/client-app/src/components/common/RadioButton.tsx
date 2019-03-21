import * as React from 'react';
import FormField from './FormField';
import { ChangeEvent } from 'react';

type RadioButtonProps = {
    checked: boolean;
    onChange: (name: string, selectedValue: any) => any;
    option: string;
    name: string;
}

class RadioButton extends React.Component<RadioButtonProps, {}> {
    private onChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }
    public render() {
        const { name, checked, option } = this.props;

        return <div className="radio">
            <label>
                <input
                    id={name}
                    name={name}
                    type="radio"
                    value={name}
                    checked={checked}
                    onChange={this.onChange.bind(this)}
                />
                {option}
            </label>
        </div>;
    }
}

export default FormField(RadioButton);