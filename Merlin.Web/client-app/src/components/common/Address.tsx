import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import { actionCreators as CodeActions, Codes, CodeType } from '../../store/Code';
import { getOptions } from '../../utils/UIUtils';
import Loading from './Loading';
import * as AjaxUtils from '../../utils/AjaxUtils';
import ErrorSummary from './ErrorSummary';
import ButtonRadio from './ButtonRadio';

export interface AddressType {
    addressLine1: string;
    addressLine2: string;
    county: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    [index: string]: any;
}

type AddressProps = {
    address: AddressType;
    name: string;
    errors: any;
    onChange: (name: string, address: any) => void;
    isReadOnly?: boolean;
    codes: Codes
}
    & typeof CodeActions;

class Address extends React.Component<AddressProps> {
    state = {
        loading: false,
        addressesToChoose: [] as any[]
    };

    constructor(props: AddressProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSelectAddress = this.onSelectAddress.bind(this);
        this.createAddressKey = this.createAddressKey.bind(this);
    }

    public async componentDidMount() {
        const { loadDropdown } = this.props;

        try {
            this.setState({ loading: true });
            await loadDropdown(CodeType.counties);
            await loadDropdown(CodeType.states);
            await loadDropdown(CodeType.countries);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { codes, isReadOnly, address, errors } = this.props;
        const { loading, addressesToChoose } = this.state;
        const showControl = (address.country === 'USA' || !address.country);

        if (loading) {
            return <Loading />;
        }

        return <div className="row">
            {addressesToChoose.length &&
                <ButtonRadio
                    name="address"
                    label=""
                    value={null}
                    options={addressesToChoose.map(a => {
                        return {
                            label: this.createAddressKey(a),
                            value: this.createAddressKey(a)
                        };
                    })}
                    onChange={this.onSelectAddress}
                    isVertical={true}
                    cols={12}
                />
            }


            <TextInput
                name="addressLine1"
                label="Address (Line 1)"
                value={address.addressLine1}
                hideLabel={false}
                cols={6}
                onChange={this.onChange}
                isReadOnly={isReadOnly}
            />
            <TextInput
                name="addressLine2"
                label="Address (Line 2)"
                value={address.addressLine2}
                hideLabel={false}
                cols={6}
                onChange={this.onChange}
                isReadOnly={isReadOnly}
            />
            {showControl &&

                <TextInput
                    name="zip"
                    label="Zip"
                    value={address.zip}
                    hideLabel={false}
                    cols={3}
                    onChange={this.onChange}
                    isReadOnly={isReadOnly}
                />
            }
            <TextInput
                name="city"
                label="City"
                value={address.city}
                hideLabel={false}
                cols={6}
                onChange={this.onChange}
                isReadOnly={isReadOnly}
            />

            {showControl &&
                <Dropdown
                    name="state"
                    label="State"
                    value={address.state}
                    options={getOptions(codes.STATE)}
                    hideLabel={false}
                    cols={3}
                    onChange={this.onChange}
                    isReadOnly={isReadOnly}
                />
            }

            {showControl &&
                <Dropdown
                    name="county"
                    label="County"
                    value={address.county}
                    options={getOptions(codes.COUNTIES)}
                    hideLabel={false}
                    cols={6}
                    onChange={this.onChange}
                    isReadOnly={isReadOnly}
                />
            }

            <Dropdown
                name="country"
                label="Country"
                value={address.country}
                options={getOptions(codes.COUNTRIES)}
                hideLabel={false}
                cols={6}
                onChange={this.onChange}
                isReadOnly={isReadOnly}
            />
        </div>;
    }

    private async onChange(name: string, value: any) {
        const newAddress = Object.assign({}, this.props.address);

        newAddress[name] = value;

        if (name === 'zip' && value.length >= 5) {
            const addresses = await AjaxUtils.get(`api/Address/${value.substring(0, 5)}`);

            if (addresses.length === 1) {
                const address = addresses[0];

                newAddress.city = address.city || '';
                newAddress.county = address.county || '';
                newAddress.state = address.state || '';
                newAddress.zip = address.zip || '';
                newAddress.country = address.country || 'USA';
            }

            if (addresses.length > 1) {
                // show picker
                this.setState({ addressesToChoose: addresses });
            }
        }

        if (name === 'country' && value !== 'USA') {
            newAddress.addressLine1 = '';
            newAddress.addressLine2 = '';
            newAddress.city = '';
            newAddress.county = '';
            newAddress.state = '';
            newAddress.zip = '';
        }

        this.props.onChange(this.props.name, newAddress);
    }

    private onSelectAddress(name: string, value: any) {
        const newAddress = Object.assign({}, this.props.address);

        const addresses = this.state.addressesToChoose
            .filter(a => this.createAddressKey(a) === value);

        const address = addresses[0];

        newAddress.city = address.city || '';
        newAddress.county = address.county || '';
        newAddress.state = address.state || '';
        newAddress.zip = address.zip || '';
        newAddress.country = address.country || 'USA';

        this.setState({ addressesToChoose: [] });

        this.props.onChange(this.props.name, newAddress);
    }

    private createAddressKey(address: any) {
        return `${address.zip}: ${address.county} - ${address.city}, ${address.state}`;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes
        };
    },
    CodeActions
)(Address);
