import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface NavMenuProps {
    currentPath: string;
    to?: string;
	className?: string;
	url?: string;
}

export default class NavMenuItem extends React.Component<NavMenuProps> {
    public render() {
        const { currentPath, to, children, className, url } = this.props;

        return <li className={`nav-item ${className || ''} ${to && currentPath.startsWith(to) ? 'active' : ''}`}>
			{url && // Navigate outside React Router
				<a className="nav-link" href={url}>
					{children}
				</a>
			}

			{to &&
				<Link to={to} className="nav-link">
					{children}
				</Link>
			}
        </li>;
    }
}
