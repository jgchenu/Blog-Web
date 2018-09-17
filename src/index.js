import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import Router from './router';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render( 
<Provider >
    <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();
