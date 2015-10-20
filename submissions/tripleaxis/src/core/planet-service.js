import EventEmitter from 'events';
import * as Config from  '../core/config.js';
import * as Signals from '../actions/signals';

class PlanetService extends EventEmitter {

    constructor() {
        super();
        this._socket = undefined;
    }

    connect() {
        if (this.isConnected()) return;
        this._socket = new WebSocket(Config.PLANET_SOCKET);
        this._socket.onmessage = this.onMessage.bind(this);
        this._socket.onerror = this.onError.bind(this);
    }

    onMessage(payload) {
        //console.log(this + '::onMessage()', payload.data);
        Signals.planetChanged.dispatch(payload.data);
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
