/* Emadeck - modeles de pages Agenda / Planner (page 816 x 1056, Letter) */
(function(){
'use strict';
var MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
var WD=['SUN','MON','TUE','WED','THU','FRI','SAT'];
var DAYS=['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'];
/* helpers */
function E(t,c,st){return '<span class="ed'+(c?' '+c:'')+'"'+(st?' style="'+st+'"':'')+'>'+t+'</span>'}
function pg(inner,pad,st){return '<div style="position:absolute;left:0;top:0;width:816px;height:1056px;padding:'+(pad||'44px 48px')+';display:flex;flex-direction:column;'+(st||'')+'">'+inner+'</div>'}
function ttl(t,sz,mb,st){return '<div class="h1" style="font-size:'+(sz||32)+'px;margin-bottom:'+(mb==null?12:mb)+'px;'+(st||'')+'">'+E(t)+'</div>'}
function sub(t,mb,st){return '<div class="sub" style="font-size:11px;margin-bottom:'+(mb==null?14:mb)+'px;'+(st||'')+'">'+E(t)+'</div>'}
function bar(t,st){return '<div class="bar" style="'+(st||'')+'">'+E(t)+'</div>'}
function lab(t,st){return '<div class="lab" style="'+(st||'')+'">'+E(t)+'</div>'}
function fld(t,w,st){return '<span class="fld" style="'+(w?'width:'+w+'px;':'')+(st||'')+'"><span class="lab">'+E(t)+'</span><i></i></span>'}
function ln(n,h,st){var s='';for(var i=0;i<n;i++)s+='<div class="ln" style="height:'+h+'px;'+(st||'')+'"></div>';return s}
function chk(n,h,st){var s='';for(var i=0;i<n;i++)s+='<div class="fl" style="height:'+h+'px;border-bottom:1px solid var(--ln);gap:8px;'+(st||'')+'"><span class="cb"></span></div>';return s}
function cirRows(n,h){var s='';for(var i=0;i<n;i++)s+='<div class="fl" style="height:'+h+'px;border-bottom:1px solid var(--ln);gap:8px"><span class="ci"></span></div>';return s}
function fx(inner,st){return '<div style="display:flex;'+(st||'')+'">'+inner+'</div>'}
function fc(inner,st){return '<div style="display:flex;flex-direction:column;'+(st||'')+'">'+inner+'</div>'}
function bx(inner,st){return '<div class="bx" style="'+(st||'')+'">'+inner+'</div>'}
function bxr(inner,st){return '<div class="bxr" style="'+(st||'')+'">'+inner+'</div>'}
function dots(h,st){return '<div style="height:'+h+'px;background-image:radial-gradient(var(--ln) 1px,transparent 1.2px);background-size:18px 18px;'+(st||'')+'"></div>'}
function cells(n,w,h,r){var s='';for(var i=0;i<n;i++)s+='<span class="'+(r?'ci':'cb')+'" style="width:'+w+'px;height:'+h+'px"></span>';return s}
function tr(h,html,st){return '<div class="fl" style="height:'+h+'px;border-bottom:1px solid var(--ln);'+(st||'')+'">'+html+'</div>'}
function timeRows(labels,h,leftW,st){
  var s='';labels.forEach(function(l){s+='<div class="fl" style="height:'+h+'px;border-bottom:1px solid var(--ln)"><span style="width:'+leftW+'px;flex:none;font-size:9.5px;padding-left:4px;border-right:1px solid var(--ln);height:100%;display:flex;align-items:center">'+l+'</span></div>'});
  return '<div style="'+(st||'')+'">'+s+'</div>';
}
function hours(a,b,step,fmt){var out=[];for(var t=a*60;t<=b*60;t+=step){var h=Math.floor(t/60)%24,m=t%60;
  if(fmt==='24')out.push((h<10?'0':'')+h+':'+(m?'30':'00'));
  else{var ap=h<12?'am':'pm',hh=h%12||12;out.push(hh+':'+(m?'30':'00')+' '+ap)}}return out}
function dim(m,y){return new Date(y,m+1,0).getDate()}
function off(m,y){return new Date(y,m,1).getDay()}
function calBig(S,rowH,o){
  o=o||{};var m=S.cal.m,y=S.cal.y,of=off(m,y),n=dim(m,y),rows=Math.ceil((of+n)/7);if(o.rows)rows=o.rows;
  var s='<div style="display:grid;grid-template-columns:repeat(7,1fr);border-left:1px solid var(--ln);border-top:1px solid var(--ln)">';
  WD.forEach(function(d){s+='<div class="bar" style="border-right:1px solid var(--ln);border-bottom:1px solid var(--ln);padding:5px 0;'+(o.dark?'background:var(--a);color:var(--wh)':'')+'">'+d+'</div>'});
  for(var i=0;i<rows*7;i++){var d=i-of+1;s+='<div style="height:'+rowH+'px;border-right:1px solid var(--ln);border-bottom:1px solid var(--ln);padding:3px 5px;font:600 10px var(--fb);color:var(--t)">'+((d>=1&&d<=n)?d:'')+'</div>'}
  return s+'</div>';
}
function mini(m,y,w){
  var of=off(m,y),n=dim(m,y),s='<div style="width:'+w+'px"><div class="lab" style="text-align:center;font-size:10px;margin-bottom:6px;letter-spacing:.14em">'+MN[m].toUpperCase()+'</div><div style="display:grid;grid-template-columns:repeat(7,1fr);font-size:8px;text-align:center;line-height:2.25;color:var(--x)">';
  'SMTWTFS'.split('').forEach(function(d){s+='<b style="color:var(--t)">'+d+'</b>'});
  for(var i=0;i<42;i++){var d=i-of+1;s+='<span>'+((d>=1&&d<=n)?d:'')+'</span>'}
  return s+'</div></div>';
}
function head(S){return '<span>'+MN[S.cal.m]+'</span>'}
function sec(t,inner,st){return '<div style="'+(st||'')+'">'+bar(t)+inner+'</div>'}

var P={};
function add(id,name,o){o.name=name;P[id]=o}

/* ================= COVERS ================= */
add('cover-block','Cover - color block',{
  preset:function(s){s.bg='accent'},
  html:function(S){return pg(
   '<div style="margin-top:300px;text-align:center;color:var(--wh)"><div style="font:700 150px/1 var(--fh);letter-spacing:.02em">'+E('2027')+'</div><div style="width:120px;height:3px;background:var(--wh);margin:34px auto 26px"></div><div style="font:600 22px var(--fh);letter-spacing:.4em;text-transform:uppercase">'+E('Yearly Planner')+'</div></div>'+
   '<div style="margin-top:auto;text-align:center;color:var(--wh);font:12px var(--fb);letter-spacing:.3em;text-transform:uppercase;opacity:.85">'+E('Your Name')+'</div>','60px 60px 70px')}});
add('cover-circle','Cover - circle title',{
  preset:function(s){s.bg='pale'},
  html:function(S){return pg(
   '<div style="position:absolute;left:158px;top:268px;width:500px;height:500px;border-radius:50%;border:2px solid var(--a)"></div>'+
   '<div style="position:absolute;left:178px;top:288px;width:460px;height:460px;border-radius:50%;border:1px solid var(--ln)"></div>'+
   '<div style="position:absolute;left:0;top:430px;width:816px;text-align:center"><div style="font:700 96px/1 var(--fh);color:var(--t)">'+E('2027')+'</div><div style="font:400 38px var(--fh);color:var(--a);letter-spacing:.2em;margin-top:14px;text-transform:lowercase">'+E('planner')+'</div></div>'+
   '<div style="position:absolute;left:0;bottom:60px;width:816px;text-align:center;font:11px var(--fb);letter-spacing:.3em;color:var(--x)">'+E('YOUR NAME')+'</div>')}});
add('cover-minimal','Cover - minimal',{
  html:function(S){return pg(
   '<div style="margin-top:250px;text-align:center"><div class="h1" style="font-size:54px;letter-spacing:.08em">'+E('Agenda')+'</div><div class="h1" style="font-size:54px;letter-spacing:.08em;margin-top:6px">'+E('Journal')+'</div>'+
   '<div class="fl" style="justify-content:center;gap:14px;margin:34px 0"><i style="width:120px;border-top:1px solid var(--t)"></i><i style="width:7px;height:7px;border-radius:50%;background:var(--a)"></i><i style="width:120px;border-top:1px solid var(--t)"></i></div>'+
   '<div style="font:700 150px/1 var(--fh);color:var(--t)">'+E('2027')+'</div></div>'+
   '<div style="margin-top:auto;text-align:center"><div class="sub" style="letter-spacing:.3em;font-size:11px">'+E('PLAN. FOCUS. ACHIEVE.')+'</div></div>','60px')}});
add('belongs','This planner belongs to',{
  html:function(S){return pg(
   '<div style="margin-top:300px;text-align:center"><div class="h1" style="font-size:30px">'+E('This planner belongs to')+'</div>'+
   '<div style="width:420px;margin:60px auto 0;border-bottom:1px solid var(--x);height:30px"></div>'+
   '<div class="fl" style="justify-content:center;gap:14px;margin-top:80px"><span class="lab">'+E('Started on')+'</span><i style="width:220px;border-bottom:1px solid var(--x);height:16px"></i></div></div>')}});

/* ================= YEARLY ================= */
add('year-glance','Year at a glance (12 calendars)',{cal:'year',
  html:function(S){var y=S.cal.y,g='';
   for(var m=0;m<12;m++)g+=mini(m,y,210);
   return pg('<div style="font:700 56px/1 var(--fh);color:var(--t);text-align:center;margin-top:6px">'+y+'</div><div class="sub" style="font:400 24px var(--fh);letter-spacing:.3em;margin:8px 0 38px;text-transform:lowercase">'+E('year at a glance')+'</div>'+
   '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:36px 40px;justify-items:center">'+g+'</div>')}});
add('year-overview','Year at a glance (month boxes)',{
  html:function(S){var g='',i;for(i=0;i<12;i++)g+='<div style="border-right:1px solid var(--ln);border-bottom:1px solid var(--ln);padding:8px 10px"><div class="lab" style="font-size:9px">'+E(MN[i].toUpperCase())+'</div></div>';
   return pg(ttl('Year at a glance',30,6)+fx('<span class="fld" style="width:160px;margin-left:auto">'+'<span class="lab">'+E('Year:')+'</span><i></i></span>','margin-bottom:12px')+
   '<div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(4,1fr);flex:1;border-left:1px solid var(--ln);border-top:1px solid var(--ln)">'+g+'</div>')}});
function datesPage(title){return function(S){var g='',i;
  for(i=0;i<12;i++){var r='';for(var k=0;k<7;k++)r+='<div style="display:flex;height:26px;border-bottom:1px solid var(--ln)"><i style="width:30px;border-right:1px solid var(--ln)"></i></div>';
   g+='<div><div class="lab" style="text-align:center;margin-bottom:4px;letter-spacing:.2em">'+E(MN[i].toUpperCase())+'</div><div style="border-top:1px solid var(--ln)">'+r+'</div></div>'}
  return pg(ttl(title,28,8)+fx('<span class="fld" style="width:230px;margin-left:auto"><span class="lab">'+E('Year:')+'</span><i></i></span>','margin-bottom:22px')+'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px 26px;flex:1">'+g+'</div>')}}
add('important-dates','Important dates',{html:datesPage('Important dates')});
add('birthdays','Birthday calendar',{html:datesPage('Birthday calendar')});
add('yearly-goals','Yearly goals',{html:function(S){
  return pg(ttl('Yearly goals',30,6)+fx('<span class="fld" style="width:170px;margin-left:auto"><span class="lab">'+E('Year:')+'</span><i></i></span>','margin-bottom:14px')+
  bar('My goals for this year')+chk(11,33)+'<div style="height:22px"></div>'+bar('My action steps')+chk(11,33))}});
add('yearly-review','Yearly review',{html:function(S){
  return pg(ttl('Yearly review',30,6)+fx('<span class="fld" style="width:170px;margin-left:auto"><span class="lab">'+E('Year:')+'</span><i></i></span>','margin-bottom:14px')+
  bar('My top 5 achievements')+chk(5,32)+'<div style="height:16px"></div>'+
  fx(fc(bar('What went well')+ln(7,30),'flex:1')+'<div style="width:20px"></div>'+fc(bar('My 5 biggest challenges')+ln(7,30),'flex:1'))+'<div style="height:16px"></div>'+
  bar('What I learned')+ln(5,32)+'<div style="height:12px"></div>'+bar('I am grateful for')+ln(6,32))}});
add('vision-board','Vision board',{html:function(S){
  var names=['Career','Family','Social life','Environment','Finance','Health','Personal development','Friends'],g='';
  names.forEach(function(n){g+=fc(bar(n)+bx('','flex:1;border-top:0'),'min-height:0')});
  return pg(ttl('Vision board',30,16)+'<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:14px;flex:1">'+g+'</div>')}});

/* ================= MONTHLY ================= */
add('month-calendar','Monthly calendar',{cal:'month',
  html:function(S){return pg(
   '<div class="fl" style="justify-content:space-between;align-items:flex-end;margin-bottom:14px"><div style="font:400 40px/1 var(--fh);color:var(--t);letter-spacing:.04em">'+MN[S.cal.m]+'</div><div style="font:600 20px var(--fh);color:var(--a);letter-spacing:.2em">'+S.cal.y+'</div></div>'+
   calBig(S,104,{rows:6})+
   '<div style="display:flex;gap:16px;margin-top:16px;flex:1">'+fc(bar('Notes')+ln(5,26),'flex:1')+fc(bar('To do')+chk(5,26),'flex:1')+'</div>')}});
add('month-plan','Monthly plan',{cal:'month',
  html:function(S){return pg(
   fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Monthly plan')+'</div><div style="margin-left:auto;text-align:right" class="lab">'+MN[S.cal.m]+' '+S.cal.y+'</div>','align-items:flex-end;margin-bottom:14px')+
   fx(fc(bar('Focus')+bx('','height:54px;border-top:0'),'flex:1')+'<div style="width:16px"></div>'+fc(bar('Top priorities')+bx(chk(3,18),'border-top:0;padding:0 8px'),'flex:1'),'margin-bottom:16px')+
   fx(fc(bar('Date / events / appointments')+ln(22,30),'flex:1.1')+'<div style="width:16px"></div>'+fc(bar('To do')+chk(11,30)+'<div style="height:12px"></div>'+bar('Notes')+ln(8,30),'flex:1'),'flex:1')+
   '')}});
add('month-goals','Monthly goals',{cal:'month',
  html:function(S){var cols='';
   for(var i=1;i<=3;i++)cols+=fc(bar('Goal #'+i)+bx('','height:90px;border-top:0')+'<div style="height:10px"></div>'+bar('Steps')+bx(chk(8,30),'border-top:0;padding:0 6px'),'flex:1');
   return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Monthly goals')+'</div><div style="margin-left:auto" class="lab">'+MN[S.cal.m]+' '+S.cal.y+'</div>','align-items:flex-end;margin-bottom:14px')+
   bar('Focus')+bx('','height:56px;border-top:0')+'<div style="height:16px"></div>'+fx(cols.replace(/<\/div><div style="display:flex;flex-direction:column;flex:1/g,'</div><div style="width:14px"></div><div style="display:flex;flex-direction:column;flex:1'),'gap:0')+'<div style="height:16px"></div>'+bar('Fun things this month')+ln(3,32))}});
add('month-finance','Monthly finance',{cal:'month',
  html:function(S){
   function table(t,cols,rows,rh){var s='<div class="fl bar" style="padding:0">'+cols.map(function(c){return '<div style="flex:1;padding:5px 6px;border-right:1px solid var(--bgc)">'+E(c)+'</div>'}).join('')+'</div>';
     for(var i=0;i<rows;i++)s+='<div class="fl" style="height:'+rh+'px;border-bottom:1px solid var(--ln)">'+cols.map(function(){return '<i style="flex:1;height:100%;border-right:1px solid var(--ln)"></i>'}).join('')+'</div>';
     return bar(t,'background:var(--a);color:var(--wh)')+s}
   return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Monthly finance')+'</div><div style="margin-left:auto" class="lab">'+MN[S.cal.m]+' '+S.cal.y+'</div>','align-items:flex-end;margin-bottom:14px')+
   table('Income',['Source','Date','Planned','Actual'],6,26)+'<div style="height:14px"></div>'+table('Expenses',['Category','Date','Planned','Actual'],12,26)+'<div style="height:14px"></div>'+
   fx(fc(bar('Savings')+ln(3,28),'flex:1')+'<div style="width:16px"></div>'+fc(bar('Debts')+ln(3,28),'flex:1')+'<div style="width:16px"></div>'+fc(bar('Month summary')+fld('Total income',0)+'<div style="height:10px"></div>'+fld('Total expenses',0)+'<div style="height:10px"></div>'+fld('Balance',0),'flex:1'))
   )}});

/* ================= WEEKLY ================= */
add('weekly-overview','Weekly overview',{html:function(S){
  var left='';['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Notes'].forEach(function(d){
   left+=bxr('<div class="lab" style="text-align:center;margin:8px 0 2px;letter-spacing:.2em">'+E(d.toUpperCase())+'</div>'+ln(5,24,'margin:0 12px;width:auto'),'min-height:0;overflow:hidden')});
  return pg(ttl('Weekly overview',34,4,'font-weight:600')+sub('Plan your week. Stay focused. Make it count.',6)+
   fx(fld('Week of:',260),'justify-content:center;margin-bottom:14px')+
   '<div style="display:flex;gap:18px;flex:1;min-height:0"><div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:12px;width:440px">'+left+'</div>'+
   '<div style="flex:1">'+lab('Top 3 priorities this week','text-align:center;margin-bottom:6px')+cirRows(3,26)+'<div style="height:12px"></div>'+lab('To do list','text-align:center;margin-bottom:2px')+chk(8,26)+'<div style="height:12px"></div>'+lab("Don't forget",'text-align:center')+ln(4,26)+'<div style="height:10px"></div>'+lab('Next week prep','text-align:center')+ln(4,26)+'</div></div>'+
   '<div style="height:12px"></div>'+bxr(fx('<div style="flex:1.6;padding:8px 12px">'+lab('Weekly reflection')+ln(3,24)+'</div><div style="width:1px;background:var(--ln)"></div><div style="flex:1;padding:8px 12px">'+lab("I'm proud of")+ln(3,24)+'</div>'),'height:110px'),'44px 40px')}});
add('weekly-list','Weekly planner (list)',{html:function(S){
  var days='';DAYS.forEach(function(d){days+=fc('<div class="lab" style="font-size:9px;margin-bottom:3px">'+E(d)+'</div>'+bx('','height:62px'),'margin-bottom:10px')});
  return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Weekly planner')+'</div><div style="margin-left:auto">'+fld('Week of:',170)+'</div>','align-items:flex-end;margin-bottom:18px')+
   '<div style="display:flex;gap:22px;flex:1"><div style="width:360px">'+days+'</div><div style="flex:1">'+lab('Priorities','margin-bottom:2px')+chk(7,26)+'<div style="height:16px"></div>'+lab('Daily habits')+
   '<div class="fl" style="gap:5px;margin:6px 0 2px;padding-left:96px">'+'MTWTFSS'.split('').map(function(c){return '<span style="width:14px;text-align:center;font-size:8px">'+c+'</span>'}).join('')+'</div>'+
   [1,2,3,4,5,6].map(function(){return '<div class="fl" style="height:24px;gap:5px"><i style="width:90px;border-bottom:1px solid var(--ln);height:14px;margin-right:6px"></i>'+cells(7,14,14,1)+'</div>'}).join('')+
   '<div style="height:16px"></div>'+bar('Plans','background:var(--a);color:var(--wh)')+bx('','height:110px;border-top:0')+'<div style="height:14px"></div>'+lab('Notes')+ln(6,26)+'</div></div>')}});
add('weekly-timeblock','Weekly time blocking',{html:function(S){
  var hs=['6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 PM','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM'],rows='';
  hs.forEach(function(h){rows+='<div class="fl" style="height:28px;border-bottom:1px solid var(--ln)"><span style="width:44px;font-size:8.5px;padding-left:4px;border-right:1px solid var(--ln);height:100%;display:flex;align-items:center">'+h+'</span>'+[1,2,3,4,5,6,7].map(function(){return '<i style="flex:1;height:100%;border-right:1px solid var(--ln)"></i>'}).join('')+'</div>'});
  return pg(
   fx(bxr(fld('Week of:',0,'padding:10px 12px'),'width:150px;height:62px;display:flex;align-items:center')+'<div style="flex:1;text-align:center"><div class="h1" style="font-size:26px;letter-spacing:.14em">'+E('Productivity')+'</div><div class="sub" style="font-size:13px;letter-spacing:.3em">'+E('WEEKLY PLANNER')+'</div></div>'+bxr('<div class="lab" style="padding:8px 12px 2px">'+E('Weekly focus')+'</div>'+ln(2,22,'margin:0 10px;width:auto'),'width:150px;height:62px'),'margin-bottom:12px')+
   fx(bxr(bar('Weekly goals','border-radius:10px 10px 0 0')+chk(5,26),'flex:1')+'<div style="width:10px"></div>'+bxr(bar('Key priorities','border-radius:10px 10px 0 0')+cirRows(3,26),'flex:1')+'<div style="width:10px"></div>'+bxr(bar('Habit tracker','border-radius:10px 10px 0 0')+[1,2,3,4].map(function(){return '<div class="fl" style="height:24px;gap:3px;padding:0 6px"><i style="flex:1;border-bottom:1px solid var(--ln);height:12px;margin-right:4px"></i>'+cells(7,10,10,1)+'</div>'}).join(''),'flex:1'),'margin-bottom:12px;height:162px')+
   fx(bxr(bar('Weekly time blocking','border-radius:10px 10px 0 0')+'<div class="fl" style="height:20px;border-bottom:1px solid var(--ln)"><span style="width:44px"></span>'+['MON','TUE','WED','THU','FRI','SAT','SUN'].map(function(d){return '<span style="flex:1;text-align:center;font:700 8px var(--fb);color:var(--t)">'+d+'</span>'}).join('')+'</div>'+rows,'flex:1;overflow:hidden')+'<div style="width:10px"></div>'+
   bxr(bar('Productivity score','border-radius:10px 10px 0 0')+'<div style="padding:10px">'+lab('Rate your week (1-10)')+'<div class="fl" style="gap:6px;margin:8px 0 14px">'+cells(10,11,11,1)+'</div>'+lab('What went well?')+ln(3,24)+'<div style="height:6px"></div>'+lab('What can be improved?')+ln(3,24)+'<div style="height:6px"></div>'+lab('How can I improve next week?')+ln(4,24)+'</div>','width:230px;overflow:hidden'),'height:540px;margin-bottom:12px')+
   bxr(bar('Notes & ideas','border-radius:10px 10px 0 0')+dots(104),'flex:1;overflow:hidden'),'38px 36px')}});
add('weekly-meals','Weekly meal plan',{html:function(S){
  var rows='';DAYS.forEach(function(d){rows+='<div class="fl" style="height:104px;border-bottom:1px solid var(--ln)"><div class="lab" style="width:110px;padding-left:8px;flex:none">'+E(d)+'</div>'+[1,2,3,4].map(function(){return '<i style="flex:1;height:100%;border-left:1px solid var(--ln)"></i>'}).join('')+'</div>'});
  return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Weekly meal plan')+'</div><div style="margin-left:auto">'+fld('Week of:',190)+'</div>','align-items:flex-end;margin-bottom:16px')+
   '<div class="fl bar" style="padding:0;background:var(--a);color:var(--wh)"><span style="width:110px"></span>'+['Breakfast','Lunch','Dinner','Snacks'].map(function(c){return '<div style="flex:1;padding:7px 4px">'+E(c)+'</div>'}).join('')+'</div>'+
   '<div style="border:1px solid var(--ln);border-top:0">'+rows+'</div><div style="height:16px"></div>'+
   fx('<div style="flex:1">'+lab('Water tracker')+'<div class="fl" style="gap:8px;margin-top:8px">'+cells(8,14,14,1)+'</div></div><div style="flex:1.4">'+lab('Shopping list')+ln(2,26)+'</div>'))}});
add('weekly-boxes','Weekly planner (boxes)',{html:function(S){
  var b='';['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].forEach(function(d){b+=fc('<div class="bar" style="text-align:left;padding:5px 10px">'+E(d)+'</div>'+bx('','flex:1;border-top:0'),'min-height:0')});
  b+=fc('<div class="bar" style="text-align:left;padding:5px 10px">'+E('Sunday')+'</div>'+bx('','flex:1;border-top:0'),'min-height:0');b+=fc('<div class="bar" style="text-align:left;padding:5px 10px">'+E('Notes')+'</div>'+bx(ln(5,26),'flex:1;border-top:0'),'min-height:0');
  return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Weekly planner')+'</div><div style="margin-left:auto;display:flex;gap:16px">'+fld('Week of:',170)+fld('Month:',110)+'</div>','align-items:flex-end;margin-bottom:14px')+
   fx(fc(bar('Top 3')+bx(chk(3,26),'border-top:0;padding:0 8px'),'flex:1')+'<div style="width:14px"></div>'+fc(bar('Goal')+bx('','border-top:0;flex:1'),'flex:1'),'margin-bottom:14px;height:118px')+
   '<div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:12px;flex:1">'+b+'</div>')}});

/* ================= DAILY ================= */
add('daily-classic','Daily planner (classic)',{html:function(S){
  var top3='';[1,2,3].forEach(function(n){top3+=bx('<span style="display:inline-flex;width:17px;height:17px;background:var(--t);color:var(--wh);font:700 9px var(--fb);align-items:center;justify-content:center;margin:6px">'+n+'</span>','height:46px;margin-bottom:10px')});
  return pg(ttl('Daily planner',40,4,'font-weight:400;letter-spacing:.12em')+'<div class="fl" style="justify-content:center;gap:10px;margin-bottom:10px"><i style="width:160px;border-top:1px solid var(--t)"></i><i style="width:5px;height:5px;border-radius:50%;background:var(--t)"></i><i style="width:160px;border-top:1px solid var(--t)"></i></div>'+
   fx(fld('Date:',200)+'<span style="width:50px"></span>'+fld('Day:',150),'justify-content:center;margin-bottom:18px')+
   '<div style="display:flex;gap:20px"><div style="width:270px">'+lab("Today's top 3",'text-align:center;margin-bottom:8px')+top3+'<div style="height:6px"></div>'+lab('To-do list','text-align:center;margin-bottom:4px')+chk(11,26)+'</div>'+
   '<div style="flex:1">'+lab('Schedule','text-align:center;margin-bottom:8px')+'<div style="border:1px solid var(--x)">'+timeRows(hours(6,22,60),27,64)+'</div></div></div>'+
   '<div style="display:flex;gap:14px;margin-top:20px;height:236px">'+
   fc(lab('Priorities','text-align:center;margin-bottom:6px')+bx(['Important','Urgent','Later'].map(function(t){return '<div style="padding:8px 8px 0"><span style="background:var(--t);color:var(--wh);font:700 7px var(--fb);padding:2px 6px;letter-spacing:.1em">'+E(t.toUpperCase())+'</span>'+ln(3,20)+'</div>'}).join(''),'flex:1;border-color:var(--x)'),'width:160px')+
   fc(lab('Notes','text-align:center;margin-bottom:6px')+bx(ln(10,22,'margin:0 8px;width:auto'),'flex:1;border-color:var(--x)'),'flex:1')+
   fc(lab('Self-care','text-align:center;margin-bottom:6px')+bx(['Water','Exercise','Reading','Sleep','Personal time'].map(function(t){return '<div class="fl" style="height:40px;border-bottom:1px solid var(--ln);padding:0 8px;gap:6px"><span style="width:70px;font:700 8px var(--fb);letter-spacing:.1em;text-transform:uppercase">'+E(t)+'</span>'+cells(8,10,10,1)+'</div>'}).join(''),'flex:1;border-color:var(--x)'),'width:210px')+'</div>'+
   '<div style="margin-top:18px">'+lab('End of day','text-align:center;margin-bottom:6px')+bx(fx(['What went well?','What can I improve tomorrow?',"Tomorrow's priority:"].map(function(t,i){return '<div style="flex:1;padding:8px 12px;'+(i?'border-left:1px solid var(--x)':'')+'"><span style="font-size:9px">'+E(t)+'</span>'+ln(3,20)+'</div>'}).join('')),'border-color:var(--x)')+'</div>',
   '36px 40px')}});
add('daily-halfhour','Daily plan (half-hour table)',{html:function(S){
  var hrs=hours(6,23,30),rows='';
  function mid(i){
    if(i<5)return '<div style="width:150px;border-right:1px solid var(--ln);padding:0 8px;display:flex;align-items:center"><span style="width:6px;height:6px;border-radius:50%;background:var(--t)"></span></div>';
    if(i===5)return '<div class="bar" style="width:150px;border-right:1px solid var(--ln);padding:5px;font-size:8.5px">'+E('To do list')+'</div>';
    if(i<27)return '<div style="width:150px;border-right:1px solid var(--ln);display:flex;justify-content:flex-end;align-items:center;padding:0 8px"><span class="cb" style="width:12px;height:12px"></span></div>';
    if(i===27)return '<div class="bar" style="width:150px;border-right:1px solid var(--ln);padding:5px;font-size:8.5px">'+E('Meal tracking')+'</div>';
    if(i<32)return '<div style="width:150px;border-right:1px solid var(--ln);padding:5px 8px;font-size:9px">'+['B:','L:','D:','S:'][i-28]+'</div>';
    if(i===32)return '<div class="bar" style="width:150px;border-right:1px solid var(--ln);padding:5px;font-size:8.5px">'+E('Water intake')+'</div>';
    return '<div style="width:150px;border-right:1px solid var(--ln);display:flex;align-items:center;gap:5px;padding:0 8px">'+(i===34?cells(7,11,13,1):'')+'</div>';
  }
  function right(i){
    if(i===5)return '<div class="bar" style="flex:1;padding:5px;font-size:8.5px">'+E('Notes')+'</div>';
    if(i===27)return '<div class="bar" style="flex:1;padding:5px;font-size:8.5px">'+E("Today's mood")+'</div>';
    if(i===28)return '<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:12px">'+cells(5,18,18,1)+'</div>';
    if(i===30)return '<div class="bar" style="flex:1;padding:5px;font-size:8.5px">'+E('Health & fitness')+'</div>';
    return '<div style="flex:1"></div>';
  }
  hrs.forEach(function(h,i){
    var noBorder=(i>=6&&i<26)||i===28||(i>=31);
    rows+='<div style="display:flex;height:25px;border-bottom:'+((i>=6&&i<27)||i===28||i===29||i>=31?'1px solid var(--ln)':'1px solid var(--ln)')+'">'+
      '<div style="width:206px;border-right:1px solid var(--ln);padding:5px 6px;font:600 9px var(--fb);color:var(--t)">'+h+'</div>'+mid(i)+right(i)+'</div>';
  });
  return pg(fx('<div style="font:700 44px/1 var(--fh);color:var(--t);letter-spacing:.04em">'+E('DAILY PLAN')+'</div><div style="margin-left:auto;align-self:flex-end;display:flex;gap:18px;align-items:flex-end">'+fld('Date',150)+'<span class="lab" style="letter-spacing:.6em">S M T W T F S</span></div>','margin-bottom:12px')+
   '<div style="display:flex;border:1px solid var(--ln);border-bottom:0"><div class="bar" style="width:206px;border-right:1px solid var(--ln);background:transparent">'+E('Schedule')+'</div><div class="bar" style="width:150px;border-right:1px solid var(--ln);background:transparent">'+E('Top priorities')+'</div><div class="bar" style="flex:1;background:transparent">'+E('Gratitude')+'</div></div>'+
   '<div style="border:1px solid var(--ln)">'+rows+'</div>','36px 40px')}});
add('daily-twocol','Daily plan (two columns)',{html:function(S){
  var hs=hours(5,28,60).map(function(h){return h.replace(':00','')}).slice(0,24),sched='';
  hs.forEach(function(h){sched+='<div class="fl" style="height:35px;border-bottom:1px solid var(--ln)"><span style="width:62px;flex:none;font-size:9px;padding-left:4px;border-right:1px solid var(--ln);height:100%;display:flex;align-items:center">'+h+'</span></div>'});
  function hd(t){return '<div style="font:800 11px var(--fb);letter-spacing:.08em;text-transform:uppercase;color:var(--t);border-bottom:2px solid var(--t);padding:14px 0 4px">'+E(t)+'</div>'}
  return pg(fx('<div style="font:400 36px var(--fh);color:var(--t);letter-spacing:.02em">'+E('DAILY PLAN')+'</div><div style="margin-left:auto;align-self:flex-end">'+fld('DATE',200)+'</div>','margin-bottom:10px')+
   '<div style="display:flex;gap:30px;flex:1"><div style="width:372px"><div style="font:800 11px var(--fb);letter-spacing:.08em;color:var(--t);border-bottom:2px solid var(--t);padding:6px 0 4px">'+E('SCHEDULE')+'</div><div style="border-bottom:2px solid var(--t)">'+sched+'</div></div>'+
   '<div style="flex:1">'+hd("Today's goal")+ln(2,32)+hd('Top priorities')+cirRows(3,26)+hd('Meals')+['Breakfast','Lunch','Dinner','Snacks'].map(function(t){return '<div class="fl" style="height:22px;border-bottom:1px solid var(--ln);font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--x)">'+E(t)+'</div>'}).join('')+'<div class="fl" style="height:24px;border-bottom:1px solid var(--ln);gap:8px"><span style="font-size:8.5px;letter-spacing:.08em;width:50px">'+E('WATER')+'</span>'+cells(7,12,14,1)+'</div>'+
   hd('To do list')+chk(8,26)+hd("Today, I'm grateful for")+ln(2,28)+hd('Tomorrow reminder')+ln(2,28)+'</div></div>','36px 40px')}});
add('daily-routine','Daily routine',{html:function(S){
  function box(t,n){return bx('<div class="bar" style="background:var(--p)">'+E(t)+'</div>'+chk(n,30,'margin:0 10px'),'border-color:var(--ln)')}
  return pg(fx('<div style="font:700 28px var(--fh);color:var(--t);letter-spacing:.12em;text-transform:uppercase">'+E('Daily routine')+'</div><div style="margin-left:auto;align-self:flex-end">'+fld('Date:',190)+'</div>','margin-bottom:22px')+
   '<div style="display:flex;gap:22px;flex:1"><div style="flex:1;display:flex;flex-direction:column;gap:24px">'+box('Morning',6)+box('Afternoon',6)+box('Evening',6)+'</div>'+
   '<div style="flex:1;display:flex;flex-direction:column;gap:20px"><div>'+bar('Priorities')+bx(cirRows(9,32,'margin:0 10px'),'border-top:0')+'</div><div style="flex:1;display:flex;flex-direction:column">'+bar('Motivation')+bx('','flex:1;border-top:0')+'</div><div style="flex:1;display:flex;flex-direction:column">'+bar('Notes')+bx('','flex:1;border-top:0')+'</div></div></div>')}});
add('daily-pastel','Daily schedule (soft)',{html:function(S){
  var hs=hours(5,22,30,'24'),sched='';
  hs.forEach(function(h){sched+='<div style="height:24px;border-top:1px solid var(--ln);font-size:8px;letter-spacing:.06em;padding-top:5px;color:var(--t)">'+h+'</div>'});
  return pg(fx(fld('DATE:',0,'flex:1'),'margin:40px 0 28px')+
   '<div style="display:flex;gap:26px;flex:1"><div style="width:310px;background:var(--p);border-radius:10px;padding:14px 14px 10px;align-self:flex-start"><div class="lab" style="font-size:12px;margin-bottom:8px;color:var(--t)">'+E('SCHEDULE')+'</div>'+sched+'</div>'+
   '<div style="flex:1"><div class="lab" style="font-size:12px;margin-bottom:6px;border-bottom:1px solid var(--ln);padding-bottom:6px">'+E('TO DO')+'</div>'+chk(15,30)+'<div class="lab" style="font-size:12px;margin:34px 0 0;border-bottom:1px solid var(--ln);padding-bottom:6px">'+E('NOTES')+'</div>'+ln(10,30)+'</div></div>','28px 44px 30px')}});
add('daily-focus','Daily planner (focus + meals)',{html:function(S){
  var hs=hours(5,22,60).map(function(h){return h.replace(':00','').replace(' am','').replace(' pm','')}),sched='';
  for(var i=0;i<hs.length;i++){sched+='<div style="display:flex;height:40px;border-bottom:1px solid var(--ln)"><div style="width:44px;border-right:1px solid var(--ln);font:700 9px var(--fb);padding:4px 4px;color:var(--t)">'+hs[i]+'<span style="display:block;font-weight:400">'+(hs[i]+':30')+'</span></div></div>'}
  return pg('<div style="border-bottom:2px solid var(--t);display:flex;align-items:flex-end;padding-bottom:6px;margin-bottom:16px"><div style="font:700 32px var(--fh);color:var(--t);letter-spacing:.04em">'+E('DAILY PLANNER')+'</div><span class="lab" style="margin-left:auto">'+E('DATE :')+'</span></div>'+
   '<div style="display:flex;gap:26px;flex:1"><div style="width:270px"><div style="font:italic 600 11px var(--fb);margin-bottom:6px;color:var(--t)">'+E('Focus')+'</div>'+bx('','height:76px;border-color:var(--x)')+'<div style="font:italic 600 11px var(--fb);margin:18px 0 6px;color:var(--t)">'+E('To-do list')+'</div>'+chk(12,28,'border-bottom-color:var(--x)')+'<div style="font:italic 600 11px var(--fb);margin:18px 0 6px;color:var(--t)">'+E('Meal plan')+'</div>'+['B','L','D','S'].map(function(t){return '<div class="fl" style="height:30px;border-bottom:1px solid var(--ln);gap:12px;font:700 9px var(--fb);color:var(--t)"><span style="width:24px">'+t+'</span></div>'}).join('')+'<div class="fl" style="gap:6px;margin-top:10px">'+cells(8,14,14,1)+'</div></div>'+
   '<div style="flex:1"><div style="font:italic 600 11px var(--fb);text-align:center;margin-bottom:6px;color:var(--t)">'+E('Schedule')+'</div><div style="border-top:2px solid var(--t)">'+sched+'</div></div></div>')}});

/* ================= TRACKERS ================= */
add('habit-tracker','Habit tracker (31 days)',{cal:'month',
  html:function(S){var d='';for(var i=1;i<=31;i++)d+='<span style="width:17px;text-align:center;font:600 8px var(--fb);flex:none">'+i+'</span>';
   var rows='',names=['Drink water','Exercise','Meditate','Read','Journal','Sleep early','Eat healthy','Plan your day','Get sunlight','Limit screen time','Learn something','Be grateful','Clean / tidy','Save money','Connect with loved ones','No spend day'];
   names.forEach(function(n){rows+='<div class="fl" style="height:34px;border-bottom:1px solid var(--ln)"><div style="width:130px;flex:none;padding-left:6px;font:600 9px var(--fb);color:var(--t)">'+E(n)+'</div>'+Array(31).join('x').split('').concat(['x']).map(function(){return '<i style="width:17px;flex:none;height:100%;border-left:1px solid var(--ln)"></i>'}).join('')+'<i style="flex:1;height:100%;border-left:1px solid var(--ln);background:var(--p)"></i></div>'});
   return pg('<div style="text-align:center"><div class="h1" style="font-size:34px;letter-spacing:.1em">'+E('Habit tracker')+'</div><div class="sub" style="margin-top:6px">'+E('Small habits, big changes.')+'</div></div>'+
   fx(bxr('<div style="padding:8px 12px"><span class="lab">'+E('Month:')+'</span> <span style="font-weight:600;color:var(--t)">'+MN[S.cal.m]+' '+S.cal.y+'</span></div>','width:250px')+'<div style="flex:1"></div>'+bxr(fld('Goal this month:',0,'padding:8px 12px;width:330px'),''),'margin:14px 0 10px')+
   '<div style="border:1px solid var(--ln)"><div class="fl bar" style="padding:0;height:24px"><div style="width:130px;flex:none;padding-left:6px;text-align:left">'+E('HABIT')+'</div>'+d+'<span style="flex:1;text-align:center">'+E('TOTAL')+'</span></div>'+rows+'</div>'+
   '<div style="display:flex;gap:12px;margin-top:12px;flex:1">'+bxr('<div class="lab" style="text-align:center;padding:8px">'+E('Weekly progress')+'</div>'+[['Week 1 (1-7)',7],['Week 2 (8-14)',7],['Week 3 (15-21)',7],['Week 4 (22-28)',7],['Week 5 (29-31)',3]].map(function(w){return '<div class="fl" style="gap:5px;padding:2px 10px;font-size:8px;height:19px"><span style="width:80px">'+w[0]+'</span>'+cells(w[1],10,10,1)+'</div>'}).join(''),'flex:1;background:var(--p)')+
   bxr('<div class="lab" style="text-align:center;padding:8px">'+E('Notes')+'</div>'+ln(5,22,'margin:0 10px;width:auto'),'flex:1')+
   bxr('<div class="lab" style="text-align:center;padding:8px">'+E('Monthly reflection')+'</div><div style="padding:0 10px;font-size:8px">'+E('What went well this month?')+ln(1,16)+E('What can I improve?')+ln(1,16)+E('I am proud of myself for:')+ln(1,16)+'</div>','flex:1.2')+'</div>','34px 36px')}});
add('mood-tracker','Mood tracker',{cal:'year',
  html:function(S){var head='',rows='',i,j;
   'JFMAMJJASOND'.split('').forEach(function(c){head+='<span style="flex:1;text-align:center;font:700 9px var(--fb);color:var(--t)">'+c+'</span>'});
   for(i=1;i<=31;i++){rows+='<div class="fl" style="height:24px;border-bottom:1px solid var(--ln)"><span style="width:26px;font:600 8px var(--fb);text-align:center;border-right:1px solid var(--ln);height:100%;display:flex;align-items:center;justify-content:center">'+i+'</span>'+Array(13).join('x').split('').map(function(){return '<i style="flex:1;height:100%;border-right:1px solid var(--ln)"></i>'}).join('')+'</div>'}
   var moods=['Happy','Good','Neutral','Tired','Sad','Angry','Stressed','Excited','Lonely','Calm'],leg=moods.map(function(m,k){return '<div class="fl" style="gap:8px;height:30px"><span style="width:16px;height:16px;border-radius:3px;background:var(--a);opacity:'+(1-k*.07)+'"></span><span style="font-size:10px">'+E(m)+'</span></div>'}).join('');
   return pg(fx('<div class="h1" style="font-size:30px;text-align:left">'+E('Mood tracker')+'</div><div style="margin-left:auto">'+fld('Year:',0,'width:150px')+'</div>','align-items:flex-end;margin-bottom:16px')+
   '<div style="display:flex;gap:26px;flex:1"><div style="flex:1"><div class="fl" style="height:20px;border:1px solid var(--ln);background:var(--p)"><span style="width:26px"></span>'+head+'</div><div style="border:1px solid var(--ln);border-top:0">'+rows+'</div></div><div style="width:150px;padding-top:30px">'+leg+'</div></div>')}});
add('routine-tracker','Daily routines tracker',{html:function(S){
  function blk(t){var r='';for(var i=0;i<11;i++)r+='<div class="fl" style="height:34px"><i style="flex:1;border-bottom:1px solid var(--x);height:100%;margin-right:20px"></i>'+cells(7,22,22,0)+'</div>';
   return '<div class="fl" style="margin-bottom:6px"><span class="lab" style="flex:1;font-size:13px;letter-spacing:.06em">'+E(t)+'</span><div class="fl" style="gap:0">'+'MTWTFSS'.split('').map(function(c){return '<span style="width:30px;text-align:center;font:600 13px var(--fb);color:var(--t)">'+c+'</span>'}).join('')+'</div></div>'+r.replace(/<span class="cb" style="width:22px;height:22px"><\/span>/g,'<span class="cb" style="width:22px;height:22px;margin-right:8px;border-radius:2px"></span>')}
  return pg(ttl('My daily routines',30,40)+blk('MORNING ROUTINE')+'<div style="height:34px"></div>'+blk('EVENING ROUTINE'),'56px 60px')}});
add('expense-tracker','Expense tracker',{cal:'month',
  html:function(S){var cols=['Date','Category','Description','Amount'],w=[90,170,320,100],rows='';
   for(var i=0;i<28;i++)rows+='<div class="fl" style="height:28px;border-bottom:1px solid var(--ln);'+(i%2?'background:var(--p)':'')+'">'+w.map(function(x){return '<i style="width:'+x+'px;height:100%;border-right:1px solid var(--ln);flex:none"></i>'}).join('')+'</div>';
   return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Expense tracker')+'</div><div style="margin-left:auto" class="lab">'+MN[S.cal.m]+' '+S.cal.y+'</div>','align-items:flex-end;margin-bottom:16px')+
   '<div class="fl bar" style="padding:0;background:var(--a);color:var(--wh)">'+cols.map(function(c,i){return '<div style="width:'+w[i]+'px;flex:none;padding:7px 6px">'+E(c)+'</div>'}).join('')+'</div><div style="border-left:1px solid var(--ln)">'+rows+'</div><div style="height:16px"></div>'+
   '<div style="display:flex;gap:16px">'+bxr('<div style="padding:12px 16px">'+fld('Total income',0)+'<div style="height:12px"></div>'+fld('Total expenses',0)+'<div style="height:12px"></div>'+fld('Savings',0)+'</div>','flex:1;background:var(--p)')+'</div>')}});
add('weekly-habits','Weekly habit tracker',{html:function(S){
  var rows='';for(var i=0;i<14;i++)rows+='<div class="fl" style="height:44px;border-bottom:1px solid var(--ln);gap:14px;padding:0 6px"><i style="flex:1;border-bottom:1px dotted var(--ln);height:14px"></i>'+cells(7,18,18,1)+'</div>';
  return pg(ttl('Weekly habit tracker',28,6)+sub('Small steps every day lead to big results.',14)+fx(fld('Week of:',250),'margin-bottom:22px')+
   '<div class="fl bar" style="padding:0;text-align:left"><div style="flex:1;padding:8px 10px">'+E('Habit')+'</div>'+['M','T','W','T','F','S','S'].map(function(c){return '<span style="width:32px;text-align:center">'+c+'</span>'}).join('')+'<span style="width:6px"></span></div>'+rows+'<div style="height:20px"></div>'+bar('Reflection')+ln(4,30))}});

/* ================= LISTS & NOTES ================= */
add('todo-list','To-do list',{html:function(S){
  return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('To-do list')+'</div><div style="margin-left:auto;align-self:flex-end">'+fld('Date:',190)+'</div>','margin-bottom:22px')+
   '<div style="display:flex;gap:26px"><div style="flex:1">'+bar('Urgent')+chk(16,34)+'</div><div style="flex:1">'+bar('Later')+chk(16,34)+'</div></div><div style="height:22px"></div>'+bar('Notes')+ln(4,32))}});
add('notes-lined','Notes (lined)',{html:function(S){
  return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Notes')+'</div><div style="margin-left:auto;align-self:flex-end">'+fld('Date:',190)+'</div>','margin-bottom:22px')+ln(31,30))}});
add('notes-dotted','Notes (dotted)',{html:function(S){
  return pg(fx('<div style="font:700 30px var(--fh);color:var(--t);letter-spacing:.1em;text-transform:uppercase">'+E('Notes & ideas')+'</div><div style="margin-left:auto;align-self:flex-end">'+fld('Date:',190)+'</div>','margin-bottom:18px')+dots(900,'margin:0 -4px'))}});
add('contact-list','Contact list',{html:function(S){
  var b='';for(var i=0;i<5;i++)b+=bx('<div style="padding:10px 14px">'+fx(fld('Full name',0,'flex:1.4')+'<span style="width:20px"></span>'+fld('Phone',0,'flex:1'),'margin-bottom:10px')+fx(fld('Email',0,'flex:1.4')+'<span style="width:20px"></span><span style="flex:1"></span>','margin-bottom:10px')+fld('Address',0,'margin-bottom:10px')+fld('Notes')+'</div>','height:170px;margin-bottom:12px;flex:none');
  return pg(ttl('Contact list',30,16)+b)}});
add('emergency-contacts','Emergency contacts',{html:function(S){
  var b='';for(var i=0;i<4;i++)b+=bx('<div style="padding:10px 14px">'+fx(fld('Full name',0,'flex:1.3')+'<span style="width:20px"></span>'+fld('Relationship',0,'flex:1'),'margin-bottom:10px')+fx(fld('Cell phone',0,'flex:1')+'<span style="width:20px"></span>'+fld('Office phone',0,'flex:1'),'margin-bottom:10px')+fld('Email address',0,'margin-bottom:10px')+fx(fld('City',0,'flex:1.4')+'<span style="width:16px"></span>'+fld('State',0,'flex:1')+'<span style="width:16px"></span>'+fld('Zip',0,'flex:.8'),'margin-bottom:10px')+fld('Notes')+'</div>','height:214px;margin-bottom:12px;flex:none');
  return pg(ttl('Emergency contacts',28,16)+b)}});
add('goals-page','Goals page',{html:function(S){
  return pg(ttl('Goals',32,16)+bar('Main goal')+bx('','height:80px;border-top:0')+'<div style="height:16px"></div>'+fld('Why is this important?',0)+'<div style="height:10px"></div>'+ln(2,30)+'<div style="height:16px"></div>'+
   '<div style="display:flex;gap:18px"><div style="flex:1">'+bar('Key steps')+cirRows(7,34)+'</div><div style="flex:1">'+bar('To do')+chk(7,34)+'</div></div><div style="height:20px"></div>'+fx(fld('Target date:',260),'justify-content:flex-end'))}});
add('reflection','Monthly reflection',{html:function(S){
  return pg(ttl('Reflection',32,16)+'<div style="display:flex;gap:18px;margin-bottom:18px"><div style="flex:1">'+bar('My wins')+ln(8,32)+'</div><div style="flex:1">'+bar('To improve')+ln(8,32)+'</div></div>'+bar('Lessons learned')+ln(5,32)+'<div style="height:14px"></div>'+bar("I'm grateful for")+ln(5,32)+'<div style="height:14px"></div>'+bar('Next month focus')+ln(4,32))}});

window.PLANNER_MODELS=P;
})();
