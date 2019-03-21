import * as React from 'react';
// Can be anywhere so no routing


type Props = {
    status: string
    reviewStatus: string
    reason: string
    date: string
    userId: string
    county: string
}

export default class StatusHistoryItem extends React.Component<Props>{
    public render() {
        const { status, reviewStatus, reason, date, userId, county } = this.props;
        return (
            <tr>
                <td>{status}</td>
                <td>{reviewStatus}</td>
                <td>{reason}</td>
                <td>{date}</td>
                <td>{userId}</td>
                <td>{county}</td>
            </tr>
        );
    }
}