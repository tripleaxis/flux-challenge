import Signal from 'signals';

export default {
    loadJedi: new Signal(),
    abortRequests: new Signal(),
    changeSystemState: new Signal(),
    scrollUp: new Signal(),
    scrollDown: new Signal()
};
