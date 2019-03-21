import * as React from 'react';

type SpacerProps = {
    showBackGround?: boolean;
}
export default class Spacer extends React.Component<SpacerProps>{
    public render() {

        if (this.props.showBackGround) {
            return <div className={"SpacerBackground"}
                style={{ height: "52px", overflow: "hidden" }}>Spacer</div>;
        } else {
            return <div></div>;
        }
    }
}