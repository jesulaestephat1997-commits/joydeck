/* Emadeck - modeles Quotes (autonome) */
(function(){
'use strict';
var P=window.PLANNER_MODELS=window.PLANNER_MODELS||{};
function add(id,name,o){o.name=name;P[id]=o}
function E(t,c,st){return '<span class="ed'+(c?' '+c:'')+'"'+(st?' style="'+st+'"':'')+'>'+t+'</span>'}
function U(svg){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function TH(t,x,a,p,b,f,g){return {title:t,text:x,accent:a,pale:p,bg:b,fh:f,fb:g||f}}
function D(st,inner){return '<div style="'+st+'">'+inner+'</div>'}
function A(l,t,w,h,inner,st){return '<div style="position:absolute;left:'+l+'px;top:'+t+'px;width:'+w+'px;'+(h?'height:'+h+'px;':'')+(st||'')+'">'+inner+'</div>'}
function ph(id,x,y,w,h,shape,bg,fg){
  var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><defs><clipPath id="c"><'+(shape==='circle'?'ellipse cx="'+w/2+'" cy="'+h/2+'" rx="'+w/2+'" ry="'+h/2+'"':'rect width="'+w+'" height="'+h+'"')+'/></clipPath></defs><g clip-path="url(#c)"><rect width="'+w+'" height="'+h+'" fill="'+(bg||'#D9D9D9')+'"/><circle cx="'+w/2+'" cy="'+h*.38+'" r="'+Math.min(w,h)*.17+'" fill="'+(fg||'#B5B5B5')+'"/><ellipse cx="'+w/2+'" cy="'+h*1.0+'" rx="'+w*.36+'" ry="'+h*.34+'" fill="'+(fg||'#B5B5B5')+'"/></g></svg>';
  return {id:id,t:'img',src:U(svg),x:x,y:y,w:w,h:h,flip:false,ph:shape}}
function HL(w,c){return '<span style="color:'+(c||'var(--a)')+'">'+w+'</span>'}
function HB(w,bg,fg){return '<span style="background:'+bg+';color:'+fg+';padding:0 .18em;border-radius:.12em;-webkit-box-decoration-break:clone;box-decoration-break:clone">'+w+'</span>'}
/* quote mark (bold svg) */
function MK(col,w,flip){var h=w*.75;return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" width="'+w+'" height="'+h+'" style="display:block;'+(flip?'transform:rotate(180deg);':'')+'"><g fill="'+col+'"><path d="M0 26C0 11 9 2 24 0v11c-6 2-9 6-9 11h10v26H0z"/><path d="M36 26C36 11 45 2 60 0v11c-6 2-9 6-9 11h10v26H36z"/></g></svg>'}
function GL(col,sz,st){return D('font:400 '+sz+'px/.8 Georgia,"Playfair Display",serif;color:'+col+';'+(st||''),'&ldquo;')}
var NAME='Armand Bernard';
function AU(st,col){return D('display:flex;align-items:center;gap:10px;font:500 16px var(--fb);color:'+(col||'var(--x)')+';'+(st||''),'<i style="width:8px;height:8px;border-radius:50%;background:var(--a);display:block"></i>'+E(NAME))}
function LG(c){return '<i style="display:inline-block;width:22px;height:22px;border-radius:6px;background:'+(c||'currentColor')+'"></i>'}
function FT(k,c){
  if(k==='bar')return A(60,938,696,58,D('display:flex;align-items:center;justify-content:space-between;height:58px;padding:0 20px;box-sizing:border-box;color:'+(c.fc||'#111'),D('display:flex;align-items:center;gap:10px;font:700 15px var(--fb)',LG()+E('Brand Name'))+D('display:flex;gap:12px;font:500 12px var(--fb)',E('@yourhandle')+E('yourwebsite.com'))),'background:var(--a);border-radius:8px');
  if(k==='line')return A(72,968,672,0,D('display:flex;justify-content:space-between;align-items:center;font:500 13px var(--fb);color:var(--x);opacity:.75;border-top:1px solid currentColor;padding-top:14px',E('@yourhandle')+E('www.yourwebsite.com')));
  if(k==='brand')return A(0,962,816,0,D('display:flex;justify-content:center;align-items:center;gap:10px;font:700 14px var(--fb);color:var(--x);opacity:.8',LG()+E('Brand Name')));
  if(k==='pill')return A(250,950,316,44,D('display:flex;align-items:center;justify-content:center;height:44px;font:600 13px var(--fb);color:'+(c.fc||'#111'),E('Follow @yourhandle')),'background:var(--a);border-radius:30px');
  return ''}
function BG(c){return A(0,0,816,1056,c.deco||'',c.bgcss||'background:var(--bgc)')}
function DEC(k){
  if(k==='rings')return A(-200,-120,900,900,'','border:2px solid var(--p);border-radius:50%;opacity:.5')+A(-80,-40,700,700,'','border:2px solid var(--p);border-radius:50%;opacity:.5')+A(300,560,700,700,'','border:2px solid var(--p);border-radius:50%;opacity:.4');
  if(k==='blobs')return A(560,-120,420,420,'','background:var(--p);border-radius:50%;opacity:.55')+A(-140,780,380,380,'','background:var(--p);border-radius:50%;opacity:.55');
  if(k==='corner')return A(0,0,816,0,'','')+A(560,0,256,256,'','background:var(--a);border-radius:0 0 0 256px');
  if(k==='dots')return A(560,150,180,180,'','background-image:radial-gradient(var(--p) 3px,transparent 3.5px);background-size:22px 22px;opacity:.9');
  if(k==='stripes')return A(0,0,816,1056,'','background:repeating-linear-gradient(135deg,transparent 0 46px,var(--p) 46px 48px);opacity:.35');
  if(k==='bar')return A(0,0,26,1056,'','background:var(--a)');
  return ''}
/* ===== archetypes ===== */
var A_={};
A_.solid=function(c){var ctr=c.al==='center',tx=ctr?'text-align:center;':'';
  return BG(c)+DEC(c.dec)+
  A(ctr?358:84,c.my||230,100,0,MK(c.mc||'var(--a)',c.ms||100))+
  A(84,c.ty||400,648,0,D('font:'+(c.w||600)+' '+(c.sz||52)+'px/1.2 var(--fh);color:var(--t);'+tx,E(c.q||('Lorem '+HL('ipsum')+' dolor sit amet, consectetur '+HL('adipiscing')+' elit.'))))+
  A(84,c.ay||740,648,0,AU(ctr?'justify-content:center':''))+FT(c.ft,c)};
A_.bold=function(c){var t=c.q||('LOREM '+(c.box?HB('IPSUM',c.box,c.bt||'#fff'):HL('IPSUM'))+' DOLOR SIT '+HL('AMET'));
  return BG(c)+DEC(c.dec)+
  A(64,c.ty||150,688,0,D('font:'+(c.w||900)+' '+(c.sz||112)+'px/.98 var(--fh);color:var(--t);text-transform:uppercase;letter-spacing:-.01em;'+(c.ta||''),E(t)))+
  A(64,c.sy||760,420,0,D('font:400 17px/1.5 var(--fb);color:var(--x)',E('Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.')))+
  A(64,c.ay||890,500,0,AU(''))+FT(c.ft,c)};
A_.bubble=function(c){
  return BG(c)+DEC(c.dec)+
  A(72,c.by||230,672,c.bh||400,'','background:'+c.bub+';border-radius:'+(c.r||44)+'px')+
  A(c.tx||150,(c.by||230)+(c.bh||400)-2,80,64,'','background:'+c.bub+';clip-path:polygon(0 0,100% 0,0 100%)')+
  A(124,(c.by||230)+44,80,0,MK(c.mc||'var(--a)',60))+
  A(124,(c.by||230)+140,568,0,D('font:'+(c.w||500)+' '+(c.sz||40)+'px/1.28 var(--fh);color:'+(c.bt||'var(--t)'),E(c.q||('Lorem ipsum dolor sit amet, '+HL('consectetur',c.hc)+' adipiscing elit sed do eiusmod.'))))+
  A(150,(c.by||230)+(c.bh||400)+90,500,0,AU('',c.ac2))+FT(c.ft,c)};
A_.card=function(c){
  return BG(c)+DEC(c.dec)+
  A(64,190,688,660,'','background:'+c.card+';border-radius:'+(c.r||30)+'px;'+(c.sh||'box-shadow:0 18px 50px rgba(0,0,0,.18)')+(c.bd?';border:'+c.bd:''))+
  A(354,156,108,108,D('display:flex;align-items:center;justify-content:center;height:108px',MK(c.mi||'#fff',48)),'background:'+(c.ib||'var(--a)')+';border-radius:50%')+
  A(124,330,568,0,D('text-align:center;font:'+(c.w||600)+' '+(c.sz||40)+'px/1.3 var(--fh);color:'+(c.ct||'#1a1a1a'),E(c.q||('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod tempor.'))))+
  A(124,690,568,0,D('text-align:center;font:600 17px var(--fb);color:'+(c.ct||'#1a1a1a'),E(NAME)+'<br>'+E('Lorem ipsum','',"font-weight:400;opacity:.65;font-size:14px")))+FT(c.ft||'brand',c)};
A_.photo=function(c){var v=c.v,o=BG(c)+DEC(c.dec);
  if(v==='top')return o+
    A(298,130,220,220,'','border:5px solid var(--a);border-radius:50%;box-sizing:border-box;width:220px;height:220px')+
    A(90,400,636,0,D('text-align:center',MK('var(--a)',54).replace('display:block','display:block;margin:0 auto'))+D('font:'+(c.w||500)+' '+(c.sz||38)+'px/1.32 var(--fh);color:var(--t);margin-top:22px',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod tempor.')))+
    A(0,830,816,0,D('text-align:center;font:700 20px var(--fb);color:var(--t)',E(NAME))+D('text-align:center;font:400 15px var(--fb);color:var(--x);margin-top:4px',E('Lorem ipsum')))+FT(c.ft,c);
  if(v==='half')return A(0,520,816,536,'','background:'+(c.panel||'var(--bgc)'))+A(70,570,90,0,MK('var(--a)',60))+
    A(70,670,676,0,D('font:'+(c.w||600)+' '+(c.sz||40)+'px/1.28 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod.')))+A(70,900,500,0,AU(''))+FT(c.ft,c);
  if(v==='right')return o+A(64,170,100,0,MK('var(--a)',70))+
    A(64,300,330,0,D('font:'+(c.w||700)+' '+(c.sz||32)+'px/1.25 var(--fh);color:var(--t)',E('Lorem ipsum '+HL('dolor sit')+' amet, consectetur adipiscing elit sed do eiusmod tempor.')))+A(64,830,330,0,D('font:800 20px var(--fb);color:var(--t);text-transform:uppercase;letter-spacing:.06em',E('Armand Bernard'))+D('font:400 14px var(--fb);color:var(--x);margin-top:4px',E('Lorem ipsum')))+FT(c.ft,c);
  if(v==='badge')return o+A(84,200,100,0,MK('var(--a)',90))+
    A(84,360,648,0,D('font:'+(c.w||600)+' '+(c.sz||50)+'px/1.2 var(--fh);color:var(--t)',E('Lorem '+HL('ipsum')+' dolor sit amet, consectetur '+HL('adipiscing')+' elit.')))+
    A(170,800,500,0,D('font:700 20px var(--fb);color:var(--t);padding-top:14px',E(NAME))+D('font:400 15px var(--fb);color:var(--x);margin-top:4px',E('Lorem ipsum')))+FT(c.ft,c);
  if(v==='card')return o+A(70,150,676,640,'','background:'+c.card+';border-radius:34px')+
    A(150,226,100,0,MK('var(--a)',50))+
    A(150,310,516,0,D('font:'+(c.w||500)+' '+(c.sz||34)+'px/1.32 var(--fh);color:'+(c.ct||'var(--t)'),E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod tempor incididunt.')))+
    A(250,690,420,0,D('font:700 20px var(--fb);color:'+(c.ct||'var(--t)'),E(NAME))+D('font:400 14px var(--fb);color:'+(c.ct||'var(--x)')+';opacity:.7;margin-top:4px',E('Lorem ipsum')))+FT(c.ft,c);
  return o};
A_.frame=function(c){
  return BG(c)+
  A(72,220,672,520,'','border:3px solid var(--a);border-radius:'+(c.r||36)+'px;box-sizing:border-box;height:520px')+
  A(120,186,92,64,D('display:flex;justify-content:center;padding-top:4px',MK('var(--a)',52)),'background:'+c.pb+';height:64px')+
  A(130,310,556,0,D('text-align:center;font:'+(c.w||500)+' '+(c.sz||42)+'px/1.3 var(--fh);color:var(--t)',E('&ldquo;Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod.&rdquo;')))+
  A(130,650,556,0,D('text-align:center;font:600 16px var(--fb);color:var(--x);letter-spacing:.08em',E('- '+NAME)))+FT(c.ft||'brand',c)};
A_.glass=function(c){
  return BG(c)+A(420,60,420,420,'','background:'+c.glow+';border-radius:50%;filter:blur(60px);opacity:.65')+
  A(72,250,672,470,'','background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.35);border-radius:40px;box-sizing:border-box;height:470px')+
  A(124,290,90,0,MK('var(--a)',60))+
  A(124,400,568,0,D('font:'+(c.w||600)+' '+(c.sz||40)+'px/1.28 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod tempor.')))+
  A(124,640,568,0,D('display:flex;justify-content:space-between;align-items:center;font:600 16px var(--fb);color:var(--t)',E('- '+NAME)+(c.stars?E('&#9733;&#9733;&#9733;&#9733;&#9733;','','color:var(--a);letter-spacing:.1em'):'')))+FT(c.ft||'brand',c)};
A_.dyk=function(c){
  return BG(c)+DEC(c.dec)+
  A(64,130,688,0,D('font:'+(c.w||900)+' '+(c.sz||96)+'px/1 var(--fh);color:var(--t);text-transform:uppercase',E(c.h||('DID YOU '+HL('KNOW?')))))+
  A(64,c.py||380,620,0,D('font:'+(c.pw||600)+' 34px/1.35 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod tempor incididunt ut labore.')))+
  A(64,c.cy||660,688,0,D('background:'+c.box+';border-radius:22px;padding:30px 34px;font:400 19px/1.55 var(--fb);color:'+(c.bt||'var(--x)'),E('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.')))+FT(c.ft,c)};
A_.stack=function(c){
  return BG(c)+(c.circ?A(430,640,520,520,'','background:'+c.circ+';border-radius:50%'):'')+(c.circ?A(560,740,110,0,MK(c.mi||'#fff',90)):'')+
  A(64,120,700,0,D('font:'+(c.w||800)+' '+(c.sz||150)+'px/.95 var(--fh);color:var(--t);letter-spacing:-.02em',E(c.q||('Lorem<br>'+HB('ipsum',c.hb||'var(--a)',c.ht||'#111')+'<br>dolor<br>sit amet'))))+
  A(64,c.sy||800,360,0,D('font:400 17px/1.5 var(--fb);color:var(--x)',E('Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.')))+A(64,c.ay||930,400,0,AU(''))};
A_.giant=function(c){
  return BG(c)+A(c.gx||100,c.gy||60,700,0,D('opacity:'+(c.go||.5),MK('var(--p)',c.gs||620)))+
  A(90,c.ty||380,636,0,D('text-align:center;font:'+(c.w||600)+' '+(c.sz||52)+'px/1.2 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit.')))+
  A(90,c.ay||760,636,0,AU('justify-content:center'))+FT(c.ft||'line',c)};
/* ===== registry ===== */
var F={mo:"'Montserrat', sans-serif",po:"'Poppins', sans-serif",ou:"'Outfit', sans-serif",pf:"'Playfair Display', serif",cg:"'Cormorant Garamond', serif",ab:"'Abril Fatface', serif",sg:"'Space Grotesk', sans-serif",br:"'Bricolage Grotesque', sans-serif",in:"'Inter', sans-serif",bk:"'Libre Baskerville', serif"};
function reg(id,name,arch,c,photos){
  add(id,name,{photo:!!photos,
    preset:function(s){s.th=TH(c.fg,c.fg2||c.fg,c.ac,c.p||c.ac,c.bg,F[c.f||'mo'],F[c.fb||c.f||'mo']);
      (photos||[]).forEach(function(p){s.els.push(ph.apply(null,p))})},
    html:function(){return A_[arch](c)}})}
/* ---- QTA: bold colour ---- */
reg('qt-green-mark','Quote - green with yellow bar','solid',{bg:'#06402E',fg:'#FFFFFF',ac:'#E4FF2C',p:'#0D5A43',f:'ou',dec:'rings',ft:'bar',fc:'#111'});
reg('qt-navy-mark','Quote - navy remarkable','solid',{bg:'#233A57',fg:'#FFFFFF',ac:'#FFFFFF',p:'#3B557A',f:'in',dec:'',ft:'line',w:400,mc:'#FFFFFF'});
reg('qt-orange-black','Quote - black and orange','solid',{bg:'#111111',fg:'#FFFFFF',ac:'#FF6A1A',p:'#2A2A2A',f:'sg',dec:'corner',ft:'pill',fc:'#111'});
reg('qt-yellow-big','Quote - yellow big marks','solid',{bg:'#FFD84A',fg:'#111111',ac:'#111111',p:'#F2C418',f:'ou',dec:'blobs',w:700,ft:'line',mc:'#111'});
reg('qt-cream-green','Quote - cream and green','solid',{bg:'#F2EEE3',fg:'#1E4D36',ac:'#2E8B57',p:'#E2DCC8',f:'pf',dec:'dots',ft:'line',w:500});
reg('qt-blue-white','Quote - electric blue','solid',{bg:'#1F4FE0',fg:'#FFFFFF',ac:'#FFD84A',p:'#3F6CF0',f:'po',dec:'rings',ft:'pill',fc:'#111'});
reg('qt-red-white','Quote - red bold','solid',{bg:'#D6242B',fg:'#FFFFFF',ac:'#FFFFFF',p:'#E6484E',f:'mo',dec:'stripes',ft:'brand',w:700,mc:'#FFFFFF'});
reg('qt-lilac-center','Quote - lilac centered','solid',{bg:'#EDE7FA',fg:'#2A1F55',ac:'#7C4DFF',p:'#D9CEF5',f:'br',dec:'blobs',al:'center',ft:'brand'});
reg('qt-teal-clean','Quote - teal clean','solid',{bg:'#0F5C63',fg:'#FFFFFF',ac:'#9BF0E1',p:'#17737B',f:'ou',dec:'dots',ft:'line'});
reg('qt-sand-serif','Quote - sand serif','solid',{bg:'#E9DFD0',fg:'#3A2A1E',ac:'#B5651D',p:'#D9CCB8',f:'cg',dec:'bar',w:600,sz:62,ft:'line'});
/* ---- QTB: cards and bubbles ---- */
reg('qt-bubble-orange','Quote - orange speech bubble','bubble',{bg:'#ECECEC',fg:'#111',ac:'#FF6A1A',p:'#FFB48A',bub:'#FF6A1A',bt:'#FFFFFF',mc:'#FFFFFF',ac2:'#111',f:'ou',ft:'line',hc:'#111'});
reg('qt-bubble-yellow','Quote - yellow bubble on dark','bubble',{bg:'#222222',fg:'#FFFFFF',ac:'#FFC400',p:'#444',bub:'#FFC400',bt:'#111111',mc:'#111',ac2:'#fff',f:'mo',ft:'brand',hc:'#111'});
reg('qt-bubble-blue','Quote - blue bubble','bubble',{bg:'#EAF0FF',fg:'#12233F',ac:'#1F4FE0',p:'#C8D6FF',bub:'#1F4FE0',bt:'#FFFFFF',mc:'#FFD84A',ac2:'#12233F',f:'po',ft:'line',hc:'#FFD84A'});
reg('qt-bubble-green','Quote - green bubble','bubble',{bg:'#F4F1E8',fg:'#0B3D2B',ac:'#1C8A5B',p:'#CFE6DA',bub:'#0B3D2B',bt:'#FFFFFF',mc:'#9BF0B8',ac2:'#0B3D2B',f:'ou',ft:'line',hc:'#9BF0B8'});
reg('qt-card-green','Quote - white card on green','card',{bg:'#2E9E4F',fg:'#fff',ac:'#2E9E4F',p:'#52B86E',card:'#FFFFFF',f:'po',ft:'brand',dec:'rings',ct:'#222'});
reg('qt-card-blue','Quote - white card on blue','card',{bg:'#0B2A8F',fg:'#fff',ac:'#1F4FE0',p:'#2145B8',card:'#FFFFFF',f:'in',ft:'brand',ct:'#10204F',mi:'#fff'});
reg('qt-card-orange','Quote - tiled orange','card',{bg:'#FF5A2B',fg:'#fff',ac:'#FFC4AE',p:'#FF7A52',card:'#FF7442',f:'br',ft:'brand',ct:'#FFFFFF',sh:'box-shadow:none;border:2px solid rgba(255,255,255,.55)',ib:'#FFFFFF',mi:'#FF5A2B',dec:'stripes'});
reg('qt-card-dark','Quote - dark card','card',{bg:'#0E0E10',fg:'#fff',ac:'#E4FF2C',p:'#1D1D20',card:'#1A1A1D',f:'sg',ft:'brand',ct:'#FFFFFF',mi:'#111',sh:'box-shadow:none;border:1px solid #333'});
reg('qt-card-cream','Quote - beige soft card','card',{bg:'#EBE1D0',fg:'#3A2A1E',ac:'#B5651D',p:'#DACDB5',card:'#FAF6EE',f:'cg',ft:'brand',ct:'#3A2A1E',w:600,sz:46,r:200});
reg('qt-card-pink','Quote - pink round card','card',{bg:'#F8D7E0',fg:'#5A1F37',ac:'#D6336C',p:'#F2B6C8',card:'#FFFFFF',f:'pf',ft:'brand',ct:'#5A1F37',r:60,w:500});
/* ---- QTC: typographic ---- */
reg('qt-bold-blue','Quote - do more think less','bold',{bg:'#EEF0F4',fg:'#1237B8',ac:'#1237B8',p:'#C9D2EE',f:'mo',sz:118,ft:'line',ay:880});
reg('qt-bold-lime','Quote - lime highlight','bold',{bg:'#111111',fg:'#FFFFFF',ac:'#C8F31D',p:'#2A2A2A',f:'mo',box:'#C8F31D',bt:'#111',sz:112,ft:'pill',fc:'#111'});
reg('qt-bold-black-yellow','Quote - yellow poster','bold',{bg:'#FFD21F',fg:'#111111',ac:'#111111',p:'#F2C418',f:'ab',sz:128,w:400,ft:'line'});
reg('qt-bold-money','Quote - blue branding','bold',{bg:'#2B5BFF',fg:'#FFFFFF',ac:'#FFFFFF',p:'#4A74FF',f:'mo',sz:104,box:'#FFFFFF',bt:'#2B5BFF',ft:'brand'});
reg('qt-bold-green-glow','Quote - smart not hard','bold',{bg:'#050505',fg:'#FFFFFF',ac:'#33E06B',p:'#0F3D22',f:'mo',sz:108,bgcss:'background:radial-gradient(circle at 70% 90%,#0F6B35 0,#050505 60%)',ft:'brand'});
reg('qt-bold-cream','Quote - good design cream','bold',{bg:'#EAE3D2',fg:'#1A1A1A',ac:'#C23B22',p:'#D9D0BA',f:'mo',sz:96,ft:'line',ta:'letter-spacing:-.03em'});
reg('qt-stack-take','Quote - take it easy','stack',{bg:'#F1F1F1',fg:'#111111',ac:'#C8F31D',p:'#DDD',f:'mo',circ:'#111111',q:'Lorem<br>'+HB('ipsum','#C8F31D','#111')+'<br>dolor sit<br>amet',sz:140,ft:''});
reg('qt-stack-brands','Quote - we build brands','stack',{bg:'#F4F2E9',fg:'#111111',ac:'#C8F31D',p:'#DDD',f:'br',sz:96,w:700,q:'Lorem ipsum '+HB('dolor sit','#C8F31D','#111')+' amet,<br>consectetur<br>adipiscing '+HB('elit','#C8F31D','#111'),sy:700});
reg('qt-giant-mark','Quote - giant mark black','giant',{bg:'#F3F3F3',fg:'#111',ac:'#111',p:'#111',f:'in',go:.9,gs:560,gx:140,gy:40,ty:520,ay:850});
reg('qt-giant-soft','Quote - giant soft mark','giant',{bg:'#2E5BFF',fg:'#FFFFFF',ac:'#FFD84A',p:'#5D82FF',f:'po',go:.7,gs:640,gx:60,gy:80,ty:420,ay:800,ft:'brand'});
/* ---- QTD: photo quotes ---- */
reg('qt-photo-circle-green','Quote - round photo green','photo',{v:'top',bg:'#0D5C3A',fg:'#FFFFFF',ac:'#B8F04D',p:'#17754B',f:'po',ft:'brand'},[['ph1',298,130,220,220,'circle','#2E8B5E','#7CC79F']]);
reg('qt-photo-circle-cream','Quote - round photo cream','photo',{v:'top',bg:'#F3EEE4',fg:'#2A2A2A',ac:'#B5651D',p:'#E5DCC9',f:'pf',ft:'brand'},[['ph1',298,130,220,220,'circle','#D6CBB4','#A89C82']]);
reg('qt-photo-half-dark','Quote - photo top dark','photo',{v:'half',bg:'#1E2A3A',fg:'#FFFFFF',ac:'#FFC400',p:'#2C3C52',f:'mo',panel:'#14202F',ft:'line'},[['ph1',0,0,816,520,'rect','#5A6B82','#8798B0']]);
reg('qt-photo-half-light','Quote - photo top light','photo',{v:'half',bg:'#FFFFFF',fg:'#111111',ac:'#E4232B',p:'#EEE',f:'br',panel:'#FFFFFF',ft:'line'},[['ph1',0,0,816,520,'rect','#D6D6D6','#B0B0B0']]);
reg('qt-photo-right-green','Quote - photo right green','photo',{v:'right',bg:'#C7D9B8',fg:'#14301F',ac:'#1C7A44',p:'#DDE9D2',f:'ou',ft:''},[['ph1',420,260,396,796,'rect','#9DB88C','#6E9060']]);
reg('qt-photo-right-navy','Quote - photo right navy','photo',{v:'right',bg:'#0B1C3D',fg:'#FFFFFF',ac:'#FFD84A',p:'#17306A',f:'mo',ft:''},[['ph1',420,260,396,796,'rect','#3A4F7A','#6A82B0']]);
reg('qt-photo-badge','Quote - photo badge','photo',{v:'badge',bg:'#FFE27A',fg:'#111111',ac:'#111111',p:'#F2C418',f:'ab',w:400,ft:'line'},[['ph1',84,790,76,76,'circle','#C9A400','#8A7000']]);
reg('qt-photo-card-white','Quote - photo in white card','photo',{v:'card',bg:'#E3EAF8',fg:'#10204F',ac:'#1F4FE0',p:'#CCD8F2',card:'#FFFFFF',ct:'#10204F',f:'po',ft:'brand'},[['ph1',100,690,110,110,'circle','#C8D3EC','#92A3CC']]);
reg('qt-photo-badge-dark','Quote - photo badge dark','photo',{v:'badge',bg:'#121212',fg:'#FFFFFF',ac:'#FF6A1A',p:'#222',f:'sg',ft:'line'},[['ph1',84,790,76,76,'circle','#444','#777']]);
reg('qt-photo-top-orange','Quote - round photo orange','photo',{v:'top',bg:'#FF6A1A',fg:'#FFFFFF',ac:'#111111',p:'#FF8A4A',f:'ou',ft:'brand'},[['ph1',298,130,220,220,'circle','#FFB48A','#E07A3A']]);
/* ---- QTE: dark and gradient ---- */
reg('qt-frame-teal','Quote - teal frame','frame',{bg:'#0B3A3F',fg:'#FFFFFF',ac:'#B7F0E0',p:'#145058',pb:'#0B3A3F',bgcss:'background:linear-gradient(160deg,#0B3A3F,#041E22)',f:'in'});
reg('qt-frame-blue','Quote - blue frame','frame',{bg:'#0A1F5C',fg:'#FFFFFF',ac:'#FFFFFF',p:'#1A3A9C',pb:'#0A1F5C',bgcss:'background:linear-gradient(160deg,#1F4FE0,#06155A)',f:'po'});
reg('qt-frame-sunset','Quote - sunset frame','frame',{bg:'#2A1A12',fg:'#FFFFFF',ac:'#FFFFFF',p:'#6A3A24',pb:'#6D3A22',bgcss:'background:linear-gradient(180deg,#14100E 0,#14100E 45%,#B5541B 100%)',f:'br',r:60});
reg('qt-frame-green','Quote - green frame','frame',{bg:'#0F3D22',fg:'#FFFFFF',ac:'#9BF0B8',p:'#17703C',pb:'#0F3D22',bgcss:'background:linear-gradient(160deg,#17703C,#06230F)',f:'ou'});
reg('qt-glass-purple','Quote - purple glass','glass',{bg:'#2A0F6B',fg:'#FFFFFF',ac:'#F2B8FF',p:'#5B2CC2',glow:'#C45BFF',bgcss:'background:linear-gradient(160deg,#4B1FB5,#12063B)',f:'sg',stars:1});
reg('qt-glass-blue','Quote - blue glass','glass',{bg:'#0A2A8F',fg:'#FFFFFF',ac:'#FFD84A',p:'#1F4FE0',glow:'#38B6FF',bgcss:'background:linear-gradient(160deg,#1F4FE0,#06155A)',f:'po'});
reg('qt-glass-dark','Quote - dark glass','glass',{bg:'#0A0A0F',fg:'#FFFFFF',ac:'#4FA8FF',p:'#1A1A2A',glow:'#2B6BFF',bgcss:'background:#07070C',f:'in',stars:1});
reg('qt-dyk-yellow','Quote - did you know yellow','dyk',{bg:'#FFD21F',fg:'#111111',ac:'#111111',p:'#F2C418',box:'#111111',bt:'#FFFFFF',f:'mo',ft:'line'});
reg('qt-dyk-green','Quote - did you know green','dyk',{bg:'#0F5B38',fg:'#FFFFFF',ac:'#B8F04D',p:'#17754B',box:'#FFFFFF',bt:'#1A1A1A',f:'ou',ft:'brand',h:'DID YOU<br>'+HL('KNOW?')});
reg('qt-dyk-cream','Quote - did you know cream','dyk',{bg:'#EFEAE0',fg:'#1A1A1A',ac:'#FF6A1A',p:'#E0D9C8',box:'#FFFFFF',bt:'#333',f:'br',ft:'line',dec:'dots'});
window.QTK={A_:A_,reg:reg,A:A,D:D,E:E,HL:HL,HB:HB,MK:MK,AU:AU,FT:FT,BG:BG,DEC:DEC,ph:ph,U:U,F:F,NAME:NAME,add:add,TH:TH};
})();
