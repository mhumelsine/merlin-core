import * as React from 'react';
import { defaults } from '../../utils/Global';
import Dropdown from '../common/Dropdown';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as Codes from '../../store/Code';
import * as utils from '../../utils/UIUtils';
import { OutbreakCommonItems } from '../../store/Outbreak';
import * as OutbreakStore from '../../store/Outbreak';
import Loading from '../common/Loading';
import YesNoUnknown from '../common/YesNoUnknown';


type GeographicProps = {
    geographicLocation: OutbreakStore.GeographicLocation,
    errors: any
}
    & typeof Codes.actionCreators
    & Codes.CodeState
    & OutbreakStore.OutbreakState
    & typeof OutbreakStore.actionCreators;

class GeographicLocation extends React.Component<GeographicProps> {
    state = {
        loading: true
    };

    constructor(props: GeographicProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public async componentDidMount() {
        const { loadGeographicLocation, loadDropdown } = this.props;

        try {
            this.setState({ loading: true });
            await loadGeographicLocation();
            await loadDropdown(Codes.CodeType.counties);
            await loadDropdown(Codes.CodeType.states);
            await loadDropdown(Codes.CodeType.countries);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        const { errors, codes, geographicLocation } = this.props;

        return <div>
            <div className="row" >
                <Dropdown
                    name={'county'}
                    isRequired={true}
                    value={geographicLocation.county}
                    label={'County:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.COUNTIES)}
                    cols={6}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.county}
                />
            </div>
            <div className="row" >
                <YesNoUnknown
                    name={'otherCountiesAffected'}
                    value={geographicLocation.otherCountiesAffected}
                    label={'Other Counties Affected:'}
                    cols={6}
                    onChange={this.onChange}
                />
                <Dropdown
                    name={'otherCountiesList'}
                    value={geographicLocation.otherCountiesList}
                    label={'List Other Counties Affected:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.COUNTIES)}
                    cols={6}
                    isMulti={true}
                    onChange={this.onChange}
                    isReadOnly={geographicLocation.otherCountiesAffected !== 'YES'}
                    error={errors.otherCountiesList}
                />
            </div>
            <div className="row" >
                <YesNoUnknown
                    name={'otherStatesAffected'}
                    value={geographicLocation.otherStatesAffected}
                    label={'Other States Affected:'}
                    cols={6}
                    onChange={this.onChange}
                />
                <Dropdown
                    name={'otherStatesList'}
                    value={geographicLocation.otherStatesList}
                    label={'List Other states Affected:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.STATE)}
                    cols={6}
                    isMulti={true}
                    onChange={this.onChange}
                    isReadOnly={geographicLocation.otherStatesAffected !== 'YES'}
                    error={errors.otherStatesList}
                />
            </div>
            <div className="row" >
                <Dropdown
                    name={'otherCountriesList'}
                    value={geographicLocation.otherCountriesList}
                    label={'Other Countries Affected:'}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.COUNTRIES)}
                    cols={6}
                    isMulti={true}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.otherContriesList}
                />
            </div>
        </div>;
    }

    private onChange(name: string, newValue: any) {
        let location = Object.assign({}, this.props.geographicLocation);

        (location as any)[name] = newValue;

        if (name === 'otherCountiesAffected') {
            if (newValue !== 'YES') {
                location.otherCountiesList = [];
            }
        } else if (name === 'otherStatesAffected') {
            if (newValue !== 'YES') {
                location.otherStatesList = [];
            }
        }

        this.props.updateGeographicLocation(location);
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes,
            geographicLocation: state.outbreak.geographicLocation
        };
    },
    Object.assign({}, Codes.actionCreators, OutbreakStore.actionCreators)

)(GeographicLocation);
