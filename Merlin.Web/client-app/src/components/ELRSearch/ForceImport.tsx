import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators as ELRSearchActions, Details } from '../../store/ELRSearch';
import { ApplicationState } from '../../store/index';
import { TextInputWithAddOn } from '../common/TextInput';
import SaveCancelButton from '../common/SaveCancelButton';
import { NumberWithAddOn } from '../common/NumberInput';
import ErrorSummary from '../common/ErrorSummary';
import * as AjaxUtils from '../../utils/AjaxUtils';
import Loading from '../common/Loading';
import SearchButton from '../common/SearchButton';
import GenericTable from '../common/GenericTable';
import { int32, defaults } from '../../utils/Global';
import { FaCheckCircle } from 'react-icons/fa';
import StatenoProfileIdSearch from './StatenoProfileIdSearch';
import { toast } from 'react-toastify';

type Props = {
    selectedObservationKeys: number[];
    closeOnClick: () => any;
}
    & typeof ELRSearchActions;

type State = {
    profileId: string,
    stateno: string,
    loading: boolean,
    searching: boolean,
    profile: any,
    errors: any
}

class ForceImport extends React.Component<Props, State>{
    state = {
        profileId: "",
        stateno: "",
        loading: false,
        profile: undefined,
        searching: false,
        errors: {} as any
    };

    constructor(props: Props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onError = this.onError.bind(this);
    }

    public onChange(name: string, value: any) {

        const state = Object.assign({}, this.state) as any;

        state[name] = value;

        this.setState(state);
    }

    public async onSave(e: React.FormEvent) {
        e.preventDefault();

        const { profileId, stateno } = this.state;
        const { closeOnClick, clearSelectedObservations } = this.props;

        this.setState({ loading: true });

        try {
            await AjaxUtils.post(`api/elrsearch/force-import`,
                {
                    stateno,
                    profileId,
                    observationKeys: this.props.selectedObservationKeys
                }
            );

            toast.success('Save Successful.');

            clearSelectedObservations();
            closeOnClick();

        } catch (errors) {
            this.setState({ errors });
        } finally {
            this.setState({ loading: false });
        }
    }

    private onError(errors: any) {
        this.setState({ errors });
    }


    public render() {

        const { closeOnClick } = this.props;
        const { profileId, stateno, errors, loading, searching, profile } = this.state;

        return <form onSubmit={this.onSave}>
            {loading && <Loading />}

            <ErrorSummary errors={errors} />

            <StatenoProfileIdSearch
                errors={errors}
                profileId={profileId}
                stateno={stateno}
                onError={this.onError}
                onChange={this.onChange}
            />

            <div className="text-right">
                <SaveCancelButton
                    cancelOnClick={closeOnClick}
                    saveDisabled={loading}
                    saveButtonText={loading ? 'Saving...' : 'Save'}
                />
            </div>
        </form>
    }
}

export default connect(
    (state: ApplicationState) => {
        return { selectedObservationKeys: state.elrSearch.selectedObservationKeys };
    },
    ELRSearchActions)(ForceImport);