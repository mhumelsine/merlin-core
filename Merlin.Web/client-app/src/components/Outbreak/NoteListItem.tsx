import * as React from 'react';
import { connect } from 'react-redux';
import { Note } from '../../store/Outbreak';
import { FaTimesCircle, FaEdit } from 'react-icons/fa/index';
import * as utils from '../../utils/Global';
import { ApplicationState } from '../../store/index';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import DeleteButton from '../common/DeleteButton';

type NoteListItemProps = {
    note: Note
}
    & typeof OutbreakActions;

class NoteListItem extends React.Component<NoteListItemProps>{

    constructor(props: NoteListItemProps) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    private onEdit(event: any) {
        this.props.selectNoteEdit(event.currentTarget.name);
    }

    private onDelete(event: any) {
        this.props.deleteNote(event.currentTarget.name);
    }

    public render() {

        const { note } = this.props;

        return <tr key={note.eventId}>
            <td data-title="Note Type">{note.noteType}</td>
            <td data-title="Note">{note.note}</td>
            <td data-title="Date Added">{note.dateAdded}</td>
            <td data-title="Author Name">{note.authorName}</td>            
            <td className="d-flex justify-content-end" style={{ minWidth: "75px" }}>
                <button
                    name={note.eventId}
                    type="button"
                    title="Edit"
                    className="btn btn-outline-primary btn-round mr-1"
                    onClick={this.onEdit}
                >
                    <FaEdit fontSize={utils.defaults.iconSize} />
                    <span className="sr-only">Edit</span>
                </button>
                <DeleteButton
                    name={note.eventId}
                    className="btn btn-outline-danger btn-round"
                    onClick={this.onDelete}
                />
            </td>
        </tr>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
        };
    },
    OutbreakActions
)(NoteListItem);