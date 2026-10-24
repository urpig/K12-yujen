import json,re,xml.etree.ElementTree as ET
from pathlib import Path
scenes=json.loads(Path('tests/results/scenes.json').read_text(encoding='utf-8'))
results=[]
for s in scenes:
    # HTML wrappers removed; nested SVG remains part of the complete XML tree.
    html=s['html']; start=html.find('<svg ')
    depth=0;end=None
    for m in re.finditer(r'</?svg\b[^>]*>',html[start:]):
        depth += -1 if m.group(0).startswith('</') else 1
        if depth==0: end=start+m.end();break
    assert end,s['name']
    tree=ET.fromstring(html[start:end])
    ids=[n.attrib['id'] for n in tree.iter() if 'id' in n.attrib]
    assert len(ids)==len(set(ids)),f"duplicate SVG IDs: {s['name']}"
    refs=re.findall(r'url\(#([^\)]+)\)',html[start:end])
    assert all(r in ids for r in refs),f"missing gradient/filter: {s['name']}"
    assert not re.search(r'\b(NaN|undefined|Infinity)\b',html),s['name']
    results.append({'scene':s['name'],'svg_valid':True,'ids_unique':True,'references_resolved':True})
Path('tests/results/scene-validation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'PASS: {len(results)} SVG variants parse, have unique IDs and resolved references. This does not verify browser rendering.')
