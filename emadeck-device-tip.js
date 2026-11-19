(function(){
  var KEY='emadeck_device_tip';
  function seen(){try{return localStorage.getItem(KEY)==='1'}catch(e){return false}}
  function mark(){try{localStorage.setItem(KEY,'1')}catch(e){}}
  if(!window.matchMedia('screen and (max-width:640px)').matches||seen())return;
  var st=document.createElement('style');
  st.textContent='#jdTip{position:fixed;inset:0;z-index:9000;background:rgba(11,27,77,.45);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Arial,Helvetica,sans-serif}'
  +'#jdTip .c{background:#fff;border-radius:16px;max-width:340px;width:100%;padding:24px;box-shadow:0 20px 50px rgba(11,27,77,.25)}'
  +'#jdTip h3{margin:0 0 8px;font-size:18px;color:#0B1B4D}'
  +'#jdTip p{margin:0 0 18px;font-size:14px;line-height:1.55;color:#5C6684}'
  +'#jdTip button{width:100%;border:0;border-radius:12px;background:#1F4FD8;color:#fff;font-size:15px;font-weight:700;padding:13px;cursor:pointer}';
  document.head.appendChild(st);
  function show(){
    if(document.getElementById('jdTip'))return;
    var d=document.createElement('div');d.id='jdTip';
    d.innerHTML='<div class="c"><h3>Best on a larger screen</h3><p>Emadeck is designed for a computer or a tablet. For the best experience when building your pages, open it on one of them. You can also continue on your phone.</p><button type="button">Continue on phone</button></div>';
    d.querySelector('button').onclick=function(){mark();d.remove()};
    document.body.appendChild(d);
  }
  var n=0,t=setInterval(function(){
    n++;
    if(!document.getElementById('jdGateHide')){clearInterval(t);setTimeout(show,600)}
    else if(n>40)clearInterval(t);
  },250);
})();
