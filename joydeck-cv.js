/* Emadeck - produit "Curriculum vitae" dans la bibliotheque */
(function(){
'use strict';
var PARTS=[
 ['CVA','Classic & minimal','ebook',['#1E2A3A','#4A6FA5','#CBD9EC','#EAF0F8']],
 ['CVB','Sidebar','page',['#2B2B2B','#E8B800','#F4E8B0','#FBF6DC']],
 ['CVC','Header & creative','page',['#6B4F40','#C98F7A','#EBD3C8','#F7EEE9']],
 ['CVD','Elegant & photo','ebook',['#2F3A2C','#8A6F5A','#E7DDD0','#F6F1E9']],
 ['CVE','Creative & dark','page',['#161B26','#E6B98F','#2A3140','#EBD9C8']]
];
var n=function(k){return k+' page'+(k>1?'s':'')};
function mount(ctx){
  var el=ctx.el,root=ctx.root,show=ctx.show,g={};
  (ctx.cards||[]).forEach(function(c){var tn=c.querySelector('.tn'),m=tn&&/^\s*(CV[A-Z])-/.exec(tn.textContent);if(m)(g[m[1]]=g[m[1]]||[]).push(c)});
  var main=el('div','jl-view');main.dataset.v='cv';
  main.appendChild(ctx.backBtn('All products','hub'));
  ctx.head(main,'Curriculum vitae','Curriculum vitae','Pick a style, then drag the CVs into your book.');
  var rows=el('div','jl-rows'),i=0;
  PARTS.forEach(function(p){
    var cards=g[p[0]];if(!cards)return;
    var r=el('button','jl-row','<span class="jl-ico" style="'+ctx.pal(p[3])+'">'+ctx.ill(p[2],'0 0 120 160')+'</span><span><b>'+p[1]+'</b><small>'+n(cards.length)+'</small></span>'+ctx.CHEV);
    r.type='button';r.style.setProperty('--i',i++);
    r.addEventListener('click',function(){show('cv:'+p[0])});
    rows.appendChild(r);
    var v=el('div','jl-view');v.dataset.v='cv:'+p[0];
    v.appendChild(ctx.backBtn('Curriculum vitae','cv'));
    ctx.head(v,'Curriculum vitae',p[1],n(cards.length)+' · Drag a page into your book, or press Add.');
    var grid=el('div','tgrid');cards.forEach(function(c,k){c.style.setProperty('--i',Math.min(k,12));grid.appendChild(c)});
    v.appendChild(grid);root.appendChild(v);
  });
  main.appendChild(rows);root.appendChild(main);
}
window.EmadeckCV={mount:mount};
})();
