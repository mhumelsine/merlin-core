import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import StaticInput from '../common/StaticInput';
import Dropdown from '../common/Dropdown';
import * as CaseState from '../../store/Case';
import { defaults } from '../../utils/Global';
import { getOptions } from '../../utils/UIUtils';
import Loading from '../common/Loading';

type ExposureLocationProps = {
    caseId: number;
    onAddLocation: (element: any) => void;
    onRemoveLocation: (element: any) => void;
} & typeof CaseState.actionCreators
  & CaseState.CaseState;

class ExposureLocation extends React.Component<ExposureLocationProps> {
    state = {
        importedSelection: defaults.string,
        isLoading: defaults.boolean
    };

    constructor(props: ExposureLocationProps) {
        super(props);
        this.onDropdownChange = this.onDropdownChange.bind(this);
    }

    public componentWillMount() {
        this.setState({ isLoading: true });


        if (this.props.travelHistory.exposureLocation) {

            this.setState({ isLoading: true });
            const { travelHistoryItems, exposureLocation } = this.props.travelHistory;
            const { locationsExposed } = exposureLocation;
            let locations: string[] = [];

            travelHistoryItems.map(location => {
                if (locationsExposed && location.locationExposed !== '') {
                    const codeValues = locationsExposed.find(
                        (item) => {
                            return item.description === location.locationExposed;
                        });
                    if (codeValues) {
                        locations.push(codeValues.code);
                    }
                }
            });
            this.setTravelInfo(locations);
        }
        this.setState({ isLoading: false });
    }

    public render() {
        const { importedSelection, isLoading } = this.state;

        if (isLoading) {
           return <Loading />;
        }
        const { exposureLocation } = this.props.travelHistory;

        if (exposureLocation) {
        const { imported, locationsExposed, origin, locationExposedSelected } = exposureLocation;

        return <div>
            <Dropdown
                name="locationsExposed"
                label="Location(s) where exposed"
                value={locationExposedSelected}
                options={getOptions(locationsExposed ? locationsExposed : [])}
                onChange={this.onDropdownChange}
                isMulti={true}
                hideLabel={false}
            />
            <Dropdown
                name="imported"
                label="Imported"
                value={importedSelection}
                options={getOptions(imported ? imported : [])}
                hideLabel={false}
                onChange={() => { }}
                isReadOnly={true}
            />
            <StaticInput
                name="origin"
                label="Origin"
                value={origin ? origin.toString() : ''}
                hideLabel={false}
            />
        </div>;
        }
        return null;
    }

    private onDropdownChange(name: string, newValue: string[]) {
        const { onAddLocation, onRemoveLocation, travelHistory } = this.props;
        const { locationExposedSelected } = travelHistory.exposureLocation;

        if (newValue.length > locationExposedSelected.length) {
            // add
            onAddLocation(newValue[newValue.length - 1]);
        } else if (newValue.length < locationExposedSelected.length) {
            // remove
            const elementRemoved = locationExposedSelected.find(item => {
                return (newValue.indexOf(item) == -1);
            });
            onRemoveLocation(elementRemoved);
        }
        this.setTravelInfo(newValue);
    }

    private setTravelInfo(newValue: string[]) {
        let newState = Object.assign({}, this.state);
        let zoneSelected = 0;
        let origin: string[] = [];

        if (newValue) {
            zoneSelected = this.getZoneSelected(newValue);
            origin = this.getOrigin(newValue);
        }

        newState.importedSelection = this.getImported(zoneSelected);
        this.setState(newState, async () => await this.props.saveExposureLocation(origin, newValue));
    }

    private getOrigin(locations: any) {
        let origin: string[] = [];

        (locations as string[]).map(selection => {
            origin.push(selection.split('~')[1]);
        });
        return origin;
    }

    private getZoneSelected(locations: any) {
        let zone: { [index: string]: any } = {};

        let zoneSelected = 0;

        zone.florida = false;
        zone.anotherState = false;
        zone.usTerritory = false;
        zone.outsideUsa = false;
        zone.unknown = false;

        (locations as string[]).map(selection => {
            const zoneObj = selection.split('~');
            const zoneCode = parseInt(zoneObj[0]);
            const zoneName = zoneObj[1];

            switch (zoneCode) {
                case 1:
                    if (zoneName === 'FL') {
                        zone.florida = true;
                    } else {
                        zone.anotherState = true;
                    }
                    break;
                case 2:
                    zone.usTerritory = true;
                    break;
                case 3:
                case 4:
                    zone.outsideUsa = true;
                    break;
                default:
                    zone.unknown = true;
                    break;
            }
        });
        Object.keys(zone).forEach((key, index) => {
            if (zone[key]) {
                zoneSelected = zoneSelected + (zone[key] << index);
            }
        }
        );

        return zoneSelected;
    }

    private getImported(zoneValue: number) {
        switch (true) {
            case (zoneValue == 0):
                return '';
            case (zoneValue == 1):
                return 'FLORIDA';
            case (zoneValue == 2):
            case (zoneValue == 3):
                return 'ANOTHER_STATE';
            case (zoneValue > 3 && zoneValue < 8):
                return 'US_TERRITORY';
            case (zoneValue == 8):
                return 'OUT_OF_US';
            case (zoneValue > 8 && zoneValue < 16):
                return 'ANYWHERE';
            default:
                return 'UNKNOWN';
        }
    }
}
export default connect(
    (state: ApplicationState) => state.case,
    CaseState.actionCreators
)(ExposureLocation);
