import * as React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import * as SurveyStore from '../../../store/SurveySearch';
import * as CodeStore from '../../../store/Code';
import Loading from '../../common/Loading';
import SurveyList from '.././SurveyList';
import SurveySearchForm from '.././SurveySearchForm';
import { ChangeEvent } from 'react';
import { defaults } from '../../../utils/Global';
import QuestionSearch from './QuestionSearch';
import BackButton from '../../common/BackButton';
import { FaArrowLeft } from 'react-icons/fa';

type QuestionManagerProps =
    RouteComponentProps<{}>;

export default class QuestionManager extends React.Component<QuestionManagerProps, {}> {
    constructor(props: QuestionManagerProps) {
        super(props);
    }

    public componentDidMount() {
        document.title = defaults.titles.QuestionManager
    }

    public render() {
        const { history } = this.props;

        const layoutId = (this.props.match.params as any).layoutId;

        return <div>
            <h1 className="display1">Question Manager</h1>
            <br />
            <QuestionSearch history={history} isInManageMode={true} layoutId={layoutId}/>
            <br />
                {layoutId &&
				<Link className={defaults.theme.buttons.class} to={`${defaults.urls.layoutEditUrl}/${layoutId}`} >
                <FaArrowLeft fontSize={15} style={{ paddingRight: "5px" }}/> Back to Layout
                    </Link>
                }
                {/* <BackButton
                    goBack={history.goBack}
                    className="btn-space-right"
                /> */}
        </div>;
    }
}