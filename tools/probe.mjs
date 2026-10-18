// node tools/probe.mjs '[[ox,oy,oz,dx,dy,dz],...]' : raycasts against the street collider
import { chromium } from 'playwright';
const rays = JSON.parse(process.argv[2]);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 320, height: 180 } });
await p.goto('http://127.0.0.1:5190/?free&noPost&noAO'); await p.waitForFunction(() => window.__ray, null, { timeout: 300000 });
for (const r of rays) console.log(JSON.stringify(r), JSON.stringify(await p.evaluate((r) => window.__ray(r.slice(0, 3), r.slice(3)), r)));
await b.close();
