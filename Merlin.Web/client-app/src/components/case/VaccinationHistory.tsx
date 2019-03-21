import * as React from 'react';
import { ApplicationState } from '../../store/index';
import * as CaseState from '../../store/Case';
import * as Codes from '../../store/Code';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import VaccinationHistItem from './VaccinationHistItem';
import { VaccineHistory } from '../../store/Case';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import CustomDatePicker from '../common/CustomDatePicker';
import * as utils from '../../utils/UIUtils';
import { defaults } from '../../utils/Global';
import Alert from '../common/Alert';
import SaveButton from '../common/SaveButton';

type VaccinationHistProps = {
    caseId: number;
    icd9: string;
    profileId: number;
    vaccineHistory: CaseState.VaccineHistory[]
    codes: Codes.DropdownCode[]
    vaccines: Codes.DropdownCode[]
} & typeof CaseState.actionCreators
    & CaseState.CaseState
    & typeof Codes.actionCreators;

class VaccinationHistory extends React.Component<VaccinationHistProps> {
    state = {
        caseId: defaults.number,
        vaccinehistorynew: {
            vaccineType: defaults.string,
            manufacturer: defaults.string,
            lotNumber: defaults.string,
            doseNumber: defaults.string,
            dateGiven: defaults.string,
            caseId: defaults.number,
            profileID: defaults.number,
            icd9: defaults.string,
            vaccineID: defaults.number
        },
        vaccineHistoryList: this.props.vaccineHistory,
        isLoading: false,
        errors: {} as any,
    };

    constructor(props: VaccinationHistProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }


    public componentWillReceiveProps(nextProps: VaccinationHistProps) {
        const {caseId, icd9} = nextProps;

        if (caseId !== this.state.caseId) {
            this.loadData(caseId, icd9);
        }

        let newState = Object.assign({}, this.state);
        newState.vaccineHistoryList = nextProps.vaccineHistory;
        this.setState(newState);
     }

    public async componentWillMount() {
        const { caseId, icd9} = this.props;
        this.loadData(caseId, icd9);
    }

    public render() {

        const { isLoading, vaccineHistoryList, errors, caseId } = this.state;
        const {vaccineType, manufacturer, lotNumber, doseNumber, dateGiven } = this.state.vaccinehistorynew;
        const { codes, vaccines} = this.props;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
                    <div className="row" >
                         <Dropdown
                            name={'vaccineType'}
                            value={vaccineType}
                            label={'Vaccine Type'}
                            hideLabel={false}
                            placeholder={'Select item'}
                            options={utils.getOptions(vaccines ? vaccines : [])}
                            cols={6}
                            isMulti={false}
                            onChange={this.onChange}
                            isReadOnly={false}
                            error={errors.vaccineType}
                        />
                        <CustomDatePicker
                            name={'dateGiven'}
                            value={dateGiven}
                            label={'Date Given'}
                            hideLabel={false}
                            placeholder={'Enter date'}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={6}
                        />
                        <Dropdown
                            name={'manufacturer'}
                            value={manufacturer}
                            label={'Manufacturer'}
                            hideLabel={false}
                            placeholder={'Select item'}
                            options={utils.getOptions(codes)}
                            cols={6}
                            isMulti={false}
                            onChange={this.onChange}
                            isReadOnly={false}
                            error={errors.manufacturer}
                        />
                        <TextInput
                            name={'lotNumber'}
                            value={lotNumber}
                            label={'Lot Number'}
                            hideLabel={false}
                            placeholder={'Enter text'}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={3}
                        />

                        <TextInput
                            name={'doseNumber'}
                            value={doseNumber}
                            label={'Dose Number'}
                            hideLabel={false}
                            placeholder={'Enter text'}
                            isReadOnly={false}
                            onChange={this.onChange}
                            cols={3}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <SaveButton
                                onClick={this.onSave}
                                buttonText={' Save Vaccine History'}
                            />

                        </div>
                    </div>


                        {vaccineHistoryList.length > 0 &&
                            <div className="table-responsive-container">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover table-mobile-compact">
                                        <thead>
                                            <tr>
                                                <th>VaccineType</th>
                                                <th>Date Given</th>
                                                <th>Manufacturer</th>
                                                <th>Lot Number</th>
                                                <th>Dose Number</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vaccineHistoryList.map(hist => <VaccinationHistItem key={hist.vaccineID} vaccineHist={hist} onDelete={this.onDelete} onEdit={this.onEdit} />)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

         </div>;
    }

    private async loadData(caseId: number, diseaseCode: string ) {
        const { loadVaccineHistory, loadDropdown, loadVaccines} = this.props;

        try {
            this.setState({ isLoading: true });
            await loadDropdown(Codes.CodeType.vaccineMFRType);
            await loadVaccineHistory(caseId ?  caseId : -1);
            await loadVaccines(diseaseCode ? diseaseCode : '0');
        }
        finally {
            this.setState(
                {
                    isLoading: false,
                    caseId: caseId
                });
        }
    }

    private onChange(name: string, newValue: any) {

        let newState = Object.assign({}, this.state);
        (newState.vaccinehistorynew as any)[name] = newValue;
        newState.errors[name] = defaults.string;
        this.setState(newState);
    }

    private onReset() {
        const newState = Object.assign({}, this.state);

        newState.vaccinehistorynew.vaccineType = defaults.string,
            newState.vaccinehistorynew.manufacturer = defaults.string,
            newState.vaccinehistorynew.lotNumber = defaults.string,
            newState.vaccinehistorynew.doseNumber = defaults.string,
            newState.vaccinehistorynew.dateGiven = defaults.string,
            newState.vaccinehistorynew.caseId = defaults.number,
            newState.vaccinehistorynew.profileID = defaults.number,
            newState.vaccinehistorynew.icd9 = defaults.string,
            newState.vaccinehistorynew.vaccineID = defaults.number,
            newState.errors = {};
        this.setState({ vaccinehistorynew: newState.vaccinehistorynew });
        this.setState(newState);
    }

    private onSave(event: any) {
        event.preventDefault();
        const { vaccineType, manufacturer } = this.state.vaccinehistorynew;
        let newState = Object.assign({}, this.state);
        newState.errors = {};


        if (vaccineType === defaults.string) {
            newState.errors.vaccineType = 'vaccineType is required';
        }

        if (manufacturer === defaults.string) {
            newState.errors.manufacturer = 'Manufacturer is required';
        }

        if (Object.keys(newState.errors).length > 0) {
            this.setState(newState);
            return;
        }

        const { SaveVaccineHistoryItem, profileId, caseId, icd9 } = this.props;
        const newvaccinehistory = Object.assign({}, this.state.vaccinehistorynew);

        newvaccinehistory.profileID = profileId;
        newvaccinehistory.caseId = caseId;
        newvaccinehistory.icd9 = icd9;
        newvaccinehistory.vaccineID = (newvaccinehistory.vaccineID === 0) ? Date.now() : newvaccinehistory.vaccineID;
        this.setState(newState);
        SaveVaccineHistoryItem(newvaccinehistory);
        this.onReset();
    }

    private onEdit(vaccineHistItem: VaccineHistory) {
        this.setState({ vaccinehistorynew: vaccineHistItem });
    }

    private onDelete(VaccineID: number) {
        this.props.DeleteVaccineHistoryItem(VaccineID);
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            caseId: state.case.caseDetails.caseId,
            icd9: state.case.caseDetails.icd9,
            vaccineHistory: state.case.vaccineHistory,
            codes: state.codes.codes.VACCINE_MFR,
            vaccines: state.case.vaccines,
            profileId: state.case.caseDetails.profileId
        };
    },
    Object.assign({}, CaseState.actionCreators, Codes.actionCreators)
)(VaccinationHistory);

