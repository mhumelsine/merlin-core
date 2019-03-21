import * as React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { RouteComponentProps } from 'react-router';
import { defaults } from '../../utils/Global';

type SideMenuProps = {
    toggleCollapse: () => void;
    isCollapsed: boolean;
}

export default class SideMenu extends React.Component<SideMenuProps, {}> {
    constructor(props: any) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    private toggleCollapse() {
        this.props.toggleCollapse();
    }

    public render() {

        const { isCollapsed } = this.props;
        const children= this.props.children as any[];

        return <div className={`sideMenu ${isCollapsed ? "" : "open"} fadeIn`} >
            <button type="button" className="btn btn-light form-control rounded-0 d-block mb-4" onClick={this.toggleCollapse}>
                {isCollapsed ? <FaAngleDoubleRight fontSize={defaults.iconSize} /> : <FaAngleDoubleLeft fontSize={defaults.iconSize} />}
            </button>
            <nav className="nav flex-column nav-pills">
                {children}
            </nav>
        </div>;
    }
}