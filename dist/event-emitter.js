(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EventEmitter = factory());
}(this, (function () { 'use strict';

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

function find( haystack, key ) {
    for( let item of haystack ) {
        if( item[ 0 ] === key ) return item;
    }
    return false;
}

class Map {
    constructor( iterable = [] ) {
        if( !( this instanceof Map ) ) {
            throw new TypeError( 'Constructor Map requires \'new\'' );
        }
        this.map = iterable || [];
    }
    get size() {
        return this.map.length;
    }

    get( key ) {
        const data = find( this.map, key );
        return data ? data[ 1 ] : undefined;
    }

    set( key, value ) {
        const data = find( this.map, key );
        if( data ) {
            data[ 1 ] = value;
        } else {
            this.map.push( [ key, value ] );
        }
        return this;
    }

    delete( key ) {
        for( let i = 0, l = this.map.length; i < l; i += 1 ) {
            const item = this.map[ i ];
            if( item[ 0 ] === key ) {
                this.map.splice( i, 1 );
                return true;
            }
            
        }
        return false;
    }

    clear() {
        this.map= [];
    }

    forEach( callback, thisArg ) {
        isUndefined( thisArg ) && ( this.Arg = this );
        for( let item of this.map ) {
            callback.call( thisArg, item[ 1 ], item[ 0 ], this );
        }
    }

    has( key ) {
        return !!find( this.map, key );
    }

    keys() {
        const keys = [];
        for( let item of this.map ) {
            keys.push( item[ 0 ] );
        }
        return keys;
    }

    entries() {
        return this.map;
    }

    values() {
        const values = [];
        for( let item of this.map ) {
            values.push( item[ 1 ] );
        }
        return values;
    }
}

class Set {
    constructor( iterable = [] ) {
        if( !( this instanceof Set ) ) {
            throw new TypeError( 'Constructor Set requires \'new\'' );
        }
        this.set = [];

        if( iterable && iterable.length ) {
            for( let item of iterable ) this.add( item );
        }
    }

    get size() {
        return this.set.length;
    }

    add( value ) {
        const i = this.set.indexOf( value );
        if( i > -1 ) {
            this.set[ i ] = value;
        } else {
            this.set.push( value );
        }
        return this;
    }

    delete( value ) {
        const i = this.set.indexOf( value );
        if( i > -1 ) {
            this.set.splice( i, 1 );
            return true;
        }
        return false;
    }

    clear() {
        this.set = [];
    }

    forEach( callback, thisArg ) {
        isUndefined( thisArg ) && ( this.Arg = this );
        for( let item of this.set ) {
            callback.call( thisArg, item, item, this );
        }
    }

    has( value ) {
        return this.set.indexOf( value ) > -1;
    }

    keys() {
        return this.values();
    }

    entries() {
        const res = [];
        for( let item of this.set ) {
            res.push( [ item, item ] ); 
        }
        return res;
    }

    values() {
        return this.set;
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

})));
