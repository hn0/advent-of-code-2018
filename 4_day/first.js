const fs = require( 'fs' );


function parse_line(ln){
	// console.log( ln );
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


function main(err, data){

	if( err ){
		console.log( 'Error!!! ', err );
		return;
	}

	let records = {};
	let active  = undefined;
	data.toString( 'utf-8' )
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
	    	// if( !records[active][r.day] ){
	    	// 	records[active][r.day] = [];
	    	// }
	    	let dir = (r.action == 'falls asleep') ? -1 : 1;
	    	// let pos = records[active].reduce( (c,v) => { return ( Math.abs( v ) < r.minute) ? ++c : c;}, 0 );
	    	records[active].push( r.minute * dir );
	    	// records[active][pos] = ( r.minute * dir )
	    	// records[active].splice( pos, 0, ( r.minute * dir ) );
	    } );

	    // console.log( records ); return;

	let max_id  = { id: '0', max_time: 0 };
	let minutes = Array.apply( null, {length: 60} ).map( () => { return []; } );
	for( let id in records ){
		let max_time = 0;
		for( let i=0; i < records[id].length; i+=2 ){
			let from = records[id][i];
			let to   = records[id][i+1];
			for( let j=Math.abs(from); j < to; j++ ){
				minutes[j].push(id);
			}
			max_time += (to + from);
		}
		if( max_time > max_id.max_time ){
			max_id.id = id; max_id.max_time = max_time;
		}
	};

	// console.log( minutes );
	// console.log(max_id);

	let cnts       = minutes.map( (r) => { return r.reduce( (c,v) => { return v == max_id.id ? ++c : c; }, 0 ); } );
	let max_val    = Math.max.apply( null, cnts );
	let target_max = cnts.indexOf( max_val );
	// console.log( cnts, target_max )
	// console.log( cnts[target_max] )
	console.log( target_max * parseInt( max_id.id.replace('#', '') ) );

};

fs.readFile( 'first_data', main );