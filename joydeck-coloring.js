/* Emadeck - Coloring book: add every illustration of a category as pages */
(function(){
'use strict';
var FILE='CB-01-coloring-page.html', KEY='joydeckbuilder_project', TPL='cb-01';
var FAM={a:'Animals',b:'Fruits & food',c:'Home & kitchen',d:'Objects',e:'Fantasy & characters',f:'Places & transport',g:'Halloween'};
var css=document.createElement('style');
css.textContent='#cbBox{margin:0 0 18px;padding:14px;border:1px solid #D6E2FF;background:#F3F7FF;border-radius:14px}'+
'#cbBox h3{margin:0 0 4px;font-size:14px;color:#0B1B4D}#cbBox p{margin:0 0 10px;font-size:12px;color:#5C6684;line-height:1.45}'+
'#cbBox select{width:100%;padding:9px 10px;border:1px solid #C9D3EE;border-radius:9px;font:13px inherit;background:#fff;margin-bottom:10px}'+
'#cbBox button{width:100%;padding:10px;border:0;border-radius:9px;background:#1F4FD8;color:#fff;font:700 13px inherit;cursor:pointer}'+
'#cbBox button:disabled{opacity:.55;cursor:wait}#cbBox small{display:block;margin-top:8px;font-size:12px;color:#5C6684}';
document.head.appendChild(css);
var uid=function(){return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};
var CAT=[];
function size(url){return new Promise(function(res){var im=new Image();im.onload=function(){res(im.naturalWidth/im.naturalHeight||1)};im.onerror=function(){res(1)};im.src=url})}
function stateFor(url,r){
  var w=696,h=w/r;if(h>936){h=936;w=h*r}
  w=Math.round(w);h=Math.round(h);
  return {bg:'#FFFFFF',bd:{on:false,c:'#111111',w:4},els:[{id:'e'+Math.random().toString(36).slice(2,8),t:'img',src:url,x:Math.round((816-w)/2),y:Math.round((1056-h)/2),w:w,h:h,flip:false}]};
}
function build(){
  var lib=document.getElementById('lib');
  if(!lib||document.getElementById('cbBox'))return;
  var box=document.createElement('div');box.id='cbBox';
  box.innerHTML='<h3>Coloring book</h3><p>Pick a category to add all its illustrations as pages. You can then edit each page.</p><select id="cbSel"><option>Loading...</option></select><button id="cbGo" type="button" disabled>Add pages</button><small id="cbMsg"></small>';
  var hint=lib.querySelector('.hint');
  if(hint&&hint.nextSibling)hint.parentNode.insertBefore(box,hint.nextSibling);else lib.insertBefore(box,lib.children[1]||null);
  var sel=box.querySelector('#cbSel'),go=box.querySelector('#cbGo'),msg=box.querySelector('#cbMsg');
  function cur(){return CAT.filter(function(c){return c.code===sel.value})[0]}
  function label(){var c=cur();go.textContent=c?('Add '+c.count+' page'+(c.count>1?'s':'')):'Add pages'}
  fetch('library/catalogue.json').then(function(r){return r.json()}).then(function(d){
    CAT=d;sel.innerHTML='';
    Object.keys(FAM).forEach(function(k){
      var items=d.filter(function(c){return c.code.slice(-1)===k});if(!items.length)return;
      var g=document.createElement('optgroup');g.label=FAM[k];
      items.forEach(function(c){var o=document.createElement('option');o.value=c.code;o.textContent=c.name+' ('+c.count+')';g.appendChild(o)});
      sel.appendChild(g);
    });
    go.disabled=false;label();
  }).catch(function(){sel.innerHTML='<option>Library unavailable</option>'});
  sel.addEventListener('change',label);
  go.addEventListener('click',function(){
    var c=cur();if(!c)return;
    go.disabled=true;msg.textContent='Preparing pages...';
    var urls=c.files.map(function(f){return 'library/full/'+c.folder+'/'+f});
    Promise.all(urls.map(size)).then(function(ratios){
      var project;try{project=JSON.parse(localStorage.getItem(KEY))}catch(e){}
      if(!project||!Array.isArray(project.pages))project={title:'Mon ebook',pages:[]};
      urls.forEach(function(u,i){
        var id=uid();
        localStorage.setItem('joydeck_'+FILE+'@'+id,JSON.stringify(stateFor(u,ratios[i])));
        project.pages.push({id:id,tpl:TPL,rev:0});
      });
      localStorage.setItem(KEY,JSON.stringify(project));
      msg.textContent='Done. Reloading...';
      location.reload();
    }).catch(function(){go.disabled=false;msg.textContent='Something went wrong. Please try again.'});
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
