import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import BackButton from '../common/BackButton';
import * as LayoutStore from '../../store/Layout';
import * as SurveyStore from '../../store/Survey';
import { ApplicationState } from '../../store/index';
import { connect } from 'react-redux';
import Loading from '../common/Loading';
import { defaults } from '../../utils/Global';
import LayoutItem from './LayoutItem';
import { SurveyState } from '../../store/Survey';
import LayoutViewer from './LayoutViewer';

type SurveyPreviewProps =
    SurveyState
    & typeof SurveyStore.actionCreators
    & RouteComponentProps<{}>;

class SurveyPreview extends React.Component<SurveyPreviewProps, {}> {
    state = {
        survey: this.props.survey,
        layout: this.props.layout,
        isLoading: defaults.boolean,
        errors: {} as any,
        answers: {} as any
    }

    constructor(props: SurveyPreviewProps) {
        super(props);
        this.onAnswerChange = this.onAnswerChange.bind(this);
    }

    public componentWillMount() {
        try {
            const { layoutId } = this.props.match.params as any;
            this.setState({ isLoading: true });



            this.props.requestSurveyAndLayout((this.props.match.params as any).surveyId, this.props.history);
        } catch (e) {
            console.log(e);
            //TODO: manage the errors...
        }
    }

    public componentWillReceiveProps(newProps: SurveyPreviewProps) {
        if (newProps.layout != this.state.layout) {
            const newState = Object.assign({}, this.state);

            newState.layout = newProps.layout;
            newState.isLoading = defaults.boolean;
            this.setState(newState);
        }
    }

    private onAnswerChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
        Object.keys(newState.answers)
            .filter((key: any) => (newState.answers[key] === defaults.string) || (newState.answers[key] == undefined))
            .forEach(key => delete newState.answers[key]);
        this.setState(newState);
    }

    public render() {
        const { isLoading, history, survey, layout } = this.props;
        const { errors, answers } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        
        return <div>
            <h1>
                Preview Layout
             </h1>
            <LayoutViewer
                layout={layout}
                answers={answers}
                onAnswerChanged={this.onAnswerChange}
            />
            <BackButton goBack={history.goBack} />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.survey,
    SurveyStore.actionCreators
)(SurveyPreview);