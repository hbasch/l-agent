// node tools/shot.mjs [url-query] [out.jpg] : headless capture of the dev/preview server (960x540).
import { chromium } from 'playwright';
const [q = '', out = 'shot.jpg'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 960, height: 540 } });
p.on('pageerror', (e) => console.log('[err]', e.message));
p.on('console', (m) => m.type() !== 'debug' && console.log('[page]', m.text()));
await p.goto('http://127.0.0.1:5190/?' + q); await p.waitForFunction(() => window.__ready, null, { timeout: 60000 });
await p.waitForTimeout(1500); await p.screenshot({ path: out, type: 'jpeg', quality: 80, timeout: 180000 }); await b.close(); console.log(out);
