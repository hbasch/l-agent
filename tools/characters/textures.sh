#!/bin/bash
# textures.sh <Textures dir> <out dir> <prefix> [size]  (adapted from Tidewater, MIT; ImageMagick 6 "convert")
# colour / normal -> JPEG, specular -> ORM (R 1, G roughness = 0.92 - 0.6 * spec, B 0), opacity -> PNG alpha
src=$1; out=$2; p=$3; S=${4:-1024}; mkdir -p "$out"
for f in "$src"/${p}_*_color.tga; do k=$(basename "$f" .tga); k=${k#${p}_}; k=${k%_color}
  [ "$k" = opacity ] && { convert "$f" -resize ${S}x${S} "$out/${p}_opacity.png"; continue; }
  convert "$f" -resize ${S}x${S} -quality 90 "$out/${p}_${k}_color.jpg"
  [ -f "$src/${p}_${k}_normal.tga" ] && convert "$src/${p}_${k}_normal.tga" -resize ${S}x${S} -quality 92 "$out/${p}_${k}_normal.jpg"
  [ -f "$src/${p}_${k}_specular.tga" ] && convert "$src/${p}_${k}_specular.tga" -resize ${S}x${S} -colorspace gray -fx '0.92-0.6*u' \
    \( +clone -fill white -colorize 100 \) \( +clone -fill black -colorize 100 \) -swap 0,1 -combine -quality 92 "$out/${p}_${k}_orm.jpg"
done
