import * as React from 'react';

interface AddressDisplayProps {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
}
export default class AddressInline extends React.Component<AddressDisplayProps> {
    public render() {
        const { addressLine1, addressLine2, city, state, zip } = this.props;

        return <div className="row">
            {addressLine1 && <div className="col-md-12">{addressLine1}</div>}
            {addressLine2 && <div className="col-md-12">{addressLine2}</div>}
            {city && state && <div className="col-md-12">{`${city}, ${state} ${zip}`}</div>}
        </div>;
    }
}