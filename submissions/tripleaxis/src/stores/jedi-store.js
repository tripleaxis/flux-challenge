
import Flux from 'flux';
import {LIST_LENGTH} from '../core/config';
import * as Signals from '../actions/signals';

class JediStore {

    constructor() {
        this.init();
        this.connect();
    }

    init() {
        this.onPlanetChanged = this.onPlanetChanged.bind(this);
        this.onJediLoaded = this.onJediLoaded.bind(this);

        this._planet = {
            name: 'nowhere'
        };
        this._jedis = [];
        while(this._jedis.length < LIST_LENGTH) this._jedis.push(undefined);
    }

    connect() {
        Signals.planetChanged.add(this.onPlanetChanged);
        Signals.jediLoaded.add(this.onJediLoaded);
    }

    disconnect() {
        Signals.planetChanged.remove(this.onPlanetChanged);
        Signals.jediLoaded.remove(this.onJediLoaded);
    }

    onPlanetChanged(payload) {
        this._planet = JSON.parse(payload);
        this._jedis.forEach((item) => {
            if(!item) return;
            item.alert = item.homeworld.id === this._planet.id;
        });
        this.notify();
    }

    onJediLoaded(payload, slotId) {
        console.log(this + '::onJediLoaded()', payload);
        payload.alert = false;
        this._jedis[slotId] = payload;
        this.notify();
    }

    notify() {
        Signals.storeChanged.dispatch();
    }

    getState() {
        return {
            planet: this._planet,
            jedis: this._jedis
        };
    }

    toString() {
        return 'JediStore';
    }
}

export default new JediStore();
