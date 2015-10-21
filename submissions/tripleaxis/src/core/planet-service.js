
import _ from 'underscore';
import * as Config from  '../core/config.js';
import {Actions, Notifications} from '../actions/signals';

class PlanetService {

    constructor() {
        this.init();
    }

    init() {
        this._socket = undefined;
        _.bindAll(this, 'connect', 'disconnect', 'onMessage', 'onError');
        Actions.connectSocket.add(this.connect);
        Actions.disconnectSocket.add(this.disconnect);
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

    onError(payload) {
        console.log(this + '::onError()', payload);
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
