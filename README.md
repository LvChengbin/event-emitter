# EventEmitter

An implementation of EventEmitter for browsers.

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

## Methods

 - **on( evt, handler )**

    Start to listen to an event type.


 - **once( evt, handler )**

    Start to listen to an event type only once, then the listener will be removed.

 - **removeListener( evt, handler )**

    Remove lister of an event type to stop listening it.

 - **emit( evt, ...args )**
    
    To trigger an event

 - **removeAllListeners( rule )**

    To remove listeners with a rule:
    
    - if the rule is a string, to remove all events with event type same as the rule
    - if the rule is a regexp, to remove all events match the regexp
    - if the rule is a function, to execute the function with passing an argument which is each event type, if the function returns true, all listeners of that event type will be removed.

    ```js
    em.removeAllListeners( type => {
        if( /^ss/i.test( type ) ) {
            return true;
        }
    } );
    em.removeAllListeners( 'click' );
    em.removeAllListeners( /click/i );
    ```
 - **alias( alias, existsMethod )**

    To set alias for a existing method, for example:

    ```js
    class EC extends EventEmitter {
        constructor() {
            super();
            this.alias( '$on', 'on' );
        }
    }
    ```
