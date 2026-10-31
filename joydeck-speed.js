/* JoyDeck — démarrage rapide du builder
   Au lieu de charger des centaines de pages en même temps (bibliothèque + livre), on charge seulement
   celles qu'on voit à l'écran, quelques-unes à la fois. Aucun changement sur les pages elles-mêmes. */
(function(){
  'use strict'; function jdGo(f,u){f.dataset.jdcur=(u==="about:blank")?"":u;try{f.contentWindow.location.replace(new URL(u,document.baseURI).href)}catch(e){f.src=u}if(u==="about:blank")f.setAttribute("src","about:blank")}
  if (window.__jdSpeed) return; window.__jdSpeed = 1;
  var MAX = 3, active = 0, queue = [];
  function pump(){
    while (active < MAX && queue.length) {
      var f = queue.shift(); if (!f.isConnected || !f.dataset.jdsrc) continue;
      active++;
      (function(f){
        var done = false, fin = function(){ if (done) return; done = true; active--; pump(); };
        f.addEventListener('load', fin, {once:true}); setTimeout(fin, 6000);
        jdGo(f, f.dataset.jdsrc); f.removeAttribute('data-jdsrc');
      })(f);
    }
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return; var f = e.target; io.unobserve(f);
      if (!f.dataset.jdsrc) return;
      if (f.closest('#strip')) queue.unshift(f); else queue.push(f);      // le livre passe avant la bibliothèque
    });
    pump();
  }, {rootMargin:'250px'});
  function thumb(f, s){            // miniature = image légère déjà fabriquée (dossier thumbs) ; sinon on charge la vraie page
    var file = s.split('?')[0], img = new Image();
    img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.draggable = false;
    img.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover;background:#fff';
    img.onerror = function(){ img.remove(); f.style.display = ''; f.dataset.jdsrc = s; io.observe(f); };
    img.src = 'thumbs/' + file.replace(/\.html$/i, '.png');
    f.dataset.jd = '1'; jdGo(f, 'about:blank'); f.removeAttribute('loading'); f.style.display = 'none';
    f.parentNode.insertBefore(img, f);
  }
  function hold(f){
    if (f.dataset.jd) return; var s = f.getAttribute('src'); if (!s || s === 'about:blank') return;
    if (/[?&]slot=__lib/.test(s) && f.closest('#libList')) return thumb(f, s);
    f.dataset.jd = '1'; f.dataset.jdsrc = s; jdGo(f, 'about:blank'); f.removeAttribute('loading'); io.observe(f);
  }
  function scan(root){ (root.tagName === 'IFRAME' ? [root] : Array.prototype.slice.call(root.querySelectorAll('iframe'))).forEach(function(f){ if (f.closest('#strip,#libList')) hold(f); }); }
  new MutationObserver(function(ms){ ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if (n.nodeType === 1) scan(n); }); }); }).observe(document.documentElement, {childList:true, subtree:true});
  document.addEventListener('DOMContentLoaded', function(){ scan(document.body); });
})();
