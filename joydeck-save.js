/* Emadeck - bouton Save + indicateur "Saved" dans l'en-tete.
   La sauvegarde automatique reste active ; le bouton sert a rassurer : il force l'enregistrement,
   affiche une petite notification et fait vibrer le bouton "My projects" pendant ~2,5 secondes. */
(function(){
  'use strict';
  if (window.__jdSave) return; window.__jdSave = 1;
  var last = 0, tick = 0, status = null, toastT = 0;

  var css = document.createElement('style');
  css.textContent =
    '#jdSaved{position:relative;font:600 12px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#B9C9F2;display:flex;align-items:center;gap:6px;white-space:nowrap}' +
    '#jdSaved i{width:7px;height:7px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 3px rgba(74,222,128,.18)}' +
    'header.top #jdSaveBtn{display:inline-flex;align-items:center;gap:8px}' +
    'header.top #jdSaveBtn svg{width:15px;height:15px}' +
    '@keyframes jdRing{0%{box-shadow:0 0 0 0 rgba(142,180,255,.85)}70%{box-shadow:0 0 0 14px rgba(142,180,255,0)}100%{box-shadow:0 0 0 0 rgba(142,180,255,0)}}' +
    '@keyframes jdWob{0%,100%{transform:none}15%{transform:translateY(-3px) scale(1.06)}30%{transform:translateY(0) scale(1)}45%{transform:translateY(-2px) scale(1.04)}60%{transform:none}}' +
    'header.top #projBtn.jd-hit{animation:jdRing .9s ease-out 3,jdWob 1.1s ease-in-out 2;background:rgba(142,180,255,.28)!important;border-color:#8EB4FF!important}' +
    '#jdToast{position:fixed;top:78px;right:24px;z-index:100;display:flex;align-items:center;gap:10px;background:#fff;color:#0B1B4D;border:1px solid #dfe5f3;border-radius:14px;padding:11px 16px 11px 12px;font:700 13.5px/1.2 "Plus Jakarta Sans",system-ui,sans-serif;box-shadow:0 20px 40px -16px rgba(10,23,69,.5);opacity:0;transform:translateY(-10px) scale(.96);pointer-events:none;transition:opacity .25s,transform .35s cubic-bezier(.2,.8,.2,1)}' +
    '#jdToast.on{opacity:1;transform:none}' +
    '#jdToast .ck{width:24px;height:24px;border-radius:50%;background:#1F4FD8;display:grid;place-items:center;flex:none}' +
    '#jdToast .ck svg{width:13px;height:13px}' +
    '@media(prefers-reduced-motion:reduce){header.top #projBtn.jd-hit{animation:none}}' +
    '@media print{#jdToast,#jdSaved{display:none}}';
  document.head.appendChild(css);

  var CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3.2L13 4.8"/></svg>';
  var toast = document.createElement('div'); toast.id = 'jdToast'; toast.setAttribute('role', 'status');
  toast.innerHTML = '<span class="ck">' + CHECK + '</span><span>Saved to My projects</span>';
  document.body.appendChild(toast);

  function ago(){
    if (!last) return 'Saved';
    var s = Math.round((Date.now() - last) / 1000);
    if (s < 10) return 'Saved just now'; if (s < 60) return 'Saved ' + s + ' s ago';
    var m = Math.round(s / 60); if (m < 60) return 'Saved ' + m + ' min ago';
    return 'Saved ' + Math.round(m / 60) + ' h ago';
  }
  function paintStatus(){ if (status) status.lastChild.textContent = ago(); }

  // on detecte les sauvegardes automatiques du builder (ecritures de la cle emadeck_current)
  try {
    var orig = Storage.prototype.setItem;
    Storage.prototype.setItem = function(k, v){
      var r = orig.apply(this, arguments);
      try { if (k === 'emadeck_current') { last = Date.now(); paintStatus(); } } catch(e){}
      return r;
    };
  } catch(e){}

  function flash(){
    var pb = document.getElementById('projBtn');
    toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function(){ toast.classList.remove('on'); }, 2800);
    if (pb) { pb.classList.remove('jd-hit'); void pb.offsetWidth; pb.classList.add('jd-hit'); setTimeout(function(){ pb.classList.remove('jd-hit'); }, 2800); }
  }
  function save(){
    var t = document.getElementById('title');
    if (t) t.dispatchEvent(new Event('input', {bubbles: true}));   // declenche l'enregistrement du builder
    last = Date.now(); paintStatus(); flash();
  }

  function mount(){
    var top = document.querySelector('header.top'); if (!top) return false;
    if (document.getElementById('jdSaveBtn')) return true;
    var anchor = document.getElementById('projBtn') || document.getElementById('resetBtn'); if (!anchor) return false;
    var b = document.createElement('button'); b.className = 'btn'; b.id = 'jdSaveBtn'; b.type = 'button';
    b.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2.5h8l2.5 2.5v8.5a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"/><path d="M5 2.5v3.5h5V2.5M5 14V9.5h6V14"/></svg><span>Save</span>';
    b.addEventListener('click', save);
    anchor.parentNode.insertBefore(b, anchor);
    status = document.createElement('span'); status.id = 'jdSaved'; status.innerHTML = '<i></i><span>Saved</span>';
    var count = document.getElementById('count'); if (count && count.parentNode) count.parentNode.insertBefore(status, count.nextSibling);
    last = Date.now(); paintStatus();
    clearInterval(tick); tick = setInterval(paintStatus, 20000);
    return true;
  }
  var tries = 0, iv = setInterval(function(){ if (mount() || ++tries > 60) clearInterval(iv); }, 120);
})();
