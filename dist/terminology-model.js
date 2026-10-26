import {scienceTerms,dictionaryChapters} from './terminology-data.js';
export const dictionaryTermById=new Map(scienceTerms.map(term=>[term.id,term]));
const chapterIds=new Set(dictionaryChapters.map(chapter=>chapter.id));
export function normaliseTermQuery(text){return String(text??'').normalize('NFKC').toLowerCase().replace(/\s+/g,'');}
export function filterScienceTerms(query='',chapter='all'){
 const q=normaliseTermQuery(query),scope=chapterIds.has(chapter)?chapter:'all';
 const items=scienceTerms.filter(term=>(scope==='all'||term.chapters.includes(scope))&&(!q||normaliseTermQuery([term.label,...term.aliases,term.definition,term.example].join(' ')).includes(q)));
 if(!q)return items;
 const rank=term=>{const names=[term.label,...term.aliases].map(normaliseTermQuery);return names.includes(q)?0:names.some(name=>name.includes(q))?1:2;};
 return items.sort((a,b)=>rank(a)-rank(b));
}
const inlineAliases=[...new Map(scienceTerms.flatMap(term=>[term.label,...term.aliases].filter(label=>label.length>1&&/[\u3400-\u9fff]/.test(label)).map(label=>[label,term.id]))).entries()].sort((a,b)=>b[0].length-a[0].length);
const inlineLookup=new Map(inlineAliases);
const termPattern=new RegExp(inlineAliases.map(([label])=>label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
export function matchScienceTerms(text){return [...String(text).matchAll(termPattern)].map(match=>({term:inlineLookup.get(match[0]),text:match[0],index:match.index}));}
