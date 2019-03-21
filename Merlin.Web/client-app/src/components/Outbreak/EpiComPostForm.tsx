import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators as OutbreakActions, EpiComPost } from '../../store/Outbreak';
import TextInput from '../common/TextInput';
import WysiwygEditor from '../common/WysiwygEditor';
import Dropdown from '../common/Dropdown';
import { DropdownCode } from '../../store/Code';
import * as uiUtils from '../../utils/UIUtils';
import { ApplicationState } from '../../store/index';
import SubmitButton from '../common/SubmitButton';
import CancelButton from '../common/CancelButton';
import ErrorSummary from '../common/ErrorSummary';

type EpiComPostFormProps = {
    post: EpiComPost,
    epicomForumNameList: DropdownCode[],
    epicomForumTopicList: DropdownCode[]
}
    & typeof OutbreakActions;

class EpiComPostForm extends React.Component<EpiComPostFormProps> {
    state = {
        errors: {} as any,
        loading: false,
        submitting: false
    };
    constructor(props: EpiComPostFormProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextEditorChange = this.onTextEditorChange.bind(this);
    }

    private onChange(name: string, value: any) {
        const post = Object.assign({}, this.props.post) as any;

        post[name] = value;

        this.props.updateEpiComPost(post);

        if (name === "forumId") {
            this.loadForumTopics(value);
        }
    }

    private onTextEditorChange(encodedHtml: string) {
        const post = Object.assign({}, this.props.post);

        post.message = decodeURIComponent(encodedHtml);

        this.props.updateEpiComPost(post);
    }

    private async loadForumTopics(forumId: string) {
        const { loadEpiComForumTopics } = this.props;
        try {
            this.setState({ loading: true });
            await loadEpiComForumTopics(forumId);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    private async onSubmit(event: any) {
        event.preventDefault();

        const { saveEpiComPost } = this.props;
        try {
            this.setState({ submitting: true });
            const errors = await saveEpiComPost();
            this.setState({ errors });
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ submitting: false });
        }
    }

    public async componentDidMount() {
        const { loadEpiComForumNames, loadEpiComForumTopics, post } = this.props;

        try {
            this.setState({ loading: true });
            await loadEpiComForumNames();
            await loadEpiComForumTopics(post.forumId);
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { post, epicomForumNameList, epicomForumTopicList, cancelEpiComPostEdit } = this.props;
        const { errors, submitting } = this.state;

        return <div>
            <ErrorSummary errors={errors} />
            <form className="row" onSubmit={this.onSubmit}>
                <Dropdown
                    name="forumId"
                    value={post.forumId}
                    label="Forum:"
                    options={uiUtils.getOptions(epicomForumNameList)}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={12}
                    error={errors.forumId}

                />

                <Dropdown
                    name={"topicId"}
                    value={post.topicId}
                    options={uiUtils.getOptions(epicomForumTopicList)}
                    label={"Topic:"}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={epicomForumTopicList.length === 0}
                    onChange={this.onChange}
                    cols={12}
                    error={errors.topicId}

                />

                <TextInput
                    name={"title"}
                    value={post.title}
                    label={"Title:"}
                    hideLabel={false}
                    placeholder={''}
                    isReadOnly={false}
                    onChange={this.onChange}
                    cols={12}
                    error={errors.title}
                />
                <div className="col-md-12">
                    <WysiwygEditor
                        onHtmlChange={this.onTextEditorChange}
                        encodedHtml={post.message}
                        editorClassName="wysiwyg-editor form-control"
                        hideCompleteButton={true}
                        disableAutoFocus={true}
                    />
                </div>
                <div className="col-md-12 text-right mt-3">
                    <SubmitButton buttonText={submitting ? "Posting..." : "Post"} disabled={submitting} />
                    {" "}
                    <CancelButton onClick={cancelEpiComPostEdit} />
                </div>
            </form>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            epicomForumNameList: state.outbreak.epicomForumNameList,
            epicomForumTopicList: state.outbreak.epicomForumTopicList
        }
    },
    OutbreakActions
)(EpiComPostForm);