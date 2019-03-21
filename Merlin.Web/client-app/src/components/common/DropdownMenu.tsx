import * as React from 'react';

interface DropdownMenuProps {
    menuText: any;
    menuContextClass?: string;
    direction?: string;
    title?: string;
    buttonShape?: string;
    disabled?: boolean;
    disabledMessage?: string;
}

export default class DropdownMenu extends React.Component<DropdownMenuProps> {
    state = {
        isOpen:false
    }

    constructor(props: DropdownMenuProps) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMenuItemClicked = this.onMenuItemClicked.bind(this);
    }

    private onClick(event: any) {
        event.preventDefault();
        this.setState({ isOpen: !this.state.isOpen });
    }

    private onMenuItemClicked(event: any) {
        event.preventDefault();
        this.setState({ isOpen: false });
    }

    public render() {
        const { isOpen } = this.state;
        const { menuText, direction, children, title, disabled, disabledMessage } = this.props;
        let { menuContextClass, buttonShape } = this.props;

        if (!menuContextClass) {
            menuContextClass = "secondary";
        } 

        if (!buttonShape) {
            buttonShape = "round";
        }

        return <span className={`dropdown ${direction}`}>
            <button className={`btn btn-${menuContextClass} btn-${buttonShape}`}
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen ? "true" : "false"}
                onClick={this.onClick}
                title={disabled ? disabledMessage || "" : title}
                disabled={disabled}
            >
                {menuText}
            </button>
            <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                {React.Children.map(children, child => React.cloneElement(child as any,
                    { onMenuItemClicked: this.onMenuItemClicked }))}
            </div>
        </span>;
    }
}