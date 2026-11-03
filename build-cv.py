import re, glob, os
TABLE = [
 ('CVA','cv-ats','CV - ATS classic'),
 ('CVA','cv-minimal-head','CV - minimal header'),
 ('CVA','cv-serif','CV - elegant serif'),
 ('CVA','cv-bold-name','CV - big name'),
 ('CVA','cv-timeline','CV - timeline'),
 ('CVA','cv-ats-badge','CV - ATS friendly badge'),
 ('CVA','cv-ats-jessica','CV - ATS plain left'),
 ('CVA','cv-your-name','CV - clean left aligned'),
 ('CVA','cv-elena-pink','CV - pink serif ATS'),
 ('CVA','cv-graham','CV - dense ATS'),
 ('CVA','cv-jennifer','CV - serif label column'),
 ('CVA','cv-sara-center','CV - centered header'),
 ('CVA','cv-min-timeline','CV - minimal timeline'),
 ('CVA','cv-form','CV - classic form'),
 ('CVA','cv-jane-doe','CV - bold stacked name'),
 ('CVA','cv-john-marck','CV - photo ATS'),
 ('CVB','cv-sidebar-dark','CV - dark sidebar'),
 ('CVB','cv-beige-sidebar','CV - beige sidebar'),
 ('CVB','cv-black-yellow','CV - black & yellow'),
 ('CVB','cv-lime','CV - lime strip'),
 ('CVB','cv-grey-photo','CV - grey with photo'),
 ('CVB','cv-mike-navy','CV - navy sidebar dated'),
 ('CVB','cv-alex-dark','CV - dark panel left'),
 ('CVB','cv-noel-dark','CV - rounded dark panel'),
 ('CVB','cv-olivia-dark','CV - full dark page'),
 ('CVB','cv-name-surname','CV - right grey sidebar'),
 ('CVB','cv-teal-fr','CV - teal right sidebar (FR)'),
 ('CVB','cv-marcela','CV - pale blue strip & boxes'),
 ('CVC','cv-brown-header','CV - brown header'),
 ('CVC','cv-infographic','CV - navy infographic'),
 ('CVC','cv-pastel-pills','CV - pastel with pills'),
 ('CVC','cv-galena','CV - dark header & photo'),
 ('CVC','cv-rosa','CV - charcoal header, grey sidebar'),
 ('CVC','cv-donna','CV - pale header & sidebar'),
 ('CVC','cv-modifiable','CV - grey boxes'),
 ('CVC','cv-sophie','CV - gradient header, two columns'),
 ('CVC','cv-claudine','CV - grey circle & photo (FR)'),
 ('CVC','cv-amy','CV - pink band'),
 ('CVD','cv-bennett','CV - beige label rows & photo'),
 ('CVD','cv-sandra','CV - dated rows & leaf'),
 ('CVD','cv-carla','CV - beige serif & sliders'),
 ('CVD','cv-alicia','CV - script name & photo'),
 ('CVD','cv-lea','CV - tan header (FR)'),
 ('CVD','cv-camara','CV - photo left serif (FR)'),
 ('CVD','cv-celia','CV - big serif name (FR)'),
 ('CVD','cv-andreea','CV - white, photo right'),
 ('CVD','cv-jessica','CV - marble script'),
 ('CVD','cv-anna','CV - framed page (FR)'),
 ('CVD','cv-catalina','CV - serif photo & leaf'),
 ('CVD','cv-dennis','CV - cream serif caps'),
 ('CVE','cv-sania','CV - dark navy & peach card'),
 ('CVE','cv-sarahi','CV - black panel & orange'),
 ('CVE','cv-gaia','CV - blue timeline & pills'),
 ('CVE','cv-isabella','CV - black block & vertical title'),
 ('CVE','cv-david','CV - executive black panel'),
 ('CVE','cv-maria','CV - giant letter'),
 ('CVE','cv-architecture','CV - rotated big word'),
 ('CVE','cv-elizabeth','CV - black strip & peach'),
 ('CVE','cv-john-smith','CV - grey bold name & dots'),
]
SHELL = open('AGC-01-cover-block.html', encoding='utf-8').read()
SHELL = SHELL.replace('cover-block', '__MODEL__').replace('<script src="planner-models.js"></script>', '<script src="cv-models.js"></script>\n<script src="cv-models2.js"></script>')
SHELL = re.sub(r'<title>.*?</title>', '<title>__TITLE__</title>', SHELL)
for f in glob.glob('CV[A-E]-*.html'):
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
