
import _ from 'underscore';
import Actions from '../actions/actions';
import Notifications from '../actions/notifications';
import {APP_STATE} from '../config';

class AppStore {

    constructor() {
        this.init();
        this.connect();
    }

    init() {
        _.bindAll(this, 'changeState', 'onJediListFull');
        this._state = APP_STATE.LOADING;
    }

    connect() {
        Actions.changeSystemState.add(this.changeState);
        Notifications.jediListFull.add(this.onJediListFull);
    }

    changeState(newState) {
        if(!newState || this._state === newState) return;

        console.log(this + '::changeState()', newState);

        this._state = newState;
        this.notify();
    }

    onJediListFull() {
        this.changeState(APP_STATE.ACTIVE);
    }

    isActive() {
        return this._state === APP_STATE.ACTIVE;
    }

    isLoading() {
        return this._state === APP_STATE.LOADING;
    }

    notify() {
        Notifications.appStoreChanged.dispatch();
    }

    toString() {
        return 'AppStore';
    }
}

export default new AppStore();
