
import Signal from 'signals';

var planetChanged = new Signal();
var jediLoaded = new Signal();
var storeChanged = new Signal();
var upButtonClicked = new Signal();
var downButtonClicked = new Signal();

export {
    planetChanged,
    jediLoaded,
    storeChanged,
    upButtonClicked,
    downButtonClicked
};
