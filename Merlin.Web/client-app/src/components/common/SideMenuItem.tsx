import * as React from 'react';

type SideMenuItemProps = {
    itemType?: string;
    icon: any;
    href?: string;
    onClick?: (event: any) => void;
    className?: string;
    isActive: boolean;
    isCollapsed?: boolean;
};

export default class SideMenuItem extends React.Component<SideMenuItemProps, {}> {

    constructor(props: SideMenuItemProps) {
        super(props);
    }

    public render() {
        const { icon, itemType, onClick, className, children, isActive, href, isCollapsed } = this.props;


        return <button
            className={`btn btn-link nav-link rounded-0 ${isActive ? 'active' : ''}`}
            data-href={href}
            onClick={onClick}
            name={itemType}
            style={{ overflow: 'hidden' }}
        >
            {icon} <span className={`${isCollapsed ? 'd-none ' : 'd-inline '}`}>{' '} {children}</span>
        </button>;
    }
}
