import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import BackButton from '../common/BackButton';
import * as LayoutStore from '../../store/Layout';
import * as CaseStore from '../../store/Case';
import * as SurveyStore from '../../store/Survey';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { defaults } from '../../utils/Global';
import LayoutItem from './LayoutItem';
import { SurveyState } from '../../store/Survey';
import { getAnswers } from './EditLayoutItem';
import { answers } from '../../store/Survey';
import * as layoutUtils from '../../utils/LayoutUtils';
import MerlinSurveyAnswered from './MerlinSurveyAnswered';
import LayoutViewer from './LayoutViewer';
import { isNullOrEmpty } from '../../utils/UIUtils';
import { FaRegSave } from 'react-icons/fa';

type MerlinSurveyProps =
    & SurveyState
    & typeof LayoutStore.actionCreators
    & typeof CaseStore.actionCreators
    & typeof SurveyStore.actionCreators
    & RouteComponentProps<{}>;

class MerlinSurvey extends React.Component<MerlinSurveyProps, {}> {
    state = {
        survey: this.props.survey,
        layout: this.props.layout,
        isLoading: defaults.boolean,
        answers: {} as answers,
        caseId: null,
        surveyId: '',
        errors: {} as any,
        isSubmitted: defaults.boolean
    };

    constructor(props: MerlinSurveyProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAnswerChanged = this.onAnswerChanged.bind(this);
    }

    public async componentWillMount() {
        try {
            const params = (this.props.match.params as any);

            this.setState({
                isLoading: true,
                caseId: params.caseId,
                surveyId: params.surveyId
            });

            await this.props.requestSurvey(params.surveyId);
            await this.props.loadDetailsForCase(parseInt(params.caseId));

        } catch (e) {
            console.log(e);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    public componentWillReceiveProps(newProps: MerlinSurveyProps) {
        this.setState({
            layout: newProps.layout,
            answers: layoutUtils.getEmptyAnswerObject(newProps.layout)
        });
    }

    public async onSubmit(e: any) {
        try {
            const { answers, caseId, surveyId } = this.state;

            this.setState({ loading: true });
            (this.props.saveAnswers(surveyId, { answers: answers, caseId: caseId, surveyId: surveyId }) as any)
            .then((response: any) => {  })
            .catch((err: any) => { console.log(err); });

        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public onAnswerChanged(name: string, value: any) {
        const newState = Object.assign({}, this.state);
        newState.answers[name] = value;
        Object.keys(newState.answers)
            .filter((key: any) => (newState.answers[key] === defaults.string) || (newState.answers[key] == undefined))
            .forEach(key => delete newState.answers[key]);
        this.setState({ newState });
    }

    public render() {
        const { history, survey, layout } = this.props;
        const { errors, answers, isSubmitted, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return <div id={layout.layoutId} className="container-fluid">

            {layout && layout.items &&
                <LayoutViewer
                    layout={layout}
                    answers={answers}
                    onAnswerChanged={this.onAnswerChanged}
                />
            }
            {isSubmitted && survey && layout && layout.items && layout.items.map(item =>
                <MerlinSurveyAnswered item={item} answers={answers} />)
            }
            {!isSubmitted &&
                <button className={'btn btn-outline-dark pull-left'} onClick={this.onSubmit}>
                    <FaRegSave fontSize={20} style={{ verticalAlign: 'bottom' }} />
                    {' Submit'}
                </button>}
        </div>;
    }
    public componentDidUpdate() {
        const id = this.props.layout.layoutId;

        const element = document.getElementById(id);

        if (element) {

            const publishHeight = () => {
                const height = element.getBoundingClientRect().height + 200; // need a little buffer

                window.parent.postMessage(JSON.stringify({ height }), '*');
            };

            publishHeight();

            // this is a temporary integration piece that shoudl be removed when we are no longer
            // rendering in an iframe.  Since controls may change their height after loading data,
            // the total height can change without this render method being called again
            setTimeout(publishHeight, 3000);
        }
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout.layout
        };
    },
    Object.assign(LayoutStore.actionCreators, CaseStore.actionCreators, SurveyStore.actionCreators)
)(MerlinSurvey);
