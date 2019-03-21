import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import BackButton from '../common/BackButton';

interface ErrorSummaryProps {
    errors: any;
    showAll?: boolean;
};

export default class ErrorSummary extends React.Component<ErrorSummaryProps> {

    errorSummaryElement: HTMLDivElement | undefined;

    public componentDidUpdate() {
        const { errors } = this.props;

        //if errors are present, scroll into view
        if (this.errorSummaryElement) {
            this.errorSummaryElement.scrollIntoView();
        }
    }

    public render() {
        const { errors, showAll } = this.props;

        let errorList = Object.keys(errors).filter(key => showAll || key === "");

        if (errorList.length === 0) {
            return null;
        }

        return <div>
            {/* this is to make sure it scrolls to the top */}
            <div ref={el => this.errorSummaryElement = el === null ? undefined : el}></div>
            <ul className="list-group mb-3 error-summary">
                {errorList.map((key: string) => {
                    return errors[key].map((message: string, index: number) =>
                        <li key={`${key}-${index}`} className="list-group-item list-group-item-danger">
                            {message}
                        </li>
                    )
                }
                )}
            </ul>
        </div>;
    }
}
;