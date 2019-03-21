import * as React from 'react';
import { Document } from '../../store/Outbreak';
import Alert from '../common/Alert';
import { FaExclamationTriangle } from 'react-icons/fa/index';
import DocumentListItem from './DocumentListItem';

interface DocumentListProps {
    documentList: Document[]
}

export default class DocumentList extends React.Component<DocumentListProps> {

    public render() {

        const { documentList } = this.props;
        const hasdocs = documentList && documentList.length > 0;

        if (hasdocs) {

            return <div className="table-responsive">
                <table className="table table-striped table-hover table-mobile-compact">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Document Type</th>
                            <th>Document Date</th>
                            <th>User Added</th>
                            <th>Date Added</th>
                            <th>File Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentList.map(doc => <DocumentListItem key={doc.id} doc={doc} />)}
                    </tbody>
                </table>
            </div>;
        }
        else {
            return <Alert alertType="warning"><FaExclamationTriangle /> No documents to show</Alert>;
        }
    }
}