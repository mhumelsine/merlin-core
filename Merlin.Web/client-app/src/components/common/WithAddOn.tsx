import * as React from 'react';
import FormField from './FormField';
import { TextInputProps } from './TextInput';

export default function withAddOn(WrappedComponent: any) {
    return class extends React.Component<any> {
        public render() {
            return <div className="input-group">
                <WrappedComponent {...this.props} />
                <div className="input-group-append">
                    {this.props.children}
                </div>
            </div>;
        }
    }
}