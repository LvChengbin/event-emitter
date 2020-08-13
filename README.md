# EventEmitter

An implementation of EventEmitter for browsers which can use an Object as the event type.

## Installation

```js
$ npm i @lvchengbin/event-emitter --save
```

If you want to invoke the code to browers with `<script>` tag, please use [event-emitter.js](https://github.com/LvChengbin/event-emitter/raw/master/dist/event-emitter.js). For old browsers not support ES5 syntax, please use [event-emitter.bc.js](https://raw.githubusercontent.com/LvChengbin/event-emitter/master/dist/event-emitter.bc.js).

## Usage

```js
import EventEmitter from '@lvchengbin/event-emitter';

const em = new EventEmitter();

const handler = () => {
    // some code...
};

em.on( 'event', handler );
em.emit( 'event', ...args );
em.removeListener( 'event', handler );
```

```js
import EventEmitter from '@lvchengbin/event-emitter';

class A extends EventEmitter {
    constructor() {
        super();

        this.on( 'xxx', () => {
            // some code...
        } );
    }
}

new A().on( 'msg', () => {
} );
```

Using an `Object` as the event type.

```js
const em = new EventEmitter();

const func = {};

em.on( func, () => {
} );
```

## Methods

 - **on( evt, handler )**

    Start to listen to an event type.


 - **once( evt, handler )**

    Start to listen to an event type only once, then the listener will be removed.

 - **removeListener( evt, handler )**

    Remove lister of an event type to stop listening it.

 - **emit( evt, ...args )**
    
    To trigger an event

 - **removeAllListeners( [ evt ] )**
