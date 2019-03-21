import * as React from 'react';
import { FaPlus } from 'react-icons/fa';
import LayoutSearchForm from './LayoutSearchForm';
import { Link, RouteComponentProps } from 'react-router-dom';
import LayoutList from './LayoutList';
import { defaults } from '../../../utils/Global';


type LayoutSearchPageProps = {
} & RouteComponentProps<{}>;

export default class LayoutSearchPage extends React.Component<LayoutSearchPageProps> {

    public componentDidMount() {
		document.title = defaults.titles.LayoutSearchPage;
    }
    public render() {
        return <div>
            <h1>Layout Search</h1>
            <LayoutSearchForm />
            <div className="mt-3 mb-3">
				<Link to="/layout/new" className={defaults.theme.buttons.class}>
                    <FaPlus />
                    {" "}
                    New Layout
                    </Link>
            </div>
            <LayoutList />
        </div>;
    }
}