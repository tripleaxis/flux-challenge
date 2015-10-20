
import * as Signals from '../actions/signals';
import {buildJediURL} from '../util/service-util';
import xhr from 'xhr';

class JediService {

    constructor() {
        this._requests = [];
    }

    fetch(jediId, slotId) {
        console.log(this + '::fetch(' + jediId + ')');
        var request = xhr({
                url: buildJediURL({id: jediId}),
                responseType: 'json'
            }, (err, response, body) => {
                if(err) return this.onError(err);
                this.onSuccess(body, slotId);
            }
        );
        this._requests.push(request);
        return this._requests.length-1;
    }

    abort(requestId) {
        console.log(this + '::abort()', requestId);
    }

    onSuccess(payload, slotId) {
        //console.log(this + '::onSuccess()', payload);
        Signals.jediLoaded.dispatch(payload, slotId);
    }

    onError(err) {
        console.log(err);
    }

    toString() {
        return 'JediService';
    }
}

export default new JediService();
