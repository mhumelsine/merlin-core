import * as React from 'react';
import { ApplicationState } from '../../store/index';
import * as CaseState from '../../store/Case';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { HealthCareVisit } from '../../store/Case';
import HealthCareVisitItem from './HealthCareVisitItem';
import { defaults } from '../../utils/Global';
import Alert from '../common/Alert';

type HealthCareVisitProps = {
    caseId: number;
    visits: HealthCareVisit[]
} & typeof CaseState.actionCreators;

class HealthCareVisitList extends React.Component<HealthCareVisitProps> {
    state = {
        caseId: defaults.number,
        isLoading: false
    };

    constructor(props: HealthCareVisitProps) {
        super(props);
    }

    public async componentDidMount() {
        this.loadData(this.props.caseId);
    }

    public componentWillReceiveProps(nextProps: HealthCareVisitProps){ 
        if(nextProps.caseId !== this.state.caseId){
            this.loadData(nextProps.caseId);
        }
     }

    private async loadData(caseId: number){
        const { loadHealthCareVisits } = this.props;
        try {
            this.setState({ isLoading: true });
            await loadHealthCareVisits(caseId ? caseId : 0);
        }
        finally {
            this.setState({ 
                isLoading: false, 
                caseId: caseId
            });
        }
    }
    public render() {
        const { isLoading, caseId } = this.state;
        const { visits } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (!visits.length) {
            return <Alert alertType="warning">
                No visits found for Case# {caseId}
            </Alert>;
        }

        return <div className="list-group">
            {visits.map(visit => <HealthCareVisitItem key={visit.id} visit={visit} />)}
        </div>;

        //return <div className="table-responsive">
        //    <table className="table">
        //        <thead>
        //            <tr>
        //                <th>Admit/Visit Date</th>
        //                <th>Other</th>
        //                <th>Onset Date</th>
        //                <th>Time</th>
        //            </tr>
        //        </thead>
        //        <tbody>
        //            {visits.map(visit => <HealthCareVisitItem key={visit.id} visit={visit} />)}
        //        </tbody>
        //    </table>
        //</div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            caseId: state.case.caseDetails.caseId,
            visits: state.case.healthCareVisits
        };
    },
    CaseState.actionCreators
)(HealthCareVisitList);