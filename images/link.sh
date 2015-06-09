#/bin/bash

out=`find | grep -v "\/links\/"`


i=0
rm links/*
for l in $out
do
    echo $l
    if [[ ${l: -4} == ".jpg" || ${l: -4} == ".JPG" ]]
    then
        echo "$l -> $i.jpg"
        ln -s ".$l" "links/$i.jpg"
        i=$(($i + 1))
    fi
done
