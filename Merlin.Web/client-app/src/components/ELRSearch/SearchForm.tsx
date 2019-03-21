import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as ElrSearchActions, BasicSearch, SearchCriteria } from '../../store/ELRSearch';
import TextInput from '../common/TextInput';
import CustomDatePicker from '../common/CustomDatePicker';
import SearchButton from '../common/SearchButton';
import AdvancedSearch from './AdvancedSearch';
import { FaEraser, FaPlus } from 'react-icons/fa';
import { defaults } from '../../utils/Global';
import ButtonRadio from '../common/ButtonRadio';
import TemplateDropdown from './TemplateDropdown';
import TemplateInfoBar from './TemplateInfoBar';
import Secure from '../common/Secure';
import { ClaimType, Role } from '../../store/Session';


type SearchFormProps = {
    basicSearch?: BasicSearch;
    advancedExpressions?: SearchCriteria[];
    onSubmit: (e: any) => void;
} & typeof ElrSearchActions;

class SearchForm extends React.Component<SearchFormProps>{

    state = {
        error: {}
    };

    constructor(props: SearchFormProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    public onChange(name: string, value: any) {
        const basicSearch = Object.assign({}, this.props.basicSearch) as any;

        basicSearch[name] = value;

        this.props.updateBasicSearch(basicSearch);
    }

    public render() {
        const { basicSearch, onSubmit, clearSearch, addCriteria } = this.props;
        const iconsize = 18;

        if (basicSearch === undefined) {
            return null;
        }

        return <form onSubmit={onSubmit}>
            <div className="row">
                <TextInput
                    name='patientLastName'
                    label='Last Name'
                    value={basicSearch.patientLastName}
                    hideLabel={false}
                    cols={3}
                    onChange={this.onChange}
                />
                <TextInput
                    name='patientFirstName'
                    label='First Name'
                    value={basicSearch.patientFirstName}
                    hideLabel={false}
                    cols={3}
                    onChange={this.onChange}
                />
                <CustomDatePicker
                    name='patientDOB'
                    label='Date of Birth'
                    hideLabel={false}
                    value={basicSearch.patientDOB}
                    cols={2}
                    onChange={this.onChange}
                    isReadOnly={false}
                />
                <ButtonRadio
                    name="pageSize"
                    label="Number of Results"
                    value={basicSearch.pageSize}
                    cols={4}
                    onChange={this.onChange}
                    options={[
                        { label: '25', value: '25' },
                        { label: '50', value: '50' },
                        { label: '100', value: '100' },
                        { label: '200', value: '200' }
                    ]}
                />
            </div>
            <div className="row">
                <TextInput
                    name='specimenID'
                    label='Accession #'
                    value={basicSearch.specimenID}
                    hideLabel={false}
                    cols={6}
                    onChange={this.onChange}
                /> 
                <Secure requireClaim={ClaimType.role} requireClaimValue={[Role.Admin]}>
                    <TemplateDropdown />
                </Secure>
            </div>
            <hr />
            <TemplateInfoBar />
            <AdvancedSearch />
            <div className="row">
                <div className="col-md-12 text-right">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-link text-capitalize" type='button' onClick={addCriteria}>
                            <FaPlus fontSize={8} /> Add Search Criteria
                        </button>
                        <div>
                            <SearchButton isSubmit={true} iconFontSize={iconsize} className={"btn-primary"} />
                            {" "}
                            <button className={'btn btn-outline-dark'} type="button" onClick={clearSearch} >
                                {<FaEraser fontSize={iconsize} style={{ verticalAlign: 'bottom' }} />} Clear
                            </button>                            
                        </div>
                    </div>
                </div>
            </div>

        </form>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            basicSearch: state.elrSearch.basicSearch
        };
    },
    ElrSearchActions
)(SearchForm);
