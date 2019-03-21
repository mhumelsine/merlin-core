import './css/bootstrap.theme.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/site.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory, BrowserHistoryBuildOptions } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SessionLoader from './components/SessionLoader';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl } as BrowserHistoryBuildOptions);

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState;
const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <SessionLoader>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </SessionLoader>
    </Provider>,
    rootElement);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
