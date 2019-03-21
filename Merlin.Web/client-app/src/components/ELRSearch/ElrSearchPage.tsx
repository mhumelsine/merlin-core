import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as ElrSearchActions } from '../../store/ELRSearch';
import { defaults } from '../../utils/Global';
import SearchResultsTable from './SearchResultsTable';
import Loading from '../common/Loading';
import ErrorSummary from '../common/ErrorSummary';
import SearchForm from './SearchForm';

type ELRSearchPageProps =
    {

    }
    & typeof ElrSearchActions;    

class ELRSearchPage extends React.Component<ELRSearchPageProps> {

    state = {
        loading: false,
        errors: {} as any
    };

    constructor(props: any) {
        super(props);        
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    private async onSubmit(e: any) {
        e.preventDefault(); 

        try {
            this.setState({ loading: true });
            const errors = await this.props.search() as any;
            this.props.clearSelectedObservations();

            //replace criteria with empty string since there is no criteria field
            if (errors.criteria) {
                errors[""] = errors.criteria;
            }

            this.setState({ errors });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { errors, loading } = this.state;

        return <div className='container-fluid'>
            <h1>ELR Search</h1>
            <ErrorSummary errors={errors} />
            <SearchForm onSubmit={this.onSubmit} />
            {loading && <Loading />}
            {!loading && <SearchResultsTable />}
        </div>
    }
}

export default connect(
    (state: ApplicationState) => {
        return {} },
    ElrSearchActions
)(ELRSearchPage);


