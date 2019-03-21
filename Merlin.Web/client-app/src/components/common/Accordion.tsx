import * as React from 'react';


interface AccordionProps {
    defaultPanelHeading?: string;
}

export default class Accordion extends React.Component<AccordionProps> {
    state = {
        activePanel: ''
    };

    constructor(props: AccordionProps) {
        super(props);

        this.isActive = this.isActive.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    public componentWillMount() {
        const { defaultPanelHeading } = this.props;
        this.setState({ activePanel: defaultPanelHeading || '' });
    }

    public componentDidUpdate(prevProps: AccordionProps) {

        const node = document.getElementById(this.state.activePanel);

        if (node) {
            window.scrollTo(0, node.getBoundingClientRect().top + (window.scrollY - 200));
        }
    }

    public render() {
        const children = React.Children.toArray(this.props.children);
        const { activePanel } = this.state;

        return <div className="accordion">
            {
                children.map((child, index) =>
                    React.cloneElement(child as any,
                                       {
                            isActive: this.isActive,
                            onClick: this.onClick,
                            onClickNext: this.onClickNext,
                            next: this.getHeading(children, index),
                            isLastChild: index === children.length - 1
                        }))
            }
        </div>;
    }

    private isActive(panelName: string): boolean {
        return this.state.activePanel === panelName;
    }

    private onClick(e: any) {
        e.preventDefault();
        if (this.state.activePanel === e.currentTarget.name)
            this.setState({ activePanel: '' });
        else {
            this.setState({ activePanel: e.currentTarget.name });
        }
    }
    private onClickNext(event: any) {
        console.log(event.currentTarget.name);
        this.setState({ activePanel: event.currentTarget.name });
    }

    private getHeading = (children: any[], index: number) => {

        if (index < children.length - 1) {
            const next = children[index + 1];

            if (next && next.props) {
                return next.props.heading;
            }
        }

        return null;
    }
}
