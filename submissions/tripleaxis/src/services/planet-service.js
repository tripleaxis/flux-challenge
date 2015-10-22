
import _ from 'underscore';
import * as Config from  '../config.js';
import Notifications from '../actions/notifications';
import Actions from '../actions/actions';


class PlanetService {

    constructor() {
        this.init();
    }

    init() {
        this._socket = undefined;
        _.bindAll(this, 'onMessage', 'onError');
    }

    connect() {
        if (this.isConnected()) return;
        this._socket = new WebSocket(Config.PLANET_SOCKET);
        this._socket.onmessage = this.onMessage;
        this._socket.onerror = this.onError;
    }

    onMessage(payload) {
        Notifications.planetChanged.dispatch(payload.data);
    }

    onError(err) {
        console.log(this + '::onError()', err);
    }

    disconnect() {
        if (!this.isConnected()) return;
        this._socket.close();
        this._socket = undefined;
    }

    isConnected() {
        return this._socket !== undefined;
    }

    toString() {
        return 'JediService';
    }
}

export default new PlanetService();
