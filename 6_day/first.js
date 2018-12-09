/*

    Using taxi cab distance, determine largest area around coordinates

*/

const fs = require( 'fs' )

let xs = [];
let ys = [];

function process_line(ln, i){

    let coords = ln.split( ', ' ).map( (x) => { return parseInt(x); } );

    xs.push( coords[0] );
    ys.push( coords[1] );

};

function calculate_area(extent){ 
    return Math.abs( extent[0] - extent[2] ) * Math.abs( extent[1] - extent[3] );
};

fs.readFile( 'first_data', (err, lines) => {
    if( err ) { console.log( err ); return; }
    lines.toString( 'utf-8' ).split( "\n" ).forEach( process_line );

    let dimmx = Math.max.apply( null, xs ) + 1;
    let dimmy = Math.max.apply( null, ys ) + 1;
    
    let matrix = [];
    let skip = [ '.' ];
    let area = 0;
    for( let y=0; y < dimmy; y++ ){
        let row = [];
        for( let x=0; x < dimmx; x++ ){

            let dist = xs.map( (xv, i) => {
                return Math.abs( x - xv) + Math.abs( y - ys[i] );
            } );
            let min_val = Math.min( ...dist );

            if( dist.reduce( (c,v) => { return v == min_val ? ++c : c; }, 0 ) > 1 ){
                row.push( '.' );
            }
            else {
                let i = String.fromCharCode( dist.findIndex( (v) => { return v == min_val; } ) + 65 );

                if( (x == 0 || y == 0 || x == dimmx - 1 || y == dimmy - 1) && skip.indexOf( i ) == -1 ) skip.push( i );

                row.push( i );
            }
        }
        // console.log( row );
        matrix.push( row );
    }
    
    let freqs = [];
    for( let i=0; i < xs.length; i++ ){
        let v1 = String.fromCharCode( i + 65 );
        if( skip.indexOf( v1 ) == -1 ){
            let sum = matrix.reduce( (c1,row) => {
                return c1 + row.reduce( (c2,v2) => { return v1 == v2 ? ++c2 : c2; }, 0 );
            }, 0);
            freqs.push( sum );
        }
    }
    console.log( Math.max( ...freqs ) );

    
} );
