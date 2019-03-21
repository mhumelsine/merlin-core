import * as React from 'react';
import Select from 'react-select';
import { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FormField from './FormField';
import asHorizontalFormField from './HorizontalFormField';

type CustomDatePickerProps = {
    name: string;
    label: string;
    hideLabel: boolean;
    placeholder: string;
    value: string;
    cols?: number;
    onChange: (name: string, value: any) => void;
    isReadOnly: boolean;
    error?: any;
    ignoreError?: boolean;
    defaultToToday?: boolean;
}

class CustomDatePicker extends React.Component<CustomDatePickerProps, {}> {
    private onChange(date: any) {
        this.props.onChange(this.props.name, date ? moment(date).format("MM/DD/YYYY") : null);
    }

    private onChangeRaw(event: any) {
        this.props.onChange(this.props.name, event.target.value);
    }

    private onBlur(event: any) {
        if (!isNaN(Date.parse(event.target.value))) {
            this.props.onChange(this.props.name, (moment(event.target.value).format("MM/DD/YYYY")))
        }
        else this.props.onChange(this.props.name, "");
    }

    public render() {
        const { name, label, placeholder, onChange, cols, isReadOnly, error, ignoreError, defaultToToday } = this.props;
        let { value } = this.props;
        // const possiblyIgnoredError = ignoreError ? undefined : error;
        //ignoring for now
        const possiblyIgnoredError = undefined;

        if (!value && defaultToToday) {
            value = moment().format('MM/DD/YYYY');
        }

        return <DatePicker
            placeholderText={placeholder}
            name={name}
            dateFormat={["L"]}
            className="form-control datePicker"
            selected={value && (possiblyIgnoredError == undefined) ? moment(value, 'MM/DD/YYYY').toDate() : null}
            onChange={this.onChange.bind(this)}
            onChangeRaw={this.onChangeRaw.bind(this)}
            onBlur={this.onBlur.bind(this)}
            isClearable={true}
            value={value}
            readOnly={isReadOnly}
            popperClassName={possiblyIgnoredError ? "hide" : ""}
        />;
    }
}

export default FormField(CustomDatePicker);

export const HorizontalCustomDatePicker = asHorizontalFormField(CustomDatePicker);