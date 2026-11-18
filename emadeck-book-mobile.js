/* Emadeck - telephone : le titre "Mon livre" ouvre le panneau Style (palette, polices...). Ne change rien sur ordinateur. */
(function(){
  if (window.innerWidth > 820) return;
  var FONT = '"Plus Jakarta Sans",system-ui,sans-serif';
  var css = document.createElement('style');
  css.textContent = [
    '@media(max-width:820px){',
    '#jdmTog{display:none!important}',
    '#jds{display:none!important}',
    'body.jdm-tools #jds{display:flex!important;flex-wrap:wrap;position:fixed!important;left:10px!important;right:10px!important;bottom:calc(84px + env(safe-area-inset-bottom))!important;max-height:46dvh;overflow-y:auto;overscroll-behavior:contain;z-index:60;margin:0!important;padding:0 14px 14px!important;background:#fff!important;border:1px solid #E4E9F5!important;border-radius:20px!important;box-shadow:0 22px 48px -18px rgba(11,27,77,.5)}',
    'body.jdm-tools section#book{padding-bottom:calc(46dvh + 110px)!important}',
    '.book-head{display:flex!important;align-items:center;justify-content:space-between;cursor:pointer}',
    '.jdm-bkbtn{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border:1px solid #D5DCEE;border-radius:18px;background:#fff;color:#141B34;font:700 13px ' + FONT + '}',
    '.jdm-bkbtn svg{width:14px;height:14px;transition:transform .2s}',
    'body.jdm-tools .jdm-bkbtn{background:#1F4FD8;border-color:#1F4FD8;color:#fff}',
    'body.jdm-tools .jdm-bkbtn svg{transform:rotate(180deg)}',
    '.jdm-bk-head{flex:1 1 100%;order:-1;position:sticky;top:0;z-index:3;display:flex;align-items:center;justify-content:space-between;padding:14px 0 8px;background:#fff}',
    '.jdm-bk-head b{font:700 15px ' + FONT + ';color:#0B1B4D}',
    '.jdm-bk-head button{border:0;background:none;padding:4px 0;color:#1F4FD8;font:700 14px ' + FONT + '}',
    '}'
  ].join('');
  document.head.appendChild(css);

  function toggle(open){
    document.body.classList.toggle('jdm-tools', open);
    document.body.classList.toggle('jdm-open', open);
  }
  function boot(){
    var head = document.querySelector('.book-head');
    if (head && !head.querySelector('.jdm-bkbtn')){
      var b = document.createElement('button'); b.type = 'button'; b.className = 'jdm-bkbtn';
      b.innerHTML = 'Style<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
      head.appendChild(b);
      head.addEventListener('click', function(){ toggle(!document.body.classList.contains('jdm-tools')); });
    }
    var n = 0, w = setInterval(function(){
      var j = document.getElementById('jds');
      if (j && !j.querySelector('.jdm-bk-head')){
        var h = document.createElement('div'); h.className = 'jdm-bk-head';
        h.innerHTML = '<b>Style du livre</b><button type="button">Terminé</button>';
        h.querySelector('button').addEventListener('click', function(e){ e.stopPropagation(); toggle(false); });
        j.insertBefore(h, j.firstChild);
        clearInterval(w);
      }
      if (++n > 80) clearInterval(w);
    }, 250);
    document.addEventListener('click', function(e){ if (e.target.closest && e.target.closest('#jdmTabs')) toggle(false); }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
