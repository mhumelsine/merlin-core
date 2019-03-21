import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { isNullOrEmpty } from '../../utils/UIUtils';

interface WysiwygEditorProps {
    onEditComplete?: (newEncodedHtml: string) => void;
    onHtmlChange?: (encodedHtml: string) => void;
    encodedHtml: string;
    hideCompleteButton?: boolean;
    editorClassName?: string;
    disableAutoFocus?: boolean;
}

export default class WysiwygEditor extends React.Component<WysiwygEditorProps>{
    state = {
        editorState: {} as EditorState
    };
    constructor(props: WysiwygEditorProps) {
        super(props);

        if (props.encodedHtml) {
            this.state.editorState = props.disableAutoFocus ? EditorState.createWithContent(stateFromHTML(decodeURIComponent(props.encodedHtml)))
                : EditorState.moveFocusToEnd(EditorState.createWithContent(stateFromHTML(decodeURIComponent(props.encodedHtml))));
        } else {
            this.state.editorState = props.disableAutoFocus ? EditorState.createEmpty()
                : EditorState.moveFocusToEnd(EditorState.createEmpty());
        }

        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.onEditComplete = this.onEditComplete.bind(this);
    }

    private onEditorStateChange(editorState: EditorState) {
        this.setState({ editorState });

        if (this.props.onHtmlChange) {
            this.props.onHtmlChange(this.encodeState());
        }
    }

    private encodeState() {
        const unencodedHtml = stateToHTML(
            this.state.editorState.getCurrentContent());

        return encodeURIComponent(unencodedHtml);
    }

    private onEditComplete(event: any) {
        event.preventDefault();

        const { onEditComplete } = this.props;

        if (onEditComplete) {
            onEditComplete(this.encodeState());
        }
    }

    public render() {
        const { editorClassName, hideCompleteButton } = this.props;

        return <div>
            <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                editorClassName={!isNullOrEmpty(editorClassName) ? editorClassName : ""}
            />
            {!hideCompleteButton &&
                <div>
                    <hr />
                    <button type="button"
                        onClick={this.onEditComplete}
                        className="btn btn-primary"
                        hidden={hideCompleteButton}
                    >
                        Done
                    </button>
                </div>
            }
        </div>;
    }
}