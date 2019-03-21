import * as React from 'react';
import { SettingInfo } from '../../store/Outbreak';
import SettingListItem from './SettingListItem';
import Alert from '../common/Alert';
import { FaExclamationTriangle } from 'react-icons/fa/index';

interface SettingListProps {
    settings: SettingInfo[];
}

export default class SettingList extends React.Component<SettingListProps> {

    public render() {

        const { settings } = this.props;
        const hasSettings = settings && settings.length > 0;

        if (hasSettings) {

            return <div className="table-responsive">
                <table className="table table-striped table-hover table-mobile-compact">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Setting Name</th>
                            <th>Primary</th>
                            <th>Setting Type</th>
                            <th>Other Setting Type</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {settings.map(setting => <SettingListItem key={setting.id} setting={setting} />)}
                    </tbody>
                </table>
            </div>;
        } else {
            return <Alert alertType="warning"><FaExclamationTriangle /> No settings to show</Alert>;
        }
    }
}
