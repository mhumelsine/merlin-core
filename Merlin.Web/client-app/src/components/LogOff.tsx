import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as Session from '../store/Session';
import Loading from './common/Loading';

type LogOffProps =  Session.SessionState
	& typeof Session.actionCreators
	& RouteComponentProps<{}>;

class LogOff extends React.Component<LogOffProps> {
	state = {
		isLoading: false
	};

	public async componentWillMount() {
		try {
			this.setState({ isLoading: true });

			await this.props.logOff();
		} catch (err) {
			console.log(err);
		}
		finally {
			this.setState({ isLoading: false });
		}
	}

	public render() {

		if (this.state.isLoading) {
			return <Loading />;
		}

		return <Redirect to="/"/>;
	}
}
export default connect(
	(state: ApplicationState) => state.session,
	Session.actionCreators
)(LogOff);
