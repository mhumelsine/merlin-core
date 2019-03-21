import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators as OutbreakActions, AuditInfo as OutbreakAuditInfo } from '../../store/Outbreak';
import { ApplicationState } from '../../store/index';
import StaticInput from '../common/StaticInput';

type AuditInfoProps = {
    auditInfo: OutbreakAuditInfo
}
    & typeof OutbreakActions;

class AuditInfo extends React.Component<AuditInfoProps> {
    state = {
        loading: true
    };
    constructor(props: AuditInfoProps) {
        super(props);
    }

    public async componentDidMount() {
        try {
            this.setState({ loading: true });
            await this.props.loadAuditInfo();
        } catch (err) {

        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { auditInfo } = this.props;

        return <div className="row">
            <StaticInput
                name="createdBy"
                label="Created By"
                value={auditInfo.createdBy}
                cols={3}
            />
            <StaticInput
                name="createdOn"
                label="Created On"
                value={auditInfo.createdOn}
                cols={3}
            />
            <StaticInput
                name="modifiedBy"
                label="Modified By"
                value={auditInfo.modifiedBy}
                cols={3}
            />
            <StaticInput
                name="modifiedOn"
                label="Modified On"
                value={auditInfo.modifiedOn}
                cols={3}
            />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            auditInfo: state.outbreak.auditInfo
        };
    },
    OutbreakActions
)(AuditInfo);
