import * as React from 'react';


type CardGroupCardProps = {
    heading: any;
    initiallyCollapsed?: boolean;
    headingPosition?: string;
}

export default class CardGroupCard extends React.Component<CardGroupCardProps> {
    state = {
        collapsed: false
    }
    constructor(props: CardGroupCardProps) {
        super(props);

        this.state.collapsed = props.initiallyCollapsed || false;

        this.onChange = this.onChange.bind(this);
    }
    private onChange(event: any) {
        event.preventDefault();
        this.setState({ collapsed: !this.state.collapsed });
    }

    public render() {
        const { heading, children, headingPosition } = this.props;
        const { collapsed } = this.state;

        return <div className="card border-primary mb-0">
            <div className="card-header bg-primary">
                <h2  className={`card-title ${headingPosition || ''}`}>
                    <a href="#" onClick={this.onChange} className={collapsed ? 'collapsed' : ''}>
                        {heading}
                    </a>
                </h2>
            </div>
            <div className={`collapse ${!this.state.collapsed && 'show'}`}>
                {children}
            </div>
        </div>;
    }
};
