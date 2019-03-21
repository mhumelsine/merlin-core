import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


type AlertProps =
    {
        alertType: string;
        autoFocus?: boolean;
        onBlur?: () => void;
        className?: string;
    }

export default class Alert extends React.Component<AlertProps, {}> {
    public render() {
        const { alertType, children, onBlur, autoFocus, className } = this.props;

        return <div className={`alert alert-${alertType} ${className || ""}`} role="alert">
            {children}            
        </div>;
    }
}