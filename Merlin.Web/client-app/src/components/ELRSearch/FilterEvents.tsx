import * as React from 'react';
import GenericTable from '../common/GenericTable';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';

type Props = {
    eventId: number
};

type State = {
    loading: boolean,
    events: any[],
    details: any[],
    outcomes: any[]
};

export default class FilterEvents extends React.Component<Props, State> {

    state = {
        loading: false,
        events: [],
        details: [],
        outcomes: []
    };

    public async componentWillMount() {
        const { eventId } = this.props;

        if (!eventId) {
            return;
        }

        try {
            this.setState({ loading: true });

            const events = AjaxUtils.get(`api/ElrSearch/${eventId}/filter-event`);
            const details = AjaxUtils.get(`api/ElrSearch/${eventId}/filter-detail`);
            const outcomes = AjaxUtils.get(`api/ElrSearch/${eventId}/filter-outcome`);

            this.setState({
                events: await events,
                details: await details,
                outcomes: await outcomes
            });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { loading, events, details, outcomes } = this.state;

        if (loading) {
            return <InlineLoader size="md" color="primary" center={true} />;
        }

        return <div className="p-2">
            <h4 className="bg-dark text-white mb-0 p-1 pl-2 rounded-top">Event</h4>
            <GenericTable items={events} />
            <div className="row mt-2">
                <div className="col-md-6">
                    <h4 className="bg-dark text-white mb-0 p-1 pl-2 rounded-top">Rules</h4>
                    <GenericTable items={details} />
                </div>
                <div className="col-md-6">
                    <h4 className="bg-dark text-white mb-0 p-1 pl-2 rounded-top">Outcomes</h4>
                    <GenericTable items={outcomes} />
                </div>
            </div>
        </div>;
    }
}
