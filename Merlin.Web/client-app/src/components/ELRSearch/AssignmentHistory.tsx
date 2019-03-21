import * as React from 'react';
import GenericTable from '../common/GenericTable';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';

type Props = {
    familyId: number
};

type State = {
    loading: boolean,
    history: any[]
};

export default class AssignmentHistory extends React.Component<Props, State> {

    state = {
        loading: false,
        history: []
    };

    public async componentWillMount() {
        const { familyId } = this.props;

        if (!familyId) {
            return;
        }

        try {
            this.setState({ loading: true });
            const history = await AjaxUtils.get(`api/ElrSearch/${familyId}/assignment-history`);
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
