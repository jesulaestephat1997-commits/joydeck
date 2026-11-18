/* Emadeck - editeur de page sur telephone : page a la largeur de l'ecran, barre d'outils en bas, glisser pour changer de page. Ne change rien sur ordinateur. */
(function(){
  var f = document.getElementById('eFrame');
  if (!f) return;
  var CSS = [
    'html.jdm,html.jdm body{max-width:100vw;overflow-x:hidden!important;touch-action:pan-y}',
    'html.jdm body{display:block!important;margin:0!important;padding-left:0!important;padding-right:0!important;padding-bottom:110px!important;background:#EDEBE6!important}',
    'html.jdm .preview-area{display:flex!important;flex-direction:column;align-items:center;margin:0!important;padding:0!important;width:100%!important;max-width:none!important;min-height:0!important;position:static!important}',
    'html.jdm .page,html.jdm .jdm-pg{zoom:var(--jdm-z,.45)!important;margin:0 auto!important;flex:none}',
    'html.jdm .toolbar{position:fixed!important;top:0!important;left:0!important;right:0!important;height:52px!important;flex-wrap:nowrap!important;overflow-x:auto!important;padding:0 10px!important;gap:8px!important;z-index:150!important}',
    'html.jdm .toolbar button{flex:none;padding:8px 12px!important;font-size:13px!important}',
    'html.jdm .sidebar{position:fixed!important;left:10px!important;right:10px!important;top:auto!important;bottom:calc(76px + env(safe-area-inset-bottom))!important;width:auto!important;max-width:none!important;height:auto!important;max-height:42dvh!important;overflow-y:auto!important;overscroll-behavior:contain;padding:14px 16px!important;border:1px solid #E4E2DD!important;border-radius:18px!important;background:#fff!important;box-shadow:0 18px 40px -16px rgba(0,0,0,.45);z-index:200!important;opacity:0;pointer-events:none;transform:translateY(12px);transition:opacity .18s,transform .18s}',
    'html.jdm.jdm-open .sidebar{opacity:1;pointer-events:auto;transform:none}',
    'html.jdm .sidebar h2,html.jdm .sidebar .sub,html.jdm .sidebar hr{display:none!important}',
    'html.jdm.jdm-grouped .sidebar .control-group{display:none!important}',
    'html.jdm.jdm-grouped .sidebar .control-group.jdm-on{display:block!important}',
    'html.jdm .sidebar .control-group{margin:0 0 12px!important}',
    'html.jdm .sidebar select{width:100%!important;font-size:16px!important;min-height:44px}',
    'html.jdm .sidebar input[type=range]{width:100%!important}',
    'html.jdm .sidebar input[type=color]{width:46px!important;height:46px!important}',
    'html.jdm .sidebar .swatch-row{display:flex!important;align-items:center;gap:12px;padding:6px 0}',
    'html.jdm.jdm-open body{padding-bottom:calc(42dvh + 100px)!important}',
    '#jdmBar{position:fixed;left:0;right:0;bottom:0;z-index:300;display:flex;justify-content:space-around;padding:8px 8px calc(8px + env(safe-area-inset-bottom));background:#fff;border-top:1px solid #E4E2DD}',
    '#jdmBar button{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:64px;padding:4px 8px;border:0;background:none;color:#6B6B6B;font:600 11.5px Inter,system-ui,sans-serif}',
    '#jdmBar button.on{color:#4C1D95}',
    '#jdmBar svg{width:24px;height:24px}',
    '#jdmDots{display:flex;justify-content:center;align-items:center;gap:7px;margin:14px 0 0}',
    '#jdmDots i{display:block;width:8px;height:8px;border-radius:4px;background:#C9C6BE}',
    '#jdmDots i.on{width:24px;background:#4C1D95}'
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
    var tb = d.querySelector('.toolbar');
    d.body.style.setProperty('padding-top', ((tb ? tb.offsetHeight : 52) + 14) + 'px', 'important');
    var root = d.documentElement;
    root.style.setProperty('--jdm-z', '1');
    var pgs = pageEls(d);
    pgs.forEach(function(p){ if (!p.classList.contains('page')) p.classList.add('jdm-pg'); });
    var base = pgs.length ? pgs[0].getBoundingClientRect().width : 816;
    if (!base || base < 100) base = 816;
    var vw = root.clientWidth || f.clientWidth || window.innerWidth;
    root.style.setProperty('--jdm-z', String(Math.min(1, (vw - 24) / base)));
  }
  function dots(d){
    var host = d.getElementById('jdmDots');
    if (!host){ host = d.createElement('div'); host.id = 'jdmDots'; (d.querySelector('.preview-area') || d.body).appendChild(host); }
    host.innerHTML = '';
    var t = ''; try { t = document.getElementById('eTitle').textContent; } catch(e){}
    var m = /(\d+)\s*\/\s*(\d+)/.exec(t);
    if (!m) return;
    var cur = +m[1], n = Math.min(+m[2], 12);
    for (var i = 1; i <= n; i++){ var s = d.createElement('i'); if (i === cur) s.className = 'on'; host.appendChild(s); }
  }
  function bar(d){
    var groups = [].slice.call(d.querySelectorAll('.sidebar .control-group')), kinds = [];
    if (groups.length){
      d.documentElement.classList.add('jdm-grouped');
      groups.forEach(function(g){
        var k = g.querySelector('input[type=color]') ? 'color' : g.querySelector('select') ? 'font' : g.querySelector('input[type=range]') ? 'size' : g.querySelector('input[type=file]') ? 'image' : 'more';
        g.setAttribute('data-jdm', k);
        if (kinds.indexOf(k) < 0) kinds.push(k);
      });
      kinds.sort(function(a, b){ return ORDER.indexOf(a) - ORDER.indexOf(b); });
    } else kinds = ['all'];
    var el = d.createElement('div'); el.id = 'jdmBar';
    kinds.forEach(function(k){
      var b = d.createElement('button'); b.type = 'button'; b.setAttribute('data-k', k);
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</svg><span>' + NAMES[k] + '</span>';
      el.appendChild(b);
    });
    el.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      var k = b.getAttribute('data-k'), root = d.documentElement;
      var same = root.classList.contains('jdm-open') && root.getAttribute('data-jdm-tab') === k;
      [].forEach.call(el.children, function(x){ x.classList.remove('on'); });
      if (same){ root.classList.remove('jdm-open'); return; }
      root.setAttribute('data-jdm-tab', k); root.classList.add('jdm-open'); b.classList.add('on');
      groups.forEach(function(g){ g.classList.toggle('jdm-on', g.getAttribute('data-jdm') === k); });
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
      if (st && st.closest && st.closest('[contenteditable],.sidebar,.toolbar,#jdmBar,input,select')) return;
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
    setTimeout(again, 500); setTimeout(again, 1500);
    var tb = d.querySelector('.toolbar');
    if (tb && window.ResizeObserver) new ResizeObserver(again).observe(tb);
  }
  f.addEventListener('load', function(){ setup(); setTimeout(setup, 600); });
  window.addEventListener('resize', function(){ if (f._jdmFit) f._jdmFit(); });
})();
