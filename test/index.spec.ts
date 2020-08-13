/******************************************************************
 * Copyright (C) 2020 LvChengbin
 * 
 * File: test/index.spec.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/13/2020
 * Description: 
 ******************************************************************/

import EventEmitter from '../src';

describe( 'EventEmitter', () => {

    it( 'on', done => {
        let executed = false;
        const em = new EventEmitter();
        em.on( 'abc', ( a, b )  => {
            expect( a ).toEqual( 'a' );
            expect( b ).toEqual( 'b' );
            done();
            executed = true;
        } );

        em.on( 'abc', () => {
            expect( executed ).toBeTruthy();
        } );

        em.emit( 'abc', 'a', 'b' );
    } );

    it( 'using an object as the event type', done => {
        const em = new EventEmitter();
        const func = () => {};

        em.on( func, () => {
            done();
        } );

        em.emit( func );
    } );

    it( 'once', () => {
        const fn = jest.fn();
        const em = new EventEmitter();
        em.once( 'xyz', fn );

        em.emit( 'xyz' );
        em.emit( 'xyz' );
        em.emit( 'xyz' );
        em.emit( 'xyz' );
        em.emit( 'xyz' );

        expect( fn ).toHaveBeenCalledTimes( 1 );
    } );

    it( 'removeListener', () => {
        const em = new EventEmitter();
        const fn = jest.fn();
        em.on( '123', fn );
        em.removeListener( '123', fn );
        em.emit( '123' );
        expect( fn ).toHaveBeenCalledTimes( 0 );
    } );

    it( 'removeAllListeners', () => {
        const em = new EventEmitter();
        const fn = jest.fn();
        em.on( '123', fn );
        em.on( 'abc', fn );
        em.removeAllListeners( '123' );
        em.emit( '123' );
        expect( fn ).toHaveBeenCalledTimes( 0 );
        em.emit( 'abc' );
        expect( fn ).toHaveBeenCalledTimes( 1 );
        em.removeAllListeners();
        em.emit( 'abc' );
        expect( fn ).toHaveBeenCalledTimes( 1 );
    } );
} );
