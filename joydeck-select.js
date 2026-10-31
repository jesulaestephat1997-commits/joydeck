/* Emadeck - Selection de pages : cocher certaines pages (ou toutes) puis supprimer
   ou changer palette / typos uniquement pour ces pages. */
(function(){
  var sel = {}, mode = false, bar = null;
  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return [].slice.call((r || document).querySelectorAll(s)); }
  var strip = function(){ return document.getElementById('strip'); };
  function cards(){ var s = strip(); return s ? $$('.pcard', s) : []; }
  function slotOf(card){
    var f = $('iframe', card); if (!f) return null;
    var src = f.dataset.jdcur || f.getAttribute('src') || '';
    var m = src.match(/[?&]slot=([^&]+)/); return m ? m[1] : null;
  }
  function ids(){ return Object.keys(sel).filter(function(k){ return sel[k]; }); }
  window.__jdsScope = function(){
    if (!mode) return [];
    var cs = cards(), out = [];
    cs.forEach(function(c){ if (sel[c.dataset.id]){ var s = slotOf(c); if (s) out.push(s); } });
    return out.length === cs.length ? [] : out;
  };
  var css = document.createElement('style');
  css.textContent =
    '#jdSel{display:flex;align-items:center;gap:8px;margin:0 6px 0 2px;padding-right:8px;border-right:1px solid #e6e1d8;font:600 12.5px/1 "Plus Jakarta Sans",system-ui,sans-serif;color:#141B34}' +
    '#jdSel button{height:30px;padding:0 12px;border:1px solid #D5DCEE;border-radius:9px;background:#fff;color:#141B34;font:inherit;cursor:pointer;white-space:nowrap;transition:.15s}' +
    '#jdSel button:hover:not(:disabled){border-color:#1F4FD8;color:#1F4FD8;background:#EEF3FF}' +
    '#jdSel button.on{background:#1F4FD8;border-color:#1F4FD8;color:#fff}' +
    '#jdSel button.dng{color:#C0392B;border-color:#F0CFCB}#jdSel button.dng:hover:not(:disabled){background:#FDF1EF;border-color:#C0392B;color:#C0392B}' +
    '#jdSel button:disabled{opacity:.4;cursor:default}' +
    '#jdSel .more{display:none;align-items:center;gap:10px}#jdSel.on .more{display:flex}' +
    '#jdSel label{display:flex;align-items:center;gap:7px;cursor:pointer;white-space:nowrap}' +
    '#jdSel input{width:16px;height:16px;margin:0;accent-color:#1F4FD8;cursor:pointer}' +
    '#jdSel .n{color:#5C6684;font-weight:600;white-space:nowrap}' +
    '.jdck{position:absolute;top:8px;right:8px;z-index:6;width:26px;height:26px;border-radius:50%;border:2px solid #fff;background:rgba(20,27,52,.35);box-shadow:0 2px 8px rgba(0,0,0,.3);cursor:pointer;display:none;place-items:center;padding:0;transition:.15s}' +
    '.jdsm .jdck{display:grid}' +
    '.jdck svg{width:14px;height:14px;stroke:#fff;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;opacity:0}' +
    '.pcard.jdsel .jdck{background:#1F4FD8}.pcard.jdsel .jdck svg{opacity:1}' +
    '.pcard.jdsel .thumb{box-shadow:0 0 0 3px #1F4FD8,0 4px 14px rgba(0,0,0,.2)}' +
    '.jdsm .pcard{cursor:pointer}.jdsm .pcard .editlabel{display:none}' +
    '@media print{.jdck{display:none!important}}';
  document.head.appendChild(css);

  function sync(){
    var cs = cards(), alive = {};
    cs.forEach(function(c){
      alive[c.dataset.id] = 1;
      if (!$('.jdck', c)){
        var b = document.createElement('button'); b.type = 'button'; b.className = 'jdck'; b.setAttribute('aria-label', 'Select page');
        b.innerHTML = '<svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7"/></svg>';
        c.appendChild(b);
      }
      c.classList.toggle('jdsel', !!sel[c.dataset.id]);
    });
    Object.keys(sel).forEach(function(k){ if (!alive[k]) delete sel[k]; });
    var s = strip(); if (s) s.classList.toggle('jdsm', mode);
    var n = ids().length, tot = cs.length;
    if (bar){
      var all = $('#jdAll', bar); all.checked = tot > 0 && n === tot; all.indeterminate = n > 0 && n < tot; all.disabled = !tot;
      $('#jdSelN', bar).textContent = n ? (n + ' selected' + (n < tot ? ' - style changes apply to these pages only' : '')) : 'Choose pages, or tick All';
      $('#jdSelDel', bar).disabled = !n;
      bar.classList.toggle('on', mode); $('#jdSelB', bar).classList.toggle('on', mode); $('#jdSelB', bar).textContent = mode ? 'Done' : 'Select';
    }
  }
  function toggle(id){ sel[id] = !sel[id]; sync(); }
  function setMode(on){ mode = on; if (!on) sel = {}; sync(); }

  document.addEventListener('click', function(e){
    if (!mode) return;
    var s = strip(); if (!s || !s.contains(e.target)) return;
    var card = e.target.closest('.pcard'); if (!card) return;
    if (e.target.closest('.pbar')) return;
    e.preventDefault(); e.stopImmediatePropagation(); toggle(card.dataset.id);
  }, true);

  function build(){
    var jds = document.getElementById('jds'); if (!jds) return false;
    if (document.getElementById('jdSel')) return true;
    bar = document.createElement('div'); bar.id = 'jdSel';
    bar.innerHTML = '<button type="button" id="jdSelB">Select</button><span class="more"><label><input type="checkbox" id="jdAll"> All</label><span class="n" id="jdSelN"></span><button type="button" class="dng" id="jdSelDel">Delete</button></span>';
    var u = document.getElementById('jdUndo'), c = $('.count', jds);
    var ref = u ? u.nextSibling : (c ? c.nextSibling : jds.firstChild);
    jds.insertBefore(bar, ref);
    $('#jdSelB', bar).addEventListener('click', function(){ setMode(!mode); });
    $('#jdAll', bar).addEventListener('change', function(){ var on = this.checked; sel = {}; if (on) cards().forEach(function(c){ sel[c.dataset.id] = true; }); sync(); });
    $('#jdSelDel', bar).addEventListener('click', function(){
      var list = ids(); if (!list.length) return;
      if (!window.confirm('Delete ' + list.length + ' page' + (list.length > 1 ? 's' : '') + '?')) return;
      var oc = window.confirm; window.confirm = function(){ return true; };
      try { list.forEach(function(id){ var b = $('.pcard[data-id="' + id + '"] [data-a="del"]', strip()); if (b) b.click(); }); } finally { window.confirm = oc; }
      sel = {}; sync();
    });
    sync(); return true;
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.jdck'); if (!b) return;
    e.preventDefault(); e.stopPropagation(); toggle(b.parentNode.dataset.id);
  }, true);

  function boot(){
    var n = 0, t = setInterval(function(){ if (build() || ++n > 80) clearInterval(t); }, 250);
    var s = strip(); var target = s || document.body;
    new MutationObserver(function(){ clearTimeout(boot.t); boot.t = setTimeout(sync, 60); }).observe(target, {childList: true, subtree: !s});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
