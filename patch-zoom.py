import io
p='planner-core.js'
s=io.open(p,encoding='utf-8',newline='').read()
nl='\r\n' if '\r\n' in s else '\n'
s=s.replace('\r\n','\n')
if 'jdZoom' in s:
    print('deja patche')
    raise SystemExit
R=[
("'.preview-area{margin-left:300px;padding:92px 40px 40px;display:flex;justify-content:center}',",
 "'.preview-area{margin-left:300px;padding:92px 40px 40px;display:flex;justify-content:flex-start}',"),
("'.sw{position:relative;flex:none}.stage{width:816px;height:1056px;transform-origin:0 0}',",
 "'.sw{position:relative;flex:none;margin:0 auto}.stage{width:816px;height:1056px;transform-origin:0 0}',\n'#jdZoom{position:fixed;right:26px;bottom:20px;z-index:50;display:flex;align-items:center;gap:2px;background:#fff;border:1px solid #E4E2DD;border-radius:10px;padding:3px;box-shadow:0 6px 18px rgba(0,0,0,.12)}',\n'#jdZoom button{min-width:28px;height:28px;border:0;background:transparent;border-radius:7px;font:600 13px Inter,sans-serif;color:#1A1A1A;cursor:pointer;padding:0 8px}#jdZoom button:hover{background:#F2F0EB}',\n'#jdZoom span{min-width:46px;text-align:center;font:600 12px Inter,sans-serif;color:#555}@media print{#jdZoom{display:none}}',"),
("  var s=Math.min(1,(innerWidth-300-80)/W,(innerHeight-h-24-30)/H);\n  if(!(s>0.2))s=0.2;\n",
 "  var s=Math.min(1,(innerWidth-300-80)/W,(innerHeight-h-24-30)/H);\n  if(!(s>0.2))s=0.2;\n  if(typeof zoom==='number')s=zoom;curS=s;var zp=document.getElementById('zPct');if(zp)zp.textContent=Math.round(s*100)+'%';\n"),
("$('addText').addEventListener('click',addText);",
 """$('addText').addEventListener('click',addText);
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
}"""),
]
for x,y in R:
    if s.count(x)!=1: raise SystemExit('ERREUR motif: '+x[:60])
    s=s.replace(x,y)
io.open(p,'w',encoding='utf-8',newline='').write(s.replace('\n',nl))
print('planner-core.js patche (zoom)')
