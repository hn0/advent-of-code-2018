/*

*/

const fs = require( 'fs' )

function process_line(ln){
    // console.log( ln );
    ln = ln.split('');

    let str = [ln.pop()];
    let c;
    while( (c = ln.pop()) != null ){

        if( str.length > 0 && Math.abs( c.charCodeAt(0) - str[str.length-1].charCodeAt(0) ) == 32 ){
            let _ = str.pop();
        }
        else {
            str.push(c);
        }
    }
    console.log( str.length );
};

fs.readFile( 'first_data', (err, lines) => {
    if( err ) { console.log( err ); return; }
    lines.toString( 'utf-8' ).split( "\n" ).forEach( process_line );
} );