import * as React from 'react';

export default class Sticky extends React.Component {
    state = {
        stuck: false
    };

    el: HTMLElement | undefined;

    constructor(props: any) {
        super(props);

        this.el = undefined;

        this.onScroll = this.onScroll.bind(this);
    }

    public componentWillMount() {
        document.addEventListener('scroll', this.onScroll);
    }

    public componentDidMount() {
        if (this.el) {
            this.onScroll();
        }
    }

    public componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    }

    public render() {
        return <div ref={r => this.el = r === null ? undefined : r} className={`${this.state.stuck ? 'fixed-top shadow bg-white' : ''}`}>
            {this.props.children}
        </div>;
    }

    private onScroll() {
        const { stuck } = this.state;
        const clientHeight = this.el ? this.el.clientHeight : 0;

        // needed to support IE which does not have scrollY
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        const pastBottom = (scrollPosition + clientHeight) > clientHeight;

        if (pastBottom && !stuck) {
            this.setState({ stuck: true });
        }

        if (!pastBottom && stuck) {
            this.setState({ stuck: false });
        }
    }
}
