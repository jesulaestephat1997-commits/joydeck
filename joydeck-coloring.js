/* Emadeck - Coloring pages : produit "Coloring pages" dans la bibliotheque (categories -> illustrations a glisser) */
(function(){
'use strict';
var FILE='CB-01-coloring-page.html', KEY='joydeckbuilder_project', TPL='cb-01';
var FAM={a:'Animals',b:'Fruits & food',c:'Home & kitchen',d:'Objects',e:'Fantasy & characters',f:'Places & transport',g:'Halloween'};
var pending=null, known=null, catP=null;

var css=document.createElement('style');
css.textContent='.cb-fam{margin:20px 2px 8px;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted,#6b6f68)}'+
'.jl-ico img{width:100%;height:100%;object-fit:contain;border-radius:12px;background:#fff;display:block}'+
'.cb-all{width:100%;margin:0 0 14px;padding:11px;border:0;border-radius:999px;background:var(--accent,#1F4FD8);color:#fff;font:700 13px inherit;cursor:pointer}'+
'.cb-all:disabled{opacity:.55;cursor:wait}'+
'.cb-load{font-size:13px;color:var(--muted,#6b6f68);padding:10px 2px}';
document.head.appendChild(css);

function uid(){return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function readProject(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function stateFor(url){
  return {bg:'#FFFFFF',bd:{on:false,c:'#111111',w:4},els:[{id:'e'+Math.random().toString(36).slice(2,8),t:'img',src:url,x:60,y:180,w:696,h:696,flip:false,fit:true}]};
}
function catalogue(){
  if(!catP)catP=fetch('library/catalogue.json').then(function(r){return r.json()});
  return catP;
}

/* quand une page cb-01 vient d'etre ajoutee au livre, on lui donne l'illustration choisie */
function watchStrip(){
  var strip=document.getElementById('strip');if(!strip||strip.__cbw)return;strip.__cbw=1;
  var p0=readProject();known={};((p0&&p0.pages)||[]).forEach(function(p){known[p.id]=1});
  new MutationObserver(function(){
    var pr=readProject();if(!pr||!pr.pages)return;
    pr.pages.forEach(function(p){
      if(known[p.id])return;known[p.id]=1;
      if(p.tpl!==TPL||!pending)return;
      var k='joydeck_'+FILE+'@'+p.id;
      try{
        if(localStorage.getItem(k)===null){
          localStorage.setItem(k,JSON.stringify(stateFor(pending)));
          var card=strip.querySelector('.pcard[data-id="'+p.id+'"] iframe');
          if(card)card.src=card.src;
        }
      }catch(e){}
      pending=null;
    });
  }).observe(strip,{childList:true});
}

function addAll(c,btn){
  btn.disabled=true;btn.textContent='Preparing pages...';
  try{
    var pr=readProject();
    if(!pr||!Array.isArray(pr.pages))pr={title:'Mon ebook',pages:[]};
    c.files.forEach(function(f){
      var id=uid();
      localStorage.setItem('joydeck_'+FILE+'@'+id,JSON.stringify(stateFor('library/full/'+c.folder+'/'+f)));
      pr.pages.push({id:id,tpl:TPL,rev:0});
    });
    localStorage.setItem(KEY,JSON.stringify(pr));
    location.reload();
  }catch(e){btn.disabled=false;btn.textContent='Something went wrong'}
}

function mount(ctx){
  var el=ctx.el,root=ctx.root,show=ctx.show;
  watchStrip();
  var modelCard=null;
  (ctx.cards||[]).forEach(function(c){var tn=c.querySelector('.tn');if(tn&&/^\s*CB-01/.test(tn.textContent))modelCard=c});

  var main=el('div','jl-view');main.dataset.v='coloring';
  main.appendChild(ctx.backBtn('All products','hub'));
  ctx.head(main,'Coloring pages','Coloring pages','Pick a category, then drag the illustrations into your book.');
  var holder=el('div','');holder.innerHTML='<div class="cb-load">Loading...</div>';main.appendChild(holder);
  root.appendChild(main);

  if(ctx.cards&&ctx.cards.length){
    var mv=el('div','jl-view');mv.dataset.v='cb:models';
    mv.appendChild(ctx.backBtn('Coloring pages','coloring'));
    ctx.head(mv,'Coloring pages','Page models',ctx.cards.length+' models \u00b7 Drag a model into your book, or press Add.');
    var mg=el('div','tgrid');ctx.cards.forEach(function(c,i){c.style.setProperty('--i',i);mg.appendChild(c)});
    mv.appendChild(mg);root.appendChild(mv);
  }

  catalogue().then(function(cat){
    var total=0;cat.forEach(function(c){total+=c.count});
    var cnt=root.querySelector('.cb-count');if(cnt)cnt.textContent=total+' illustrations';
    holder.innerHTML='';
    var idx=0;
    if(ctx.cards&&ctx.cards.length){
      var r0=el('div','jl-rows');
      var row=el('button','jl-row','<span class="jl-ico" style="'+ctx.pal(['#0E4F57','#2AA6B0','#BFE3E6','#DFF1EE'])+'">'+ctx.ill('page','0 0 120 160')+'</span><span><b>Page models</b><small>'+ctx.cards.length+' models: page, title, cover</small></span>'+ctx.CHEV);
      row.type='button';row.style.setProperty('--i',0);
      row.addEventListener('click',function(){show('cb:models')});
      r0.appendChild(row);holder.appendChild(r0);
    }
    Object.keys(FAM).forEach(function(k){
      var items=cat.filter(function(c){return c.code.slice(-1)===k});if(!items.length)return;
      holder.appendChild(el('div','cb-fam',FAM[k]));
      var rows=el('div','jl-rows');
      items.forEach(function(c){
        idx++;
        var v=el('div','jl-view');v.dataset.v='cb:'+c.code;root.appendChild(v);
        var thumb='library/thumb/'+c.folder+'/'+c.files[0];
        var r=el('button','jl-row','<span class="jl-ico" style="--bg:#fff"><img loading="lazy" alt="" src="'+thumb+'"></span><span><b>'+c.name+'</b><small>'+c.count+' illustration'+(c.count>1?'s':'')+' \u00b7 '+c.code+'</small></span>'+ctx.CHEV);
        r.type='button';r.style.setProperty('--i',Math.min(idx,12));
        var built=false;
        r.addEventListener('click',function(){
          if(!built){built=true;fill(v,c,ctx,modelCard)}
          show('cb:'+c.code);
        });
        rows.appendChild(r);
      });
      holder.appendChild(rows);
    });
  }).catch(function(){holder.innerHTML='<div class="cb-load">Library unavailable. Please refresh.</div>'});
}

function fill(v,c,ctx,modelCard){
  var el=ctx.el;
  v.appendChild(ctx.backBtn('Coloring pages','coloring'));
  ctx.head(v,c.code,c.name,c.count+' illustration'+(c.count>1?'s':'')+' \u00b7 Drag one into your book, or press Add.');
  var all=el('button','cb-all','Add all '+c.count+' as pages');all.type='button';
  all.addEventListener('click',function(){if(confirm('Add '+c.count+' pages to your book?'))addAll(c,all)});
  v.appendChild(all);
  var g=el('div','tgrid');
  c.files.forEach(function(f,i){
    var full='library/full/'+c.folder+'/'+f;
    var card=el('div','tcard');card.draggable=true;card.style.setProperty('--i',Math.min(i,12));
    card.innerHTML='<div class="thumb"><img loading="lazy" decoding="async" draggable="false" alt="" src="library/thumb/'+c.folder+'/'+f+'" style="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;background:#fff"></div><div class="tn">'+f.replace('.webp','')+'</div><button class="add" type="button">+ Add</button>';
    card.addEventListener('dragstart',function(e){pending=full;e.dataTransfer.setData('text/plain','tpl:'+TPL);e.dataTransfer.effectAllowed='copy'});
    card.addEventListener('dragend',function(){setTimeout(function(){pending=null},400)});
    card.querySelector('.add').addEventListener('click',function(){
      var b=modelCard&&modelCard.querySelector('.add');
      if(!b)return;
      pending=full;b.click();
    });
    g.appendChild(card);
  });
  v.appendChild(g);
}

window.EmadeckColoring={mount:mount};
})();
