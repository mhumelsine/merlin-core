import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type PageNotFoundProps =
    RouteComponentProps<{}>;

export default class PageNotFound extends React.Component<PageNotFoundProps, {}> {
    public render() {

        return  <div className="d-flex justify-content-center">
                <div>
                    <h1>404 page not found</h1>
                    <p>We are sorry but the page you are looking for does not exist.</p>
                </div>
        </div>;
    }
}
