import * as React from 'react';
import { connect } from 'react-redux';
import { SettingInfo } from '../../store/Outbreak';
import { FaTimesCircle, FaEdit } from 'react-icons/fa/index';
import * as utils from '../../utils/Global';
import AddressInline from '../common/AddressInline';
import { ApplicationState } from '../../store/index';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import DeleteButton from '../common/DeleteButton';

type SettingListItemProps = {
    setting: SettingInfo
}
    & typeof OutbreakActions;

class SettingListItem extends React.Component<SettingListItemProps>{

    constructor(props: SettingListItemProps) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    private onEdit(event: any) {
        this.props.selectSettingEdit(event.currentTarget.name);
    }

    private onDelete(event: any) {
        this.props.deleteSetting(event.currentTarget.name);
    }

    public render() {

        const { setting } = this.props;   

        return <tr key={setting.id}>
            <td data-title="ID">{setting.id}</td>
            <td data-title="Name">{setting.settingName}</td>
            <td data-title="Primary">{setting.isPrimary ? 'YES' : 'NO'}</td>
            <td data-title="Type">{setting.settingType}</td>
            <td data-title="Other Type">{setting.otherType}</td>
            <td data-title="Address"><AddressInline {...setting.address} /></td>
            <td className="d-flex justify-content-end">
                <button
                    name={setting.id}
                    type="button"
                    title="Edit"
                    className="btn btn-outline-primary btn-round mr-1"
                    onClick={this.onEdit}
                >
                    <FaEdit fontSize={utils.defaults.iconSize} />
                    <span className="sr-only">Edit</span>
                </button>
                <DeleteButton
                    name={setting.id}
                    className="btn btn-outline-danger btn-round"
                    onClick={this.onDelete}
                    disabled={setting.isPrimary}
                />
            </td>
        </tr>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
        };
    },
    OutbreakActions
)(SettingListItem);