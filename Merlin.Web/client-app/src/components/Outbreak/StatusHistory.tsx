import * as React from 'react';
import StatusHistoryItem from './StatusHistoryItem';
import * as AjaxUtils from '../../utils/AjaxUtils';
import Alert from '../common/Alert';
import { FaExclamationTriangle } from 'react-icons/fa/index';

import InlineLoader from '../common/InlineLoader';
import ErrorSummary from '../common/ErrorSummary';
import Loading from '../common/Loading';
import { RouteComponentProps } from 'react-router-dom';
// Can be anywhere so no routing


type Props = {
    outbreakId: number
};
// Hint:  I would add a boolean loading flag and an errors object to the component state.
// Set loading before and after the Ajax call and errors if code enters the catch block.
// Update the render method to use the newly added state to show the loading spinner and error summary.
type State = {
    loading: boolean,
    errors: any,
    statusHistoryList: any[]
};



export default class StatusHistory extends React.Component<Props, State> {
    state = {
        loading: false,
        errors: {} as any,
        statusHistoryList: [] as any[]
    };

    // component is on the screen, in the dom
    public async componentDidMount() {
        try {
            this.setState({ loading: true });
            let data = await AjaxUtils.get(`api/outbreak/${this.props.outbreakId}/status-history`);
            this.setState({
                statusHistoryList: data // await data ?
            });
        } catch (errors) {
            this.setState({ errors });
        } finally {
            this.setState({ loading: false });
        }
   }

    public render() {
        const { loading, errors, statusHistoryList } = this.state;
        if (loading) {
            return <Loading />;
        }
        if (statusHistoryList.length === 0) {
            return <Alert alertType="info"><FaExclamationTriangle /> No status history found</Alert>;
        }
        return (
            <div>
                <ErrorSummary errors={errors} />

                <div className="table-responsive">
                    <table className="table table-striped table-hover table-mobile-compact">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Review Status</th>
                                <th>Reason</th>
                                <th>County</th>
                                <th>Date</th>
                                <th>User ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statusHistoryList.map((row, index) => <StatusHistoryItem
                                key={index}
                                status={row.status}
                                reviewStatus={row.reviewStatus}
                                reason={row.reason}
                                county={row.county}
                                date={row.date}
                                userId={row.userId}
                            />
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
