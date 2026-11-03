/* Emadeck - modeles CV (suite, autonome) */
(function(){
'use strict';
var P=window.PLANNER_MODELS=window.PLANNER_MODELS||{};
function add(id,name,o){o.name=name;P[id]=o}
function E(t,c,st){return '<span class="ed'+(c?' '+c:'')+'"'+(st?' style="'+st+'"':'')+'>'+t+'</span>'}
function U(svg){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function TH(t,x,a,p,b,f,g){return {title:t,text:x,accent:a,pale:p,bg:b,fh:f,fb:g||f}}
function D(st,inner){return '<div style="'+st+'">'+inner+'</div>'}
function A(l,t,w,h,inner,st){return '<div style="position:absolute;left:'+l+'px;top:'+t+'px;width:'+w+'px;'+(h?'height:'+h+'px;':'')+(st||'')+'">'+inner+'</div>'}
var LO='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';
var LB='Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.';
var SZ=12,W='#FFFFFF';
var CT=['+000 123 456 789','hello@reallygreatsite.com','123 Anywhere St., Any City','www.reallygreatsite.com'];
var SK=['Skill one','Skill two','Skill three','Skill four'];
function para(t,sz,st){return D('font:400 '+(sz||SZ)+'px/1.555 var(--fb);color:var(--x);'+(st||''),E(t))}
function bl(n,sz,col){var s='';for(var i=0;i<n;i++)s+=D('display:flex;gap:6px;font:400 '+(sz||SZ)+'px/1.55 var(--fb);color:'+(col||'var(--x)')+';margin-bottom:2px','<span>&bull;</span><span>'+E(LB)+'</span>');return s}
function hd(t,st){return D('font:700 12.5px var(--fb);letter-spacing:.16em;color:var(--t);'+(st||''),E(t))}
function hr(st){return D('border-top:1px solid var(--ln);'+(st||''),'')}
function job(role,co,dt,n,col){return D('margin-bottom:16px',D('font:700 '+(SZ+.5)+'px/1.4 var(--fb);color:'+(col||'var(--t)'),E(role))+D('font:400 '+(SZ-.5)+'px/1.4 var(--fb);color:'+(col||'var(--x)')+';opacity:.85;margin-bottom:3px',E(co)+' &nbsp;|&nbsp; '+E(dt))+bl((n||2)+1,SZ,col))}
function jobD(role,co,dt,n,col){return D('display:flex;gap:14px;margin-bottom:16px',D('width:88px;flex:none;font:400 '+(SZ-1)+'px/1.5 var(--fb);color:'+(col||'var(--x)'),E(dt))+D('flex:1;min-width:0',D('font:700 '+(SZ+.5)+'px/1.4 var(--fb);color:'+(col||'var(--t)'),E(role))+D('font:400 '+(SZ-.5)+'px/1.4 var(--fb);color:'+(col||'var(--x)')+';opacity:.85;margin-bottom:3px',E(co))+bl((n||2)+1,SZ,col)))}
function edu(deg,sc,dt,col){return D('margin-bottom:9px',D('font:700 '+(SZ+.5)+'px/1.4 var(--fb);color:'+(col||'var(--t)'),E(deg))+D('font:400 '+(SZ-.5)+'px/1.4 var(--fb);color:'+(col||'var(--x)')+';opacity:.85',E(sc)+' &nbsp;|&nbsp; '+E(dt)))}
function eduD(dt,deg,sc,col){return D('display:flex;gap:14px;margin-bottom:12px',D('width:88px;flex:none;font:400 '+(SZ-1)+'px/1.5 var(--fb);color:'+(col||'var(--x)'),E(dt))+D('flex:1;min-width:0',D('font:700 '+(SZ+.5)+'px/1.4 var(--fb);color:'+(col||'var(--t)'),E(deg))+D('font:400 '+(SZ-.5)+'px/1.4 var(--fb);color:'+(col||'var(--x)')+';opacity:.85',E(sc))))}
function ct(items,col,sz){return items.map(function(t){return D('font:400 '+(sz||SZ)+'px/1.55 var(--fb);color:'+(col||'var(--x)')+';margin-bottom:5px',E(t))}).join('')}
function sk(items,col,sz){return items.map(function(t){return D('display:flex;gap:6px;font:400 '+(sz||SZ)+'px/1.55 var(--fb);color:'+(col||'var(--x)')+';margin-bottom:2px','<span>&bull;</span><span>'+E(t)+'</span>')}).join('')}
function bar(t,pc,col){return D('margin-bottom:8px;font:400 '+(SZ-.5)+'px var(--fb);color:'+(col||'var(--x)'),E(t)+D('height:4px;background:var(--ln2);margin-top:3px;border-radius:2px','<div style="width:'+pc+'%;height:4px;border-radius:2px;background:var(--a)"></div>'))}
function pills(items,c,bd){return D('display:flex;flex-wrap:wrap;gap:6px',items.map(function(t){return '<span style="border:1px solid '+(bd||c||'var(--ln)')+';border-radius:14px;padding:3px 11px;font:400 '+(SZ-1.5)+'px var(--fb);color:'+(c||'var(--x)')+'">'+E(t)+'</span>'}).join(''))}
function dots(t,n,c){var s='';for(var i=0;i<5;i++)s+='<span style="display:inline-block;width:9px;height:9px;border-radius:50%;margin-left:4px;background:'+(i<n?'var(--a)':'var(--ln2)')+'"></span>';return D('display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font:400 '+(SZ-.5)+'px var(--fb);color:'+(c||'var(--x)'),E(t)+'<span>'+s+'</span>')}
function ph(id,x,y,w,h,shape,bg,fg){
  var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><defs><clipPath id="c"><'+(shape==='circle'?'ellipse cx="'+w/2+'" cy="'+h/2+'" rx="'+w/2+'" ry="'+h/2+'"':'rect width="'+w+'" height="'+h+'"')+'/></clipPath></defs><g clip-path="url(#c)"><rect width="'+w+'" height="'+h+'" fill="'+(bg||'#D9D9D9')+'"/><circle cx="'+w/2+'" cy="'+h*.38+'" r="'+Math.min(w,h)*.17+'" fill="'+(fg||'#B5B5B5')+'"/><ellipse cx="'+w/2+'" cy="'+h*1.0+'" rx="'+w*.36+'" ry="'+h*.34+'" fill="'+(fg||'#B5B5B5')+'"/></g></svg>';
  return {id:id,t:'img',src:U(svg),x:x,y:y,w:w,h:h,flip:false,ph:shape}}
function VL(l,t,h){return '<div style="position:absolute;left:'+l+'px;top:'+t+'px;height:'+(h-t)+'px;border-left:1px solid var(--ln)"></div>'}
function withSZ(n,fn){var z=SZ;SZ=n;try{return fn()}finally{SZ=z}}
function PR(t,p){return function(s){s.th=TH.apply(null,t);(p||[]).forEach(function(a){s.els.push(ph.apply(null,a))})}}
function CR(c,st){return D('display:flex;gap:22px;font:400 9.5px var(--fb);color:'+(c||'var(--x)')+';'+(st||''),E(CT[0])+E(CT[1])+E(CT[2]))}
function NM(n,t,o){o=o||{};return D('font:'+(o.w||700)+' '+(o.fs||32)+'px/'+(o.lh||1.1)+' var(--fh);color:'+(o.c||'var(--t)')+';letter-spacing:'+(o.ls||0)+'em;'+(o.nst||''),E(n))+(t?D('font:500 '+(o.ts||11)+'px var(--fb);letter-spacing:'+(o.tl==null?.2:o.tl)+'em;color:'+(o.tc||'var(--x)')+';margin-top:'+(o.mt||6)+'px;'+(o.tst||''),E(t)):'')}
function SG(c){return D('display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 20px',sk(['Project planning','Risk management','Team leadership'],c)+sk(['Budgeting','Agile / Scrum','Communication'],c)+sk(['Reporting','Negotiation','Problem solving'],c))}
var LEAF='<svg width="200" height="190" viewBox="0 0 200 190"><g fill="none" stroke="#6E7F68" stroke-width="1.3"><path d="M190 0 C175 55 140 105 80 160"/><path d="M168 40 C150 30 140 36 136 52 C152 58 164 54 168 40Z"/><path d="M152 76 C134 66 124 72 120 88 C136 94 148 90 152 76Z"/><path d="M130 104 C112 94 102 100 98 116 C114 122 126 118 130 104Z"/><path d="M178 52 C196 52 202 64 196 76 C182 74 176 66 178 52Z"/><path d="M158 92 C176 92 182 104 176 116 C162 114 156 106 158 92Z"/></g></svg>';
var L_EN={contact:'CONTACT',profile:'PROFILE',about:'ABOUT ME',exp:'WORK EXPERIENCE',edu:'EDUCATION',skills:'SKILLS',lang:'LANGUAGES',ref:'REFERENCES',int:'INTERESTS',cert:'CERTIFICATIONS',sw:'SOFTWARE',bars:'SKILLS',dots:'SKILLS'};
var L_FR={contact:'CONTACT',profile:'PROFIL',about:'À PROPOS',exp:'EXPÉRIENCES PROFESSIONNELLES',edu:'FORMATION',skills:'COMPÉTENCES',lang:'LANGUES',ref:'RÉFÉRENCES',int:'LOISIRS',cert:'CERTIFICATS',sw:'LOGICIELS',bars:'COMPÉTENCES',dots:'COMPÉTENCES'};
/* styles de titres de section: (titre, contenu, couleur texte, couleur titre) */
var HS={
 rule:function(t,i,c,h){return D('margin-bottom:22px',hd(t,(h||c)?'color:'+(h||c):'')+hr('margin:4px 0 8px'+(c?';border-top-color:'+c+';opacity:1':''))+i)},
 plain:function(t,i,c,h){return D('margin-bottom:22px',hd(t,(h||c)?'color:'+(h||c):'')+D('height:7px','')+i)},
 acc:function(t,i,c,h){return D('margin-bottom:22px',hd(t,'color:'+(h||'var(--a)'))+hr('margin:4px 0 8px')+i)},
 center:function(t,i,c,h){return D('margin-bottom:22px',D('text-align:center;border-bottom:1px solid var(--ln);padding-bottom:5px;margin-bottom:9px',hd(t,(h||c)?'color:'+(h||c):''))+i)},
 tag:function(t,i,c,h){return D('margin-bottom:22px',D('display:inline-block;background:var(--a);color:#fff;font:700 10.5px var(--fb);letter-spacing:.14em;padding:5px 12px;margin-bottom:9px',E(t))+i)},
 box:function(t,i,c,h){return D('margin-bottom:22px',D('background:var(--a);color:#fff;font:700 11px var(--fb);letter-spacing:.14em;padding:5px 10px;margin-bottom:9px',E(t))+i)},
 lbl:function(t,i,c,h){return D('display:flex;gap:20px;margin-bottom:22px',D('width:128px;flex:none;padding-top:1px',hd(t,'font-size:11px;'+((h||c)?'color:'+(h||c):'')))+D('flex:1;min-width:0',i))},
 tl:function(t,i,c,h){return D('position:relative;padding-left:22px;margin-bottom:22px','<span style="position:absolute;left:0;top:3px;width:9px;height:9px;border-radius:50%;background:var(--a)"></span>'+hd(t,(h||c)?'color:'+(h||c):'')+D('height:6px','')+i)}
};
function jobs(o){var k=o.jobs||3,b=o.b||3,dt=['2020 - Present','2017 - 2020','2014 - 2017','2011 - 2014'],s='';for(var i=0;i<k;i++)s+=(o.dated?jobD:job)('Job Position','Company Name',dt[i],b-1,o.c);return s}
function B(k,o){var c=o.c,cs=c?'color:'+c:'';switch(k){
 case 'contact':return ct(o.items||CT,c,10.5);
 case 'profile':case 'about':return para(LO,0,cs);
 case 'exp':return jobs(o);
 case 'edu':return o.dated?eduD('2014 - 2018','Degree Name','University Name',c)+(o.one?'':eduD('2012 - 2014','Degree Name','University Name',c)):edu('Degree Name','University Name','2014 - 2018',c)+(o.one?'':edu('Degree Name','University Name','2012 - 2014',c));
 case 'skills':return o.pills?pills(o.items||SK,c):sk(o.items||SK,c);
 case 'bars':return bar('Skill one',90,c)+bar('Skill two',80,c)+bar('Skill three',70,c)+bar('Skill four',60,c);
 case 'dots':return dots('Skill one',5,c)+dots('Skill two',4,c)+dots('Skill three',4,c)+dots('Skill four',3,c);
 case 'lang':return o.bars?bar('English',90,c)+bar('French',80,c):sk(['English','French'],c);
 case 'ref':return D('display:flex;gap:24px',D('flex:1',para('Reference Name',0,cs)+para('Company / Position',0,cs)+para('+000 123 456 789',0,cs))+D('flex:1',para('Reference Name',0,cs)+para('Company / Position',0,cs)+para('+000 123 456 789',0,cs)));
 case 'int':return sk(['Reading','Travel','Music'],c);
 case 'cert':return sk(['Award or certification name','Award or certification name'],c);
 case 'sw':return bar('Photoshop',90,c)+bar('Illustrator',85,c)+bar('InDesign',70,c);
 }return ''}
function S(h,k,o,L){o=o||{};L=L||L_EN;return HS[h](o.t||L[k],B(k,o),o.c,o.hc)}
function F(h,k,o){return S(h,k,o,L_FR)}
var SANS="'Montserrat', sans-serif",INT="'Inter', sans-serif";

/* ===== A. ATS & minimal (suite) ===== */
add('cv-ats-badge','CV - ATS friendly badge',{
  preset:PR(['#111111','#2B2B2B','#111111','#EEEEEE','#FFFFFF',INT]),
  html:function(){return A(724,34,56,56,D('width:56px;height:56px;border-radius:50%;background:#111;color:#fff;font:700 11px var(--fb);display:flex;align-items:center;justify-content:center',E('ATS')))+
   A(56,50,704,0,D('text-align:center;margin-bottom:18px',NM('Armand Bernard','Professional Title',{fs:24,tl:0,ts:12})+D('margin-top:8px',CR(null,'justify-content:center')))+
   S('center','profile',{t:'Summary'})+S('center','exp',{jobs:3})+S('center','edu')+HS.center('SKILLS',SG()))}});
add('cv-ats-jessica','CV - ATS plain left',{
  preset:PR(['#1A1A1A','#333333','#1A1A1A','#EDEDED','#FFFFFF',INT]),
  html:function(){return A(56,48,704,0,D('font:700 26px/1.2 var(--fh);color:var(--t)',E('Sarah Candal'))+D('font:400 11px var(--fb);color:var(--x);margin:3px 0 7px',E('Professional Title'))+CR()+D('border-top:3px solid var(--t);margin:12px 0 18px','')+
   S('rule','profile',{t:'PROFESSIONAL SUMMARY'})+S('rule','exp',{t:'EXPERIENCE',jobs:3})+S('rule','edu')+HS.rule('SKILLS',SG())+S('rule','cert'))}});
add('cv-your-name','CV - clean left aligned',{
  preset:PR(['#1B1B1B','#3A3A3A','#1B1B1B','#EEEEEE','#FFFFFF',INT]),
  html:function(){return A(56,52,704,0,D('font:300 32px/1.2 var(--fh);color:var(--t)',E('Armand Bernard'))+D('font:500 12px var(--fb);color:var(--x);margin:2px 0 8px',E('Position'))+CR()+D('border-top:1px solid var(--t);margin:12px 0 18px','')+
   S('rule','profile',{t:'ABOUT ME'})+S('rule','edu')+S('rule','exp',{jobs:3})+HS.rule('SKILLS',SG())+S('rule','ref'))}});
add('cv-elena-pink','CV - pink serif ATS',{
  preset:PR(['#B9657A','#4A4A4A','#B9657A','#F6E4E8','#FFFFFF',"'Cormorant Garamond', serif",SANS]),
  html:function(){return A(56,52,704,0,D('text-align:center;margin-bottom:18px',NM('SARAH CANDAL','DIGITAL MARKETING',{fs:30,ls:.22,w:600,ts:11})+D('margin-top:10px;border-top:1px solid var(--a);border-bottom:1px solid var(--a);padding:7px 0',CR(null,'justify-content:center')))+
   S('acc','profile')+S('acc','exp',{jobs:3})+S('acc','edu')+HS.acc('SKILLS',SG()))}});
add('cv-graham','CV - dense ATS',{
  preset:PR(['#1A1A1A','#333333','#1A1A1A','#E8E8E8','#FFFFFF',"'Libre Baskerville', serif",INT]),
  html:function(){return withSZ(11,function(){return A(50,40,716,0,D('font:700 21px/1.2 var(--fh);color:var(--t);letter-spacing:.14em',E('ARMAND BERNARD'))+D('margin:5px 0 4px',CR())+D('border-top:2px solid var(--t);margin:6px 0 14px','')+
   S('rule','profile',{t:'SUMMARY'})+S('rule','exp',{jobs:4,b:3})+S('rule','edu')+HS.rule('SKILLS',SG())+S('rule','cert'))})}});
add('cv-jennifer','CV - serif label column',{
  preset:PR(['#222222','#444444','#222222','#EEEEEE','#FFFFFF',"'Cormorant Garamond', serif",SANS]),
  html:function(){return A(60,56,696,0,D('margin-bottom:16px',NM('Sarah Candal','Professional Title',{fs:44,w:600,ts:11,tl:.24}))+D('margin-bottom:22px;border-top:1px solid var(--t);border-bottom:1px solid var(--t);padding:7px 0',CR())+
   S('lbl','profile')+S('lbl','exp',{jobs:3})+S('lbl','edu')+S('lbl','cert')+S('lbl','lang'))}});
add('cv-sara-center','CV - centered header',{
  preset:PR(['#2B2B2B','#444444','#2B2B2B','#E7E7E7','#FFFFFF',SANS]),
  html:function(){return A(0,0,816,160,'','background:#F1F1F1')+A(56,46,704,0,D('text-align:center;margin-bottom:16px',NM('SARAH CANDAL','PROFESSIONAL TITLE',{fs:26,ls:.24,w:600,ts:11,tl:.3})+D('margin-top:14px',CR(null,'justify-content:center'))))+
   A(56,196,704,0,S('center','profile')+S('center','edu')+S('center','exp',{jobs:3})+S('center','lang'))}});
add('cv-min-timeline','CV - minimal timeline',{
  preset:PR(['#2B2B2B','#444444','#2B2B2B','#E9E9E9','#FFFFFF',INT]),
  html:function(){return A(50,50,700,0,NM('SARAH CANDAL','PROFESSIONAL TITLE',{fs:30,ls:.04,ts:11}))+
   A(50,190,200,0,F('rule','contact')+F('rule','edu',{one:true})+F('rule','cert')+F('rule','lang'))+
   A(300,190,460,0,D('position:absolute;left:4px;top:8px;bottom:0;border-left:1px solid var(--ln)','')+S('tl','profile')+S('tl','exp',{jobs:3})+S('tl','edu'))}});
add('cv-form','CV - classic form',{
  preset:PR(['#1F1F1F','#3C3C3C','#1F1F1F','#EEEEEE','#FFFFFF',"'Libre Baskerville', serif",INT]),
  html:function(){function fr(l,v){return D('display:flex;gap:8px;margin-bottom:14px;font:400 12.5px var(--fb);color:var(--x)',E(l+' :')+D('flex:1;border-bottom:1px solid var(--ln);padding-left:6px;color:var(--t)',E(v)))}
   return A(60,50,696,0,D('text-align:center;border-top:2px solid var(--t);border-bottom:2px solid var(--t);padding:12px 0;margin-bottom:24px;font:italic 400 30px var(--fh);color:var(--t)',E('Curriculum vitae'))+
   fr('Nom et prénom','Armand Bernard')+fr('Adresse','123 Anywhere St., Any City')+fr('Téléphone','+000 123 456 789')+fr('E-mail','hello@reallygreatsite.com')+fr('Date de naissance','01/01/1990')+fr('Lieu de naissance','Any City')+fr('Situation familiale','Célibataire')+D('height:10px','')+
   F('rule','exp',{t:'EXPÉRIENCE PROFESSIONNELLE',jobs:3,b:2})+F('rule','edu')+HS.rule('COMPÉTENCES',SG())+F('rule','lang'))}});
add('cv-jane-doe','CV - bold stacked name',{
  preset:PR(['#111111','#333333','#111111','#EDEDED','#FFFFFF',SANS]),
  html:function(){return A(58,62,9,110,'','background:#111')+A(84,56,500,0,D('font:800 46px/1 var(--fh);color:var(--t)',E('SARAH')+'<br>'+E('CANDAL'))+D('font:500 11px var(--fb);letter-spacing:.24em;color:var(--x);margin-top:8px',E('PROFESSIONAL TITLE')))+
   A(58,230,440,0,S('rule','about')+S('rule','exp',{jobs:3})+S('rule','edu'))+A(536,230,222,0,S('rule','contact')+S('rule','skills')+S('rule','lang'))}});
add('cv-john-marck','CV - photo ATS',{
  photo:true,
  preset:PR(['#1A1A1A','#333333','#1A1A1A','#EDEDED','#FFFFFF',INT],[['ph1',56,48,120,140,'rect']]),
  html:function(){return A(204,64,560,0,NM('Armand Bernard','Web Designer',{fs:30,ts:12,tl:.1}))+
   A(56,220,226,0,S('rule','about')+S('rule','skills')+S('rule','lang')+S('rule','int'))+A(322,220,438,0,S('rule','exp',{jobs:3})+S('rule','edu')+S('rule','ref'))}});

/* ===== B. Sidebar (suite) ===== */
add('cv-mike-navy','CV - navy sidebar dated',{
  photo:true,
  preset:PR(['#1E2A44','#3A4254','#25324F','#E4E8F0','#F4F5F8',SANS],[['ph1',70,50,160,160,'circle','#8896B0','#C6CFE0']]),
  html:function(){return A(0,0,300,1056,'','background:var(--a)')+
   A(34,250,232,0,S('plain','contact',{c:W})+S('plain','edu',{c:W})+S('plain','skills',{c:W})+S('plain','lang',{c:W}))+
   A(336,56,430,0,D('margin-bottom:22px',NM('Armand Bernard','Professional Title',{fs:32,ts:12}))+S('acc','about')+S('acc','exp',{dated:true,jobs:3})+S('acc','ref'))}});
add('cv-alex-dark','CV - dark panel left',{
  photo:true,
  preset:PR(['#1E1E1E','#3C3C3C','#2B2B2B','#E5E5E5','#FFFFFF',SANS],[['ph1',88,44,160,160,'circle','#555555','#888888']]),
  html:function(){return A(0,0,336,1056,'','background:var(--a)')+
   A(34,224,268,0,D('text-align:center;margin-bottom:22px',NM('Sarah Candal','GRAPHIC DESIGNER',{fs:26,c:W,tc:'#DDD',ts:10}))+S('rule','about',{c:W})+S('rule','edu',{c:W})+S('rule','contact',{c:W})+S('rule','skills',{c:W})+S('rule','lang',{c:W}))+
   A(376,60,390,0,S('rule','exp',{jobs:3})+S('rule','cert')+S('rule','ref'))}});
add('cv-noel-dark','CV - rounded dark panel',{
  photo:true,
  preset:PR(['#1F1F1F','#3B3B3B','#262626','#EAEAEA','#F2F2F2',SANS],[['ph1',82,54,170,170,'circle','#555555','#8A8A8A']]),
  html:function(){return A(22,22,290,1012,'','background:var(--a);border-radius:30px')+
   A(50,256,236,0,S('plain','contact',{c:W})+S('plain','edu',{c:W})+S('plain','skills',{c:W,pills:true,bd:W})+S('plain','lang',{c:W}))+
   A(352,60,414,0,D('margin-bottom:22px',NM('Armand Bernard','Professional Title',{fs:30,ts:11}))+S('tag','about')+S('tag','exp',{t:'JOB EXPERIENCE',jobs:3})+S('tag','int',{t:'HOBBIES'}))}});
add('cv-olivia-dark','CV - full dark page',{
  photo:true,
  preset:PR(['#FFFFFF','#D4D4D4','#FFFFFF','#444444','#2D2D2D',SANS],[['ph1',50,50,200,240,'rect','#777777','#A0A0A0']]),
  html:function(){return A(290,84,470,0,D('font:800 48px/1.02 var(--fh);color:var(--t)',E('SARAH')+'<br>'+E('CANDAL'))+D('font:500 12px var(--fb);letter-spacing:.3em;color:var(--x);margin-top:10px',E('MARKETING MANAGER')))+
   A(50,330,200,0,S('rule','contact')+S('rule','skills',{pills:true})+S('rule','lang'))+A(290,330,470,0,S('rule','profile')+S('rule','edu')+S('rule','exp',{jobs:3}))}});
add('cv-name-surname','CV - right grey sidebar',{
  preset:PR(['#111111','#333333','#111111','#EDEDED','#FFFFFF',SANS]),
  html:function(){return A(540,0,276,170,'','background:#111')+A(566,44,226,0,ct(CT,W,10.5))+A(540,170,276,886,'','background:#EDEDED')+
   A(566,200,226,0,S('plain','edu')+S('plain','lang')+S('plain','skills'))+
   A(56,56,440,0,D('font:800 44px/1 var(--fh);color:var(--t)',E('ARMAND')+'<br>'+E('BERNARD'))+D('font:500 11px var(--fb);letter-spacing:.2em;color:var(--x);margin:8px 0 38px',E('JOB TITLE HERE'))+S('rule','profile')+S('rule','exp',{jobs:3})+S('rule','ref'))}});
add('cv-teal-fr','CV - teal right sidebar (FR)',{
  photo:true,
  preset:PR(['#26404A','#3E4E52','#6F9594','#DCE8E7','#FFFFFF',SANS],[['ph1',602,48,150,150,'circle','#9DB8B7','#CFE0DF']]),
  html:function(){return A(540,0,276,1056,'','background:var(--a)')+
   A(566,236,226,0,F('plain','contact',{c:W})+F('plain','skills',{c:W})+F('plain','lang',{c:W})+F('plain','int',{c:W}))+
   A(56,60,450,0,D('margin-bottom:26px',NM('Sarah Candal','Chargée de projet',{fs:34,ts:12}))+F('acc','profile')+F('acc','exp',{jobs:3})+F('acc','edu'))}});
add('cv-marcela','CV - pale blue strip & boxes',{
  photo:true,
  preset:PR(['#2D5361','#3C4A50','#3E8CA0','#E3EEF2','#FFFFFF',SANS],[['ph1',56,44,150,150,'circle','#B9D3DC','#8DB4C2']]),
  html:function(){return A(0,0,262,1056,'','background:var(--p)')+
   A(28,236,206,0,S('box','contact')+S('box','skills')+S('box','lang'))+
   A(290,70,470,0,D('margin-bottom:30px',NM('SARAH CANDAL','FINANCE & ECONOMICS SPECIALIST',{fs:30,c:'var(--a)',ts:11,ls:.03}))+S('box','about')+S('box','exp',{jobs:3})+S('box','edu')+S('box','ref'))}});

/* ===== C. Header & creative (suite) ===== */
add('cv-galena','CV - dark header & photo',{
  photo:true,
  preset:PR(['#2F343B','#3F454D','#555B63','#E4E6E8','#F2F3F4',SANS],[['ph1',54,40,134,134,'circle','#8A9099','#B9BEC5']]),
  html:function(){return A(0,0,816,214,'','background:#3B4048')+A(224,70,520,0,NM('Sarah Candal','BACHELOR OF ARTS IN EDUCATION',{fs:34,c:W,tc:'#DDD',ts:10.5}))+
   A(50,254,236,0,S('rule','contact')+S('rule','lang')+S('rule','skills')+S('rule','cert'))+A(320,254,440,0,S('rule','about',{t:'SUMMARY'})+S('rule','edu')+S('rule','exp',{jobs:3}))}});
add('cv-rosa','CV - charcoal header, grey sidebar',{
  photo:true,
  preset:PR(['#262626','#3D3D3D','#3A3A3A','#E6E6E6','#FFFFFF',SANS],[['ph1',630,34,130,130,'circle','#7A7A7A','#AAAAAA']]),
  html:function(){return A(0,0,816,200,'','background:#3A3A3A')+A(60,66,520,0,NM('Sarah Candal','GRAPHIC DESIGNER',{fs:36,c:W,tc:'#DDD',ts:12}))+A(520,200,296,856,'','background:#E6E6E6')+
   A(60,240,420,0,S('rule','about')+S('rule','profile',{t:'SUMMARY'})+S('rule','exp',{jobs:3}))+A(548,240,214,0,S('rule','contact')+S('rule','skills')+S('rule','lang')+S('rule','edu',{one:true}))}});
add('cv-donna','CV - pale header & sidebar',{
  photo:true,
  preset:PR(['#2B3442','#3D4756','#8FA1B8','#DCE3EC','#FFFFFF',SANS],[['ph1',54,24,124,124,'circle','#B7C3D3','#8E9FB5']]),
  html:function(){return A(0,0,816,172,'','background:var(--p)')+A(210,60,540,0,NM('SARAH CANDAL','SALES REPRESENTATIVE',{fs:28,ls:.18,w:600,ts:11,tl:.3}))+A(0,172,264,884,'','background:#EEF1F6')+
   A(32,206,208,0,S('plain','contact')+S('plain','edu')+S('plain','skills')+S('plain','lang')+S('plain','ref',{one:true}))+A(300,206,462,0,S('rule','about')+S('rule','exp',{jobs:3}))}});
add('cv-modifiable','CV - grey boxes',{
  preset:PR(['#222222','#3A3A3A','#222222','#E5E5E5','#FFFFFF',SANS]),
  html:function(){return A(0,0,816,130,'','background:#C7C7C7')+A(0,40,816,0,D('text-align:center',NM('SARAH CANDAL','PROFESSIONAL TITLE',{fs:34,w:800,ls:.06,ts:11,tl:.3})))+A(0,130,262,926,'','background:#E4E4E4')+
   A(30,166,206,0,S('plain','contact')+S('plain','edu')+S('plain','skills'))+A(298,166,462,0,S('rule','profile',{t:'SUMMARY'})+S('rule','exp',{jobs:3})+S('rule','ref'))}});
add('cv-sophie','CV - gradient header, two columns',{
  preset:PR(['#2F353B','#454C53','#7E8C9A','#DDE1E5','#FFFFFF',"'Cormorant Garamond', serif",SANS]),
  html:function(){return A(0,0,816,236,'','background:linear-gradient(135deg,#7E8C9A,#C9CED3)')+A(60,84,700,0,NM('SARAH CANDAL','PROFESSIONAL TITLE',{fs:40,ls:.28,w:500,c:W,tc:W,ts:11,tl:.3}))+VL(256,276,980)+
   A(52,276,180,0,S('rule','contact')+S('rule','edu')+S('rule','skills'))+A(290,276,470,0,S('rule','profile')+S('rule','exp',{jobs:3}))}});
add('cv-claudine','CV - grey circle & photo (FR)',{
  photo:true,
  preset:PR(['#2B2B2B','#444444','#8C8C8C','#D8D8D8','#FFFFFF',SANS],[['ph1',62,58,150,150,'circle','#9A9A9A','#CFCFCF']]),
  html:function(){return A(-150,-180,520,440,'','background:#BDBDBD;border-radius:50%')+A(330,92,440,0,NM('SARAH CANDAL','DIRECTRICE MARKETING',{fs:28,ls:.16,w:600,ts:11,tl:.22}))+
   A(58,340,200,0,F('rule','contact')+F('rule','skills')+F('rule','lang')+F('rule','int'))+A(300,270,460,0,F('rule','edu')+F('rule','exp',{jobs:3}))}});
add('cv-amy','CV - pink band',{
  preset:PR(['#3A2E33','#58484F','#C9707E','#F6D3D8','#FFFFFF',SANS]),
  html:function(){return A(0,0,816,150,'','background:var(--p)')+A(0,48,816,0,D('text-align:center',NM('SARAH CANDAL','PROFESSIONAL TITLE',{fs:30,ls:.3,w:600,ts:11,tl:.3})))+
   A(56,190,226,0,S('acc','contact')+S('acc','skills')+S('acc','lang'))+A(316,190,446,0,S('acc','profile')+S('acc','exp',{jobs:3})+S('acc','edu'))}});

