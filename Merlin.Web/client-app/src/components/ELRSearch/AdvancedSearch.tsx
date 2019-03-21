import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators, SearchCriteria } from '../../store/ELRSearch';
import { ApplicationState } from '../../store/index';
import { FaPlus } from 'react-icons/fa';
import Loading from '../common/Loading';
import AdvancedSearchCriteria from './AdvancedSearchCriteria';

type AdvancedSearchProps = {
    advancedCriteria: SearchCriteria[];
}
    & typeof actionCreators;

class AdvancedSearch extends React.Component<AdvancedSearchProps> {

    state = {
        loading: false
    };

    public async componentDidMount() {
        const { loadColumnInfo } = this.props;

        try {
            this.setState({ loading: true });
            await loadColumnInfo();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { advancedCriteria } = this.props;

        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        return <div>
            {advancedCriteria.map(criteria => <AdvancedSearchCriteria key={criteria.id} criteria={criteria} />)}
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {advancedCriteria: state.elrSearch.advancedCriteria};
    },
    actionCreators)(AdvancedSearch);
