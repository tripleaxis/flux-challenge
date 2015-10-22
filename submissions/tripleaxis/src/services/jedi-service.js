
import _ from 'underscore';
import * as Config from '../config';
import Actions from '../actions/actions';
import Notifications from '../actions/notifications';
import xhr from 'xhr';


class JediService {

    constructor() {
        this._requests = new Map();
        this.addListeners();
    }

    addListeners() {
        _.bindAll(this, 'fetch', 'clearQueue');

        Actions.loadJedi.add(this.fetch);
        Actions.abortRequests.add(this.clearQueue);
    }

    // fetch jedi info
    fetch(jediId) {
        console.log(this + '::fetch(' + jediId + ')');
        var request = xhr({
                url: this.buildURL({id: jediId}),
                responseType: 'json'
            }, (err, response) => {
                if(err) return this.onError(err);
                this.onSuccess(response);
            }
        );
        this._requests.set(request, 0);
    }

    // remove completed request
    clear(request) {
        if(request.readyState < 4) request.abort();
        this._requests.delete(request);
    }

    // Clear all current requests
    clearQueue() {
        console.log(this + '::clearQueue()');
        this._requests.forEach((val, key) => {
            this.clear(key);
        });
    }

    buildURL(opts) {
        return Config.JEDI_ENDPOINT.replace(/:([^\/]+)/gi, function(match, subgroup) {
            return opts[subgroup] || match;
        }) + '?ts=' + new Date().getTime() + ':' + Math.random()*1000;
    }

    onSuccess(response) {
        this.clear(response.rawRequest);
        Notifications.jediLoaded.dispatch(response.body);
    }

    onError(err) {
        //console.log(err);
    }

    toString() {
        return 'JediService';
    }
}

export default new JediService();
