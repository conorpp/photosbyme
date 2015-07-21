#/usr/bin/env bash

./Resize.bash

i=0
rm links/* -f -r
for i in `ls gallary`
do
    lns -r gallary/$i links
done

find2json links > dir.json
