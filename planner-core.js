/* Emadeck - moteur des pages Agenda / Planner : page de base (modele) + elements libres (texte, illustrations) + palette/polices */
(function(){
'use strict';
var W=816,H=1056;
var Q=new URLSearchParams(location.search);
var EMBED=!!Q.get('embed'),SLOT=Q.get('slot')||'';
var FILE=location.pathname.split('/').pop();
var KEY='joydeck_'+FILE;
var MID=document.documentElement.getAttribute('data-model');
var M=(window.PLANNER_MODELS||{})[MID]||{name:'Planner page',html:function(){return '<div style="padding:40px">Model not found</div>'}};
var FAM={a:'Animals',b:'Fruits & food',c:'Home & kitchen',d:'Objects',e:'Fantasy & characters',f:'Places & transport',g:'Halloween'};
var MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
var DEF={title:'#1A1A1A',text:'#404040',accent:'#8C8C8C',pale:'#EDEDED',bg:'#FFFFFF',fh:"'Montserrat', sans-serif",fb:"'Inter', sans-serif"};
var FONTS=[["'Montserrat', sans-serif","Montserrat"],["'Inter', sans-serif","Inter"],["'Poppins', sans-serif","Poppins"],["'Fredoka', sans-serif","Fredoka"],["'Baloo 2', sans-serif","Baloo 2"],["'Patrick Hand', cursive","Patrick Hand"],
["'EB Garamond', serif",'EB Garamond'],["'Cormorant Garamond', serif",'Cormorant Garamond'],["'Libre Baskerville', serif",'Libre Baskerville'],["'Playfair Display', serif",'Playfair Display'],["'Fraunces', serif",'Fraunces'],["'Marcellus', serif",'Marcellus'],["'Prata', serif",'Prata'],["'Italiana', serif",'Italiana'],["'DM Serif Display', serif",'DM Serif Display'],["'Abril Fatface', serif",'Abril Fatface'],["'Cinzel', serif",'Cinzel'],
["'Space Grotesk', sans-serif",'Space Grotesk'],["'Outfit', sans-serif",'Outfit'],["'Bricolage Grotesque', sans-serif",'Bricolage Grotesque'],
["'Great Vibes', cursive",'Great Vibes'],["'Dancing Script', cursive",'Dancing Script'],["'Parisienne', cursive",'Parisienne'],["'Alex Brush', cursive",'Alex Brush'],["'Allura', cursive",'Allura'],["'Sacramento', cursive",'Sacramento'],["'Tangerine', cursive",'Tangerine'],["'Pinyon Script', cursive",'Pinyon Script']];
try{(window.parent.JD_EXTRA_FONTS||[]).forEach(function(f){FONTS.push([f[0],f[1]]);if(f[2]&&!EMBED){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+f[2]+'&display=swap';document.head.appendChild(l)}})}catch(e){}
var PAL=[['noir-or','Noir & Or','#111111','#333333','#B08D57','#D9C9A8','#CFCFCF','#F5F1EA','#FFFFFF'],['bleu-nuit','Bleu nuit','#14213D','#2B3445','#1F4E8C','#A9C1E8','#C7D2E5','#EDF2FA','#FFFFFF'],['vert-foret','Vert foret','#1F3D2F','#2E3B33','#2F6B4F','#B7D4C2','#CFE0D5','#EEF5F0','#FFFFFF'],['bordeaux','Bordeaux','#3B0A14','#3A2A2D','#8E1B2E','#E3B7BE','#E6CDD1','#F8EEF0','#FFFFFF'],['rose-poudre','Rose poudre','#4A2B33','#4A3A3E','#C98A94','#F0D5D9','#EBD6D9','#FBF1F2','#FFFFFF'],['terracotta','Terracotta','#4A2616','#4B3A32','#C2623A','#EBC3AE','#E8D2C6','#FAF0EA','#FFFFFF'],['lavande','Lavande','#2E2250','#3C3558','#7A62C6','#D6CCF0','#DDD6EF','#F3F0FA','#FFFFFF'],['ocean','Ocean','#0B3C49','#26454D','#1A8FA0','#B5E0E6','#CBE5E9','#EBF6F8','#FFFFFF'],['moutarde','Moutarde','#2D2A1F','#3E3A2C','#D4A017','#F1DE9C','#E6DCB8','#FBF6E4','#FFFFFF'],['corail','Corail & Marine','#1D2B53','#33405F','#F26B5B','#FBC9C2','#D7DCEA','#FFF1EF','#FFFFFF'],['sauge','Sauge & Creme','#2F3B2B','#404B3C','#7E9B6B','#D7E2CC','#DDE5D3','#F6F3E8','#FBF8EF'],['mono','Gris mono','#222222','#444444','#666666','#BDBDBD','#D4D4D4','#F2F2F2','#FFFFFF']].map(function(a){return {id:a[0],name:a[1],title:a[2],text:a[3],accent:a[4],accent2:a[5],border:a[6],pale:a[7],bg:a[8]}});
try{PAL=PAL.concat(window.parent.JD_EXTRA_PALETTES||[])}catch(e){}

/* ---------- fonts + css + shell ---------- */
var fl=document.createElement('link');fl.rel='stylesheet';
fl.href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600;700&family=Fredoka:wght@400;600;700&family=Baloo+2:wght@500;700&family=Patrick+Hand&family=EB+Garamond:wght@400;700&family=Cormorant+Garamond:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Playfair+Display:wght@700;800&family=Fraunces&family=Marcellus&family=Prata&family=Italiana&family=DM+Serif+Display&family=Abril+Fatface&family=Cinzel&family=Space+Grotesk:wght@400;700&family=Outfit:wght@400;700&family=Bricolage+Grotesque&family=Great+Vibes&family=Dancing+Script:wght@700&family=Parisienne&family=Alex+Brush&family=Allura&family=Sacramento&family=Tangerine&family=Pinyon+Script&display=swap';
document.head.appendChild(fl);
var css=document.createElement('style');
css.textContent=[
'*{box-sizing:border-box}[hidden]{display:none!important}',
'body{margin:0;background:#EDEBE6;font-family:Inter,sans-serif;color:#1A1A1A}',
'.preview-area{margin-left:300px;padding:92px 40px 40px;display:flex;justify-content:flex-start}',
'.sw{position:relative;flex:none;margin:0 auto}.stage{width:816px;height:1056px;transform-origin:0 0}',
'#jdZoom{position:fixed;right:26px;bottom:20px;z-index:50;display:flex;align-items:center;gap:2px;background:#fff;border:1px solid #E4E2DD;border-radius:10px;padding:3px;box-shadow:0 6px 18px rgba(0,0,0,.12)}',
'#jdZoom button{min-width:28px;height:28px;border:0;background:transparent;border-radius:7px;font:600 13px Inter,sans-serif;color:#1A1A1A;cursor:pointer;padding:0 8px}#jdZoom button:hover{background:#F2F0EB}',
'#jdZoom span{min-width:46px;text-align:center;font:600 12px Inter,sans-serif;color:#555}@media print{#jdZoom{display:none}}',
'.page{width:816px;height:1056px;position:relative;overflow:hidden;background:var(--bgc,#fff);box-shadow:0 12px 40px rgba(0,0,0,.18);touch-action:none;user-select:none;-webkit-user-select:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}',
'.page.bd::after{content:"";position:absolute;inset:24px;border:var(--bd-w,4px) solid var(--bd-c,#111);border-radius:18px;pointer-events:none;z-index:5}',
'#base{position:absolute;left:0;top:0;width:816px;height:1056px;font-family:var(--fb);color:var(--x);font-size:12px;line-height:1.25;z-index:1}',
'#free{position:absolute;left:0;top:0;width:816px;height:1056px;z-index:2;pointer-events:none}#free .el{pointer-events:auto}',
'#base *{box-sizing:border-box}',
'.ed{cursor:text}.ed[contenteditable="true"]{outline:2px solid #1F4FD8;background:rgba(31,79,216,.06);user-select:text;-webkit-user-select:text;cursor:text}',
'.el{position:absolute;cursor:move}',
'.el img{width:100%;height:100%;display:block;pointer-events:none;-webkit-user-drag:none;mix-blend-mode:multiply}',
'.txt{white-space:pre-wrap;word-break:break-word;line-height:1.2;padding:4px;min-height:1em}',
'.txt[contenteditable="true"]{cursor:text;outline:2px solid #1F4FD8;user-select:text;-webkit-user-select:text}',
'.el.sel{outline:2px solid #1F4FD8;outline-offset:1px}',
'.resize-handle{position:absolute;right:-8px;bottom:-8px;width:16px;height:16px;background:#fff;border:2px solid #1F4FD8;border-radius:4px;cursor:nwse-resize;display:none}',
'.el.sel .resize-handle{display:block}.page.multi .resize-handle{display:none!important}',
'#jdTheme{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden}',
'.toolbar{position:fixed;top:0;left:300px;right:0;min-height:52px;background:#fff;border-bottom:1px solid #E4E2DD;display:flex;align-items:center;flex-wrap:wrap;gap:8px 10px;padding:8px 16px;z-index:100}',
'.toolbar button,.sbtn,.toolbar select{padding:7px 12px;border:1px solid #E4E2DD;border-radius:6px;background:#FAFAF8;font:13px Inter,sans-serif;cursor:pointer;white-space:nowrap;color:#1A1A1A}',
'.toolbar select{max-width:150px;padding:7px 8px}.toolbar button:disabled{opacity:.4;cursor:not-allowed}',
'.toolbar .save-btn{background:#0B1B4D;color:#fff;border-color:#0B1B4D}.toolbar .export-btn{background:#1A1A1A;color:#fff;border-color:#1A1A1A}.toolbar .addtxt{background:#0B1B4D;color:#fff;border-color:#0B1B4D}',
'.toolbar .tb-sep{width:1px;height:26px;background:#E4E2DD}.toolbar .tb-l{font-size:12px;font-weight:700;color:#4A4842;display:flex;align-items:center;gap:6px}',
'.toolbar input[type=color]{width:30px;height:30px;border:1px solid #E4E2DD;border-radius:6px;padding:0;cursor:pointer;background:none}',
'.toolbar input[type=number]{width:70px;padding:6px;border:1px solid #E4E2DD;border-radius:6px;font:13px Inter,sans-serif;background:#FAFAF8}',
'.toolbar .sp{flex:1}.toolbar .grp{display:flex;align-items:center;gap:8px;white-space:nowrap}.save-status{font-size:12px;color:#8A8781;white-space:nowrap}',
'.dw{display:flex;align-items:center;gap:4px;width:250px}.dots{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;padding:3px 2px;flex:1}.dots::-webkit-scrollbar{display:none}',
'.toolbar .ar{flex:none;width:24px;height:24px;border-radius:50%;padding:0;font-size:15px;line-height:1;background:#fff}',
'.d{flex:none;width:26px;height:26px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #cfc9bd;cursor:pointer;padding:0}.toolbar .d{padding:0;width:26px;height:26px;border:2px solid #fff}.d.on{box-shadow:0 0 0 2px #1F4FD8}',
'.sidebar{width:300px;background:#fff;border-right:1px solid #E4E2DD;padding:24px 20px;overflow-y:auto;position:fixed;top:0;bottom:0;left:0}',
'.sidebar h2{font-size:15px;font-weight:700;margin:0 0 4px}.sidebar .sub{font-size:12px;color:#8A8781;margin:0 0 18px}',
'.control-group{margin-bottom:18px}.control-group>label,.lbl{display:block;font-size:12px;font-weight:600;color:#4A4842;margin-bottom:8px}',
'.row{display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap}',
'.row input[type=color]{width:34px;height:34px;border:1px solid #E4E2DD;border-radius:6px;padding:0;cursor:pointer;background:none}.row span{font-size:12px;color:#6b6862}',
'.sidebar select{width:100%;padding:8px 10px;border:1px solid #E4E2DD;border-radius:6px;font:13px Inter,sans-serif;background:#FAFAF8}',
'input.num{width:70px;padding:8px 10px;border:1px solid #E4E2DD;border-radius:6px;font:13px Inter,sans-serif;background:#FAFAF8}',
'#selPanel{background:#F3F7FF;border:1px solid #D6E2FF;border-radius:10px;padding:12px;margin-bottom:18px}#selPanel .lbl{color:#0B1B4D}',
'.btns{display:flex;gap:6px;flex-wrap:wrap}.btns .sbtn{padding:6px 10px}.sbtn.on{background:#0B1B4D;color:#fff;border-color:#0B1B4D}.sbtn.dng{color:#b3261e}',
'#imgGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px;max-height:56vh;overflow-y:auto}',
'#imgGrid button{border:1px solid #E4E2DD;background:#fff;border-radius:8px;padding:3px;aspect-ratio:1/1;cursor:grab}#imgGrid button:hover{border-color:#1F4FD8}',
'#imgGrid img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}.hint{font-size:11px;color:#8A8781;margin-top:6px}',
'html.embed .stage{transform:none!important}',
/* base page vocabulary */
'.h1{font-family:var(--fh);color:var(--t);font-weight:700;text-transform:uppercase;letter-spacing:.1em;text-align:center;line-height:1.1}',
'.sub{font-family:var(--fb);color:var(--x);text-align:center;letter-spacing:.06em}',
'.bar{background:var(--p);color:var(--t);font:700 10px var(--fb);letter-spacing:.16em;text-transform:uppercase;text-align:center;padding:5px 8px;line-height:1.2}',
'.lab{font:700 10px var(--fb);letter-spacing:.14em;text-transform:uppercase;color:var(--t)}',
'.ln{border-bottom:1px solid var(--ln);width:100%}',
'.bx{border:1px solid var(--ln);background:transparent}',
'.bxr{border:1px solid var(--ln);border-radius:10px}',
'.cb{display:inline-block;width:11px;height:11px;border:1px solid var(--x);border-radius:2px;flex:none}',
'.ci{display:inline-block;width:11px;height:11px;border:1px solid var(--x);border-radius:50%;flex:none}',
'.fl{display:flex;align-items:center}.fc{display:flex;flex-direction:column}',
'.fld{display:flex;align-items:flex-end;gap:6px}.fld i{flex:1;border-bottom:1px solid var(--x);height:14px}',
'.cell{border:1px solid var(--ln)}',
'@media print{body{background:#fff!important;margin:0!important;display:block!important}.sidebar,.toolbar,#jdTheme{display:none!important}.preview-area{padding:0!important;margin:0!important;display:block!important}.sw{width:auto!important;height:auto!important}.stage{transform:none!important}.page{width:8.5in!important;height:11in!important;box-shadow:none!important;margin:0!important;zoom:.9375}.el.sel{outline:none!important}.resize-handle{display:none!important}@page{size:8.5in 11in;margin:0}}'
].join('\n');
document.head.appendChild(css);

var SHELL='<div id="jdTheme" aria-hidden="true"><input type="color" id="cbTitle" value="#1A1A1A"><input type="color" id="cbText" value="#404040"><input type="color" id="cbAccent" value="#8C8C8C"><input type="color" id="cbPale" value="#EDEDED"><input type="color" id="cbBg" value="#FFFFFF"><select id="fontHeading"></select><select id="fontBody"></select></div>'+
'<div class="sidebar"><h2 id="mName"></h2><p class="sub" style="text-align:left;letter-spacing:0">Double-click any text on the page to edit it. Add your own text and illustrations on top.</p>'+
'<div id="selPanel" hidden><div class="lbl" id="selName">Selected</div><div id="txtCtl">'+
'<div class="row"><select id="fRole"><option value="title">Title style (follows palette)</option><option value="text">Body style (follows palette)</option></select></div>'+
'<div class="row"><select id="fFont"></select></div>'+
'<div class="row"><input type="number" class="num" id="fSize" min="8" max="240" value="40"><span>px</span><input type="color" name="fColor" value="#1A1A1A"></div>'+
'<div class="btns" style="margin-bottom:10px"><button class="sbtn" id="fBold" type="button"><b>B</b></button><button class="sbtn" id="fItal" type="button"><i>I</i></button><button class="sbtn" id="aL" type="button">Left</button><button class="sbtn" id="aC" type="button">Center</button><button class="sbtn" id="aR" type="button">Right</button></div>'+
'<div class="btns" style="margin-bottom:10px"><button class="sbtn" id="fReset" type="button">Use palette colors and fonts</button></div>'+
'<div class="hint" style="margin:0 0 10px">Double-click the text on the page to edit it.</div></div>'+
'<div id="imgCtl" class="btns" style="margin-bottom:10px"><button class="sbtn" id="iFlip" type="button">Flip</button></div>'+
'<div class="btns"><button class="sbtn" id="oFront" type="button">Bring to front</button><button class="sbtn" id="oBack" type="button">Send to back</button><button class="sbtn" id="oDup" type="button">Duplicate</button><button class="sbtn dng" id="oDel" type="button">Delete</button></div></div>'+
'<div class="control-group"><label>Illustrations</label><select id="catSel"><option>Loading...</option></select><div id="imgGrid"></div><div class="hint">Click an illustration to add it, or drag it onto the page.</div></div></div>'+
'<div class="toolbar" id="toolbar"><button id="undoBtn" type="button">&#8630; Undo</button><button id="redoBtn" type="button">&#8631; Redo</button><button id="selAllBtn" type="button">Select all</button><button id="addText" class="addtxt" type="button">Add text</button><button id="photoBtn" type="button" hidden>Add photo</button><input type="file" id="photoFile" accept="image/*" hidden>'+
'<span class="grp" id="calGrp" hidden><select id="calM"></select><input type="number" id="calY" min="1900" max="2200" title="Year"></span>'+
'<span class="tb-sep"></span><span class="tb-l">Style</span><span class="dw"><button class="ar" id="pL" type="button">&#8249;</button><span class="dots" id="pDots"></span><button class="ar" id="pR" type="button">&#8250;</button></span>'+
'<select id="tbH" title="Titles font"><option value="">Titles...</option></select><select id="tbB" title="Text font"><option value="">Text...</option></select><button id="tbO" type="button">Original</button><span class="tb-sep"></span>'+
'<span class="grp"><label class="tb-l"><input type="checkbox" id="bdOn"> Border</label><input type="color" name="bdCol" value="#111111" title="Border color"><input type="number" id="bdW" min="1" max="20" value="4" title="Border width" style="width:54px"></span>'+
'<span class="grp"><span class="tb-l">Page</span><input type="color" name="pgBg" value="#FFFFFF" title="Page background"></span><span class="sp"></span>'+
'<button type="button" class="export-btn" id="exportPdfBtn">Export PDF</button><button class="save-btn" id="saveBtn" type="button">Save</button><span class="save-status" id="saveStatus"></span></div>'+
'<div class="preview-area"><div class="sw" id="sw"><div class="stage" id="stage"><div class="page" id="page"><div id="base"></div><div id="free"></div></div></div></div></div>';
document.body.insertAdjacentHTML('afterbegin',SHELL);

var $=function(id){return document.getElementById(id)||document.querySelector('[name="'+id+'"]')};
var pageEl=$('page'),baseEl=$('base'),freeEl=$('free'),sw=$('sw'),stage=$('stage');
var S=null,sels=[],editing=null,editB=null,hist=[],hi=-1,drag=null,saveT=null;
var uid=function(){return 'e'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};
$('mName').textContent=M.name;

function txt(text,x,y,w,size,o){o=o||{};return {id:uid(),t:'text',role:o.role||'title',x:x,y:y,w:w,text:text,font:null,size:size,color:null,bold:!!o.bold,italic:!!o.italic,align:o.align||'center'}}
function defYear(){var d=new Date();return d.getMonth()>=8?d.getFullYear()+1:d.getFullYear()}
function preset(){
  var st={bg:null,bd:{on:false,c:null,w:4},th:null,cal:{m:0,y:defYear()},tx:{},els:[]};
  if(M.preset)M.preset(st,txt);
  return st;
}
function fixState(){
  if(!S.bd)S.bd={on:false,c:null,w:4};
  if(!S.cal)S.cal={m:0,y:defYear()};
  if(!S.tx)S.tx={};
  var t=S.th||{};S.th={};
  Object.keys(DEF).forEach(function(k){S.th[k]=t[k]||DEF[k]});
  S.els.forEach(function(e){if(e.t==='text'&&!e.role)e.role='title'});
}
function load(){
  var raw=null;try{raw=localStorage.getItem(KEY)}catch(e){}
  if(raw){try{var o=JSON.parse(raw);if(o&&Array.isArray(o.els)){S=o;fixState();return}}catch(e){}}
  S=preset();fixState();
}
function effBg(){return S.bg==='accent'?S.th.accent:S.bg==='pale'?S.th.pale:(S.bg||S.th.bg)}
function effBd(){var c=S.bd.c;return c==='accent'?S.th.accent:(c||S.th.title)}
function effColor(el){return el.color||(el.role==='text'?S.th.text:S.th.title)}
function effFont(el){return el.font||(el.role==='text'?S.th.fb:S.th.fh)}
function primary(){return sels.length?sels[sels.length-1]:null}
function sc(){var r=pageEl.getBoundingClientRect();return (r.width/W)||1}
function layout(){
  if(EMBED){sw.style.width=W+'px';sw.style.height=H+'px';return}
  var h=$('toolbar').offsetHeight||52;
  document.querySelector('.preview-area').style.paddingTop=(h+24)+'px';
  var s=Math.min(1,(innerWidth-300-80)/W,(innerHeight-h-24-30)/H);
  if(!(s>0.2))s=0.2;
  if(typeof zoom==='number')s=zoom;curS=s;var zp=document.getElementById('zPct');if(zp)zp.textContent=Math.round(s*100)+'%';
  sw.style.width=(W*s)+'px';sw.style.height=(H*s)+'px';stage.style.transform='scale('+s+')';
}
function get(id){for(var i=0;i<S.els.length;i++)if(S.els[i].id===id)return S.els[i];return null}

/* ---------- base page ---------- */
function renderBase(){
  baseEl.innerHTML=M.html(S);
  [].forEach.call(baseEl.querySelectorAll('.ed'),function(n,i){n.dataset.k=i;if(S.tx[i]!=null)n.textContent=S.tx[i]});
  var cnt={};
  [].forEach.call(baseEl.querySelectorAll('*'),function(n){
    if(n.closest('.ed')||n.children.length)return;
    var t=n.textContent.trim();if(!t||/^\d+$/.test(t))return;
    cnt[t]=(cnt[t]||0)+1;var k='g:'+t+'#'+cnt[t];
    n.classList.add('ed');n.dataset.k=k;if(S.tx[k]!=null)n.textContent=S.tx[k];
  });
}
function hexA(h,a){var c=hex2rgb(h)||[0,0,0];return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')'}
function applyTheme(){
  var t=S.th,s=pageEl.style;
  s.setProperty('--t',t.title);s.setProperty('--x',t.text);s.setProperty('--a',t.accent);s.setProperty('--p',t.pale);s.setProperty('--bgc',effBg());s.setProperty('--wh',t.bg);
  s.setProperty('--fh',t.fh);s.setProperty('--fb',t.fb);
  s.setProperty('--ln',hexA(t.text,.38));s.setProperty('--ln2',hexA(t.text,.16));
}

/* ---------- free elements ---------- */
function geom(n,el){n.style.left=el.x+'px';n.style.top=el.y+'px';n.style.width=el.w+'px';n.style.height=el.t==='img'?el.h+'px':'auto'}
function styleTxt(n,el){
  var t=n.firstChild;
  t.style.fontFamily=effFont(el);t.style.fontSize=el.size+'px';t.style.color=effColor(el);
  t.style.fontWeight=el.bold?'700':'400';t.style.fontStyle=el.italic?'italic':'normal';t.style.textAlign=el.align;
}
function build(el){
  var n=document.createElement('div');n.className='el';n.dataset.id=el.id;geom(n,el);
  if(el.t==='img'){
    var im=document.createElement('img');im.alt='';im.draggable=false;im.src=el.src;
    if(el.flip)im.style.transform='scaleX(-1)';
    if(el.ph)im.style.mixBlendMode='normal';
    n.appendChild(im);
  } else {
    var t=document.createElement('div');t.className='txt';t.textContent=el.text;n.appendChild(t);styleTxt(n,el);
  }
  var h=document.createElement('div');h.className='resize-handle';n.appendChild(h);
  if(sels.indexOf(el.id)>=0)n.classList.add('sel');
  return n;
}
function fontOpt(selEl,v){if(![].some.call(selEl.options,function(o){return o.value===v}))selEl.appendChild(new Option(v.split(',')[0].replace(/'/g,''),v))}
function syncTheme(){
  $('cbTitle').value=S.th.title;$('cbText').value=S.th.text;$('cbAccent').value=S.th.accent;$('cbPale').value=S.th.pale;$('cbBg').value=S.th.bg;
  fontOpt($('fontHeading'),S.th.fh);fontOpt($('fontBody'),S.th.fb);
  $('fontHeading').value=S.th.fh;$('fontBody').value=S.th.fb;
}
function applyPage(){
  applyTheme();
  pageEl.classList.toggle('bd',!!S.bd.on);
  pageEl.style.setProperty('--bd-c',effBd());pageEl.style.setProperty('--bd-w',S.bd.w+'px');
  syncTheme();
  if(!EMBED){$('pgBg').value=effBg();$('bdOn').checked=!!S.bd.on;$('bdCol').value=effBd();$('bdW').value=S.bd.w;
    if(M.cal){$('calM').value=S.cal.m;$('calY').value=S.cal.y}}
}
function restyleTexts(){S.els.forEach(function(el){if(el.t==='text'){var n=node(el.id);if(n)styleTxt(n,el)}});selUI()}
function render(){
  editing=null;
  freeEl.innerHTML='';
  S.els.forEach(function(el){freeEl.appendChild(build(el))});
  pageEl.classList.toggle('multi',sels.length>1);
  applyPage();selUI();
}
function node(id){return freeEl.querySelector('.el[data-id="'+id+'"]')}
function renderAll(){renderBase();render()}

/* theme fields read by the book style bar */
var TH={cbTitle:'title',cbText:'text',cbAccent:'accent',cbPale:'pale',cbBg:'bg'};
Object.keys(TH).forEach(function(id){$(id).addEventListener('input',function(){S.th[TH[id]]=$(id).value;applyPage();restyleTexts()})});
$('fontHeading').addEventListener('change',function(){S.th.fh=$('fontHeading').value||DEF.fh;applyPage();restyleTexts()});
$('fontBody').addEventListener('change',function(){S.th.fb=$('fontBody').value||DEF.fb;applyPage();restyleTexts()});

/* selection */
function select(id,add){
  if(editing)endEdit();if(editB)endBase();
  if(id==null)sels=[];else if(add){var i=sels.indexOf(id);if(i>=0)sels.splice(i,1);else sels.push(id)}else sels=[id];
  [].forEach.call(freeEl.querySelectorAll('.el'),function(n){n.classList.toggle('sel',sels.indexOf(n.dataset.id)>=0)});
  pageEl.classList.toggle('multi',sels.length>1);selUI();
}
function selectAll(){if(editing)endEdit();if(editB)endBase();sels=S.els.map(function(e){return e.id});[].forEach.call(freeEl.querySelectorAll('.el'),function(n){n.classList.add('sel')});pageEl.classList.toggle('multi',sels.length>1);selUI()}
function selEls(){return sels.map(get).filter(Boolean)}
function selUI(){
  if(EMBED)return;
  var els=selEls();$('selPanel').hidden=!els.length;if(!els.length)return;
  var tx=els.filter(function(e){return e.t==='text'}),im=els.filter(function(e){return e.t==='img'});
  $('selName').textContent=els.length>1?'Selected: '+els.length+' items':(els[0].t==='img'?'Selected: image':'Selected: text');
  $('txtCtl').hidden=!tx.length;$('imgCtl').hidden=!im.length;
  if(tx.length){var el=tx[tx.length-1];
    $('fRole').value=el.role||'title';$('fFont').value=el.font||'';$('fSize').value=el.size;$('fColor').value=effColor(el);
    $('fBold').classList.toggle('on',!!el.bold);$('fItal').classList.toggle('on',!!el.italic);
    $('aL').classList.toggle('on',el.align==='left');$('aC').classList.toggle('on',el.align==='center');$('aR').classList.toggle('on',el.align==='right')}
  if(im.length)$('iFlip').classList.toggle('on',!!im[im.length-1].flip);
}

/* history / save */
function snap(){return JSON.stringify(S)}
function pushHist(){var s=snap();if(hist[hi]===s)return;hist=hist.slice(0,hi+1);hist.push(s);if(hist.length>80)hist.shift();hi=hist.length-1;histUI()}
function histUI(){if(EMBED)return;$('undoBtn').disabled=hi<=0;$('redoBtn').disabled=hi>=hist.length-1}
function save(){try{localStorage.setItem(KEY,snap())}catch(e){}}
function commit(){pushHist();if(EMBED)return;clearTimeout(saveT);saveT=setTimeout(save,350)}
function restore(i){hi=i;S=JSON.parse(hist[hi]);sels=sels.filter(function(id){return get(id)});renderAll();histUI();clearTimeout(saveT);saveT=setTimeout(save,350)}
$('saveBtn').addEventListener('click',function(ev){
  if(ev.isTrusted){if(editing)endEdit();if(editB)endBase()}
  save();if(!EMBED){var s=$('saveStatus');s.textContent='Saved';setTimeout(function(){s.textContent=''},2000)}
});

/* free text edit */
function startEdit(id,all){
  var el=get(id);if(!el||el.t!=='text')return;
  select(id);var n=node(id),t=n.firstChild;editing={id:id,t:t};
  t.contentEditable='true';t.focus();
  var r=document.createRange();r.selectNodeContents(t);if(!all)r.collapse(false);
  var s=getSelection();s.removeAllRanges();s.addRange(r);
  t.addEventListener('blur',endEdit,{once:true});
}
function endEdit(){
  if(!editing)return;var e=editing;editing=null;var el=get(e.id);
  e.t.contentEditable='false';
  if(el){var v=e.t.innerText.replace(/\n$/,'');if(v!==el.text){el.text=v;commit()}}
  getSelection().removeAllRanges();
}
/* base text edit */
function startBase(n){
  if(editing)endEdit();if(editB)endBase();
  select(null);editB=n;n.contentEditable='true';n.focus();
  var r=document.createRange();r.selectNodeContents(n);var s=getSelection();s.removeAllRanges();s.addRange(r);
  n.addEventListener('blur',endBase,{once:true});
}
function endBase(){
  if(!editB)return;var n=editB;editB=null;n.contentEditable='false';
  var v=n.innerText.replace(/\n/g,' ').trim();
  if(S.tx[n.dataset.k]!==v){S.tx[n.dataset.k]=v;n.textContent=v;commit()}
  getSelection().removeAllRanges();
}

/* add / remove */
function addText(){var el=txt('Your text',(W-500)/2,420,500,40,{bold:true});S.els.push(el);sels=[el.id];render();commit();startEdit(el.id,true)}
function addImage(url,cx,cy){
  var im=new Image();
  im.onload=function(){
    var r=(im.naturalWidth/im.naturalHeight)||1,w=360,h=w/r;if(h>480){h=480;w=h*r}
    w=Math.round(w);h=Math.round(h);
    var x=cx==null?(W-w)/2:cx-w/2,y=cy==null?(H-h)/2:cy-h/2;
    var el={id:uid(),t:'img',src:url,x:Math.round(x),y:Math.round(y),w:w,h:h,flip:false};
    S.els.push(el);sels=[el.id];render();commit();
  };
  im.src=url;
}
function del(){if(!sels.length)return;var s=sels.slice();S.els=S.els.filter(function(x){return s.indexOf(x.id)<0});sels=[];render();commit()}
function dup(){if(!sels.length)return;var out=[];selEls().forEach(function(el){var c=JSON.parse(JSON.stringify(el));c.id=uid();c.x+=24;c.y+=24;S.els.push(c);out.push(c.id)});sels=out;render();commit()}
function order(front){
  if(!sels.length)return;
  var s=sels.slice(),mine=S.els.filter(function(x){return s.indexOf(x.id)>=0}),rest=S.els.filter(function(x){return s.indexOf(x.id)<0});
  S.els=front?rest.concat(mine):mine.concat(rest);render();commit();
}

/* palette math (same as the book style bar) */
var hex2rgb=function(h){h=String(h||'').replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return /^[0-9a-f]{6}$/i.test(h)?[0,2,4].map(function(i){return parseInt(h.substr(i,2),16)}):null};
var rgb2hex=function(c){return '#'+c.map(function(v){return Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')}).join('')};
var lin=function(v){v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
var Yl=function(c){return 0.2126*lin(c[0])+0.7152*lin(c[1])+0.0722*lin(c[2])};
function ramp(P){
  var st=['title','text','accent','accent2','border','pale'].map(function(k){return hex2rgb(P[k])}).filter(Boolean).map(function(c){return {y:Yl(c),c:c}});
  st.sort(function(a,b){return a.y-b.y});
  var out=[],bg=hex2rgb(P.bg||'#ffffff');
  st.forEach(function(s){if(!out.length||s.y-out[out.length-1].y>0.004)out.push(s)});
  if(bg)out.push({y:Math.max(1,out[out.length-1].y+0.001),c:bg});
  return out;
}
function mapColor(orig,R){
  var c=hex2rgb(orig);if(!c||!R.length)return null;var y=Yl(c);
  if(y<=R[0].y)return rgb2hex(R[0].c);
  for(var i=1;i<R.length;i++){if(y<=R[i].y){var a=R[i-1],b=R[i],t=(y-a.y)/(b.y-a.y||1);return rgb2hex(a.c.map(function(v,k){return v+(b.c[k]-v)*t}))}}
  return rgb2hex(R[R.length-1].c);
}

/* ---------- editor only ---------- */
if(!EMBED){
pageEl.addEventListener('pointerdown',function(e){
  var n=e.target.closest('.el');
  if(editB&&e.target.closest('.ed')===editB)return;
  if(editing&&n&&n.contains(editing.t))return;
  if(editing)endEdit();if(editB)endBase();
  if(!n){select(null);return}
  var id=n.dataset.id;
  if(e.shiftKey||e.ctrlKey||e.metaKey){select(id,true);e.preventDefault();return}
  var handle=!!e.target.closest('.resize-handle');
  if(sels.indexOf(id)<0)select(id);
  var el=get(id);
  drag={mode:(handle&&sels.length===1)?'resize':'move',sx:e.clientX,sy:e.clientY,ew:el.w,eh:el.h,moved:false,id:id,items:sels.map(function(i){var x=get(i);return {id:i,ex:x.x,ey:x.y}})};
  try{pageEl.setPointerCapture(e.pointerId)}catch(_){}
  e.preventDefault();
});
pageEl.addEventListener('pointermove',function(e){
  if(!drag)return;
  var s=sc(),dx=(e.clientX-drag.sx)/s,dy=(e.clientY-drag.sy)/s;
  if(Math.abs(dx)+Math.abs(dy)>1)drag.moved=true;
  if(drag.mode==='move'){drag.items.forEach(function(it){var el=get(it.id),n=node(it.id);if(!el||!n)return;el.x=Math.round(it.ex+dx);el.y=Math.round(it.ey+dy);geom(n,el)})}
  else{var el=get(drag.id),n=node(drag.id);if(!el||!n)return;
    if(el.t==='img'){var r=drag.ew/drag.eh;el.w=Math.max(40,Math.round(drag.ew+dx));el.h=Math.round(el.w/r)}else el.w=Math.max(80,Math.round(drag.ew+dx));
    geom(n,el)}
});
function endDrag(){if(!drag)return;var m=drag.moved;drag=null;if(m)commit()}
pageEl.addEventListener('pointerup',endDrag);pageEl.addEventListener('pointercancel',endDrag);
pageEl.addEventListener('click',function(e){
  if(drag||e.target.closest('.el'))return;
  var ed=e.target.closest('.ed');if(ed&&ed!==editB)startBase(ed);
});
pageEl.addEventListener('dblclick',function(e){
  var n=e.target.closest('.el');
  if(n){if(get(n.dataset.id).t==='text')startEdit(n.dataset.id,false);return}
  var ed=e.target.closest('.ed');if(ed)startBase(ed);
});
pageEl.addEventListener('paste',function(e){
  if(!editing&&!editB)return;e.preventDefault();
  document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain'));
});
pageEl.addEventListener('dragover',function(e){e.preventDefault()});
pageEl.addEventListener('drop',function(e){
  e.preventDefault();var d=e.dataTransfer.getData('text/plain')||'';if(d.indexOf('cb:')!==0)return;
  var r=pageEl.getBoundingClientRect(),s=sc();addImage(d.slice(3),(e.clientX-r.left)/s,(e.clientY-r.top)/s);
});
document.addEventListener('keydown',function(e){
  var mod=e.ctrlKey||e.metaKey;
  if(editing){if(e.key==='Escape')editing.t.blur();return}
  if(editB){if(e.key==='Escape'||e.key==='Enter'){e.preventDefault();editB.blur()}return}
  var tag=(e.target&&e.target.tagName)||'';if(/INPUT|SELECT|TEXTAREA/.test(tag))return;
  if(mod&&e.key.toLowerCase()==='a'){e.preventDefault();selectAll();return}
  if(mod&&e.key.toLowerCase()==='z'){e.preventDefault();if(e.shiftKey){if(hi<hist.length-1)restore(hi+1)}else if(hi>0)restore(hi-1);return}
  if(mod&&e.key.toLowerCase()==='y'){e.preventDefault();if(hi<hist.length-1)restore(hi+1);return}
  if(!sels.length)return;
  if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();del();return}
  var st=e.shiftKey?10:1,mv={ArrowLeft:[-st,0],ArrowRight:[st,0],ArrowUp:[0,-st],ArrowDown:[0,st]}[e.key];
  if(mv){e.preventDefault();selEls().forEach(function(el){el.x+=mv[0];el.y+=mv[1];var n=node(el.id);if(n)geom(n,el)});commit()}
});
var fSel=$('fFont');fSel.appendChild(new Option('Palette font',''));
FONTS.forEach(function(f){var o=new Option(f[1],f[0]);o.style.fontFamily=f[0];fSel.appendChild(o)});
function selText(fn,doCommit){var any=false;selEls().forEach(function(el){if(el.t==='text'){fn(el);any=true;var n=node(el.id);if(n)styleTxt(n,el)}});if(!any)return;selUI();if(doCommit)commit()}
var lastTx=function(){return selEls().filter(function(e){return e.t==='text'}).pop()||{}};
$('fRole').addEventListener('change',function(){selText(function(el){el.role=$('fRole').value},true)});
fSel.addEventListener('change',function(){selText(function(el){el.font=fSel.value||null},true)});
$('fSize').addEventListener('input',function(){var v=Math.max(8,Math.min(240,+$('fSize').value||40));selText(function(el){el.size=v},false)});
$('fSize').addEventListener('change',function(){commit()});
$('fColor').addEventListener('input',function(){selText(function(el){el.color=$('fColor').value},false)});
$('fColor').addEventListener('change',function(){commit()});
$('fBold').addEventListener('click',function(){var v=!lastTx().bold;selText(function(el){el.bold=v},true)});
$('fItal').addEventListener('click',function(){var v=!lastTx().italic;selText(function(el){el.italic=v},true)});
$('aL').addEventListener('click',function(){selText(function(el){el.align='left'},true)});
$('aC').addEventListener('click',function(){selText(function(el){el.align='center'},true)});
$('aR').addEventListener('click',function(){selText(function(el){el.align='right'},true)});
$('fReset').addEventListener('click',function(){selText(function(el){el.color=null;el.font=null},true)});
$('iFlip').addEventListener('click',function(){var v=null;selEls().forEach(function(el){if(el.t!=='img')return;if(v===null)v=!el.flip;el.flip=v;var n=node(el.id);if(n)n.querySelector('img').style.transform=v?'scaleX(-1)':''});selUI();commit()});
$('oFront').addEventListener('click',function(){order(true)});$('oBack').addEventListener('click',function(){order(false)});
$('oDup').addEventListener('click',dup);$('oDel').addEventListener('click',del);
$('addText').addEventListener('click',addText);
var zoom=null,curS=1,ZSTEPS=[.25,.35,.5,.6,.75,.9,1,1.25,1.5,2,2.5,3];
function setZoom(ns,cx,cy){
  var r=pageEl.getBoundingClientRect(),k=sc();
  if(cx==null){cx=innerWidth/2+150;cy=innerHeight/2}
  var px=(cx-r.left)/k,py=(cy-r.top)/k;
  zoom=ns;layout();
  if(ns==null){window.scrollTo(0,0);return}
  var r2=pageEl.getBoundingClientRect(),k2=sc();
  window.scrollBy(r2.left+px*k2-cx,r2.top+py*k2-cy);
}
if(!EMBED){
  var zb=document.createElement('div');zb.id='jdZoom';
  zb.innerHTML='<button type="button" id="zOut" title="Zoom out">&minus;</button><span id="zPct"></span><button type="button" id="zIn" title="Zoom in">+</button><button type="button" id="zFit" title="Fit to screen">Fit</button>';
  document.body.appendChild(zb);
  document.getElementById('zIn').addEventListener('click',function(){var n=null;for(var i=0;i<ZSTEPS.length;i++)if(ZSTEPS[i]>curS*1.01){n=ZSTEPS[i];break}setZoom(n==null?3:n)});
  document.getElementById('zOut').addEventListener('click',function(){var n=null;for(var i=ZSTEPS.length-1;i>=0;i--)if(ZSTEPS[i]<curS*0.99){n=ZSTEPS[i];break}setZoom(n==null?.25:n)});
  document.getElementById('zFit').addEventListener('click',function(){setZoom(null)});
  document.addEventListener('wheel',function(e){if(!(e.ctrlKey||e.metaKey))return;e.preventDefault();setZoom(Math.max(.25,Math.min(4,curS*Math.exp(-e.deltaY*0.0025))),e.clientX,e.clientY)},{passive:false});
  layout();
}
if(!M.illus){var ig=$('catSel').parentNode;ig.style.display='none';var sb=document.querySelector('.sidebar .sub');if(sb)sb.textContent='Click any text on the page to edit it. Add your own text'+(M.photo?' or photo':'')+' on top.'}
if(M.photo){$('photoBtn').hidden=false;
  $('photoBtn').addEventListener('click',function(){$('photoFile').click()});
  $('photoFile').addEventListener('change',function(){var f=this.files&&this.files[0];this.value='';if(!f)return;
    var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){
      var tg=null;sels.forEach(function(i){var e=get(i);if(e&&e.ph)tg=e});if(!tg)tg=S.els.filter(function(e){return e.ph})[0]||null;
      var circ=tg?tg.ph==='circle':true,ar=tg?tg.w/tg.h:1,sw=im.naturalWidth,sh=im.naturalHeight,cw,ch;
      if(sw/sh>ar){ch=sh;cw=sh*ar}else{cw=sw;ch=sw/ar}
      var ow=Math.min(520,Math.round(cw)),oh=Math.round(ow/ar),cv=document.createElement('canvas');cv.width=ow;cv.height=oh;var c=cv.getContext('2d');
      if(circ){c.beginPath();c.ellipse(ow/2,oh/2,ow/2,oh/2,0,0,7);c.clip()}
      c.drawImage(im,(sw-cw)/2,(sh-ch)/2,cw,ch,0,0,ow,oh);
      var url=circ?cv.toDataURL('image/png'):cv.toDataURL('image/jpeg',.88);
      if(tg){tg.src=url;tg.ph=tg.ph;sels=[tg.id];render();commit()}
      else{var el={id:uid(),t:'img',src:url,x:Math.round((W-220)/2),y:300,w:220,h:220,flip:false,ph:'circle'};S.els.push(el);sels=[el.id];render();commit()}
    };im.src=rd.result};rd.readAsDataURL(f)});
}$('selAllBtn').addEventListener('click',selectAll);
$('pgBg').addEventListener('input',function(){S.bg=$('pgBg').value;applyPage()});$('pgBg').addEventListener('change',commit);
$('bdOn').addEventListener('change',function(){S.bd.on=$('bdOn').checked;applyPage();commit()});
$('bdCol').addEventListener('input',function(){S.bd.c=$('bdCol').value;applyPage()});$('bdCol').addEventListener('change',commit);
$('bdW').addEventListener('change',function(){S.bd.w=Math.max(1,Math.min(20,+$('bdW').value||4));applyPage();commit()});
$('undoBtn').addEventListener('click',function(){if(hi>0)restore(hi-1)});
$('redoBtn').addEventListener('click',function(){if(hi<hist.length-1)restore(hi+1)});
$('exportPdfBtn').addEventListener('click',function(){select(null);window.print()});
window.addEventListener('resize',layout);

/* month / year */
if(M.cal){
  $('calGrp').hidden=false;
  MN.forEach(function(n,i){$('calM').appendChild(new Option(n,i))});
  if(M.cal==='year')$('calM').hidden=true;
  $('calM').addEventListener('change',function(){S.cal.m=+$('calM').value;renderBase();commit()});
  $('calY').addEventListener('change',function(){S.cal.y=Math.max(1900,Math.min(2200,+$('calY').value||S.cal.y));renderBase();commit()});
}

/* palette + fonts for this page only */
function pgStore(){try{return JSON.parse(localStorage.getItem('jdstyle_pages'))||{}}catch(e){return {}}}
function glTheme(){try{return JSON.parse(localStorage.getItem('jdstyle_theme'))||{}}catch(e){return {}}}
function pageTheme(){return pgStore()[SLOT]||glTheme()}
function setPageTheme(p){if(!SLOT)return;try{var pg=pgStore();pg[SLOT]=Object.assign({},pg[SLOT]||glTheme(),p);localStorage.setItem('jdstyle_pages',JSON.stringify(pg))}catch(e){}}
var dotsUI=function(){var cur=pageTheme(),pt=cur.pal||null;[].forEach.call($('pDots').querySelectorAll('.d'),function(b){b.classList.toggle('on',b.dataset.id===pt)});$('tbH').value=cur.fh||'';$('tbB').value=cur.fb||''};
function paletteApply(P){var R=P?ramp(P):null;['title','text','accent','pale','bg'].forEach(function(k){S.th[k]=P?mapColor(DEF[k],R):DEF[k]});applyPage();restyleTexts();commit()}
PAL.forEach(function(p){
  var b=document.createElement('button');b.type='button';b.className='d';b.dataset.id=p.id;b.title=p.name;
  b.style.background='linear-gradient(135deg,'+p.title+' 0 38%,'+p.accent+' 38% 70%,'+p.accent2+' 70%)';
  b.addEventListener('click',function(){setPageTheme({pal:p.id});paletteApply(p);dotsUI()});
  $('pDots').appendChild(b);
});
$('pL').addEventListener('click',function(){$('pDots').scrollLeft-=150});$('pR').addEventListener('click',function(){$('pDots').scrollLeft+=150});
FONTS.forEach(function(f){['tbH','tbB'].forEach(function(id){var o=new Option(f[1],f[0]);o.style.fontFamily=f[0];$(id).appendChild(o)})});
$('tbH').addEventListener('change',function(){var v=$('tbH').value;setPageTheme({fh:v||null});S.th.fh=v||DEF.fh;applyPage();restyleTexts();commit()});
$('tbB').addEventListener('change',function(){var v=$('tbB').value;setPageTheme({fb:v||null});S.th.fb=v||DEF.fb;applyPage();restyleTexts();commit()});
$('tbO').addEventListener('click',function(){setPageTheme({pal:null,fh:null,fb:null});S.th=Object.assign({},DEF);S.els.forEach(function(el){if(el.t==='text'){el.color=null;el.font=null}});applyPage();restyleTexts();commit();dotsUI()});

/* illustrations */
var CAT=[];
fetch('library/catalogue.json').then(function(r){return r.json()}).then(function(d){
  CAT=d;var s_=$('catSel');s_.innerHTML='';
  Object.keys(FAM).forEach(function(k){
    var items=d.filter(function(c){return c.code.slice(-1)===k});if(!items.length)return;
    var g=document.createElement('optgroup');g.label=FAM[k];
    items.forEach(function(c){var o=document.createElement('option');o.value=c.code;o.textContent=c.name+' ('+c.count+')';g.appendChild(o)});
    s_.appendChild(g);
  });
  showCat();
}).catch(function(){$('catSel').innerHTML='<option>Library unavailable</option>'});
function showCat(){
  var c=CAT.filter(function(x){return x.code===$('catSel').value})[0],g=$('imgGrid');g.innerHTML='';if(!c)return;
  c.files.forEach(function(f){
    var b=document.createElement('button');b.type='button';b.draggable=true;b.title=f.replace('.webp','');
    var i=document.createElement('img');i.loading='lazy';i.alt='';i.src='library/thumb/'+c.folder+'/'+f;b.appendChild(i);
    var full='library/full/'+c.folder+'/'+f;
    b.addEventListener('click',function(){addImage(full)});
    b.addEventListener('dragstart',function(e){e.dataTransfer.setData('text/plain','cb:'+full);e.dataTransfer.effectAllowed='copy'});
    g.appendChild(b);
  });
}
$('catSel').addEventListener('change',showCat);
}

FONTS.forEach(function(f){['fontHeading','fontBody'].forEach(function(id){$(id).appendChild(new Option(f[1],f[0]))})});
load();layout();renderAll();pushHist();
if(!EMBED){histUI();dotsUI();document.addEventListener('DOMContentLoaded',layout);setTimeout(layout,400)}
})();
