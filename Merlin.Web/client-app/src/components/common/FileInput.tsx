import * as React from 'react';
import { FaUpload } from 'react-icons/fa';
import { defaults } from '../../utils/Global';
import FormField from './FormField';

type FileInputProps = {
    name: string;
    value: string;
    label: string;
    hideLabel?: boolean;
    placeholder?: string;
    cols?: number;
    isReadOnly?: boolean;
    inputRef?: (ref: any) => void;
    onChange: (name: string, value: any) => void;
    error?: string;
    autoComplete?: string;
    autoFocus?: boolean;
}

class FileInput extends React.Component<FileInputProps> {
    state = {
        fileName:''
    };

    constructor(props: FileInputProps) {
        super(props);

        this.onFileNameChanged = this.onFileNameChanged.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event!.currentTarget!.files![0];

        this.setState({ fileName: file.name });

        this.props.onChange(this.props.name, file);
    }

    private onFileNameChanged(e: any) {
        this.setState({ fileName: e.currentTarget.value });
    }

    public render() {
        const { name, label, value } = this.props;
        const { fileName } = this.state;

        return <div className="input-group">
            <input type="text" className="form-control" disabled onChange={this.onFileNameChanged} placeholder="Choose a file..." value={fileName} />
            <div className="input-group-append">
                <label htmlFor={name} className="btn btn-dark mb-0">
                    <FaUpload fontSize={defaults.iconSize} />
                    <input
                        aria-describedby={name}
                        name={name}
                        id={name}
                        type="file"
                        accept=".xlsx, .xls, image/*, .doc, .docx, .ppt, .txt, .pptx, .pdf"
                        hidden={true}
                        onChange={this.onChange}
                    />
                </label>
            </div>
        </div>;
    }
}

export default FormField(FileInput);