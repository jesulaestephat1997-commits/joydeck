(function(){
  if (window.__jdsLoaded) return; window.__jdsLoaded = 1;
  const TK = 'jdstyle_theme', OK = 'jdstyle_orig';
  const $ = id => document.getElementById(id);
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch(e){ return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };

  const BASE_PALETTES = [
    {id:'noir-or',    name:'Noir & Or',       title:'#111111', text:'#333333', accent:'#B08D57', accent2:'#D9C9A8', border:'#CFCFCF', soft:'#8A8A8A', pale:'#F5F1EA', bg:'#FFFFFF'},
    {id:'bleu-nuit',  name:'Bleu nuit',       title:'#14213D', text:'#2B3445', accent:'#1F4E8C', accent2:'#A9C1E8', border:'#C7D2E5', soft:'#6B7A99', pale:'#EDF2FA', bg:'#FFFFFF'},
    {id:'vert-foret', name:'Vert forêt',      title:'#1F3D2F', text:'#2E3B33', accent:'#2F6B4F', accent2:'#B7D4C2', border:'#CFE0D5', soft:'#6F8A7A', pale:'#EEF5F0', bg:'#FFFFFF'},
    {id:'bordeaux',   name:'Bordeaux',        title:'#3B0A14', text:'#3A2A2D', accent:'#8E1B2E', accent2:'#E3B7BE', border:'#E6CDD1', soft:'#8A6E73', pale:'#F8EEF0', bg:'#FFFFFF'},
    {id:'rose-poudre',name:'Rose poudré',     title:'#4A2B33', text:'#4A3A3E', accent:'#C98A94', accent2:'#F0D5D9', border:'#EBD6D9', soft:'#A58A8F', pale:'#FBF1F2', bg:'#FFFFFF'},
    {id:'terracotta', name:'Terracotta',      title:'#4A2616', text:'#4B3A32', accent:'#C2623A', accent2:'#EBC3AE', border:'#E8D2C6', soft:'#9A7B6C', pale:'#FAF0EA', bg:'#FFFFFF'},
    {id:'lavande',    name:'Lavande',         title:'#2E2250', text:'#3C3558', accent:'#7A62C6', accent2:'#D6CCF0', border:'#DDD6EF', soft:'#8A82A8', pale:'#F3F0FA', bg:'#FFFFFF'},
    {id:'ocean',      name:'Océan',           title:'#0B3C49', text:'#26454D', accent:'#1A8FA0', accent2:'#B5E0E6', border:'#CBE5E9', soft:'#6A939B', pale:'#EBF6F8', bg:'#FFFFFF'},
    {id:'moutarde',   name:'Moutarde',        title:'#2D2A1F', text:'#3E3A2C', accent:'#D4A017', accent2:'#F1DE9C', border:'#E6DCB8', soft:'#8F8760', pale:'#FBF6E4', bg:'#FFFFFF'},
    {id:'corail',     name:'Corail & Marine', title:'#1D2B53', text:'#33405F', accent:'#F26B5B', accent2:'#FBC9C2', border:'#D7DCEA', soft:'#7B86A5', pale:'#FFF1EF', bg:'#FFFFFF'},
    {id:'sauge',      name:'Sauge & Crème',   title:'#2F3B2B', text:'#404B3C', accent:'#7E9B6B', accent2:'#D7E2CC', border:'#DDE5D3', soft:'#8C9A82', pale:'#F6F3E8', bg:'#FBF8EF'},
    {id:'mono',       name:'Gris mono',       title:'#222222', text:'#444444', accent:'#666666', accent2:'#BDBDBD', border:'#D4D4D4', soft:'#888888', pale:'#F2F2F2', bg:'#FFFFFF'}
  ];
  const PALETTES = BASE_PALETTES.concat(Array.isArray(window.JD_EXTRA_PALETTES) ? window.JD_EXTRA_PALETTES : []);

  const FONTS = [
    ["'EB Garamond', serif",'EB Garamond'],["'Cormorant Garamond', serif",'Cormorant Garamond'],["'Libre Baskerville', serif",'Libre Baskerville'],
    ["'Playfair Display', serif",'Playfair Display'],["'Fraunces', serif",'Fraunces'],["'Marcellus', serif",'Marcellus'],["'Prata', serif",'Prata'],
    ["'Italiana', serif",'Italiana'],["'DM Serif Display', serif",'DM Serif Display'],["'Abril Fatface', serif",'Abril Fatface'],["'Cinzel', serif",'Cinzel'],
    ["'Poppins', sans-serif",'Poppins'],["'Inter', sans-serif",'Inter'],["'Montserrat', sans-serif",'Montserrat'],["'Space Grotesk', sans-serif",'Space Grotesk'],
    ["'Outfit', sans-serif",'Outfit'],["'Bricolage Grotesque', sans-serif",'Bricolage Grotesque'],["'Great Vibes', cursive",'Great Vibes'],
    ["'Dancing Script', cursive",'Dancing Script'],["'Parisienne', cursive",'Parisienne'],["'Alex Brush', cursive",'Alex Brush'],["'Allura', cursive",'Allura'],
    ["'Sacramento', cursive",'Sacramento'],["'Tangerine', cursive",'Tangerine'],["'Pinyon Script', cursive",'Pinyon Script']
  ];

  const PAIRS = [
    ['Élégant','Playfair Display','Libre Baskerville'],['Moderne','Montserrat','Inter'],['Magazine','DM Serif Display','Poppins'],
    ['Romantique','Cormorant Garamond','EB Garamond'],['Luxe','Cinzel','Cormorant Garamond'],['Chic','Italiana','Marcellus'],
    ['Sobre','Inter','Inter'],['Créatif','Bricolage Grotesque','Outfit'],['Rétro','Abril Fatface','Libre Baskerville'],
    ['Livre','EB Garamond','EB Garamond'],['Tech','Space Grotesk','Inter'],['Signature','Parisienne','Poppins'],
    ['Doux','Fraunces','Outfit'],['Antique','Prata','EB Garamond'],['Manuscrit','Dancing Script','Inter'],['Allure','Allura','Montserrat']
  ];

  const F = n => (FONTS.find(f => f[1] === n) || [])[0];
  const EXTRA_FONTS = Array.isArray(window.JD_EXTRA_FONTS) ? window.JD_EXTRA_FONTS : [];
  const ALLFONTS = FONTS.concat(EXTRA_FONTS.map(f => [f[0], f[1]]));
  if (EXTRA_FONTS.length) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=' + EXTRA_FONTS.filter(f => f[2]).map(f => f[2]).join('&family=') + '&display=swap'; document.head.appendChild(l); }
  function ensureFonts(f){
    try {
      const d = f.contentDocument; if (!d || !d.head) return;
      ['fontHeading', 'fontBody'].forEach(id => {
        const e = d.getElementById(id); if (!e) return;
        const x = EXTRA_FONTS.find(a => a[0] === e.value); if (!x || !x[2]) return;
        const lid = 'jdsf-' + x[2].replace(/\W/g, ''); if (d.getElementById(lid)) return;
        const l = d.createElement('link'); l.id = lid; l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=' + x[2] + '&display=swap'; d.head.appendChild(l);
      });
    } catch(err){}
  }
  let theme = load(TK, {pal:null, fh:null, fb:null});
  const PG = 'jdstyle_pages'; let delta = {};
  const scopeSlots = () => { try { return window.__jdsScope ? window.__jdsScope() : []; } catch(e){ return []; } };
  const tgt = () => scopeSlots().length ? delta : theme;

  // ---------- couleurs ----------
  const hex2rgb = h => { h = String(h || '').replace('#', ''); if (h.length === 3) h = h.replace(/./g, '$&$&'); return /^[0-9a-f]{6}$/i.test(h) ? [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)) : null; };
  const rgb2hex = c => '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const Y = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
  function ramp(P){
    const st = ['title', 'text', 'accent', 'accent2', 'border', 'pale'].map(k => hex2rgb(P[k])).filter(Boolean).map(c => ({y: Y(c), c: c}));
    st.sort((a, b) => a.y - b.y);
    const out = [], bg = hex2rgb(P.bg || '#ffffff');
    st.forEach(s => { if (!out.length || s.y - out[out.length - 1].y > 0.004) out.push(s); });
    if (bg) out.push({y: Math.max(1, out[out.length - 1].y + 0.001), c: bg});
    return out;
  }
  function mapColor(orig, R){
    const c = hex2rgb(orig); if (!c || !R.length) return null;
    const y = Y(c);
    if (y <= R[0].y) return rgb2hex(R[0].c);
    for (let i = 1; i < R.length; i++) {
      if (y <= R[i].y) {
        const a = R[i - 1], b = R[i], t = (y - a.y) / (b.y - a.y || 1);
        return rgb2hex(a.c.map((v, k) => v + (b.c[k] - v) * t));
      }
    }
    return rgb2hex(R[R.length - 1].c);
  }
  const palette = () => PALETTES.find(p => p.id === theme.pal) || null;
  const grey = h => { const c = hex2rgb(h); if (!c) return true; const mx = Math.max.apply(null, c), mn = Math.min.apply(null, c); return mx === 0 || (mx - mn) / mx < 0.12; };
  const isSlot = id => /slot|photo|image|illu|picture|img|cadre|frame/i.test(id);

  // ---------- application sur une page (iframe) ----------
  function apply(f){
    try {
      const d = f.contentDocument, w = f.contentWindow; if (!d || !w) return;
      const src = f.dataset.jdcur || f.getAttribute('src') || ''; const m = src.match(/[?&]slot=([^&]+)/); if (!m || m[1] === '__lib') return;
      const slot = m[1];
      const ins = Array.from(d.querySelectorAll('input[type="color"]')).filter(e => e.id);
      if (!ins.length) return;
      const sel = ['fontHeading', 'fontBody'].map(i => d.getElementById(i)).filter(Boolean);
      const all = load(OK, {});
      let o = all[slot];
      if (!o) { o = {}; ins.forEach(e => { o[e.id] = e.value; }); sel.forEach(e => { o['#' + e.id] = e.value; }); all[slot] = o; save(OK, all); }
      const PT = load(PG, {})[slot] || theme; const P = PALETTES.find(p => p.id === PT.pal) || null, R = P ? ramp(P) : null;
      const fire = (el, t) => el.dispatchEvent(new w.Event(t, {bubbles: true}));
      ins.forEach(e => {
        const base = o[e.id]; if (!base) return;
        let v = !P ? base : (isSlot(e.id) && grey(base) ? P.accent2 : mapColor(base, R));
        if (v && e.value.toLowerCase() !== v.toLowerCase()) { e.value = v; fire(e, 'input'); fire(e, 'change'); }
      });
      [['fontHeading', PT.fh], ['fontBody', PT.fb]].forEach(a => {
        const e = d.getElementById(a[0]); if (!e) return;
        const v = a[1] || o['#' + a[0]]; if (!v) return;
        if (![].some.call(e.options, op => op.value === v)) e.add(new w.Option(v.split(',')[0].replace(/'/g, ''), v));
        if (e.value !== v) { e.value = v; fire(e, 'change'); }
      });
      ensureFonts(f);
      const b = d.getElementById('saveBtn'); if (b) b.click();
    } catch(err){}
  }
  const pending = new WeakMap();
  function schedule(f, delay){
    clearTimeout(pending.get(f));
    pending.set(f, setTimeout(() => apply(f), delay));
  }
  function watch(f){
    if (f.__jds) return; f.__jds = 1;
    f.addEventListener('load', () => { setTimeout(() => ensureFonts(f), 120); schedule(f, 350); schedule(f, 1400); });
    try { if (f.contentDocument && f.contentDocument.readyState === 'complete') schedule(f, 350); } catch(e){}
  }
  const scan = root => (root.tagName === 'IFRAME' ? [root] : Array.from(root.querySelectorAll('iframe'))).forEach(f => { if (f.closest('#strip,#printRoot')) watch(f); });
  const applyAll = () => document.querySelectorAll('#strip iframe').forEach(f => apply(f));

  // ---------- panneau compact ----------
  const css = document.createElement('style');
  css.textContent = `#jds{display:flex;flex-wrap:wrap;align-items:center;gap:10px;background:#fff;border:1px solid #e6e1d8;border-radius:12px;padding:8px 12px;margin:0 0 14px;font:13px/1.2 Inter,system-ui,sans-serif;color:#333}
  #jds b{font-weight:700}#jds .dw{display:flex;align-items:center;gap:4px;flex:0 1 330px;min-width:150px}#jds .dots{display:flex;gap:7px;overflow-x:auto;scroll-behavior:smooth;scrollbar-width:none;padding:3px 2px;flex:1}#jds .dots::-webkit-scrollbar{display:none}#jds .ar{flex:none;width:24px;height:24px;border-radius:50%;border:1px solid #d9d4c9;background:#fff;cursor:pointer;line-height:1;padding:0;font-size:15px;color:#555}#jds .ar:hover{background:#f3f0ea}#jds .d{flex:none}
  #jds .d{width:26px;height:26px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #cfc9bd;cursor:pointer;padding:0}
  #jds .d.on{box-shadow:0 0 0 2px #2f6b4f}
  #jds select{border:1px solid #d9d4c9;border-radius:8px;padding:6px 8px;background:#fff;font:inherit;max-width:170px}
  #jds .o{border:1px solid #d9d4c9;border-radius:8px;background:#fff;padding:6px 10px;cursor:pointer;font:inherit}
  #jds .st{margin-left:auto;color:#2f6b4f;font-size:12px}`;
  document.head.appendChild(css);
  const bar = document.createElement('div'); bar.id = 'jds';
  bar.innerHTML = '<b>Style</b><span class="dw"><button class="ar" id="jdsL" title="Précédent">‹</button><span class="dots" id="jdsDots"></span><button class="ar" id="jdsR" title="Suivant">›</button></span>' +
    '<select id="jdsPair" title="Association de typos"><option value="">Association…</option></select>' +
    '<select id="jdsH" title="Typo des titres"><option value="">Titres…</option></select>' +
    '<select id="jdsB" title="Typo du texte"><option value="">Texte…</option></select>' +
    '<button class="o" id="jdsO">Original</button><span class="st" id="jdsSt"></span>';
  let stT; const status = t => { const s = $('jdsSt'); s.textContent = t; clearTimeout(stT); stT = setTimeout(() => { s.textContent = ''; }, 3000); };
  function fillSel(id, list){ const s = $(id); list.forEach(a => { const o = document.createElement('option'); o.value = a[0]; o.textContent = a[1]; if (a[2]) o.style.fontFamily = a[2]; s.appendChild(o); }); }
  function refresh(){
    $('jdsDots').querySelectorAll('.d').forEach(b => b.classList.toggle('on', b.dataset.id === theme.pal));
    $('jdsH').value = theme.fh || ''; $('jdsB').value = theme.fb || '';
    const p = PAIRS.find(a => F(a[1]) === theme.fh && F(a[2]) === theme.fb); $('jdsPair').value = p ? p[0] : '';
  }
  function commit(msg){
    const sl = scopeSlots();
    if (sl.length){ const pg = load(PG, {}); sl.forEach(k => { pg[k] = Object.assign({}, pg[k] || theme, delta); }); save(PG, pg); delta = {}; }
    else { save(PG, {}); save(TK, theme); }
    refresh(); applyAll(); status(msg || 'Appliqu\u00e9 \u2713');
  }
  function mount(){
    const book = $('book'), strip = $('strip'); if (!book || !strip) return false;
    book.insertBefore(bar, strip);
    PALETTES.forEach(p => {
      const b = document.createElement('button'); b.className = 'd'; b.dataset.id = p.id; b.title = p.name;
      b.style.background = 'linear-gradient(135deg,' + p.title + ' 0 38%,' + p.accent + ' 38% 70%,' + p.accent2 + ' 70%)';
      b.addEventListener('click', () => { tgt().pal = p.id; commit(p.name + ' ✓'); });
      $('jdsDots').appendChild(b);
    });
    fillSel('jdsPair', PAIRS.map(a => [a[0], a[0] + ' — ' + a[1] + ' / ' + a[2]]));
    fillSel('jdsH', ALLFONTS.map(f => [f[0], f[1], f[0]])); fillSel('jdsB', ALLFONTS.map(f => [f[0], f[1], f[0]]));
    $('jdsPair').addEventListener('change', e => { const p = PAIRS.find(a => a[0] === e.target.value); if (!p) return; tgt().fh = F(p[1]); tgt().fb = F(p[2]); commit(); });
    $('jdsH').addEventListener('change', e => { tgt().fh = e.target.value || null; commit(); });
    $('jdsB').addEventListener('change', e => { tgt().fb = e.target.value || null; commit(); });
    $('jdsO').addEventListener('click', () => { if (scopeSlots().length) delta = {pal:null, fh:null, fb:null}; else theme = {pal:null, fh:null, fb:null}; commit('Couleurs et typos d\'origine'); });
    const dots = $('jdsDots');
    $('jdsL').addEventListener('click', () => { dots.scrollLeft -= 150; });
    $('jdsR').addEventListener('click', () => { dots.scrollLeft += 150; });
    dots.addEventListener('wheel', e => { if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) { dots.scrollLeft += e.deltaY; e.preventDefault(); } }, {passive: false});
    refresh(); scan(document.body);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) scan(n); }))).observe(document.body, {childList: true, subtree: true});
    return true;
  }
  if (!mount()) document.addEventListener('DOMContentLoaded', mount);
})();
