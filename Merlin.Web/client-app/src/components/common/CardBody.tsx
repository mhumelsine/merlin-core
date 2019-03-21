import * as React from 'react';

export default class CardBody extends React.Component {
    public render() {
        return <div className="card-body">
            {this.props.children}
        </div>;
    }
}