import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators, Results } from '../../store/Outbreak';
import { defaults } from '../../utils/Global';
import NumberInput from '../common/NumberInput';
import StaticInput from '../common/StaticInput';
import { int32 } from '../../utils/Global';

type StaffProps = {
    results: Results,
    errors: any
}
  & typeof actionCreators;

class StaffResults extends React.Component<StaffProps> {

    constructor(props: StaffProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    public render() {
        const { results, errors } = this.props;
        const total = (results.nonStaffCases || 0)
            + (results.staffCases || 0)
            + (results.unknownCases || 0);

        return <div>
            <div className="row">
                <div className="col-md-3">
                    <StaticInput
                        name="total"
                        value={total}
                        label="Total Cases"
                    />
                </div>
                <div className="col-md-3">
                    <NumberInput
                        name="nonStaffCases"
                        value={results.nonStaffCases}
                        label="Total Non-Staff Cases"
                        onChange={this.onChange}
                        error={errors.nonStaffCases}
                        min={int32.min}
                        max={int32.max}
                    />
                </div>
                <div className="col-md-3">
                    <NumberInput
                        name="staffCases"
                        value={results.staffCases}
                        label="Total Staff Cases"
                        onChange={this.onChange}
                        error={errors.staffCases}
                        min={int32.min}
                        max={int32.max}
                    />
                </div>
                <div className="col-md-3">
                    <NumberInput
                        name="unknownCases"
                        value={results.unknownCases}
                        label="Total Cases Unknown"
                        onChange={this.onChange}
                        error={errors.unknownCases}
                        min={int32.min}
                        max={int32.max}
                    />
                </div>
            </div>
        </div>;
    }

    private onChange(name: string, value: any) {
        const results = Object.assign({}, this.props.results) as any;

        results[name] = parseInt(value);

        this.props.updateResults(results);
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            results: state.outbreak.results
        };
    },
    actionCreators
)(StaffResults);
