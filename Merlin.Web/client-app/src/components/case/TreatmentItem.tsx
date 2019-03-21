import * as React from 'react';
import Dropdown from '../common/Dropdown'; 
import * as CaseState from '../../store/Case';
import { getOptions } from '../../utils/UIUtils';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import * as CodeStore from '../../store/Code';
import CustomDatePicker from '../common/CustomDatePicker';
import TextInput from '../common/TextInput';
import { defaults } from '../../utils/Global';
import Loading from '../common/Loading';

type TreatmentItemItemProps = { 
    treatmentItem: CaseState.TreatmentItem;   
    onChangeTreatment: (treatmentItem: CaseState.TreatmentItem) => void; 
}   
& CodeStore.CodeState 
& typeof CodeStore.actionCreators;

class TreatmentItem extends React.Component<TreatmentItemItemProps> {

    constructor(props: TreatmentItemItemProps) {
        super(props);

        this.onChangeTreatment = this.onChangeTreatment.bind(this); 
    }
    state = {
        isLoading: defaults.boolean
    }

    public async componentWillMount() {
        const { loadDropdown } = this.props;
        try {
            this.setState({ isLoading: true });
           await loadDropdown(CodeStore.CodeType.antibiotics); 
        }
        finally {
            this.setState({
                isLoading: false
            });
        }
    }

    private onChangeTreatment(name: string, newValue: any) {
        const { onChangeTreatment, treatmentItem } = this.props;
        const newState  = Object.assign({}, treatmentItem);

        newState[name] = newValue;

        onChangeTreatment(newState);
    }
    
    public render() { 
        const { isLoading } = this.state;
        const { codes, treatmentItem } = this.props; 
        const { antibioticType, numberOfDaysTaken, dateStarted } = treatmentItem;
        const { dropdowns,textInputs, datePickers } = defaults.inputs;

        if (isLoading) {
            return <Loading />
        } 
        return <div className="row" style={{paddingTop: "20px" }}>
        
            <Dropdown
                name={dropdowns.antibioticTypeInput.name}
                value={antibioticType}
                options={getOptions(codes.ANTIBIOTICS)}
                cols={4}
                label={dropdowns.antibioticTypeInput.label}
                hideLabel={false}
                onChange={this.onChangeTreatment}
            />
            <CustomDatePicker
                name={datePickers.dateStartedInput.name}
                value={dateStarted}
                cols={3}
                label={datePickers.dateStartedInput.label}
                hideLabel={false}
                onChange={this.onChangeTreatment}
            /> 
            <TextInput
                name={textInputs.numberOfDaysTakenInput.name}
                value={numberOfDaysTaken ? numberOfDaysTaken: ""}
                cols={4}
                label={textInputs.numberOfDaysTakenInput.label}
                hideLabel={false}
                onChange={this.onChangeTreatment}
            />
        </div>
    }
}
export default connect( 
        (state: ApplicationState) =>  state.codes,
         CodeStore.actionCreators
)(TreatmentItem);