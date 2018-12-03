#!/usr/bin/python
"""
    The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

    abcde
    fghij
    klmno
    pqrst
    fguij
    axcye
    wvxyz

    The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

    What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
"""

import sys

mindiff = sys.maxsize
valptr  = None
ids = {}
with open( 'second_data' ) as fp:
    for ln in fp:
       s = ln.replace("\n", "")
       if s in ids:
           print( "Have a duplicate! ", s )
           sys.exit()
       check = [k for k in ids]
       ids[s] = None
       for c in check:
           if len(c) != len(s):
               print('That was not nice!')
               print( s ) 

           chksum = 0
           for i in range( len(s) ):
               diff = 1 if ord( s[i] ) - ord( c[i] ) != 0 else 0
               chksum += diff
           
           if chksum < mindiff:
               mindiff = chksum
               ids[s] = ( chksum, c )
               valptr = s

if valptr is None:
    print( 'This should not be good' )
    print( ids )
    sys.exit()

b = ids[valptr][1]
finalVal=''
for i in range( len( valptr ) ):
    if ord(valptr[i]) - ord(b[i]) == 0:
        finalVal += valptr[i]

print(finalVal)
