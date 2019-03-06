(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.EventEmitter = factory());
}(this, function () { 'use strict';

    var isString = str => typeof str === 'string' || str instanceof String;

    /**
     * async function
     *
     * @syntax: 
     *  async function() {}
     *  async () => {}
     *  async x() => {}
     *
     * @compatibility
     * IE: no
     * Edge: >= 15
     * Android: >= 5.0
     *
     */

    var isAsyncFunction = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

    var isFunction = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );

    var isRegExp = reg => ({}).toString.call( reg ) === '[object RegExp]';

    class eventEmitter {
        constructor() {
            this.__listeners = new Map();
        }

        on( evt, handler ) {
            const listeners = this.__listeners;
            let handlers = listeners.get( evt );

            if( !handlers ) {
                handlers = new Set();
                listeners.set( evt, handlers );
            }
            handlers.add( handler );
            return this;
        }

        once( evt, handler ) {
            const _handler = ( ...args ) => {
                handler.apply( this, args );
                this.removeListener( evt, _handler );
            };
            return this.on( evt, _handler );
        }

        removeListener( evt, handler ) {
            const listeners = this.__listeners;
            const handlers = listeners.get( evt );
            handlers && handlers.delete( handler );
            return this;
        }

        emit( evt, ...args ) {
            const handlers = this.__listeners.get( evt );
            if( !handlers ) return false;
            handlers.forEach( handler => handler.call( this, ...args ) );
        }

        removeAllListeners( rule ) {
            let checker;
            if( isString( rule ) ) {
                checker = name => rule === name;
            } else if( isFunction( rule ) ) {
                checker = rule;
            } else if( isRegExp( rule ) ) {
                checker = name => {
                    rule.lastIndex = 0;
                    return rule.test( name );
                };
            }

            const listeners = this.__listeners;

            listeners.forEach( ( value, key ) => {
                checker( key ) && listeners.delete( key );
            } );
            return this;
        }
    }

    return eventEmitter;

}));
