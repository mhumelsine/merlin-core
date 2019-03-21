import * as React from 'react';
import Alert from '../common/Alert';

interface FormFieldProps {
    name: string;
    label: any;
    hideLabel?: boolean;
    cols?: number;
    offset?: number;
    value: any;
    min?: number;
    max?: number;
    placeholder?: string;
    isReadOnly?: boolean;
    inputRef?: (ref: any) => void;
    options?: any[];
    onChange?: (name: string, newValue: any) => void;
    onKeyPress?: (event: any) => void;
    onBlur?: (event: any) => void;
    isMulti?: boolean;
    error?: string;
    success?: any;
    feedback?: any;
    option?: string;
    checked?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    maxLength?: number;
    className?: string;
    isRequired?: boolean;
    isBoolean?: boolean;
    defaultToToday?: boolean;
    isVertical?: boolean;
    rows?: number;
}

export default function asFormField<P>(WrappedComponent: any) {
    return class extends React.Component<FormFieldProps> {

        private getLabel() {

            let className = '';

            if (this.props.hideLabel) {
                className = 'sr-only';
            }

            if (this.props.isRequired) {
                className += ' required';
            }

            return <label
                htmlFor={this.props.name}
                className={className}>
                {this.props.label}
            </label>;
        }

        public render() {

            const { name, label, cols, offset, error, success, feedback } = this.props;
            const hasFeedback = error || success || feedback;

            let className = '';

            if (cols) {
                className = `col-md-${cols}`;
            }

            if (offset) {
                className = `${className} offset-md-${offset}`;
            }

            if (hasFeedback) {
                className = `${className} has-feedback`;
            }

            return <div className={`form-group ${className}`}>
                {this.getLabel()}
                <WrappedComponent {...this.props} />
                {error &&
                    <Alert alertType="danger">
                        {error}
                    </Alert>
                }
                {success &&
                    <Alert alertType="success">
                        {success}
                    </Alert>
                }
                {feedback &&
                    <span className="feedback">
                        {feedback}
                    </span>
                }
            </div>;
        }
    }
}