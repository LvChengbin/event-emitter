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

var isAsyncFunction = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

var isFunction = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

const defineProperty = Object.defineProperty;
const methods = [ 'clear', 'delete', 'entries', 'forEach', 'get', 'has', 'keys', 'set', 'values' ];

const supportNativeMap = () => {
    if( typeof Map === 'undefined' ) return false;
    for( const method of methods ) {
        if( !isFunction( Map.prototype[ method ] ) ) return false;
    }
    return true;
};

function find( haystack, key ) {
    for( let item of haystack ) {
        if( item[ 0 ] === key ) return item;
    }
    return false;
}

class M {
    constructor( iterable = [], nativeMap = true ) {
        if( !( this instanceof M ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }

        if( nativeMap && supportNativeMap() ) {
            return new Map( iterable );
        }

        const map = iterable || [];

        defineProperty( map, 'size', {
            enumerable : false,
            get() {
                return this.length;
            }
        } );

        defineProperty( map, 'get', {
            enumerable : false,
            value : function( key ) {
                const data = find( this, key );
                return data ? data[ 1 ] : undefined;
            }
        } );

        defineProperty( map, 'set', {
            enumerable : false,
            value : function( key, value ) {
                const data = find( this, key );
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
                for( let i = 0, l = this.length; i < l; i += 1 ) {
                    if( this[ i ][ 0 ] === key ) {
                        this.splice( i, 1 );
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
                isUndefined( thisArg ) && ( thisArg = this );
                for( let item of this ) {
                    callback.call( thisArg, item[ 1 ], item[ 0 ], this );
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
                const keys = [];
                for( let item of this ) {
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
                const values = [];
                for( let item of this ) {
                    values.push( item[ 1 ] );
                }
                return values;
            }
        } );
        return map;
    }
}

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

var isAsyncFunction$1 = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

var isFunction$1 = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction$1( fn );

function isUndefined$1() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

const defineProperty$1 = Object.defineProperty;
const g = typeof global === 'undefined' ? window : global;
const methods$1 = [ 'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'values' ];

const supportNativeSet = () => {
    if( !g.Set ) return false;
    for( let method of methods$1 ) {
        if( !isFunction$1( Set.prototype[ method ] ) ) return false;
    }
    return true;
};

class S {
    constructor( iterable = [], nativeSet = true ) {
        if( nativeSet && supportNativeSet() ) {
            return new g.Set( iterable );
        }

        if( !( this instanceof S ) ) {
            throw new TypeError( 'Constructor Set requires \'new\'' );
        }

        const set = [];

        defineProperty$1( set, 'size', {
            enumerable : false,
            get() {
                return set.length;
            }
        } );

        defineProperty$1( set, 'add', {
            enumerable : false,
            value : function( value ) {
                const i = this.indexOf( value );
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
                const i = this.indexOf( value );
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
                isUndefined$1( thisArg ) && ( thisArg = this );
                for( let item of this ) {
                    callback.call( thisArg, item, item, this );
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
                const res = [];
                for( let item of this ) {
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
            for( const item of iterable ) set.add( item );
        }
        return set;
    }
}

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

var isAsyncFunction$2 = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

var isFunction$2 = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction$2( fn );

var isRegExp = reg => ({}).toString.call( reg ) === '[object RegExp]';

class eventEmitter {
    constructor() {
        this.__listeners = new M();
    }

    on( evt, handler ) {
        const listeners = this.__listeners;
        let handlers = listeners.get( evt );

        if( !handlers ) {
            handlers = new S();
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
        } else if( isFunction$2( rule ) ) {
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

})));
