/* Emadeck - modeles Cartes de mariage (autonome) */
(function(){
'use strict';
var P=window.PLANNER_MODELS=window.PLANNER_MODELS||{};
function add(id,name,o){o.name=name;P[id]=o}
function E(t,c,st){return '<span class="ed'+(c?' '+c:'')+'"'+(st?' style="'+st+'"':'')+'>'+t+'</span>'}
function wSeed(n){var x=n*9301+49297;return function(){x=(x*9301+49297)%233280;return x/233280}}
function wLeaf(x,y,ang,len,wid,tone){
  var cols=['#9FAB90','#B3BCA3','#A7B198','#BCC3AE','#8E9C80'],c=cols[tone%cols.length];
  var d='M0 0C'+(len*.22)+' '+(-wid)+' '+(len*.72)+' '+(-wid*.9)+' '+len+' 0C'+(len*.72)+' '+(wid*.9)+' '+(len*.22)+' '+wid+' 0 0Z';
  return '<g transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+ang.toFixed(1)+')"><path d="'+d+'" fill="'+c+'" fill-opacity=".8" stroke="#C4A265" stroke-width=".9"/>'+
   '<path d="M0 0C'+(len*.22)+' '+(-wid)+' '+(len*.72)+' '+(-wid*.9)+' '+len+' 0Z" fill="#fff" fill-opacity=".28"/><path d="M0 0L'+(len*.92)+' 0" stroke="#C4A265" stroke-width=".8" fill="none"/></g>';
}
function wFlower(cx,cy,r,rot){
  var o='<g transform="translate('+cx+' '+cy+') rotate('+rot+')">';
  [[0,1],[72,.95],[144,1],[216,.92],[288,.98]].forEach(function(a){
    o+='<g transform="rotate('+a[0]+')"><path d="M0 0C'+(-r*.55*a[1])+' '+(-r*.35)+' '+(-r*.5*a[1])+' '+(-r*.95)+' 0 '+(-r*a[1])+'C'+(r*.5*a[1])+' '+(-r*.95)+' '+(r*.55*a[1])+' '+(-r*.35)+' 0 0Z" fill="#FFFDF8" fill-opacity=".92" stroke="#C4A265" stroke-width="1"/><path d="M0 '+(-r*.1)+'C'+(-r*.2)+' '+(-r*.5)+' '+(r*.1)+' '+(-r*.7)+' 0 '+(-r*.88)+'" stroke="#D8C49A" stroke-width=".7" fill="none"/></g>';
  });
  o+='<circle r="'+(r*.13)+'" fill="#E9D9B0" stroke="#C4A265" stroke-width=".8"/></g>';return o;
}
function wBranch(rot){
  var R=wSeed(7),g='',pts=[],i;
  var P0=[30,540],P1=[100,390],P2=[150,250],P3=[330,60];
  function bz(t){var u=1-t;return [u*u*u*P0[0]+3*u*u*t*P1[0]+3*u*t*t*P2[0]+t*t*t*P3[0],u*u*u*P0[1]+3*u*u*t*P1[1]+3*u*t*t*P2[1]+t*t*t*P3[1]]}
  function tan(t){var a=bz(Math.max(0,t-.01)),b=bz(Math.min(1,t+.01));return Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI}
  g+='<path d="M30 540C100 390 150 250 330 60" stroke="#C4A265" stroke-width="1.6" fill="none"/>';
  for(i=0;i<9;i++){var t=.12+i*.095,p=bz(t),a=tan(t),side=i%2?1:-1,len=70-i*3.2+R()*10,tone=Math.floor(R()*5);
    g+=wLeaf(p[0],p[1],a+side*(48+R()*14),len,len*.27,tone)}
  var tip=bz(1);g+=wLeaf(tip[0],tip[1],tan(1)-8,56,16,2)+wLeaf(tip[0],tip[1],tan(1)+34,44,13,4);
  var tp=bz(.62);g+='<path d="M'+tp[0]+' '+tp[1]+'C'+(tp[0]+40)+' '+(tp[1]-6)+' '+(tp[0]+80)+' '+(tp[1]-40)+' '+(tp[0]+120)+' '+(tp[1]-40)+'" stroke="#C4A265" stroke-width="1" fill="none"/>';
  for(i=0;i<5;i++){var bx=tp[0]+40+i*20,by=tp[1]-8-i*7;g+='<circle cx="'+bx+'" cy="'+by+'" r="2.6" fill="#FFFDF8" stroke="#C4A265" stroke-width=".8"/>'}
  var fp=bz(.62);g+='<path d="M'+fp[0]+' '+fp[1]+'C'+(fp[0]-30)+' '+(fp[1]-24)+' '+(fp[0]-52)+' '+(fp[1]-56)+' '+(fp[0]-66)+' '+(fp[1]-84)+'" stroke="#C4A265" stroke-width="1.2" fill="none"/>'+wLeaf(fp[0]-24,fp[1]-18,-150,40,11,1)+wFlower(fp[0]-72,fp[1]-96,44,-18);
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 560" width="420" height="560"><g transform="'+(rot?'rotate(180 210 280)':'')+'">'+g+'</g></svg>';
}
function wUri(svg){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
function wSprig(){
  var g='<path d="M10 20C50 16 90 16 130 20" stroke="#C4A265" stroke-width="1.2" fill="none"/>',i;
  for(i=0;i<5;i++){var x=40+i*16;g+=wLeaf(x,19,-48,13,4,i)+wLeaf(x+4,19,48,13,4,i+1)}
  g+='<circle cx="70" cy="19" r="2.2" fill="#C4A265"/>';
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" width="140" height="40">'+g+'</svg>';
}
function wCard(S,x,y,w,t,sz,ls,st,cls){return '<div style="position:absolute;left:0;width:816px;top:'+y+'px;text-align:center;'+(st||'')+'"><div class="'+(cls||'')+'" style="display:inline-block;font:400 '+sz+'px/1.35 var(--fh);letter-spacing:'+ls+'em;color:var(--t);'+(x||'')+'">'+t+'</div></div>'}
add('wed-arch','Wedding invitation - arch',{
  preset:function(s,txt){
    s.th={title:'#1B1B1B',text:'#1B1B1B',accent:'#B9975B',pale:'#F1EBDD',bg:'#FBF8F1',fh:"'Cormorant Garamond', serif",fb:"'Cormorant Garamond', serif"};
    function im(id,src,x,y,w,h,fl){return {id:id,t:'img',src:src,x:x,y:y,w:w,h:h,flip:!!fl}}
    s.els.push(im('wf1',wUri(wBranch(false)),26,26,330,440));
    s.els.push(im('wf2',wUri(wBranch(true)),460,590,330,440));
    s.els.push(im('wf3',wUri(wSprig()),338,676,140,40));
  },
  html:function(S){
    return '<div style="position:absolute;inset:20px;border:1.5px solid var(--a)"></div><div style="position:absolute;inset:29px;border:1px solid var(--a)"></div>'+
     '<div style="position:absolute;left:150px;top:84px;width:516px;height:945px;border:1.5px solid var(--a);border-bottom:0;border-radius:258px 258px 0 0"></div>'+
     wCard('',0,206,0,E('TOGETHER')+'<br>'+E('WITH THEIR FAMILIES'),13,.22)+
     wCard('',0,282,0,E('SARAH'),64,.14,'','')+
     '<div style="position:absolute;left:230px;width:356px;top:372px;display:flex;align-items:center;gap:14px"><i style="flex:1;border-top:1px solid var(--a)"></i><span style="font:400 46px/1 \'Allura\',cursive;color:var(--a)">'+E('and')+'</span><i style="flex:1;border-top:1px solid var(--a)"></i></div>'+
     wCard('',0,416,0,E('BERNARD'),64,.14)+
     wCard('',0,516,0,E('INVITE YOU TO CELEBRATE')+'<br>'+E('THEIR WEDDING'),14,.2)+
     '<div style="position:absolute;left:190px;width:436px;top:570px;display:flex;align-items:center;justify-content:center">'+
       '<div style="flex:1;text-align:center;border-bottom:1px solid var(--a);padding:12px 0 10px;font:400 14px var(--fh);letter-spacing:.2em;color:var(--t)">'+E('SUNDAY')+'</div>'+
       '<div style="width:92px;height:62px;border-left:1px solid var(--a);border-right:1px solid var(--a);text-align:center;font:400 54px/62px var(--fh);color:var(--t)">'+E('14')+'</div>'+
       '<div style="flex:1;text-align:center;border-bottom:1px solid var(--a);padding:12px 0 10px;font:400 14px var(--fh);letter-spacing:.2em;color:var(--t)">'+E('FEBRUARY 2027')+'</div></div>'+
     wCard('',0,641,0,E('AT FOUR O’CLOCK IN THE AFTERNOON'),13,.2)+
     wCard('',0,732,0,E('THE GRANDVILLE ESTATE'),17,.18)+
     wCard('',0,758,0,E('1234 WILLOW CREEK ROAD')+'<br>'+E('NAPA VALLEY, CALIFORNIA'),14,.18,'line-height:1.55')+
     '<div style="position:absolute;left:0;width:816px;top:818px;text-align:center;font:400 30px/1.2 \'Allura\',cursive;color:var(--a)">'+E('reception to follow')+'</div>'+
     '<div style="position:absolute;left:0;width:816px;top:890px;text-align:center;font:400 34px/1 var(--fh);color:var(--t)"><span style="display:inline-block;transform:translateY(-8px)">'+E('S')+'</span><span style="display:inline-block;width:18px"></span><span style="display:inline-block;transform:translateY(14px)">'+E('B')+'</span></div>';
  }});
})();
