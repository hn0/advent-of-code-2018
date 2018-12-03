#!/usr/bin/python
"""
    For example, if you see the following box IDs:

    abcdef contains no letters that appear exactly two or three times.
    bababc contains two a and three b, so it counts for both.
    abbcde contains two b, but no letter appears exactly three times.
    abcccd contains three c, but no letter appears exactly two times.
    aabcdd contains two a and two d, but it only counts once.
    abcdee contains two e.
    ababab contains three a and three b, but it only counts once.
    Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. Multiplying these together produces a checksum of 4 * 3 = 12.

    What is the checksum for your list of box IDs?

"""

idlst = {}
with open( './first_data' ) as fp:
    for ln in fp:
        freqs = {}
        for c in ln.replace("\n", ""):
            if not c in freqs:
                freqs[c] = 0
            freqs[c] += 1
       
        p = {}
        for c in freqs:
            if freqs[c] > 1:
                if not freqs[c] in idlst:
                    idlst[ freqs[c] ] = 0
                if not freqs[c] in p:
                    idlst[ freqs[c] ] += 1
                    p[ freqs[c] ] = 1

print(idlst)
checksum=1
for k in idlst:
    checksum *= idlst[k]

print( checksum )
