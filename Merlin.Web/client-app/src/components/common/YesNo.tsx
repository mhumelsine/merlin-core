import * as React from 'react';
import { ChangeEvent } from 'react';
import * as LayoutStore from '../../store/Layout';
import FormField from './FormField';
import asHorizontalFormField from './HorizontalFormField';

type YesNoProps = {
    name: string
    value: string
    label: string
    hideLabel: boolean
    cols: number
    inputRef: (ref: any) => void
    onChange: (name: string, selectedValue: any) => void
    error?: string
    isBoolean?: boolean;
    isReadOnly: boolean
};

class YesNo extends React.Component<YesNoProps, {}> {

    public render() {

        const { name, value, isReadOnly, isBoolean } = this.props;
        const onChange = this.onChange.bind(this);
        const yesValue = isBoolean ? true : 'YES' as any;
        const noValue = isBoolean ? false : 'NO' as any;
        const isYesChecked = value === yesValue;
        const isNoChecked = value === noValue;

        const className = `${isReadOnly ? 'disabled btn-outline-dark' : ''}`;

        return <div className="form-group">
            <div className="field">
                <div className="btn-group">
                    <label className={`btn btn-outline-success ${isYesChecked ? 'active' : ''} ${className}`} tabIndex={0}  >
                        <input type="radio" disabled={isReadOnly} className="hidden" autoComplete={'off'} value={yesValue} title="Yes" onChange={onChange} checked={isYesChecked} />
                        YES
                    </label>
                    <label className={`btn btn-outline-danger ${!isYesChecked ? 'active' : ''} ${className}`} tabIndex={0} >
                        <input type="radio" disabled={isReadOnly} className="hidden" autoComplete={'off'} value={noValue} title="No" onChange={onChange} checked={isNoChecked}/>
                        NO
                    </label>
                </div>
            </div>
        </div>;
    }

    private onChange(event: any) {

        let value = event.currentTarget.value;

        if (this.props.isBoolean) {
            value = value === 'true';
        }

        this.props.onChange(this.props.name, value);
    }
}

export default FormField(YesNo);

export const HorizontalYesNo = asHorizontalFormField(YesNo);
