import * as React from 'react';
import { connect } from 'react-redux';
import TextInput from '../common/TextInput';
import FileInput from '../common/FileInput';
import { ApplicationState } from '../../store/index';
import { actionCreators as CodeActions, Codes, CodeType } from '../../store/Code';
import { Document, actionCreators as OutbreakActions } from '../../store/Outbreak';
import * as utils from '../../utils/UIUtils';
import Dropdown from '../common/Dropdown';
import CustomDatePicker from '../common/CustomDatePicker';
import Loading from '../common/Loading';
import SaveButton from '../common/SaveButton';
import CancelButton from '../common/CancelButton';
import ErrorSummary from '../common/ErrorSummary';

type UploadDocumentProps = {
    outbreakId?: string,
    doc: Document | undefined,
    codes?: Codes
}
    & typeof CodeActions
    & typeof OutbreakActions;

class UploadDocument extends React.Component<UploadDocumentProps> {
    state = {
        loading: false,
        saving: false,
        errors: {} as any
    };

    constructor(props: UploadDocumentProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private onChange(name: string, value: any) {
        const doc = Object.assign({}, this.props.doc) as any;

        doc[name] = value;

        this.props.updateDocument(doc);
    }

    private async onSubmit(e: any) {
        e.preventDefault();

        this.setState({ saving: true });

        const formData = new FormData(e.target);

        const errors = await this.props.uploadDocument(formData);

        this.setState({ errors, saving: false });
    }

    public async componentDidMount() {
        const { loadDropdown } = this.props;
        try {
            this.setState({ loading: true });
            await loadDropdown(CodeType.docsEvent)
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    public render() {

        const { outbreakId, doc, codes, cancelDocumentEdit } = this.props;
        const { loading, errors, saving } = this.state;

        if (loading || codes === undefined || doc === undefined) {
            return <Loading />;
        }

        return <div>
            <ErrorSummary errors={errors} />
            <form onSubmit={this.onSubmit}>
                <input type="hidden" name="sequence" value={1} />
                <input type="hidden" name="outbreakId" value={outbreakId} />

                <div className="row">
                    <FileInput
                        name="fileReference"
                        label="Select a document to upload"
                        value={doc.fileReference}
                        onChange={this.onChange}
                        error={errors.fileReference}
                        cols={12}
                    />
                    <TextInput
                        name="description"
                        value={doc.description}
                        label="Description"
                        hideLabel={false}
                        placeholder={''}
                        onChange={this.onChange}
                        cols={12}
                        error={errors.description}
                    />
                    <Dropdown
                        name="documentType"
                        value={doc.documentType}
                        label="Document Type"
                        hideLabel={false}
                        options={utils.getOptions(codes.DOCS_EVENT)}
                        placeholder={''}
                        onChange={this.onChange}
                        cols={12}
                        error={errors.documentType}
                    />
                    <CustomDatePicker
                        name="documentDate"
                        value={doc.documentDate}
                        label="Document Date"
                        hideLabel={false}
                        placeholder={''}
                        isReadOnly={false}
                        onChange={this.onChange}
                        cols={6}
                        error={errors.documentDate}
                        defaultToToday={true}
                    />
                </div>
                <div className="row">
                    <div className="col-md-12 text-right">
                        <SaveButton disabled={saving} buttonText={saving ? "Uploading..." : "Upload"} />
                        {" "}
                        <CancelButton onClick={cancelDocumentEdit} />
                    </div>
                </div>
            </form>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            codes: state.codes.codes,
            doc: state.outbreak.documentBeingEdited,
            outbreakId: state.outbreak.outbreakId
        }
    },
    Object.assign(CodeActions, OutbreakActions)
)(UploadDocument); 