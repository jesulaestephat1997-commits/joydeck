/* Emadeck - produit "Agenda" dans la bibliotheque : parties (couvertures, annuel, mensuel...) puis pages a glisser */
(function(){
'use strict';
var PARTS=[
 ['AGC','Covers','ebook',['#0B1B4D','#1F4FD8','#C9D8FA','#E3ECFF']],
 ['AGY','Yearly','plan',['#5B3A1E','#E0A85A','#F3DDB4','#FFF0D6']],
 ['AGM','Monthly','plan',['#7A2E1D','#E58F65','#F6D9C8','#FBE6DC']],
 ['AGW','Weekly','page',['#0E4F57','#2AA6B0','#BFE3E6','#DFF1EE']],
 ['AGD','Daily','toc',['#3C2A6B','#B79CF0','#E4D8F8','#EDE7F8']],
 ['AGT','Trackers','plan',['#7D1F3F','#E0678C','#F6C7D5','#FDE8EE']],
 ['AGL','Lists & notes','page',['#1E3A34','#2FB574','#CDEBDD','#E9F5EE']]
];
var n=function(k){return k+' page'+(k>1?'s':'')};
function mount(ctx){
  var el=ctx.el,root=ctx.root,show=ctx.show,g={};
  (ctx.cards||[]).forEach(function(c){var tn=c.querySelector('.tn'),m=tn&&/^\s*(AG[A-Z])-/.exec(tn.textContent);if(m)(g[m[1]]=g[m[1]]||[]).push(c)});
  var main=el('div','jl-view');main.dataset.v='agenda';
  main.appendChild(ctx.backBtn('All products','hub'));
  ctx.head(main,'Agenda','Agenda & Planner','Pick a part, then drag the pages into your book.');
  var rows=el('div','jl-rows'),i=0;
  PARTS.forEach(function(p){
    var cards=g[p[0]];if(!cards)return;
    var r=el('button','jl-row','<span class="jl-ico" style="'+ctx.pal(p[3])+'">'+ctx.ill(p[2],'0 0 120 160')+'</span><span><b>'+p[1]+'</b><small>'+n(cards.length)+'</small></span>'+ctx.CHEV);
    r.type='button';r.style.setProperty('--i',i++);
    r.addEventListener('click',function(){show('ag:'+p[0])});
    rows.appendChild(r);
    var v=el('div','jl-view');v.dataset.v='ag:'+p[0];
    v.appendChild(ctx.backBtn('Agenda','agenda'));
    ctx.head(v,'Agenda',p[1],n(cards.length)+' · Drag a page into your book, or press Add.');
    var grid=el('div','tgrid');cards.forEach(function(c,k){c.style.setProperty('--i',Math.min(k,12));grid.appendChild(c)});
    v.appendChild(grid);root.appendChild(v);
  });
  main.appendChild(rows);root.appendChild(main);
}
window.EmadeckPlanner={mount:mount};
})();
