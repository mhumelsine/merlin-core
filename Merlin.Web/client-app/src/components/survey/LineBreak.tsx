import * as React from 'react';

export default class LineBreak extends React.Component {
    public render() {
        return <div className={'col-md-12'} style={{ minHeight: '20px' }}><div className={'lineBreak'}></div></div>;
    }
}
