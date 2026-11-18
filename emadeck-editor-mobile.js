/* Emadeck - editeur de page sur telephone : page a la largeur de l'ecran, reglages dans un panneau du bas. Ne change rien sur ordinateur. */
(function(){
  var f = document.getElementById('eFrame');
  if (!f) return;
  var CSS =
    'html.jdm .toolbar{left:0!important;right:0!important;padding:0 10px!important;gap:8px!important}' +
    'html.jdm body{display:block!important;margin:0!important;padding:68px 0 120px!important;overflow-x:hidden!important}' +
    'html.jdm .page{margin:0 auto!important}' +
    'html.jdm .sidebar{position:fixed!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:100%!important;max-width:none!important;height:64dvh!important;border-right:0!important;border-top:1px solid #E4E2DD!important;border-radius:20px 20px 0 0!important;padding:22px 18px 120px!important;overflow-y:auto!important;z-index:200!important;transform:translateY(105%);transition:transform .25s ease;box-shadow:0 -18px 40px -20px rgba(0,0,0,.35)}' +
    'html.jdm.jdm-open .sidebar{transform:none}' +
    '#jdmSet{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:300;height:48px;padding:0 26px;border:0;border-radius:24px;background:#1A1A1A;color:#fff;font:600 15px Inter,system-ui,sans-serif;box-shadow:0 10px 26px -10px rgba(0,0,0,.55)}';

  function fit(d){
    var vw = f.clientWidth || window.innerWidth;
    [].forEach.call(d.querySelectorAll('.page'), function(p){
      p.style.setProperty('zoom', '1', 'important');
      var base = p.getBoundingClientRect().width || 816;
      var z = Math.min(1, (vw - 24) / base);
      p.style.setProperty('zoom', String(z), 'important');
    });
  }
  function setup(){
    if (window.innerWidth > 820) return;
    var d; try { d = f.contentDocument; } catch(e){ return; }
    if (!d || !d.body || !d.querySelector('.sidebar') || d.getElementById('jdmEdStyle')) return;
    var st = d.createElement('style'); st.id = 'jdmEdStyle'; st.textContent = CSS; d.head.appendChild(st);
    d.documentElement.classList.add('jdm');
    fit(d);
    var b = d.createElement('button'); b.type = 'button'; b.id = 'jdmSet'; b.textContent = 'Réglages';
    b.addEventListener('click', function(){
      var open = d.documentElement.classList.toggle('jdm-open');
      b.textContent = open ? 'Fermer' : 'Réglages';
    });
    d.body.appendChild(b);
    f._jdmFit = function(){ fit(d); };
  }
  f.addEventListener('load', function(){ setup(); setTimeout(setup, 600); });
  window.addEventListener('resize', function(){ if (f._jdmFit) { try { f._jdmFit(); } catch(e){} } });
})();
