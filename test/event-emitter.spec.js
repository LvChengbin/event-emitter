import EventEmitter from '../src/event-emitter';

describe( 'EventEmitter', () => {
    const em = new EventEmitter();

    em.alias( '$on', 'on' );
    em.alias( '$once', 'once' );
    em.alias( '$removeListener', 'removeListener' );
    em.alias( '$emit', 'emit' );
    em.alias( '$removeAllListeners', 'removeAllListeners' );

    it( 'on', done => {
        let executed = false;
        em.$on( 'abc', ( a, b )  => {
            expect( a ).toEqual( 'a' );
            expect( b ).toEqual( 'b' );
            done();
            executed = true;
        } );

        em.$on( 'abc', () => {
            expect( executed ).toBeTruthy();
        } );

        em.$emit( 'abc', 'a', 'b' );
    } );

    it( 'once', () => {
        let i = 0;
        em.$once( 'xyz', () => i++ );

        em.$emit( 'xyz' );
        em.$emit( 'xyz' );
        em.$emit( 'xyz' );
        em.$emit( 'xyz' );
        em.$emit( 'xyz' );

        expect( i ).toEqual( 1 );
    } );

    it( 'removeListener', () => {
        let i = 0;
        const handler = () => i++;
        em.$on( '123', handler );
        em.$removeListener( '123', handler );
        em.$emit( '123' );
        expect( i ).toEqual( 0 );
    } );

    it( 'removeAllListeners', () => {
        let i = 0;
        em.$on( '__x', () => i++ );

        em.$removeAllListeners( '__x' );
        em.$emit( '__x' );
        expect( i ).toEqual( 0 );

        em.$on( '__x', () => i++ );
        em.$removeAllListeners( /^__/ );
        em.$emit( '__x' );
        expect( i ).toEqual( 0 );

        em.$on( '__x', () => i++ );
        em.$removeAllListeners( type => type.charAt( 0 ) === '_' );
        em.$emit( '__x' );
        expect( i ).toEqual( 0 );

        em.$on( '__x', () => i++ );
        em.$emit( '__x' );
        expect( i ).toEqual( 1 );

    } );

} );
