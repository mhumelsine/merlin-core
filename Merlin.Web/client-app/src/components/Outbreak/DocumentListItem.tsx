import * as React from 'react';
import { connect } from 'react-redux';
import { Document } from '../../store/Outbreak';
import { FaTimesCircle, FaDownload } from 'react-icons/fa/index';
import * as utils from '../../utils/Global';
import { ApplicationState } from '../../store/index';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import DeleteButton from '../common/DeleteButton';

type DocumentListItemProps = {
    doc: Document
}
    & typeof OutbreakActions;

class DocumentListItem extends React.Component<DocumentListItemProps>{

    constructor(props: DocumentListItemProps) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    private onDelete(event: any) {
        this.props.deleteDocument(event.currentTarget.name);
    }

    public render() {

        const { doc } = this.props;

        return <tr key={doc.id}>
            <td data-title="Description">{doc.description}</td>
            <td data-title="Type">{doc.documentType}</td>
            <td data-title="Date">{doc.documentDate}</td>
            <td data-title="User Added">{doc.userAdded}</td>
            <td data-title="Date Add">{doc.dateAdded}</td>
            <td data-title="File Name">{doc.fileName}</td>
            <td className="d-flex justify-content-end" style={{ minWidth: "75px" }}>
                <a
                    href={`api/outbreak/document/${doc.id}`}
                    title="Download Document"
                    className="btn btn-outline-primary btn-round mr-1"
                    target="_blank"
                    download
                >
                    <FaDownload fontSize={utils.defaults.iconSize} />
                    <span className="sr-only">Edit</span>
                </a>
                <DeleteButton
                    name={doc.id}
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
            codes: state.codes.codes
        };
    },
    OutbreakActions
)(DocumentListItem);