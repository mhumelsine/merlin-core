import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store/index';
import * as LayoutStore from '../../../store/Layout';
import Modal from '../../common/Modal';
import * as SurveyStore from '../../../store/Survey';
import { defaults } from '../../../utils/Global';
import SaveLayoutControl from './SaveLayoutControl';
import Loading from '../../common/Loading';
import SaveButton from '../../common/SaveButton';
import CancelButton from '../../common/CancelButton';

type PropertyManagerProps = {
    visible: boolean;
    toggle: () => void;
    title: string;
    layout: LayoutStore.Layout
}
    & typeof SurveyStore.actionCreators
    & typeof LayoutStore.actionCreators;

class PropertyManager extends React.Component<PropertyManagerProps> {
    state = {
        layoutName: defaults.string,
        tags: [] as string[],
        errors: {} as any,
        isLoading: defaults.boolean
    };

    constructor(props: any) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    public componentWillReceiveProps(newProps: PropertyManagerProps) {
        const { layout } = newProps;

        this.setState({
            layoutName: layout.layoutName,
            tags: layout.tags
        });
    }

    public render() {
        const { visible, toggle, title } = this.props;
        const { layoutName, tags, errors, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }
        return <Modal
            toggle={toggle}
            visible={visible}
            title={title}
            body={<div>
                <SaveLayoutControl
                    layoutName={layoutName}
                    tags={tags}
                    errors={errors}
                    onChange={this.onChange}
                />
            </div>}
            footer={<div>
                <CancelButton onClick={toggle} className={'btn-space-right'} />
                <SaveButton onClick={this.onSave} className={'pull-right'} />
            </div>}
        />;
    }

    private onChange(name: string, newValue: any) {
        let newState = Object.assign({}, this.state);
        (newState as any)[name] = newValue;
        this.setState(newState);
    }

    private async onSave(e: any) {
        e.preventDefault();

        const { layoutName, tags } = this.state;

        try {
            this.setState({ isLoading: true });
            const layoutId = await this.props.editLayoutProperties(layoutName, tags);
            this.setState({ layoutId });
        } catch (err) {
            this.setState({ errors: err });
            console.log(err);
        } finally {
            this.setState({ isLoading: false }, () => this.props.toggle());
        }
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            layout: state.layout.layout
        };
    },
    Object.assign({}, SurveyStore.actionCreators, LayoutStore.actionCreators)
)(PropertyManager);
