/* Emadeck - Undo / Redo dans la barre de personnalisation.
   Memorise les etats du projet (pages, titre, style, numerotation, signature) et les restaure. */
(function(){
  var KEYS = ['joydeckbuilder_project','emadeck_projects','emadeck_current','jdnum_state','jdsig_state','jdstyle_theme','jdstyle_orig','jdstyle_pages'];
  var MAX = 25, DB = 'emadeck_undo', ST = 'h';
  var list = [], idx = -1, timer = null, busy = false, quiet = true, ready = false;
  var nat = Storage.prototype.setItem;
  try { var fr = document.createElement('iframe'); fr.style.display = 'none'; document.documentElement.appendChild(fr); nat = fr.contentWindow.Storage.prototype.setItem; } catch(e){}

  function snap(){ var o = {}; KEYS.forEach(function(k){ try { o[k] = localStorage.getItem(k); } catch(e){ o[k] = null; } }); return JSON.stringify(o); }
  function idb(cb){ try { var r = indexedDB.open(DB, 1); r.onupgradeneeded = function(){ r.result.createObjectStore(ST); }; r.onsuccess = function(){ cb(r.result); }; r.onerror = function(){ cb(null); }; } catch(e){ cb(null); } }
  function save(){ idb(function(db){ if (!db) return; try { db.transaction(ST, 'readwrite').objectStore(ST).put({list: list, idx: idx}, 'k'); } catch(e){} }); }
  function load(cb){ idb(function(db){ if (!db) return cb(null); try { var q = db.transaction(ST).objectStore(ST).get('k'); q.onsuccess = function(){ cb(q.result || null); }; q.onerror = function(){ cb(null); }; } catch(e){ cb(null); } }); }

  function capture(){
    if (!ready || quiet || busy) return;
    var s = snap(); if (list[idx] === s) return;
    list = list.slice(0, idx + 1); list.push(s);
    if (list.length > MAX) list.shift();
    idx = list.length - 1; save(); paint();
  }
  Storage.prototype.setItem = function(k, v){
    if (busy && KEYS.indexOf(k) > -1) return;
    var r = nat.apply(this, arguments);
    if (this === localStorage && KEYS.indexOf(k) > -1){ clearTimeout(timer); timer = setTimeout(capture, 600); }
    return r;
  };

  function restore(i){
    if (i < 0 || i >= list.length) return;
    clearTimeout(timer); idx = i; busy = true;
    var o = JSON.parse(list[i]);
    KEYS.forEach(function(k){ try { if (o[k] === null || o[k] === undefined) localStorage.removeItem(k); else nat.call(localStorage, k, o[k]); } catch(e){} });
    try { sessionStorage.setItem('jdundo_r', '1'); } catch(e){}
    idb(function(db){
      if (!db) return location.reload();
      try { var t = db.transaction(ST, 'readwrite'); t.objectStore(ST).put({list: list, idx: idx}, 'k'); t.oncomplete = function(){ location.reload(); }; t.onerror = function(){ location.reload(); }; } catch(e){ location.reload(); }
    });
  }
  function undo(){ if (idx > 0) restore(idx - 1); }
  function redo(){ if (idx < list.length - 1) restore(idx + 1); }

  var box, bu, br;
  var AR = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
  function paint(){ if (!bu) return; bu.disabled = !(idx > 0); br.disabled = !(idx < list.length - 1); }
  function build(){
    var bar = document.getElementById('jds'); if (!bar) return false;
    if (document.getElementById('jdUndo')) return true;
    var st = document.createElement('style');
    st.textContent = '#jdUndo{display:flex;align-items:center;gap:6px;margin:0 6px 0 4px;padding-right:8px;border-right:1px solid #e6e1d8}' +
      '#jdUndo button{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px;border:1px solid #D5DCEE;border-radius:9px;background:#fff;color:#141B34;font:600 12.5px/1 "Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer;white-space:nowrap;transition:.15s}' +
      '#jdUndo button:hover:not(:disabled){border-color:#1F4FD8;color:#1F4FD8;background:#EEF3FF}' +
      '#jdUndo button:disabled{opacity:.4;cursor:default}';
    document.head.appendChild(st);
    box = document.createElement('div'); box.id = 'jdUndo';
    box.innerHTML = '<button type="button" id="jdUndoB" title="Undo (Ctrl+Z)">' + AR + '<path d="M6 4L2.5 7.5 6 11"/><path d="M3 7.5h6.5a4 4 0 010 8H8"/></svg>Undo</button><button type="button" id="jdRedoB" title="Redo (Ctrl+Y)">Redo' + AR + '<path d="M10 4l3.5 3.5L10 11"/><path d="M13 7.5H6.5a4 4 0 000 8H8"/></svg></button>';
    var c = bar.querySelector('.count');
    bar.insertBefore(box, c ? c.nextSibling : bar.firstChild);
    bu = box.querySelector('#jdUndoB'); br = box.querySelector('#jdRedoB');
    bu.addEventListener('click', undo); br.addEventListener('click', redo);
    paint(); return true;
  }
  document.addEventListener('keydown', function(e){
    if (!(e.ctrlKey || e.metaKey)) return;
    var t = e.target, tag = t && t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
    var k = (e.key || '').toLowerCase();
    if (k === 'z' && !e.shiftKey){ e.preventDefault(); undo(); }
    else if (k === 'y' || (k === 'z' && e.shiftKey)){ e.preventDefault(); redo(); }
  });

  function boot(){
    var restoring = false; try { restoring = sessionStorage.getItem('jdundo_r') === '1'; sessionStorage.removeItem('jdundo_r'); } catch(e){}
    function go(){ ready = true; setTimeout(function(){ quiet = false; }, restoring ? 3000 : 1500); var n = 0, t = setInterval(function(){ if (build() || ++n > 80) clearInterval(t); }, 250); }
    if (restoring) load(function(d){ if (d && d.list && d.list.length){ list = d.list; idx = Math.min(d.idx, list.length - 1); } else { list = [snap()]; idx = 0; } go(); });
    else { setTimeout(function(){ list = [snap()]; idx = 0; save(); go(); }, 1200); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
