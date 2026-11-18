(function(){
  var css = '#jdmBill{position:fixed;inset:0;z-index:5000;display:none;align-items:center;justify-content:center;background:rgba(15,20,40,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);padding:24px}' +
    '#jdmBill.on{display:flex}' +
    '#jdmBill .bx{background:#fff;border-radius:18px;padding:26px 24px;max-width:320px;width:100%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.25);font-family:inherit}' +
    '#jdmBill .sp{width:30px;height:30px;margin:0 auto 14px;border:3px solid #dfe5f3;border-top-color:#2b4bff;border-radius:50%;animation:jdmSp .8s linear infinite}' +
    '#jdmBill b{display:block;font-size:16px;color:#16203d;margin-bottom:6px}' +
    '#jdmBill small{display:block;font-size:13px;color:#6b7390;line-height:1.45}' +
    '#jdmBill button{margin-top:16px;border:0;border-radius:12px;background:#16203d;color:#fff;font-size:15px;padding:12px 22px;display:none}' +
    '#jdmBill.err .sp{display:none}#jdmBill.err button{display:inline-block}' +
    '@keyframes jdmSp{to{transform:rotate(360deg)}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ov = document.createElement('div'); ov.id = 'jdmBill';
  ov.innerHTML = '<div class="bx"><div class="sp"></div><b>Opening billing portal</b><small>This can take a few seconds. Please wait.</small><button type="button">Close</button></div>';
  document.body.appendChild(ov);
  var tt = ov.querySelector('b'), ss = ov.querySelector('small'), cb = ov.querySelector('button'), timer, obs;

  function hide(){ ov.classList.remove('on','err'); clearTimeout(timer); if (obs) obs.disconnect(); }
  function fail(msg){
    ov.classList.add('err'); tt.textContent = msg || 'No active subscription found';
    ss.textContent = 'If you just subscribed, wait a minute and try again. Otherwise contact support@emadeck.com.';
    clearTimeout(timer);
  }
  cb.addEventListener('click', hide);

  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('#jdManage');
    if (!b) return;
    ov.classList.remove('err'); tt.textContent = 'Opening billing portal';
    ss.textContent = 'This can take a few seconds. Please wait.';
    ov.classList.add('on');
    var sh = document.getElementById('jdmShade'); if (sh) sh.click();
    if (obs) obs.disconnect();
    obs = new MutationObserver(function(){
      if (/no subscription|not found|error|unavailable/i.test(b.textContent)) fail();
    });
    obs.observe(b, {childList:true, subtree:true, characterData:true});
    clearTimeout(timer);
    timer = setTimeout(function(){ fail('Could not open the portal'); }, 45000);
  }, true);
})();
