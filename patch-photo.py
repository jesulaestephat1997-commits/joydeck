import io
p='planner-core.js'
s=io.open(p,encoding='utf-8',newline='').read()
nl='\r\n' if '\r\n' in s else '\n'
s=s.replace('\r\n','\n')
if 'photoBtn' in s:
    print('deja patche')
    raise SystemExit
R=[
 ('\'<div class="toolbar" id="toolbar"><button id="undoBtn" type="button">&#8630; Undo</button><button id="redoBtn" type="button">&#8631; Redo</button><button id="selAllBtn" type="button">Select all</button><button id="addText" class="addtxt" type="button">Add text</button>\'+',
  '\'<div class="toolbar" id="toolbar"><button id="undoBtn" type="button">&#8630; Undo</button><button id="redoBtn" type="button">&#8631; Redo</button><button id="selAllBtn" type="button">Select all</button><button id="addText" class="addtxt" type="button">Add text</button><button id="photoBtn" type="button" hidden>Add photo</button><input type="file" id="photoFile" accept="image/*" hidden>\'+'),
 ("    if(el.flip)im.style.transform='scaleX(-1)';\n    n.appendChild(im);",
  "    if(el.flip)im.style.transform='scaleX(-1)';\n    if(el.ph)im.style.mixBlendMode='normal';\n    n.appendChild(im);"),
 ("$('addText').addEventListener('click',addText);$('selAllBtn').addEventListener('click',selectAll);",
  "$('addText').addEventListener('click',addText);\nif(M.photo){$('photoBtn').hidden=false;\n  $('photoBtn').addEventListener('click',function(){$('photoFile').click()});\n  $('photoFile').addEventListener('change',function(){var f=this.files&&this.files[0];this.value='';if(!f)return;\n    var rd=new FileReader();rd.onload=function(){var im=new Image();im.onload=function(){\n      var tg=null;sels.forEach(function(i){var e=get(i);if(e&&e.ph)tg=e});if(!tg)tg=S.els.filter(function(e){return e.ph})[0]||null;\n      var circ=tg?tg.ph==='circle':true,ar=tg?tg.w/tg.h:1,sw=im.naturalWidth,sh=im.naturalHeight,cw,ch;\n      if(sw/sh>ar){ch=sh;cw=sh*ar}else{cw=sw;ch=sw/ar}\n      var ow=Math.min(520,Math.round(cw)),oh=Math.round(ow/ar),cv=document.createElement('canvas');cv.width=ow;cv.height=oh;var c=cv.getContext('2d');\n      if(circ){c.beginPath();c.ellipse(ow/2,oh/2,ow/2,oh/2,0,0,7);c.clip()}\n      c.drawImage(im,(sw-cw)/2,(sh-ch)/2,cw,ch,0,0,ow,oh);\n      var url=circ?cv.toDataURL('image/png'):cv.toDataURL('image/jpeg',.88);\n      if(tg){tg.src=url;tg.ph=tg.ph;sels=[tg.id];render();commit()}\n      else{var el={id:uid(),t:'img',src:url,x:Math.round((W-220)/2),y:300,w:220,h:220,flip:false,ph:'circle'};S.els.push(el);sels=[el.id];render();commit()}\n    };im.src=rd.result};rd.readAsDataURL(f)});\n}$('selAllBtn').addEventListener('click',selectAll);"),
]
for x,y in R:
    if s.count(x)!=1: raise SystemExit('ERREUR motif: '+x[:50])
    s=s.replace(x,y)
io.open(p,'w',encoding='utf-8',newline='').write(s.replace('\n',nl))
print('planner-core.js patche (photo)')
