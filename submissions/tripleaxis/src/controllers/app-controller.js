import JediStore from '../stores/jedi-store';
import AppStore from '../stores/app-store';
import {planetChanged} from '../actions/notifications';
import {changeSystemState, loadJedi} from '../actions/actions';
import {APP_STATE} from '../config';

import _ from 'underscore';

class AppController {

    constructor() {
        _.bindAll(this, 'onChange', 'onJediRequested');
    }

    connect() {
        planetChanged.add(this.onChange);
    }

    onChange() {
        if(AppStore.isLoading()) return;

        var planet = JediStore.getPlanet();
        var jedis = JediStore.getJediList();
        var samePlanet = (JediStore.getJediList().some((jedi) => {
            return jedi.homeworld.id === planet.id;
        }));

        changeSystemState.dispatch(
            samePlanet ? APP_STATE.INACTIVE : APP_STATE.ACTIVE
        );
    }

    onJediRequested() {
        changeSystemState.dispatch(APP_STATE.LOADING);
    }

    toString() {
        return 'AppController';
    }
}

export default new AppController();
