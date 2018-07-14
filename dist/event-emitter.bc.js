(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EventEmitter = factory());
}(this, (function () { 'use strict';

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

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

var defineProperty = Object.defineProperty;
var methods = [ 'clear', 'delete', 'entries', 'forEach', 'get', 'has', 'keys', 'set', 'values' ];

var supportNativeMap = function () {
    if( typeof Map === 'undefined' ) { return false; }
    for( var i = 0, list = methods; i < list.length; i += 1 ) {
        var method = list[i];

        if( !isFunction( Map.prototype[ method ] ) ) { return false; }
    }
    return true;
};

function find( haystack, key ) {
    for( var i = 0, list = haystack; i < list.length; i += 1 ) {
        var item = list[i];

        if( item[ 0 ] === key ) { return item; }
    }
    return false;
}

var M = function M( iterable, nativeMap ) {
    if ( iterable === void 0 ) iterable = [];
    if ( nativeMap === void 0 ) nativeMap = true;

    if( !( this instanceof M ) ) {
        throw new TypeError( 'Constructor Map requires \'new\'' );
    }

    if( nativeMap && supportNativeMap() ) {
        return new Map( iterable );
    }

    var map = iterable || [];

    defineProperty( map, 'size', {
        enumerable : false,
        get: function get() {
            return this.length;
        }
    } );

    defineProperty( map, 'get', {
        enumerable : false,
        value : function( key ) {
            var data = find( this, key );
            return data ? data[ 1 ] : undefined;
        }
    } );

    defineProperty( map, 'set', {
        enumerable : false,
        value : function( key, value ) {
            var data = find( this, key );
            if( data ) {
                data[ 1 ] = value;
            } else {
                this.push( [ key, value ] );
            }
            return this;
        }
    } );

    defineProperty( map, 'delete', {
        enumerable : false,
        value : function( key ) {
            var this$1 = this;

            for( var i = 0, l = this.length; i < l; i += 1 ) {
                if( this$1[ i ][ 0 ] === key ) {
                    this$1.splice( i, 1 );
                    return true;
                }
            }
            return false;
        }
    } );

    defineProperty( map, 'clear', {
        enumerable : false,
        value : function() {
            this.length = 0;
        }
    } );

    defineProperty( map, 'forEach', {
        enumerable : false,
        value : function( callback, thisArg ) {
            var this$1 = this;

            isUndefined( thisArg ) && ( thisArg = this );
            for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                var item = list[i];

                callback.call( thisArg, item[ 1 ], item[ 0 ], this$1 );
            }
        }
    } );

    defineProperty( map, 'has', {
        enumerable : false,
        value : function( key ) {
            return !!find( this, key );
        }
    } );

    defineProperty( map, 'keys', {
        enumerable : false,
        value : function() {
            var this$1 = this;

            var keys = [];
            for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                var item = list[i];

                keys.push( item[ 0 ] );
            }
            return keys;
        }
    } );

    defineProperty( map, 'entries', {
        enumerable : false,
        value : function() {
            return this;
        }
    } );

    defineProperty( map, 'values', {
        enumerable : false,
        value : function() {
            var this$1 = this;

            var values = [];
            for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                var item = list[i];

                values.push( item[ 1 ] );
            }
            return values;
        }
    } );
    return map;
};

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

function isAsyncFunction$1 (fn) { return ( {} ).toString.call( fn ) === '[object AsyncFunction]'; }

function isFunction$1 (fn) { return ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction$1( fn ); }

function isUndefined$1() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

var defineProperty$1 = Object.defineProperty;
var g = typeof global === 'undefined' ? window : global;
var methods$1 = [ 'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'values' ];

var supportNativeSet = function () {
    if( !g.Set ) { return false; }
    for( var i = 0, list = methods$1; i < list.length; i += 1 ) {
        var method = list[i];

        if( !isFunction$1( Set.prototype[ method ] ) ) { return false; }
    }
    return true;
};

var S = function S( iterable, nativeSet ) {
    if ( iterable === void 0 ) iterable = [];
    if ( nativeSet === void 0 ) nativeSet = true;

    if( nativeSet && supportNativeSet() ) {
        return new g.Set( iterable );
    }

    if( !( this instanceof S ) ) {
        throw new TypeError( 'Constructor Set requires \'new\'' );
    }

    var set = [];

    defineProperty$1( set, 'size', {
        enumerable : false,
        get: function get() {
            return set.length;
        }
    } );

    defineProperty$1( set, 'add', {
        enumerable : false,
        value : function( value ) {
            var i = this.indexOf( value );
            if( i > -1 ) {
                this[ i ] = value;
            } else {
                this.push( value );
            }
            return this;
        }
    } );

    defineProperty$1( set, 'delete', {
        enumerable : false,
        value : function( value ) {
            var i = this.indexOf( value );
            if( i > -1 ) {
                this.splice( i, 1 );
                return true;
            }
            return false;
        }
    } );

    defineProperty$1( set, 'clear', {
        enumerable : false,
        value : function() {
            this.length = 0;
        }
    } );

    defineProperty$1( set, 'forEach', {
        enumerable : false,
        value : function( callback, thisArg ) {
            var this$1 = this;

            isUndefined$1( thisArg ) && ( thisArg = this );
            for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                var item = list[i];

                callback.call( thisArg, item, item, this$1 );
            }
        }
    } );

    defineProperty$1( set, 'has', {
        enumerable : false,
        value : function( value ) {
            return this.indexOf( value ) > -1;
        }
    } );

    defineProperty$1( set, 'keys', {
        enumerable : false,
        value : function() {
            return this.values();
        }
    } );

    defineProperty$1( set, 'entries', {
        enumerable : false,
        value : function() {
            var this$1 = this;

            var res = [];
            for( var i = 0, list = this$1; i < list.length; i += 1 ) {
                var item = list[i];

                res.push( [ item, item ] ); 
            }
            return res;
        }
    } );

    defineProperty$1( set, 'values', {
        enumerable : false,
        value : function() {
            return this;
        }
    } );

    if( iterable ) {
        for( var i = 0, list = iterable; i < list.length; i += 1 ) {
            var item = list[i];

            set.add( item );
        }
    }
    return set;
};

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

function isAsyncFunction$2 (fn) { return ( {} ).toString.call( fn ) === '[object AsyncFunction]'; }

function isFunction$2 (fn) { return ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction$2( fn ); }

function isRegExp (reg) { return ({}).toString.call( reg ) === '[object RegExp]'; }

var defaultExport = function defaultExport() {
    this.__listeners = new M();
};

defaultExport.prototype.on = function on ( evt, handler ) {
    var listeners = this.__listeners;
    var handlers = listeners.get( evt );

    if( !handlers ) {
        handlers = new S();
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
    } else if( isFunction$2( rule ) ) {
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
