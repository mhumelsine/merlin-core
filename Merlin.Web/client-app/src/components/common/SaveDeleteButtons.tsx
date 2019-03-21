import * as React from 'react';
import { defaults } from '../../utils/Global';
import SaveButton from './SaveButton';
import DeleteButton from './DeleteButton';

type SaveDeleteButtonProps = {
        saveOnClick?: any;
        iconFontSize?: number;
        deleteOnClick?: any;
        deleteDisabled?: boolean
        saveDisabled?: boolean;
        saveButtonText?: string
    };

export default class SaveDeleteButton extends React.Component<SaveDeleteButtonProps, {}> {
    public render() {
        const { saveOnClick, deleteOnClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const saveDisabled = this.props.saveDisabled || false;
        const deleteDisabled = this.props.deleteDisabled || false;
        const saveButtonText = this.props.saveButtonText;

        return  <div className="btn-toolbar mb-3 ml-auto" role="toolbar" aria-label="Toolbar with button groups">
                    <DeleteButton onClick={deleteOnClick}
                        iconFontSize={iconFontSize}
                        disabled={deleteDisabled}
                    />
                    {' '}
                    <div className="btn-group " role="group" >
                        <SaveButton onClick={saveOnClick}
                            iconFontSize={iconFontSize}
                            disabled={saveDisabled}
                            buttonText={saveButtonText}
                        />
                    </div>
            </div>;
    }
}
