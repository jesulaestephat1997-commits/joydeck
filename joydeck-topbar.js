/* Emadeck - barre du haut plus fine + icone Accueil (remplace le bouton flottant) */
(function(){
'use strict';
var css=[
 '#emadeck-back{display:none!important}',
 '#jdHome{display:inline-flex;align-items:center;justify-content:center;flex:none;width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06);color:#fff;text-decoration:none;transition:background .2s,border-color .2s}',
 '#jdHome:hover{background:rgba(255,255,255,.16);border-color:rgba(255,255,255,.5)}',
 '#jdHome svg{width:16px;height:16px}',
 '@media(min-width:821px){',
 'html,body{overflow:hidden!important}',
 'body header.top{height:56px!important;padding:0 20px!important;gap:10px!important}',
 'body header.top .logo{font-size:21px!important}',
 'body header.top #title{font-size:14px!important;padding:6px 10px!important;border-radius:8px!important}',
 'body header.top .count{font-size:11.5px!important;padding:4px 10px!important}',
 'body header.top .btn,body header.top button{padding:6px 13px!important;font-size:12.5px!important;font-weight:600!important;border-radius:8px!important;line-height:1.35!important}',
 'body header.top .btn svg{width:13px!important;height:13px!important}',
 'body header.top .btn.primary{box-shadow:none!important}',
 'body header.top .btn.primary:hover{transform:none!important;box-shadow:none!important}',
 '#projPanel{top:58px!important}',
 '}',
 '@media(max-width:820px){#jdHome{display:none!important}}',
 '@media print{#jdHome{display:none}}'
].join('\n');
var st=document.createElement('style');st.id='jd-topbar-style';st.textContent=css;document.head.appendChild(st);
function mount(){
  var top=document.querySelector('header.top');if(!top)return false;
  if(document.getElementById('jdHome'))return true;
  var anchor=document.getElementById('jdSaveBtn')||document.getElementById('projBtn')||document.getElementById('resetBtn');if(!anchor)return false;
  var a=document.createElement('a');a.id='jdHome';a.href='index.html';a.title='Accueil';a.setAttribute('aria-label','Accueil');
  a.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7.2 8 2l6 5.2"/><path d="M3.5 6.4V13a1 1 0 0 0 1 1H6.5v-3.6h3V14h2a1 1 0 0 0 1-1V6.4"/></svg>';
  anchor.parentNode.insertBefore(a,anchor);return true;
}
var n=0,iv=setInterval(function(){
  var s=document.getElementById('jdSaveBtn');
  if((s||n>25)&&mount()){clearInterval(iv)}else if(++n>80){clearInterval(iv)}
},120);
})();

/* logo cliquable -> accueil */
(function(){
  if(window.__jdLogoHome)return;window.__jdLogoHome=1;
  var st=document.createElement('style');st.textContent='header.top .logo,.top .logo{cursor:pointer}';document.head.appendChild(st);
  document.addEventListener('click',function(e){var l=e.target.closest&&e.target.closest('.logo');if(l&&l.closest('header,.top'))location.href='index.html'});
})();
