(function(){
'use strict';
var BASE='library/';
var FAM={a:'Animals',b:'Fruits & food',c:'Home & kitchen',d:'Objects',e:'Fantasy',f:'Places & transport',g:'Halloween'};
var $=function(s){return document.querySelector(s)};
var data=[],fam='all',query='',cur=null,li=-1;
var elCats=$('#libCats'),elView=$('#libView'),elBar=$('#libBar'),elChips=$('#libChips'),elQ=$('#libQ'),lb=$('#lb');
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function thumb(c,f){return BASE+'thumb/'+c.folder+'/'+f}
function full(c,f){return BASE+'full/'+c.folder+'/'+f}
function famOf(c){return c.code.slice(-1)}
function drawChips(){
  elChips.innerHTML='';
  var list=[['all','All']];
  Object.keys(FAM).forEach(function(k){list.push([k,FAM[k]])});
  list.forEach(function(p){
    var b=el('button','chip'+(fam===p[0]?' on':''),p[1]);b.type='button';
    b.onclick=function(){fam=p[0];drawChips();drawCats()};
    elChips.appendChild(b);
  });
}
function drawCats(){
  elCats.innerHTML='';var n=0;
  data.forEach(function(c){
    if(fam!=='all'&&famOf(c)!==fam)return;
    if(query&&(c.name+' '+c.code).toLowerCase().indexOf(query)<0)return;
    n++;
    var b=el('button','cat');b.type='button';
    var ph=el('div','ph'),im=el('img');im.loading='lazy';im.alt=c.name;im.src=thumb(c,c.files[0]);
    ph.appendChild(im);b.appendChild(ph);
    b.appendChild(el('b',null,c.name));
    b.appendChild(el('span',null,c.count+' images \u00b7 '+c.code));
    b.onclick=function(){location.hash=c.code};
    elCats.appendChild(b);
  });
  if(!n)elCats.appendChild(el('p','empty','No category matches your search.'));
}
function home(){
  cur=null;closeLb();
  elView.hidden=true;elBar.hidden=false;elCats.hidden=false;
  window.scrollTo(0,0);
}
function show(code){
  var c=data.filter(function(x){return x.code===code})[0];
  if(!c){home();return}
  cur=c;
  elBar.hidden=true;elCats.hidden=true;elView.hidden=false;elView.innerHTML='';
  var back=el('button','back','\u2190 All categories');back.type='button';
  back.onclick=function(){location.hash=''};
  elView.appendChild(back);
  var vh=el('div','vh');vh.appendChild(el('h2',null,c.name));vh.appendChild(el('small',null,c.code+' \u00b7 '+c.count+' images'));
  elView.appendChild(vh);
  var g=el('div','imgs');
  c.files.forEach(function(f,i){
    var b=el('button','im');b.type='button';
    var ph=el('div','ph'),im=el('img');im.loading='lazy';im.alt=f;im.src=thumb(c,f);
    ph.appendChild(im);b.appendChild(ph);b.appendChild(el('i',null,f.replace('.webp','')));
    b.onclick=function(){openLb(i)};
    g.appendChild(b);
  });
  elView.appendChild(g);
  window.scrollTo(0,0);
}
function openLb(i){
  if(!cur)return;
  var n=cur.files.length;li=(i+n)%n;
  var f=cur.files[li];
  $('#lbImg').src=full(cur,f);$('#lbImg').alt=f;
  $('#lbName').textContent=f.replace('.webp','')+' \u00b7 '+cur.name;
  var d=$('#lbDl');d.href=full(cur,f);d.setAttribute('download',f);
  lb.classList.add('on');
}
function closeLb(){lb.classList.remove('on')}
function route(){var code=location.hash.replace('#','');if(code)show(code);else home()}
$('#lbPrev').onclick=function(){openLb(li-1)};
$('#lbNext').onclick=function(){openLb(li+1)};
$('#lbClose').onclick=closeLb;
lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
document.addEventListener('keydown',function(e){
  if(!lb.classList.contains('on'))return;
  if(e.key==='Escape')closeLb();
  if(e.key==='ArrowLeft')openLb(li-1);
  if(e.key==='ArrowRight')openLb(li+1);
});
elQ.addEventListener('input',function(){query=elQ.value.trim().toLowerCase();drawCats()});
window.addEventListener('hashchange',route);
fetch(BASE+'catalogue.json').then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(d){
  data=d;drawChips();drawCats();route();
}).catch(function(){
  elCats.innerHTML='';elCats.appendChild(el('p','empty','The library could not be loaded. Please try again.'));
});
})();
