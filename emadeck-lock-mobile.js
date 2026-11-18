(function(){
  var css = '@media(max-width:820px){' +
    'html,body{height:100%!important;overscroll-behavior:none!important}' +
    'body:not(.editing){position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100%!important;overflow:hidden!important}' +
    'body:not(.editing) header.top{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:50!important}' +
    'body:not(.editing) section#book,body:not(.editing) aside#lib{position:fixed!important;top:58px!important;left:0!important;right:0!important;bottom:calc(76px + env(safe-area-inset-bottom))!important;width:auto!important;height:auto!important;min-height:0!important;max-height:none!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch;padding-bottom:14px!important;margin-bottom:0!important;box-sizing:border-box!important}' +
    'body:not(.editing) aside#lib>*:last-child,body:not(.editing) section#book>*:last-child{margin-bottom:0!important;padding-bottom:0!important}' +
    'body.jdm-tools:not(.editing) section#book{padding-bottom:46dvh!important}' +
  '}';
  var s = document.getElementById('jdmLockStyle') || document.createElement('style');
  s.id = 'jdmLockStyle';
  s.textContent = css;
  if (!s.parentNode) document.head.appendChild(s);
})();
