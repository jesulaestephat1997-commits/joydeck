/* Emadeck - modeles CV (autonome) */
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
var LS='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.';
var LB='Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.';
var SZ=12;
function para(t,sz,st){return D('font:400 '+(sz||SZ)+'px/1.555 var(--fb);color:var(--x);'+(st||''),E(t))}
function bl(n,sz,col){var s='';for(var i=0;i<n;i++)s+=D('display:flex;gap:6px;font:400 '+(sz||SZ)+'px/1.55 var(--fb);color:'+(col||'var(--x)')+';margin-bottom:2px','<span>&bull;</span><span>'+E(LB)+'</span>');return s}
function hd(t,st){return D('font:700 '+12.5+'px var(--fb);letter-spacing:.16em;color:var(--t);'+(st||''),E(t))}
function hr(st){return D('border-top:1px solid var(--ln);'+(st||''),'')}
function job(role,co,dt,n,col){return D('margin-bottom:16px',D('font:700 '+(SZ+.5)+'px/1.4 var(--fb);color:'+(col||'var(--t)'),E(role))+D('font:400 '+(SZ-.5)+'px/1.4 var(--fb);color:'+(col||'var(--x)')+';opacity:.85;margin-bottom:3px',E(co)+' &nbsp;|&nbsp; '+E(dt))+bl((n||2)+1,SZ,col))}
function edu(deg,sc,dt,col){return D('margin-bottom:9px',D('font:700 '+(SZ+.5)+'px/1.4 var(--fb);color:'+(col||'var(--t)'),E(deg))+D('font:400 '+(SZ-.5)+'px/1.4 var(--fb);color:'+(col||'var(--x)')+';opacity:.85',E(sc)+' &nbsp;|&nbsp; '+E(dt)))}
function ct(items,col,sz){return items.map(function(t){return D('font:400 '+(sz||SZ)+'px/1.55 var(--fb);color:'+(col||'var(--x)')+';margin-bottom:5px',E(t))}).join('')}
function sk(items,col,sz){return items.map(function(t){return D('display:flex;gap:6px;font:400 '+(sz||SZ)+'px/1.55 var(--fb);color:'+(col||'var(--x)')+';margin-bottom:2px','<span>&bull;</span><span>'+E(t)+'</span>')}).join('')}
function bar(t,pc,col,tr){return D('margin-bottom:8px;font:400 '+(SZ-.5)+'px var(--fb);color:'+(col||'var(--x)'),E(t)+D('height:4px;background:'+(tr||'var(--ln2)')+';margin-top:3px;border-radius:2px','<div style="width:'+pc+'%;height:4px;border-radius:2px;background:var(--a)"></div>'))}
function ph(id,x,y,w,h,shape,bg,fg){
  var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><defs><clipPath id="c"><'+(shape==='circle'?'ellipse cx="'+w/2+'" cy="'+h/2+'" rx="'+w/2+'" ry="'+h/2+'"':'rect width="'+w+'" height="'+h+'"')+'/></clipPath></defs><g clip-path="url(#c)"><rect width="'+w+'" height="'+h+'" fill="'+(bg||'#D9D9D9')+'"/><circle cx="'+w/2+'" cy="'+h*.38+'" r="'+Math.min(w,h)*.17+'" fill="'+(fg||'#B5B5B5')+'"/><ellipse cx="'+w/2+'" cy="'+h*1.0+'" rx="'+w*.36+'" ry="'+h*.34+'" fill="'+(fg||'#B5B5B5')+'"/></g></svg>';
  return {id:id,t:'img',src:U(svg),x:x,y:y,w:w,h:h,flip:false,ph:shape}}
var CT=['+000 123 456 789','hello@reallygreatsite.com','123 Anywhere St., Any City','www.reallygreatsite.com'];
function sec(t,inner,st,hst){return D('margin-bottom:22px;'+(st||''),hd(t,hst)+hr('margin:4px 0 8px')+inner)}
function secN(t,inner,st,hst){return D('margin-bottom:22px;'+(st||''),hd(t,hst)+D('height:7px','')+inner)}
/* ===== A. ATS & minimal ===== */
add('cv-ats','CV - ATS classic',{
  preset:function(s){s.th=TH('#1A1A1A','#333333','#1A1A1A','#EDEDED','#FFFFFF',"'Inter', sans-serif")},
  html:function(){return A(56,44,704,0,
    D('text-align:center;margin-bottom:14px',D('font:700 26px/1.2 var(--fh);color:var(--t)',E('Armand Bernard'))+D('font:400 11px/1.6 var(--fb);color:var(--x)',E('Project Manager')+'<br>'+E(CT[0])+' &nbsp;|&nbsp; '+E(CT[1])+' &nbsp;|&nbsp; '+E(CT[2])))+
    sec('SUMMARY',para(LO))+sec('WORK EXPERIENCE',job('Senior Project Manager','Company Name','2020 - Present',3)+job('Project Manager','Company Name','2016 - 2020',3)+job('Project Coordinator','Company Name','2013 - 2016',2))+
    sec('EDUCATION',edu('Master of Business Administration','University Name','2011 - 2013')+edu('Bachelor of Science','University Name','2007 - 2011'))+
    sec('SKILLS',D('display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 20px',sk(['Project planning','Risk management','Team leadership'])+sk(['Budgeting','Agile / Scrum','Communication'])+sk(['Reporting','Negotiation','Problem solving']))))}});
add('cv-minimal-head','CV - minimal header',{
  preset:function(s){s.th=TH('#1F1F1F','#3C3C3C','#1F1F1F','#EFEFEF','#FFFFFF',"'Montserrat', sans-serif")},
  html:function(){return A(52,48,712,0,
    D('margin-bottom:6px;font:800 30px/1.1 var(--fh);color:var(--t);letter-spacing:.02em',E('SARAH CANDAL'))+D('font:400 11px var(--fb);letter-spacing:.2em;color:var(--x);margin-bottom:12px',E('HEAD MANAGER'))+
    D('display:flex;gap:26px;font:400 9.5px var(--fb);color:var(--x);padding:8px 0;border-top:1px solid var(--t);border-bottom:1px solid var(--t);margin-bottom:16px',E(CT[0])+E(CT[1])+E(CT[2]))+
    sec('ABOUT ME',para(LO))+sec('EDUCATION',edu('Master of Business Administration','University Name','2018 - 2020')+edu('Bachelor of Business','University Name','2014 - 2018'))+
    sec('EXPERIENCE',job('Head Manager','Company Name','2021 - Present',3)+job('Manager','Company Name','2018 - 2021',3)+job('Assistant Manager','Company Name','2015 - 2018',2))+
    sec('SKILLS',D('display:grid;grid-template-columns:1fr 1fr;gap:0 24px',sk(['Leadership','Strategy','Analytics'])+sk(['Team management','Communication','Planning']))))}});
add('cv-grey-photo','CV - grey with photo',{
  photo:true,
  preset:function(s){s.th=TH('#2B2B2B','#4A4A4A','#8C8C8C','#E3E1DE','#EDECE9',"'Cormorant Garamond', serif","'Montserrat', sans-serif");s.els.push(ph('ph1',586,48,130,130,'circle'))},
  html:function(){return A(52,60,500,0,D('font:400 32px/1.2 var(--fh);letter-spacing:.34em;color:var(--t)',E('SARAH')+'<br>'+E('CANDAL'))+D('font:400 10px var(--fb);letter-spacing:.24em;color:var(--x);margin-top:8px',E('PROFESSIONAL POSITION')))+
    VL(238,204,820)+
    A(52,204,170,0,sec('CONTACT',ct(CT,'var(--x)',10.5))+sec('EDUCATION',edu('Degree Name','University Name','2014 - 2018'))+sec('SKILLS',sk(['Skill one','Skill two','Skill three','Skill four','Skill five']))+sec('LANGUAGES',sk(['English','French'])))+
    A(262,204,500,0,sec('PROFILE',para(LO))+sec('WORK EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2)))}});
function VL(l,t,h){return '<div style="position:absolute;left:'+l+'px;top:'+t+'px;height:'+(h-t)+'px;border-left:1px solid var(--ln)"></div>'}
/* ===== B. Sidebar ===== */
add('cv-sidebar-dark','CV - dark sidebar',{
  photo:true,
  preset:function(s){s.th=TH('#1F2937','#3A4250','#3B4252','#E6E9EE','#FFFFFF',"'Montserrat', sans-serif");s.els.push(ph('ph1',60,46,150,150,'circle','#6B7385','#A4ABBA'))},
  html:function(){var W='var(--wh)';return A(0,0,270,1056,'','background:var(--a)')+
    A(30,224,214,0,secN('CONTACT',ct(CT,W,10.5),'','color:'+W)+secN('EDUCATION',edu('Degree Name','University Name','2014 - 2018',W),'','color:'+W)+secN('SKILLS',sk(['Skill one','Skill two','Skill three','Skill four'],W),'','color:'+W)+secN('LANGUAGES',sk(['English','French'],W),'','color:'+W))+
    A(306,52,456,0,D('font:700 32px/1.1 var(--fh);color:var(--t)',E('Armand Bernard'))+D('font:500 12px var(--fb);letter-spacing:.14em;color:var(--x);margin:4px 0 20px',E('WEB DESIGNER &amp; DEVELOPER'))+
      sec('SUMMARY',para(LO))+sec('WORK EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2))+sec('REFERENCES',D('display:flex;gap:30px',D('flex:1',para('Reference Name')+para('Company / Position')+para('+000 123 456 789'))+D('flex:1',para('Reference Name')+para('Company / Position')+para('+000 123 456 789')))))}});
add('cv-beige-sidebar','CV - beige sidebar',{
  photo:true,
  preset:function(s){s.th=TH('#3C3028','#5A4A3E','#B88B6A','#F1E4D6','#FBF7F2',"'Montserrat', sans-serif","'Montserrat', sans-serif");s.els.push(ph('ph1',68,56,130,130,'circle','#E3CDB6','#C4A488'))},
  html:function(){return A(0,0,266,1056,'','background:var(--p)')+
    A(30,212,206,0,secN('CONTACT',ct(CT,'var(--x)',10.5))+secN('FORMATION',edu('Degree Name','University Name','2014 - 2018'))+secN('SKILLS',sk(['Skill one','Skill two','Skill three','Skill four']))+secN('LANGUAGES',sk(['English','French'])))+
    A(300,52,466,0,D('font:700 31px/1.1 var(--fh);color:var(--t)',E('Sarah Candal'))+D('font:500 11px var(--fb);letter-spacing:.16em;color:var(--a);margin:6px 0 20px',E('CHARGÉE DE PROJET'))+
      sec('PROFILE',para(LO))+sec('EXPERIENCES',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2))+sec('INTERESTS',D('display:flex;gap:26px',para('Reading')+para('Travel')+para('Music'))))}});
add('cv-black-yellow','CV - black & yellow',{
  photo:true,
  preset:function(s){s.th=TH('#161616','#333333','#F2C200','#EDEDED','#FFFFFF',"'Montserrat', sans-serif");s.els.push(ph('ph1',42,170,196,206,'rect','#454545','#6C6C6C'))},
  html:function(){var W='#FFFFFF';return A(0,0,280,1056,'','background:#161616')+
    A(34,52,230,0,D('font:800 27px/1.05 var(--fh);color:#fff;text-transform:uppercase',E('ARMAND')+'<br><span style="color:var(--a)">'+E('BERNARD')+'</span>')+D('font:500 10px var(--fb);letter-spacing:.2em;color:#ddd;margin-top:6px',E('GRAPHIC DESIGNER')))+
    A(34,410,214,0,D('background:var(--a);color:#111;font:800 10px var(--fb);letter-spacing:.16em;padding:5px 8px;margin-bottom:8px',E('CONTACT'))+ct(CT,W,10.5)+D('height:12px','')+D('background:var(--a);color:#111;font:800 10px var(--fb);letter-spacing:.16em;padding:5px 8px;margin-bottom:8px',E('SKILLS'))+sk(['Photoshop','Illustrator','InDesign','Figma'],W)+D('height:12px','')+D('background:var(--a);color:#111;font:800 10px var(--fb);letter-spacing:.16em;padding:5px 8px;margin-bottom:8px',E('LANGUAGES'))+sk(['English','French'],W))+
    A(316,52,446,0,D('display:inline-block;background:var(--a);color:#111;font:800 10px var(--fb);letter-spacing:.16em;padding:5px 10px;margin-bottom:8px',E('ABOUT ME'))+para(LO)+D('height:16px','')+D('display:inline-block;background:var(--a);color:#111;font:800 10px var(--fb);letter-spacing:.16em;padding:5px 10px;margin-bottom:10px',E('WORK EXPERIENCE'))+job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2)+D('height:8px','')+D('display:inline-block;background:var(--a);color:#111;font:800 10px var(--fb);letter-spacing:.16em;padding:5px 10px;margin-bottom:10px',E('EDUCATION'))+edu('Degree Name','University Name','2010 - 2014'))}});
add('cv-lime','CV - lime strip',{
  photo:true,
  preset:function(s){s.th=TH('#161616','#3A3A3A','#C6E10E','#E6E6E6','#EFEFEF',"'Montserrat', sans-serif");s.els.push(ph('ph1',88,60,150,170,'rect','#BDBDBD','#8F8F8F'))},
  html:function(){return A(0,0,56,1056,'','background:var(--a)')+D('position:absolute;left:14px;top:60px;writing-mode:vertical-rl;transform:rotate(180deg);font:800 26px var(--fb);letter-spacing:.2em;color:var(--t)',E('RESUME'))+
    A(262,56,500,0,D('font:700 34px/1.1 var(--fh);color:var(--t)',E('Armand Bernard'))+D('font:600 11px var(--fb);letter-spacing:.22em;color:var(--x);margin:6px 0 12px',E('UI DESIGNER')))+
    A(88,256,170,0,secN('CONTACT',ct(CT,'var(--x)',10.5))+secN('SKILLS',sk(['Figma','Sketch','Prototyping','User research']))+secN('LANGUAGES',sk(['English','French'])))+
    A(284,140,478,0,sec('ABOUT ME',para(LO))+sec('EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2))+sec('EDUCATION',edu('Degree Name','University Name','2010 - 2014')))}});
/* ===== C. Header & creative ===== */
add('cv-brown-header','CV - brown header',{
  photo:true,
  preset:function(s){s.th=TH('#2A1F1A','#3C2F28','#6B4F40','#E8DDD2','#FBF8F4',"'Montserrat', sans-serif");s.els.push(ph('ph1',572,52,150,150,'rect','#9B7E6C','#C3AB9B'))},
  html:function(){return A(0,0,816,254,'','background:var(--a)')+A(60,72,480,0,D('font:700 34px/1.15 var(--fh);color:#fff',E('Sarah Candal'))+D('font:500 12px var(--fb);letter-spacing:.2em;color:#E8DDD2;margin-top:6px',E('INTERIOR DESIGNER'))+D('font:400 10px/1.6 var(--fb);color:#E8DDD2;margin-top:16px',E(CT[0])+' &nbsp;|&nbsp; '+E(CT[1])+'<br>'+E(CT[2])))+
    A(54,284,230,0,sec('SKILLS',sk(['Space planning','AutoCAD','SketchUp','Project management']),'','color:var(--a)')+sec('EDUCATION',edu('Degree Name','University Name','2014 - 2018'))+sec('LANGUAGES',sk(['English','French'])))+
    A(318,284,444,0,sec('PROFESSIONAL SUMMARY',para(LO))+sec('WORK EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2))+sec('AWARDS &amp; CERTIFICATIONS',sk(['Award or certification name','Award or certification name'])))}});
add('cv-infographic','CV - navy infographic',{
  photo:true,
  preset:function(s){s.th=TH('#1B2430','#2A3342','#243447','#DDE5EE','#F5F7FA',"'Montserrat', sans-serif");s.els.push(ph('ph1',44,36,140,140,'circle','#8FA3B8','#C3D0DD'))},
  html:function(){var box='border-radius:10px;background:#fff;padding:12px 14px;margin-bottom:12px;box-shadow:0 0 0 1px var(--ln2)';
    function bx(t,i){return D(box,D('display:inline-block;background:var(--a);color:#fff;font:700 10px var(--fb);letter-spacing:.14em;padding:4px 12px;border-radius:12px;margin-bottom:8px',E(t))+i)}
    return A(0,0,816,196,'','background:var(--a)')+A(212,52,540,0,D('font:700 32px/1.1 var(--fh);color:#fff;text-transform:uppercase',E('Sarah')+' <span style="color:var(--p)">'+E('Candal')+'</span>')+D('font:500 12px var(--fb);letter-spacing:.2em;color:var(--p);margin:6px 0 10px',E('HÔTESSE D&#39;ACCUEIL'))+D('font:400 10px/1.6 var(--fb);color:#fff',E(CT[0])+' &nbsp;|&nbsp; '+E(CT[1])+' &nbsp;|&nbsp; '+E(CT[2])))+
    A(40,220,740,0,bx('PROFIL',para(LO))+D('display:flex;gap:14px',D('flex:1.4',bx('EXPÉRIENCES PROFESSIONNELLES',job('Job Position','Company Name','2020 - Present',2)+job('Job Position','Company Name','2017 - 2020',2)+job('Job Position','Company Name','2014 - 2017',2))+bx('FORMATION',edu('Degree Name','University Name','2014 - 2018')+edu('Degree Name','University Name','2012 - 2014')))+
      D('flex:1',bx('COMPÉTENCES',bar('Skill one',90)+bar('Skill two',80)+bar('Skill three',70)+bar('Skill four',60))+bx('LANGUES',bar('English',90)+bar('French',80))+bx('CENTRES D&#39;INTÉRÊT',sk(['Reading','Travel','Music'])))))}});
add('cv-pastel-pills','CV - pastel with pills',{
  photo:true,
  preset:function(s){s.th=TH('#3A2E33','#58484F','#C9929F','#F4E1E5','#FFFFFF',"'Montserrat', sans-serif");s.els.push(ph('ph1',584,40,132,132,'circle','#EBC9D0','#D4A0AB'))},
  html:function(){function pill(t){return D('background:var(--p);color:var(--t);font:700 10px var(--fb);letter-spacing:.14em;padding:5px 14px;border-radius:14px;margin-bottom:9px;display:inline-block',E(t))}
    return A(0,0,816,196,'','background:var(--p)')+A(54,64,500,0,D('font:700 31px/1.1 var(--fh);color:var(--t);text-transform:uppercase',E('Sarah Candal'))+D('font:500 11px var(--fb);letter-spacing:.2em;color:var(--a);margin:6px 0 12px',E('MARKETING MANAGER'))+D('font:400 10px/1.6 var(--fb);color:var(--x)',E(CT[0])+' &nbsp;|&nbsp; '+E(CT[1])))+
    A(54,224,230,0,pill('CONTACT')+ct(CT,'var(--x)',10.5)+D('height:8px','')+pill('EDUCATION')+edu('Degree Name','University Name','2014 - 2018')+D('height:8px','')+pill('SKILLS')+sk(['Skill one','Skill two','Skill three','Skill four'])+D('height:8px','')+pill('LANGUAGES')+sk(['English','French']))+
    A(318,224,444,0,pill('PROFILE')+para(LO)+D('height:10px','')+pill('WORK EXPERIENCE')+job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2))}});
add('cv-timeline','CV - timeline',{
  photo:true,
  preset:function(s){s.th=TH('#161616','#3A3A3A','#161616','#E9E9E9','#FFFFFF',"'Montserrat', sans-serif");s.els.push(ph('ph1',560,48,160,180,'rect','#CFCFCF','#A0A0A0'))},
  html:function(){function tl(t,inner){return D('position:relative;padding-left:22px;margin-bottom:16px','<span style="position:absolute;left:0;top:3px;width:9px;height:9px;border-radius:50%;background:var(--a)"></span>'+hd(t)+D('height:6px','')+inner)}
    return A(60,60,460,0,D('font:700 34px/1.1 var(--fh);color:var(--t)',E('ARMAND')+'<br>'+E('BERNARD'))+D('font:500 11px var(--fb);letter-spacing:.24em;color:var(--x);margin-top:8px',E('GRAPHIC DESIGNER')))+
    A(60,256,420,0,D('position:absolute;left:4px;top:8px;bottom:0;border-left:1px solid var(--ln)','')+tl('PROFILE',para(LO))+tl('EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2))+tl('EDUCATION',edu('Degree Name','University Name','2010 - 2014')),'')+
    A(540,256,216,0,sec('CONTACT',ct(CT,'var(--x)',10.5))+sec('SOFTWARE',bar('Photoshop',90)+bar('Illustrator',85)+bar('InDesign',70))+sec('LANGUAGES',sk(['English','French'])))}});
add('cv-serif','CV - elegant serif',{
  photo:true,
  preset:function(s){s.th=TH('#8A5A44','#3C3C3C','#8A5A44','#F1E8E2','#FFFFFF',"'Cormorant Garamond', serif","'Montserrat', sans-serif");s.els.push(ph('ph1',640,52,96,96,'circle','#E5D6CC','#C9B2A4'))},
  html:function(){return A(60,56,540,0,D('font:600 40px/1.1 var(--fh);color:var(--t);letter-spacing:.02em',E('Sarah Candal'))+D('font:500 11px var(--fb);letter-spacing:.24em;color:var(--x);margin-top:6px',E('DIGITAL MARKETING SPECIALIST')))+
    A(60,170,696,0,D('display:flex;gap:26px;font:400 9.5px var(--fb);color:var(--x);padding:8px 0;border-top:1px solid var(--t);border-bottom:1px solid var(--t)',E(CT[0])+E(CT[1])+E(CT[2])))+
    A(60,230,230,0,sec('PROFILE',para(LO))+sec('EDUCATION',edu('Degree Name','University Name','2014 - 2018'))+sec('SKILLS',sk(['Skill one','Skill two','Skill three','Skill four']))+sec('LANGUAGES',sk(['English','French'])))+
    A(318,230,438,0,sec('WORK EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',2)))}});
add('cv-bold-name','CV - big name',{
  preset:function(s){s.th=TH('#1A1A1A','#3C3C3C','#1A1A1A','#EDEDED','#FFFFFF',"'Playfair Display', serif","'Montserrat', sans-serif")},
  html:function(){return A(0,52,816,0,D('text-align:center;font:700 92px/1 var(--fh);color:var(--t)',E('Sarah'))+D('text-align:center;font:500 11px var(--fb);letter-spacing:.34em;color:var(--x);margin:6px 0 4px',E('CANDAL &nbsp;&middot;&nbsp; CURRICULUM VITAE')))+
    A(60,230,696,0,D('display:flex;gap:26px;justify-content:center;font:400 9.5px var(--fb);color:var(--x);padding:8px 0;border-top:1px solid var(--t);border-bottom:1px solid var(--t)',E(CT[0])+E(CT[1])+E(CT[2])))+
    A(60,290,696,0,D('display:flex;gap:34px',D('flex:1',sec('PROFILE',para(LO))+sec('EDUCATION',edu('Degree Name','University Name','2014 - 2018')+edu('Degree Name','University Name','2012 - 2014'))+sec('SKILLS',sk(['Skill one','Skill two','Skill three','Skill four'])))+
      D('flex:1.4',sec('WORK EXPERIENCE',job('Job Position','Company Name','2020 - Present',3)+job('Job Position','Company Name','2017 - 2020',3)+job('Job Position','Company Name','2014 - 2017',3)))))}});
})();
