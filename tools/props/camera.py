# Procedural bullet CCTV camera with wall bracket (pip bpy, headless): python3 camera.py -- out.glb
# Real-world scale (m), +Y forward after export. Bevels everywhere so it reads like the pack's chunky props.
import bpy, bmesh, sys, math
from mathutils import Vector
out = sys.argv[sys.argv.index('--') + 1]
bpy.ops.wm.read_factory_settings(use_empty=True)
def mat(name, col, rough, metal=0.0, emit=None):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*col, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if emit: b.inputs['Emission Color'].default_value = (*emit, 1); b.inputs['Emission Strength'].default_value = 4
    return m
WHITE = mat('cam_body', (0.82, 0.81, 0.78), 0.45); GREY = mat('cam_metal', (0.32, 0.33, 0.35), 0.4, 0.8)
BLACK = mat('cam_rubber', (0.03, 0.03, 0.035), 0.7); GLASS = mat('cam_glass', (0.02, 0.025, 0.04), 0.05, 0.0)
LED = mat('cam_led', (0.6, 0.02, 0.02), 0.3, emit=(1, 0.05, 0.03))
def bevel(o, w=0.004, seg=3):
    m = o.modifiers.new('b', 'BEVEL'); m.width = w; m.segments = seg; m.limit_method = 'ANGLE'
    o.modifiers.new('w', 'WEIGHTED_NORMAL'); 
def cyl(r, d, loc, rot=(math.pi / 2, 0, 0), v=40, m=WHITE, name='c'):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=d, location=loc, rotation=rot, vertices=v); o = bpy.context.object; o.name = name; o.data.materials.append(m); bevel(o); return o
def box(s, loc, m=WHITE, name='b', w=0.004):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.scale = s; o.name = name; bpy.ops.object.transform_apply(scale=True); o.data.materials.append(m); bevel(o, w); return o
parts = []
# wall plate + screws
parts.append(box((0.11, 0.012, 0.14), (0, 0.006, 0), GREY, 'plate', 0.003))
for x in (-0.04, 0.04):
    for z in (-0.055, 0.055): parts.append(cyl(0.007, 0.006, (x, 0.014, z), m=GREY, v=16, name='screw'))
# arm with joint
parts.append(cyl(0.016, 0.16, (0, 0.09, 0), m=GREY, name='arm'))
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.026, location=(0, 0.17, 0), segments=24, ring_count=12); j = bpy.context.object; j.data.materials.append(GREY); bevel(j); parts.append(j)
# body (tilted down 18 deg), sunshield, front ring, lens, IR leds, cable gland
tilt = math.radians(-18); c0 = Vector((0, 0.27, 0.03))
body = cyl(0.045, 0.24, (0, 0, 0), m=WHITE, name='body'); parts.append(body)
shield = box((0.115, 0.29, 0.008), (0, 0.02, 0.052), WHITE, 'shield', 0.003); parts.append(shield)
ring = cyl(0.047, 0.018, (0, 0.125, 0), m=BLACK, name='ring'); parts.append(ring)
lens = cyl(0.03, 0.006, (0, 0.135, 0), m=GLASS, name='lens'); parts.append(lens)
for a in range(8):
    t = a / 8 * math.tau; parts.append(cyl(0.004, 0.004, (math.cos(t) * 0.038, 0.135, math.sin(t) * 0.038), m=LED if a == 0 else BLACK, v=10, name='ir'))
gland = cyl(0.01, 0.03, (0, -0.13, -0.02), m=BLACK, name='gland'); parts.append(gland)
saddle = box((0.03, 0.05, 0.04), (0, 0, -0.045), GREY, 'saddle'); parts.append(saddle)
head = [body, shield, ring, lens, gland, saddle] + [p for p in parts if p.name.startswith('ir')]
for p in head:
    p.location = Vector(p.location); p.location.rotate(__import__('mathutils').Euler((tilt, 0, 0))); p.location += c0; p.rotation_euler.x += tilt
# cable from gland to wall plate
curve = bpy.data.curves.new('cable', 'CURVE'); curve.dimensions = '3D'; curve.bevel_depth = 0.0045; curve.bevel_resolution = 3
sp = curve.splines.new('BEZIER'); sp.bezier_points.add(2)
pts = [Vector(gland.location) + Vector((0, -0.01, -0.01)), Vector((0.02, 0.12, -0.06)), Vector((0.03, 0.015, -0.075))]
for bp, pt in zip(sp.bezier_points, pts): bp.co = pt; bp.handle_left_type = bp.handle_right_type = 'AUTO'
cab = bpy.data.objects.new('cable', curve); bpy.context.collection.objects.link(cab); cab.data.materials.append(BLACK)
bpy.ops.object.select_all(action='SELECT'); bpy.context.view_layer.objects.active = body
bpy.ops.object.convert(target='MESH'); bpy.ops.object.join(); bpy.context.object.name = 'CameraVSA'
bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))
bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', export_apply=True, export_yup=True)
print('tris', sum(len(p.vertices) - 2 for p in bpy.context.object.data.polygons), 'EXPORTED', out)
