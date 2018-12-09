/*

    Using taxi cab distance, determine largest area around coordinates

*/

const fs = require( 'fs' )

let threshold = 10000;
let xs = [];
let ys = [];

function process_line(ln, i){

    let coords = ln.split( ', ' ).map( (x) => { return parseInt(x); } );

    xs.push( coords[0] );
    ys.push( coords[1] );

};


fs.readFile( 'second_data', (err, lines) => {
    if( err ) { console.log( err ); return; }
    lines.toString( 'utf-8' ).split( "\n" ).forEach( process_line );

    let dimmx = Math.max.apply( null, xs ) + 1;
    let dimmy = Math.max.apply( null, ys ) + 1;
    
    let area = 0;
    for( let y=Math.min( ...ys ); y < dimmy; y++ ){
        for( let x=Math.min( ...xs ); x < dimmx; x++ ){

            let dist = xs.map( (xv, i) => {
                return Math.abs( xv - x ) + Math.abs( ys[i] - y );
            } ).reduce( (c, v) => { return c+v; }, 0 );
    
            if( dist < threshold )
                area++;

        }
    }
    
    console.log( area );
    
} );

