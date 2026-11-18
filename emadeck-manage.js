/* Emadeck - bouton Manage subscription (portail Polar via emadeck-api) */
(function(){
  var API = 'https://emadeck-api.onrender.com';
  function add(){
    var lo = document.getElementById('jdLogout');
    if (!lo || document.getElementById('jdManage')) return !!document.getElementById('jdManage');
    var st = document.createElement('style');
    st.textContent = '#jdManage{height:46px;padding:0 20px;border:1px solid rgba(255,255,255,.35);border-radius:12px;background:transparent;color:#fff;font:700 15px "Plus JakartaSans",system-ui,sans-serif;cursor:pointer;white-space:nowrap;transition:.2s;margin-left:10px}#jdManage:hover{background:rgba(255,255,255,.12);border-color:#fff}@media print{#jdManage{display:none}}';
    document.head.appendChild(st);
    var b = document.createElement('button');
    b.type = 'button'; b.id = 'jdManage'; b.textContent = 'Manage subscription';
    b.addEventListener('click', function(){
      var sb = window.emadeckSB; if (!sb) return;
      function fail(){ b.textContent = 'No subscription found'; b.disabled = false; setTimeout(function(){ b.textContent = 'Manage subscription'; }, 3000); }
      b.textContent = 'Please wait...'; b.disabled = true;
      sb.auth.getSession().then(function(r){
        var s = r.data && r.data.session;
        if (!s){ fail(); return; }
        return fetch(API + '/portal', { method: 'POST', headers: { 'Authorization': 'Bearer ' + s.access_token } })
          .then(function(res){ return res.json().then(function(d){ return { ok: res.ok, d: d }; }); })
          .then(function(x){ if (x.ok && x.d && x.d.url){ location.href = x.d.url; } else { fail(); } });
      }).catch(fail);
    });
    lo.parentNode.insertBefore(b, lo);
    return true;
  }
  if (add()) return;
  var n = 0, t = setInterval(function(){ if (add() || ++n > 40) clearInterval(t); }, 500);
})();
