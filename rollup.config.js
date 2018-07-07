import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default [ {
    input : 'src/event-emitter.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/event-emitter.cjs.js', format : 'cjs' },
        { file : 'dist/event-emitter.js', format : 'umd', name : 'EventEmitter' }
    ]
}, {
    input : 'src/event-emitter.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        buble( {
            transforms : {
                dangerousForOf : true
            }
        } )
    ],
    output : [
        { file : 'dist/event-emitter.bc.js', format : 'umd', name : 'EventEmitter' }
    ]
} ];
