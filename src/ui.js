// HTML overlays: title cards, work order tablet, SMS, hold prompt, objective, guide marker.
const css = `
#ui-card{position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column;opacity:0;pointer-events:none;transition:opacity .9s;z-index:20;font-family:Georgia,serif;color:#e8e1d6;text-align:center}
#ui-card.on{opacity:1} #ui-card h1{font-weight:normal;font-size:44px;letter-spacing:.06em;margin:0} #ui-card p{font-size:18px;opacity:.75;max-width:640px;line-height:1.5}
#ui-tab{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-1deg);width:min(520px,92vw);background:#1c1f22;border:10px solid #0d0e10;border-radius:22px;box-shadow:0 20px 60px #000a;padding:26px 28px;color:#dfe3e6;font:15px/1.45 system-ui,sans-serif;display:none;z-index:15}
#ui-tab .hd{font-size:11px;letter-spacing:.14em;opacity:.6} #ui-tab h2{font-size:20px;margin:6px 0 12px} #ui-tab .row{display:flex;gap:10px;margin:4px 0} #ui-tab .k{opacity:.55;min-width:86px}
#ui-tab .stamp{margin-top:18px;border:3px solid #c0392b;color:#e0584a;padding:8px 12px;transform:rotate(-3deg);font-weight:700;letter-spacing:.08em}
#ui-tab .stamp small{display:block;font-weight:400;letter-spacing:0;color:#e9b0a8;margin-top:4px;font-size:12px} #ui-tab .go{margin-top:16px;opacity:.6;font-size:13px;text-align:right}
#ui-sms{position:fixed;right:26px;bottom:90px;width:300px;background:#f2f2f0;color:#111;border-radius:16px;padding:12px 14px;font:14px/1.4 system-ui,sans-serif;box-shadow:0 8px 30px #0008;transform:translateY(20px);opacity:0;transition:.4s;z-index:12}
#ui-sms.on{transform:none;opacity:1} #ui-sms b{display:block;font-size:12px;opacity:.6;margin-bottom:2px}
#ui-prompt{position:fixed;left:50%;bottom:120px;transform:translateX(-50%);color:#fff;font:15px system-ui,sans-serif;text-shadow:0 1px 4px #000;text-align:center;display:none;z-index:11}
#ui-prompt .bar{width:180px;height:4px;background:#ffffff33;margin:8px auto 0;border-radius:2px;overflow:hidden} #ui-prompt .bar i{display:block;height:100%;width:0;background:#fff}
#ui-obj{position:fixed;left:22px;top:18px;color:#fff;font:14px system-ui,sans-serif;text-shadow:0 1px 4px #000;opacity:.85;z-index:11}
#ui-line{position:fixed;left:50%;bottom:60px;transform:translateX(-50%);color:#fff;font:italic 19px Georgia,serif;text-shadow:0 2px 6px #000;opacity:0;transition:opacity .5s;z-index:11;max-width:80vw;text-align:center}
#ui-line.on{opacity:1}
#ui-guide{position:fixed;width:12px;height:12px;margin:-6px;border:2px solid #fff;transform:rotate(45deg);opacity:.75;display:none;z-index:10;pointer-events:none}`;
const el = (id, html = '') => { let e = document.getElementById(id); if (!e) { e = document.createElement('div'); e.id = id; e.innerHTML = html; document.body.appendChild(e); } return e; };
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
const card = el('ui-card'), tab = el('ui-tab'), sms = el('ui-sms'), prompt = el('ui-prompt', '<span></span><div class="bar"><i></i></div>'), obj = el('ui-obj'), line = el('ui-line'), guide = el('ui-guide');
export const AUTO = new URLSearchParams(location.search).has('auto');  // robot test: fast, no input
export const sleep = (ms) => new Promise((r) => setTimeout(r, AUTO ? ms * 0.15 : ms));
export const snap = async (name) => { if (AUTO && window.__snap) await window.__snap(name); };
const waitKey = () => AUTO ? sleep(300) : new Promise((r) => { const f = (e) => { if (e.type === 'mousedown' || e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') { removeEventListener('keydown', f); removeEventListener('mousedown', f); r(); } }; setTimeout(() => { addEventListener('keydown', f); addEventListener('mousedown', f); }, 400); });
export const ui = {
  async card(title, text = '', ms = 2600) { card.innerHTML = `<h1>${title}</h1>${text ? `<p>${text}</p>` : ''}`; card.classList.add('on'); await sleep(ms); },
  async uncard() { card.classList.remove('on'); await sleep(900); },
  black(on) { card.innerHTML = ''; card.classList.toggle('on', on); },
  async tablet(o) {
    tab.innerHTML = `<div class="hd">SERVICE TECHNIQUE · SECTEUR 5 · BON N° ${o.num}</div><h2>${o.title}</h2>
      ${(o.rows || []).map(([k, v]) => `<div class="row"><span class="k">${k}</span><span>${v}</span></div>`).join('')}
      ${o.stamp ? `<div class="stamp">DÉJÀ ARRIVÉ<small>${o.stamp}</small></div>` : ''}<div class="go">E / clic : commencer</div>`;
    tab.style.display = 'block'; await snap('tablette'); await waitKey(); tab.style.display = 'none';
  },
  async sms(from, text, ms = 4500) { sms.innerHTML = `<b>${from}</b>${text}`; sms.classList.add('on'); await sleep(ms); sms.classList.remove('on'); },
  async say(text, ms = 3200) { line.textContent = text; line.classList.add('on'); if (/«/.test(text)) await snap('replique'); await sleep(ms); line.classList.remove('on'); await sleep(500); },
  objective(t) { obj.textContent = t || ''; },
  prompt(t, p) { if (!t) { prompt.style.display = 'none'; return; } prompt.style.display = 'block'; prompt.firstChild.textContent = t; prompt.querySelector('i').style.width = `${Math.round((p || 0) * 100)}%`; },
  guide(x, y) { if (x === null) { guide.style.display = 'none'; return; } guide.style.display = 'block'; guide.style.left = `${x}px`; guide.style.top = `${y}px`; },
  waitKey,
};
