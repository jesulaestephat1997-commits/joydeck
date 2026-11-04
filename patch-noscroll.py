import io
p='joydeck-topbar.js'
s=io.open(p,encoding='utf-8',newline='').read()
if 'overflow:hidden!important' in s:
    print('deja patche')
    raise SystemExit
a=" 'body header.top{height:56px!important;"
if s.count(a)!=1: raise SystemExit('ERREUR motif topbar')
s=s.replace(a," 'html,body{overflow:hidden!important}',\n"+a)
io.open(p,'w',encoding='utf-8',newline='').write(s)
print('joydeck-topbar.js patche (plus de defilement de la page entiere)')
