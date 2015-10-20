
import React from 'react';
import ReactDOM from 'react-dom';
import PlanetService from './core/planet-service';
import JediService from  './core/jedi-service';
import Dashboard from './components/dashboard';

PlanetService.connect();
JediService.fetch(3616, 2);

ReactDOM.render(<Dashboard />, document.querySelector('#root'));
