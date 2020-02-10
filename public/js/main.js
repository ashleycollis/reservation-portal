// jest won't error out on DOM calls.
console.log(document.querySelector('p').innerHTML);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';

// establishes socket connection
import './socket';

ReactDOM.render(<App />, document.getElementById('app'));
