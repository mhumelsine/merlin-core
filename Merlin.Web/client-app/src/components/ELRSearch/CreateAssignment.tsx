import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators as ELRSearchActions,Details } from '../../store/ELRSearch';
import { actionCreators as CodeActions, CodeType, Codes } from '../../store/Code';
import { ApplicationState } from '../../store/index';
import TextInput, { TextInputWithAddOn } from '../common/TextInput';
import SaveCancelButton from '../common/SaveCancelButton';
import Dropdown from '../common/Dropdown';
import { getOptions, isNullOrEmpty } from '../../utils/UIUtils';
import ErrorSummary from '../common/ErrorSummary';
import { NumberWithAddOn } from '../common/NumberInput';
import * as AjaxUtils from '../../utils/AjaxUtils';
import Loading from '../common/Loading';
import SearchButton from '../common/SearchButton';
import GenericTable from '../common/GenericTable';
import * as global from '../../utils/Global';
import StatenoProfileIdSearch from './StatenoProfileIdSearch';
import { toast } from 'react-toastify';

type Props = {
    selectedObservationKeys: number[];
    closeOnClick: () => any;
    county: string;
    codes: Codes
} & typeof CodeActions
    & typeof ELRSearchActions;

type State = {
    profileId: string,
    stateno: string,
    assignmentType: string,
    assignmentReason: string,
    county:string,
    loading: boolean,
    searching: boolean,
    profile: any,
    errors: any
}
class AssignElr extends React.Component<Props, State>{

    state = {
        profileId: "",
        stateno: "",
        assignmentType: "",
        assignmentReason: "",
        county:"",
        loading: false,
        searching: false,
        profile: undefined,
        errors: {} as any
    };

    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onError = this.onError.bind(this);
    }

    public async componentWillMount() {
        try {
            await this.props.loadDropdown(CodeType.AssignmentType);
            await this.props.loadDropdown(CodeType.counties);
            this.setState({ county: this.props.county });
        } catch (e) {
            this.setState({ errors: e });
        }
    }

    public async onSave(e: any) {
        e.preventDefault();
        const { clearSelectedObservations, closeOnClick, selectedObservationKeys } = this.props;
        const { profileId, stateno, assignmentType, assignmentReason,county } = this.state;

        this.setState({ loading: true });
        
        try {
            await AjaxUtils.post(`api/elrsearch/force-assignment`, {
                profileId,
                stateno,
                assignmentType,
                assignmentReason,
                observationKeys: selectedObservationKeys,
                county
            });

            toast.success('Save Successful.');

            clearSelectedObservations();
            closeOnClick();

        } catch (errors) {
            this.setState({ errors });
        } finally {
            this.setState({ loading: false });
        }
    }

    private onChange(name: string, value: any) {
        const state = Object.assign({}, this.state) as any;

        state[name] = value;

        this.setState(state);
    }

    private onError(errors: any) {
        this.setState({ errors });
    }

    public render() {
        const { closeOnClick, codes } = this.props;
        const { profileId, stateno, assignmentType, assignmentReason, errors, loading, county } = this.state;
        
        return <form onSubmit={this.onSave}>
            {loading && <Loading />}

            <ErrorSummary errors={errors} />

            <div className="row">
                <Dropdown
                    cols={6}
                    label="Assignment Type"
                    name="assignmentType"
                    value={assignmentType}
                    options={getOptions(codes.ASSIGNMENT_TYPE)}
                    placeholder={""}
                    onChange={this.onChange}
                    isMulti={false}
                    isReadOnly={false}
                    error={errors.assignmentType}
                />

                <TextInput
                    name="assignmentReason"
                    value={assignmentReason}
                    label="Assignment Reason"
                    hideLabel={false}
                    placeholder=""
                    cols={6}
                    isReadOnly={false}
                    onChange={this.onChange}
                    error={errors.assignmentReason}
                />
            </div>

            <StatenoProfileIdSearch
                errors={errors}
                profileId={profileId}
                stateno={stateno}
                onError={this.onError}
                onChange={this.onChange}
            />
            <div className="row">
                <Dropdown
                    cols={6}
                    label="County"
                    name="county"
                    value={county}
                    options={getOptions(codes.COUNTIES)}
                    placeholder={""}
                    onChange={this.onChange}
                    isMulti={false}
                    isReadOnly={false}
                />               
            </div>

            <div className="text-right">
                <SaveCancelButton cancelOnClick={closeOnClick} saveDisabled={loading} saveButtonText={loading ? 'Saving...' : 'Save'} />
            </div>
        </form>
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            selectedObservationKeys: state.elrSearch.selectedObservationKeys,
            codes: state.codes.codes,
            county:state.elrSearch.county.map(c =>c.county)[0]
        };
    },
    Object.assign({}, CodeActions, ELRSearchActions)
)(AssignElr);