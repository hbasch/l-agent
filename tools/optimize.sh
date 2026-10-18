#!/bin/bash
# Compress the GLBs for the web: meshopt geometry + WebP textures (characters). Needs: npm i -g @gltf-transform/cli sharp (or GT=path).
GT=${GT:-gltf-transform}; cd "$(dirname "$0")/.."
for f in public/models/characters/*.glb; do $GT optimize "$f" "$f.tmp.glb" --texture-compress webp --texture-size 1024 --compress meshopt --simplify false >/dev/null && mv "$f.tmp.glb" "$f"; done
for f in public/models/street/meshes/*.glb; do $GT meshopt "$f" "$f.tmp.glb" >/dev/null 2>&1 && mv "$f.tmp.glb" "$f" || rm -f "$f.tmp.glb"; done
du -sh public/models/*
