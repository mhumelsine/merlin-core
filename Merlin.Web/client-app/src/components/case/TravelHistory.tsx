import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import Card from '../common/Card';
import { TravelHistoryCase, Address } from '../../store/Case';
import * as CaseState from '../../store/Case';
import TravelHistoryItem, { TravelType } from './TravelHistoryItem';
import ExposureLocation from './ExposureLocation';
import Loading from '../common/Loading';
import { defaults } from '../../utils/Global';
import Alert from '../common/Alert';

type TravelHistoryProps = {
    caseId: number;
    travelHistory: TravelHistoryCase;
} & typeof CaseState.actionCreators;

class TravelHistory extends React.Component<TravelHistoryProps> {
    state = {
        caseId: defaults.number,
        isLoading: false
    };

    constructor(props: TravelHistoryProps) {
        super(props);
        this.onAddLocation = this.onAddLocation.bind(this);
        this.onRemoveLocation = this.onRemoveLocation.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
    }

    public componentWillReceiveProps(nextProps: TravelHistoryProps) {
        if (nextProps.caseId !== this.state.caseId) {
            this.loadData(nextProps.caseId);
        }
     }

    public async componentWillMount() {
        this.loadData(this.props.caseId);
    }

    public render() {
        const { travelHistory } = this.props;
        const { travelHistoryItems } = travelHistory;
        const { isLoading, caseId } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
            <ExposureLocation
                onAddLocation={this.onAddLocation}
                onRemoveLocation={this.onRemoveLocation}
            />
            <Card
                header="Travel History"
            >
                {travelHistoryItems && travelHistoryItems.map(item => {
                    return <ul key={item.travelId} className="list-group list-group-flush">
                        <li className="list-group-item">
                            <TravelHistoryItem
                                key={item.travelId}
                                travelId={item.travelId}
                                travelHistoryItem={item}
                                travelType={item.travelType}
                                onAddressChange={this.onAddressChange}
                            />
                        </li>
                    </ul>;
                }
                )}
            </Card>
        </div>;
    }


    private async loadData(caseId: number) {
        const { loadTravelHistoryForCase, travelHistory } = this.props;
        try {
            this.setState({ isLoading: true });
            await loadTravelHistoryForCase(caseId ? caseId : 0);
        }
        finally {
            this.setState(  {
                isLoading: false,
                caseId: caseId
            });
        }
    }
    private onAddressChange(travelId: number, name: string, value: any) {

        const newTravelHistoryItems = [...this.props.travelHistory.travelHistoryItems];

        let travelHistoryItem = newTravelHistoryItems.find(item => {
            return item.travelId === travelId;
        });

        if (travelHistoryItem) {
            travelHistoryItem.address[name] = value;
            this.props.editTravelHistory(travelHistoryItem);
        }
    }

    private onAddLocation(location: any) {
        let newItem = {
            address: {} as Address
        } as CaseState.TravelHistoryItem;

        const zoneObj = location.split('~');
        const zoneCode = parseInt(zoneObj[0]);
        const zoneName = zoneObj[1];

        switch (zoneCode) {
            case 1:
                if (zoneName === 'FL') {
                    newItem.travelType = TravelType.FLORIDA;

                } else {
                    newItem.travelType = TravelType.ANOTHER_STATE;
                }
                newItem.address.state = zoneName;
                break;
            case 2:
                newItem.travelType = TravelType.US_TERRITORY;
                newItem.address.country = zoneName;
                break;
            case 3:
            case 4:
                newItem.travelType = TravelType.OUT_OF_US;
                newItem.address.country = zoneName;
                break;
            default:
                break;
        }
        this.props.addTravelHistory(newItem);
    }

    private onRemoveLocation(location: any) {
        const { travelHistoryItems } = this.props.travelHistory;
        let travelHistoryItem: any;
        let zoneCode = location.split('~')[0];
        let zoneValue = location.split('~')[1];

        if (zoneCode == 1) {
            // use State
            travelHistoryItem = travelHistoryItems.find(item => {
                return item.address.state === zoneValue;
            });
        } else {
            // use country
            travelHistoryItem = travelHistoryItems.find(item => {
                return item.address.country === zoneValue;
            });
        }
        this.props.removeTravelHistory(travelHistoryItem.travelId);
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            caseId: state.case.caseDetails.caseId,
            travelHistory: state.case.travelHistory
        };
    },
    CaseState.actionCreators
)(TravelHistory);
