/* Emadeck - etat de connexion : Log out dans le builder et dans le menu du site. */
(function(){
  var A = window.EMADECK_AUTH; if (!A || !A.session) return;
  function out(e){ e.preventDefault(); A.signOut().then(function(){ location.href = 'index.html'; }, function(){ location.href = 'index.html'; }); }
  function ui(){
    [].forEach.call(document.querySelectorAll('header a[href="login.html"],nav a[href="login.html"]'), function(a){ a.textContent = 'Log out'; a.setAttribute('href', '#'); a.addEventListener('click', out); });
    [].forEach.call(document.querySelectorAll('header a[href="signup.html"],nav a[href="signup.html"]'), function(a){ a.textContent = 'Open builder'; a.setAttribute('href', 'builder.html'); });
    var h = document.querySelector('header.top');
    if (h && document.getElementById('strip') && !document.getElementById('jdLogout')){
      var st = document.createElement('style');
      st.textContent = '#jdLogout{height:46px;padding:0 20px;border:1px solid rgba(255,255,255,.35);border-radius:12px;background:transparent;color:#fff;font:700 15px "Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer;white-space:nowrap;transition:.2s;margin-left:10px}#jdLogout:hover{background:rgba(255,255,255,.12);border-color:#fff}@media print{#jdLogout{display:none}}';
      document.head.appendChild(st);
      var b = document.createElement('button'); b.type = 'button'; b.id = 'jdLogout'; b.textContent = 'Log out';
      b.addEventListener('click', out); h.appendChild(b);
    }
  }
  A.session().then(function(s){ if (s) ui(); }, function(){});
})();
