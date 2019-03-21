import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as CaseStore from '../../store/Case';
import Loading from '../common/Loading';
import Alert from '../common/Alert';
import { LabResult } from '../../store/Case';
import Dropdown from '../common/Dropdown';
import TextInput from '../common/TextInput';
import { defaults } from '../../utils/Global';

type LabSummaryProps = {
    caseId: number,
    diseaseCode: string,
    labSummary: LabResult[]
} & typeof CaseStore.actionCreators;

class LabSummary extends React.Component<LabSummaryProps> {
    state = {
        caseId: defaults.number,
        isLoading: false
    };

    public componentWillReceiveProps(nextProps: LabSummaryProps) {
        if (nextProps.caseId !== this.state.caseId) {
            this.loadData(nextProps.caseId, nextProps.diseaseCode);
        }
     }

    public async componentDidMount() {
        const { caseId, diseaseCode} = this.props;
        this.loadData(caseId, diseaseCode);
    }

    public render() {
        const { isLoading, caseId } = this.state;
        const { labSummary } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (!labSummary.length) {
            return <Alert alertType="warning">
                No Lab Summary found for Case# {caseId}
            </Alert>;
        }
        return <div style={{overflow: 'visible'}}>
            {labSummary && labSummary.map(labResult => {
              if (labResult) {
                return <div key={labResult.label} className={'row'}> {this.renderControl(labResult)} </div>;
              }

            })}
        </div>;
    }

    private async loadData(caseId: number, diseaseCode: string ) {
        const { loadLabSummaryForCase } = this.props;

        try {
                this.setState({ isLoading: true });
                await loadLabSummaryForCase(caseId ? caseId : 0, diseaseCode);
            } finally {
                this.setState(
                    {
                        isLoading: false,
                        caseId: caseId
                    });
            }
    }

    private getOptions(options: any[]) {
        return options.map(option => {
            return { label: option.description, value: option.code };
        });
    }

    private renderControl(labResult: LabResult) {
        const { value, label, values } = labResult;

        if (values && values.length > 0) {
            return <Dropdown
            name={label}
            label={label}
            value={value}
            options={this.getOptions(values ? values : [])}
            hideLabel={false}
            cols={3}
            onChange={() => {}}
        />;
        } else {
            return <TextInput
            name={label}
            label={label}
            value={value}
            hideLabel={false}
            cols={6}
            onChange={() => {}}
        />;
        }
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            caseId: state.case.caseDetails.caseId,
            diseaseCode: state.case.caseDetails.icd9,
            labSummary: state.case.labSummary
        };
    },
    CaseStore.actionCreators
)(LabSummary);
