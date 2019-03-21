import * as React from 'react';
import { ApplicationState } from '../../store/index';
import * as CaseState from '../../store/Case';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { EpiLink } from '../../store/Case';
import EpiLinkItem from './EpiLinkItem';
import { defaults } from '../../utils/Global';
import Alert from '../common/Alert';

type EpiLinksProps = {
    caseId: number;
    epiLinks: EpiLink[];
} & typeof CaseState.actionCreators;

class EpiLinks extends React.Component<EpiLinksProps> {
    state = {
        caseId: defaults.number,
        isLoading: false
    };

    constructor(props: EpiLinksProps) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: EpiLinksProps) {
        if (nextProps.caseId !== this.state.caseId) {
            this.loadData(nextProps.caseId);
        }
     }

    public async componentDidMount() {
        this.loadData(this.props.caseId);
    }

    public render() {
        const { isLoading, caseId} = this.state;
        const { epiLinks } = this.props;

        if (isLoading) {
            return <Loading />;
        }

        if (!epiLinks.length) {
            return <Alert alertType="warning">
                No epiLinks found for Case# {caseId}
            </Alert>;
        }
		      return <div className="table-responsive-container">
			<div className="table-responsive">
				<table className="table table-striped table-hover table-mobile-compact">
					<thead>
						<tr>
							<th>Relationship Type</th>
							<th>Name</th>
							<th>Case #</th>
							<th>DX Status</th>
							<th>FL Disease Code</th>
							<th>Event Date</th>
						</tr>
					</thead>
					<tbody>
						{epiLinks.map(epiLink => <EpiLinkItem key={epiLink.profileId} epiLink={epiLink} />)}
					</tbody>
				</table>
			</div>
		</div>;
    }

    private async loadData(caseId: number) {
        const { loadEpiLinksForCase } = this.props;
        try {
            this.setState({ isLoading: true });
            await loadEpiLinksForCase(caseId ? caseId : 0);
        }
        finally {
            this.setState(
                {
                    isLoading: false,
                    caseId: caseId
                });
        }
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            caseId: state.case.caseDetails.caseId,
            epiLinks: state.case.epiLinks
        };
    },
    CaseState.actionCreators
)(EpiLinks);
