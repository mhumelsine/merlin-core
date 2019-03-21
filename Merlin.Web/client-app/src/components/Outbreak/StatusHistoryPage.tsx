import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import StatusHistory from './StatusHistory';


type Props = {

} & RouteComponentProps<any>;

export default class StatusHistoryPage extends React.Component<Props> {
    render() {
        const { outbreakId } = this.props.match.params;
        return <StatusHistory outbreakId={(outbreakId)} />;
    }
}
