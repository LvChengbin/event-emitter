(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.EventEmitter = factory());
}(this, function () { 'use strict';

    function isString (str) { return typeof str === 'string' || str instanceof String; }

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

    function isAsyncFunction (fn) { return ( {} ).toString.call( fn ) === '[object AsyncFunction]'; }

    function isFunction (fn) { return ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn ); }

    function isRegExp (reg) { return ({}).toString.call( reg ) === '[object RegExp]'; }

    var defaultExport = function defaultExport() {
        this.__listeners = new Map();
    };

    defaultExport.prototype.on = function on ( evt, handler ) {
        var listeners = this.__listeners;
        var handlers = listeners.get( evt );

        if( !handlers ) {
            handlers = new Set();
            listeners.set( evt, handlers );
        }
        handlers.add( handler );
        return this;
    };

    defaultExport.prototype.once = function once ( evt, handler ) {
            var this$1 = this;

        var _handler = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

            handler.apply( this$1, args );
            this$1.removeListener( evt, _handler );
        };
        return this.on( evt, _handler );
    };

    defaultExport.prototype.removeListener = function removeListener ( evt, handler ) {
        var listeners = this.__listeners;
        var handlers = listeners.get( evt );
        handlers && handlers.delete( handler );
        return this;
    };

    defaultExport.prototype.emit = function emit ( evt ) {
            var this$1 = this;
            var args = [], len = arguments.length - 1;
            while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        var handlers = this.__listeners.get( evt );
        if( !handlers ) { return false; }
        handlers.forEach( function (handler) { return handler.call.apply( handler, [ this$1 ].concat( args ) ); } );
    };

    defaultExport.prototype.removeAllListeners = function removeAllListeners ( rule ) {
        var checker;
        if( isString( rule ) ) {
            checker = function (name) { return rule === name; };
        } else if( isFunction( rule ) ) {
            checker = rule;
        } else if( isRegExp( rule ) ) {
            checker = function (name) {
                rule.lastIndex = 0;
                return rule.test( name );
            };
        }

        var listeners = this.__listeners;

        listeners.forEach( function ( value, key ) {
            checker( key ) && listeners.delete( key );
        } );
        return this;
    };

    return defaultExport;

}));
