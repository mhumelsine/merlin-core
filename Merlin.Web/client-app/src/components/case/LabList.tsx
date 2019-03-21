import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import * as CaseStore from '../../store/Case';
import Loading from '../common/Loading';
import Alert from '../common/Alert';
import { LabListItem } from './LabListItem';
import { defaults } from '../../utils/Global';
import { FaLastfm } from 'react-icons/fa';

type LabListProps = {
    labs: CaseStore.Lab[],
    caseId: number,
}
    & typeof CaseStore.actionCreators;

class LabList extends React.Component<LabListProps> {
    state = {
        caseId: defaults.number,
        isLoading: false
    };

    public componentWillReceiveProps(nextProps: LabListProps) {

        if (nextProps.caseId !== this.state.caseId) {

            this.loadData(nextProps.caseId);
        }
    }

    public componentDidMount() {
        this.loadData(this.props.caseId);
    }

    public render() {
        const { isLoading } = this.state;
        const { caseId, labs } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (!labs.length) {
            return <Alert alertType="warning">
                No labs found for Case# {caseId}
            </Alert>;
        }

        return <div className="table-responsive-container">
            <div className="table-responsive">
                <table className="table table-striped table-hover table-mobile-compact">
                    <thead>
                        <tr>
                            <th>FL Disease Code #</th>
                            <th>Lab #</th>
                            <th>Accession #</th>
                            <th>Event Date</th>
                            <th>Reported</th>
                            <th>Specimen</th>
                            <th>Overall Result</th>
                            <th>Test</th>
                            <th>Result Detail</th>
                            <th>State Lab</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labs && labs.map(lab => <LabListItem key={lab.labId} lab={lab} />)}
                    </tbody>
                </table>
            </div>
        </div>;
    }

    private async loadData(caseId: number) {
        const { loadLabsForCase } = this.props;

        try {
            this.setState({ isLoading: true });
            await loadLabsForCase(caseId ? caseId : -1);
        } finally {
            this.setState(
                {
                    isLoading: false,
                    caseId: caseId
                });
        }
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            labs: state.case.labs,
            caseId: state.case.caseDetails.caseId
        };
    },
    CaseStore.actionCreators
)(LabList);
