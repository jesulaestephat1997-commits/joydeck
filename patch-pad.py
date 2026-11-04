import io
p='builder.html'
s=io.open(p,encoding='utf-8',newline='').read()
if 'jd-lib-pad' in s:
    print('deja patche')
    raise SystemExit
a='</head>'
if s.count(a)!=1: raise SystemExit('ERREUR motif </head>')
s=s.replace(a,'<style id="jd-lib-pad">#lib::after{content:"";display:block;height:96px}</style>\n</head>')
io.open(p,'w',encoding='utf-8',newline='').write(s)
print('builder.html patche (marge basse bibliotheque)')
