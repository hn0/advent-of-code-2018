#!/usr/bin/python

"""          
	Amidst the chaos, you notice that exactly one claim doesn't
		overlap by even a single square inch of fabric with any other claim. If you
		can somehow draw attention to it, maybe the Elves will be able to make Santa's
		suit after all!

	For example, in the claims above, only claim 3 is intact after all claims
	are made.

	What is the ID of the only claim that doesn't overlap?

"""

import numpy as np

fabric = {}
overlaps = []
ids = []
with open('second_data') as fp:
	for ln in fp:
		id,props = ln.replace('\n', '').split( '@' )
		ids.append( id )
		print( 'processing id: #' + id )
		offsets,areas = props.split( ':' )
		offx,offy = map( lambda x: int(x), offsets.split( ',' ) ) 
		x,y = map( lambda x: int(x), areas.split( 'x' ) )
		for i in range(offx, x + offx):
			if not i in fabric:
				fabric[i] = {}
			for j in range(offy, y + offy):
				if not j in fabric[i]:
					fabric[i][j] = [id]
				else:
					overlaps.append( fabric[i][j][0] )
					overlaps.append( id )

# for i in fabric:
# 	print( [fabric[i][x] for x in fabric[i]] )

for id in np.unique( overlaps ):
	pos = ids.index( id )
	ids[pos] = None

print( [x for x in ids if x is not None] )
