import * as React from 'react';
import TextInput from '../../common/TextInput';
import TagInput from '../../common/TagInput';
import { actionCreators } from '../../../store/Layout';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store/index';
import { defaults } from '../../../utils/Global';
import Modal from '../../common/Modal';
import { FaSave } from 'react-icons/fa';
import { layoutItemType, LayoutState, Layout } from '../../../store/Layout';
import CancelButton from '../../common/CancelButton';
import AddButton from '../../common/AddButton';


type CopyLayoutPageProps = {
    visible: boolean;
    toggle: () => void;
    selectedlayoutId: string;
}
    & typeof actionCreators;

class CopyExistingLayout extends React.Component<CopyLayoutPageProps> {
    state = {
        layoutName: '',
        tags: [] as string[],
        isLoading: false,
        layoutId: '',
        error: ''
    };

    constructor(props: CopyLayoutPageProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public render() {

        const { layoutName, tags, layoutId, error } = this.state;
        const { toggle, visible } = this.props;
        const tagOptions = (tags || []).map(tag => { return { label: tag, value: tag }; });

        if (layoutId) {
            return <Redirect to={`/layout/edit/${layoutId}`} />;
        }
        return <Modal
            toggle={toggle}
            visible={visible}
            title="Copy Layout"
            body={<div>
                <TextInput
                    name="layoutName"
                    label="Layout Name"
                    maxLength={255}
                    value={layoutName}
                    onChange={this.onChange}
                    error={error}
                />

                <TagInput
                    name="tags"
                    label="Tags"
                    value={tags}
                    isMulti={true}
                    placeholder="Enter some keywords"
                    options={tagOptions}
                    onChange={this.onChange}
                />

            </div>
            }
            footer={<div>
                <CancelButton onClick={toggle} />
                {' '}
                <AddButton onClick={this.onSubmit} buttonText=" Create Layout" />
            </div>}
        />;
    }


    private onChange(name: string, value: any) {
        const newState = Object.assign({}, this.state) as any;
        newState[name] = value;
        newState.error = '';
        this.setState(newState);
    }

    private async onSubmit(event: any) {
        event.preventDefault();

        const { layoutName, tags } = this.state;
        if (layoutName === defaults.string) {
            this.setState({ error: 'LayoutName is missing' });
            return;
        }
        try {
            this.setState({ isLoading: true });
            const layoutId = await this.props.createLayout(layoutName, tags);

            await this.props.copyLayout(this.props.selectedlayoutId);

            this.setState({ layoutId });

        } catch (err) {
            this.setState({ error: err });
            console.log(err);
        } finally {
            this.setState({ isLoading: false });
        }
    }
}

export default connect(
    (state: ApplicationState) => { return { layout: state.layout.layout }; },
    actionCreators
)(CopyExistingLayout);
