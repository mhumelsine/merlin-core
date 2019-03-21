import * as React from 'react';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Codes, actionCreators as CodeActions, CodeType } from '../../store/Code';
import CustomDatePicker from '../common/CustomDatePicker';
import { int32 } from '../../utils/Global';
import * as utils from '../../utils/UIUtils';
import { actionCreators as OutbreakActions, ClinicalResults as OutreakClinicalResults } from '../../store/Outbreak';
import StaticInput from '../common/StaticInput';
import Loading from '../common/Loading';
import NumberInput from '../common/NumberInput';

type ClinicalResultsProps = {
    clinicalResults?: OutreakClinicalResults,
    errors: any,
    codes?:Codes
}
    & typeof CodeActions
    & typeof OutbreakActions;

class ClinicalResults extends React.Component<ClinicalResultsProps> {
    state = {
        loading: true
    };

    constructor(props: ClinicalResultsProps) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    private onChange(name: string, value: any) {
        const clinicalResults = Object.assign({}, this.props.clinicalResults) as any;

        clinicalResults[name] = value;

        if (name === "symptom" && !this.containsOther(value)) {
            clinicalResults.otherSymptom = '';
        }

        this.props.updateClinicalResults(clinicalResults);
    }

    private containsOther(symptoms: string[]) {
        return symptoms.some(symptom => symptom === 'OTHER');
    }

    public async componentDidMount() {
        const { loadClinicalResults, loadDropdown } = this.props;

        try {
            this.setState({ loading: true });
            await loadClinicalResults();
            await loadDropdown(CodeType.symptoms);
            await loadDropdown(CodeType.timeUnits);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { errors, codes, clinicalResults } = this.props
        const { loading } = this.state;

        if (loading || clinicalResults === undefined || codes === undefined) {
            return <Loading />;
        }

        return <div>
            <div className="row" >
                <Dropdown
                    name={"symptom"}
                    value={clinicalResults.symptom}
                    label={"Symptoms:"}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.SYMPTOMS)}
                    cols={6}
                    isMulti={true}
                    onChange={this.onChange}
                    isReadOnly={false}
                    isRequired={true}
                    error={errors.symptom}
                />

                <TextInput
                    name={"otherSymptom"}
                    value={clinicalResults.otherSymptom}
                    label={"Other Symptoms:"}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={!this.containsOther(clinicalResults.symptom)}
                    onChange={this.onChange}
                    cols={6}
                    error={errors.otherSymptom}
                    maxLength={50}
                />
            </div>
            <div className="row" >
                <CustomDatePicker
                    name={"firstExposureDate"}
                    value={clinicalResults.firstExposureDate}
                    label={"First Exposure date:"}
                    hideLabel={false}
                    placeholder={"mm/dd/yyyy"}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={3}
                    error={errors.firstExposureDate}
                //ignoreError={true}
                />
                <CustomDatePicker
                    name={"lastExposureDate"}
                    value={clinicalResults.lastExposureDate}
                    label={"Last Exposure date:"}
                    hideLabel={false}
                    placeholder={"mm/dd/yyyy"}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={3}
                    error={errors.lastExposureDate}
                //ignoreError={true}
                />
            </div>
            <div className="row" >
                <CustomDatePicker
                    name={"firstOnsetDate"}
                    value={clinicalResults.firstOnsetDate}
                    label={"First Onset date:"}
                    hideLabel={false}
                    placeholder={"mm/dd/yyyy"}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={3}
                    error={errors.firstOnsetDate}
                //ignoreError={true}
                />
                <CustomDatePicker
                    name={"lastOnsetDate"}
                    value={clinicalResults.lastOnsetDate}
                    label={"Last Onset date:"}
                    hideLabel={false}
                    placeholder={"mm/dd/yyyy"}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={3}
                    error={errors.lastOnsetDate}
                //ignoreError={true}
                />
            </div>
            <div className="row" >
                <NumberInput
                    name={"duration"}
                    value={clinicalResults.duration}
                    label={"Median Duration of Symptoms:"}
                    onChange={this.onChange}
                    cols={3}
                    error={errors.duration}
                    min={int32.min}
                    max={int32.max}
                />
                <Dropdown
                    name={"timeUnit"}
                    value={clinicalResults.timeUnit}
                    label={""}
                    hideLabel={false}
                    placeholder={''}
                    options={utils.getOptions(codes.TIME_UNIT)}
                    cols={3}
                    isMulti={false}
                    onChange={this.onChange}
                    isReadOnly={false}
                    error={errors.timeUnit}
                />
            </div>
            <div className="row" >
                <StaticInput
                    name="outbreakEventDate"
                    label="Outbreak Event Date:"
                    cols={6}
                    value={clinicalResults.outbreakEventDate}
                />
            </div>
        </div>

    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes,
            clinicalResults: state.outbreak.clinicalResults
        };
    },
    Object.assign(CodeActions, OutbreakActions)
)(ClinicalResults);
