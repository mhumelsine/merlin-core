import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Note } from '../../store/Outbreak';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import Loading from '../common/Loading';
import AddButton from '../common/AddButton';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import Modal from '../common/Modal';

type NoteInfoProps = {
    noteList?: Note[],
    noteBeingEdited?: Note
}
    & typeof OutbreakActions;

class NoteInformation extends React.Component<NoteInfoProps> {

    state = {
        loading: true
    }

    constructor(props: NoteInfoProps) {
        super(props);
    }

    public async componentDidMount() {
        const { loadNoteList } = this.props;

        try {
            this.setState({ loading: true });
            await loadNoteList();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {
        const { noteList, noteBeingEdited, createNote, cancelNoteEdit } = this.props;
        const { loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        return <div>
            <NoteList noteList={noteList || []} />
            {noteBeingEdited === undefined && <AddButton className="btn btn-outline-dark" onClick={createNote} buttonText="Note" />}
            {noteBeingEdited && <Modal
                visible={true}
                toggle={cancelNoteEdit}
                title="Add Note"
                body={<NoteForm />}
            />}

        </div>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            noteList: state.outbreak.noteList,
            noteBeingEdited: state.outbreak.noteBeingEdited
        };
    },
    OutbreakActions
)(NoteInformation);