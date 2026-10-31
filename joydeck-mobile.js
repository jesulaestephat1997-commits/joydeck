/* Emadeck - version telephone du builder (ecrans de moins de 820 px). Ne change rien sur ordinateur. */
(function(){
  var css = document.createElement('style');
  css.textContent = '@media(max-width:820px){' +
    'html,body{height:auto;min-height:100%}' +
    '#app{height:100dvh;padding-bottom:0}' +
    'header.top::before{display:none!important}' +
    'header.top{height:auto!important;min-height:68px;flex:none!important;flex-wrap:wrap!important;gap:8px 10px!important;padding:10px 14px!important}' +
    'header.top .spacer{display:none!important}' +
    'header.top .logo{flex:none}' +
    'header.top #title{max-width:none!important;min-width:0;font-size:15px!important}' +
    'header.top #title{order:1;flex:1 1 calc(100% - 255px)!important}' +
    '#jdLogout{order:1;flex:none!important;height:36px!important;padding:0 10px!important;margin:0!important;font-size:12px!important;border-radius:10px!important}' +
    '#emadeck-back{display:none!important}' +
    'header.top #exportBtn{flex:1.8 1 0!important}' +
    'header.top .btn,header.top>button{order:2;flex:1 1 0!important;min-width:0;padding:6px 4px!important;font-size:12px!important;line-height:1.15!important;min-height:40px;white-space:normal!important;text-align:center;margin:0!important}' +
    'main{flex-direction:column!important;padding-bottom:64px}' +
    'aside#lib{width:100%!important;border-right:0!important;flex:1;min-height:0;padding:16px 14px 30px!important}' +
    'section#book{flex:1;min-height:0;padding:16px 14px 90px!important}' +
    'body.jdm-lib section#book{display:none!important}' +
    'body.jdm-book aside#lib{display:none!important}' +
    '.book-head span{display:none}' +
    '#strip{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:20px 12px!important;padding:2px!important}' +
    '.pcard{cursor:default}' +
    '.pcard .thumb{width:160px!important;height:207px!important}' +
    '.pcard .thumb iframe{transform:scale(.196)!important}' +
    '.pcard .pbar .pname{display:none!important}' +
    '.pcard .pbar{width:160px;justify-content:space-between}' +
    '.pcard .editlabel{display:none!important}' +
    '#jds{gap:8px!important;padding:8px 10px!important}' +
    'body:not(.jdm-open) #jds>*:not(#jdUndo):not(#jdSel):not(#jdmTog){display:none!important}' +
    '#jds #jdUndo,#jds #jdSel{border-right:0!important;margin:0!important;padding-right:0!important}' +
    '#jds #jdSel .n{display:none}' +
    '#jds .count{display:none!important}' +
    '#jds #jdSel .more{gap:8px}' +
    '#jds select{max-width:100%!important;flex:1 1 140px}' +
    '#jds .dw{flex:1 1 100%!important}' +
    '#jdmTog{height:30px;padding:0 12px;border:1px solid #D5DCEE;border-radius:9px;background:#fff;color:#141B34;font:600 12.5px/1 "Plus Jakarta Sans",system-ui,sans-serif;white-space:nowrap}' +
    'body.jdm-open #jdmTog{background:#1F4FD8;border-color:#1F4FD8;color:#fff}' +
    '#jdmTabs{display:flex!important}' +
    'body.editing #jdmTabs{display:none!important}' +
    '#editor{overflow:auto;-webkit-overflow-scrolling:touch}' +
    '#editor .ebar{position:sticky;left:0;top:0;z-index:5;width:100vw;flex-wrap:wrap;padding:8px 12px!important}' +
    '#editor .ebar .count{display:none}' +
    '#editor iframe{flex:none!important;width:1180px!important;height:calc(100dvh - 60px)!important}' +
    '}' +
    '@media(max-width:360px){.pcard .thumb{width:140px!important;height:181px!important}.pcard .thumb iframe{transform:scale(.1716)!important}.pcard .pbar{width:140px}}' +
    '#jdmTabs{display:none;position:fixed;left:0;right:0;bottom:0;z-index:50;background:#fff;border-top:1px solid #E4E9F5;padding:8px 12px calc(8px + env(safe-area-inset-bottom));gap:8px;box-shadow:0 -8px 24px -16px rgba(11,27,77,.35)}' +
    '#jdmTabs button{flex:1;height:46px;border:0;border-radius:12px;background:#F2F5FD;color:#5C6684;font:700 14.5px "Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer}' +
    '#jdmTabs button.on{background:#1F4FD8;color:#fff}' +
    '@media(min-width:821px){#jdmTabs,#jdmTog{display:none!important}}' +
    '@media print{#jdmTabs{display:none!important}}';
  document.head.appendChild(css);
  function view(v){ document.body.classList.toggle('jdm-lib', v === 'lib'); document.body.classList.toggle('jdm-book', v === 'book');
    var t = document.getElementById('jdmTabs'); if (t) [].forEach.call(t.children, function(b){ b.classList.toggle('on', b.dataset.v === v); }); try { window.scrollTo(0, 0); } catch(e){} }
  function label(){ var c = document.getElementById('count'), b = document.querySelector('#jdmTabs [data-v="book"]'); if (b) b.textContent = 'My book' + (c && c.textContent.trim() ? ' (' + c.textContent.trim().split(' ')[0] + ')' : ''); }
  function boot(){
    var t = document.createElement('div'); t.id = 'jdmTabs';
    t.innerHTML = '<button type="button" data-v="lib">Library</button><button type="button" data-v="book">My book</button>';
    document.body.appendChild(t);
    t.addEventListener('click', function(e){ var b = e.target.closest('button'); if (b) view(b.dataset.v); });
    view('book'); label();
    var lg = document.querySelector('header.top .logo'); if (lg){ lg.style.cursor = 'pointer'; lg.addEventListener('click', function(){ if (innerWidth <= 820) location.href = 'index.html'; }); }
    var c = document.getElementById('count'); if (c) new MutationObserver(label).observe(c, {childList: true, characterData: true, subtree: true});
    var n = 0, w = setInterval(function(){
      var jds = document.getElementById('jds');
      if (jds && !document.getElementById('jdmTog')){
        var b = document.createElement('button'); b.type = 'button'; b.id = 'jdmTog'; b.textContent = 'Customize';
        b.addEventListener('click', function(){ document.body.classList.toggle('jdm-open'); });
        jds.appendChild(b); clearInterval(w);
      }
      if (++n > 80) clearInterval(w);
    }, 250);
    document.addEventListener('click', function(e){ if (e.target.closest && e.target.closest('.tcard .add')){ var bk = document.querySelector('#jdmTabs [data-v="book"]'); if (bk){ bk.style.transform = 'scale(1.06)'; setTimeout(function(){ bk.style.transform = ''; }, 350); } } }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
