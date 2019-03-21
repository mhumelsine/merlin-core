import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as Session from '../store/Session'
import Loading from './common/Loading';
import Alert from './common/Alert';

type SessionLoaderProps = Session.SessionState
    & typeof Session.actionCreators;

const pollingInterval = 1000 * 30; //30 seconds

class SessionLoader extends React.Component<SessionLoaderProps> {
    state = {
        interval: undefined
    }

    public async componentWillMount() {
        const { refreshToken } = this.props;

        try {
            this.setState({ isLoading: true });
            await refreshToken();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.setState({ isLoading: false });
        }

        const interval = setInterval(refreshToken, pollingInterval);

        this.setState({ interval });
    }

    public componentWillUnmount() {
        const { interval } = this.state;

        clearInterval(interval);
    }

    public render() {

        const { expired, children } = this.props;

        if (expired) {
            return <Loading />
        }

        return <div>
            {children}
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => state.session,
    Session.actionCreators
)(SessionLoader);
