/* Emadeck - produit "Labels" dans la bibliotheque */
(function(){
'use strict';
var PARTS=[
 ['LBA','Cosmetic & beauty','page',['#4A2F1E','#D9A86C','#EFE3D0','#F7F2E8']],
 ['LBB','Food & jars','page',['#7A1C12','#F2A33A','#F9E3DD','#FFF6E6']],
 ['LBC','Sticker sheets','page',['#1F4FE0','#FFD84A','#C8D6FF','#EAF0FF']],
 ['LBD','Bottle & packaging','ebook',['#1E4D36','#C8E6B0','#DDE8C9','#F2EEE3']],
 ['LBE','Minimal & dark','page',['#111111','#E4FF2C','#444444','#EEEEEE']]
];
var n=function(k){return k+' page'+(k>1?'s':'')};
function mount(ctx){
  var el=ctx.el,root=ctx.root,show=ctx.show,g={};
  (ctx.cards||[]).forEach(function(c){var tn=c.querySelector('.tn'),m=tn&&/^\s*(LB[A-Z])-/.exec(tn.textContent);if(m)(g[m[1]]=g[m[1]]||[]).push(c)});
  var main=el('div','jl-view');main.dataset.v='labels';
  main.appendChild(ctx.backBtn('All products','hub'));
  ctx.head(main,'Labels','Labels','Pick a style, then drag the label sheets into your book.');
  var rows=el('div','jl-rows'),i=0;
  PARTS.forEach(function(p){
    var cards=g[p[0]];if(!cards)return;
    var r=el('button','jl-row','<span class="jl-ico" style="'+ctx.pal(p[3])+'">'+ctx.ill(p[2],'0 0 120 160')+'</span><span><b>'+p[1]+'</b><small>'+n(cards.length)+'</small></span>'+ctx.CHEV);
    r.type='button';r.style.setProperty('--i',i++);
    r.addEventListener('click',function(){show('lb:'+p[0])});
    rows.appendChild(r);
    var v=el('div','jl-view');v.dataset.v='lb:'+p[0];
    v.appendChild(ctx.backBtn('Labels','labels'));
    ctx.head(v,'Labels',p[1],n(cards.length)+' · Drag a page into your book, or press Add.');
    var grid=el('div','tgrid');cards.forEach(function(c,k){c.style.setProperty('--i',Math.min(k,12));grid.appendChild(c)});
    v.appendChild(grid);root.appendChild(v);
  });
  main.appendChild(rows);root.appendChild(main);
}
window.EmadeckLabels={mount:mount};
})();
