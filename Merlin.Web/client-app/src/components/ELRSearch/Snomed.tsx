import * as React from 'react';
import GenericTable from '../common/GenericTable';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';

type Props = {
    resultCode: string
};

type State = {
    loading: boolean,
    snomeds: any[]
};

export default class Snomed extends React.Component<Props, State> {

    state = {
        loading: false,
        snomeds: []
    }

    public async componentWillMount() {
        const { resultCode } = this.props;

        if (!resultCode) {
            return;
        }

        try {
            this.setState({ loading: true });
            const snomeds = await AjaxUtils.get(`api/ElrSearch/${resultCode}/snomed`);
            this.setState({ snomeds });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { loading, snomeds } = this.state;

        return <div>
            {loading && <InlineLoader size="md" color="primary" center={true} />}
            {!loading && <GenericTable items={snomeds} />}
        </div>;
    }
}