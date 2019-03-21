import * as React from 'react';

interface DropdownMenuItemProps {
    onClick: (event: any) => void;
    onMenuItemClicked?: (event: any) => void;
    visible?: boolean;
}

export default class DropdownMenuItem extends React.Component<DropdownMenuItemProps> {

    constructor(props: DropdownMenuItemProps) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    public render() {
        const {children, visible } = this.props;
        if (visible !== undefined && !visible)
            return null;

        return <button
            type="button"
            className="dropdown-item"
            onClick={this.onClick}>
            {this.props.children}
        </button>;
    }

    private onClick(event: any) {
        const { onClick, onMenuItemClicked } = this.props;

        onClick(event);

        if (onMenuItemClicked) {
            onMenuItemClicked(event);
        }
    }
}
