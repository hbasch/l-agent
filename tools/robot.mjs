// node tools/robot.mjs [query] : plays the day with ?auto, saves a capture at each snap() into robot/, reports errors and timing.
import { chromium } from 'playwright'; import fs from 'fs';
const q = process.argv[2] || ''; fs.mkdirSync('robot', { recursive: true });
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 960, height: 540 } }); let n = 0; const t0 = Date.now(); let errors = 0;
p.on('pageerror', (e) => { errors++; console.log('[err]', e.message); });
p.on('console', (m) => { const t = m.text(); if (m.type() === 'error' || /DONE|collider/.test(t)) console.log('[page]', t); });
await p.exposeFunction('__snap', async (name) => { const f = `robot/${String(++n).padStart(2, '0')}-${name}.jpg`; await p.screenshot({ path: f, type: 'jpeg', quality: 70, timeout: 120000 }); console.log('snap', f, ((Date.now() - t0) / 1000).toFixed(0) + 's'); });
await p.goto('http://127.0.0.1:5190/?auto&ldr&' + q);
await p.waitForFunction(() => window.__dayDone, null, { timeout: 900000 }).catch(() => console.log('TIMEOUT'));
console.log('fin', ((Date.now() - t0) / 1000).toFixed(0) + 's', 'erreurs', errors); await b.close();
