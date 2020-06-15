import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { CookiesProvider } from 'react-cookie';
import { authReducer } from './store/reducers/auth';
import { dataReducer } from './store/reducers/data';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <CookiesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
