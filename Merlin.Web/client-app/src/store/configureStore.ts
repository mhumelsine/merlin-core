import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as StoreModule from './';
import { ApplicationState, reducers } from './';
import { History } from 'history';

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const enhancers = [];

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment && typeof window !== 'undefined' && (window as any).devToolsExtension) {
        enhancers.push((window as any).devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        router: connectRouter(history)
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
