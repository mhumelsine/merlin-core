import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators, Results } from '../../store/Outbreak';
import { Codes } from '../../store/Code';
import NumberInput from '../common/NumberInput';
import ButtonRadio from '../common/ButtonRadio';
import { int32 } from '../../utils/Global';
import * as utils from '../../utils/UIUtils';

//[{ label: "Exact", value: "exact" }, { label: "Estimated", value: "Estimated" }, { label: "Unknown", value: "Unknown" }]

type TotalCasesProps = {
    results: Results,
    errors: any,
    codes: Codes
}
    & typeof actionCreators;

class TotalCasesResults extends React.Component<TotalCasesProps> {
    constructor(props: TotalCasesProps) {
        super(props);

        this.onChange = this.onChange.bind(this)
    }

    private onChange(name: string, value: any) {
        const results = Object.assign({}, this.props.results) as any;

        results[name] = value;

        this.props.updateResults(results);
    }

    public render() {

        const { results, errors, codes } = this.props;


        return <div>
            <div className="row">
                <NumberInput
                    name="totalCases"
                    value={results.totalCases}
                    label="Total Cases"
                    onChange={this.onChange}
                    error={errors.totalCases}
                    min={int32.min}
                    max={int32.max}
                    cols={6}
                />
                <ButtonRadio
                    name="totalCaseType"
                    value={results.totalCaseType}
                    label="Total Type"
                    options={utils.getOptions(codes.OB_CASE_TYPE)}
                    onChange={this.onChange}
                    error={errors.totalCaseType}
                    cols={6}
                />
            </div>
            <div className="row">
                <NumberInput
                    name="emergencyVisits"
                    value={results.emergencyVisits}
                    label="Total Cases Who Visited the Emergency Department"
                    onChange={this.onChange}
                    error={errors.emergencyVisits}
                    min={int32.min}
                    max={int32.max}
                    cols={6}
                />
                <ButtonRadio
                    name="emergencyVisitsType"
                    value={results.emergencyVisitsType}
                    label="Total Type"
                    options={utils.getOptions(codes.OB_CASE_TYPE)}
                    onChange={this.onChange}
                    error={errors.emergencyVisitsType}
                    cols={6}
                />
            </div>
            <div className="row">
                <NumberInput
                    name="inpatientHospitalizations"
                    value={results.inpatientHospitalizations}
                    label="Total Cases Hospitalized"
                    onChange={this.onChange}
                    error={errors.inpatientHospitalizations}
                    min={int32.min}
                    max={int32.max}
                    cols={6}
                />
                <ButtonRadio
                    name="inpatientHospitalizationsType"
                    value={results.inpatientHospitalizationsType}
                    label="Total Type"
                    options={utils.getOptions(codes.OB_CASE_TYPE)}
                    onChange={this.onChange}
                    error={errors.inpatientHospitalizationsType}
                    cols={6}
                />
            </div>
            <div className="row">
                <NumberInput
                    name="deaths"
                    value={results.deaths}
                    label="Total Cases Who Died"
                    onChange={this.onChange}
                    error={errors.deaths}
                    min={int32.min}
                    max={int32.max}
                    cols={6}
                />
                <ButtonRadio
                    name="deathsType"
                    value={results.deathsType}
                    label="Total Type"
                    options={utils.getOptions(codes.OB_CASE_TYPE)}
                    onChange={this.onChange}
                    error={errors.deathsType}
                    cols={6}
                />
            </div>
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            results: state.outbreak.results,
            codes: state.codes.codes
        };
    },
    actionCreators
)(TotalCasesResults);
