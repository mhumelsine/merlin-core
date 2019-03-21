import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import Loading from '../common/Loading';
import { actionCreators as SmartGoalsActions } from '../../store/SmartGoals';
import SmartGoalsSearch from './SmartGoalsSearch';
import SmartGoalsResults from './SmartGoalsResults';
import { toast } from 'react-toastify';

type State =
    {
        loading: boolean;
    };

type SmartGoalsPageProps = {

} & typeof SmartGoalsActions;

class SmartGoalsPage extends React.Component<SmartGoalsPageProps , State> {

    state = {
        loading: false,
    };

    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onSubmit(e: any) {
        e.preventDefault();
        try {
            await this.props.loadPerformanceResults();

        } catch (error) {
            this.props.clearPerformanceInfo();

            if (Object.keys(error).length > 0) {
                Object.keys(error).map(key => error[key].map((error: string) => toast.error(error)));
            }
        } 
    }

    public render() {

        const {loading } = this.state;
      
        if (loading) {
            return <Loading />;
        }

        return <div className='container-fluid'>
            <h1>Performance</h1>
            <SmartGoalsSearch onSubmit={this.onSubmit} />
            <hr />
            {loading && <Loading />}
            {!loading && <SmartGoalsResults />}
        </div>
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
        }
    },
    SmartGoalsActions
)(SmartGoalsPage);

