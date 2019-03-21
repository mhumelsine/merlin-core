import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { CodeType, actionCreators as CodeActions, Codes } from '../../store/Code';
import { actionCreators as OutbreakActions, Results as ObResults } from '../../store/Outbreak';
import TotalCasesResults from './TotalCasesResults';
import StaffResults from './StaffResults';
import Loading from '../common/Loading';

type Props = {
    errors: any,
    results?: ObResults
}
    & typeof OutbreakActions
    & typeof CodeActions;

type State = {
    loading: boolean
};

class Results extends React.Component<Props, State> {

    state = {
        loading: true,
    };

    constructor(props: Props) {
        super(props);
    }

    public async componentDidMount() {
        const { loadResults, loadDropdown } = this.props;
        try {
            this.setState({ loading: true });
            await loadResults();
            await loadDropdown(CodeType.outbreakCaseType);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { loading } = this.state;
        const { errors } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <div className="row">
            <div className="col-md-6">
                <TotalCasesResults errors={errors} />
            </div>
            <div className="col-md-6">
                <StaffResults errors={errors} />
            </div>
        </div>;

    }
}
export default connect(
    (state: ApplicationState) => {
        return {
        };
    },
    Object.assign(OutbreakActions, CodeActions)
)(Results);
