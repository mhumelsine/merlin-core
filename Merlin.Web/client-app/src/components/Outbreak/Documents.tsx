import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Document } from '../../store/Outbreak';
import { actionCreators as OutbreakActions } from '../../store/Outbreak';
import Modal from '../common/Modal';
import AddButton from '../common/AddButton';

import DocumentList from './DocumentList';
import UploadDocument from './UploadDocument';

type DocumentsProps = {
    documentList?: Document[],
    documentBeingEdited?: Document
}
    & typeof OutbreakActions;

class Documents extends React.Component<DocumentsProps> {
    state = {
        loading: true
    }

    constructor(props: DocumentsProps) {
        super(props);
    }

    public async componentDidMount() {
        const { loadDocumentList } = this.props;
        try {
            this.setState({ loading: true });
            await loadDocumentList();
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { documentList, documentBeingEdited, createDocument, cancelDocumentEdit } = this.props;

        return <div>
            <DocumentList documentList={documentList || []} />
            {documentBeingEdited === undefined && <AddButton className="btn btn-outline-dark" onClick={createDocument} buttonText="Document" />}
            {documentBeingEdited && <Modal
                visible={true}
                toggle={cancelDocumentEdit}
                title="Upload Document"
                body={<UploadDocument />}
            />}
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => {
        return {
            outbreakId: state.outbreak.outbreakId,
            documentList: state.outbreak.documentList,
            codes: state.codes.codes,
            documentBeingEdited: state.outbreak.documentBeingEdited
        };
    },
    OutbreakActions
)(Documents);
