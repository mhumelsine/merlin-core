import React from 'react';

export default function provideWidth<T>(WrappedComponent: any, widthAccessor:(props:any) => number) {
    return class extends React.Component<T> {
        public render() {
            return <div className={`col-md-${widthAccessor(this.props)}`}>
                <WrappedComponent {...this.props} />
            </div>;
        }
    };
}
