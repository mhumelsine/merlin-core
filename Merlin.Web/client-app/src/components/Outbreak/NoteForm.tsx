import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Note, actionCreators as OutbreakActions } from '../../store/Outbreak';
import Loading from '../common/Loading';
import SaveButton from '../common/SaveButton';
import ErrorSummary from '../common/ErrorSummary';
import CancelButton from '../common/CancelButton';
import TextAreaInput from '../common/TextAreaInput';

type NoteFormProps = {
    note: Note,
    outbreakId: string
}
    & typeof OutbreakActions;

class NoteForm extends React.Component<NoteFormProps> {
    state = {
        saving: false,
        errors: {} as any
    };
    constructor(props: NoteFormProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private onChange(name: string, value: any) {
        const note = Object.assign({}, this.props.note) as any;

        note[name] = value;

        this.props.updateNote(note);
    }

    private async onSubmit(event: any) {
        event.preventDefault();

        this.setState({ saving: true });

        const errors = await this.props.saveNote();

        this.setState({ errors, saving: false });
    }

    public render() {
        const { errors, saving } = this.state;
        const { note, cancelNoteEdit, outbreakId } = this.props;

        return <div>
            <ErrorSummary errors={errors} />
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <TextAreaInput
                        name="note"
                        value={note.note}
                        label="Notes"
                        placeholder="Enter some notes..."
                        cols={12}
                        rows={5}
                        onChange={this.onChange}
                        error={errors.note}
                        maxLength={1000}
                    />
                </div>
                <div className="row">
                    <div className="col-md-12 text-right">
                        <SaveButton disabled={saving} buttonText={saving ? "Saving..." : "Save"} />
                        {" "}
                        <CancelButton onClick={cancelNoteEdit} />
                    </div>
                </div>
            </form>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            note: state.outbreak.noteBeingEdited,
            outbreakId: state.outbreak.outbreakId
        };
    },
    OutbreakActions
)(NoteForm);