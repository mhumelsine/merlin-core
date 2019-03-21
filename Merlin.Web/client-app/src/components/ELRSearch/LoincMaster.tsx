import * as React from 'react';
import GenericTable from '../common/GenericTable';
import * as AjaxUtils from '../../utils/AjaxUtils';
import InlineLoader from '../common/InlineLoader';

type Props = {
    observationCode: string
};

type State = {
    loading: boolean,
    loincs: any[]
};

export default class LoincMaster extends React.Component<Props, State> {

    state = {
        loading: false,
        loincs: []
    };

    public async componentWillMount() {
        const { observationCode } = this.props;

        if (!observationCode) {
            return;
        }

        try {
            this.setState({ loading: true });
            const loincs = await AjaxUtils.get(`api/ElrSearch/${observationCode}/loinc`);
            this.setState({ loincs });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { loading, loincs } = this.state;

        return <div>
            {loading && <InlineLoader size="md" color="primary" center={true} />}
            {!loading && <GenericTable items={loincs} />}
        </div>;
    }
}
