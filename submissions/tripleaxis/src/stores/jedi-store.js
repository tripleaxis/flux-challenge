import _ from 'underscore';
import {LIST_LENGTH, SCROLL_SIZE} from '../config';
import Actions from '../actions/actions';
import Notifications from '../actions/notifications';


let _jediList = new Map();
let _displayList = [];
let _planet = { name: 'Nowhere' };

function _updateDisplayList() {
    _displayList = [];
    _jediList.forEach((val) => { _displayList.push(val); });
    _displayList.sort((a, b) => a.id === b.master.id ? -1 : 1);

    // pad with undefined:
    while(_displayList.length < LIST_LENGTH) _displayList.push(undefined);
}

class JediStore {

    constructor() {
        this.init();
        this.connect();
    }

    init() {
        _.bindAll(this,
            'onPlanetChanged', 'onJediLoaded',
            'onScrollUp', 'onScrollDown'
        );
    }

    // add priorities so that these listeners are always processed first
    connect() {
        Notifications.planetChanged.add(this.onPlanetChanged, null, 1);
        Notifications.jediLoaded.add(this.onJediLoaded, null, 1);
        Actions.scrollUp.add(this.onScrollUp, null, 1);
        Actions.scrollDown.add(this.onScrollDown, null, 1);
    }

    onPlanetChanged(payload) {
        _planet = JSON.parse(payload);
        _jediList.forEach((item) => {
            if (!item) return;
            item.alert = item.homeworld.id === _planet.id;
        });
        this.notify();
    }

    onScrollUp() {
        console.log(this + '::onScrollUp()');
        var i=SCROLL_SIZE;
        while(--i>-1) {
            _jediList.delete(_displayList.pop().id);
            _displayList.unshift(undefined);
        }

        Actions.loadJedi.dispatch(_displayList[SCROLL_SIZE].master.id);
        this.notify();
    }

    onScrollDown() {
        console.log(this + '::onScrollDown()');
        var i=SCROLL_SIZE;
        while(--i>-1) {
            _jediList.delete(_displayList.shift().id);
            _displayList.push(undefined);
        }

        Actions.loadJedi.dispatch(_displayList[_displayList.length-SCROLL_SIZE-1].apprentice.id);
        this.notify();
    }

    onJediLoaded(payload) {
        console.log(this + '::onJediLoaded()', payload);
        payload.alert = false;

        // add jedi to list, load surrounding rows and notify
        _jediList.set(payload.id, payload);

        _updateDisplayList();
        this.notify();

        // If list is full, dispatch notifications and exit
        if (_jediList.size === LIST_LENGTH) {
            Actions.abortRequests.dispatch();
            Notifications.jediListFull.dispatch();
            return;
        }

        // load master and apprentice
        this.loadNext(payload.apprentice.id, payload.id);
        this.loadNext(payload.master.id, payload.id);
    }

    // only load if id isn't null and it doesn't exist already.
    loadNext(id) {
        if (!id || _jediList.has(id)) return;
        Actions.loadJedi.dispatch(id);
    }

    notify() {
        Notifications.jediStoreChanged.dispatch();
    }

    getJediList() {
        var list = JSON.parse(JSON.stringify(_displayList));
        list.first = list[0];
        list.last = list[LIST_LENGTH-1];
        return list;
    }

    getPlanet() {
        return JSON.parse(JSON.stringify(_planet));
    }

    toString() {
        return 'JediStore';
    }
}

export default new JediStore();
