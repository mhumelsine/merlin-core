import * as React from 'react';
import * as SurveyStore from '../../store/SurveySearch';
import { defaults } from '../../utils/Global';
import CollapsibleCard from '../common/CollapsibleCard';

type SurveyListItemProps = {
    index: any;
    survey: SurveyStore.Survey
};

export default class SurveyListItem extends React.Component<SurveyListItemProps, {}> {
    state = {
        isExpanded: defaults.boolean,
        surveys: [{}]
    };

    constructor(props: SurveyListItemProps) {
        super(props);

        this.toggleExpand = this.toggleExpand.bind(this);
    }

    public componentWillReceiveProps(nextProps: SurveyListItemProps) {
        if (nextProps.survey.surveyHistory != this.state.surveys) {
            this.setState({ isExpanded: false });
        }
    }

    public toggleExpand() {
        const { survey } = this.props;
        this.setState(
            {
                isExpanded: !this.state.isExpanded,
                surveys: survey.surveyHistory
            });
    }

    public render() {
        const { survey } = this.props;
        const { isExpanded } = this.state;
        const { urls } = defaults;

        return <div>
            <CollapsibleCard
                heading={<span>{`${survey.name}`}</span>}
                initiallyCollapsed={true}
                body={
                    <ul className="list-group">
                        <li key={0} className="list-group-item"> Survey Type: <b>{survey.surveyType}</b> <div className="pull-right">Survey Id: <b>{survey.surveyIdNumber}</b></div></li>
                        {survey.icd9 &&
                            <li key={1} className="list-group-item">FL disease code: <b>{survey.icd9}-{survey.icd9Description}</b></li>}
                        {survey.outbreakId &&
                            <li key={11} className="list-group-item">Outbreak: <b>{survey.outbreakDescription}-{survey.outbreakId}</b></li>}
                        <li key={2} className="list-group-item">Layout: <b>{survey.layoutDescription}</b></li>
                        <li key={3} className="list-group-item">Effective Date: <b>{survey.effectiveDate}</b></li>
                    </ul>
                }
            />

            {/* <div onClick={this.toggleExpand}>
                { isExpanded ? <FaMinusSquareO fontSize={30} /> : <FaPlusSquareO  fontSize={30} />}
            </div>
             {isExpanded &&
                <SurveyListHistory
                     survey={survey}
                /> */}
        </div>;
    }
}
