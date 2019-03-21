import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import BackButton from '../common/BackButton';
import Alert from '../common/Alert';
import { defaults } from '../../utils/Global';

type LoadFailureProps =
    RouteComponentProps<{}>;

export default class LoadFailure extends React.Component<LoadFailureProps, {}> {
    public render() {
        const { history } = this.props;

        return <div>
            <h1>An error occurred</h1>
            <Alert alertType="danger">
                {<h6>{defaults.loadErrorDisplayMessage}</h6>}
            </Alert> 
            <BackButton goBack={history.goBack} />
        </div>;
    }
}
