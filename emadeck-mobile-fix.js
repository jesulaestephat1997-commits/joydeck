/* Emadeck - telephone : en-tete compact + menu, editeur fixe. Ne change rien sur ordinateur. */
(function(){
  var F = '"Plus Jakarta Sans",system-ui,sans-serif';
  var css = document.createElement('style');
  css.textContent =
    '#jdmMenuBtn,#jdmPanel,#jdmShade{display:none}' +
    '@media(max-width:820px){' +
      'html,body{overflow-x:hidden}' +
      'header.top{flex-wrap:nowrap!important;height:58px!important;min-height:58px!important;padding:0 12px!important;gap:10px!important;align-items:center!important;box-sizing:border-box;max-width:100vw}' +
      'header.top .logo{order:0;flex:none;font-size:21px!important}' +
      'header.top .logo small{display:none!important}' +
      'header.top .count{display:none!important}' +
      'header.top #title{order:1;flex:1 1 auto!important;min-width:0!important;max-width:none!important;font-size:15px!important}' +
      'header.top>button:not(#jdmMenuBtn){display:none!important}' +
      '#jdmMenuBtn{display:flex;order:2;flex:none;width:42px;height:42px;padding:0;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.32);border-radius:12px;background:rgba(255,255,255,.08);color:#fff;cursor:pointer}' +
      '#jdmShade{position:fixed;left:0;right:0;top:0;bottom:0;z-index:998;background:rgba(11,27,77,.45)}' +
      'body.jdm-menu #jdmShade{display:block}' +
      '#jdmPanel{position:fixed;left:12px;right:12px;top:66px;z-index:999;background:#fff;border-radius:18px;padding:10px;box-shadow:0 24px 48px -16px rgba(11,27,77,.55);flex-direction:column;gap:8px}' +
      'body.jdm-menu #jdmPanel{display:flex}' +
      '#jdmPanel button{display:flex!important;align-items:center;justify-content:flex-start;gap:10px;width:100%!important;height:50px!important;min-height:50px!important;flex:none!important;order:3;margin:0!important;padding:0 16px!important;border:1px solid #E4E9F5!important;border-radius:12px!important;background:#F6F8FE!important;color:#141B34!important;font:700 15px ' + F + '!important;white-space:nowrap!important;text-align:left}' +
      '#jdmPanel #exportBtn{order:0;justify-content:center;background:#1F4FD8!important;border-color:#1F4FD8!important;color:#fff!important}' +
      '#jdmPanel #jdManage{order:8}' +
      '#jdmPanel button svg{width:20px!important;height:20px!important;min-width:20px;flex:none}' +
      '#jdmPanel #jdLogout{order:9;margin-top:6px!important;background:#fff!important;color:#B42318!important}' +
      'body.editing{overflow:hidden}' +
      'body.editing #editor{position:fixed!important;left:0!important;right:0!important;top:58px!important;bottom:0!important;height:auto!important;width:auto!important;z-index:40;overflow:auto!important;background:#fff;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}' +
      'body.editing #editor .ebar{position:sticky;left:0;top:0;z-index:5;width:100vw;height:52px;box-sizing:border-box;flex-wrap:nowrap!important;gap:8px!important;padding:0 12px!important;align-items:center;overflow:hidden}' +
      'body.editing #editor .ebar #backBtn{flex:none;height:38px;padding:0 12px;font-size:13px}' +
      'body.editing #editor .ebar .ibtn{flex:none;width:36px;height:36px}' +
      'body.editing #editor .ebar #eTitle{flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:13px}' +
      'body.editing #editor iframe{width:1180px!important;height:calc(100dvh - 58px - 52px)!important}' +
      'body.editing #editor{overflow:hidden!important}' +
      'body.editing #editor iframe{width:100%!important}' +
    '}';
  document.head.appendChild(css);

  var moved = [];
  function openMenu(){
    var h = document.querySelector('header.top'), p = document.getElementById('jdmPanel');
    if (!h || !p) return;
    [].slice.call(h.children).forEach(function(el){
      if (el.tagName === 'BUTTON' && el.id !== 'jdmMenuBtn'){
        var ph = document.createComment('jdm'); h.replaceChild(ph, el); p.appendChild(el); moved.push([el, ph]);
      }
    });
    document.body.classList.add('jdm-menu');
  }
  function closeMenu(){
    moved.forEach(function(m){ if (m[1].parentNode) m[1].parentNode.replaceChild(m[0], m[1]); });
    moved = [];
    document.body.classList.remove('jdm-menu');
  }
  function boot(){
    var h = document.querySelector('header.top');
    if (!h || document.getElementById('jdmMenuBtn')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.id = 'jdmMenuBtn'; b.setAttribute('aria-label', 'Menu');
    b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    h.appendChild(b);
    var shade = document.createElement('div'); shade.id = 'jdmShade';
    var panel = document.createElement('div'); panel.id = 'jdmPanel';
    document.body.appendChild(shade); document.body.appendChild(panel);
    b.addEventListener('click', function(){ document.body.classList.contains('jdm-menu') ? closeMenu() : openMenu(); });
    shade.addEventListener('click', closeMenu);
    panel.addEventListener('click', function(e){ if (e.target.closest('button')) setTimeout(closeMenu, 0); });
    window.addEventListener('resize', function(){ if (innerWidth > 820) closeMenu(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
