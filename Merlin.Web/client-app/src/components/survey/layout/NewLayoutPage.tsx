import * as React from 'react';
import { actionCreators } from '../../../store/Layout';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import BackButton from '../../common/BackButton';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';
import SaveLayoutControl from './SaveLayoutControl';
import SaveButton from '../../common/SaveButton';
import Loading from '../../common/Loading';
import { defaults } from '../../../utils/Global';

type LayoutPageProps = {}
    & RouteComponentProps<{}>
    & typeof actionCreators;

class NewLayoutPage extends React.Component<LayoutPageProps> {
    state = {
        layoutName: '',
        tags: [] as string[],
        isLoading: false,
        layoutId: '',
        errors: {} as any
    };

    constructor(props: LayoutPageProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

	public componentDidMount() {
		document.title = defaults.titles.CreateLayoutPage;
	}

    public render() {

		const { layoutName, tags, layoutId, errors, isLoading} = this.state;
  const { history } = this.props;

  if (layoutId) {
            return <Redirect to={`/layout/edit/${layoutId}`} />;
		}

		if (isLoading) {
			return <Loading />;
		}

  return <div className="row">
            <div className="col-md-8 offset-md-2">
                <h1>Create Layout</h1>
					<SaveLayoutControl
						layoutName={layoutName}
						tags={tags}
						errors={errors}
						onChange={this.onChange}
					/>
                    <BackButton
                        goBack={history.goBack}
                        className="btn-space-right"
                    />
                    <SaveButton onClick={this.onSubmit}/>
            </div>
        </div>;
    }

    private onChange(name: string, value: any) {
        const newState = Object.assign({}, this.state) as any;
        newState[name] = value;
        this.setState(newState);
    }

    private async onSubmit(event: any) {
        event.preventDefault();

        const { layoutName, tags } = this.state;

        try {
            this.setState({ isLoading: true });
            const layoutId = await this.props.createLayout(layoutName, tags);
            this.setState({ layoutId });
        } catch (err) {
            this.setState({ errors: err });
        } finally {
            this.setState({ isLoading: false });
        }
    }
}

export default connect(
    (state: ApplicationState) => { return {}; },
    actionCreators
)(NewLayoutPage);
