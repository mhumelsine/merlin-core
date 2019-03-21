import * as React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { defaults } from '../../utils/Global';
import NextButton from './NextButton';
import { isNullOrEmpty } from '../../utils/UIUtils';

interface AccordionPanelProps {
    heading: any;
    isActive: (panelName: string) => boolean;
    onClick?: (e: any) => void;
    onClickNext: (e: any) => void;
    className?: string;
    fontSize?: number;
    isLastChild?: boolean;
    next?: string;
}

export default class AccordionPanel extends React.Component<AccordionPanelProps> {

    public render() {
        const { isActive, onClick, heading, children,
            className, isLastChild, next, onClickNext } = this.props;

        const fontSize = this.props.fontSize || defaults.panelFontSize;

        return <div className="card border-primary mb-0" key={heading}>
            <div className="card-header bg-primary">
                <h2 className="card-title">
                    <button className={`btn btn-link ${isActive(heading) ? '' : 'collapsed'}`}
                        onClick={onClick}
                        name={heading}>
                        {heading}
                    </button>
                </h2>
            </div>
            <div className={`collapse ${isActive(heading) ? 'show' : ''}`} aria-labelledby={heading}>
                <div className="card-body">
                    {children}
                    {!isLastChild && <NextButton name={next || ''} goNext={onClickNext} />}
                </div>
            </div>
        </div>;


    }
}
