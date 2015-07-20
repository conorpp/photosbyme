#/usr/bin/env bash

images=`find | grep -iP '\.jpg|\.png' | grep -v \/originals\/ | grep -v \/links\/`

for i in $images
do
    d=originals/`dirname $i`
    [[ ! -d $d ]] && mkdir -p $d
    [[ ! -f originals/$i ]] && cp $i $d && echo "$i -> $d"
    info=`identify $i`
    if [[ ! ( $info == *"1280x"* || $info == *"x1080"* ) ]] ; then
        convert $i -resize 1280x1080 $i
        info=`identify $i`
        echo " Resized $i to $(echo info | awk '{print $3}') "
    fi
done

