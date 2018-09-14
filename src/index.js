import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render( 
<Provider >
    <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();
