import * as React from 'react';
import LayoutSearchForm from './LayoutSearchForm';
import { Link, RouteComponentProps } from 'react-router-dom';
import ImportLayoutList from './ImportLayoutList';


type ImportLayoutProps = {
    addLayout: (layoutId: string) => void;
    canAddLayout: (layoutId: string) => boolean;
} & RouteComponentProps<{}>;

export default class ImportLayout extends React.Component<ImportLayoutProps> {
    public render() {
        const { addLayout, canAddLayout } = this.props;
        return <div className="containsPagedList">
            <LayoutSearchForm />
            <ImportLayoutList
                addLayout={addLayout}
                canAddLayout={canAddLayout}
                className="smaller-font pagedList"
            />
        </div>;
    }
}