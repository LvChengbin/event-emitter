/******************************************************************
 * Copyright (C) 2020 LvChengbin
 * 
 * File: src/index.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/13/2020
 * Description: 
 ******************************************************************/

export type EventType = any;
export type Handler = ( ...args: any[] ) => any;
export type Handlers = Map<Handler, Handler | null>;
export type Listeners = Map<EventType, Handlers>;

export default class EventEmitter {
    #listeners: Map<EventType, Handlers> = new Map();
    // #on!: ( evt: EventType, handler: Handler, realHandler: Handler | null ) => this;

    #on = ( evt: EventType, handler: Handler, realHandler: Handler | null ): this => {
        const listeners = this.#listeners;

        let handlers = listeners.get( evt );

        if( !handlers ) {
            handlers = new Map();
            listeners.set( evt, handlers );
        }

        handlers.set( handler, realHandler );
        return this;
    }

    on( evt: EventType, handler: Handler ): this {
        return this.#on( evt, handler, null );
    }

    once( evt: EventType, handler: Handler ): this {
        return this.#on( evt, handler, ( ...args ) => {
            handler.apply( this, args );
            this.removeListener( evt, handler );
        } );
    }

    emit( evt: EventType, ...args: any[] ): boolean {
        const handlers = this.#listeners.get( evt );
        if( !handlers ) return false;
        handlers.forEach( ( realHandler: Handler | null, handler: Handler ): void => {
            if( realHandler ) {
                ( realHandler as Handler ).call( this, ...args );
            } else {
                handler.call( this, ...args );
            }
        } );
        return true;
    }

    removeListener( evt: EventType, handler: Handler ): this {
        const listeners = this.#listeners;
        const handlers = listeners.get( evt );
        handlers && handlers.delete( handler );
        return this;
    }

    removeAllListeners( evt?: EventType ): this {
        if( evt ) {
            this.#listeners.delete( evt );
        } else {
            this.#listeners = new Map();
        }
        return this;
    }
}
