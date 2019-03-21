import * as React from 'react';

export class Layout extends React.Component {
    public render() {
        const { children } = this.props;

        return <div className="container-fluid" style={{ 'paddingTop': 100 }}>
            {children}
        </div>;
    }
}
