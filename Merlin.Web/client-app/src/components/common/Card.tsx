import * as React from 'react';
import { ChangeEvent } from 'react';
import * as LayoutStore from '../../store/Layout';

type CardProps = {
    header: any
    footer?: any
    style?: any
    className?: string;
}

export default class Card extends React.Component<CardProps, {}> {
    constructor(props: CardProps) {
        super(props);
    }
    private onChange() {

    }
    public render() {
        const { className, style, header, children, footer } = this.props;

        return <div className={`card ${className || ''}`} style={style || {}}>
            <div className="card-header">
                <h6> {header} </h6>
            </div>
            <div className="card-body">
                {children}
            </div>
            {footer &&
                <div className="card-footer">
                    {footer}
                </div>
            }
        </div>;
    }
};
