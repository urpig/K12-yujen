// Keep SVG paint servers and accessible labels local when cards share a page.
export function scopeMarkup(markup,prefix){
 const ids=new Map([...markup.matchAll(/\sid="([^"]+)"/g)].map(m=>[m[1],`${prefix}-${m[1]}`]));
 return markup.replace(/(\s)id="([^"]+)"/g,(_,space,id)=>`${space}id="${ids.get(id)}"`)
  .replace(/url\(#([^)]+)\)/g,(all,id)=>ids.has(id)?`url(#${ids.get(id)})`:all)
  .replace(/(\b(?:href|xlink:href)=")#([^"]+)"/g,(all,attr,id)=>ids.has(id)?`${attr}#${ids.get(id)}"`:all)
  .replace(/(aria-(?:labelledby|describedby)=")([^"]+)"/g,(_,attr,list)=>`${attr}${list.split(/\s+/).map(id=>ids.get(id)||id).join(' ')}"`);
}
