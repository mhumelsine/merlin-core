import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators, LaboratoryResults as OutbreakLaboratoryResults } from '../../store/Outbreak';
import YesNoUnknown from '../common/YesNoUnknown';
import Loading from '../common/Loading';
import TextAreaInput from '../common/TextAreaInput';
import NumberInput from '../common/NumberInput';
import { isNullOrEmpty } from '../../utils/UIUtils';
import { int32 } from '../../utils/Global';


type LaboratoryResultsProps = {
    laboratoryResults: OutbreakLaboratoryResults,
    errors: any
}
    & typeof actionCreators;

class LaboratoryResults extends React.Component<LaboratoryResultsProps> {
    state = {
        loading: true
    };
    constructor(props: LaboratoryResultsProps) {
        super(props);

        this.onChange = this.onChange.bind(this)
    }


    private onChange(name: string, value: any) {
        const laboratoryResults = Object.assign({}, this.props.laboratoryResults) as any;

        if ((name === "isHumanSpecimens")
            && ((isNullOrEmpty(value))
            || ((value === "YES") && (laboratoryResults.isHumanSpecimens !== "YES"))
            || ((!isNullOrEmpty(laboratoryResults.noOfCases) && value !== "YES")))) {
            laboratoryResults.noOfCases = 0;
        }

        laboratoryResults[name] = value;

        this.props.updateLaboratoryResults(laboratoryResults);
    }

    public async componentDidMount() {
        const { loadLaboratoryResults } = this.props;
        try {
            this.setState({ loading: true });
            await loadLaboratoryResults();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { laboratoryResults, errors } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <div className="row" >
                <div className="col-md-6">
                    <YesNoUnknown
                        name={"isHumanSpecimens"}
                        value={laboratoryResults.isHumanSpecimens}
                        label={"Laboratory Confirmed Human Specimens:"}
                        isRequired={true}
                        onChange={this.onChange}
                        isReadOnly={false}
                        error={errors.isHumanSpecimens}
                    />
                </div>
                <div className="col-md-6">
                    <NumberInput
                        name="noOfCases"
                        value={laboratoryResults.noOfCases||''}
                        label="Number of Cases Laboratory Confirmed"
                        onChange={this.onChange}
                        isReadOnly={laboratoryResults.isHumanSpecimens !== "YES"}
                        error={errors.noOfCases}
                        min={int32.min}
                        max={int32.max}
                    />
                </div>
                </div>
               <div className="row" >
                <div className="col-md-6">
                    <YesNoUnknown
                        name={"isLabTestingConducted"}
                        value={laboratoryResults.isLabTestingConducted}
                        label={"Laboratory Testing Conducted:"}
                        onChange={this.onChange}
                        isReadOnly={false}
                        error={errors.isLabTestingConducted}

                    />
                </div>
                <div className="col-md-6">
                    <TextAreaInput
                        name={"labFindings"}
                        value={laboratoryResults.labFindings}
                        label={"Laboratory Findings:"}
                        hideLabel={false}
                        placeholder={''}
                        onChange={this.onChange}
                        isReadOnly={false}
                        rows={5}
                        error={errors.labFindings}
                    />
                </div>
            </div>
        </div>

    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            laboratoryResults: state.outbreak.laboratoryResults
        };
    },
    actionCreators
)(LaboratoryResults);
