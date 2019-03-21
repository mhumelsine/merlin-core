import * as React from 'react';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import DateRange from '../common/DateRange';
import TextAreaInput from '../common/TextAreaInput';
import Address from '../common/Address';
import * as CaseState from '../../store/Case';
import { getOptions } from '../../utils/UIUtils';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import * as CodeStore from '../../store/Code';

export enum TravelType {
    FLORIDA = "FLORIDA",
    ANOTHER_STATE = "ANOTHER_STATE",
    US_TERRITORY = "US_TERRITORY",
    OUT_OF_US = "OUT_OF_US"
}

type TravelHistoryItemProps = {
    travelId: number;
    travelHistoryItem: CaseState.TravelHistoryItem;
    travelType: TravelType;
    onAddressChange: (travelId:number, name: string, newValue: any) => void;
}  & CodeStore.CodeState 
  & typeof CodeStore.actionCreators;

class TravelHistoryItem extends React.Component<TravelHistoryItemProps> {

    constructor(props: TravelHistoryItemProps) {
        super(props);

        this.onAddressChange = this.onAddressChange.bind(this);
    }

    public async componentWillMount() {
        this.props.loadDropdown(CodeStore.CodeType.traveltype); 
    }

    private onAddressChange(name: string, newValue: any) {
        const { onAddressChange, travelId } = this.props;

        onAddressChange(travelId, name, newValue);
    }
   
    public render() {
        const { onAddressChange } = this;
        const { travelType, travelHistoryItem,codes } = this.props;
        const { locationName, beginDate, endDate, notes, address } = travelHistoryItem;


        return <div className="row">
            <Dropdown
                name="travelType"
                value={travelType}
                options={getOptions(codes.TRAVEL_TYPE)}
                cols={6}
                label="Type"
                hideLabel={false}
                onChange={() => console.log('changed')}
            />
            <TextInput
                name="locationName"
                value={locationName}
                cols={6}
                label="Location Name"
                hideLabel={false}
                onChange={() => console.log('changed')}
            />
            <div className="col-md-6">
                <DateRange startDate={beginDate} endDate={endDate} />
            </div>
            <TextAreaInput
                name="notes"
                value={notes}
                cols={6}
                label="Notes"
                hideLabel={false}
                onChange={() => console.log('changed')}
            />
            <div className="col-md-12">
                {/*<Address Address={address} notifyChanges={onAddressChange}/>*/}
            </div>
        </div>
    }
}
export default connect( 
        (state: ApplicationState) => Object.assign({}, state.case, state.codes),
            Object.assign({}, CodeStore.actionCreators) 
)(TravelHistoryItem);