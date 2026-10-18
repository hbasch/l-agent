#!/bin/bash
# Rocketbox avatars (MIT) -> public/models/characters/<name>.glb. Needs: pip bpy 5.2, ImageMagick (convert), curl, git.
#   tools/characters/build.sh [workdir]
set -e
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../.." && pwd); WORK=${1:-/tmp/rocketbox}
mkdir -p "$WORK" && cd "$WORK"
[ -d rb ] || GIT_LFS_SKIP_SMUDGE=1 git clone -q --depth 1 --filter=blob:none --no-checkout https://github.com/microsoft/Microsoft-Rocketbox rb
# avatar dir : clip set (m/f) : output name : child (1/0)   (texture prefix read from the repo)
CAST=(${CAST:-"Adults/Female_Adult_05:f:ines:0" "Adults/Male_Adult_17:m:yanis:0" "Adults/Female_Adult_07:f:sofia:0" "Adults/Male_Adult_20:m:malik:0" "Adults/Male_Adult_14:m:aubry:0" "Adults/Male_Adult_03:m:didier:0" "Adults/Male_Adult_10:m:kevin:0" "Professions/Police_Male_01:m:policier:0" "Professions/Police_Female_01:f:policiere:0"})
AVATARS=(); for c in "${CAST[@]}"; do IFS=: read d g o ch <<< "$c"
  p=$(git -C rb ls-tree -r --name-only HEAD "Assets/Avatars/$d/Textures/" | sed -n 's#.*/\([a-z]*[0-9]*\)_body_color\.tga#\1#p' | head -1)
  AVATARS+=("$d:$p:$g:$o:$ch"); done
CLIPS=(idle_neutral_01 idle_breathe_01 idle_look_around_01 gestic_talk_neutral_01 gestic_talk_relaxed_01 gestic_shrug_01 sit_chair_idle_neutral_01 wave_01 work_table)
fetch(){ [ -s "$1" ] || { mkdir -p "$(dirname "$1")"; curl -sfL -o "$1" "https://raw.githubusercontent.com/microsoft/Microsoft-Rocketbox/master/$(echo "$1"|sed 's/ /%20/g')"; }; }
export -f fetch
: > files
for a in "${AVATARS[@]}"; do d=${a%%:*}; n=$(basename "$d")
  echo "Assets/Avatars/$d/Export/$n.fbx" >> files
  git -C rb ls-tree -r --name-only HEAD "Assets/Avatars/$d/Textures/" >> files; done
for c in "${CLIPS[@]}"; do for g in m f; do echo "Assets/Animations/all_animations_max_motextr_static/${g}_$c.max.fbx"; done; done >> files
echo LICENSE.md >> files
tr '\n' '\0' < files | xargs -0 -P 12 -I{} bash -c 'fetch "$1"' _ {}
mkdir -p "$ROOT/public/models/characters"; cp LICENSE.md "$ROOT/public/models/characters/LICENSE-Rocketbox.md"
for a in "${AVATARS[@]}"; do IFS=: read d p g out child <<< "$a"; n=$(basename "$d")
  "$HERE/textures.sh" "Assets/Avatars/$d/Textures" "tex/$p" "$p" 1024
  NOPELVIS=$([ "$child" = 1 ] && echo 1) python3 "$HERE/convert.py" -- "Assets/Avatars/$d/Export/$n.fbx" "tex/$p" "$p" "$ROOT/public/models/characters/$out.glb" Assets/Animations/all_animations_max_motextr_static/${g}_*.fbx 2>&1 | grep -E 'BAKED|EXPORTED|Error|NO ACTION'
done
