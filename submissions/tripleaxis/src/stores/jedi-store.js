
import _ from 'underscore';
import {LIST_LENGTH} from '../core/config';
import {Actions, Notifications} from '../actions/signals';

class JediStore {

    constructor() {
        this.init();
        this.connect();
    }

    init() {
        _.bindAll(this, 'onPlanetChanged', 'onJediLoaded');

        this._planet = {
            name: 'nowhere'
        };
        this._jedis = [];
    }

    connect() {
        Notifications.planetChanged.add(this.onPlanetChanged);
        Notifications.jediLoaded.add(this.onJediLoaded);
    }

    disconnect() {
        Notifications.planetChanged.remove(this.onPlanetChanged);
        Notifications.jediLoaded.remove(this.onJediLoaded);
    }

    onPlanetChanged(payload) {
        this._planet = JSON.parse(payload);
        this._jedis.forEach((item) => {
            if(!item) return;
            item.alert = item.homeworld.id === this._planet.id;
        });
        this.notify();
    }

    onJediLoaded(payload, action) {
        console.log(this + '::onJediLoaded()', payload);
        payload.alert = false;

        if(this._jedis.length >= LIST_LENGTH) {
            Actions.abortRequests.dispatch();
            return;
        }

        // add jedi to list, load surrounding rows and notify
        this._jedis[action](payload);

        this.loadNext(payload.apprentice.id, 'push');
        this.loadNext(payload.master.id, 'unshift');

        this.notify();
    }

    loadNext(id, action) {
        if(!id || this._jedis.some((item) => { return item.id === id; })) {
            // only load if id not null and doesn't already exist in the current list.
            return;
        }

        Actions.loadJedi.dispatch(id, action);
    }

    notify() {
        Notifications.storeChanged.dispatch();
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
