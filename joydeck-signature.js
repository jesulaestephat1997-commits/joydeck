/* Emadeck - signature sur les pages (case a cocher + texte dans la barre Style).
   Ajoute un petit texte (nom, marque, site...) en bas de chaque page : dans le livre, dans l'editeur et dans le PDF.
   Le texte n'est pas enregistre dans les pages : on peut le changer ou le retirer a tout moment. */
(function(){
  'use strict';
  if (window.__jdSig) return; window.__jdSig = 1;
  var KEY = 'jdsig_state';
  var st = (function(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){ return {}; } })();
  st = { on: !!st.on, text: typeof st.text === 'string' ? st.text.slice(0, 80) : '', pos: ['left','center','right'].indexOf(st.pos) >= 0 ? st.pos : 'left', skip: !!st.skip };
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){} }
  function codeOf(s){ var m = /(?:^|\/)([A-Za-z]+)-\d+[^\/?]*\.html/.exec(s || ''); return m ? m[1].toUpperCase() : ''; }
  function lum(c){ var m = /rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,\/]+([\d.]+))?/.exec(c || ''); if (!m) return 1; if (m[4] !== undefined && +m[4] === 0) return 1;
    return (0.2126 * m[1] + 0.7152 * m[2] + 0.0722 * m[3]) / 255; }
  function wanted(code){ return st.on && st.text.trim() && !(st.skip && code === 'CV'); }

  function paint(f, code){
    try {
      var d = f.contentDocument; if (!d || !d.body) return;
      var href = ''; try { href = f.contentWindow.location.href; } catch(e){}
      if (!href || href === 'about:blank') return;
      var el = d.getElementById('jd-sig');
      if (!wanted(code)) { if (el) el.remove(); return; }
      var host = d.querySelector('.page') || d.body;
      if (el && el.parentNode !== host) { el.remove(); el = null; }
      if (!el) { el = d.createElement('div'); el.id = 'jd-sig'; host.appendChild(el); }
      var w = f.contentWindow, cs = w.getComputedStyle(d.body), dark = lum(cs.backgroundColor) < 0.4, inPage = host !== d.body;
      if (inPage && w.getComputedStyle(host).position === 'static') host.style.position = 'relative';
      var side = st.pos === 'center' ? 'left:0;right:0;text-align:center;' : (st.pos === 'right' ? 'right:56px;text-align:right;' : 'left:56px;text-align:left;');
      el.setAttribute('contenteditable', 'false');
      el.style.cssText = 'position:' + (inPage ? 'absolute' : 'fixed') + ';' + side + 'bottom:30px;max-width:340px;z-index:2147483000;pointer-events:none;user-select:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;' +
        'font:600 11px/1 ' + (cs.fontFamily || 'sans-serif') + ';letter-spacing:.06em;color:' + (dark ? 'rgba(255,255,255,.75)' : 'rgba(0,0,0,.5)');
      el.textContent = st.text.trim();
    } catch(e){}
  }

  function cards(){ return [].slice.call(document.querySelectorAll('#strip .pcard')); }
  function cardCode(c){ var p = c.querySelector('.pname'); return (/^\s*([A-Za-z]+)/.exec(p ? p.textContent : '') || [,''])[1].toUpperCase(); }
  var tmr = 0;
  function refreshStrip(){ clearTimeout(tmr); tmr = setTimeout(function(){ cards().forEach(function(c){ var f = c.querySelector('iframe'); if (f) paint(f, cardCode(c)); }); paintEditor(); }, 80); }
  function paintEditor(){
    var f = document.getElementById('eFrame'), t = document.getElementById('eTitle'); if (!f || !t) return;
    var m = /\u2014\s*([A-Za-z]+)-/.exec(t.textContent || ''); paint(f, m ? m[1].toUpperCase() : '');
  }
  function refreshPrint(){
    var root = document.getElementById('printRoot'); if (!root) return;
    [].slice.call(root.querySelectorAll('iframe')).forEach(function(f){ paint(f, codeOf(f.getAttribute('src') || f.src)); });
  }

  var seen = new WeakSet();
  function watch(f){
    if (seen.has(f)) return; seen.add(f);
    var inPrint = !!f.closest('#printRoot');
    var run = function(){
      if (inPrint) paint(f, codeOf(f.getAttribute('src') || f.src));
      else { var c = f.closest('.pcard'); if (c) paint(f, cardCode(c)); }
    };
    f.addEventListener('load', function(){ run(); setTimeout(run, 500); setTimeout(run, 1400); });
    try { if (f.contentDocument && f.contentDocument.readyState === 'complete' && (f.getAttribute('src') || '').indexOf('about:blank') < 0) run(); } catch(e){}
  }
  function scan(root){ (root.tagName === 'IFRAME' ? [root] : [].slice.call(root.querySelectorAll('iframe'))).forEach(function(f){ if (f.closest('#strip,#printRoot')) watch(f); }); }

  function mountUI(){
    var bar = document.getElementById('jds'); if (!bar || bar.querySelector('.jdg')) return !!bar;
    var css = document.createElement('style');
    css.textContent = '#jds .jdg{display:flex;align-items:center;gap:8px;padding:0 4px;border-left:1px solid #e6e1d8;margin-left:2px;flex-wrap:wrap}' +
      '#jds .jdg label.m{display:flex;align-items:center;gap:7px;cursor:pointer;font-weight:600;white-space:nowrap}' +
      '#jds .jdg input[type=checkbox]{width:16px;height:16px;margin:0;accent-color:#1F4FD8;cursor:pointer}' +
      '#jds .jdg .more{display:none;align-items:center;gap:8px}#jds .jdg.on .more{display:flex}' +
      '#jds .jdg input[type=text]{border:1px solid #d9d4c9;border-radius:8px;padding:6px 9px;font:inherit;width:170px;background:#fff}' +
      '#jds .jdg input[type=text]:focus{outline:none;border-color:#1F4FD8;box-shadow:0 0 0 3px rgba(31,79,216,.15)}' +
      '#jds .jdg .sk{display:flex;align-items:center;gap:5px;font-size:12px;color:#6b6f68;white-space:nowrap;cursor:pointer}';
    document.head.appendChild(css);
    var box = document.createElement('span'); box.className = 'jdg' + (st.on ? ' on' : '');
    box.innerHTML = '<label class="m"><input type="checkbox" id="jdgOn"' + (st.on ? ' checked' : '') + '> Signature</label>' +
      '<span class="more"><input type="text" id="jdgText" maxlength="80" placeholder="Your name or brand" aria-label="Signature text">' +
      '<select id="jdgPos" title="Position"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select>' +
      '<label class="sk"><input type="checkbox" id="jdgSkip"' + (st.skip ? ' checked' : '') + '> Skip cover</label></span>';
    var anchor = bar.querySelector('#jdsO') || bar.querySelector('.st'); bar.insertBefore(box, anchor);
    var tx = box.querySelector('#jdgText'); tx.value = st.text; box.querySelector('#jdgPos').value = st.pos;
    box.querySelector('#jdgOn').addEventListener('change', function(e){ st.on = e.target.checked; box.classList.toggle('on', st.on); save(); refreshStrip(); if (st.on) setTimeout(function(){ tx.focus(); }, 50); });
    var ti = 0; tx.addEventListener('input', function(){ st.text = tx.value; save(); clearTimeout(ti); ti = setTimeout(refreshStrip, 250); });
    box.querySelector('#jdgPos').addEventListener('change', function(e){ st.pos = e.target.value; save(); refreshStrip(); });
    box.querySelector('#jdgSkip').addEventListener('change', function(e){ st.skip = e.target.checked; save(); refreshStrip(); });
    return true;
  }

  function boot(){
    var tries = 0, iv = setInterval(function(){ if (mountUI() || ++tries > 60) clearInterval(iv); }, 150);
    scan(document.body); refreshStrip();
    var ef = document.getElementById('eFrame');
    if (ef && !ef.__jdg) { ef.__jdg = 1; ef.addEventListener('load', function(){ paintEditor(); setTimeout(paintEditor, 400); setTimeout(paintEditor, 1200); }); }
    new MutationObserver(function(ms){
      var add = false; ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if (n.nodeType === 1) { scan(n); add = true; } }); });
      if (add) refreshStrip();
    }).observe(document.body, {childList:true, subtree:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
