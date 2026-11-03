/* Emadeck - cartes de mariage, modeles 2 (autonome) */
(function(){
'use strict';
var P=window.PLANNER_MODELS=window.PLANNER_MODELS||{};
function add(id,name,o){o.name=name;P[id]=o}
function E(t,c,st){return '<span class="ed'+(c?' '+c:'')+'"'+(st?' style="'+st+'"':'')+'>'+t+'</span>'}
function U(svg){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function SV(w,h,inner){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'">'+inner+'</svg>'}
function IM(id,svg,x,y,w,h){return {id:id,t:'img',src:U(svg),x:x,y:y,w:w,h:h,flip:false}}
function TH(t,x,a,p,b,f,g){return {title:t,text:x,accent:a,pale:p,bg:b,fh:f,fb:g||f}}
var SER="'Cormorant Garamond', serif",SANS="'Montserrat', sans-serif";
function X(top,html,sz,o){o=o||{};var al=o.al||'center',l=o.l==null?0:o.l,wd=o.wd||(816-l);
  return '<div style="position:absolute;left:'+l+'px;width:'+wd+'px;top:'+top+'px;text-align:'+al+';font:'+(o.it?'italic ':'')+(o.w||400)+' '+sz+'px/'+(o.lh||1.35)+' '+(o.f||'var(--fh)')+';letter-spacing:'+(o.ls||0)+'em;color:'+(o.c||'var(--t)')+';'+(o.st||'')+'">'+html+'</div>'}
function HL(l,t,w,c,th){return '<div style="position:absolute;left:'+l+'px;top:'+t+'px;width:'+w+'px;border-top:'+(th||1)+'px solid '+(c||'var(--a)')+'"></div>'}
function VL(l,t,h,c,th){return '<div style="position:absolute;left:'+l+'px;top:'+t+'px;height:'+h+'px;border-left:'+(th||1)+'px solid '+(c||'var(--a)')+'"></div>'}
var V1='THE GRANDVILLE ESTATE',V2='1234 WILLOW CREEK ROAD',V3='NAPA VALLEY, CALIFORNIA';
function seed(n){var x=n*9301+49297;return function(){x=(x*9301+49297)%233280;return x/233280}}
function ln(d,c,w,f){return '<path d="'+d+'" fill="'+(f||'none')+'" stroke="'+c+'" stroke-width="'+(w||1.4)+'" stroke-linecap="round" stroke-linejoin="round"/>'}
function leaf(x,y,a,len,wid,fill,st,sw){
  var d='M0 0C'+len*.25+' '+-wid+' '+len*.75+' '+-wid*.9+' '+len+' 0C'+len*.75+' '+wid*.9+' '+len*.25+' '+wid+' 0 0Z';
  return '<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+a.toFixed(1)+')"><path d="'+d+'" fill="'+fill+'" stroke="'+(st||'none')+'" stroke-width="'+(sw||.8)+'"/>'+(st?'<path d="M0 0L'+len*.9+' 0" stroke="'+st+'" stroke-width=".7" fill="none"/>':'')+'</g>'}
function sprig(x,y,a,len,n,ll,fill,st,stem){
  var R=seed(len),o='<g transform="translate('+x+' '+y+') rotate('+a+')">'+ln('M0 0L'+len+' 0',stem||st||fill,1.2);
  for(var i=1;i<=n;i++){var px=len*i/(n+1),s=ll*(1-i/(n+3)*.5);o+=leaf(px,0,-42,s,s*.3,fill,st)+leaf(px,0,42,s,s*.3,fill,st)}
  return o+leaf(len,0,0,ll*.8,ll*.24,fill,st)+'</g>'}
function bloom(cx,cy,r,rot,fill,st){
  var o='<g transform="translate('+cx+' '+cy+') rotate('+rot+')">',rings=[[9,1,0],[8,.78,20],[7,.55,10],[5,.32,30]],k;
  rings.forEach(function(g,ri){for(k=0;k<g[0];k++){var a=k*360/g[0]+g[2],rr=r*g[1];
    o+='<g transform="rotate('+a+')"><path d="M0 0C'+-rr*.6+' '+-rr*.3+' '+-rr*.62+' '+-rr*.95+' 0 '+-rr+'C'+rr*.62+' '+-rr*.95+' '+rr*.6+' '+-rr*.3+' 0 0Z" fill="'+(ri%2?'#FBF9F4':fill)+'" fill-opacity=".96" stroke="'+st+'" stroke-width=".8"/></g>'}});
  return o+'<circle r="'+r*.08+'" fill="#E8D9A8"/></g>'}
function poppy(x,y,s,rot,c,bg){
  return '<g transform="translate('+x+' '+y+') rotate('+rot+') scale('+s+')">'+
   ln('M0 0C-40 -5 -84 -40 -78 -96C-52 -118 -10 -102 14 -58C22 -38 14 -10 0 0Z',c,1.5,bg)+
   ln('M4 -4C22 -52 58 -100 108 -104C128 -74 108 -30 64 -4C40 8 18 6 4 -4Z',c,1.5,bg)+
   ln('M-6 8C-34 42 10 74 54 54C86 38 96 6 72 -16C42 -4 10 -4 -6 8Z',c,1.5,bg)+
   ln('M-8 -8C-38 -32 -56 -62 -58 -94',c,1)+ln('M-2 -12C-24 -42 -32 -70 -28 -100',c,1)+ln('M2 -8C-8 -36 -4 -64 8 -84',c,1)+
   ln('M10 -8C30 -40 60 -70 96 -88',c,1)+ln('M16 -2C44 -22 76 -38 100 -50',c,1)+
   ln('M0 14C20 36 44 44 62 40',c,1)+ln('M-2 26C14 48 34 54 48 50',c,1)+
   ln('M2 -4L-8 -16M6 -2L0 -18M10 -2L10 -18M14 0L20 -14',c,1)+'</g>'}
function wreath(cx,cy,rx,ry,c,wild){
  var R=seed(wild?5:3),o='',side,k,N=22;
  for(side=-1;side<=1;side+=2){var pts=[];
    for(k=0;k<=N;k++){var t=.2+k*(Math.PI-.5)/N,j=wild?(R()-.5)*10:0,x=cx+side*(rx+j)*Math.sin(t),y=cy-(ry+j)*Math.cos(t);pts.push([x,y,t])}
    o+=ln('M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('L'),c,1);
    pts.forEach(function(p,i){var tang=Math.atan2(ry*Math.sin(p[2]),side*rx*Math.cos(p[2]))*180/Math.PI;
      if(wild){if(i%4===1){o+='<g transform="translate('+p[0]+' '+p[1]+')">'+[0,72,144,216,288].map(function(a){return '<ellipse cx="0" cy="-5" rx="3.2" ry="5.5" transform="rotate('+a+')" fill="#FBFAF6" stroke="'+c+'" stroke-width=".8"/>'}).join('')+'</g>'}else{o+=leaf(p[0],p[1],tang+side*50,12+R()*8,3,'none',c,.8)}}
      else{o+=leaf(p[0],p[1],tang+side*45,14,3.6,c,c,.4)+leaf(p[0],p[1],tang-side*45,14,3.6,c,c,.4)}});
  }return o}
function vine(c){
  var half=ln('M250 96C228 66 190 52 150 70C112 88 78 100 40 74C20 60 14 88 30 100',c,1.8)+ln('M250 96C240 112 228 124 212 126',c,1.4)+
   leaf(190,60,-70,26,7,'none',c)+leaf(170,66,60,24,6,'none',c)+leaf(130,80,-60,24,6,'none',c)+leaf(110,88,70,24,6,'none',c)+leaf(80,90,-50,22,6,'none',c)+leaf(60,80,60,22,6,'none',c)+leaf(150,70,-100,20,5,'none',c)+leaf(215,70,-80,20,5,'none',c)+leaf(26,64,-110,18,5,'none',c)+leaf(214,124,150,18,5,'none',c)+leaf(236,112,70,16,5,'none',c);
  return SV(500,140,half+'<g transform="translate(500 0) scale(-1 1)">'+half+'</g>')}
function pampas(x,y,a,c,n){var o='<g transform="translate('+x+' '+y+') rotate('+a+')">',R=seed(11);
  for(var i=0;i<n;i++){var s=(i-n/2)*7,l=140+R()*60;o+=ln('M0 0C'+s*.6+' '+-l*.4+' '+s*2.2+' '+-l*.8+' '+s*3+' '+-l,c,1.3)}return o+'</g>'}
function chrys(cx,cy,r,c1,c2){var o='',rings=[[22,1],[18,.78],[14,.56],[10,.36],[6,.18]];
  rings.forEach(function(g,ri){for(var k=0;k<g[0];k++){var a=k*360/g[0]+ri*9,rr=r*g[1];
    o+='<ellipse cx="'+cx+'" cy="'+(cy-rr*.55)+'" rx="'+rr*.14+'" ry="'+rr*.46+'" transform="rotate('+a+' '+cx+' '+cy+')" fill="'+(ri%2?c2:c1)+'" fill-opacity=".92"/>'}});return o}
/* ---- illustrations ---- */
function artPeony(){var g='',gr=['#3F6B49','#4F7C58','#6B9468','#2F5A3C'],i,R=seed(2);
  g+=sprig(40,200,-35,300,9,52,'#587F55','none','#5B7F58')+sprig(120,330,-50,260,8,46,'#3F6B49','none','#4F7F55');
  for(i=0;i<7;i++){g+=leaf(240+R()*120,300+i*30,-130+R()*40,70+R()*30,20,gr[i%4],'none')}
  g+=leaf(70,270,-40,120,30,'#3F6B49','#2F5A3C')+leaf(150,350,-20,110,28,'#4F7C58','#2F5A3C')+leaf(60,430,-60,100,26,'#2F5A3C','none')+leaf(330,420,110,100,28,'#4F7C58','none')+leaf(400,470,120,90,26,'#3F6B49','none');
  g+=bloom(350,210,150,10,'#F2EFE8','#D5CEBC')+bloom(210,140,90,40,'#F4F1EA','#D5CEBC')+bloom(430,350,95,-20,'#F1EEE6','#D5CEBC')+bloom(130,70,45,0,'#F7F5EE','#D5CEBC');
  g+=ln('M160 60C190 20 230 10 260 8',gr[0],1.4)+leaf(240,12,-10,40,10,'#6B9468','none')+leaf(190,40,-60,36,9,'#4F7C58','none');
  return SV(560,540,g)}
function artPoppies(c,bg){return SV(430,520,
  ln('M240 150C290 200 330 260 390 330C420 370 430 420 440 470',c,1.8)+ln('M290 165C320 190 350 215 375 235',c,1.4)+
  ln('M280 215C300 170 285 120 300 90C340 100 380 110 405 150C420 190 380 210 345 200',c,1.4,bg)+
  poppy(170,110,1,-15,c,bg)+poppy(250,260,1,5,c,bg)+
  ln('M300 300C340 320 380 350 410 380',c,1.6)+leaf(330,305,15,100,24,bg,c,1.2)+leaf(395,380,-100,70,18,bg,c,1.2)+leaf(420,420,-80,56,14,bg,c,1.2))}
function artBold(){var c='#111';return SV(240,400,
  ln('M10 392C60 300 120 200 196 30',c,5)+leaf(58,312,-20,120,32,'none',c,4)+leaf(84,262,-105,110,30,'none',c,4)+leaf(118,204,-12,112,30,'none',c,4)+leaf(142,150,-112,100,28,'none',c,4)+leaf(172,84,-22,72,22,'none',c,4)+leaf(186,52,-118,62,20,'none',c,4))}
function artRose(){var c='#111';return SV(220,420,
  ln('M16 124C-4 74 20 28 70 34C112 40 120 86 86 102C60 114 40 94 54 74',c,5)+ln('M70 34C92 6 132 22 122 62',c,5)+ln('M8 158C56 170 104 158 132 126',c,5)+
  ln('M88 110C92 190 96 270 110 418',c,5)+leaf(96,230,-35,92,26,'none',c,5)+leaf(100,300,-150,84,22,'none',c,5))}
function artWreathGrey(){return SV(240,230,wreath(120,110,86,92,'#7A7A7A',false))}
function artWreathWild(){return SV(400,320,wreath(200,160,140,130,'#A39571',true))}
function artBouquet(){var c='#3C3C3C',o='';
  o+=ln('M60 170C58 130 62 90 60 50',c,1.2)+ln('M60 170C45 140 30 110 28 80',c,1.2)+ln('M60 170C75 140 90 100 92 70',c,1.2)+ln('M60 170C52 120 40 90 20 60',c,1.2)+ln('M60 170C68 120 80 100 100 90',c,1.2);
  [[60,44,9],[28,72,8],[92,62,8]].forEach(function(f){o+='<g transform="translate('+f[0]+' '+f[1]+')">'+[0,72,144,216,288].map(function(a){return '<ellipse cx="0" cy="-4" rx="3.4" ry="6" transform="rotate('+a+')" fill="#FAFAF8" stroke="'+c+'" stroke-width=".9"/>'}).join('')+'<circle r="2" fill="'+c+'"/></g>'});
  o+=sprig(60,150,-100,70,6,12,'#fff',c)+sprig(60,150,-60,80,6,12,'#fff',c)+leaf(60,120,-130,28,7,'#fff',c)+leaf(60,110,-50,26,6,'#fff',c)+ln('M16 62C10 54 12 46 20 44',c,1)+ln('M100 90C108 84 112 76 108 68',c,1);
  return SV(120,180,o)}
function artOlive(){var c='#5E5B3E';return SV(120,260,
  '<path d="M40 60C30 30 55 8 80 18C98 26 100 52 84 66C74 76 50 76 40 60Z" fill="'+c+'"/><path d="M52 52C60 36 74 30 90 32" stroke="#fff" stroke-width="1.2" fill="none"/><path d="M62 70C64 54 72 44 84 40" stroke="#fff" stroke-width="1.2" fill="none"/>'+
  ln('M62 78C60 130 62 190 60 258','#8B8A74',2)+leaf(61,160,-30,56,22,c,'none')+leaf(61,140,-150,50,20,c,'none')+leaf(61,100,-120,36,14,c,'none'))}
function artFlowerMono(){var c='#2B2B2B',o='';
  [[60,40],[110,30],[90,86],[40,100],[130,90]].forEach(function(f,i){o+='<g transform="translate('+f[0]+' '+f[1]+') rotate('+i*25+')">'+[0,72,144,216,288].map(function(a){return '<ellipse cx="0" cy="-8" rx="6" ry="11" transform="rotate('+a+')" fill="#fff" stroke="'+c+'" stroke-width="1"/>'}).join('')+'<circle r="3" fill="'+c+'"/><path d="M0 0L-5 -5M0 0L6 -4" stroke="'+c+'" stroke-width=".8"/></g>'});
  o+=leaf(80,60,-30,30,8,'#fff',c,1)+leaf(70,110,40,34,9,'#fff',c,1)+leaf(30,70,-150,26,7,'#fff',c,1);return SV(170,140,o)}
function artCalla(){var c='#1B1B1B',bg='#F2F1EE';return SV(290,430,
  ln('M60 420C70 340 90 260 120 190',c,1.8)+ln('M110 210C80 180 70 120 100 70C120 60 150 70 160 100C150 150 130 190 110 210Z',c,1.6,bg)+ln('M120 90C110 130 115 160 125 190',c,1)+
  ln('M130 130C150 110 190 100 220 110C230 150 200 190 150 195Z',c,1.6,bg)+ln('M190 115C180 140 170 160 160 185',c,1)+
  ln('M120 90C130 60 150 40 170 38C175 70 165 100 150 112Z',c,1.4,bg)+
  ln('M80 330C60 290 40 270 20 260',c,1.4)+leaf(50,360,-110,110,24,bg,c,1.4)+leaf(80,330,-60,90,22,bg,c,1.2)+
  sprig(30,420,-95,150,9,22,'none',c))}
function artPink(){var g='',R=seed(9);g+=sprig(0,0,50,340,8,70,'#C98592','#B76A79','#B8707C');
  [[120,70,40],[190,130,30],[240,190,60],[290,240,20]].forEach(function(l){g+=leaf(l[0],l[1],l[2],70,18,'#D8A2AB','#B76A79',.8)});
  g+=sprig(40,30,70,220,7,50,'#E5BDC3','#CFA0A8');return SV(330,300,g)}
function artBurg(){var g='';
  g+=pampas(250,500,-10,'#E7D8CB',16)+pampas(330,500,12,'#EBDDD0',16)+pampas(140,500,-30,'#E3D0C0',10)+pampas(430,500,28,'#EBDDD0',10);
  g+=leaf(190,470,-100,90,22,'#C47C86','none')+leaf(260,430,-70,80,20,'#B5606E','none')+leaf(120,480,-140,70,18,'#C98C94','none');
  g+=chrys(330,380,95,'#9B3A4F','#B65468')+chrys(200,470,85,'#8F3347','#AD4E62')+chrys(440,500,80,'#A64458','#BE6072')+chrys(520,370,60,'#9B3A4F','#B65468');
  return SV(580,540,g)}
function MN(i){return ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'][i]}
/* ================= models ================= */
add('wed-frame-floral','Wedding invitation - green frame & peonies',{
  preset:function(s){s.th=TH('#161616','#161616','#A87A32','#F2EBDD','#FFFDF6',"'Montserrat', sans-serif");s.els.push(IM('a1',artPeony(),476,-4,348,336))},
  html:function(){var g='#5B6B55';
    return '<div style="position:absolute;left:102px;top:134px;width:612px;height:803px;border:1.5px solid '+g+'"></div>'+
    X(184,E('TOGETHER')+'<br>'+E('WITH THEIR FAMILIES'),15,{ls:.16,f:'var(--fb)'})+
    X(270,E('Sarah'),70,{f:"'Allura', cursive",c:'var(--a)',lh:1})+X(358,E('&'),38,{f:"'Allura', cursive",c:'var(--a)',lh:1})+X(410,E('Bernard'),70,{f:"'Allura', cursive",c:'var(--a)',lh:1})+
    X(532,E('INVITE YOU TO JOIN THEIR')+'<br>'+E('WEDDING CELEBRATION ON'),15,{ls:.16,f:'var(--fb)'})+
    X(606,E('FEBRUARY'),15,{ls:.18,f:'var(--fb)'})+X(628,E('14'),66,{f:'var(--fb)',w:500,lh:1})+X(702,E('2027'),15,{ls:.2,f:'var(--fb)',c:'#6B4A3A'})+
    HL(190,641,136,'#161616',1.5)+HL(190,688,136,'#161616',1.5)+X(652,E('SUNDAY'),17,{ls:.14,f:'var(--fb)',l:190,wd:136})+
    HL(498,641,136,'#161616',1.5)+HL(498,688,136,'#161616',1.5)+X(652,E('AT 4PM'),17,{ls:.14,f:'var(--fb)',l:498,wd:136})+
    X(752,E(V2)+'<br>'+E(V3),15,{ls:.16,f:'var(--fb)',c:'#6B4A3A',lh:1.55})+
    X(838,E('Reception to follow'),38,{f:"'Allura', cursive",c:'#6B4A3A',lh:1.1})}});
add('wed-poppy-left','Wedding invitation - poppy line art',{
  preset:function(s){s.th=TH('#262626','#262626','#262626','#EDE6E1','#F9F5F2',"'Italiana', serif","'Montserrat', sans-serif");s.els.push(IM('a1',artPoppies('#6A6A6A','#F9F5F2'),386,36,430,520))},
  html:function(){var c='#2A2A2A';
    return VL(80,76,175,c,1.4)+HL(80,76,262,c,1.4)+VL(787,598,422,c,1.4)+HL(527,1019,260,c,1.4)+
    X(250,E('SARAH'),84,{al:'left',l:80,ls:.04,lh:1})+X(372,E('and'),54,{al:'left',l:78,f:"'Allura', cursive",lh:1,c:'#262626'})+X(430,E('BERNARD'),84,{al:'left',l:80,ls:.04,lh:1})+
    X(620,E('REQUEST THE PLEASURE OF YOUR COMPANY'),13,{al:'left',l:82,ls:.24,f:'var(--fb)',c:'#262626'})+X(654,E('AT THEIR WEDDING CELEBRATION'),13,{al:'left',l:82,ls:.24,f:'var(--fb)',c:'#262626'})+
    X(724,E('AT 4PM, 14 FEBRUARY 2027'),21,{al:'left',l:82,ls:.2,f:'var(--fb)',c:'#262626'})+
    X(776,E(V2),12.5,{al:'left',l:82,ls:.2,f:'var(--fb)',c:'#262626'})+X(808,E(V3),12.5,{al:'left',l:82,ls:.2,f:'var(--fb)',c:'#262626'})+
    X(870,E('Please RSVP by January 31st'),36,{al:'left',l:70,f:"'Outfit', sans-serif",c:'#262626',lh:1.1})+X(948,E('WWW.SARAHANDBERNARD.COM'),18,{al:'left',l:82,ls:.28,f:'var(--fb)',c:'#262626'})}});
add('wed-line-script','Wedding invitation - line art & script',{
  preset:function(s){s.th=TH('#111','#111','#111','#EEE','#FCFCFB',SER,SER);s.els.push(IM('a1',artBold(),600,30,216,360),IM('a2',artRose(),0,596,200,420))},
  html:function(){return X(262,E('TOGETHER')+'<br>'+E('WITH THEIR FAMILIES'),15,{ls:.2,lh:1.55})+
    X(352,E('Sarah &amp; Bernard'),78,{f:"'Great Vibes', cursive",lh:1.2})+
    X(494,E('INVITE YOU TO JOIN THEIR')+'<br>'+E('WEDDING CELEBRATION ON'),15,{ls:.2,lh:1.55})+
    X(590,E('FEBRUARY'),16,{ls:.2})+HL(217,621,138,'#111')+HL(217,660,138,'#111')+HL(455,621,138,'#111')+HL(455,660,138,'#111')+
    X(628,E('SUN'),17,{ls:.18,l:217,wd:138})+X(612,E('14'),44,{lh:1.2})+X(628,E('04.00 PM'),17,{ls:.18,l:455,wd:138})+X(668,E('2027'),16,{ls:.2})+
    X(738,E('The Grandville Estate')+'<br>'+E('1234 Willow Creek Road')+'<br>'+E('Napa Valley, California'),19,{lh:1.5,ls:.04})}});
add('wed-wreath-grey','Wedding invitation - grey wreath monogram',{
  preset:function(s){s.th=TH('#6C6C6C','#6C6C6C','#8A8A8A','#EEE','#FFFFFF',"'Libre Baskerville', serif","'Libre Baskerville', serif");s.els.push(IM('a1',artWreathGrey(),284,86,248,238))},
  html:function(){var c='var(--t)';
    return X(168,E('S')+'<span style="display:inline-block;width:6px"></span>'+E('B'),46,{f:"'Great Vibes', cursive",c:'#808080',lh:1})+
    X(344,E('TOGETHER'),30,{ls:.3,f:"'Cormorant Garamond', serif",lh:1.1})+X(384,E('with'),22,{it:1,ls:.1,lh:1})+X(412,E('their families'),22,{it:1,ls:.1,lh:1})+
    X(510,E('SARAH'),28,{ls:.2})+X(568,E('and'),24,{it:1})+X(620,E('BERNARD'),28,{ls:.2})+
    X(718,E('Invite you to celebrate their Marriage'),15,{it:1,ls:.12})+
    X(770,E('Sunday, 14th of February, 2027')+'<br>'+E('at 4 O&#39;Clock in the Afternoon')+'<br>'+E('The Grandville Estate, Napa Valley'),15,{it:1,ls:.1,lh:1.95})+
    X(918,E('Reception to follow'),44,{f:"'Pinyon Script', cursive",c:'#909090',lh:1.1})}});
add('wed-blue-vines','Wedding invitation - blue vines',{
  preset:function(s){s.th=TH('#1F3A7A','#1F3A7A','#1F3A7A','#E4EAF6','#FFFFFF',SER,SER);s.els.push(IM('a1',vine('#1F3A7A'),138,86,540,151),IM('a2',vine('#1F3A7A').replace('<svg ','<svg style="transform:scaleY(-1)" '),138,818,540,151))},
  html:function(){return X(268,E('SARAH'),46,{ls:.24,lh:1})+X(335,E('and'),18,{it:1,lh:1})+X(380,E('BERNARD'),46,{ls:.24,lh:1})+
    X(500,E('Joyfully announce')+'<br>'+E('their marriage'),21,{lh:1.5})+
    X(594,E('SUNDAY 14 FEBRUARY 2027'),17,{ls:.24,w:700,lh:1.3})+
    X(660,E('At 4 PM in the afternoon')+'<br>'+E('The Grandville Estate')+'<br>'+E('1234 Willow Creek Road, Napa Valley'),19,{lh:1.65})}});
add('wed-wildflower','Wedding invitation - wildflower wreath',{
  preset:function(s){s.th=TH('#9B8E66','#9B8E66','#9B8E66','#F1ECDD','#FDFCF9',"'Libre Baskerville', serif","'Libre Baskerville', serif");s.els.push(IM('a1',artWreathWild(),208,60,400,320))},
  html:function(){var c='var(--t)';
    return X(190,E('S'),40,{l:316,wd:60,al:'right',f:SER,lh:1})+VL(407,196,40,c)+X(190,E('B'),40,{l:420,wd:60,al:'left',f:SER,lh:1})+
    X(424,E('SARAH'),30,{ls:.14,lh:1})+X(494,'<svg width="60" height="14" viewBox="0 0 60 14"><path d="M2 8C14 2 24 12 30 7C36 2 46 12 58 6" stroke="#9B8E66" fill="none" stroke-width="1.2"/></svg>',10,{lh:1})+X(548,E('BERNARD'),30,{ls:.14,lh:1})+
    X(628,E('with full hearts,'),17,{it:1,ls:.04})+X(654,E('joyfully invite you to their wedding'),17,{it:1,ls:.04})+
    X(716,E('FEBRUARY 14, 2027')+'<br>'+E('FOUR IN THE AFTERNOON')+'<br>'+E(V1)+'<br>'+E(V2)+'<br>'+E(V3),14,{ls:.18,lh:2.1})+
    X(872,E('reception to follow'),30,{f:"'Allura', cursive",lh:1.1})}});
add('wed-blue-poppy','Wedding invitation - blue poppies',{
  preset:function(s){s.th=TH('#5B87CC','#5B87CC','#C7A64A','#E8EEF9','#FBFBFB',SER,SER);s.els.push(IM('a1',artPoppies('#5B87CC','#FBFBFB'),420,40,420,520),IM('a2',artPoppies('#5B87CC','#FBFBFB'),-70,600,360,440))},
  html:function(){return X(264,E('join us for the wedding of'),20,{it:1,ls:.14})+
    X(334,E('SARAH'),56,{ls:.02,lh:1})+X(404,E('THE BRIDE'),13,{ls:.28,c:'var(--a)'})+X(436,E('&amp;'),20,{lh:1})+X(490,E('BERNARD'),56,{ls:.02,lh:1})+X(558,E('THE GROOM'),13,{ls:.28,c:'var(--a)'})+
    X(610,E('14.02.2027 | AT 4PM'),27,{ls:.1})+X(662,E('The Grandville Estate')+'<br>'+E('1234 Willow Creek Road, Napa Valley'),19,{it:1,ls:.08,lh:1.7})+
    X(760,E('reception to follow'),21,{it:1,ls:.12})}});
add('wed-mini-bouquet','Wedding invitation - minimal bouquet',{
  preset:function(s){s.th=TH('#3C3C3C','#3C3C3C','#3C3C3C','#EEE','#FAFAF8',"'Cormorant Garamond', serif","'Cormorant Garamond', serif");s.els.push(IM('a1',artBouquet(),338,226,140,210))},
  html:function(){return X(456,E('S'),30,{l:318,wd:60,al:'right',lh:1})+X(456,E('B'),30,{l:438,wd:60,al:'left',lh:1})+
    X(556,E('sarah')+'<span style="display:inline-block;width:46px;border-top:1.5px solid var(--t);vertical-align:middle;margin:0 18px"></span>'+E('bernard'),30,{ls:.06})+
    X(650,E('invite you to celebrate their wedding')+'<br>'+E('on the fourteenth of february, twenty twenty-seven')+'<br>'+E('at four in the afternoon')+'<br>'+E('at the grandville estate in napa valley'),16,{ls:.06,lh:1.75})+
    X(826,E('the reception will follow'),15,{it:1,ls:.06})}});
add('wed-olive-flower','Wedding invitation - olive flower',{
  preset:function(s){s.th=TH('#5E5B3E','#5E5B3E','#8E8C78','#EFEEE4','#FFFFFF',"'Italiana', serif","'Cormorant Garamond', serif");s.els.push(IM('a1',artOlive(),360,120,100,216))},
  html:function(){return X(300,E('S'),30,{l:330,wd:50,al:'right',f:SER,lh:1,c:'#8E8C78'})+X(300,E('B'),30,{l:452,wd:50,al:'left',f:SER,lh:1,c:'#8E8C78'})+
    X(352,E('SARAH'),88,{lh:1,ls:.02})+X(442,E('&amp;'),64,{f:"'Pinyon Script', cursive",l:120,wd:140,al:'right',lh:1})+X(442,E('BERNARD'),88,{lh:1,ls:.02,l:150,wd:650,al:'center',st:'padding-left:60px'})+
    X(612,E('Invite you to share in their wedding celebration'),20,{it:1,w:700,ls:.04})+
    X(664,E('SUNDAY, FEBRUARY 14, 2027'),19,{w:700,ls:.1})+X(700,E('At four in the afternoon')+'<br>'+E('The Grandville Estate, Napa Valley, California'),21,{it:1,w:700,lh:1.6})+
    X(818,E('Reception to follow'),52,{f:"'Pinyon Script', cursive",c:'#9A9A8E',lh:1.1})}});
add('wed-lovestory','Wedding invitation - our love story',{
  preset:function(s){s.th=TH('#3A3A3A','#3A3A3A','#3A3A3A','#EEE','#F6F4EF',"'Montserrat', sans-serif","'Cormorant Garamond', serif")},
  html:function(){return X(206,E('14 / 02'),14,{ls:.2,f:'var(--fb)'})+X(358,E('OUR LOVE STORY'),21,{ls:.2,f:SER})+
    X(438,E('SARAH &amp; BERNARD'),52,{ls:.06,w:300,lh:1})+
    X(596,E('Together with our families we would')+'<br>'+E('like to invite you to celebrate our')+'<br>'+E('wedding.'),22,{f:SER,it:1,lh:1.5,ls:.04})+
    X(842,E('SUNDAY 14 FEBRUARY 2027 | 4 PM'),14,{ls:.2,f:'var(--fb)'})+X(880,E('THE GRANDVILLE ESTATE, NAPA VALLEY'),14,{ls:.2,f:'var(--fb)'})+X(1002,E('@SARAHANDBERNARD'),13,{ls:.2,f:'var(--fb)'})}});
add('wed-monogram-floral','Wedding invitation - floral monogram',{
  preset:function(s){s.th=TH('#161616','#161616','#161616','#E9EFED','#F4F8F7',"'Cormorant Garamond', serif","'Libre Baskerville', serif");s.els.push(IM('a1',artFlowerMono(),372,196,230,190))},
  html:function(){return X(84,E('S'),178,{l:252,wd:200,al:'center',f:"'Playfair Display', serif",lh:1,w:700,st:'font-family:\'Playfair Display\',serif'})+X(150,E('B'),150,{l:420,wd:200,al:'center',lh:1,w:700,st:'font-family:\'Playfair Display\',serif'})+
    X(404,E('S A R A H'),44,{ls:.24,lh:1})+X(466,E('&amp; B E R N A R D'),44,{ls:.24,lh:1})+
    X(588,E('DEAR GUESTS!')+'<br>'+E('WE ARE HAPPY TO INVITE YOU TO BE BY OUR SIDE')+'<br>'+E('ON THE DAY OF OUR WEDDING!'),14,{ls:.14,f:'var(--fb)',lh:1.75})+
    X(722,E('02')+'<span style="display:inline-block;height:30px;border-left:1.5px solid var(--t);margin:0 28px;vertical-align:middle"></span>'+E('14')+'<span style="display:inline-block;height:30px;border-left:1.5px solid var(--t);margin:0 28px;vertical-align:middle"></span>'+E('2027'),56,{f:"'Libre Baskerville', serif",w:700,lh:1.2})+
    X(822,E('START AT 4:00 PM'),14,{ls:.2,f:'var(--fb)'})+X(872,E(V1+', '+V3.split(',')[0]),16,{ls:.18,f:'var(--fb)',lh:1.7})+X(902,E(V2),16,{ls:.18,f:'var(--fb)'})}});
add('wed-vertical-date','Wedding invitation - vertical date & calla',{
  preset:function(s){s.th=TH('#161616','#161616','#161616','#ECEAE6','#F2F1EE',"'Cormorant Garamond', serif","'Cormorant Garamond', serif");s.els.push(IM('a1',artCalla(),0,618,290,430))},
  html:function(){return VL(169,0,138,'#161616',1.5)+
    X(170,E('02'),84,{l:96,wd:150,al:'center',lh:1})+X(300,E('14'),84,{l:96,wd:150,al:'center',lh:1})+X(412,E('27'),84,{l:96,wd:150,al:'center',lh:1})+
    X(180,E('Sarah'),104,{al:'left',l:310,f:"'Sacramento', cursive",lh:1.1})+X(318,E('Bernard'),104,{al:'left',l:278,f:"'Sacramento', cursive",lh:1.1})+
    X(600,E('WE WOULD BE HAPPY TO HAVE YOU')+'<br>'+E('WITH US AT OUR WEDDING CELEBRATION.'),15,{al:'left',l:242,ls:.1,lh:1.9})+
    X(722,E('14 FEBRUARY 2027'),34,{al:'left',l:392,ls:.1,lh:1.2})+X(796,E('SUNDAY')+'<span style="display:inline-block;height:14px;border-left:1.5px solid var(--t);margin:0 18px;vertical-align:middle"></span>'+E('AT 4 PM'),15,{al:'left',l:392,ls:.1})+
    X(866,E(V1),18,{al:'left',l:374,w:700,ls:.06})+X(912,E(V2)+'<br>'+E(V3),14.5,{al:'left',l:374,ls:.06,lh:1.9})}});
add('wed-burgundy','Wedding invitation - burgundy florals',{
  preset:function(s){s.th=TH('#7A3B3B','#7A3B3B','#7A3B3B','#F0E1DC','#F5EEEA',"'Cormorant Garamond', serif","'Cormorant Garamond', serif");s.els.push(IM('a1',artPink(),540,-30,300,270),IM('a2',artBurg(),250,560,580,540))},
  html:function(){var orn='<div style="position:absolute;left:0;width:816px;top:TOPpx;display:flex;justify-content:center;align-items:center;gap:8px"><i style="width:98px;border-top:1px solid var(--t)"></i><i style="width:7px;height:7px;background:var(--t);transform:rotate(45deg)"></i><i style="width:98px;border-top:1px solid var(--t)"></i></div>';
    return X(112,E('SARAH'),84,{ls:.22,lh:1})+X(204,E('&amp; BERNARD'),27,{ls:.42,lh:1})+orn.replace('TOP','236')+
    X(262,E('We are excited to announce that')+'<br>'+E('Sarah &amp; Bernard will be'),21,{ls:.1,lh:1.55})+
    X(334,E('Getting Married'),96,{f:"'Allura', cursive",lh:1.1})+X(470,E('at The Grandville Estate'),22,{ls:.16})+
    VL(408,540,76,'var(--t)')+X(540,E('14')+'<sup style="font-size:.4em;letter-spacing:.1em;vertical-align:top;position:relative;top:.3em">'+E('TH')+'</sup>',54,{l:140,wd:240,lh:1.1})+X(600,E('FEBRUARY'),22,{l:140,wd:240,ls:.22})+
    X(540,E('2027'),54,{l:436,wd:240,lh:1.1})+X(600,E('AT 4 PM'),22,{l:436,wd:240,ls:.22})+
    X(670,E('SAVE THE DATE'),18,{ls:.3})+orn.replace('TOP','694')+
    X(730,E('Join Us'),64,{f:"'Allura', cursive",lh:1.1})+X(808,E('AT THE GRANDVILLE ESTATE,')+'<br>'+E('NAPA VALLEY'),17,{ls:.2,lh:1.6})}});
/* ---- save the date ---- */
add('std-bold-numbers','Save the date - bold numbers',{
  preset:function(s){s.th=TH('#111','#111','#111','#EEE','#FFFFFF',"'Abril Fatface', serif","'Italiana', serif")},
  html:function(){return X(76,E('SAVE THE DATE'),22,{f:"'Italiana', serif",ls:.04})+
    X(86,E('02'),330,{lh:1,f:"'Abril Fatface', serif"})+X(332,E('14'),330,{lh:1,f:"'Abril Fatface', serif"})+X(570,E('27'),330,{lh:1,f:"'Abril Fatface', serif",l:60,wd:756,st:'padding-left:70px'})+
    X(384,E('TH'),20,{l:540,wd:60,al:'left',f:"'Italiana', serif",lh:1})+X(716,E('20'),22,{l:158,wd:60,al:'right',f:"'Italiana', serif",lh:1})+
    X(890,E('SARAH &amp; BERNARD'),66,{f:"'Italiana', serif",lh:1.1})+X(958,E('are getting married at Napa Valley'),31,{f:"'Montserrat', sans-serif",lh:1.2,w:400})}});
add('std-calendar','Save the date - calendar & heart',{
  cal:'month',
  preset:function(s){s.th=TH('#161616','#161616','#161616','#EEE','#F4F4F4',"'Italiana', serif","'Montserrat', sans-serif");s.cal={m:1,y:2027}},
  html:function(S){var m=S.cal.m,y=S.cal.y,off=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate(),xs=[200,271,341,411,481,548,617],o='';
    var swash='<svg style="position:absolute;left:0;top:150px" width="816" height="130" viewBox="0 0 816 130"><path d="M0 100C40 112 90 100 126 86" stroke="#161616" fill="none" stroke-width="1.6"/><path d="M690 86C730 66 780 64 816 72" stroke="#161616" fill="none" stroke-width="1.6"/></svg>';
    'SMTWTFS'.split('').forEach(function(d,i){o+=X(478,E(d),20,{l:xs[i]-20,wd:40,f:'var(--fb)',w:300,lh:1})});
    for(var d=1;d<=n;d++){var i=d-1+off,r=Math.floor(i/7),c=i%7,top=516+r*40;
      if(d===14)o+='<svg style="position:absolute;left:'+(xs[c]-30)+'px;top:'+(top-6)+'px" width="62" height="54" viewBox="0 0 62 54"><path d="M31 50C8 34 2 22 6 12C12 0 26 2 31 14C36 2 50 0 56 12C60 22 54 34 31 50Z" fill="#EF6B64" fill-opacity=".9"/><path d="M12 18L30 8M10 26L40 8M14 34L48 12M20 40L54 22M28 44L56 30" stroke="#fff" stroke-opacity=".4" stroke-width="1"/></svg>';
      o+='<div style="position:absolute;left:'+(xs[c]-20)+'px;width:40px;top:'+top+'px;text-align:center;font:300 25px/1.2 var(--fb);color:var(--t)">'+d+'</div>'}
    return swash+X(150,E('save the date'),124,{f:"'Allura', cursive",lh:1.2})+X(338,E('SARAH + BERNARD'),36,{ls:.3,lh:1})+
      X(432,MN(m),23,{ls:.3,f:'var(--fb)',w:300,lh:1})+o+
      X(790,E('02.14.2027')+' | '+E('NAPA VALLEY, CALIFORNIA'),22,{ls:.3,f:'var(--fb)',w:300})+X(850,E('formal invitation to follow'),38,{f:"'Allura', cursive",lh:1.2})+
      X(962,E('website: www.sarahandbernard.com'),23,{f:'var(--fb)',w:400})}});
})();
