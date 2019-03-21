import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import GenericTable from '../common/GenericTable';
import Loading from '../common/Loading';

type OutbreakLabListProps = {
    labs: any[]
}
    & typeof OutbreakActions;

class OutbreakLabList extends React.Component<OutbreakLabListProps> {
    state = {
        loading: false
    };
    public async componentDidMount() {
        const { loadOutbreakLabList } = this.props;

        try {
            this.setState({ loading: true });
            await loadOutbreakLabList();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { loading } = this.state;
        const { labs } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <GenericTable items={labs} />;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            labs: state.outbreak.outbreakLabList
        };
    },
    OutbreakActions
)(OutbreakLabList);
