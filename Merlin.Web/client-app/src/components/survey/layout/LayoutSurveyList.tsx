import * as React from 'react';
import { connect } from 'react-redux';
import CollapsibleCard from '../../common/CollapsibleCard';
import { ApplicationState } from '../../../store/index';
import { Layout, actionCreators } from '../../../store/Layout';
import Loading from '../../common/Loading';
import { Survey } from '../../../store/SurveySearch';

type LayoutSurveyListProps = {
    layout: Layout,
    initiallyCollapsed: boolean
} ;

export default class LayoutSurveyList extends React.Component<LayoutSurveyListProps> {
    public render() {
        const { layout, initiallyCollapsed } = this.props;

        if (!layout) {
            return <Loading />;
        }
        return <CollapsibleCard
            heading={<span>{`Surveys `}<span className="badge badge-pill badge-light">{layout.surveys.length}</span></span>}
            initiallyCollapsed={initiallyCollapsed}
            body={
                <ul className="list-group">
					{layout.surveys && layout.surveys.map((survey: any, index: number) => <li key={survey.surveyId || index} className="list-group-item">
						<h3>{survey.surveyName}</h3>
                        <dl className="mb-0">
							{survey.icd9 &&
								<div>
									<dt>FL Disease Code</dt>
									<dd>{`${survey.icd9} - ${survey.diseaseName}`}</dd>
								</div>
							}
							{survey.outbreakId &&
								<div>
									<dt>Outbreak Name</dt>
									<dd>{`${survey.outbreakName} - ${survey.outbreakId}`}</dd>
								</div>
							}
							<dt>Effective Date</dt>
							<dd>{survey.effectiveDate}</dd>
						</dl>
                    </li>)}
                </ul>
            }
        />;
    }
}
