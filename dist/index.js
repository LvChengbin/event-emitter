"use strict";
/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: src/index.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/13/2020
 * Description:
 ******************************************************************/
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _listeners, _on;
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitter {
    constructor() {
        _listeners.set(this, new Map());
        // #on!: ( evt: EventType, handler: Handler, realHandler: Handler | null ) => this;
        _on.set(this, (evt, handler, realHandler) => {
            const listeners = __classPrivateFieldGet(this, _listeners);
            let handlers = listeners.get(evt);
            if (!handlers) {
                handlers = new Map();
                listeners.set(evt, handlers);
            }
            handlers.set(handler, realHandler);
            return this;
        });
    }
    on(evt, handler) {
        return __classPrivateFieldGet(this, _on).call(this, evt, handler, null);
    }
    once(evt, handler) {
        return __classPrivateFieldGet(this, _on).call(this, evt, handler, (...args) => {
            handler.apply(this, args);
            this.removeListener(evt, handler);
        });
    }
    emit(evt, ...args) {
        const handlers = __classPrivateFieldGet(this, _listeners).get(evt);
        if (!handlers)
            return false;
        handlers.forEach((realHandler, handler) => {
            if (realHandler) {
                realHandler.call(this, ...args);
            }
            else {
                handler.call(this, ...args);
            }
        });
        return true;
    }
    removeListener(evt, handler) {
        const listeners = __classPrivateFieldGet(this, _listeners);
        const handlers = listeners.get(evt);
        handlers && handlers.delete(handler);
        return this;
    }
    removeAllListeners(evt) {
        if (evt) {
            __classPrivateFieldGet(this, _listeners).delete(evt);
        }
        else {
            __classPrivateFieldSet(this, _listeners, new Map());
        }
        return this;
    }
}
exports.default = EventEmitter;
_listeners = new WeakMap(), _on = new WeakMap();
