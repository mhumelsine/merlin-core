import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { defaults } from '../../utils/Global';
import NextButton from './NextButton';
import { isNullOrEmpty } from '../../utils/UIUtils';
import { isAbsolute } from 'path';

interface AccordionItemProps {
    heading: any;
    isActive?: (panelName: string) => boolean;
    onClick?: (e: any) => void;
    onClickNext?: any;
    className?: string;
    fontSize?: number;
    isLastChild?: boolean;
}

export default class AccordionItem extends React.Component<AccordionItemProps> {

    public render() {
        const { isActive, onClick, heading, children,
            className, onClickNext, isLastChild } = this.props;

        if (isActive === undefined) {
            return null;
        }

        const fontSize = this.props.fontSize || defaults.panelFontSize;

        return <div key={heading}>
            <button type="button" onClick={onClick}
                className={`btn btn-link btn-sm ${className} ${isActive(heading) ? '' : 'collapsed'}`}
                name={heading}>
                {isActive(heading) ? <FaMinus /> : <FaPlus />}{' '}{heading}
            </button>
            <div className={`collapse ${isActive(heading) ? 'show' : ''}`} aria-labelledby={heading}>
                {children}
            </div>
        </div>;
    }
}
