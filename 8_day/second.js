/*
    // just a note, now i know that wasn't true, sometimes is worth of reading the puzzle task
    Yes, this is rose tree type puzzle, but it's just easier to convert it to a parsing issue
*/

const fs = require( 'fs' );

fs.readFile( 'second_data', (err, lines) => {

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

    function calculate_sum(node){

        if( !node ){
            return 0;
        }

        let sum = 0;

        if( node.nchilds == 0 ){
            sum = node.meta.reduce( (c,v) => { return c + v; }, 0 );
        }
        else {
            sum = node.meta.reduce( (c, i) => { return c + calculate_sum( node.childs[i-1] ); }, 0 );
        }

        return sum;

    }

    console.log( calculate_sum( tree ) );

} );
