import * as React from 'react';
import { defaults } from '../../utils/Global';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';

type SaveCancelButtonProps = {
        saveOnClick?: any;
        iconFontSize?: number;
        cancelOnClick?: any;
        saveDisabled?: boolean;
        saveButtonText?: string
    };

export default class SaveCancelButton extends React.Component<SaveCancelButtonProps, {}> {
    public render() {
        const { saveOnClick, cancelOnClick } = this.props;
        const iconFontSize = this.props.iconFontSize || defaults.iconSize;
        const saveDisabled = this.props.saveDisabled || false;
        const saveButtonText = this.props.saveButtonText;

        return <span>
            <CancelButton onClick={cancelOnClick}
                iconFontSize={iconFontSize}
            />
            {' '}
            <SaveButton onClick={saveOnClick}
                iconFontSize={iconFontSize}
                disabled={saveDisabled}
                buttonText={saveButtonText}
            />
        </span>;
    }
}
