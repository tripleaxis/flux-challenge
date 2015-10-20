
import * as Config from '../core/config';

function buildJediURL(opts) {
    return Config.JEDI_ENDPOINT.replace(/:([^\/]+)/gi, function(match, subgroup) {
        return opts[subgroup] || match;
    });
}

export {
    buildJediURL
}
