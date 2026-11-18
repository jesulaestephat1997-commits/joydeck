/* Emadeck - correctif telephone : en-tete du builder (boutons qui debordaient). Ne change rien sur ordinateur. */
(function(){
  var css = document.createElement('style');
  css.textContent = '@media(max-width:820px){' +
    'html,body{overflow-x:hidden}' +
    'header.top{max-width:100vw;box-sizing:border-box}' +
    'header.top>button:not(#jdLogout){flex:1 1 40%!important;min-width:0!important;max-width:100%;box-sizing:border-box;height:auto!important;min-height:44px;padding:8px 10px!important;font-size:13px!important;line-height:1.2!important;white-space:normal!important;overflow-wrap:anywhere;text-align:center}' +
    'header.top>button#jdManage{order:2!important}' +
    'header.top>button#exportBtn{order:3!important;flex:1 1 100%!important;min-height:48px;font-size:14px!important}' +
    '}';
  document.head.appendChild(css);
})();
