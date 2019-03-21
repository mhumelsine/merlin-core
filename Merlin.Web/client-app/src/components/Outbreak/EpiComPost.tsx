import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { actionCreators as OutbreakActions, EpiComPost as OutbreakEpiComPost } from '../../store/Outbreak';
import { FaSearch, FaFileCode } from 'react-icons/fa';
import { NumberWithAddOn } from '../common/NumberInput';
import Loading from '../common/Loading';
import { defaults } from '../../utils/Global';
import AddButton from '../common/AddButton';
import EpiComPostForm from './EpiComPostForm';
import Modal, { ModalWidth } from '../common/Modal';
import Secure from '../common/Secure';
import { ClaimType } from '../../store/Session';
import StaticInput from '../common/StaticInput';
import { int32 } from '../../utils/Global';

type EpiComPostProps = {
    epiComPostBeingEdited: OutbreakEpiComPost | undefined,
    epiComPost: OutbreakEpiComPost
}
    & typeof OutbreakActions;

class EpiComPost extends React.Component<EpiComPostProps> {
    state = {
        loading: false,
        searching: false
    };

    constructor(props: EpiComPostProps) {
        super(props);

        this.createPost = this.createPost.bind(this);
        this.onChange = this.onChange.bind(this);
        this.findPost = this.findPost.bind(this);
    }

    public async componentDidMount() {
        const { loadEpiComPost } = this.props;

        try {
            this.setState({ loading: true });
            await loadEpiComPost();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { epiComPostBeingEdited, cancelEpiComPostEdit, epiComPost } = this.props;
        const { loading, searching } = this.state;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <div className="row">
                <NumberWithAddOn
                    name="postId"
                    label="Post ID"
                    value={epiComPost.postId}
                    onChange={this.onChange}
                    cols={6}
                    min={int32.min}
                    max={int32.max}
                >
                    {loading && <Loading />}
                    {!loading && <button className={`btn btn-outline-dark`} title="Find EpiCom post" disabled={searching} onClick={this.findPost}>
                        <FaSearch fontSize={defaults.iconSize} style={{ verticalAlign: 'bottom' }} />
                        <span className="sr-only">Find Post</span>
                    </button>}
                </NumberWithAddOn>
                <StaticInput
                    name="pendingPostId"
                    label="EpiCom Pending Post ID"
                    value={epiComPost.pendingPostId}
                    cols={6}
                />
            </div>
            {epiComPost.forumDescription && <div className="row">
                <StaticInput
                    name="forumDescription"
                    label="Forum"
                    value={epiComPost.forumDescription}
                    cols={6}
                />
                <StaticInput
                    name="topicDescription"
                    label="Topic"
                    value={epiComPost.topicDescription}
                    cols={6}
                />
                <StaticInput
                    name="title"
                    label="Title"
                    value={epiComPost.title}
                    cols={6}
                />
                <StaticInput
                    name="date"
                    label="Date"
                    value={epiComPost.date}
                    cols={6}
                />
            </div>
            }

            <Secure requireClaim={ClaimType.epicomUserId}>
                {epiComPostBeingEdited === undefined && <AddButton
                    onClick={this.createPost}
                    disabled={loading}
                    buttonText={loading ? 'Creating Post...' : 'New EpiCom Post'} />
                }
                {epiComPostBeingEdited && <Modal
                    visible={true}
                    toggle={cancelEpiComPostEdit}
                    title={`New EpiCom Post ${epiComPostBeingEdited.title ? ` - ${epiComPostBeingEdited.title}` : ''}`}
                    body={<EpiComPostForm post={epiComPostBeingEdited} />}
                    modalWidth={ModalWidth.large}
                />}
            </Secure>
        </div>;
    }

    private async createPost() {
        const { createEpiComPost } = this.props;
        try {
            this.setState({ loading: true });
            await createEpiComPost();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    private onChange(name: string, value: any) {
        this.props.updateEpiComPostID(value);
    }

    private async findPost() {
        try {
            this.setState({ searching: true });
            await this.props.findEpiComPost();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ searching: false });
        }
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            epiComPostBeingEdited: state.outbreak.epiComPostBeingEdited,
            epiComPost: state.outbreak.epiComPost
        };
    },
    OutbreakActions
)(EpiComPost);
