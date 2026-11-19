(function(){
  var FREE_PAGES=7;
  var FREE_CODES=['CVA-01','CVA-02','LBA-01','LBA-02'];
  var FULL_ROLES=['admin','editor','tester','member'];
  var L=window.EMADECK_LIMITS={active:false,pages:FREE_PAGES};

  var st=document.createElement('style');
  st.textContent='.tcard.jd-locked .thumb{opacity:.45}.tcard.jd-locked .add{background:#E4E9F5!important;color:#5C6684!important;cursor:not-allowed}'
  +'#jdTrialMsg{position:fixed;inset:0;z-index:9500;background:rgba(11,27,77,.45);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Arial,Helvetica,sans-serif}'
  +'#jdTrialMsg .c{background:#fff;border-radius:16px;max-width:360px;width:100%;padding:24px;box-shadow:0 20px 50px rgba(11,27,77,.25)}'
  +'#jdTrialMsg h3{margin:0 0 8px;font-size:18px;color:#0B1B4D}'
  +'#jdTrialMsg p{margin:0 0 18px;font-size:14px;line-height:1.55;color:#5C6684}'
  +'#jdTrialMsg button{width:100%;border:0;border-radius:12px;background:#1F4FD8;color:#fff;font-size:15px;font-weight:700;padding:13px;cursor:pointer}';
  document.head.appendChild(st);

  function codeOf(card){
    var n=card.querySelector('.tn'),t=n?n.textContent:'',m=t.match(/^\s*([A-Z]+-\d+)/);
    return m?m[1]:'';
  }
  function locked(code){
    if(/^CV[A-Z]-\d+$/.test(code)||/^LB[A-Z]-\d+$/.test(code))return FREE_CODES.indexOf(code)<0;
    return false;
  }
  function say(title,text){
    var o=document.getElementById('jdTrialMsg');if(o)o.remove();
    o=document.createElement('div');o.id='jdTrialMsg';
    o.innerHTML='<div class="c"><h3></h3><p></p><button type="button">OK</button></div>';
    o.querySelector('h3').textContent=title;
    o.querySelector('p').textContent=text;
    o.querySelector('button').onclick=function(){o.remove()};
    o.onclick=function(e){if(e.target===o)o.remove()};
    document.body.appendChild(o);
  }
  var MSG_FULL='This template is available with the full plan, which starts automatically when your trial ends.';

  L.say=say;
  L.locked=locked;
  L.canAdd=function(count,tpl){
    if(!L.active)return true;
    if(count>=FREE_PAGES){
      say('Free trial limit','Your free trial is limited to '+FREE_PAGES+' pages per book. Your subscription starts automatically when the trial ends and removes this limit.');
      return false;
    }
    if(tpl&&locked(tpl.code)){say('Included with the full plan',MSG_FULL);return false;}
    return true;
  };
  L.mark=function(f){
    if(!L.active)return;
    try{
      var d=f.contentDocument;if(!d||!d.body)return;
      var w=d.createElement('div');
      w.setAttribute('style','position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483647;pointer-events:none;display:flex;align-items:center;justify-content:center;overflow:hidden');
      w.innerHTML='<span style="transform:rotate(-30deg);font:700 56px Arial,Helvetica,sans-serif;letter-spacing:2px;color:rgba(11,27,77,.14);white-space:nowrap">EMADECK FREE TRIAL</span>';
      d.body.appendChild(w);
    }catch(e){}
  };

  function sweep(){
    if(!L.active)return;
    [].forEach.call(document.querySelectorAll('.tcard'),function(c){
      if(c.getAttribute('data-jdl'))return;
      c.setAttribute('data-jdl','1');
      if(cardLocked(c)){
        c.classList.add('jd-locked');
        var b=c.querySelector('.add');if(b)b.textContent='Locked';
      }
    });
  }
  var tm;
  new MutationObserver(function(){clearTimeout(tm);tm=setTimeout(sweep,300)}).observe(document.body,{childList:true,subtree:true});

  document.addEventListener('click',function(e){
    if(!L.active)return;
    var b=e.target.closest&&e.target.closest('.tcard .add');if(!b)return;
    var c=b.closest('.tcard');
    if(c&&cardLocked(c)){e.preventDefault();e.stopImmediatePropagation();say('Included with the full plan',MSG_FULL);}
  },true);
  document.addEventListener('dragstart',function(e){
    if(!L.active)return;
    var c=e.target.closest&&e.target.closest('.tcard');
    if(c&&cardLocked(c)){e.preventDefault();e.stopPropagation();}
  },true);

  if(/[?&]trialtest=1/.test(location.search)){
    L.active=true;setTimeout(sweep,1500);setTimeout(sweep,4000);
  }else{
    var n=0,iv=setInterval(function(){
      n++;var sb=window.emadeckSB;
      if(!sb){if(n>40)clearInterval(iv);return;}
      clearInterval(iv);
      sb.auth.getSession().then(function(r){
        var s=r.data&&r.data.session;if(!s)return;
        return sb.from('profiles').select('role,plan_status').eq('id',s.user.id).maybeSingle().then(function(q){
          var p=q.data;if(!p)return;
          if(FULL_ROLES.indexOf(p.role)>-1)return;
          if(p.plan_status==='trialing'){L.active=true;sweep();}
        });
      }).catch(function(){});
    },250);
  }

  /* ---- filigrane repete (ecran d'edition, miniatures, export) ---- */
  function tile(d){
    var inner=d.createElement('div');
    inner.setAttribute('style','position:absolute;left:-60%;top:-60%;width:220%;height:220%;display:flex;flex-wrap:wrap;align-content:flex-start;transform:rotate(-25deg)');
    var sp='<span style="flex:0 0 340px;height:150px;display:flex;align-items:center;justify-content:center;font:700 26px Arial,Helvetica,sans-serif;letter-spacing:2px;color:rgba(120,120,120,.30);white-space:nowrap">EMADECK FREE TRIAL</span>',h='';
    for(var k=0;k<250;k++)h+=sp;
    inner.innerHTML=h;
    return inner;
  }
  function wmDoc(d){
    try{
      if(!L.active||!d||!d.body||d.getElementById('jdWm'))return;
      var w=d.createElement('div');w.id='jdWm';
      w.setAttribute('style','position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483647;pointer-events:none;overflow:hidden');
      w.appendChild(tile(d));
      d.body.appendChild(w);
    }catch(e){}
  }
  L.mark=function(f){wmDoc(f.contentDocument)};
  function wmTop(){
    if(!L.active||document.getElementById('jdWmTop'))return;
    var s=document.createElement('style');
    s.textContent='#jdWmTop{display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:8000;pointer-events:none;overflow:hidden}body.editing #jdWmTop{display:block}@media print{#jdWmTop{display:none!important}}';
    document.head.appendChild(s);
    var w=document.createElement('div');w.id='jdWmTop';
    w.appendChild(tile(document));
    document.body.appendChild(w);
  }
  function hook(f){
    if(f.getAttribute('data-jdw'))return;
    f.setAttribute('data-jdw','1');
    f.addEventListener('load',function(){wmDoc(f.contentDocument)});
    try{var d=f.contentDocument;if(d&&d.readyState==='complete'&&d.body&&d.body.children.length)wmDoc(d);}catch(e){}
  }
  function wmAll(){
    if(!L.active)return;
    wmTop();
    [].forEach.call(document.querySelectorAll('#strip .thumb iframe,#printRoot iframe'),hook);
  }
  setInterval(wmAll,1000);

  /* ---- images de coloriage : 10 gratuites (les 10 premieres de 001a) ---- */
  function imgFree(src){
    var m=(src||'').match(/library\/(?:thumb|full)\/[^\/]+\/(\d{3}[a-z])-(\d{4})\./);
    if(!m)return true;
    return m[1]==='001a'&&parseInt(m[2],10)<=10;
  }
  function imgLocked(code,idx){return !(code==='001a'&&idx<10)}
  L.imgLocked=imgLocked;
  function cardLocked(c){
    var di=c.getAttribute('data-img');
    if(di){var a=di.split(':');return imgLocked(a[0],parseInt(a[1],10));}
    return locked(codeOf(c));
  }
  var IMG_MSG='This illustration is available with the full plan, which starts automatically when your trial ends.';
  function editorHook(){
    if(!L.active)return;
    [].forEach.call(document.querySelectorAll('iframe'),function(f){
      if(f.closest('#strip')||f.closest('#printRoot'))return;
      try{
        var d=f.contentDocument;if(!d||!d.body)return;
        if(!d.__jdl){
          d.__jdl=1;
          var pick=function(e){
            var t=e.target;if(!t)return null;
            var im=t.tagName==='IMG'?t:(t.querySelectorAll&&t.querySelectorAll('img').length===1?t.querySelector('img'):null);
            var src=im?(im.getAttribute('src')||''):'';
            return im&&/library\/(thumb|full)\//.test(src)&&!imgFree(src)?im:null;
          };
          d.addEventListener('click',function(e){
            if(!L.active)return;
            if(pick(e)){e.preventDefault();e.stopImmediatePropagation();L.say('Included with the full plan',IMG_MSG);}
          },true);
          d.addEventListener('dragstart',function(e){
            if(!L.active)return;
            if(pick(e)){e.preventDefault();e.stopPropagation();}
          },true);
        }
        [].forEach.call(d.querySelectorAll('img[src*="library/thumb/"]'),function(im){
          if(im.getAttribute('data-jdl'))return;
          im.setAttribute('data-jdl','1');
          if(!imgFree(im.getAttribute('src')))im.style.opacity='.35';
        });
      }catch(e){}
    });
  }
  setInterval(editorHook,1000);
})();
