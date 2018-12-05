/*


*/

const fs = require( 'fs' )

function react_line(ln){

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
    return str.length;

};

function process_line(ln){
    let min_len = Number.MAX_SAFE_INTEGER;
    ln = ln.split('');
    for( let c = 65; c < 90; c++ ){
        let tst = ln.filter( (v) => { return v.toUpperCase().charCodeAt(0) != c; } );
        // console.log( String.fromCharCode(c), react_line(tst) );
        min_len = Math.min( min_len, react_line(tst) );
    }

    console.log( min_len );
};

fs.readFile( 'second_data', (err, lines) => {
    if( err ) { console.log( err ); return; }
    lines.toString( 'utf-8' ).split( "\n" ).forEach( process_line );
} );