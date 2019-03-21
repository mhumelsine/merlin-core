import * as React from 'react';

type InlineLoaderProps = {
    size?: string;
    color?: string;
    center?:boolean
};

export default class InlineLoader extends React.Component<InlineLoaderProps>{
    public render() {
        const { size, color, center } = this.props;

        return <div className={`inline-loader ${size || ""} text-${color || ""} ${center ? "mx-auto" : ""}`}>Loading...</div>;
    }
}