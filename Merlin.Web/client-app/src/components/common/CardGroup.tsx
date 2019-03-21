import * as React from 'react';

export default class CardGroup extends React.Component {
    public render() {
        return <div className="accordion">
            {this.props.children}
        </div>;
    }
}
