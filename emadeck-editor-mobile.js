/* Emadeck - editeur de page sur telephone : page a la largeur de l'ecran, reglages dans un panneau du bas. Ne change rien sur ordinateur. */
(function(){
  var f = document.getElementById('eFrame');
  if (!f) return;
  var CSS =
    'html.jdm,html.jdm body{max-width:100vw;overflow-x:hidden!important;touch-action:pan-y}' +
    'html.jdm.jdm-open,html.jdm.jdm-open body{overflow:hidden!important}' +
    'html.jdm .toolbar{position:fixed!important;top:0!important;left:0!important;right:0!important;height:auto!important;min-height:52px;flex-wrap:wrap!important;overflow:visible!important;padding:8px 10px!important;gap:6px 8px!important;align-items:center}' +
    'html.jdm .toolbar>*{min-width:0;max-width:100%}' +
    'html.jdm .toolbar button{padding:7px 10px!important;font-size:12.5px!important}' +
    'html.jdm .toolbar input[type=range]{width:90px!important;min-width:0!important}' +
    'html.jdm .toolbar label,html.jdm .toolbar span{font-size:12px}' +
    'html.jdm body{display:block!important;margin:0!important;padding-bottom:110px!important}' +
    'html.jdm .jdm-pg{margin-left:auto!important;margin-right:auto!important}' +
    'html.jdm .sidebar{position:fixed!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:100%!important;max-width:none!important;height:64dvh!important;border-right:0!important;border-top:1px solid #E4E2DD!important;border-radius:20px 20px 0 0!important;padding:22px 18px 120px!important;overflow-y:auto!important;overscroll-behavior:contain;z-index:200!important;transform:translateY(105%);transition:transform .25s ease;box-shadow:0 -18px 40px -20px rgba(0,0,0,.35)}' +
    'html.jdm.jdm-open .sidebar{transform:none}' +
    '#jdmSet{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:300;height:44px;padding:0 18px;border:0;border-radius:22px;background:#1A1A1A;color:#fff;font:600 14px Inter,system-ui,sans-serif;box-shadow:0 10px 26px -10px rgba(0,0,0,.55)}';

  function pageEls(d){
    var p = d.querySelectorAll('.page');
    if (p.length) return [].slice.call(p);
    var out = [];
    [].forEach.call(d.body.children, function(el){
      if (/^(SCRIPT|STYLE|LINK)$/.test(el.tagName)) return;
      if (el.matches('.sidebar,.toolbar,#jdmSet,#jdUndo')) return;
      var r = el.getBoundingClientRect();
      if (r.width > 300 && r.height > 300) out.push(el);
    });
    return out;
  }
  function layout(d){
    var tb = d.querySelector('.toolbar');
    var top = (tb ? tb.offsetHeight : 52) + 14;
    d.body.style.setProperty('padding-top', top + 'px', 'important');
    var vw = f.clientWidth || window.innerWidth;
    pageEls(d).forEach(function(p){
      p.classList.add('jdm-pg');
      p.style.setProperty('zoom', '1', 'important');
      var base = p.getBoundingClientRect().width || 816;
      p.style.setProperty('zoom', String(Math.min(1, (vw - 24) / base)), 'important');
    });
  }
  function setup(){
    if (window.innerWidth > 820) return;
    var d; try { d = f.contentDocument; } catch(e){ return; }
    if (!d || !d.body || !d.querySelector('.sidebar') || d.getElementById('jdmEdStyle')) return;
    var st = d.createElement('style'); st.id = 'jdmEdStyle'; st.textContent = CSS; d.head.appendChild(st);
    d.documentElement.classList.add('jdm');
    layout(d);
    var b = d.createElement('button'); b.type = 'button'; b.id = 'jdmSet'; b.textContent = 'Réglages';
    b.addEventListener('click', function(){
      var open = d.documentElement.classList.toggle('jdm-open');
      b.textContent = open ? 'Fermer' : 'Réglages';
    });
    d.body.appendChild(b);
    var again = function(){ try { layout(d); } catch(e){} };
    f._jdmFit = again;
    setTimeout(again, 500); setTimeout(again, 1500);
    var tb = d.querySelector('.toolbar');
    if (tb && window.ResizeObserver) new ResizeObserver(again).observe(tb);
  }
  f.addEventListener('load', function(){ setup(); setTimeout(setup, 600); });
  window.addEventListener('resize', function(){ if (f._jdmFit) f._jdmFit(); });
})();
