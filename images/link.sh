#/bin/bash

out=`find | grep -v "\/links\/" | grep -v 'dir\.json'`

i=0
rm links/* -f -r
for l in `ls | grep -v "link" | grep -v 'dir\.json' `
do
    lns -r $l links
done

find2json links > dir.json
