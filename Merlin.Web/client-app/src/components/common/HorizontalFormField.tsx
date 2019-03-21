import * as React from 'react';
import Alert from '../common/Alert';

interface HorizontalFormFieldProps {
    name: string;
    label: any;
    hideLabel?: boolean;
    labelCols: number;
    inputCols: number;
    offsetCols?: number;
    value: any;
    min?: number;
    max?: number;
    placeholder?: string;
    isReadOnly?: boolean;
    inputRef?: (ref: any) => void;
    options?: any[];
    onChange?: (name: string, newValue: any) => void;
    onKeyPress?: (event: any) => void;
    onBlur?: () => void;
    multi?: boolean;
    error?: string;
    option?: string;
    checked?: boolean;
    autoComplete?: string;
    maxLength?: number;
    isVertical?: boolean;
}

export default function asHorizontalFormField(WrappedComponent: any) {
    return class extends React.Component<HorizontalFormFieldProps> {

        private getLabel() {
            const { labelCols, hideLabel } = this.props;
            const offsetCols = this.props.offsetCols || 0;

            let className = `col-form-label col-md-${labelCols} offset-md-${offsetCols} ${hideLabel ? "sr-only" : ""}`;

            return <label
                htmlFor={this.props.name}
                className={className}>
                {this.props.label}
            </label>;
        }

        public render() {
            const { name, error, inputCols, hideLabel } = this.props;

            

            return <div className="form-group row">
                {this.getLabel()}
                <div className={`col-md-${hideLabel ? 12 : inputCols}`}>
                    <WrappedComponent {...this.props} />
                    {error &&
                        <Alert alertType="danger">
                            {error}
                        </Alert>
                    }
                </div>
            </div>;
        }
    }
}