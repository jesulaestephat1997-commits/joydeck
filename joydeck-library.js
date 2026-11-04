/* Emadeck - nouvelle bibliotheque : choix du produit, puis des parties, puis les modeles a glisser.
   Ne touche ni a la barre de personnalisation ni aux pages. Langue : changer LANG ('en' ou 'fr'). */
(function(){
  'use strict';
  if (window.__jdLib) return; window.__jdLib = 1;
  var LANG = 'en';
  var TX = {
    en:{lib:'Library',ask:'What do you want to create?',sub:'Pick a product, open a part, then drag templates into your book.',all:'All products',soon:'Coming soon',
        soonMsg:'We are preparing these templates. They will appear here very soon.',add:'+ Add',tpl:function(n){return n+' template'+(n>1?'s':'')},part:function(n){return n+' part'+(n>1?'s':'')},
        hintDrag:'Drag a template into your book, or press Add.',
        prod:{ebook:'Ebook',coloring:'Coloring pages',quotes:'Quotes',agenda:'Agenda',mockups:'Mockups',labels:'Labels',cv:'Curriculum vitae',wedding:'Wedding cards'},
        parts:{CV:'Covers',SM:'Table of contents',CH:'Chapters',PG:'Content pages',CT:'Quote pages',FN:'Closing pages',OTHER:'More pages'}},
    fr:{lib:'Bibliotheque',ask:'Que veux-tu creer ?',sub:'Choisis un produit, ouvre une partie, puis glisse les modeles dans ton livre.',all:'Tous les produits',soon:'Bientot',
        soonMsg:'Nous preparons ces modeles. Ils apparaitront ici tres bientot.',add:'+ Ajouter',tpl:function(n){return n+' modele'+(n>1?'s':'')},part:function(n){return n+' partie'+(n>1?'s':'')},
        hintDrag:'Glisse un modele dans ton livre, ou clique sur Ajouter.',
        prod:{ebook:'Ebook',coloring:'Pages a colorier',quotes:'Citations',agenda:'Agenda',mockups:'Mockups',labels:'Etiquettes',cv:'Curriculum vitae',wedding:'Cartes de mariage'},
        parts:{CV:'Couvertures',SM:'Tables des matieres',CH:'Chapitres',PG:'Pages de contenu',CT:'Pages de citation',FN:'Pages de fin',OTHER:'Autres pages'}}
  };
  var T = TX[LANG] || TX.en;
  var ORDER = ['CV','SM','CH','PG','CT','FN'];
  var PART_ILL = {CV:'ebook',SM:'toc',CH:'chap',PG:'page',CT:'quote',FN:'end',OTHER:'page'};
  var PART_PAL = {CV:['#0B1B4D','#1F4FD8','#C9D8FA','#E3ECFF'],SM:['#5B3A1E','#E0A85A','#F3DDB4','#FFF0D6'],CH:['#7A2E1D','#E58F65','#F6D9C8','#FBE6DC'],
                  PG:['#0E4F57','#2AA6B0','#BFE3E6','#DFF1EE'],CT:['#3C2A6B','#B79CF0','#E4D8F8','#EDE7F8'],FN:['#7D1F3F','#E0678C','#F6C7D5','#FDE8EE'],OTHER:['#0B1B4D','#1F4FD8','#C9D8FA','#E3ECFF']};
  var PRODUCTS = [
    {id:'ebook',ill:'ebook',vb:'0 0 120 160',p:['#0B1B4D','#1F4FD8','#C9D8FA','#E3ECFF'],live:true},
    {id:'coloring',ill:'color',vb:'0 0 120 160',p:['#5B3A1E','#E0A85A','#F3DDB4','#FFF0D6'],live:true},
    {id:'quotes',ill:'quote',vb:'0 0 120 120',p:['#3C2A6B','#B79CF0','#E4D8F8','#EDE7F8'],live:true},
    {id:'agenda',ill:'plan',vb:'0 0 120 160',p:['#7A2E1D','#E58F65','#F6D9C8','#FBE6DC'],live:true},
    {id:'mockups',ill:'mock',vb:'0 0 160 120',p:['#0B1B4D','#1F4FD8','#C9D8FA','#E4EEF8']},
    {id:'labels',ill:'label',vb:'0 0 160 110',p:['#0E4F57','#2AA6B0','#BFE3E6','#DFF1EE']},
    {id:'cv',ill:'cv',vb:'0 0 120 160',p:['#1E3A34','#2FB574','#CDEBDD','#E9F5EE'],live:true},
    {id:'wedding',ill:'wed',vb:'0 0 120 160',p:['#7D1F3F','#E0678C','#F6C7D5','#FDE8EE'],live:true}
  ];

  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true">'+
  '<symbol id="jl-ebook" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect width="120" height="74" class="jl-pa"/><rect x="14" y="22" width="68" height="9" rx="2" class="jl-pp"/><rect x="14" y="38" width="44" height="9" rx="2" class="jl-pp"/><circle cx="92" cy="108" r="17" class="jl-pb"/><rect x="14" y="100" width="52" height="4" rx="2" class="jl-pc"/><rect x="14" y="110" width="42" height="4" rx="2" class="jl-pc"/><rect x="14" y="120" width="48" height="4" rx="2" class="jl-pc"/><rect x="14" y="140" width="32" height="7" rx="3.5" class="jl-pb"/></symbol>'+
  '<symbol id="jl-plan" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect width="120" height="28" class="jl-pa"/><rect x="12" y="10" width="44" height="8" rx="2" class="jl-pp"/><g class="jl-pc"><rect x="10" y="40" width="32" height="24" rx="3"/><rect x="44" y="40" width="32" height="24" rx="3"/><rect x="78" y="40" width="32" height="24" rx="3"/><rect x="10" y="68" width="32" height="24" rx="3"/><rect x="78" y="68" width="32" height="24" rx="3"/><rect x="10" y="96" width="32" height="24" rx="3"/><rect x="44" y="96" width="32" height="24" rx="3"/><rect x="10" y="124" width="32" height="24" rx="3"/><rect x="44" y="124" width="32" height="24" rx="3"/><rect x="78" y="124" width="32" height="24" rx="3"/></g><rect x="44" y="68" width="32" height="24" rx="3" class="jl-pb"/><rect x="78" y="96" width="32" height="24" rx="3" class="jl-pb"/></symbol>'+
  '<symbol id="jl-color" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><g class="jl-ps"><circle cx="60" cy="68" r="12"/><circle cx="60" cy="42" r="14"/><circle cx="60" cy="94" r="14"/><circle cx="37" cy="55" r="14"/><circle cx="83" cy="55" r="14"/><circle cx="37" cy="81" r="14"/><circle cx="83" cy="81" r="14"/><path d="M60 108v34M60 126c-14-2-22-10-24-20M60 134c12-2 20-8 24-18"/></g></symbol>'+
  '<symbol id="jl-label" viewBox="0 0 160 110"><rect width="160" height="110" rx="10" class="jl-pp"/><rect x="8" y="8" width="144" height="94" rx="6" fill="none" style="stroke:var(--b);stroke-width:2;stroke-dasharray:5 4"/><circle cx="38" cy="55" r="18" class="jl-pa"/><rect x="66" y="34" width="70" height="9" rx="2" class="jl-pa"/><rect x="66" y="52" width="54" height="5" rx="2.5" class="jl-pc"/><rect x="66" y="64" width="62" height="5" rx="2.5" class="jl-pc"/><rect x="66" y="80" width="30" height="8" rx="4" class="jl-pb"/></symbol>'+
  '<symbol id="jl-quote" viewBox="0 0 120 120"><rect width="120" height="120" rx="4" class="jl-pa"/><path class="jl-pb" d="M22 52q0-22 20-26l2 8q-9 3-9 12h9v22H22zM58 52q0-22 20-26l2 8q-9 3-9 12h9v22H58z"/><rect x="22" y="86" width="76" height="5" rx="2.5" class="jl-pp" opacity=".9"/><rect x="22" y="97" width="46" height="5" rx="2.5" class="jl-pp" opacity=".55"/></symbol>'+
  '<symbol id="jl-mock" viewBox="0 0 160 120"><rect x="4" y="106" width="152" height="8" rx="4" fill="#000" opacity=".08"/><rect x="48" y="6" width="64" height="104" rx="9" class="jl-pa"/><rect x="53" y="13" width="54" height="90" rx="4" class="jl-pp"/><rect x="53" y="13" width="54" height="40" class="jl-pb"/><rect x="59" y="62" width="34" height="5" rx="2.5" class="jl-pa"/><rect x="59" y="73" width="42" height="4" rx="2" class="jl-pc"/><rect x="59" y="82" width="38" height="4" rx="2" class="jl-pc"/><rect x="59" y="92" width="22" height="6" rx="3" class="jl-pb"/></symbol>'+
  '<symbol id="jl-cv" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect width="42" height="160" class="jl-pa"/><circle cx="21" cy="30" r="13" class="jl-pb"/><rect x="8" y="56" width="26" height="4" rx="2" class="jl-pp" opacity=".8"/><rect x="8" y="66" width="20" height="4" rx="2" class="jl-pp" opacity=".5"/><rect x="8" y="76" width="24" height="4" rx="2" class="jl-pp" opacity=".5"/><rect x="54" y="16" width="52" height="9" rx="2" class="jl-pa"/><rect x="54" y="30" width="34" height="5" rx="2.5" class="jl-pb"/><rect x="54" y="52" width="40" height="5" rx="2.5" class="jl-pb"/><rect x="54" y="63" width="52" height="4" rx="2" class="jl-pc"/><rect x="54" y="72" width="46" height="4" rx="2" class="jl-pc"/><rect x="54" y="92" width="40" height="5" rx="2.5" class="jl-pb"/><rect x="54" y="103" width="52" height="4" rx="2" class="jl-pc"/><rect x="54" y="112" width="44" height="4" rx="2" class="jl-pc"/></symbol>'+
  '<symbol id="jl-wed" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect x="8" y="8" width="104" height="144" rx="3" fill="none" style="stroke:var(--b);stroke-width:1.6"/><rect x="13" y="13" width="94" height="134" rx="2" fill="none" style="stroke:var(--c);stroke-width:1"/><circle cx="50" cy="52" r="13" fill="none" style="stroke:var(--a);stroke-width:2.4"/><circle cx="70" cy="52" r="13" fill="none" style="stroke:var(--b);stroke-width:2.4"/><rect x="34" y="84" width="52" height="7" rx="2" class="jl-pa"/><rect x="42" y="98" width="36" height="4" rx="2" class="jl-pb"/><rect x="38" y="110" width="44" height="4" rx="2" class="jl-pc"/><rect x="46" y="122" width="28" height="4" rx="2" class="jl-pc"/></symbol>'+
  '<symbol id="jl-toc" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect x="14" y="16" width="58" height="10" rx="2" class="jl-pa"/><g class="jl-pc"><rect x="14" y="46" width="70" height="5" rx="2.5"/><rect x="14" y="66" width="62" height="5" rx="2.5"/><rect x="14" y="86" width="74" height="5" rx="2.5"/><rect x="14" y="106" width="56" height="5" rx="2.5"/><rect x="14" y="126" width="66" height="5" rx="2.5"/></g><g class="jl-pb"><rect x="94" y="46" width="12" height="5" rx="2.5"/><rect x="94" y="66" width="12" height="5" rx="2.5"/><rect x="94" y="86" width="12" height="5" rx="2.5"/><rect x="94" y="106" width="12" height="5" rx="2.5"/><rect x="94" y="126" width="12" height="5" rx="2.5"/></g></symbol>'+
  '<symbol id="jl-chap" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect width="120" height="92" class="jl-pa"/><circle cx="60" cy="46" r="24" fill="none" style="stroke:var(--p,#fff);stroke-width:5"/><rect x="24" y="108" width="72" height="8" rx="2" class="jl-pa"/><rect x="24" y="124" width="52" height="5" rx="2.5" class="jl-pc"/><rect x="24" y="135" width="62" height="5" rx="2.5" class="jl-pc"/></symbol>'+
  '<symbol id="jl-page" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pp"/><rect x="14" y="14" width="54" height="9" rx="2" class="jl-pa"/><rect x="14" y="34" width="92" height="40" rx="3" class="jl-pb"/><g class="jl-pc"><rect x="14" y="86" width="44" height="4" rx="2"/><rect x="14" y="96" width="40" height="4" rx="2"/><rect x="14" y="106" width="44" height="4" rx="2"/><rect x="14" y="116" width="36" height="4" rx="2"/><rect x="62" y="86" width="44" height="4" rx="2"/><rect x="62" y="96" width="40" height="4" rx="2"/><rect x="62" y="106" width="44" height="4" rx="2"/><rect x="62" y="116" width="36" height="4" rx="2"/></g></symbol>'+
  '<symbol id="jl-end" viewBox="0 0 120 160"><rect width="120" height="160" rx="4" class="jl-pa"/><circle cx="60" cy="64" r="20" class="jl-pb"/><rect x="30" y="102" width="60" height="6" rx="3" class="jl-pp" opacity=".9"/><rect x="40" y="116" width="40" height="4" rx="2" class="jl-pp" opacity=".5"/></symbol>'+
  '</svg>';

  var CSS = [
  '#lib{padding:0!important;overflow-x:hidden}','#book{background:#fff!important}',
  '#lib>h2,#lib>p.hint,#libList{display:none!important}',
  '.jl-root{position:relative;padding:20px 16px 34px;min-height:100%}',
  '.jl-root::before{content:"";position:absolute;left:-40px;top:-60px;width:260px;height:220px;background:radial-gradient(closest-side,rgba(31,79,216,.13),transparent);pointer-events:none;animation:jlGlow 9s ease-in-out infinite}',
  '@keyframes jlGlow{50%{transform:translate(40px,18px) scale(1.15)}}',
  '.jl-eyebrow{position:relative;font-weight:700;font-size:11px;line-height:1;letter-spacing:.16em;text-transform:uppercase;color:var(--muted,#6b6f68);display:flex;align-items:center;gap:8px;margin-bottom:10px}',
  '.jl-eyebrow::before{content:"";width:22px;height:2px;background:var(--accent,#2f6b4f);transform-origin:left;animation:jlLine .9s .1s both}',
  '@keyframes jlLine{from{transform:scaleX(0)}}',
  '.jl-h1{position:relative;margin:0;font-size:23px;line-height:1.15;letter-spacing:-.02em;font-weight:800;color:var(--ink,#1f2a24)}',
  '.jl-sub{position:relative;margin:8px 0 18px;font-size:13px;line-height:1.45;color:var(--muted,#6b6f68)}',
  '.jl-view{display:none}',
  '.jl-view.on{display:block;animation:jlFwd .5s cubic-bezier(.2,.8,.2,1) both}',
  '.jl-view.on.bk{animation-name:jlBk}',
  '@keyframes jlFwd{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:none}}',
  '@keyframes jlBk{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:none}}',
  '@keyframes jlUp{from{opacity:0;transform:translateY(22px) scale(.96)}to{opacity:1;transform:none}}',
  '.jl-tiles{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
  '.jl-tile{position:relative;display:flex;flex-direction:column;border:0;padding:0;text-align:left;background:none;font:inherit;color:inherit;cursor:pointer;animation:jlUp .6s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*70ms + 120ms)}',
  '.jl-art{position:relative;height:132px;border-radius:16px;background:var(--bg);display:grid;place-items:center;overflow:hidden;transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s}',
  '.jl-art svg{height:76%;width:auto;max-width:78%;filter:drop-shadow(0 10px 10px rgba(11,27,77,.22));transition:transform .5s cubic-bezier(.2,.8,.2,1);animation:jlBob 5s ease-in-out infinite;animation-delay:calc(var(--i,0)*-.6s)}',
  '@keyframes jlBob{50%{transform:translateY(-4px) rotate(-1deg)}}',
  '.jl-tile:hover .jl-art{transform:translateY(-4px);box-shadow:0 18px 26px -16px rgba(11,27,77,.5)}',
  '.jl-tile:hover .jl-art svg{transform:scale(1.08) rotate(-2deg)}',
  '.jl-tile:focus-visible .jl-art,.jl-row:focus-visible{outline:3px solid var(--accent,#2f6b4f);outline-offset:2px}',
  '.jl-tile b{display:block;margin:9px 2px 0;font-size:14px;font-weight:700;color:var(--ink,#1f2a24)}',
  '.jl-tile small{display:block;margin:1px 2px 0;font-size:12px;color:var(--muted,#6b6f68)}',
  '.jl-badge{position:absolute;top:8px;right:8px;z-index:2;background:rgba(255,255,255,.92);color:#33406a;font-weight:700;font-size:10px;line-height:1;letter-spacing:.05em;text-transform:uppercase;padding:5px 8px;border-radius:999px}',
  '.jl-tile.soon .jl-art svg{opacity:.82}',
  '.jl-back{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line,#e5e2da);background:#fff;border-radius:999px;padding:7px 14px 7px 10px;font-weight:600;font-size:12.5px;line-height:1;font-family:inherit;color:var(--ink,#1f2a24);cursor:pointer;margin-bottom:14px;transition:.2s}',
  '.jl-back:hover{background:var(--ink,#1f2a24);color:#fff;border-color:var(--ink,#1f2a24)}',
  '.jl-back svg{width:14px;height:14px;transition:transform .2s}.jl-back:hover svg{transform:translateX(-3px)}',
  '.jl-rows{display:grid;gap:10px}',
  '.jl-row{display:flex;align-items:center;gap:14px;width:100%;border:1px solid var(--line,#e5e2da);background:#fff;border-radius:16px;padding:10px 14px 10px 10px;text-align:left;font:inherit;color:inherit;cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .25s;animation:jlUp .55s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*70ms + 100ms)}',
  '.jl-row:hover{transform:translateX(4px);border-color:var(--accent,#2f6b4f);box-shadow:0 14px 22px -16px rgba(11,27,77,.5)}',
  '.jl-ico{flex:none;width:58px;height:70px;border-radius:12px;background:var(--bg);display:grid;place-items:center}',
  '.jl-ico svg{height:80%;width:auto;filter:drop-shadow(0 5px 5px rgba(11,27,77,.22));transition:transform .4s}',
  '.jl-row:hover .jl-ico svg{transform:scale(1.1) rotate(-3deg)}',
  '.jl-row b{display:block;font-size:14.5px;font-weight:700;color:var(--ink,#1f2a24)}',
  '.jl-row small{display:block;font-size:12px;color:var(--muted,#6b6f68);margin-top:2px}',
  '.jl-row .chev{margin-left:auto;width:18px;height:18px;flex:none;stroke:var(--muted,#6b6f68);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transition:transform .25s}',
  '.jl-row:hover .chev{transform:translateX(4px);stroke:var(--accent,#2f6b4f)}',
  '.jl-view .tgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
  '.jl-view .tcard .thumb{width:132px;height:171px}.jl-view .tcard .thumb iframe{transform:scale(.1618)}',
  '.jl-view .tcard{border-radius:14px;background:#fff;padding:6px;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .3s;animation:jlUp .5s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*45ms)}',
  '.jl-view .tcard:hover{transform:translateY(-4px);box-shadow:0 16px 24px -16px rgba(11,27,77,.5)}',
  '.jl-view .tcard .add{border-radius:999px;padding:7px 0;font-size:12px;letter-spacing:.02em}',
  '.jl-empty{display:grid;place-items:center;text-align:center;padding:26px 10px 10px}',
  '.jl-empty .jl-art{width:150px;height:170px;margin-bottom:16px}',
  '.jl-empty p{margin:0;max-width:240px;font-size:13.5px;line-height:1.5;color:var(--muted,#6b6f68)}',
  '.jl-pp{fill:var(--p,#fff)}.jl-pa{fill:var(--a)}.jl-pb{fill:var(--b)}.jl-pc{fill:var(--c)}.jl-ps{fill:none;stroke:var(--a);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}',
  '@media(prefers-reduced-motion:reduce){.jl-root *,.jl-root::before{animation:none!important;transition:none!important}}'
  ].join('\n');

  var root = null, libList = null, aside = null, rebuilding = false;

  function pal(p){ return '--a:'+p[0]+';--b:'+p[1]+';--c:'+p[2]+';--bg:'+p[3]; }
  function ill(id, vb){ return '<svg viewBox="'+vb+'" aria-hidden="true"><use href="#jl-'+id+'"/></svg>'; }
  var CHEV = '<svg class="chev" viewBox="0 0 18 18"><path d="M7 3l6 6-6 6"/></svg>';
  var BACK = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2L4 7l5 5"/></svg>';

  function el(tag, cls, html){ var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function show(id, back){
    [].forEach.call(root.querySelectorAll('.jl-view'), function(v){ v.classList.remove('on','bk'); });
    var v = root.querySelector('[data-v="'+id+'"]'); if (!v) return;
    v.classList.add('on'); if (back) v.classList.add('bk');
    // relance les animations d'entree des enfants
    [].forEach.call(v.querySelectorAll('.jl-tile,.jl-row,.tcard'), function(c){ c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; });
    if (aside) aside.scrollTop = 0;
  }

  function head(view, eyebrow, title, sub){
    view.appendChild(el('div','jl-eyebrow',eyebrow));
    view.appendChild(el('h1','jl-h1',title));
    if (sub) view.appendChild(el('p','jl-sub',sub));
  }
  function backBtn(label, to){
    var b = el('button','jl-back',BACK+'<span>'+label+'</span>'); b.type = 'button';
    b.addEventListener('click', function(){ show(to, true); });
    return b;
  }

  function build(){
    if (rebuilding) return; rebuilding = true;
    try {
      var cards = [].slice.call(libList.querySelectorAll('.tcard'));
      if (!cards.length) return;
      var cbCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\s*CB-/.test(t.textContent); });
      var agCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\s*AG[A-Z]-/.test(t.textContent); });
      var wdCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\s*WD[A-Z]-/.test(t.textContent); });
      var cvCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\s*CV[A-Z]-/.test(t.textContent); });
      var qtCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\s*QT[A-Z]-/.test(t.textContent); });
      cards = cards.filter(function(c){ return qtCards.indexOf(c) < 0 && cbCards.indexOf(c) < 0 && agCards.indexOf(c) < 0 && wdCards.indexOf(c) < 0 && cvCards.indexOf(c) < 0; });
      if (root) root.remove();
      root = el('div','jl-root'); root.innerHTML = SPRITE;
      // regroupe les modeles par code (CV, SM, CH...)
      var groups = {}, order = [];
      cards.forEach(function(c){
        var tn = c.querySelector('.tn'), m = tn && /^\s*([A-Za-z]+)/.exec(tn.textContent), k = m ? m[1].toUpperCase() : 'OTHER';
        if (ORDER.indexOf(k) < 0) k = 'OTHER';
        (groups[k] = groups[k] || []).push(c);
        var a = c.querySelector('.add'); if (a) a.textContent = T.add;
      });
      ORDER.concat(['OTHER']).forEach(function(k){ if (groups[k]) order.push(k); });
      var total = cards.length;

      // ---- vue 1 : choix du produit
      var hub = el('div','jl-view'); hub.dataset.v = 'hub';
      head(hub, T.lib, T.ask, T.sub);
      var tiles = el('div','jl-tiles');
      PRODUCTS.forEach(function(p, i){
        var t = el('button','jl-tile'+(p.live?'':' soon'),
          '<span class="jl-art" style="'+pal(p.p)+'">'+(p.live?'':'<span class="jl-badge">'+T.soon+'</span>')+ill(p.ill,p.vb)+'</span>'+
          '<b>'+T.prod[p.id]+'</b><small>'+(p.id==='coloring'?'<span class="cb-count">Illustrations</span>':(p.id==='quotes'?T.tpl(qtCards.length):(p.id==='cv'?T.tpl(cvCards.length):(p.id==='wedding'?T.tpl(wdCards.length):(p.id==='agenda'?T.tpl(agCards.length):(p.live?T.tpl(total):T.soon))))))+'</small>');
        t.type = 'button'; t.style.setProperty('--i', i);
        t.addEventListener('click', function(){ show(p.id==='coloring' ? 'coloring' : (p.id==='quotes' ? 'quotes' : (p.id==='cv' ? 'cv' : (p.id==='wedding' ? 'wedding' : (p.id==='agenda' ? 'agenda' : (p.live ? 'ebook' : 'soon:'+p.id)))))); });
        tiles.appendChild(t);
      });
      hub.appendChild(tiles); root.appendChild(hub);

      // ---- vue 2 : parties de l'ebook
      var eb = el('div','jl-view'); eb.dataset.v = 'ebook';
      eb.appendChild(backBtn(T.all,'hub'));
      head(eb, T.prod.ebook, T.prod.ebook, T.hintDrag);
      var rows = el('div','jl-rows');
      order.forEach(function(k, i){
        var P = PART_PAL[k];
        var r = el('button','jl-row','<span class="jl-ico" style="'+pal(P)+'">'+ill(PART_ILL[k],'0 0 120 160')+'</span><span><b>'+T.parts[k]+'</b><small>'+T.tpl(groups[k].length)+'</small></span>'+CHEV);
        r.type = 'button'; r.style.setProperty('--i', i);
        r.addEventListener('click', function(){ show('part:'+k); });
        rows.appendChild(r);
      });
      eb.appendChild(rows); root.appendChild(eb);

      // ---- vue 3 : modeles d'une partie (on glisse)
      order.forEach(function(k){
        var v = el('div','jl-view'); v.dataset.v = 'part:'+k;
        v.appendChild(backBtn(T.prod.ebook,'ebook'));
        head(v, T.prod.ebook, T.parts[k], T.tpl(groups[k].length)+'\u00b7'+T.hintDrag);
        var g = el('div','tgrid');
        groups[k].forEach(function(c, i){ c.style.setProperty('--i', Math.min(i,12)); g.appendChild(c); });
        v.appendChild(g); root.appendChild(v);
      });

      // ---- vue "bientot" pour les autres produits
      PRODUCTS.forEach(function(p){
        if (p.live) return;
        var v = el('div','jl-view'); v.dataset.v = 'soon:'+p.id;
        v.appendChild(backBtn(T.all,'hub'));
        head(v, T.soon, T.prod[p.id], '');
        v.appendChild(el('div','jl-empty','<span class="jl-art" style="'+pal(p.p)+'">'+ill(p.ill,p.vb)+'</span><p>'+T.soonMsg+'</p>'));
        root.appendChild(v);
      });

      if (window.EmadeckColoring) { try { window.EmadeckColoring.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:cbCards}); } catch(e){ console.error(e); } }
      if (window.EmadeckPlanner) { try { window.EmadeckPlanner.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:agCards}); } catch(e){ console.error(e); } }
      if (window.EmadeckWedding) { try { window.EmadeckWedding.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:wdCards}); } catch(e){ console.error(e); } }
      if (window.EmadeckCV) { try { window.EmadeckCV.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:cvCards}); } catch(e){ console.error(e); } }
      if (window.EmadeckQuotes) { try { window.EmadeckQuotes.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:qtCards}); } catch(e){ console.error(e); } }
      aside.insertBefore(root, libList);
      show('hub');
    } finally { setTimeout(function(){ rebuilding = false; }, 50); }
  }

  function boot(){
    aside = document.getElementById('lib'); libList = document.getElementById('libList');
    if (!aside || !libList) return;
    if (!document.getElementById('jl-style')){ var s = document.createElement('style'); s.id = 'jl-style'; s.textContent = CSS; document.head.appendChild(s); }
    build();
    new MutationObserver(function(){ if (!rebuilding && libList.querySelector('.tcard')) build(); }).observe(libList, {childList:true, subtree:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
