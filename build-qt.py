import re, glob, os
src = open('quotes-models.js', encoding='utf-8').read() + '\n' + open('quotes-models2.js', encoding='utf-8').read()
ids = re.findall(r"^(?:reg|reg2|PBG)\('(qt-[a-z0-9-]+)','([^']+)'", src, flags=re.M)
CATS = ['QTA', 'QTB', 'QTC', 'QTD', 'QTE', 'QTF', 'QTG', 'QTH', 'QTI', 'QTJ']
SIZES = [10, 10, 10, 10, 10, 12, 12, 12, 12, 12]
BOUND = [sum(SIZES[:i + 1]) for i in range(len(SIZES))]
assert len(ids) == BOUND[-1], len(ids)
TABLE = [(CATS[sum(1 for x in BOUND if k >= x)], m, n) for k, (m, n) in enumerate(ids)]
SHELL = open('AGC-01-cover-block.html', encoding='utf-8').read()
SHELL = SHELL.replace('cover-block', '__MODEL__').replace('<script src="planner-models.js"></script>', '<script src="quotes-models.js"></script>\n<script src="quotes-models2.js"></script>')
SHELL = re.sub(r'<title>.*?</title>', '<title>__TITLE__</title>', SHELL)
for f in glob.glob('QT[A-J]-*.html'):
    os.remove(f)
rows = []; cnt = {}
for pre, mid, name in TABLE:
    cnt[pre] = cnt.get(pre, 0) + 1
    code = '%s-%02d' % (pre, cnt[pre])
    fn = '%s-%s.html' % (code, mid)
    open(fn, 'w', encoding='utf-8', newline='\n').write(SHELL.replace('__MODEL__', mid).replace('__TITLE__', 'Editor - ' + name))
    rows.append("      {id:'qt-%s%02d', code:'%s', file:'%s', old:'', name:%s}" % (pre[-1].lower(), cnt[pre], code, fn, repr(name)))
print('pages ecrites:', len(TABLE))
bp = 'builder.html'
s = open(bp, encoding='utf-8', newline='').read()
s = re.sub(r"    \{cat:'Quote pages', items:\[.*?\]\},\r?\n", "", s, count=1, flags=re.S)
block = "    {cat:'Quote pages', items:[\n" + ",\n".join(rows) + "]},\n"
s, k = re.subn(r"(const CATALOG = \[\r?\n)", lambda m: m.group(1) + block, s, count=1)
print('catalogue Quotes:', k)
if 'joydeck-quotes.js' not in s:
    s = s.replace('<script src="joydeck-mobile.js"></script>', '<script src="joydeck-quotes.js"></script>\n<script src="joydeck-mobile.js"></script>', 1)
open(bp, 'w', encoding='utf-8', newline='').write(s)

lp = 'joydeck-library.js'
t = open(lp, encoding='utf-8', newline='').read()
if 'EmadeckQuotes' in t:
    print('library deja patchee pour Quotes')
else:
    reps = [
    ("{id:'quotes',ill:'quote',vb:'0 0 120 120',p:['#3C2A6B','#B79CF0','#E4D8F8','#EDE7F8']}",
     "{id:'quotes',ill:'quote',vb:'0 0 120 120',p:['#3C2A6B','#B79CF0','#E4D8F8','#EDE7F8'],live:true}"),
    ("      cards = cards.filter(function(c){ return cbCards.indexOf(c) < 0",
     "      var qtCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\\s*QT[A-Z]-/.test(t.textContent); });\n      cards = cards.filter(function(c){ return qtCards.indexOf(c) < 0 && cbCards.indexOf(c) < 0"),
    (":(p.id==='cv'?T.tpl(cvCards.length):", ":(p.id==='quotes'?T.tpl(qtCards.length):(p.id==='cv'?T.tpl(cvCards.length):"),
    (":(p.live?T.tpl(total):T.soon)))))", ":(p.live?T.tpl(total):T.soon))))))"),
    ("(p.id==='cv' ? 'cv' : ", "(p.id==='quotes' ? 'quotes' : (p.id==='cv' ? 'cv' : "),
    ("'soon:'+p.id))))); });", "'soon:'+p.id)))))); });"),
    ("      aside.insertBefore(root, libList);",
     "      if (window.EmadeckQuotes) { try { window.EmadeckQuotes.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:qtCards}); } catch(e){ console.error(e); } }\n      aside.insertBefore(root, libList);"),
    ]
    for a, b2 in reps:
        if t.count(a) != 1:
            raise SystemExit('ERREUR: motif introuvable dans joydeck-library.js: ' + a[:70])
        t = t.replace(a, b2)
    open(lp, 'w', encoding='utf-8', newline='').write(t)
    print('library patchee (Quotes)')
