// Unreal (cm, Z-up, left-handed) -> glTF / three.js (m, Y-up, right-handed), same convention as Unreal's glTF exporter
// (checked against a world export: position (x, z, y), rotation (-qx, -qz, -qy, qw), scale (sx, sz, sy)).
export function ueTransform(o, it) {
  const [x, y, z] = it.p, [qx, qy, qz, qw] = it.q, [sx, sy, sz] = it.s;
  o.position.set(x / 100, z / 100, y / 100);
  o.quaternion.set(-qx, -qz, -qy, qw);
  o.scale.set(sx, sz, sy);
}
