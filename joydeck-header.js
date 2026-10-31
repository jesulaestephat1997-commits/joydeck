/* Emadeck - nouvel en-tete du builder (logo bleu, barre marine) + couleur de marque bleue.
   Ne modifie aucune page ni la barre de personnalisation. */
(function(){
  'use strict';
  if (window.__jdHead) return; window.__jdHead = 1;
  var css = [
  '@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap");',
  ':root{--accent:#1F4FD8;--accent-d:#173FB0}',
  'header.top{position:relative;gap:18px!important;padding:0 24px!important;height:68px;background:linear-gradient(100deg,#0A1745 0%,#0F2566 55%,#16358F 100%)!important;border-bottom:0!important;font-family:"Plus Jakarta Sans","Segoe UI",system-ui,sans-serif;box-shadow:0 8px 24px -14px rgba(10,23,69,.7);z-index:5}',
  'header.top::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,#1F4FD8,#5B8CFF 45%,#8EB4FF 70%,rgba(142,180,255,0))}',
  'header.top::before{content:"";position:absolute;right:-60px;top:-90px;width:320px;height:240px;background:radial-gradient(closest-side,rgba(91,140,255,.28),transparent);pointer-events:none}',
  'header.top .logo{display:flex;align-items:center;gap:10px;font:800 25px/1 "Plus Jakarta Sans",system-ui,sans-serif!important;letter-spacing:-.03em!important;color:#fff!important;text-decoration:none;white-space:nowrap}',
  'header.top .logo span{display:inline-block}',
  'header.top .logo b{font-weight:800;color:#7FA6FF}',
  'header.top .logo i{font-style:normal;color:#5B8CFF}',
  'header.top .logo small{margin:0!important;font:700 10px/1 "Plus Jakarta Sans",system-ui,sans-serif!important;letter-spacing:.14em;text-transform:uppercase;color:#C9D8FF!important;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);padding:5px 9px;border-radius:999px}',
  'header.top #title{max-width:340px;color:#fff!important;font-family:inherit!important;font-weight:700!important;font-size:15px!important;border-radius:10px!important;padding:9px 12px!important;position:relative}',
  'header.top #title:hover{background:rgba(255,255,255,.08)!important;border-color:rgba(255,255,255,.18)!important}',
  'header.top #title:focus{background:rgba(255,255,255,.12)!important;border-color:#8EB4FF!important;box-shadow:0 0 0 3px rgba(91,140,255,.3)}',
  'header.top .count{color:#B9C9F2!important;font-size:12.5px!important;font-weight:600;background:rgba(255,255,255,.08);padding:6px 12px;border-radius:999px;position:relative}',
  'header.top .btn{font-family:inherit!important;border-radius:11px!important;padding:10px 18px!important;font-weight:700!important;font-size:14px;position:relative;transition:transform .2s,box-shadow .2s,background .2s,border-color .2s}',
  'header.top .btn:not(.primary){background:rgba(255,255,255,.06)!important;color:#fff!important;border:1px solid rgba(255,255,255,.28)!important}',
  'header.top .btn:not(.primary):hover{background:rgba(255,255,255,.16)!important;border-color:rgba(255,255,255,.5)!important}',
  'header.top .btn.primary{background:#fff!important;color:#0A1745!important;border:1px solid #fff!important;box-shadow:0 10px 22px -10px rgba(0,0,0,.55)}',
  'header.top .btn.primary:hover{transform:translateY(-1px);background:#EAF1FF!important;box-shadow:0 14px 26px -10px rgba(0,0,0,.6)}',
  '@media print{header.top{display:none}}'
  ].join('\n');
  function boot(){
    if (!document.getElementById('jh-style')){ var s = document.createElement('style'); s.id = 'jh-style'; s.textContent = css; document.head.appendChild(s); }
    var l = document.querySelector('header.top .logo');
    if (l && !l.dataset.jh){ l.dataset.jh = 1; l.innerHTML = '<span>Ema<b>deck</b><i>.</i></span><small>Builder</small>'; l.setAttribute('aria-label','Emadeck Builder'); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
