import * as React from 'react';
import { ChangeEvent } from 'react';
import * as LayoutStore from '../../store/Layout';
import FormField from './FormField';
import asHorizontalFormField from './HorizontalFormField';

type YesNoUnknownProps = {
    name: string
    value: string
    label: string
    hideLabel: boolean
    cols: number
    inputRef: (ref: any) => void
    onChange: (name: string, selectedValue: any) => void
    error?: string
    isReadOnly: boolean
};

class YesNoUnknown extends React.Component<YesNoUnknownProps, {}> {

    public render() {

        const { name, value, isReadOnly } = this.props;
        const onChange = this.onChange.bind(this);

        const isYesChecked = value === 'YES';
        const isNoChecked = value === 'NO';
        const isUnknownChecked = value === 'UNKNOWN';

        const className = `${isReadOnly ? 'disabled btn-outline-dark' : ''}`;

        return <div className="form-group">
            <div className="field">
                <div className="btn-group">
                    <label className={`btn btn-outline-success ${value === 'YES' ? 'active' : ''} ${className}`} tabIndex={0} >
                        <input type="radio" name={name} disabled={isReadOnly} className="hidden" autoComplete={'off'} value="YES" title="Yes" onChange={onChange} checked={isYesChecked}/>
                        YES
                    </label>
                    <label className={`btn btn-outline-danger ${value === 'NO' ? 'active' : ''} ${className}`} tabIndex={0} >
                        <input type="radio" name={name} disabled={isReadOnly} className="hidden" autoComplete={'off'} value="NO" title="No" onChange={onChange} checked={isNoChecked}/>
                        NO
                    </label>
                    <label className={`btn btn-outline-warning ${value === 'UNKNOWN' ? 'active' : ''} ${className}`} tabIndex={0}>
                        <input type="radio" name={name} disabled={isReadOnly} className="hidden" autoComplete={'off'} value="UNKNOWN" title="Unknown" onChange={onChange} checked={isUnknownChecked}/>
                        UNKNOWN
                    </label>
                </div>
            </div>
        </div>;
    }

    private onChange(event: any) {
        this.props.onChange(this.props.name, event.currentTarget.value);
    }
}

export default FormField(YesNoUnknown);

export const HorizontalYesNoUnknown = asHorizontalFormField(YesNoUnknown);
