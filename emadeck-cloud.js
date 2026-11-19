/* Emadeck - sauvegarde cloud des projets (table Supabase public.projects) */
(function(){
  var PKEY='emadeck_projects', CKEY='emadeck_current', KEY='joydeckbuilder_project', OWN='emadeck_owner', SYN='emadeck_synced';
  function ls(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function ss(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function jp(s,d){ try{ var v=JSON.parse(s); return v==null?d:v; }catch(e){ return d; } }
  function hash(s){ var h=5381,i=s.length; while(i){ h=(h*33)^s.charCodeAt(--i); } return (h>>>0)+':'+s.length; }

  function sessionUid(){
    try{
      for(var i=0;i<localStorage.length;i++){
        var k=localStorage.key(i);
        if(/^sb-.*-auth-token$/.test(k)){
          var j=JSON.parse(localStorage.getItem(k)), s=j&&(j.currentSession||j);
          if(s&&s.user&&s.user.id) return s.user.id;
        }
      }
    }catch(e){}
    return null;
  }

  /* 1. jamais de melange entre deux comptes sur le meme navigateur */
  var u0=sessionUid();
  if(u0){
    var owner=ls(OWN);
    if(owner && owner!==u0){
      var del=[];
      for(var i=0;i<localStorage.length;i++){
        var k=localStorage.key(i);
        if(k===KEY||k===PKEY||k===CKEY||k===SYN||k.indexOf('joydeck_')===0) del.push(k);
      }
      del.forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
      ss(OWN,u0); location.reload(); return;
    }
    if(!owner) ss(OWN,u0);
  }

  var sb=null, uid=null, busy=false, last={};
  function synced(){ return jp(ls(SYN),[]); }
  function mark(pid){ var a=synced(); if(a.indexOf(pid)<0){ a.push(pid); ss(SYN,JSON.stringify(a)); } }
  function unmark(pid){ ss(SYN,JSON.stringify(synced().filter(function(x){ return x!==pid; }))); }
  function index(){
    var m={};
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(k.indexOf('joydeck_')!==0) continue;
      var at=k.lastIndexOf('@'); if(at<0) continue;
      var id=k.slice(at+1); (m[id]=m[id]||[]).push(k);
    }
    return m;
  }
  function bundle(pr,idx){
    var keys=[], st={};
    (pr.pages||[]).forEach(function(p){ (idx[p.id]||[]).forEach(function(k){ keys.push(k); }); });
    keys.sort().forEach(function(k){ st[k]=ls(k); });
    return {project:pr, states:st};
  }
  function sig(b){
    var s={}; Object.keys(b.states||{}).sort().forEach(function(k){ s[k]=b.states[k]; });
    return hash(JSON.stringify({t:b.project.title,p:b.project.pages,s:s}));
  }

  function push(){
    if(!sb||!uid||busy) return Promise.resolve();
    busy=true;
    var all=jp(ls(PKEY),{}), idx=index(), chain=Promise.resolve();
    Object.keys(all).forEach(function(pid){
      var pr=all[pid]; if(!pr||!pr.pages||!pr.pages.length) return;
      chain=chain.then(function(){
        var b=bundle(pr,idx), h=sig(b); if(last[pid]===h) return;
        var s=JSON.stringify(b);
        if(s.length>8000000){ console.warn('Emadeck: projet trop lourd pour la sauvegarde cloud', pid); return; }
        return sb.from('projects').upsert({user_id:uid,pid:pid,title:pr.title||'',data:b,updated_at:pr.updated||Date.now()},{onConflict:'user_id,pid'})
          .then(function(r){ if(!r.error){ last[pid]=h; mark(pid); } else console.warn('Emadeck cloud:', r.error.message); });
      });
    });
    synced().forEach(function(pid){
      if(all[pid]) return;
      chain=chain.then(function(){
        return sb.from('projects').delete().eq('user_id',uid).eq('pid',pid).then(function(r){ if(!r.error){ unmark(pid); delete last[pid]; } });
      });
    });
    return chain.catch(function(){}).then(function(){ busy=false; });
  }

  function flush(){
    return new Promise(function(res){
      var t=0;
      (function w(){ if(!busy||t>30) return push().then(res,res); t++; setTimeout(w,100); })();
    });
  }

  function pull(){
    return sb.from('projects').select('pid,data,updated_at').eq('user_id',uid).then(function(r){
      if(r.error||!r.data) return;
      var all=jp(ls(PKEY),{}), syn=synced(), changed=false;
      r.data.forEach(function(row){
        var d=row.data||{}, pr=d.project; if(!pr) return;
        var loc=all[row.pid];
        if(!loc && syn.indexOf(row.pid)>-1) return;
        if(loc && (loc.updated||0)>=row.updated_at) return;
        all[row.pid]=pr;
        Object.keys(d.states||{}).forEach(function(k){ if(d.states[k]!==null) ss(k,d.states[k]); });
        last[row.pid]=sig({project:pr,states:d.states||{}});
        mark(row.pid); changed=true;
      });
      if(changed) ss(PKEY,JSON.stringify(all));
    });
  }

  function start(){
    var tries=0, iv=setInterval(function(){
      if(window.emadeckSB){
        clearInterval(iv); sb=window.emadeckSB;
        sb.auth.getSession().then(function(r){
          var s=r.data&&r.data.session; if(!s) return;
          uid=s.user.id;
          if(ls(OWN)&&ls(OWN)!==uid) return;
          ss(OWN,uid);
          return pull().then(function(){ push(); setInterval(function(){ if(!document.hidden) push(); },8000); });
        }).catch(function(){});
      } else if(++tries>50) clearInterval(iv);
    },200);
  }
  start();

  document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden') push(); });
  window.addEventListener('pagehide',function(){ push(); });
  document.addEventListener('click',function(e){
    if(e.target.closest&&e.target.closest('#jdSaveBtn')) setTimeout(push,900);
  },true);

  /* deconnexion : on envoie d'abord les dernieres modifications */
  var passing=false;
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('#jdLogout');
    if(!b||passing||!uid) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var done=false;
    function go(){ if(done) return; done=true; passing=true; b.click(); }
    flush().then(go,go); setTimeout(go,4000);
  },true);

  window.EMADECK_CLOUD={push:flush,pull:function(){ return sb&&uid?pull():Promise.resolve(); }};
})();
