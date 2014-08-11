/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    debug = require('debug')('TimeStore');

function TimeStore(dispatcher) {
    this.time = new Date();
}

TimeStore.storeName = 'TimeStore';

util.inherits(TimeStore, EventEmitter);

TimeStore.prototype.handleTimeChange = function (payload) {
    this.time = new Date();
    this.emit('change');
};

TimeStore.handlers = {
    'CHANGE_ROUTE': 'handleTimeChange',
    'CHANGE_TIME': 'handleTimeChange'
};

TimeStore.prototype.getState = function () {
    return {
        time: this.time.toString()
    };
};

TimeStore.prototype.rehydrate = function (state) {
    this.time = new Date(state.time);
};

module.exports = TimeStore;
