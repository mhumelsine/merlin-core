import * as React from 'react';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as CodeActions, Codes } from '../../store/Code';
import * as utils from '../../utils/UIUtils';
import { actionCreators as OutbreakActions, Transmission as OutbreakTransmission } from '../../store/Outbreak';
import { isNullOrEmpty } from '../../utils/UIUtils';
import YesNoUnknown from '../common/YesNoUnknown';
import { CodeType } from '../../store/Code';
import Loading from '../common/Loading';


type TransmissionProps = {
    transmission: OutbreakTransmission,
    codes: Codes
    errors: any
}
    & typeof CodeActions
    & typeof OutbreakActions;

class Transmission extends React.Component<TransmissionProps> {
    state = {
        loading:true
    }
    constructor(props: TransmissionProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    private onChange(name: string, newValue: any) {
        const transmission = Object.assign({}, this.props.transmission);

        (transmission as any)[name] = newValue;

        if (name === "foodOrWaterRelated") {
            if (newValue !== "YES") {
                transmission.isVehicleIdentified = '';
                transmission.vehicle = '';
            }
        }
        else if (name == "isVehicleIdentified") {
            if (newValue !== "YES") {
                transmission.vehicle = '';
            }
        }
        else if (name === "healthRelated") {
            if (newValue !== "YES") {
                transmission.causeForOutbreak = '';
                transmission.description = '';
            }
        }
        else if (name == "causeForOutbreak") {
            if (isNullOrEmpty(newValue)) {
                transmission.description = '';
            }
        }

        this.props.updateTransmission(transmission);
    }

    public async componentDidMount() {
        const { loadTransmission, loadDropdown } = this.props;
        try {
            this.setState({ loading: true });
            await loadTransmission();
            await loadDropdown(CodeType.vehicleIdentified);
            await loadDropdown(CodeType.transmissionModes);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { transmission, codes, errors } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <div className="row" >
                <Dropdown
                    name="transmissionMode"
                    value={transmission.transmissionMode}
                    label={"Primary Mode of Transmission"}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.OB_MODE)}
                    cols={6}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    isRequired={true}
                    error={errors.transmissionMode}
                />
            </div>
            <div className="row" >
                <YesNoUnknown
                    name={"foodOrWaterRelated"}
                    value={transmission.foodOrWaterRelated}
                    label={"Food or Waterborne Outbreak:"}
                    cols={3}
                    onChange={this.onChange}
                    error={errors.foodOrWaterRelated}
                />
                <YesNoUnknown
                    name={"isVehicleIdentified"}
                    value={transmission.isVehicleIdentified}
                    label={"Vehicle Identified:"}
                    cols={3}
                    onChange={this.onChange}
                    isReadOnly={transmission.foodOrWaterRelated !== 'YES'}
                    error={errors.isVehicleIdentified}
                />

                <TextInput
                    name={"vehicle"}
                    value={transmission.vehicle}
                    label={"Vehicle:"}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={transmission.isVehicleIdentified !== 'YES'}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.vehicle}
                    maxLength={100}
                />
            </div>
            <div className="row" >
                <YesNoUnknown
                    name={"healthRelated"}
                    value={transmission.healthRelated}
                    label={"Health Care-Associated Outbreak:"}
                    cols={3}
                    onChange={this.onChange}
                    error={errors.healthRelated}
                />
                <Dropdown
                    name={"causeForOutbreak"}
                    value={transmission.causeForOutbreak}
                    label={"Vehicle Identified:"}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.VEHICLE_IDENTIFIED)}
                    cols={3}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={transmission.healthRelated !== 'YES'}
                    error={errors.causeForOutbreak}
                />

                <TextInput
                    name={"description"}
                    value={transmission.description}
                    label={"Description:"}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={(utils.isNullOrEmpty(transmission.causeForOutbreak))}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.description}
                    maxLength={100}
                />
            </div>
        </div>

    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            transmission: state.outbreak.transmission,
            codes: state.codes.codes,
        };
    },
    Object.assign(CodeActions, OutbreakActions)
)(Transmission);
