import * as React from 'react';

type Props = {
    menuText: any;
    menuContextClass?: string;
    direction?: string;
    title?: string;
    buttonShape?: string;
    disabled?: boolean;
    disabledMessage?: string;
};

type State = {
    show: boolean;
};

export default class DropDownForm extends React.Component<Props, State> {

    state = { show: false };

    constructor(props: Props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    public render() {
        const { menuText, direction, children, title, disabled, disabledMessage } = this.props;
        const { show } = this.state;
        let { menuContextClass, buttonShape } = this.props;

        if (!menuContextClass) {
            menuContextClass = 'secondary';
        }

        if (!buttonShape) {
            buttonShape = 'round';
        }

        return (
            <span className={`dropdown ${direction}`}>
                <button className={`btn btn-${menuContextClass} btn-${buttonShape}`}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={show ? 'true' : 'false'}
                    onClick={this.toggle}
                    title={disabled ? disabledMessage || '' : title}
                    disabled={disabled}
                >
                    {menuText}
                </button>
                <div className={`dropdown-menu collapse ${show ? 'show' : ''} p-0 shadow rounded`}>
                    {this.props.children}
                </div >
            </span>
        );
    }

    private toggle() {
        this.setState({ show: !this.state.show });
    }

}
