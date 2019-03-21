import * as React from 'react';
import GenericTable from '../common/GenericTable';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';

type Props = {
    observationKey: number
};

type State = {
    loading: boolean,
    history: any[]
};

export default class ProcessingHistory extends React.Component<Props, State> {

    state = {
        loading: false,
        history: []
    }

    public async componentWillMount() {
        const { observationKey } = this.props;

        try {
            this.setState({ loading: true });
            const history = await AjaxUtils.get(`api/ElrSearch/${observationKey}/history`);
            this.setState({ history });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { loading, history } = this.state;

        return <div>
            {loading && <InlineLoader size="md" color="primary" center={true} />}
            {!loading && <GenericTable items={history} />}
        </div>;
    }
}