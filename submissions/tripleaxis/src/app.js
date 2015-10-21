
import React from 'react';
import ReactDOM from 'react-dom';
import {Actions, Notifications} from './actions/signals';
import PlanetService from './core/planet-service';
import JediService from  './core/jedi-service';
import Dashboard from './components/dashboard';

Actions.connectSocket.dispatch();
Actions.loadJedi.dispatch(3616);

ReactDOM.render(<Dashboard />, document.querySelector('#root'));
