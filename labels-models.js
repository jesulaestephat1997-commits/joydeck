/* Emadeck - modeles Labels (feuilles d'etiquettes) */
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
var F={mo:"'Montserrat', sans-serif",po:"'Poppins', sans-serif",ou:"'Outfit', sans-serif",pf:"'Playfair Display', serif",cg:"'Cormorant Garamond', serif",ab:"'Abril Fatface', serif",sg:"'Space Grotesk', sans-serif",br:"'Bricolage Grotesque', sans-serif",in:"'Inter', sans-serif",bk:"'Libre Baskerville', serif",eb:"'EB Garamond', serif"};
var NM=['Lorem','Ipsum','Dolor','Amet','Elit','Tempor','Magna','Labore','Aliqua','Enim','Minim','Veniam','Nostrud','Ullamco','Laboris','Nisi','Aliquip','Commodo'];
function rad(sh,w,h){
  if(sh==='circle'||sh==='oval')return '50%';
  if(sh==='round')return '22px';
  if(sh==='arch')return Math.round(w/2)+'px '+Math.round(w/2)+'px 10px 10px';
  if(sh==='pill')return Math.round(Math.min(w,h)/2)+'px';
  return '6px'}
/* contenu d'une etiquette */
function body(st,P,w,h,i,c){
  var u=Math.max(.7,Math.min(w,h*.85)/100),fg=P[1],ac=P[2],nm=NM[i%NM.length],pad=Math.round(13*u),
    sm=function(n){return Math.max(6,Math.round(n*u))};
  var fill='height:100%;box-sizing:border-box;';
  if(st==='stack')return D(fill+'padding:'+pad+'px;display:flex;flex-direction:column;justify-content:space-between;color:'+fg,
    D('font:600 '+sm(6.5)+'px var(--fb);letter-spacing:.22em;opacity:.85',E('BRAND NAME'))+
    D('',D('font:700 '+sm(h>w*1.2?17:20)+'px/1 var(--fh);color:'+fg,E(nm))+D('font:italic 400 '+sm(8)+'px/1.3 var(--fb);color:'+ac+';margin-top:'+sm(5)+'px',E('Lorem ipsum dolor sit')))+
    D('display:flex;justify-content:space-between;font:500 '+sm(6)+'px var(--fb);opacity:.85',E('NET 1.7 OZ')+(w>260?E('yourwebsite.com'):'')));
  if(st==='center')return D(fill+'padding:'+pad+'px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:'+fg,
    D('width:'+sm(22)+'px;height:'+sm(22)+'px;border-radius:50%;background:'+ac+';margin-bottom:'+sm(7)+'px','')+
    D('font:700 '+sm(17)+'px/1.05 var(--fh)',E(nm))+D('width:'+sm(28)+'px;border-top:1.5px solid '+ac+';margin:'+sm(6)+'px 0','')+
    D('font:400 '+sm(7)+'px/1.4 var(--fb);opacity:.9',E('Lorem ipsum dolor sit amet'))+D('font:600 '+sm(5.8)+'px var(--fb);letter-spacing:.18em;margin-top:'+sm(7)+'px;opacity:.8',E('NET WT. 1.7 OZ')));
  if(st==='band')return D(fill+'display:flex;flex-direction:column;color:'+fg,
    D('background:'+ac+';color:'+P[0]+';padding:'+sm(11)+'px '+pad+'px;text-align:center;font:700 '+sm(15)+'px/1 var(--fh)',E(nm))+
    D('flex:1;padding:'+pad+'px;display:flex;flex-direction:column;justify-content:space-between;text-align:center',D('font:400 '+sm(7.5)+'px/1.45 var(--fb)',E('Lorem ipsum dolor sit amet, consectetur elit.'))+D('font:600 '+sm(6)+'px var(--fb);letter-spacing:.18em',E('NET WT. 1.7 OZ'))));
  if(st==='badge')return D(fill+'padding:'+sm(8)+'px',D('height:100%;box-sizing:border-box;border:'+Math.max(1.5,sm(1.6))+'px solid '+ac+';border-radius:'+rad(c.shape,w,h)+';display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:'+fg+';padding:'+sm(6)+'px',
    D('font:600 '+sm(5.8)+'px var(--fb);letter-spacing:.24em',E('HANDMADE'))+D('font:700 '+sm(18)+'px/1.05 var(--fh);margin:'+sm(5)+'px 0',E(nm))+D('font:400 '+sm(11)+'px;color:'+ac+';letter-spacing:.2em',E('&#9733;&#9733;&#9733;'))+D('font:500 '+sm(6.2)+'px var(--fb);margin-top:'+sm(5)+'px',E('Since 2024'))));
  if(st==='lines')return D(fill+'padding:'+pad+'px;color:'+fg+';display:flex;flex-direction:column;gap:'+sm(5)+'px',
    D('font:700 '+sm(9)+'px var(--fh);letter-spacing:.08em;border-bottom:1px solid '+ac+';padding-bottom:'+sm(4)+'px',E('INGREDIENTS'))+
    D('font:400 '+sm(6.8)+'px/1.5 var(--fb)',E(h>=380?'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'))+
    (h>=380?D('font:700 '+sm(8)+'px var(--fh);border-bottom:1px solid '+ac+';padding-bottom:'+sm(3)+'px;margin-top:'+sm(3)+'px',E('DIRECTIONS'))+
    D('font:400 '+sm(6.8)+'px/1.5 var(--fb)',E('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.')):'')+
    D('margin-top:auto;font:600 '+sm(5.5)+'px var(--fb);letter-spacing:.14em;opacity:.8',E('KEEP OUT OF REACH OF CHILDREN')));
  if(st==='pattern')return D(fill+'position:relative;background-image:radial-gradient('+ac+' '+sm(2.2)+'px,transparent '+sm(2.7)+'px);background-size:'+sm(14)+'px '+sm(14)+'px;display:flex;align-items:center;justify-content:center',
    D('background:'+P[0]+';color:'+fg+';padding:'+sm(10)+'px '+sm(14)+'px;text-align:center;border:1.5px solid '+fg,D('font:700 '+sm(16)+'px/1 var(--fh)',E(nm))+D('font:500 '+sm(6)+'px var(--fb);letter-spacing:.2em;margin-top:'+sm(5)+'px',E('LOREM IPSUM'))));
  if(st==='split')return D(fill+'display:flex;color:'+fg,
    D('width:'+Math.round(w*.3)+'px;background:'+ac+';display:flex;align-items:center;justify-content:center',D('writing-mode:vertical-rl;transform:rotate(180deg);font:700 '+sm(12)+'px var(--fh);letter-spacing:.14em;color:'+P[0],E(nm.toUpperCase())))+
    D('flex:1;padding:'+pad+'px;display:flex;flex-direction:column;justify-content:center',D('font:700 '+sm(14)+'px/1.1 var(--fh)',E('Product name'))+D('font:400 '+sm(7)+'px/1.45 var(--fb);margin-top:'+sm(5)+'px',E('Lorem ipsum dolor sit amet consectetur'))+D('font:600 '+sm(6)+'px var(--fb);letter-spacing:.16em;margin-top:'+sm(7)+'px;color:'+ac,E('NET WT. 1.7 OZ'))));
  if(st==='nutri')return D(fill+'padding:'+pad+'px;color:'+fg+';font:400 '+sm(6)+'px/1.35 var(--fb);overflow:hidden',
    D('font:800 '+sm(14)+'px/1 var(--fh);border-bottom:'+sm(4)+'px solid '+fg+';padding-bottom:'+sm(3)+'px',E('Nutrition Facts'))+D('border-bottom:1px solid '+fg+';padding:'+sm(3)+'px 0',E('8 servings per container'))+
    D('display:flex;justify-content:space-between;font-weight:700;font-size:'+sm(9)+'px;border-bottom:'+sm(3)+'px solid '+fg+';padding:'+sm(3)+'px 0',E('Calories')+E('230'))+
    ['Total Fat 8g','Cholesterol 0mg','Sodium 160mg','Protein 3g'].map(function(t){return D('display:flex;justify-content:space-between;border-bottom:1px solid '+ac+';padding:'+sm(2.5)+'px 0',E(t)+E('0%'))}).join('')+
    D('margin-top:'+sm(6)+'px;font-size:'+sm(6)+'px;opacity:.85',E('Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.')));
  if(st==='minimal')return D(fill+'padding:'+pad+'px;display:flex;align-items:center;justify-content:space-between;color:'+fg,
    D('font:700 '+sm(22)+'px/1 var(--fh)',E(nm))+D('font:500 '+sm(8)+'px var(--fb);letter-spacing:.2em;color:'+ac,E('LOREM IPSUM')));
  if(st==='ship')return D(fill+'padding:'+pad+'px;color:'+fg+';display:flex;flex-direction:column;justify-content:space-between',
    D('display:flex;justify-content:space-between;align-items:center;font:700 '+sm(10)+'px var(--fh)',E('SHIP TO')+E('Brand Name','','color:'+ac))+
    D('font:500 '+sm(9)+'px/1.5 var(--fb)',E('Armand Bernard')+'<br>'+E('123 Anywhere St., Any City')+'<br>'+E('ST 12345'))+
    D('border-top:1.5px dashed '+fg+';padding-top:'+sm(5)+'px;font:600 '+sm(6.5)+'px var(--fb);letter-spacing:.16em;display:flex;justify-content:space-between',E('FRAGILE')+E('THIS SIDE UP')));
  return ''}
function geo(c){var o=[],i=0,x,y;
  if(c.lay==='pairs'){var tw=c.w+c.gx+c.bw,mx=Math.round((816-tw)/2),th=c.rows*c.h+(c.rows-1)*c.gy,my=Math.round((1056-th)/2);
    for(var r=0;r<c.rows;r++){o.push({x:mx,y:my+r*(c.h+c.gy),w:c.w,h:c.h,i:i,b:0});o.push({x:mx+c.w+c.gx,y:my+r*(c.h+c.gy),w:c.bw,h:c.h,i:i,b:1});i++}
    return o}
  var gw=c.cols*c.w+(c.cols-1)*c.gx,gh=c.rows*c.h+(c.rows-1)*c.gy,mx2=Math.round((816-gw)/2),my2=Math.round((1056-gh)/2);
  for(var r2=0;r2<c.rows;r2++)for(var k=0;k<c.cols;k++){o.push({x:mx2+k*(c.w+c.gx),y:my2+r2*(c.h+c.gy),w:c.w,h:c.h,i:i++,b:0})}
  return o}
function html(c){var s=A(0,0,816,1056,'','background:var(--bgc)'),pal=c.pal;
  geo(c).forEach(function(g){var Pl=g.b?(c.bpal||pal)[g.i%(c.bpal||pal).length]:pal[g.i%pal.length],st=g.b?(c.bst||'lines'):c.st,off=c.ph&&!g.b?Math.round(g.h*c.ph):0,inner;
    var css='background:'+Pl[0]+';border-radius:'+rad(g.b?'rect':c.shape,g.w,g.h)+';overflow:hidden;'+(c.bd?'border:'+c.bd+' solid '+Pl[2]+';box-sizing:border-box;':'');
    inner=body(st,Pl,g.w,g.h,g.i,c);
    if(off)inner=D('position:relative;width:100%;height:100%',D('position:absolute;left:0;top:'+off+'px;width:100%;height:'+(g.h-off)+'px',body(st,Pl,g.w,g.h-off,g.i,c)));
    s+=A(g.x,g.y,g.w,g.h,inner,css)});
  return s}
function L(id,name,c){
  add(id,name,{photo:!!c.ph,
    preset:function(s){var p0=c.pal[0];s.th=TH(p0[1],p0[1],p0[2],p0[0],c.pg,F[c.f||'pf'],F[c.fb||'in']);
      if(c.ph)geo(c).forEach(function(g){if(!g.b){s.els.push(ph('ph'+g.i,g.x+8,g.y+8,g.w-16,Math.round(g.h*c.ph)-8,c.shape==='circle'?'circle':'rect','#D9D9D9','#B5B5B5'))}})},
    html:function(){return html(c)}})}
/* ===== palettes ===== */
var SAGE=[['#F4A83A','#3A2400','#3A2400'],['#2E8F8F','#E6F5F2','#E6F5F2'],['#C9E3C8','#1F4A33','#1F4A33']];
var EARTH=[['#EFE3D0','#4A2F1E','#B5651D'],['#4A2F1E','#F3E9D8','#D9A86C'],['#C98F5B','#2B1A0E','#2B1A0E']];
var GREEN=[['#F2EEE3','#1E4D36','#2E8B57'],['#1E4D36','#F2EEE3','#C8E6B0'],['#DDE8C9','#1E4D36','#4A7A3A']];
var PASTEL=[['#FDE4EA','#5A1F37','#D6336C'],['#E3F4EA','#0F4A2C','#1C8A5B'],['#E8E3FA','#2A1F55','#7C4DFF'],['#FFF1CC','#5A3B00','#E0A100']];
var BRIGHT=[['#FF6A1A','#FFFFFF','#111111'],['#1F4FE0','#FFFFFF','#FFD84A'],['#FFD21F','#111111','#111111'],['#D6242B','#FFFFFF','#FFFFFF']];
var DARK=[['#111111','#F3E9D8','#D9A86C'],['#1A1A1A','#FFFFFF','#E4FF2C'],['#0B1C3D','#FFFFFF','#FFD84A']];
var KRAFT=[['#C9A877','#2B1A0E','#2B1A0E'],['#B58B57','#FFF6E6','#FFF6E6'],['#D8BD92','#3A2400','#8A4B14']];
var BLUE=[['#E3EAF8','#10204F','#1F4FE0'],['#1F4FE0','#FFFFFF','#FFD84A'],['#10204F','#E3EAF8','#8FB0FF']];
var RED=[['#F9E3DD','#7A1C12','#D6242B'],['#D6242B','#FFF3E6','#FFD84A'],['#7A1C12','#F9E3DD','#F2A33A']];
var MONO=[['#FFFFFF','#111111','#111111'],['#F1F1F1','#111111','#555555'],['#111111','#FFFFFF','#BBBBBB']];
/* ===== LBA cosmetic & beauty ===== */
L('lb-balm-pairs','Label - balm front and back',{lay:'pairs',rows:3,w:250,h:290,bw:380,gx:24,gy:26,shape:'rect',st:'stack',pal:SAGE,bpal:[['#EFE6D2','#3A2400','#B5651D']],pg:'#C4CDB5',f:'pf'});
L('lb-cream-round','Label - cream round corners',{cols:2,rows:3,w:340,h:290,gx:30,gy:30,shape:'round',st:'stack',pal:EARTH,pg:'#F7F2E8',f:'cg'});
L('lb-serum-center','Label - serum centered',{cols:3,rows:4,w:222,h:200,gx:21,gy:28,shape:'round',st:'center',pal:GREEN,pg:'#FFFFFF',f:'pf'});
L('lb-soap-band','Label - soap band',{cols:2,rows:4,w:350,h:210,gx:20,gy:25,shape:'rect',st:'band',pal:EARTH,pg:'#F2EEE3',f:'br'});
L('lb-candle-dark','Label - candle dark',{cols:2,rows:5,w:350,h:160,gx:20,gy:30,shape:'rect',st:'minimal',pal:DARK,pg:'#222222',f:'cg'});
L('lb-lip-circles','Label - lip balm circles',{cols:3,rows:4,w:190,h:190,gx:40,gy:30,shape:'circle',st:'center',pal:PASTEL,pg:'#FFFFFF',f:'ou'});
L('lb-bottle-tall','Label - tall bottle',{cols:3,rows:2,w:222,h:440,gx:30,gy:30,shape:'rect',st:'stack',pal:GREEN,pg:'#E9EEE0',f:'pf'});
L('lb-mask-pattern','Label - pattern pastel',{cols:3,rows:3,w:222,h:280,gx:24,gy:30,shape:'round',st:'pattern',pal:PASTEL,pg:'#FFFFFF',f:'br'});
L('lb-oil-badge','Label - oil badge',{cols:2,rows:2,w:340,h:420,gx:30,gy:30,shape:'arch',st:'badge',pal:EARTH,pg:'#F7F2E8',f:'cg'});
L('lb-sample-split','Label - sample split',{cols:3,rows:6,w:222,h:130,gx:21,gy:24,shape:'rect',st:'split',pal:BLUE,pg:'#FFFFFF',f:'in'});
/* ===== LBB food and jars ===== */
L('lb-jam-circles','Label - jam circles',{cols:3,rows:4,w:190,h:190,gx:40,gy:30,shape:'circle',st:'badge',pal:RED,pg:'#FBF3E8',f:'eb'});
L('lb-pickle-pattern','Label - pickle green pattern',{cols:2,rows:4,w:350,h:210,gx:20,gy:25,shape:'rect',st:'pattern',pal:[['#F2EEE3','#1E4D36','#7CB342'],['#1E4D36','#F2EEE3','#C8E6B0']],pg:'#F2EEE3',f:'ab'});
L('lb-honey-round','Label - honey round',{cols:2,rows:3,w:300,h:300,gx:40,gy:30,shape:'circle',st:'center',pal:[['#FFD21F','#3A2400','#3A2400'],['#3A2400','#FFD21F','#FFD21F']],pg:'#FFF6DC',f:'pf'});
L('lb-tea-band','Label - tea band',{cols:3,rows:4,w:222,h:200,gx:21,gy:28,shape:'rect',st:'band',pal:GREEN,pg:'#FFFFFF',f:'cg'});
L('lb-sauce-tall','Label - sauce bottles',{cols:4,rows:2,w:170,h:400,gx:20,gy:30,shape:'rect',st:'stack',pal:RED,pg:'#FFF6E6',f:'ab'});
L('lb-spice-small','Label - spice stickers',{cols:4,rows:7,w:160,h:110,gx:20,gy:20,shape:'round',st:'center',pal:BRIGHT,pg:'#FFFFFF',f:'ou'});
L('lb-choc-split','Label - chocolate split',{cols:2,rows:3,w:340,h:300,gx:30,gy:30,shape:'rect',st:'split',pal:EARTH,pg:'#2B1A0E',f:'pf'});
L('lb-juice-band','Label - juice band',{cols:3,rows:3,w:222,h:300,gx:24,gy:30,shape:'round',st:'band',pal:BRIGHT,pg:'#FFFFFF',f:'po'});
L('lb-nutrition','Label - nutrition facts',{cols:2,rows:2,w:340,h:440,gx:30,gy:30,shape:'rect',st:'nutri',pal:MONO,pg:'#FFFFFF',f:'in'});
L('lb-coffee-photo','Label - coffee with photo',{cols:2,rows:2,w:340,h:430,gx:30,gy:30,shape:'round',st:'stack',ph:.5,pal:KRAFT,pg:'#F2E8D5',f:'pf'});
/* ===== LBC sticker sheets ===== */
L('lb-sticker-round','Stickers - round badges',{cols:4,rows:5,w:150,h:150,gx:30,gy:30,shape:'circle',st:'badge',pal:BRIGHT,pg:'#FFFFFF',f:'ou'});
L('lb-sticker-oval','Stickers - ovals',{cols:3,rows:5,w:210,h:150,gx:30,gy:35,shape:'oval',st:'center',pal:PASTEL,pg:'#FFFFFF',f:'pf'});
L('lb-sticker-pill','Stickers - pills',{cols:2,rows:7,w:340,h:90,gx:30,gy:30,shape:'pill',st:'minimal',pal:BRIGHT,pg:'#FFFFFF',f:'br'});
L('lb-sticker-arch','Stickers - arches',{cols:4,rows:2,w:160,h:260,gx:30,gy:50,shape:'arch',st:'center',pal:EARTH,pg:'#F7F2E8',f:'cg'});
L('lb-sticker-thanks','Stickers - thank you circles',{cols:3,rows:4,w:190,h:190,gx:40,gy:30,shape:'circle',st:'badge',pal:PASTEL,pg:'#FFFFFF',f:'pf'});
L('lb-sticker-mini','Stickers - mini pattern',{cols:5,rows:8,w:120,h:90,gx:14,gy:14,shape:'round',st:'pattern',pal:BRIGHT,pg:'#FFFFFF',f:'ou'});
L('lb-ship-labels','Labels - shipping',{cols:2,rows:4,w:350,h:200,gx:20,gy:30,shape:'rect',st:'ship',pal:MONO,pg:'#FFFFFF',f:'in',bd:'2px'});
L('lb-sticker-tag','Stickers - filled tags',{cols:3,rows:3,w:210,h:210,gx:40,gy:50,shape:'round',st:'center',pal:BRIGHT,pg:'#FFF6E6',f:'br'});
L('lb-sticker-hello','Stickers - bright circles',{cols:3,rows:5,w:190,h:190,gx:36,gy:20,shape:'circle',st:'center',pal:BRIGHT,pg:'#FFFFFF',f:'ab'});
L('lb-sticker-photo','Stickers - with photo',{cols:3,rows:3,w:222,h:290,gx:24,gy:30,shape:'round',st:'stack',ph:.55,pal:PASTEL,pg:'#FFFFFF',f:'pf'});
/* ===== LBD bottle and packaging ===== */
L('lb-wrap-tall','Packaging - bottle wraps',{cols:4,rows:1,w:170,h:900,gx:24,gy:0,shape:'rect',st:'stack',pal:BLUE,pg:'#F2F5FB',f:'mo'});
L('lb-box-kraft','Packaging - kraft boxes',{cols:2,rows:2,w:340,h:430,gx:30,gy:30,shape:'rect',st:'center',pal:KRAFT,pg:'#EADFC8',f:'pf'});
L('lb-pharmacy','Packaging - pharmacy',{cols:2,rows:4,w:350,h:210,gx:20,gy:25,shape:'rect',st:'lines',pal:MONO,pg:'#FFFFFF',f:'in'});
L('lb-premium-dark','Packaging - premium dark',{cols:2,rows:3,w:340,h:300,gx:30,gy:30,shape:'rect',st:'badge',pal:DARK,pg:'#0A0A0A',f:'cg'});
L('lb-kraft-center','Packaging - kraft center',{cols:3,rows:3,w:222,h:280,gx:24,gy:30,shape:'round',st:'center',pal:KRAFT,pg:'#EADFC8',f:'eb'});
L('lb-pairs-blue','Packaging - front and back blue',{lay:'pairs',rows:3,w:250,h:290,bw:380,gx:24,gy:26,shape:'rect',st:'stack',pal:BLUE,bpal:[['#F2F5FB','#10204F','#1F4FE0']],pg:'#DCE4F5',f:'mo'});
L('lb-water-band','Packaging - water bottle',{cols:3,rows:2,w:222,h:440,gx:30,gy:30,shape:'rect',st:'band',pal:BLUE,pg:'#FFFFFF',f:'ou'});
L('lb-shampoo-photo','Packaging - shampoo with photo',{cols:3,rows:2,w:222,h:440,gx:30,gy:30,shape:'round',st:'stack',ph:.45,pal:GREEN,pg:'#E9EEE0',f:'pf'});
L('lb-pairs-tea','Packaging - tea box pairs',{lay:'pairs',rows:3,w:250,h:290,bw:380,gx:24,gy:26,shape:'round',st:'center',pal:GREEN,bpal:[['#F2EEE3','#1E4D36','#2E8B57']],pg:'#C4CDB5',f:'cg'});
L('lb-gift-tag','Packaging - gift tags',{cols:4,rows:5,w:150,h:170,gx:30,gy:30,shape:'round',st:'center',pal:PASTEL,pg:'#FFFFFF',f:'pf'});
/* ===== LBE minimal and dark ===== */
L('lb-min-white','Minimal - white sheet',{cols:2,rows:5,w:350,h:160,gx:20,gy:30,shape:'rect',st:'minimal',pal:MONO,pg:'#FFFFFF',f:'in',bd:'1px'});
L('lb-min-black','Minimal - black sheet',{cols:3,rows:4,w:222,h:200,gx:21,gy:28,shape:'rect',st:'stack',pal:[['#111111','#FFFFFF','#BBBBBB'],['#1F1F1F','#FFFFFF','#E4FF2C']],pg:'#000000',f:'sg'});
L('lb-neon-green','Dark - green neon',{cols:3,rows:4,w:222,h:200,gx:21,gy:28,shape:'round',st:'badge',pal:[['#04140C','#FFFFFF','#39FF88'],['#0B2A1A','#FFFFFF','#39FF88']],pg:'#020B06',f:'ou'});
L('lb-pastel-round','Pastel - round corners',{cols:3,rows:4,w:222,h:200,gx:21,gy:28,shape:'round',st:'center',pal:PASTEL,pg:'#FFFFFF',f:'br'});
L('lb-retro-red','Retro - red cream',{cols:2,rows:3,w:340,h:300,gx:30,gy:30,shape:'round',st:'badge',pal:RED,pg:'#F9E3DD',f:'ab'});
L('lb-serif-cream','Serif - cream',{cols:2,rows:4,w:350,h:210,gx:20,gy:25,shape:'rect',st:'stack',pal:EARTH,pg:'#F2EEE3',f:'eb'});
L('lb-mono-lines','Mono - ingredients',{cols:2,rows:2,w:340,h:440,gx:30,gy:30,shape:'rect',st:'lines',pal:MONO,pg:'#F1F1F1',f:'sg'});
L('lb-bright-split','Bright - split',{cols:3,rows:6,w:222,h:130,gx:21,gy:24,shape:'round',st:'split',pal:BRIGHT,pg:'#FFFFFF',f:'po'});
L('lb-blue-band','Blue - band',{cols:3,rows:4,w:222,h:200,gx:21,gy:28,shape:'rect',st:'band',pal:BLUE,pg:'#F2F5FB',f:'mo'});
L('lb-gold-dark','Gold - dark premium',{cols:2,rows:5,w:350,h:160,gx:20,gy:30,shape:'rect',st:'minimal',pal:[['#0B1C3D','#F3E9D8','#D9A86C'],['#111111','#F3E9D8','#D9A86C']],pg:'#050505',f:'cg',bd:'1px'});
})();
