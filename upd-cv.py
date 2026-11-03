import re
b=open('build-cv.py',encoding='utf-8').read()
tab="""TABLE = [
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
"""
b,k=re.subn(r"TABLE = \[.*?\n\]\n",lambda m:tab,b,count=1,flags=re.S)
if k!=1: raise SystemExit('ERREUR TABLE')
if 'cv-models2' not in b:
    old="'<script src=\"cv-models.js\"></script>')"
    if b.count(old)!=1: raise SystemExit('ERREUR shell')
    b=b.replace(old,"'<script src=\"cv-models.js\"></script>\\n<script src=\"cv-models2.js\"></script>')")
b=b.replace("for f in glob.glob('CVA-*.html') + glob.glob('CVB-*.html') + glob.glob('CVC-*.html'):","for f in glob.glob('CV[A-E]-*.html'):")
open('build-cv.py','w',encoding='utf-8',newline='').write(b)
j=open('joydeck-cv.js',encoding='utf-8').read()
if 'CVD' not in j:
    old=" ['CVC','Header & creative','page',['#6B4F40','#C98F7A','#EBD3C8','#F7EEE9']]\n"
    if j.count(old)!=1: raise SystemExit('ERREUR PARTS')
    j=j.replace(old," ['CVC','Header & creative','page',['#6B4F40','#C98F7A','#EBD3C8','#F7EEE9']],\n ['CVD','Elegant & photo','ebook',['#2F3A2C','#8A6F5A','#E7DDD0','#F6F1E9']],\n ['CVE','Creative & dark','page',['#161B26','#E6B98F','#2A3140','#EBD9C8']]\n")
    open('joydeck-cv.js','w',encoding='utf-8',newline='').write(j)
print('scripts CV mis a jour')
