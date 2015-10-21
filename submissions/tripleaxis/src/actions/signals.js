import Signal from 'signals';

var Actions = {
    loadJedi: new Signal(),
    connectSocket: new Signal(),
    disconnectSocket: new Signal(),
    abortRequests: new Signal(),
    freeze: new Signal(),
    unfreeze: new Signal()
};

var Notifications = {
    planetChanged: new Signal(),
    jediLoaded: new Signal(),
    storeChanged: new Signal(),
    upButtonClicked: new Signal(),
    downButtonClicked: new Signal()
};

export { Actions, Notifications };
