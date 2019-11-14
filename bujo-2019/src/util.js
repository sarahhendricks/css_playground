
var Const = require('./const');

PDK.init({appId: Const.appId, cookie: true});

var Pinterest = {
    login: (callback) => {
        PDK.login({ scope : Const.PIN_SCOPE }, callback);
    },

    pins: (boardId, callback) => {
        PDK.request(`/boards/${boardId}/pins/`, callback);
    }
};

module.exports = Pinterest;