/* Emadeck - acces au builder : reserve aux comptes avec un role (admin, tester, member) ou un abonnement actif. */
(function(){
  var OK_ROLES = ['admin', 'tester', 'member'], OK_PLAN = ['active', 'trialing'];
  var ov = document.createElement('div'); ov.id = 'jdGate';
  var st = document.createElement('style');
  st.textContent = '#jdGate{position:fixed;inset:0;z-index:2147483000;background:#fff;display:flex;align-items:center;justify-content:center;padding:24px;font:400 16px/1.6 "Plus Jakarta Sans",system-ui,sans-serif;color:#141B34}' +
    '#jdGate .bx{max-width:480px;text-align:center}#jdGate .lg{font:800 26px/1 "Plus Jakarta Sans",system-ui,sans-serif;letter-spacing:-.03em;color:#0B1B4D;margin-bottom:34px}#jdGate .lg b{color:#1F4FD8}' +
    '#jdGate h1{font:800 32px/1.15 "Plus Jakarta Sans",system-ui,sans-serif;letter-spacing:-.03em;color:#0B1B4D;margin:0 0 12px}#jdGate p{color:#5C6684;margin:0 0 26px;font-size:17px}' +
    '#jdGate .b{display:inline-flex;align-items:center;justify-content:center;height:52px;padding:0 28px;border-radius:14px;background:#1F4FD8;color:#fff;font:700 16px "Plus Jakarta Sans",system-ui,sans-serif;text-decoration:none;border:0;cursor:pointer;transition:.2s}' +
    '#jdGate .b:hover{background:#0B1B4D}#jdGate .g{background:#fff;color:#0B1B4D;border:1.5px solid #D5DCEE;margin-left:10px}#jdGate .g:hover{background:#EEF3FF;color:#1F4FD8;border-color:#1F4FD8}' +
    '#jdGate .sp{width:34px;height:34px;border-radius:50%;border:3px solid #DCE7FF;border-top-color:#1F4FD8;margin:0 auto;animation:jdsp .8s linear infinite}@keyframes jdsp{to{transform:rotate(360deg)}}';
  document.head.appendChild(st);
  var LOGO = '<div class="lg">Ema<b>deck.</b></div>';
  function show(html){ ov.innerHTML = '<div class="bx">' + LOGO + html + '</div>'; if (!ov.parentNode) document.body.appendChild(ov); }
  function loading(){ show('<div class="sp"></div>'); }
  function out(){ var A = window.EMADECK_AUTH; (A && A.signOut ? A.signOut() : Promise.resolve()).then(function(){ location.href = 'index.html'; }, function(){ location.href = 'index.html'; }); }
  function paywall(){
    show('<h1>Unlock the Emadeck library</h1><p>Choose a plan to start designing your ebooks and digital products with every template and feature.</p><a class="b" href="pricing.html#plans">See plans</a><button class="g b" type="button" id="jdGOut">Log out</button>');
    document.getElementById('jdGOut').addEventListener('click', out);
  }
  function fail(){
    show('<h1>We could not check your access</h1><p>Please check your connection and try again.</p><button class="b" type="button" id="jdGRe">Try again</button>');
    document.getElementById('jdGRe').addEventListener('click', function(){ location.reload(); });
  }
  function allow(){ if (ov.parentNode) ov.parentNode.removeChild(ov); }
  function run(){
    loading();
    var sb = window.emadeckSB; if (!sb) return fail();
    sb.auth.getSession().then(function(r){
      var s = r.data && r.data.session;
      if (!s){ location.replace('login.html'); return; }
      return sb.from('profiles').select('role,plan_status').eq('id', s.user.id).maybeSingle().then(function(q){
        if (q.error) return fail();
        var p = q.data;
        if (p && (OK_ROLES.indexOf(p.role) > -1 || OK_PLAN.indexOf(p.plan_status) > -1)) allow(); else paywall();
      });
    }).catch(fail);
  }
  if (document.body) run(); else document.addEventListener('DOMContentLoaded', run);
})();
