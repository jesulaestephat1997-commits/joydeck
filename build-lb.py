import re, glob, os
src = open('labels-models.js', encoding='utf-8').read()
ids = re.findall(r"^L\('(lb-[a-z0-9-]+)','([^']+)'", src, flags=re.M)
CATS = ['LBA', 'LBB', 'LBC', 'LBD', 'LBE']
SIZES = [10, 10, 10, 10, 10]
BOUND = [sum(SIZES[:i + 1]) for i in range(len(SIZES))]
assert len(ids) == BOUND[-1], len(ids)
TABLE = [(CATS[sum(1 for x in BOUND if k >= x)], m, n) for k, (m, n) in enumerate(ids)]
SHELL = open('AGC-01-cover-block.html', encoding='utf-8').read()
SHELL = SHELL.replace('cover-block', '__MODEL__').replace('<script src="planner-models.js"></script>', '<script src="labels-models.js"></script>')
SHELL = re.sub(r'<title>.*?</title>', '<title>__TITLE__</title>', SHELL)
for f in glob.glob('LB[A-E]-*.html'):
    os.remove(f)
rows = []; cnt = {}
for pre, mid, name in TABLE:
    cnt[pre] = cnt.get(pre, 0) + 1
    code = '%s-%02d' % (pre, cnt[pre])
    fn = '%s-%s.html' % (code, mid)
    open(fn, 'w', encoding='utf-8', newline='\n').write(SHELL.replace('__MODEL__', mid).replace('__TITLE__', 'Editor - ' + name))
    rows.append("      {id:'lb-%s%02d', code:'%s', file:'%s', old:'', name:%s}" % (pre[-1].lower(), cnt[pre], code, fn, repr(name)))
print('pages ecrites:', len(TABLE))
bp = 'builder.html'
s = open(bp, encoding='utf-8', newline='').read()
s = re.sub(r"    \{cat:'Label pages', items:\[.*?\]\},\r?\n", "", s, count=1, flags=re.S)
block = "    {cat:'Label pages', items:[\n" + ",\n".join(rows) + "]},\n"
s, k = re.subn(r"(const CATALOG = \[\r?\n)", lambda m: m.group(1) + block, s, count=1)
print('catalogue Labels:', k)
if 'joydeck-labels.js' not in s:
    s = s.replace('<script src="joydeck-mobile.js"></script>', '<script src="joydeck-labels.js"></script>\n<script src="joydeck-mobile.js"></script>', 1)
open(bp, 'w', encoding='utf-8', newline='').write(s)

lp = 'joydeck-library.js'
t = open(lp, encoding='utf-8', newline='').read()
if 'EmadeckLabels' in t:
    print('library deja patchee pour Labels')
else:
    reps = [
    ("{id:'labels',ill:'label',vb:'0 0 160 110',p:['#0E4F57','#2AA6B0','#BFE3E6','#DFF1EE']}",
     "{id:'labels',ill:'label',vb:'0 0 160 110',p:['#0E4F57','#2AA6B0','#BFE3E6','#DFF1EE'],live:true}"),
    ("      cards = cards.filter(function(c){ return qtCards.indexOf(c) < 0 &&",
     "      var lbCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\\s*LB[A-Z]-/.test(t.textContent); });\n      cards = cards.filter(function(c){ return lbCards.indexOf(c) < 0 && qtCards.indexOf(c) < 0 &&"),
    (":(p.id==='quotes'?T.tpl(qtCards.length):", ":(p.id==='labels'?T.tpl(lbCards.length):(p.id==='quotes'?T.tpl(qtCards.length):"),
    (":(p.live?T.tpl(total):T.soon))))))", ":(p.live?T.tpl(total):T.soon)))))))"),
    ("(p.id==='quotes' ? 'quotes' : ", "(p.id==='labels' ? 'labels' : (p.id==='quotes' ? 'quotes' : "),
    ("'soon:'+p.id)))))); });", "'soon:'+p.id))))))); });"),
    ("      if (window.EmadeckQuotes)",
     "      if (window.EmadeckLabels) { try { window.EmadeckLabels.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:lbCards}); } catch(e){ console.error(e); } }\n      if (window.EmadeckQuotes)"),
    ]
    for a, b2 in reps:
        if t.count(a) != 1:
            raise SystemExit('ERREUR: motif introuvable dans joydeck-library.js: ' + a[:70])
        t = t.replace(a, b2)
    open(lp, 'w', encoding='utf-8', newline='').write(t)
    print('library patchee (Labels)')
