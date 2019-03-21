import * as React from 'react';


type CollapsibleCardProps = {
    heading: any;
    collapseControl?: any;
    footer?: any;
    body: any;
    initiallyCollapsed: boolean;
    id?: string;
    style?: any;
    className?: string;
    contextClassName?: string;
};

export default class CollapsibleCard extends React.Component<CollapsibleCardProps, {}> {
    state = {
        collapsed: false
    };
    constructor(props: CollapsibleCardProps) {
        super(props);
        this.state.collapsed = props.initiallyCollapsed;
        this.onChange = this.onChange.bind(this);
    }

    public render() {
        const { className, contextClassName, style, heading, id, body, footer } = this.props;
        const { collapsed } = this.state;

        const fontSize = 30;
        const contextClass = contextClassName || 'primary';

        const collapseControl = this.props.collapseControl || <span className="badge badge-pill badge-secondary">

        </span>;

        return <div className={`card border-${contextClass} ${className}`} style={style || {}}>
            <div className={`card-header bg-${contextClass}`}>
                <h2 className="card-title">
                    <a href="#" onClick={this.onChange} className={collapsed ? 'collapsed' : ''}>
                        {heading}
                    </a>
                </h2>
            </div>
            <div id={id} className={`collapse ${!this.state.collapsed && 'show'}`}>
                <div className="card-body">
                    {body}
                </div>
            </div>
            {footer &&
                <div className="card-footer">
                    {footer}
                </div>
            }
        </div>;
    }
    private onChange(event: any) {
        event.preventDefault();
        this.setState({ collapsed: !this.state.collapsed });
    }
}
