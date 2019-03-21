import * as React from 'react';
import { Note } from '../../store/Outbreak';
import NoteListItem from './NoteListItem';
import Alert from '../common/Alert';
import { FaExclamationTriangle } from 'react-icons/fa/index';

interface NoteListProps {
    noteList: Note[]
}

export default class NoteList extends React.Component<NoteListProps> {

    public render() {

        const { noteList } = this.props;
        const hasNotes = noteList && noteList.length > 0;

        if (hasNotes) {

            return <div className="table-responsive">
                <table className="table table-striped table-hover table-mobile-compact">
                    <thead>
                        <tr>
                            <th>Note Type</th>
                            <th>Note</th>
                            <th>Date Added</th>
                            <th>Author Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {noteList.map(note => <NoteListItem key={note.eventId} note={note} />)}
                    </tbody>
                </table>
            </div>;
        }
        else {
            return <Alert alertType="warning"><FaExclamationTriangle /> No notes to show</Alert>;
        }
    }
}