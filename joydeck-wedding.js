/* Emadeck - produit "Wedding cards" dans la bibliotheque */
(function(){
'use strict';
var PARTS=[
 ['WDI','Invitations','ebook',['#7D1F3F','#E0678C','#F6C7D5','#FDE8EE']],
 ['WDS','Save the date','page',['#1E3A34','#2FB574','#CDEBDD','#E9F5EE']]
];
var n=function(k){return k+' card'+(k>1?'s':'')};
function mount(ctx){
  var el=ctx.el,root=ctx.root,show=ctx.show,g={};
  (ctx.cards||[]).forEach(function(c){var tn=c.querySelector('.tn'),m=tn&&/^\s*(WD[A-Z])-/.exec(tn.textContent);if(m)(g[m[1]]=g[m[1]]||[]).push(c)});
  var main=el('div','jl-view');main.dataset.v='wedding';
  main.appendChild(ctx.backBtn('All products','hub'));
  ctx.head(main,'Wedding cards','Wedding cards','Pick a style, then drag the cards into your book.');
  var rows=el('div','jl-rows'),i=0;
  PARTS.forEach(function(p){
    var cards=g[p[0]];if(!cards)return;
    var r=el('button','jl-row','<span class="jl-ico" style="'+ctx.pal(p[3])+'">'+ctx.ill(p[2],'0 0 120 160')+'</span><span><b>'+p[1]+'</b><small>'+n(cards.length)+'</small></span>'+ctx.CHEV);
    r.type='button';r.style.setProperty('--i',i++);
    r.addEventListener('click',function(){show('wd:'+p[0])});
    rows.appendChild(r);
    var v=el('div','jl-view');v.dataset.v='wd:'+p[0];
    v.appendChild(ctx.backBtn('Wedding cards','wedding'));
    ctx.head(v,'Wedding cards',p[1],n(cards.length)+' · Drag a card into your book, or press Add.');
    var grid=el('div','tgrid');cards.forEach(function(c,k){c.style.setProperty('--i',Math.min(k,12));grid.appendChild(c)});
    v.appendChild(grid);root.appendChild(v);
  });
  main.appendChild(rows);root.appendChild(main);
}
window.EmadeckWedding={mount:mount};
})();
