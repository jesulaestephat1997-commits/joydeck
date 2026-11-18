(function(){
  var css = '@media(max-width:820px){' +
    'html,body{height:100%!important;overscroll-behavior:none!important}' +
    'body:not(.editing){position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100%!important;overflow:hidden!important}' +
    'body:not(.editing) header.top{position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:50!important}' +
    'body:not(.editing) section#book,body:not(.editing) aside#lib{position:fixed!important;top:58px!important;left:0!important;right:0!important;bottom:0!important;width:auto!important;height:auto!important;max-height:none!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch;padding-bottom:120px!important;box-sizing:border-box!important}' +
  '}';
  var s = document.createElement('style');
  s.id = 'jdmLockStyle';
  s.textContent = css;
  document.head.appendChild(s);
})();
