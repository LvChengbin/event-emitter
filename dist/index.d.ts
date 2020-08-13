/******************************************************************
 * Copyright (C) 2020 LvChengbin
 *
 * File: src/index.ts
 * Author: LvChengbin<lvchengbin59@gmail.com>
 * Time: 08/13/2020
 * Description:
 ******************************************************************/
export declare type EventType = any;
export declare type Handler = (...args: any[]) => any;
export declare type Handlers = Map<Handler, Handler | null>;
export declare type Listeners = Map<EventType, Handlers>;
export default class EventEmitter {
    #private;
    on(evt: EventType, handler: Handler): this;
    once(evt: EventType, handler: Handler): this;
    emit(evt: EventType, ...args: any[]): boolean;
    removeListener(evt: EventType, handler: Handler): this;
    removeAllListeners(evt?: EventType): this;
}
