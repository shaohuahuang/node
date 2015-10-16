import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configStore from './store/configStore';

const store = configStore();

React.render(
    <Provider store={store}>
        {() => (<App />)}
    </Provider>, document.getElementById('app')
);