#/usr/bin/env bash

./Resize.bash
out=`find | grep -v "\/links\/" | grep -v 'dir\.json'`

i=0
rm links/* -f -r
for l in `ls | grep -vP "link|\.json|originals|\.bash"`
do
    lns -r $l links
done

find2json links > dir.json
