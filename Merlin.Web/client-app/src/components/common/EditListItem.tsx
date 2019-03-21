import * as React from 'react';
import { FaEdit, FaTimesCircle } from 'react-icons/fa';

interface EditItemProps {
    id: string;
    type: string;
    isEditable: boolean;
    onEdit: (itemId: string) => void;
    onRemove: (itemId: string, type: string) => void;
}

export default class EditItem extends React.Component<EditItemProps> {
    constructor(props: any) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    private onEdit(event: any) {
        const { id, onEdit } = this.props;

        onEdit(id);
    }

    private onRemove(event: any) {
        const { id, onRemove, type } = this.props;

        onRemove(id, type);
    }

    public render() {

        const { isEditable } = this.props;
        const fontSize = 15;

        return <div>
            <div className="edit-controls" style={{ opacity: "unset" }}>
                {isEditable &&
                    <button
                        type="button"
                        title="Edit"
                        className="btn btn-outline-primary btn-round"
                        style={{ position: "absolute", top: ".5rem", right: "2.0rem" }}
                        onClick={this.onEdit}
                    >
                        <FaEdit fontSize={fontSize} />
                        <span className="sr-only">Edit</span>
                    </button>
                }
                {" "}
                <button
                    type="button"
                    title="Remove"
                    className="btn btn-outline-danger btn-round"
                    style={{ position: "absolute", top: ".5rem", right: ".5rem" }}
                    onClick={this.onRemove}
                >
                    <FaTimesCircle fontSize={fontSize} />
                    <span className="sr-only">Remove</span>
                </button>
            </div>

            {this.props.children}

        </div>;
    }
}