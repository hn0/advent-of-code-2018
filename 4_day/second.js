/*

    Strategy 2: Of all guards, which guard is most frequently asleep
    on the same minute?

    In the example above, Guard #99 spent minute 45 asleep more than
    any other guard or minute - three times in total. (In all other
    cases, any guard spent any minute asleep at most twice.)

    What is the ID of the guard you chose multiplied by the minute you
    chose? (In the above example, the answer would be 99 * 45 = 4455.)

*/

const fs = require( 'fs' )

function parse_line(ln){
    let data = ln.match( /\[([0-9|-]+)\s(\d+):(\d+)\]\s(.+)/ );
    if( data ){
        return {
            // day: parseInt( data[1].replace( '-', '' ) ),
            day: data[1],
            hour: parseInt( data[2] ),
            minute: parseInt( data[3] ),
            action: data[4]
        };
    }

    return null;
};

fs.readFile( 'second_data', (err, lines) => {
    if( err ) { console.log( err ); return; }

    let records = {};
    let active  = undefined;
    lines.toString( 'utf-8' )
        .split( '\n' )
        .sort()
        .map( parse_line )
        .filter( (r) => { return r != null; } )
        .forEach( (r) => {
            if( r.action.startsWith('Guard') ){
                let id = r.action.match( /#(\d+)/ );
                if( id ){
                    active = id[0];
                    if( !records[active] ){
                        records[active] = [];
                    }
                    return;
                }
            }
            let dir = (r.action == 'falls asleep') ? -1 : 1;
            records[active].push( r.minute * dir );
        } );

    // console.log( records )
    let minutes = Array.apply( null, {length: 60} ).map( () => { return []; } );
    for( let id in records ){
        for( let i=0; i < records[id].length; i+=2 ){
            let from = records[id][i];
            let to   = records[id][i+1];
            for( let j=Math.abs(from); j < to; j++ ){
                minutes[j].push(id);
            }
        }
    };

    // now the question is max by id and minute
    let max_cnt = -1;
    let max_min = -1;
    let id      = -1;
    for( let m in minutes ){

        let aggregates = {};
        for( let val in minutes[m] ){
            if( !aggregates[minutes[m][val]] ) aggregates[minutes[m][val]] = 0;
            aggregates[minutes[m][val]] += 1;
        }

        let record = Math.max.apply( null, Object.keys(aggregates).map( (r) => { return aggregates[r]; } ) );

        if( record > max_cnt ){
            max_cnt = record;
            max_min = m;
            id = Object.keys( aggregates ).reduce( (c,v) => { return aggregates[v] == record ? v : c; }, -1 );
        }
    }

    console.log( max_min * parseInt( id.replace('#', '') ) )

} );