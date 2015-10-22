
import React from 'react';
import ReactDOM from 'react-dom';
import PolyFill from 'babel-core/polyfill';
import Actions from './actions/actions';
import Dashboard from './components/dashboard';
import PlanetService from './services/planet-service';
import JediService from './services/jedi-service';
import AppController from './controllers/app-controller';

PlanetService.connect();
AppController.connect();
Actions.loadJedi.dispatch(3616);

ReactDOM.render(<Dashboard />, document.querySelector('#root'));
