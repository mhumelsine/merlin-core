import * as React from 'react';
import { ApplicationState } from '../../store/index';
import * as CaseState from '../../store/Case';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import SymptomItem from './SymptomItem';
import { CaseSymptom } from '../../store/Case';
import { defaults } from '../../utils/Global';
import Alert from '../common/Alert';

type SymptomProps = {
    caseId: number;
    symptoms: CaseSymptom[];
} & typeof CaseState.actionCreators;

class Symptoms extends React.Component<SymptomProps> {
    state = {
        caseId: defaults.number,
        isLoading: false
    };

    constructor(props: SymptomProps) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: SymptomProps){ 
        if(nextProps.caseId !== this.state.caseId){
            this.loadData(nextProps.caseId);
        }
     }

    public async componentDidMount() {
        this.loadData(this.props.caseId);
    }

    private async loadData(caseId: number){
        const { loadSymptomsForCase } = this.props;
        try {
            this.setState({ isLoading: true });
            await loadSymptomsForCase(caseId ? caseId : 0);
        }
        finally {
            this.setState(
                { 
                    isLoading: false, 
                    caseId: caseId
                });
        }
    }

    public render() {

        const { isLoading, caseId } = this.state;
        const { symptoms } = this.props;

        if (isLoading) {
            return <Loading />;
        }
        if (!symptoms.length) {
            return <Alert alertType="warning">
                No Symptoms found for Case# {caseId}
            </Alert>;
        }

        return <div className="table-responsive-container">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-mobile-compact">
                        <thead>
                            <tr>
                                <th>Symptom</th>
                                <th>Other</th>
                                <th>Onset Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>                    
                        <tbody>
                                {symptoms.map(symptom => <SymptomItem key={symptom.symptomCode} symptom={symptom} />)}
                        </tbody>
                    </table>
                </div>
            </div>;       
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            symptoms: state.case.symptoms,
            caseId: state.case.caseDetails.caseId
        };
    },
    CaseState.actionCreators
)(Symptoms);