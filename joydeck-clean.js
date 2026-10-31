/* Emadeck - nettoyage de l'en-tete : plus de badge Builder, plus d'indicateur Saved,
   compteur de pages deplace dans la barre de personnalisation. La sauvegarde auto reste active. */
(function(){
  var css = document.createElement('style');
  css.textContent =
    'header.top .logo small{display:none!important}' +
    '#jdSaved{display:none!important}' +
    '#jds .count{display:inline-flex!important;align-items:center;white-space:nowrap;font:600 13px/1 "Plus Jakarta Sans",system-ui,sans-serif!important;color:#5C6684!important;background:#EEF3FF!important;border:0!important;padding:7px 12px!important;border-radius:999px!important;margin:0 4px 0 6px!important;order:-1}';
  document.head.appendChild(css);
  function move(){
    var bar = document.getElementById('jds');
    var c = document.querySelector('header.top .count');
    if (!bar || !c) return false;
    bar.insertBefore(c, bar.firstChild);
    return true;
  }
  function boot(){
    if (move()) return;
    var n = 0, t = setInterval(function(){ if (move() || ++n > 60) clearInterval(t); }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
