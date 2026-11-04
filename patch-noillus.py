import io
p='planner-core.js'
s=io.open(p,encoding='utf-8',newline='').read()
nl='\r\n' if '\r\n' in s else '\n'
s=s.replace('\r\n','\n')
if 'M.illus' in s:
    print('deja patche')
    raise SystemExit
a="$('addText').addEventListener('click',addText);"
b=a+"\nif(!M.illus){var ig=$('catSel').parentNode;ig.style.display='none';var sb=document.querySelector('.sidebar .sub');if(sb)sb.textContent='Click any text on the page to edit it. Add your own text'+(M.photo?' or photo':'')+' on top.'}"
if s.count(a)!=1: raise SystemExit('ERREUR motif')
s=s.replace(a,b)
s=s.replace("'Selected: illustration'","'Selected: image'")
io.open(p,'w',encoding='utf-8',newline='').write(s.replace('\n',nl))
print('planner-core.js patche (illustrations masquees)')
