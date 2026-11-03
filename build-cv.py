import re, glob, os
TABLE = [
 ('CVA','cv-ats','CV - ATS classic'),
 ('CVA','cv-minimal-head','CV - minimal header'),
 ('CVA','cv-serif','CV - elegant serif'),
 ('CVA','cv-bold-name','CV - big name'),
 ('CVA','cv-timeline','CV - timeline'),
 ('CVB','cv-sidebar-dark','CV - dark sidebar'),
 ('CVB','cv-beige-sidebar','CV - beige sidebar'),
 ('CVB','cv-black-yellow','CV - black & yellow'),
 ('CVB','cv-lime','CV - lime strip'),
 ('CVB','cv-grey-photo','CV - grey with photo'),
 ('CVC','cv-brown-header','CV - brown header'),
 ('CVC','cv-infographic','CV - navy infographic'),
 ('CVC','cv-pastel-pills','CV - pastel with pills'),
]
SHELL = open('AGC-01-cover-block.html', encoding='utf-8').read()
SHELL = SHELL.replace('cover-block', '__MODEL__').replace('<script src="planner-models.js"></script>', '<script src="cv-models.js"></script>')
SHELL = re.sub(r'<title>.*?</title>', '<title>__TITLE__</title>', SHELL)
for f in glob.glob('CVA-*.html') + glob.glob('CVB-*.html') + glob.glob('CVC-*.html'):
    os.remove(f)
rows = []; cnt = {}
for pre, mid, name in TABLE:
    cnt[pre] = cnt.get(pre, 0) + 1
    code = '%s-%02d' % (pre, cnt[pre])
    fn = '%s-%s.html' % (code, mid)
    open(fn, 'w', encoding='utf-8', newline='\n').write(SHELL.replace('__MODEL__', mid).replace('__TITLE__', 'Editor - ' + name))
    rows.append("      {id:'cv-%s%02d', code:'%s', file:'%s', old:'', name:%s}" % (pre[-1].lower(), cnt[pre], code, fn, repr(name)))
print('pages ecrites:', len(TABLE))
bp = 'builder.html'
s = open(bp, encoding='utf-8', newline='').read()
s = re.sub(r"    \{cat:'CV pages', items:\[.*?\]\},\r?\n", "", s, count=1, flags=re.S)
block = "    {cat:'CV pages', items:[\n" + ",\n".join(rows) + "]},\n"
s, k = re.subn(r"(const CATALOG = \[\r?\n)", lambda m: m.group(1) + block, s, count=1)
print('catalogue CV:', k)
if 'joydeck-cv.js' not in s:
    s = s.replace('<script src="joydeck-mobile.js"></script>', '<script src="joydeck-cv.js"></script>\n<script src="joydeck-mobile.js"></script>', 1)
open(bp, 'w', encoding='utf-8', newline='').write(s)

lp = 'joydeck-library.js'
t = open(lp, encoding='utf-8', newline='').read()
if 'EmadeckCV' in t:
    print('library deja patchee pour CV')
else:
    reps = [
    ("{id:'cv',ill:'cv',vb:'0 0 120 160',p:['#1E3A34','#2FB574','#CDEBDD','#E9F5EE']}",
     "{id:'cv',ill:'cv',vb:'0 0 120 160',p:['#1E3A34','#2FB574','#CDEBDD','#E9F5EE'],live:true}"),
    ("      cards = cards.filter(function(c){ return cbCards.indexOf(c) < 0 && agCards.indexOf(c) < 0 && wdCards.indexOf(c) < 0; });\n",
     "      var cvCards = cards.filter(function(c){ var t = c.querySelector('.tn'); return t && /^\\s*CV[A-Z]-/.test(t.textContent); });\n      cards = cards.filter(function(c){ return cbCards.indexOf(c) < 0 && agCards.indexOf(c) < 0 && wdCards.indexOf(c) < 0 && cvCards.indexOf(c) < 0; });\n"),
    (":(p.id==='wedding'?T.tpl(wdCards.length):", ":(p.id==='cv'?T.tpl(cvCards.length):(p.id==='wedding'?T.tpl(wdCards.length):"),
    (":(p.live?T.tpl(total):T.soon))))", ":(p.live?T.tpl(total):T.soon)))))"),
    ("(p.id==='wedding' ? 'wedding' : (p.id==='agenda' ? 'agenda' : (p.live ? 'ebook' : 'soon:'+p.id)))",
     "(p.id==='cv' ? 'cv' : (p.id==='wedding' ? 'wedding' : (p.id==='agenda' ? 'agenda' : (p.live ? 'ebook' : 'soon:'+p.id))))"),
    ("      aside.insertBefore(root, libList);",
     "      if (window.EmadeckCV) { try { window.EmadeckCV.mount({root:root, show:show, el:el, head:head, backBtn:backBtn, pal:pal, ill:ill, CHEV:CHEV, cards:cvCards}); } catch(e){ console.error(e); } }\n      aside.insertBefore(root, libList);"),
    ]
    for a, b in reps:
        if t.count(a) != 1:
            raise SystemExit('ERREUR: motif introuvable dans joydeck-library.js: ' + a[:60])
        t = t.replace(a, b)
    n = t.count("cv:'CV'")
    t = t.replace("cv:'CV'", "cv:'Curriculum vitae'")
    open(lp, 'w', encoding='utf-8', newline='').write(t)
    print('library patchee (labels:', n, ')')
