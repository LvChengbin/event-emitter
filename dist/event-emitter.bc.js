(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EventEmitter = factory());
}(this, (function () { 'use strict';

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

function find( haystack, key ) {
    for( var i = 0, list = haystack; i < list.length; i += 1 ) {
        var item = list[i];

        if( item[ 0 ] === key ) { return item; }
    }
    return false;
}

var Map = function Map( iterable ) {
    if ( iterable === void 0 ) iterable = [];

    if( !( this instanceof Map ) ) {
        throw new TypeError( 'Constructor Map requires \'new\'' );
    }
    this.map = iterable || [];
};

var prototypeAccessors = { size: { configurable: true } };
prototypeAccessors.size.get = function () {
    return this.map.length;
};

Map.prototype.get = function get ( key ) {
    var data = find( this.map, key );
    return data ? data[ 1 ] : undefined;
};

Map.prototype.set = function set ( key, value ) {
    var data = find( this.map, key );
    if( data ) {
        data[ 1 ] = value;
    } else {
        this.map.push( [ key, value ] );
    }
    return this;
};

Map.prototype.delete = function delete$1 ( key ) {
        var this$1 = this;

    for( var i = 0, l = this.map.length; i < l; i += 1 ) {
        var item = this$1.map[ i ];
        if( item[ 0 ] === key ) {
            this$1.map.splice( i, 1 );
            return true;
        }
            
    }
    return false;
};

Map.prototype.clear = function clear () {
    this.map= [];
};

Map.prototype.forEach = function forEach ( callback, thisArg ) {
        var this$1 = this;

    isUndefined( thisArg ) && ( this.Arg = this );
    for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
        var item = list[i];

            callback.call( thisArg, item[ 1 ], item[ 0 ], this$1 );
    }
};

Map.prototype.has = function has ( key ) {
    return !!find( this.map, key );
};

Map.prototype.keys = function keys () {
        var this$1 = this;

    var keys = [];
    for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
        var item = list[i];

            keys.push( item[ 0 ] );
    }
    return keys;
};

Map.prototype.entries = function entries () {
    return this.map;
};

Map.prototype.values = function values () {
        var this$1 = this;

    var values = [];
    for( var i = 0, list = this$1.map; i < list.length; i += 1 ) {
        var item = list[i];

            values.push( item[ 1 ] );
    }
    return values;
};

Object.defineProperties( Map.prototype, prototypeAccessors );

var Set = function Set( iterable ) {
    var this$1 = this;
    if ( iterable === void 0 ) iterable = [];

    if( !( this instanceof Set ) ) {
        throw new TypeError( 'Constructor Set requires \'new\'' );
    }
    this.set = [];

    if( iterable && iterable.length ) {
        for( var i = 0, list = iterable; i < list.length; i += 1 ) {
            var item = list[i];

            this$1.add( item );
        }
    }
};

var prototypeAccessors$1 = { size: { configurable: true } };

prototypeAccessors$1.size.get = function () {
    return this.set.length;
};

Set.prototype.add = function add ( value ) {
    var i = this.set.indexOf( value );
    if( i > -1 ) {
        this.set[ i ] = value;
    } else {
        this.set.push( value );
    }
    return this;
};

Set.prototype.delete = function delete$1 ( value ) {
    var i = this.set.indexOf( value );
    if( i > -1 ) {
        this.set.splice( i, 1 );
        return true;
    }
    return false;
};

Set.prototype.clear = function clear () {
    this.set = [];
};

Set.prototype.forEach = function forEach ( callback, thisArg ) {
        var this$1 = this;

    isUndefined( thisArg ) && ( this.Arg = this );
    for( var i = 0, list = this$1.set; i < list.length; i += 1 ) {
        var item = list[i];

            callback.call( thisArg, item, item, this$1 );
    }
};

Set.prototype.has = function has ( value ) {
    return this.set.indexOf( value ) > -1;
};

Set.prototype.keys = function keys () {
    return this.values();
};

Set.prototype.entries = function entries () {
        var this$1 = this;

    var res = [];
    for( var i = 0, list = this$1.set; i < list.length; i += 1 ) {
        var item = list[i];

            res.push( [ item, item ] ); 
    }
    return res;
};

Set.prototype.values = function values () {
    return this.set;
};

Object.defineProperties( Set.prototype, prototypeAccessors$1 );

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

})));
