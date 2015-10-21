
import _ from 'underscore';
import * as Config from './config';
import {Actions, Notifications} from '../actions/signals';
import xhr from 'xhr';


class JediService {

    constructor() {
        this._requests = [];
        this.addListeners();
    }

    addListeners() {
        _.bindAll(this, 'fetch', 'abortAll');

        Actions.loadJedi.add(this.fetch);
        Actions.abortRequests.add(this.abortAll);
    }

    // fetch jedi info
    fetch(jediId, action='push') {
        console.log(this + '::fetch(' + jediId + ')');
        var request = xhr({
                url: this.buildURL({id: jediId}),
                responseType: 'json'
            }, (err, response, body) => {
                this.abort(response.rawRequest);
                if(err) return this.onError(err);
                this.onSuccess(body, action);
            }
        );
        this._requests.push(request);
    }

    // Abort and remove single request
    abort(requestObj) {
        requestObj.abort();
        this._requests = this._requests.filter((item) => {
            return item !== requestObj;
        });
    }

    // Abort all current requests
    abortAll() {
        console.log(this + '::abortAll()');
        while(this._requests.length) {
            this.abort(this._requests[0]);
        }
    }

    buildURL(opts) {
        return Config.JEDI_ENDPOINT.replace(/:([^\/]+)/gi, function(match, subgroup) {
            return opts[subgroup] || match;
        });
    }

    onSuccess(payload, action) {
        Notifications.jediLoaded.dispatch(payload, action);
    }

    onError(err) {
        console.log(err);
    }

    toString() {
        return 'JediService';
    }
}

export default new JediService();
