/* Emadeck - produit "Quotes" dans la bibliotheque */
(function(){
'use strict';
var PARTS=[
 ['QTA','Bold colour','page',['#1E4D36','#E4FF2C','#CFE9D8','#EAF3EC']],
 ['QTB','Cards & bubbles','page',['#B5400C','#FF6A1A','#FFD0B5','#FFF0E6']],
 ['QTC','Typographic','page',['#1237B8','#C8F31D','#C9D2EE','#EEF0F4']],
 ['QTD','Photo quotes','ebook',['#0D5C3A','#B8F04D','#CBE4D6','#EAF3EE']],
 ['QTE','Dark & gradient','page',['#2A0F6B','#C45BFF','#D9CEF5','#EDE7F8']]
];
var n=function(k){return k+' page'+(k>1?'s':'')};
function mount(ctx){
  var el=ctx.el,root=ctx.root,show=ctx.show,g={};
  (ctx.cards||[]).forEach(function(c){var tn=c.querySelector('.tn'),m=tn&&/^\s*(QT[A-Z])-/.exec(tn.textContent);if(m)(g[m[1]]=g[m[1]]||[]).push(c)});
  var main=el('div','jl-view');main.dataset.v='quotes';
  main.appendChild(ctx.backBtn('All products','hub'));
  ctx.head(main,'Quotes','Quotes','Pick a style, then drag the quote cards into your book.');
  var rows=el('div','jl-rows'),i=0;
  PARTS.forEach(function(p){
    var cards=g[p[0]];if(!cards)return;
    var r=el('button','jl-row','<span class="jl-ico" style="'+ctx.pal(p[3])+'">'+ctx.ill(p[2],'0 0 120 160')+'</span><span><b>'+p[1]+'</b><small>'+n(cards.length)+'</small></span>'+ctx.CHEV);
    r.type='button';r.style.setProperty('--i',i++);
    r.addEventListener('click',function(){show('qt:'+p[0])});
    rows.appendChild(r);
    var v=el('div','jl-view');v.dataset.v='qt:'+p[0];
    v.appendChild(ctx.backBtn('Quotes','quotes'));
    ctx.head(v,'Quotes',p[1],n(cards.length)+' · Drag a page into your book, or press Add.');
    var grid=el('div','tgrid');cards.forEach(function(c,k){c.style.setProperty('--i',Math.min(k,12));grid.appendChild(c)});
    v.appendChild(grid);root.appendChild(v);
  });
  main.appendChild(rows);root.appendChild(main);
}
window.EmadeckQuotes={mount:mount};
})();
