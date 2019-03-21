import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { SettingInfo } from '../../store/Outbreak';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import Loading from '../common/Loading';
import AddButton from '../common/AddButton';
import SettingList from './SettingList';
import SettingForm from './SettingForm';
import Modal, { ModalWidth } from '../common/Modal';

type SettingInfoProps = {
    settings?: SettingInfo[],
    settingBeingEdited?: SettingInfo,
    errors: any
}
    & typeof OutbreakActions;

class SettingInformation extends React.Component<SettingInfoProps> {

    state = {
        loading: true
    };

    constructor(props: SettingInfoProps) {
        super(props);
    }

    public async componentDidMount() {
        const { loadSettingInfo } = this.props;

        try {
            this.setState({ loading: true });
            console.log(loadSettingInfo);
            await loadSettingInfo();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { settings, settingBeingEdited, createSetting, cancelSettingEdit, errors } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <SettingList settings={settings || []} />
            {settingBeingEdited === undefined && <AddButton className="btn btn-outline-dark" onClick={createSetting} buttonText="Setting" />}
            {settingBeingEdited && <Modal
                visible={true}
                toggle={cancelSettingEdit}
                title="Add Setting"
                modalWidth={ModalWidth.large}
                body={<SettingForm errors={errors} />}
            />}

        </div>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            settings: state.outbreak.settingInfo,
            settingBeingEdited: state.outbreak.settingBeingEdited
        };
    },
    OutbreakActions
)(SettingInformation);
