(function(){
  var css = '@media screen and (max-width:820px){' +
    '#projPanel{z-index:3000!important;position:fixed!important;top:70px!important;left:12px!important;right:12px!important;width:auto!important;max-width:none!important;max-height:calc(100vh - 96px)!important;max-height:calc(100dvh - 96px)!important;overflow:auto!important;-webkit-overflow-scrolling:touch;border-radius:18px!important;padding:14px!important}' +
    '#projPanel.on{display:block!important}' +
    '#projPanel h4{font-size:13px!important}' +
    '#projEmpty{font-size:15px!important;padding:26px 12px!important}' +
    '#projPanel .pa button{min-width:42px!important;min-height:42px!important;touch-action:manipulation}' +
    '#projPanel .pj{touch-action:manipulation}' +
  '}';
  var s = document.createElement('style');
  s.id = 'jdmProjStyle';
  s.textContent = css;
  document.head.appendChild(s);
})();

(function(){
  document.addEventListener('click', function(e){
    var p = document.getElementById('projPanel');
    if (!p || !p.contains(e.target)) return;
    if (!e.target.closest('.pi, .pt')) return;
    setTimeout(function(){
      var sh = document.getElementById('jdmShade');
      if (sh) sh.click();
      p.classList.remove('on');
      window.scrollTo(0, 0);
    }, 120);
  }, true);
})();
