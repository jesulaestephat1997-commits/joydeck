/* Emadeck - numerotation des pages (case a cocher dans la barre Style).
   - La couverture (code CV) n'est jamais numerotee.
   - Le numero suit la position dans le livre : si une page est deplacee, elle prend le numero de sa nouvelle place.
   - Option "After cover" : la couverture compte comme page 1, le sommaire est donc la page 2.
   - Option "From chapter 1" : les pages avant le premier chapitre n'ont pas de numero, le premier chapitre = 1.
   Ne modifie ni les pages, ni les modeles : le numero est ajoute a l'affichage et au PDF. */
(function(){
  'use strict';
  if (window.__jdNum) return; window.__jdNum = 1;
  var KEY = 'jdnum_state', NO_NUMBER = ['CV'];   // ajouter ici le code de la 4e de couverture plus tard
  var st = (function(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } })();
  st = { on: !!st.on, mode: st.mode === 'ch' ? 'ch' : 'cover' };
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){} }

  function codeOf(s){ var m = /(?:^|\/)([A-Za-z]+)-\d+[^\/?]*\.html/.exec(s || ''); return m ? m[1].toUpperCase() : ''; }
  function compute(codes){
    var out = [], first = -1, i;
    if (st.mode === 'ch') for (i = 0; i < codes.length; i++) if (codes[i] === 'CH') { first = i; break; }
    for (i = 0; i < codes.length; i++) {
      if (!st.on || NO_NUMBER.indexOf(codes[i]) >= 0) { out.push(null); continue; }
      if (st.mode === 'ch') out.push(first >= 0 && i >= first ? i - first + 1 : null);
      else out.push(i + 1);
    }
    return out;
  }
  function lum(c){ var m = /rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,\/]+([\d.]+))?/.exec(c || ''); if (!m) return 1; if (m[4] !== undefined && +m[4] === 0) return 1;
    return (0.2126 * m[1] + 0.7152 * m[2] + 0.0722 * m[3]) / 255; }

  function paint(f, n){
    try {
      var d = f.contentDocument; if (!d || !d.body) return;
      var href = ''; try { href = f.contentWindow.location.href; } catch(e){}
      if (!href || href === 'about:blank') return;
      var el = d.getElementById('jd-pagenum');
      if (n == null) { if (el) el.remove(); return; }
      var host = d.querySelector('.page') || d.body;
      if (el && el.parentNode !== host) { el.remove(); el = null; }
      if (!el) { el = d.createElement('div'); el.id = 'jd-pagenum'; host.appendChild(el); }
      var w = f.contentWindow, cs = w.getComputedStyle(d.body), dark = lum(cs.backgroundColor) < 0.4;
      var inPage = host !== d.body;
      if (inPage && w.getComputedStyle(host).position === 'static') host.style.position = 'relative';
      el.setAttribute('contenteditable', 'false');
      el.style.cssText = 'position:' + (inPage ? 'absolute' : 'fixed') + ';left:0;right:0;bottom:30px;text-align:center;z-index:2147483000;pointer-events:none;user-select:none;' +
        'font:600 13px/1 ' + (cs.fontFamily || 'sans-serif') + ';letter-spacing:.08em;color:' + (dark ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.55)');
      el.textContent = String(n);
    } catch(e){}
  }

  // ---- livre (barre des pages)
  function stripFrames(){ return [].slice.call(document.querySelectorAll('#strip .pcard')).map(function(c){ return c.querySelector('iframe'); }); }
  function stripCodes(){ return [].slice.call(document.querySelectorAll('#strip .pcard')).map(function(c){ var p = c.querySelector('.pname'); return (/^\s*([A-Za-z]+)/.exec(p ? p.textContent : '') || [,''])[1].toUpperCase(); }); }
  var tmr = 0;
  function refreshStrip(){ clearTimeout(tmr); tmr = setTimeout(function(){
    var nums = compute(stripCodes()); stripFrames().forEach(function(f, i){ if (f) paint(f, nums[i]); });
  }, 60); }
  function onStripFrameLoad(f){
    var cards = [].slice.call(document.querySelectorAll('#strip .pcard')), card = f.closest('.pcard'), i = cards.indexOf(card);
    if (i < 0) return; paint(f, compute(stripCodes())[i]);
  }

  // ---- export PDF (iframes temporaires dans #printRoot)
  function refreshPrint(){
    var root = document.getElementById('printRoot'); if (!root) return;
    var fr = [].slice.call(root.querySelectorAll('iframe'));
    var nums = compute(fr.map(function(f){ return codeOf(f.getAttribute('src') || f.src); }));
    fr.forEach(function(f, i){ paint(f, nums[i]); });
  }


  // ---- editeur d'une page (EDITOR_HOOK) : meme numero que dans le livre
  function paintEditor(){
    var f = document.getElementById('eFrame'), t = document.getElementById('eTitle'); if (!f || !t) return;
    var m = /Page\s+(\d+)\s*\//.exec(t.textContent || ''); if (!m) return;
    paint(f, compute(stripCodes())[+m[1] - 1]);
  }
  function watchEditor(){
    var f = document.getElementById('eFrame'); if (!f || f.__jdn) return; f.__jdn = 1;
    f.addEventListener('load', function(){ paintEditor(); setTimeout(paintEditor, 400); setTimeout(paintEditor, 1200); });
  }

  var seen = new WeakSet();
  function watch(f){
    if (seen.has(f)) return; seen.add(f);
    var inPrint = !!f.closest('#printRoot');
    var run = function(){ if (inPrint) { refreshPrint(); setTimeout(refreshPrint, 400); setTimeout(refreshPrint, 1200); } else { onStripFrameLoad(f); setTimeout(function(){ onStripFrameLoad(f); }, 600); } };
    f.addEventListener('load', run);
    try { if (f.contentDocument && f.contentDocument.readyState === 'complete' && f.contentDocument.body && (f.getAttribute('src') || '').indexOf('about:blank') < 0) run(); } catch(e){}
  }
  function scan(root){ (root.tagName === 'IFRAME' ? [root] : [].slice.call(root.querySelectorAll('iframe'))).forEach(function(f){ if (f.closest('#strip,#printRoot')) watch(f); }); }

  // ---- case a cocher dans la barre Style
  function mountUI(){
    var bar = document.getElementById('jds'); if (!bar || bar.querySelector('.jdn')) return !!bar;
    var css = document.createElement('style');
    css.textContent = '#jds .jdn{display:flex;align-items:center;gap:8px;padding:0 4px;border-left:1px solid #e6e1d8;margin-left:2px}' +
      '#jds .jdn label{display:flex;align-items:center;gap:7px;cursor:pointer;font-weight:600;white-space:nowrap}' +
      '#jds .jdn input[type=checkbox]{width:16px;height:16px;margin:0;accent-color:#1F4FD8;cursor:pointer}' +
      '#jds .jdn select{display:none}#jds .jdn.on select{display:block}';
    document.head.appendChild(css);
    var box = document.createElement('span'); box.className = 'jdn' + (st.on ? ' on' : '');
    box.innerHTML = '<label><input type="checkbox" id="jdnOn"' + (st.on ? ' checked' : '') + '> Page numbers</label>' +
      '<select id="jdnMode" title="Where numbering starts"><option value="cover">After cover</option><option value="ch">From chapter 1</option></select>';
    var anchor = bar.querySelector('#jdsO') || bar.querySelector('.st'); bar.insertBefore(box, anchor);
    var sel = box.querySelector('select'); sel.value = st.mode;
    box.querySelector('input').addEventListener('change', function(e){ st.on = e.target.checked; box.classList.toggle('on', st.on); save(); refreshStrip(); });
    sel.addEventListener('change', function(e){ st.mode = e.target.value; save(); refreshStrip(); });
    return true;
  }

  function boot(){
    var tries = 0, iv = setInterval(function(){ if (mountUI() || ++tries > 60) clearInterval(iv); }, 150);
    scan(document.body); watchEditor(); refreshStrip();
    new MutationObserver(function(ms){
      var strip = false;
      ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if (n.nodeType === 1) { scan(n); strip = true; } }); });
      if (strip) refreshStrip();
    }).observe(document.body, {childList:true, subtree:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
