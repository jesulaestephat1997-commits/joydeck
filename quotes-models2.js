/* Emadeck - modeles Quotes 2 (photos, fonds photo, plus de styles) */
(function(){
'use strict';
var K=window.QTK;if(!K)return;
var A=K.A,D=K.D,E=K.E,HL=K.HL,HB=K.HB,MK=K.MK,AU=K.AU,FT=K.FT,BG=K.BG,DEC=K.DEC,F=K.F,NAME=K.NAME,B_={};
var Q='Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.';
function SV(w,h,inner){return K.U('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" preserveAspectRatio="none">'+inner+'</svg>')}
function IM(id,w,h,inner,x,y){return {id:id,t:'img',src:SV(w,h,inner),x:x,y:y,w:w,h:h,flip:false,nb:true}}
function GR(c1,o1,c2,o2,dir){var v=dir==='r'?'x1="0" y1="0" x2="1" y2="0"':dir==='u'?'x1="0" y1="1" x2="0" y2="0"':'x1="0" y1="0" x2="0" y2="1"';
  return '<defs><linearGradient id="g" '+v+'><stop offset="0" stop-color="'+c1+'" stop-opacity="'+o1+'"/><stop offset="1" stop-color="'+c2+'" stop-opacity="'+o2+'"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>'}
function MKS(col){return '<g fill="'+col+'"><path d="M0 26C0 11 9 2 24 0v11c-6 2-9 6-9 11h10v26H0z"/><path d="M36 26C36 11 45 2 60 0v11c-6 2-9 6-9 11h10v26H36z"/></g>'}
function MKI(id,col,w,x,y){var h=Math.round(w*.75);return {id:id,t:'img',src:K.U('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 48" width="'+w+'" height="'+h+'">'+MKS(col)+'</svg>'),x:x,y:y,w:w,h:h,flip:false,nb:true}}
/* ---- photo background preset ---- */
function PB(c){return function(s,txt){
  var o=c.ov||'bottom',oc=c.oc||'#000',oa=c.oa==null?.8:c.oa,L=c.lay||'bl',tc=c.tc||'#fff',ac=c.ac;
  if(o==='bottom')s.els.push(IM('ov',816,1056,GR(oc,0,oc,oa),0,0));
  else if(o==='top')s.els.push(IM('ov',816,1056,GR(oc,oa,oc,0),0,0));
  else if(o==='left')s.els.push(IM('ov',816,1056,GR(oc,oa,oc,0,'r'),0,0));
  else if(o==='full')s.els.push(IM('ov',816,1056,'<rect width="100%" height="100%" fill="'+oc+'" fill-opacity="'+oa+'"/>',0,0));
  if(c.band)s.els.push(IM('bd',720,330,'<rect width="100%" height="100%" rx="'+(c.br||0)+'" fill="'+c.band+'"/>',48,640));
  if(c.frame)s.els.push(IM('fr',736,976,'<rect x="3" y="3" width="730" height="970" fill="none" stroke="'+c.frame+'" stroke-width="3"/>',40,40));
  var al=(L==='c'||L==='bc'||L==='card')?'center':'left';
  var X=al==='center'?100:72,W=al==='center'?616:672,qy,ay,my;
  if(L==='bl'||L==='bc'){qy=640;ay=890;my=540}
  else if(L==='c'){qy=440;ay=740;my=320}
  else if(L==='top'){qy=190;ay=470;my=90}
  else if(L==='left'){X=72;W=400;qy=430;ay=800;my=320}
  else {qy=690;ay=900;my=0}
  if(c.mk!==0&&L!=='card')s.els.push(MKI('mk',ac,70,al==='center'?373:X,my));
  s.els.push(txt(Q,X+(L==='card'?24:0),qy,W-(L==='card'?48:0),c.sz||44,{bold:true,align:al}));
  var au=txt('- '+NAME,X,ay,W,18,{align:al});au.color=ac;au.bold=true;s.els.push(au);
  if(c.av)s.els.push(K.ph.apply(null,['ph2',72,820,84,84,'circle','#cfcfcf','#9a9a9a']));
  if(c.av){au.x=176;au.y=842;au.align='left';au.w=500}
  var br=txt('@yourhandle  |  www.yourwebsite.com',X,L==='card'?980:990,W,13,{align:al});br.color=tc;s.els.push(br);
}}
B_.pbg=function(c){return BG(c)};
/* ---- portrait / photo space ---- */
B_.pr=function(c){var v=c.v,o=BG(c)+DEC(c.dec);
  var qt=function(x,y,w,sz,al){return A(x,y,w,0,D('text-align:'+(al||'left')+';font:'+(c.w||600)+' '+sz+'px/1.28 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit sed do eiusmod.')))};
  var au=function(x,y,al){return A(x,y,400,0,D('text-align:'+(al||'left')+';font:700 19px var(--fb);color:var(--t)',E(NAME))+D('text-align:'+(al||'left')+';font:400 14px var(--fb);color:var(--x);margin-top:4px',E('Lorem ipsum')))};
  if(v==='l')return o+A(440,0,376,1056,'','background:'+(c.pn||'var(--p)'))+A(466,150,80,0,MK('var(--a)',60))+qt(466,260,320,32)+au(466,820);
  if(v==='r')return o+A(0,0,400,1056,'','background:'+(c.pn||'var(--p)'))+A(30,150,80,0,MK('var(--a)',60))+qt(30,260,340,30)+au(30,820)+A(420,0,0,0,'','');
  if(v==='arch')return o+A(0,740,816,316,'','background:'+(c.pn||'var(--p)'))+A(58,770,100,0,MK('var(--a)',50))+qt(58,840,700,34)+au(58,970);
  if(v==='duo')return o+A(90,470,90,0,MK('var(--a)',70))+qt(90,570,636,42)+au(90,860)+FT(c.ft,c);
  if(v==='strip')return o+A(72,120,90,0,MK('var(--a)',70))+qt(72,220,672,40)+A(72,740,500,0,D('font:800 22px var(--fb);color:var(--t);text-transform:uppercase;letter-spacing:.05em',E(NAME)))+FT(c.ft,c);
  if(v==='polaroid')return o+A(120,100,576,680,'','background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.25);transform:rotate(-2deg)')+A(120,820,576,0,D('text-align:center;font:'+(c.w||600)+' 32px/1.3 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit '+HL('amet')+', consectetur elit.')))+A(120,950,576,0,D('text-align:center;font:600 16px var(--fb);color:var(--x)',E('- '+NAME)));
  if(v==='corner')return o+A(72,560,90,0,MK('var(--a)',70))+qt(72,650,620,38)+A(72,900,500,0,AU(''))+FT(c.ft,c);
  if(v==='tall')return o+A(60,150,100,0,MK('var(--a)',80))+qt(60,290,430,40)+au(60,860);
  if(v==='circleL')return o+A(72,130,90,0,MK('var(--a)',70))+qt(72,230,640,44)+au(72,470);
  if(v==='frame')return o+A(52,52,712,568,'','background:var(--a)')+A(72,690,90,0,MK('var(--a)',60))+qt(72,770,672,36)+au(72,930);
  if(v==='avatar')return o+A(72,150,100,0,MK('var(--a)',80))+qt(72,290,672,52)+A(220,740,500,0,D('font:700 22px var(--fb);color:var(--t)',E(NAME))+D('font:400 15px var(--fb);color:var(--x);margin-top:4px',E('Lorem ipsum')))+FT(c.ft,c);
  if(v==='trio')return o+A(72,150,100,0,MK('var(--a)',70))+qt(72,250,672,42)+A(72,880,500,0,AU(''));
  return o};
/* ---- split ---- */
B_.split=function(c){return BG(c)+A(0,0,816,c.sp||560,'','background:'+c.b1)+
  A(64,c.hy||120,688,0,D('font:'+(c.w||900)+' '+(c.sz||104)+'px/.98 var(--fh);color:'+(c.h1||'#fff')+';text-transform:uppercase;letter-spacing:-.01em',E(c.h||('LOREM<br>'+HL('IPSUM','var(--a)')+'<br>DOLOR'))))+
  A(64,(c.sp||560)+70,640,0,D('font:'+(c.pw||600)+' 34px/1.3 var(--fh);color:var(--t)',E(Q)))+A(64,(c.sp||560)+280,500,0,AU(''))+FT(c.ft,c)};
/* ---- mini ---- */
B_.mini=function(c){return BG(c)+DEC(c.dec)+
  A(80,110,656,0,D('display:flex;justify-content:space-between;font:600 13px var(--fb);letter-spacing:.2em;color:var(--x);text-transform:uppercase',E('Quote of the day')+E('01')))+
  A(80,c.ty||330,656,0,D('font:'+(c.w||400)+' '+(c.sz||58)+'px/1.18 var(--fh);color:var(--t);'+(c.it?'font-style:italic;':''),E('Lorem ipsum dolor sit '+HL('amet')+', consectetur adipiscing elit sed do.')))+
  A(80,c.ly||760,80,0,'','border-top:3px solid var(--a)')+
  A(80,c.ly?c.ly+30:790,500,0,D('font:700 18px var(--fb);color:var(--t)',E(NAME))+D('font:400 14px var(--fb);color:var(--x);margin-top:4px',E('Lorem ipsum')))+FT(c.ft||'line',c)};
/* ---- shapes ---- */
B_.shapes=function(c){var sh=c.sh,g='';
  if(sh==='circles')g=A(120,110,300,300,'','background:'+c.s1+';border-radius:50%')+A(260,110,300,300,'','background:'+c.s2+';border-radius:50%;mix-blend-mode:multiply')+A(400,110,300,300,'','background:'+c.s3+';border-radius:50%');
  else if(sh==='half')g=A(0,0,816,470,'','background:'+c.s1)+A(408,235,300,300,'','background:'+c.s2+';border-radius:50%')+A(108,235,300,300,'','background:'+c.s3+';border-radius:50%');
  else if(sh==='squares')g=A(72,90,320,320,'','background:'+c.s1)+A(392,90,320,320,'','background:'+c.s2)+A(232,250,320,320,'','background:'+c.s3+';border-radius:50%');
  else g=A(-120,-120,520,520,'','background:'+c.s1+';border-radius:50%')+A(500,640,420,420,'','background:'+c.s2+';border-radius:50%')+A(560,60,160,160,'','background:'+c.s3+';border-radius:50%');
  return BG(c)+g+A(72,sh==='circles'?470:600,672,0,MK('var(--a)',60))+
  A(72,sh==='circles'?560:690,672,0,D('font:'+(c.w||700)+' '+(c.sz||44)+'px/1.2 var(--fh);color:var(--t)',E('Lorem ipsum dolor sit amet, '+HL('consectetur')+' adipiscing elit.')))+A(72,880,500,0,AU(''))+FT(c.ft,c)};
function reg2(id,name,arch,c,photos){
  K.add(id,name,{photo:!!photos,
    preset:function(s,txt){s.th=K.TH(c.fg,c.fg2||c.fg,c.ac,c.p||c.ac,c.bg,F[c.f||'mo'],F[c.fb||c.f||'mo']);
      (photos||[]).forEach(function(p){s.els.push(K.ph.apply(null,p))});
      if(arch==='pbg')PB(c)(s,txt)},
    html:function(){return (B_[arch]||K.A_[arch])(c)}})}
var ALL='#B8B8B8',BB='#8A8A8A';
/* ---- QTF: photo background ---- */
function PBG(id,name,c,extra){reg2(id,name,'pbg',c,[['ph1',0,0,816,1056,'rect',c.pb||'#8C8C8C','#6E6E6E']].concat(extra||[]))}
PBG('qt-pb-bottom-dark','Photo bg - dark bottom',{bg:'#111',fg:'#FFFFFF',ac:'#E4FF2C',f:'mo',lay:'bl',ov:'bottom',oc:'#000',oa:.85});
PBG('qt-pb-center-dark','Photo bg - centered dark',{bg:'#111',fg:'#FFFFFF',ac:'#FFFFFF',f:'pf',lay:'c',ov:'full',oc:'#000',oa:.55,sz:46});
PBG('qt-pb-green','Photo bg - green tint',{bg:'#06402E',fg:'#FFFFFF',ac:'#E4FF2C',f:'ou',lay:'c',ov:'full',oc:'#06402E',oa:.72});
PBG('qt-pb-blue','Photo bg - blue tint',{bg:'#1F4FE0',fg:'#FFFFFF',ac:'#FFD84A',f:'po',lay:'bl',ov:'full',oc:'#1F4FE0',oa:.7});
PBG('qt-pb-top','Photo bg - text on top',{bg:'#111',fg:'#FFFFFF',ac:'#FFC400',f:'br',lay:'top',ov:'top',oc:'#000',oa:.85});
PBG('qt-pb-card','Photo bg - white card',{bg:'#fff',fg:'#111111',ac:'#E4232B',f:'in',lay:'card',ov:'none',band:'#FFFFFF',tc:'#555',sz:36,br:24});
PBG('qt-pb-yellow-band','Photo bg - yellow band',{bg:'#FFD21F',fg:'#111111',ac:'#111111',f:'ab',lay:'card',ov:'none',band:'#FFD21F',tc:'#111',sz:38});
PBG('qt-pb-left','Photo bg - left column',{bg:'#111',fg:'#FFFFFF',ac:'#FF6A1A',f:'sg',lay:'left',ov:'left',oc:'#000',oa:.9,sz:36});
PBG('qt-pb-orange','Photo bg - orange tint',{bg:'#FF6A1A',fg:'#FFFFFF',ac:'#111111',f:'ou',lay:'c',ov:'full',oc:'#FF6A1A',oa:.66,sz:50});
PBG('qt-pb-border','Photo bg - white frame',{bg:'#111',fg:'#FFFFFF',ac:'#FFFFFF',f:'cg',lay:'c',ov:'full',oc:'#000',oa:.45,frame:'#FFFFFF',sz:52});
PBG('qt-pb-purple','Photo bg - purple tint',{bg:'#3B1C8F',fg:'#FFFFFF',ac:'#F2B8FF',f:'sg',lay:'bc',ov:'full',oc:'#3B1C8F',oa:.7});
PBG('qt-pb-avatar','Photo bg - author photo',{bg:'#111',fg:'#FFFFFF',ac:'#B8F04D',f:'po',lay:'bl',ov:'bottom',oc:'#000',oa:.88,av:1,sz:42});
/* ---- QTG: portrait / photo spaces ---- */
reg2('qt-pr-left','Photo space - photo left','pr',{v:'l',bg:'#F3EEE4',fg:'#1F1F1F',ac:'#B5651D',p:'#E5DCC9',f:'pf',pn:'#E5DCC9'},[['ph1',0,0,440,1056,'rect','#CFC3AC','#A89C82']]);
reg2('qt-pr-right','Photo space - photo right','pr',{v:'r',bg:'#0B1C3D',fg:'#FFFFFF',ac:'#FFD84A',p:'#17306A',f:'mo',pn:'#0B1C3D'},[['ph1',400,0,416,1056,'rect','#3A4F7A','#6A82B0']]);
reg2('qt-pr-arch','Photo space - arch photo','pr',{v:'arch',bg:'#F4E6DA',fg:'#3A2A1E',ac:'#C0643A',p:'#EBD3C0',f:'cg',w:600,pn:'#EBD3C0'},[['ph1',158,70,500,700,'circle','#D6B9A3','#A98368']]);
reg2('qt-pr-duo','Photo space - two photos','pr',{v:'duo',bg:'#FFFFFF',fg:'#111111',ac:'#1F4FE0',p:'#E3EAF8',f:'po',ft:'line'},[['ph1',100,100,280,280,'circle','#C8D3EC','#92A3CC'],['ph2',436,100,280,280,'circle','#C8D3EC','#92A3CC']]);
reg2('qt-pr-strip','Photo space - photo strip','pr',{v:'strip',bg:'#111111',fg:'#FFFFFF',ac:'#E4FF2C',p:'#222',f:'sg',ft:'line'},[['ph1',0,420,816,300,'rect','#444','#777']]);
reg2('qt-pr-polaroid','Photo space - polaroid','pr',{v:'polaroid',bg:'#FFD84A',fg:'#111111',ac:'#111111',p:'#F2C418',f:'br'},[['ph1',150,128,516,520,'rect','#D9D2B8','#B3AA85']]);
reg2('qt-pr-corner','Photo space - corner photo','pr',{v:'corner',bg:'#0F5B38',fg:'#FFFFFF',ac:'#B8F04D',p:'#17754B',f:'ou',ft:'line'},[['ph1',300,0,516,520,'rect','#2E8B5E','#7CC79F']]);
reg2('qt-pr-tall','Photo space - tall photo','pr',{v:'tall',bg:'#EDE7FA',fg:'#2A1F55',ac:'#7C4DFF',p:'#D9CEF5',f:'br'},[['ph1',540,0,276,1056,'rect','#B7A6E8','#8068C9']]);
reg2('qt-pr-circle','Photo space - big circle photo','pr',{v:'circleL',bg:'#FF6A1A',fg:'#FFFFFF',ac:'#111111',p:'#FF8A4A',f:'ou'},[['ph1',300,560,620,620,'circle','#FFB48A','#E07A3A']]);
reg2('qt-pr-frame','Photo space - framed photo','pr',{v:'frame',bg:'#F2EEE3',fg:'#1E4D36',ac:'#2E8B57',p:'#E2DCC8',f:'pf'},[['ph1',72,72,672,528,'rect','#C9D4C0','#9AAF8E']]);
reg2('qt-pr-avatar','Photo space - avatar row','pr',{v:'avatar',bg:'#E3EAF8',fg:'#10204F',ac:'#1F4FE0',p:'#CCD8F2',f:'po',ft:'brand'},[['ph1',72,720,120,120,'circle','#C8D3EC','#92A3CC']]);
reg2('qt-pr-dark-corner','Photo space - dark corner','pr',{v:'corner',bg:'#121212',fg:'#FFFFFF',ac:'#FF6A1A',p:'#222',f:'sg',ft:'line'},[['ph1',300,0,516,520,'rect','#444','#777']]);
/* ---- QTH: dark green and neon ---- */
var DG={bg:'#04140C',fg:'#FFFFFF',ac:'#39FF88',p:'#0B3A22'};
function X(o){var r={};for(var k in DG)r[k]=DG[k];for(var j in o)r[j]=o[j];return r}
reg2('qt-neon-solid','Neon - dark green quote','solid',X({f:'ou',dec:'rings',ft:'pill',fc:'#04140C'}));
reg2('qt-neon-card','Neon - dark green card','card',X({card:'#0B2A1A',f:'sg',ct:'#FFFFFF',mi:'#04140C',sh:'box-shadow:none;border:1px solid #1F6B40',ft:'brand'}));
reg2('qt-neon-frame','Neon - dark frame','frame',X({pb:'#04140C',bgcss:'background:radial-gradient(circle at 80% 100%,#0F6B35 0,#04140C 60%)',f:'in'}));
reg2('qt-neon-glass','Neon - green glass','glass',X({glow:'#1CCF6A',bgcss:'background:linear-gradient(160deg,#0B3A22,#020B06)',f:'po',stars:1}));
reg2('qt-neon-thanks','Neon - thank you','bold',X({q:'THANK<br>'+HL('YOU!'),sz:170,f:'ab',w:400,ft:'brand',ty:260,sy:700}));
reg2('qt-neon-dyk','Neon - know about us','dyk',X({box:'#0B2A1A',bt:'#D8F8E6',f:'br',ft:'brand',h:'KNOW<br>ABOUT '+HL('US!')}));
reg2('qt-neon-giant','Neon - giant mark','giant',X({f:'ou',go:.35,gs:600,gx:110,gy:80,ty:430,ay:790,ft:'brand'}));
reg2('qt-neon-bubble','Neon - bubble on black','bubble',X({bg:'#050505',bub:'#39FF88',bt:'#04140C',mc:'#04140C',ac2:'#FFFFFF',hc:'#04140C',f:'mo',ft:'brand'}));
reg2('qt-neon-bold','Neon - designer big word','bold',X({q:'DESIGN<br>ER'+HL('?'),sz:150,f:'mo',ft:'line',ty:200}));
reg2('qt-neon-photo-badge','Neon - photo badge','photo',X({v:'badge',f:'sg',ft:'line'}),[['ph1',84,790,76,76,'circle','#1F6B40','#39FF88']]);
reg2('qt-neon-photo-top','Neon - round photo','photo',X({v:'top',f:'po',ft:'brand'}),[['ph1',298,130,220,220,'circle','#1F6B40','#39FF88']]);
reg2('qt-neon-stack','Neon - stacked words','stack',X({f:'mo',circ:'#39FF88',mi:'#04140C',q:'Lorem<br>'+HB('ipsum','#39FF88','#04140C')+'<br>dolor sit<br>amet',sz:136,ft:''}));
/* ---- QTI: light and minimal ---- */
reg2('qt-min-serif','Minimal - serif white','mini',{bg:'#FFFFFF',fg:'#111111',ac:'#111111',p:'#EEE',f:'pf',w:400,it:1});
reg2('qt-min-cream','Minimal - cream serif','mini',{bg:'#F2EEE3',fg:'#2A2A2A',ac:'#B5651D',p:'#E2DCC8',f:'cg',w:500,sz:70});
reg2('qt-min-grey','Minimal - light grey sans','mini',{bg:'#EEEEEE',fg:'#111111',ac:'#1F4FE0',p:'#DDD',f:'in',w:600,sz:54});
reg2('qt-min-blue','Minimal - calm blue','mini',{bg:'#1F4FE0',fg:'#FFFFFF',ac:'#FFFFFF',p:'#3F6CF0',f:'cg',w:500,sz:68});
reg2('qt-min-sand','Minimal - sand','mini',{bg:'#E9DFD0',fg:'#3A2A1E',ac:'#3A2A1E',p:'#D9CCB8',f:'pf',w:500,sz:52,ty:360});
reg2('qt-min-giant-light','Minimal - giant light mark','giant',{bg:'#FFFFFF',fg:'#111',ac:'#111',p:'#E6E6E6',f:'in',go:1,gs:560,gx:120,gy:60,ty:560,ay:880});
reg2('qt-min-giant-cream','Minimal - giant cream mark','giant',{bg:'#F2EEE3',fg:'#2A2A2A',ac:'#B5651D',p:'#E2DCC8',f:'pf',go:1,gs:600,gx:100,gy:50,ty:540,ay:870});
reg2('qt-min-solid-white','Minimal - white left','solid',{bg:'#FFFFFF',fg:'#111111',ac:'#E4232B',p:'#EEE',f:'br',dec:'bar',ft:'line',w:700});
reg2('qt-min-solid-pink','Minimal - pale pink','solid',{bg:'#FBE8EC',fg:'#5A1F37',ac:'#D6336C',p:'#F5CBD6',f:'pf',dec:'blobs',ft:'brand',w:500});
reg2('qt-min-solid-mint','Minimal - mint','solid',{bg:'#E3F4EA',fg:'#0F4A2C',ac:'#1C8A5B',p:'#C5E6D2',f:'ou',dec:'dots',ft:'line'});
reg2('qt-min-bold-visibility','Minimal - visibility word','bold',{bg:'#FFFFFF',fg:'#111111',ac:'#1F4FE0',p:'#EEE',f:'in',q:'VISI<br>BILITY',sz:150,w:800,ft:'line',ty:200});
reg2('qt-min-bold-become','Minimal - become word','bold',{bg:'#F6F2E8',fg:'#111111',ac:'#111111',p:'#E6DFCC',f:'ab',w:400,q:'BE<br>COME',sz:190,ft:'line',ty:180});
/* ---- QTJ: vivid graphic ---- */
reg2('qt-vv-split-red','Graphic - red split','split',{bg:'#FFFFFF',fg:'#111111',ac:'#FFD84A',p:'#EEE',b1:'#D6242B',f:'mo',h:'STRATEGY<br>MEETS<br>'+HL('STORY','#FFD84A'),sz:92,ft:'line'});
reg2('qt-vv-split-blue','Graphic - blue split','split',{bg:'#F4F2E9',fg:'#111111',ac:'#C8F31D',p:'#EEE',b1:'#1237B8',f:'br',sz:110,ft:'line'});
reg2('qt-vv-split-green','Graphic - green split','split',{bg:'#F2EEE3',fg:'#0B3D2B',ac:'#C8F31D',p:'#EEE',b1:'#0F5B38',f:'ou',sz:110,ft:'line'});
reg2('qt-vv-split-black','Graphic - black split','split',{bg:'#FFD21F',fg:'#111111',ac:'#FFD21F',p:'#F2C418',b1:'#111111',f:'sg',sz:110,ft:'line'});
reg2('qt-vv-circles','Graphic - colour circles','shapes',{bg:'#FFFFFF',fg:'#111111',ac:'#111111',p:'#EEE',sh:'circles',s1:'#FFC400',s2:'#1F4FE0',s3:'#D6242B',f:'po',ft:'line'});
reg2('qt-vv-half','Graphic - half circles','shapes',{bg:'#F2EEE3',fg:'#111111',ac:'#E4232B',p:'#EEE',sh:'half',s1:'#1237B8',s2:'#FFD21F',s3:'#E4232B',f:'br',ft:'line'});
reg2('qt-vv-squares','Graphic - squares','shapes',{bg:'#FFFFFF',fg:'#111111',ac:'#FF6A1A',p:'#EEE',sh:'squares',s1:'#FF6A1A',s2:'#111111',s3:'#FFD21F',f:'ou',ft:'line'});
reg2('qt-vv-blobs','Graphic - corner blobs','shapes',{bg:'#EDE7FA',fg:'#2A1F55',ac:'#7C4DFF',p:'#EEE',sh:'blobs',s1:'#7C4DFF',s2:'#FF6A1A',s3:'#FFD21F',f:'br',ft:'line'});
reg2('qt-vv-red-bold','Graphic - red poster','bold',{bg:'#D6242B',fg:'#FFFFFF',ac:'#FFD84A',p:'#E6484E',f:'mo',sz:116,ft:'brand'});
reg2('qt-vv-orange-bold','Graphic - orange poster','bold',{bg:'#FF6A1A',fg:'#111111',ac:'#FFFFFF',p:'#FF8A4A',f:'ab',w:400,sz:130,ft:'line'});
reg2('qt-vv-pink-stack','Graphic - pink stacked','stack',{bg:'#FBD5E4',fg:'#111111',ac:'#D6336C',p:'#F5B6CD',f:'mo',circ:'#D6336C',q:'Lorem<br>'+HB('ipsum','#111','#FBD5E4')+'<br>dolor sit<br>amet',sz:136,ft:''});
reg2('qt-vv-yellow-stack','Graphic - yellow stacked','stack',{bg:'#FFD21F',fg:'#111111',ac:'#111111',p:'#F2C418',f:'br',circ:'#111111',q:'Lorem ipsum<br>'+HB('dolor sit','#111','#FFD21F')+'<br>amet,<br>elit',sz:120,ft:''});
})();
