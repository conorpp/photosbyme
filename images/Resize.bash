#/usr/bin/env bash

images=`find | grep -iP '\.jpg|\.png' | grep -v \/originals\/ | grep -v \/links\/`

for i in $images
do
    d=originals/`dirname $i`
    [[ ! -d $d ]] && mkdir -p $d
    [[ ! -f originals/$i ]] && cp $i $d && echo "$i -> $d"
    convert $i -resize 1280x1080 $i
done

