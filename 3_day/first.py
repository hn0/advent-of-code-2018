#!/usr/bin/python

"""     Each Elf has made a claim about which area of fabric would be
ideal for Santa's suit. All claims have an ID and consist of a single
rectangle with edges parallel to the edges of the fabric. Each claim's
rectangle is defined as follows:

	The number of inches between the left edge of the fabric and the
	left edge of the rectangle. The number of inches between the top
	edge of the fabric and the top edge of the rectangle. The width of
	the rectangle in inches. The height of the rectangle in inches. A
	claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a
	rectangle 3 inches from the left edge, 2 inches from the top edge,
	5 inches wide, and 4 inches tall. Visually, it claims the square
	inches of fabric represented by # (and ignores the square inches
	of fabric represented by .) in the diagram below:

    ...........     ...........     ...#####...     ...#####...
...#####... ...#####...     ...........     ........... ...........


	The problem is that many of the claims overlap, causing two or more
claims to cover part of the same areas. For example, consider the
following claims:

    #1 @ 1,3: 4x4     
    #2 @ 3,1: 4x4     
    #3 @ 5,5: 2x2     
    Visually,
	these claim the following areas:

    ........     
    ...2222.     
    ...2222.     
    .11XX22.     
    .11XX22.
	.111133.     
	.111133.     
	........     

	The four square inches marked
with X are claimed by both 1 and 2. (Claim 3, while adjacent to the
others, does not overlap either of them.)

	If the Elves all proceed with their own plans, none of them will
	have enough fabric. How many square inches of fabric are within
	two or more claims?

"""

fabric = []
with open('first_data') as fp:
	for ln in fp:
		id,props = ln.replace('\n', '').split( '@' )
		print( 'processing id: #' + id )
		offsets,areas = props.split( ':' )
		offx,offy = map( lambda x: int(x), offsets.split( ',' ) ) 
		x,y = map( lambda x: int(x), areas.split( 'x' ) )
		for i in range(x + offx):
			if len(fabric) - 1 < i:
				fabric.append([])
			for j in range(y + offy):
				if len(fabric[i]) - 1 < j:
					fabric[i].append([])
					fabric[i][j] = 0

				# (i - offx) * (j - offy) -- positive when both are - or +
				a = (i - offx)
				b = (j - offy)
				val = 1 if a * b >= 0 and a >= 0 and b >= 0 else 0
				fabric[i][j] += val
				# print( fabric[i][j] )

		# print( id, offx, offy, x, y )
		# print(fabric)

# how many are there clams with two or more!
res=0
for i in range( len(fabric) ):
	# print( [x for x in fabric[i]] )
	for j in range( len(fabric[i]) ):
		res += 1 if fabric[i][j] > 1 else 0

print res
