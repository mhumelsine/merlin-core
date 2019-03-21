import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import BackButton from '../../common/BackButton';
import { FaPrint } from 'react-icons/fa';
import { ApplicationState } from '../../../store';
import { connect } from 'react-redux';
import { Layout, actionCreators } from '../../../store/Layout';
import Loading from '../../common/Loading';
import LayoutViewer from '../LayoutViewer';
import { defaults } from '../../../utils/Global';

type LayoutPreviewProps = {
    layout: Layout
}
    & typeof actionCreators
    & RouteComponentProps<{}>;

class LayoutPreview extends React.Component<LayoutPreviewProps> {
    state = {
        isLoading: true,
        answers: {} as any
    };

    constructor(props: LayoutPreviewProps) {
        super(props);

        this.onAnswerChanged = this.onAnswerChanged.bind(this);
        this.print = this.print.bind(this);
    }

    public componentDidMount() {
        document.title = defaults.titles.PreviewPage;
    }

    public async componentWillMount() {
        const { layoutId } = this.props.match.params as any;

        try {
            await this.props.requestLayout(layoutId);
        } catch (err) {
            console.log(err);
        }
        finally {
            this.setState({ isLoading: false });
        }

    }
    public render() {
        const { layout, history } = this.props;
        const { isLoading, answers } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return <div>
			<button type="button" id="printbtn" className={`${defaults.theme.buttons.class} pull-right`} onClick={this.print}><FaPrint fontSize={defaults.iconSize} /> {' '}print</button>

                <h1> Preview : {layout.layoutName} </h1>

                <LayoutViewer
                    answers={answers}
                    layout={layout}
                    onAnswerChanged={this.onAnswerChanged}
                />
                <br />
                <BackButton goBack={history.goBack} />

        </div>;
    }

    private onAnswerChanged(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        newState.answers[name] = newValue;
        Object.keys(newState.answers)
        .filter((key: any) => (newState.answers[key] === defaults.string) || (newState.answers[key] == undefined))
        .forEach(key => delete newState.answers[key]);
        this.setState(newState);
    }

   private print() {
        window.print();
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout.layout
        };
    },
    actionCreators
)(LayoutPreview);
