import * as React from 'react';
import asFormField from './FormField';
import asHorizontalFormField from './HorizontalFormField';

interface StaticInputProps {
    value: any;
}

class StaticInput extends React.Component<StaticInputProps> {
    public render() {

        const { value } = this.props;

        return <input type="text" readOnly={true} className="form-control-plaintext font-weight-bold" value={value} />;
    }
}

export default asFormField(StaticInput);

export const HorizontalStaticInput = asHorizontalFormField(StaticInput);
