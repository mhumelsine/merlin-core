import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { defaults } from '../../utils/Global';

interface NextButtonProps {
	goNext: (e: any) => void;
	className?: string;
    fontSize?: number;
    name: string;
}

export default class NextButton extends React.Component<NextButtonProps, {}> {
	public render() {
		const { goNext, className, name } = this.props;
		const fontSize = this.props.fontSize || defaults.backButtonIconSize;

  return <div className="d-flex flex-row-reverse mt-2">
            <button type="button" name={name} className={`btn btn-primary ${className || ''}`} onClick={goNext}>
                Next{' '}<FaArrowRight fontSize={fontSize} style={{ verticalAlign: 'bottom' }} />
            </button>
        </div>;
	}
}
