/* Emadeck - boutons de paiement (Polar via emadeck-api) */
(function(){
  var API = 'https://emadeck-api.onrender.com';
  var btns = document.querySelectorAll('[data-plan]');
  if (!btns.length) return;
  try { fetch(API + '/health').catch(function(){}); } catch (e) {}
  function note(btn, text){
    var n = btn.parentNode.querySelector('.pay-note');
    if (!n){ n = document.createElement('p'); n.className = 'fine pay-note'; n.style.marginTop = '10px'; btn.parentNode.appendChild(n); }
    n.textContent = text || '';
  }
  function start(plan, btn){
    var sb = window.emadeckSB;
    if (!sb){ note(btn, 'Something went wrong. Please reload the page.'); return; }
    var label = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', label);
    function reset(msg){ btn.textContent = label; btn.style.pointerEvents = ''; note(btn, msg); }
    btn.textContent = 'Please wait...'; btn.style.pointerEvents = 'none'; note(btn, '');
    sb.auth.getSession().then(function(r){
      var s = r.data && r.data.session;
      if (!s){ location.href = 'signup.html'; return; }
      return fetch(API + '/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + s.access_token },
        body: JSON.stringify({ plan: plan })
      }).then(function(res){ return res.json().then(function(d){ return { ok: res.ok, d: d }; }); })
        .then(function(x){
          if (x.ok && x.d && x.d.url){ location.href = x.d.url; return; }
          reset('We could not open the payment page. Please try again.');
        });
    }).catch(function(){ reset('Connection problem. Please try again.'); });
  }
  Array.prototype.forEach.call(btns, function(b){
    b.addEventListener('click', function(e){ e.preventDefault(); start(b.getAttribute('data-plan'), b); });
  });
})();
