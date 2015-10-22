import Signal from 'signals';

export default {
    planetChanged: new Signal(),
    jediLoaded: new Signal(),
    jediStoreChanged: new Signal(),
    appStoreChanged: new Signal(),
    jediListFull: new Signal()
};
