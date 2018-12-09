/*
    Yes, this is rose tree type puzzle, but it's just easier to convert it to a parsing issue
*/

const fs = require( 'fs' );

fs.readFile( 'first_data', (err, lines) => {

    if( err ){
        console.log( err );
        return;
    }

    let inp = lines.toString( 'utf-8' ).split( " " ).map( (x) => { return parseInt(x); } );

    
    let parse_tree = function( inp ) {

        if( inp.length == 0 ) return;

        let node = {
            nchilds: inp.shift(),
            nmeta:   inp.shift(),
            childs:  [],
            meta:    []
        }

        for( let i=0; i < node.nchilds; i++ ){
            node.childs.push( parse_tree( inp ) );
        }

        node.meta = inp.splice( 0, node.nmeta );

        return node;
    };

    // console.log( inp )
    let tree = parse_tree( inp );
    // console.log( tree );

    let meta_sum = function( node ){

        return node.meta.reduce( (c,v) => { return c + v }, 0 ) + node.childs.reduce( (c,v) => { return c + meta_sum(v); }, 0);
    }

    console.log( meta_sum( tree ) );


} );