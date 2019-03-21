import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import NavMenuItem from './NavMenuItem';
import { defaults } from '../utils/Global';
import { isViewOnlyPathname } from '../utils/UIUtils';

type NavProps = RouteComponentProps<any>;

export default class NavMenu extends React.Component<NavProps> {
    state = {
        menuCollapsed: true,
        externalCollapsed: true
    };

    constructor(props: NavProps) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.toggleExternal = this.toggleExternal.bind(this);
    }

    public render() {
        const { location } = this.props;
        const { externalCollapsed, menuCollapsed } = this.state;

        const dropdownFontStyle = { fontSize: '1rem' };

        const { pathname } = location;

        // do not show for merlin display page

        if (isViewOnlyPathname(location.pathname)) {
            return null;
        }

        return <nav className="navbar fixed-top navbar-expand-md navbar-dark" style={{ backgroundColor: '#2c3c53' }}>
            <Link className="navbar-brand" to="/">
                <img src={require('../css/img/merlinlogo.png')} alt="Merlin Logo" />
            </Link>
            <button className="navbar-toggler" type="button" onClick={this.onChange} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${menuCollapsed ? '' : 'show'}`}>
                <div className="d-flex flex-column ml-auto">

                    <ul className="navbar-nav ml-auto d-none d-md-flex" style={{ fontSize: '1rem' }}>
                        <NavMenuItem url="../Merlin/Administration/adm_admin_lst.aspx" currentPath={location.pathname}>Admin</NavMenuItem>
                        <li><span className="nav-link">|</span></li>
                        <NavMenuItem url="../Merlin/Administration/adm_help_lst.aspx"  currentPath={location.pathname}>Help</NavMenuItem>
                        <li><span className="nav-link">|</span></li>
                        <NavMenuItem to={defaults.urls.logoff} currentPath={location.pathname}>Log Off</NavMenuItem>
                    </ul>

                    <ul className="navbar-nav" style={{ fontSize: '1rem' }}>
                        <NavMenuItem className="mr-3 pb-3" to="/" currentPath={location.pathname}>Search</NavMenuItem>
						<NavMenuItem className="mr-3 pb-3" to={defaults.urls.questionManager} currentPath={location.pathname}>Question Manager</NavMenuItem>
                    </ul>
                </div>
            </div>
        </nav>;
    }

    private onChange() {
        this.setState({ menuCollapsed: !this.state.menuCollapsed });
    }

    private toggleExternal(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState({ externalCollapsed: !this.state.externalCollapsed });
    }

    private renderMenu() {

    }
}
