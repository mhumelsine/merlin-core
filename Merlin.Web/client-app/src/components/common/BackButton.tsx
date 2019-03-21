import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

interface BackButtonProps {
    goBack: () => void;
    className?: string;
    fontSize?: number
}

export default class BackButton extends React.Component<BackButtonProps, {}> {
    public render() {
        const { goBack, className } = this.props;
        const fontSize = this.props.fontSize || defaults.backButtonIconSize;

		return <button type="button" className={`${defaults.theme.buttons.class} ${className || ''}`} onClick={goBack}>
            <FaArrowLeft fontSize={fontSize} style={{ verticalAlign: 'bottom' }} />{" "}Back
        </button>
    }
}