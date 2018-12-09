/*
  
  -->A--->B--
 /    \      \
C      -->D----->E
 \           /
  ---->F-----

    Your first goal is to determine the order in which the steps should be completed. If more than one step is ready, choose the step which is first alphabetically. In this example, the steps would be completed as follows:

    Only C is available, and so it is done first.
    Next, both A and F are available. A is first alphabetically, so it is done next.
    Then, even though F was available earlier, steps B and D are now also available, and B is the first alphabetically of the three.
    After that, only D and F are available. E is not available because only some of its prerequisites are complete. Therefore, D is completed next.
    F is the only choice, so it is done next.
    Finally, E is completed.
    So, in this example, the correct order is CABDFE.
                                            //CABDFE

// DBHNEGOLQASVWYPXUMZJIKRTFC
*/

const fs = require( 'fs' );

let nodes = [];

fs.readFile( 'first_data', (err, lines) => {
    if( err ) { console.log( err ); return; }
    lines.toString( 'utf-8' ).split( "\n" ).forEach( process_line );

    console.log( nodes )
    // console.log( nodes.length )
    // not correct assumption, there are multiple root nodes!
    // let pos  = nodes.findIndex( (n) => { return n.depends.length == 0; } );
    // let root = nodes.splice( pos, 1 )[0];



    let seq = construct_seq( null, nodes );
    // console.log( seq.length )
    console.log( seq.join('') );
});

function construct_seq( node, ns ){

    let ret = [];
    if( node ){
        ret = [node.name];
        ns.forEach( (n) => { if( n.depends.indexOf( node.name ) > -1 ) n.depends.splice( n.depends.indexOf( node.name ), 1 ) } );
    }


    // find ones with no dep
    let childs = ns.filter( (n) => { return n.depends.length == 0 } )
                   .sort( (a, b) => { return a.name.charCodeAt(0) - b.name.charCodeAt(0); } )
    for (c in childs){
        let pos = ns.findIndex( (n) => { return n.name == childs[c].name; } );
        if( pos > -1 ){
            let ch = ns.splice( pos, 1 )[0];
            ret = ret.concat( construct_seq( ch, ns ) );
        }
    }

    return ret;
}

function process_line(ln){
    let ab = ln.match( /.+\s([A-Z]).+\s([A-Z])/ );
    if( ab ){

        [1, 2].forEach( (i) => {

            let node = nodes.findIndex( (nod) => { return nod.name == ab[i]; } );
            if( node == -1 ){
                nodes.push({
                    name: ab[i],
                    depends: []
                });
                node = nodes.length - 1;
            }
            if( i == 2 ){
                nodes[node].depends.push( ab[1] );
            }
        } );
    }
};