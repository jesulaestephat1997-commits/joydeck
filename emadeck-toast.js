(function(){
  var css = '#jdmAdd{position:fixed;left:50%;bottom:104px;transform:translate(-50%,14px);z-index:4000;display:flex;align-items:center;gap:10px;background:#16203d;color:#fff;font-size:14px;font-weight:600;padding:12px 18px;border-radius:14px;box-shadow:0 14px 34px rgba(10,16,40,.35);opacity:0;pointer-events:none;transition:opacity .22s,transform .22s;white-space:nowrap;max-width:calc(100vw - 32px)}' +
    '#jdmAdd.on{opacity:1;transform:translate(-50%,0)}' +
    '#jdmAdd i{display:inline-block;width:18px;height:18px;border-radius:50%;background:#2fbf71;position:relative;flex:none}' +
    '#jdmAdd i:after{content:"";position:absolute;left:6px;top:3px;width:4px;height:8px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}' +
    '@media(min-width:821px){#jdmAdd{bottom:28px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var t = document.createElement('div'); t.id = 'jdmAdd';
  t.innerHTML = '<i></i><span></span>';
  document.body.appendChild(t);
  var msg = t.querySelector('span'), tm;
  function show(n){
    msg.textContent = 'Page added to My book (' + n + ')';
    t.classList.add('on'); clearTimeout(tm);
    tm = setTimeout(function(){ t.classList.remove('on'); }, 1800);
  }

  function count(){ return document.querySelectorAll('#strip .pcard').length; }
  setTimeout(function(){
    var strip = document.getElementById('strip'); if (!strip) return;
    var prev = count();
    new MutationObserver(function(){
      var n = count();
      if (n === prev + 1) show(n);
      prev = n;
    }).observe(strip, {childList:true, subtree:true});
  }, 1500);
})();
