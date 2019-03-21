import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators as LayoutActions, Layout } from '../../store/Layout';
import { ApplicationState } from '../../store/index';
import * as layoutUtils from '../../utils/LayoutUtils';
import Loading from '../common/Loading';
import LayoutViewer from './LayoutViewer';

type SurveyCollectionProps = {
    layoutUid: string,
    layout: Layout,
    onAnswersChanged: (answers: any) => void,
    answers:any
}
    & typeof LayoutActions;

class SurveyCollection extends React.Component<SurveyCollectionProps> {
    state = {
        loading: false
    }

    constructor(props: SurveyCollectionProps) {
        super(props);

        this.onAnswerChanged = this.onAnswerChanged.bind(this);
    }

    private onAnswerChanged(name: string, value: any) {
        const { onAnswersChanged, answers } = this.props;
        const newAnswers = Object.assign({}, answers);

        newAnswers[name] = value;

        this.props.onAnswersChanged(newAnswers);
    }

    public async componentDidMount() {
        const { layoutUid, requestLayout } = this.props;

        try {
            this.setState({ loading: true });
            await requestLayout(layoutUid);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { loading } = this.state;
        const { layout, answers } = this.props;

        if (loading) {
            return <Loading />;
        }

        return <LayoutViewer
            layout={layout}
            answers={answers}
            onAnswerChanged={this.onAnswerChanged}
            hideCaseInfoControl={true}
        />;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout.layout
        };
    },
    LayoutActions
)(SurveyCollection);