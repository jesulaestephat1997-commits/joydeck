/* Emadeck - editeur de page sur telephone : barre unique, page entiere, barre d'outils flottante. Ne change rien sur ordinateur. */
(function(){
  var f = document.getElementById('eFrame');
  if (!f) return;
  var FONT = '"Plus Jakarta Sans",system-ui,sans-serif';

  /* ---------- parent (builder) ---------- */
  var PCSS = [
    '.jdm-act,.jdm-save{display:none}',
    '.jdm-act{flex:none;width:40px;height:40px;align-items:center;justify-content:center;border:0;border-radius:12px;background:#F2F5FD;color:#0B1B4D;padding:0}',
    '.jdm-act:disabled{opacity:.35}',
    '.jdm-act svg{width:20px;height:20px}',
    '.jdm-save{flex:none;height:40px;padding:0 16px;border:0;border-radius:12px;background:#1F4FD8;color:#fff;font:700 14px ' + FONT + '}',
    '@media(max-width:820px){',
    'html.jdm-lock{overflow:hidden!important;height:100%!important}',
    'body.editing{position:fixed!important;left:0!important;right:0!important;top:0!important;bottom:0!important;width:100%!important;overflow:hidden!important}',
    'body.editing header.top{display:none!important}',
    'html body.editing #editor{top:0!important;display:flex!important;flex-direction:column;overflow:hidden!important;background:#EDEBE6}',
    'html body.editing #editor .ebar{position:static!important;width:100%!important;height:58px!important;flex:none;box-sizing:border-box;display:flex!important;flex-wrap:nowrap!important;align-items:center;gap:8px!important;padding:0 12px!important;background:#fff;border-bottom:1px solid #E4E9F5!important;overflow:visible!important}',
    'html body.editing #editor .ebar #backBtn{font-size:0!important;position:relative;flex:none;width:42px;height:42px!important;padding:0!important;border:0!important;border-radius:12px!important;background:#F2F5FD!important}',
    'html body.editing #editor .ebar #backBtn::before{content:"";position:absolute;left:50%;top:50%;width:10px;height:10px;border-left:2.4px solid #0B1B4D;border-bottom:2.4px solid #0B1B4D;transform:translate(-30%,-50%) rotate(45deg)}',
    'html body.editing #editor .ebar #prevBtn,html body.editing #editor .ebar #nextBtn,html body.editing #editor .ebar .count{display:none!important}',
    'html body.editing #editor .ebar #eTitle{flex:1 1 auto;min-width:0;display:-webkit-box!important;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden!important;white-space:normal!important;font:700 13px/1.25 ' + FONT + '!important;color:#0B1B4D}',
    'html body.editing #editor iframe{flex:1 1 0!important;min-height:0!important;width:100%!important;height:auto!important;border:0}',
    'body.editing .jdm-act{display:flex}',
    'body.editing .jdm-save{display:block}',
    '}'
  ].join('');
  var ps = document.createElement('style'); ps.id = 'jdmParentCss'; ps.textContent = PCSS; document.head.appendChild(ps);

  function clickIn(id){ try { var b = f.contentDocument.getElementById(id); if (b) b.click(); } catch(e){} }
  function sync(){
    try {
      var d = f.contentDocument, a = d.getElementById('undoBtn'), b = d.getElementById('redoBtn');
      var u = document.getElementById('jdmU'), r = document.getElementById('jdmR');
      if (u) u.disabled = !a || a.disabled;
      if (r) r.disabled = !b || b.disabled;
    } catch(e){}
  }
  function actions(){
    var eb = document.querySelector('#editor .ebar');
    if (!eb || eb.querySelector('.jdm-act')) return;
    function mk(id, btnId, svg, label){
      var b = document.createElement('button'); b.type = 'button'; b.className = 'jdm-act'; b.id = id; b.setAttribute('aria-label', label);
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + svg + '</svg>';
      b.addEventListener('click', function(){ clickIn(btnId); });
      return b;
    }
    var s = document.createElement('button'); s.type = 'button'; s.className = 'jdm-save'; s.textContent = 'Enregistrer';
    s.addEventListener('click', function(){ clickIn('saveBtn'); s.textContent = 'Enregistré'; setTimeout(function(){ s.textContent = 'Enregistrer'; }, 1600); });
    eb.appendChild(mk('jdmU', 'undoBtn', '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>', 'Annuler'));
    eb.appendChild(mk('jdmR', 'redoBtn', '<path d="m15 14 5-5-5-5"/><path d="M20 9H10a6 6 0 0 0 0 12h3"/>', 'Rétablir'));
    eb.appendChild(s);
    setInterval(sync, 500);
  }
  function lock(){ document.documentElement.classList.toggle('jdm-lock', document.body.classList.contains('editing') && window.innerWidth <= 820); }
  if (window.innerWidth <= 820){
    actions(); lock();
    new MutationObserver(lock).observe(document.body, {attributes: true, attributeFilter: ['class']});
  }

  /* ---------- dans le cadre (modele de page) ---------- */
  var CSS = [
    'html.jdm,html.jdm body{max-width:100vw;overflow-x:hidden!important;touch-action:manipulation}',
    'html.jdm body{display:flex!important;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;min-height:100vh;margin:0!important;padding:12px 0 96px!important;background:#EDEBE6!important}',
    'html.jdm .preview-area{display:block!important;margin:0!important;padding:0!important;width:auto!important;max-width:none!important;min-height:0!important;position:static!important}',
    'html.jdm .page,html.jdm .jdm-pg{zoom:var(--jdm-z,.45)!important;margin:0 auto!important;flex:none;box-shadow:0 16px 38px -14px rgba(11,27,77,.4)!important}',
    'html.jdm .toolbar{display:none!important}',
    'html.jdm .sidebar{position:fixed!important;left:12px!important;right:12px!important;top:auto!important;bottom:calc(90px + env(safe-area-inset-bottom))!important;width:auto!important;max-width:none!important;height:auto!important;max-height:40dvh!important;overflow-y:auto!important;overscroll-behavior:contain;padding:0 18px 12px!important;border:1px solid #E4E9F5!important;border-radius:20px!important;background:#fff!important;box-shadow:0 22px 48px -18px rgba(11,27,77,.5);z-index:200!important;opacity:0;pointer-events:none;transform:translateY(14px);transition:opacity .2s,transform .2s}',
    'html.jdm.jdm-open .sidebar{opacity:1;pointer-events:auto;transform:none}',
    'html.jdm .sidebar h2,html.jdm .sidebar .sub,html.jdm .sidebar hr{display:none!important}',
    'html.jdm .jdm-head{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:14px 0 10px;background:#fff}',
    'html.jdm .jdm-head b{font:700 15px ' + FONT + ';color:#0B1B4D}',
    'html.jdm .jdm-head button{border:0;background:none;padding:4px 0;color:#1F4FD8;font:700 14px ' + FONT + '}',
    'html.jdm.jdm-grouped .sidebar .control-group{display:none!important}',
    'html.jdm.jdm-grouped .sidebar .control-group.jdm-on{display:block!important}',
    'html.jdm .sidebar .control-group{margin:0 0 14px!important}',
    'html.jdm .sidebar .control-group>label{display:block;margin:0 0 8px;font:700 11px ' + FONT + ';letter-spacing:.08em;text-transform:uppercase;color:#7A8299}',
    'html.jdm .sidebar select{width:100%!important;height:48px;padding:0 12px;border:1px solid #E4E9F5;border-radius:12px;background:#F6F8FE;font-size:16px!important;color:#141B34}',
    'html.jdm .sidebar input[type=range]{width:100%!important;accent-color:#1F4FD8}',
    'html.jdm .sidebar .swatch-row{display:flex!important;flex-direction:row-reverse;justify-content:space-between;align-items:center;padding:10px 0;border-top:1px solid #F0F2F8}',
    'html.jdm .sidebar .swatch-row span{font:600 15px ' + FONT + ';color:#141B34}',
    'html.jdm .sidebar input[type=color]{-webkit-appearance:none;appearance:none;width:44px!important;height:44px!important;padding:0;border:0;border-radius:50%;background:none;box-shadow:0 0 0 1px #D9DDE8}',
    'html.jdm .sidebar input[type=color]::-webkit-color-swatch-wrapper{padding:3px}',
    'html.jdm .sidebar input[type=color]::-webkit-color-swatch{border:0;border-radius:50%}',
    '#jdmBar{position:fixed;left:12px;right:12px;bottom:calc(10px + env(safe-area-inset-bottom));z-index:300;display:flex;justify-content:space-around;gap:4px;padding:6px;border-radius:22px;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid #E4E9F5;box-shadow:0 16px 36px -14px rgba(11,27,77,.45)}',
    '#jdmBar button{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 4px;border:0;border-radius:16px;background:none;color:#6B7490;font:600 11.5px ' + FONT + '}',
    '#jdmBar button.on{background:#EEF3FF;color:#1F4FD8}',
    '#jdmBar svg{width:22px;height:22px}',
    '#jdmDots{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:14px}',
    '#jdmDots i{display:block;width:7px;height:7px;border-radius:4px;background:#C4C9D8;transition:width .2s}',
    '#jdmDots i.on{width:22px;background:#1F4FD8}',
    '#jdmDots button{width:30px;height:30px;padding:0;border:0;border-radius:50%;background:#fff;color:#0B1B4D;font:700 16px/1 ' + FONT + ';box-shadow:0 2px 8px -2px rgba(11,27,77,.3)}',
    '#jdmDots button:disabled{opacity:.35}'
  ].join('');

  var NAMES = {color:'Couleurs', font:'Police', size:'Tailles', image:'Image', more:'Plus', all:'Réglages'};
  var ORDER = ['color','font','size','image','more','all'];
  var ICONS = {
    color:'<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2"/><circle cx="12" cy="7.5" r="1.2"/><circle cx="15.5" cy="10" r="1.2"/>',
    font:'<path d="M3 18 8 6l5 12M5 14h6M15 18l3-7 3 7M16.2 16h3.6"/>',
    size:'<path d="M5 8V5h14v3M12 5v14M9 19h6"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M21 16l-5-5-8 9"/>',
    more:'<circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>',
    all:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'
  };

  function pageEls(d){
    var p = d.querySelectorAll('.page');
    if (p.length) return [].slice.call(p);
    var host = d.querySelector('.preview-area') || d.body, out = [];
    [].forEach.call(host.children, function(el){
      if (/^(SCRIPT|STYLE|LINK)$/.test(el.tagName)) return;
      if (el.matches('.sidebar,.toolbar,#jdmBar,#jdmDots,#jdUndo')) return;
      var r = el.getBoundingClientRect();
      if (r.width > 300 && r.height > 300) out.push(el);
    });
    return out;
  }
  function layout(d){
    var root = d.documentElement, sheet = d.querySelector('.sidebar');
    var open = root.classList.contains('jdm-open');
    var reserve = open && sheet ? sheet.offsetHeight + 96 : 96;
    d.body.style.setProperty('padding-bottom', reserve + 'px', 'important');
    root.style.setProperty('--jdm-z', '1');
    var pgs = pageEls(d);
    pgs.forEach(function(p){ if (!p.classList.contains('page')) p.classList.add('jdm-pg'); });
    var r = pgs.length ? pgs[0].getBoundingClientRect() : null;
    var bw = r && r.width > 100 ? r.width : 816, bh = r && r.height > 100 ? r.height : 1056;
    var vw = root.clientWidth || f.clientWidth || window.innerWidth;
    var vh = root.clientHeight || f.clientHeight || window.innerHeight;
    var z = Math.min(1, (vw - 32) / bw, (vh - 12 - reserve - 52) / bh);
    root.style.setProperty('--jdm-z', String(Math.max(0.2, z)));
  }
  function dots(d){
    var host = d.getElementById('jdmDots');
    if (!host){ host = d.createElement('div'); host.id = 'jdmDots'; d.body.appendChild(host); }
    host.innerHTML = '';
    var t = ''; try { t = document.getElementById('eTitle').textContent; } catch(e){}
    var m = /(\d+)\s*\/\s*(\d+)/.exec(t);
    if (!m) return;
    var cur = +m[1], total = +m[2];
    function arrow(txt, id, off){
      var b = d.createElement('button'); b.type = 'button'; b.textContent = txt; b.disabled = off;
      b.addEventListener('click', function(){ var x = document.getElementById(id); if (x) x.click(); });
      return b;
    }
    host.appendChild(arrow('‹', 'prevBtn', cur <= 1));
    for (var i = 1; i <= Math.min(total, 10); i++){ var s = d.createElement('i'); if (i === cur) s.className = 'on'; host.appendChild(s); }
    host.appendChild(arrow('›', 'nextBtn', cur >= total));
  }
  function bar(d){
    var root = d.documentElement, sheet = d.querySelector('.sidebar');
    var groups = [].slice.call(d.querySelectorAll('.sidebar .control-group')), kinds = [];
    if (groups.length){
      root.classList.add('jdm-grouped');
      groups.forEach(function(g){
        var k = g.querySelector('input[type=color]') ? 'color' : g.querySelector('select') ? 'font' : g.querySelector('input[type=range]') ? 'size' : g.querySelector('input[type=file]') ? 'image' : 'more';
        g.setAttribute('data-jdm', k);
        if (kinds.indexOf(k) < 0) kinds.push(k);
      });
      kinds.sort(function(a, b){ return ORDER.indexOf(a) - ORDER.indexOf(b); });
    } else kinds = ['all'];
    var head = d.createElement('div'); head.className = 'jdm-head';
    head.innerHTML = '<b></b><button type="button">Terminé</button>';
    sheet.insertBefore(head, sheet.firstChild);
    var el = d.createElement('div'); el.id = 'jdmBar';
    kinds.forEach(function(k){
      var b = d.createElement('button'); b.type = 'button'; b.setAttribute('data-k', k);
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</svg><span>' + NAMES[k] + '</span>';
      el.appendChild(b);
    });
    function closeSheet(){
      root.classList.remove('jdm-open');
      [].forEach.call(el.children, function(x){ x.classList.remove('on'); });
      layout(d);
    }
    head.querySelector('button').addEventListener('click', closeSheet);
    el.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      var k = b.getAttribute('data-k');
      var same = root.classList.contains('jdm-open') && root.getAttribute('data-jdm-tab') === k;
      if (same){ closeSheet(); return; }
      [].forEach.call(el.children, function(x){ x.classList.toggle('on', x === b); });
      root.setAttribute('data-jdm-tab', k);
      head.querySelector('b').textContent = NAMES[k];
      groups.forEach(function(g){ g.classList.toggle('jdm-on', g.getAttribute('data-jdm') === k); });
      root.classList.add('jdm-open');
      layout(d);
    });
    d.body.appendChild(el);
  }
  function swipe(d){
    var sx = null, sy = 0, st = null;
    d.addEventListener('touchstart', function(e){ var t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = e.target; }, {passive: true});
    d.addEventListener('touchend', function(e){
      if (sx === null) return;
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
      if (Math.abs(dx) < 70 || Math.abs(dx) < 2 * Math.abs(dy)) return;
      if (st && st.closest && st.closest('[contenteditable],.sidebar,#jdmBar,input,select')) return;
      var btn = document.getElementById(dx < 0 ? 'nextBtn' : 'prevBtn');
      if (btn) btn.click();
    }, {passive: true});
  }
  function setup(){
    if (window.innerWidth > 820) return;
    var d; try { d = f.contentDocument; } catch(e){ return; }
    if (!d || !d.body || !d.querySelector('.sidebar') || d.getElementById('jdmEdStyle')) return;
    var st = d.createElement('style'); st.id = 'jdmEdStyle'; st.textContent = CSS; d.head.appendChild(st);
    d.documentElement.classList.add('jdm');
    bar(d); dots(d); swipe(d); layout(d);
    var again = function(){ try { layout(d); } catch(e){} };
    f._jdmFit = again;
    setTimeout(again, 400); setTimeout(again, 1400);
  }
  f.addEventListener('load', function(){ setup(); setTimeout(setup, 600); });
  window.addEventListener('resize', function(){ if (f._jdmFit) f._jdmFit(); });
})();
