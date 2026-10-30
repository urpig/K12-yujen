import {scienceTerms,dictionaryChapters,dictionarySources} from './terminology-data.js';
import {dictionaryTermById,filterScienceTerms,matchScienceTerms} from './terminology-model.js';
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chapterForCard=new Map(dictionaryChapters.map(chapter=>[chapter.target,chapter.id]));
export function termButton(id,label){const term=dictionaryTermById.get(id);return term?`<button type="button" class="science-term" data-science-term="${id}" aria-haspopup="dialog" aria-controls="science-dictionary" aria-label="查看${esc(term.label)}的定義">${esc(label||term.label)}</button>`:'';}
export function mountTerminology(){
 const lesson=document.querySelector('#lesson');if(!lesson)return;
 const launchLabel='<span class="dictionary-aa" aria-hidden="true">Aa</span><span>科學名詞小字典</span><span aria-hidden="true">↗</span>';
 const sideLaunch=document.createElement('button');sideLaunch.type='button';sideLaunch.className='glossary-launch glossary-launch--sidebar';sideLaunch.dataset.openGlossary='all';sideLaunch.setAttribute('aria-haspopup','dialog');sideLaunch.setAttribute('aria-controls','science-dictionary');sideLaunch.innerHTML=launchLabel;
 const sidebarBottom=document.querySelector('.sidebar-bottom');if(sidebarBottom)sidebarBottom.prepend(sideLaunch);else document.querySelector('#route')?.before(sideLaunch);
 const floatingLaunch=sideLaunch.cloneNode(true);floatingLaunch.className='glossary-launch glossary-launch--floating';document.body.append(floatingLaunch);
 const dialog=document.createElement('dialog');dialog.id='science-dictionary';dialog.className='science-dictionary';dialog.setAttribute('aria-labelledby','dictionary-title');
 dialog.innerHTML=`<div class="dictionary-head"><div><span class="eyebrow">隨手查，不用離開探索</span><h2 id="dictionary-title">科學名詞小字典</h2><p>只收錄本單元的新概念與較陌生的用語，從氧化還原到冶煉、抗氧化。</p></div><button type="button" class="dictionary-close" aria-label="關閉名詞字典">×</button></div><div class="dictionary-toolbar"><label for="dictionary-search">找名詞</label><input id="dictionary-search" type="search" autocomplete="off" placeholder="例如：氧化、熔渣、Fe2O3"><select class="dictionary-filter" aria-label="依探索卡篩選名詞"><option value="all">整章名詞</option>${dictionaryChapters.map(chapter=>`<option value="${chapter.id}">${esc(chapter.label)}</option>`).join('')}</select></div><div class="dictionary-main"><nav class="dictionary-list" aria-label="名詞搜尋結果"></nav><article class="dictionary-detail" tabindex="-1" aria-label="名詞說明"></article></div><footer class="dictionary-source">依本單元用語改寫；<span>從物質的變化，認識氧化與還原。</span></footer>`;
 document.body.append(dialog);
 const search=dialog.querySelector('input'),filter=dialog.querySelector('select'),list=dialog.querySelector('.dictionary-list'),detail=dialog.querySelector('.dictionary-detail');
 let selected='oxidation',returnFocus=null;
 function select(id,focus=false){
  const term=dictionaryTermById.get(id);if(!term)return;selected=id;
  const source=dictionarySources[term.source];
  detail.innerHTML=`<span class="eyebrow">名詞定義</span><h3>${esc(term.label)}</h3>${term.aliases.length?`<p class="term-alias">本課也會看到：${term.aliases.map(esc).join('、')}</p>`:''}<p class="dictionary-definition">${esc(term.definition)}</p><div class="dictionary-example"><b>用本單元的例子理解</b><p>${esc(term.example)}</p></div><div class="dictionary-caution"><b>別混淆</b><p>${esc(term.note)}</p></div>${term.related.length?`<div class="dictionary-related"><span>一起認識</span>${term.related.map(id=>termButton(id)).join('')}</div>`:''}<div class="dictionary-location"><span>出現的探索卡</span><p>${term.chapters.map(id=>esc(dictionaryChapters.find(chapter=>chapter.id===id)?.label||'')).join(' · ')}</p></div>${source?`<a class="dictionary-reference" href="${source.url}" target="_blank" rel="noopener">${esc(source.title)} ↗</a>`:''}`;
  list.querySelectorAll('[data-dictionary-term]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.dictionaryTerm===selected)));
  detail.scrollTop=0;if(dialog.open)list.querySelector('[aria-pressed="true"]')?.scrollIntoView({block:'nearest',behavior:'instant'});if(focus)detail.focus({preventScroll:true});
 }
 function renderList(){
  const items=filterScienceTerms(search.value,filter.value);
  list.innerHTML=`<p class="dictionary-count" role="status">找到 ${items.length} 個名詞</p>${items.map(term=>`<button type="button" data-dictionary-term="${term.id}" aria-pressed="${term.id===selected}">${esc(term.label)}</button>`).join('')}`;
  if(!items.length){detail.innerHTML='<h3>沒有找到這個名詞</h3><p>試試較短的關鍵字，或把篩選改成「整章名詞」。</p>';return;}
  if(!items.some(term=>term.id===selected))selected=items[0].id;select(selected);
 }
 function open(trigger,id,chapter='all'){
  returnFocus=trigger;search.value='';filter.value=chapterForCard.has(chapter)?chapterForCard.get(chapter):chapter;
  if(!filter.value)filter.value='all';selected=id||filterScienceTerms('',filter.value)[0]?.id||'oxidation';renderList();
  if(!dialog.open)dialog.showModal();if(id)select(id);detail.focus({preventScroll:true});
 }
 const close=()=>dialog.close();dialog.querySelector('.dictionary-close').addEventListener('click',close);
 dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();}});
 dialog.addEventListener('close',()=>{(returnFocus?.isConnected?returnFocus:floatingLaunch.checkVisibility()?floatingLaunch:sideLaunch).focus({preventScroll:true});});
 dialog.addEventListener('click',event=>{
  const target=event.target.closest('[data-dictionary-term]');if(target)select(target.dataset.dictionaryTerm,true);
  if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}
 });
 function onClick(event){
  const term=event.target.closest('[data-science-term]'),launch=event.target.closest('[data-open-glossary]');
  if(term){if(dialog.contains(term)){search.value='';filter.value='all';selected=term.dataset.scienceTerm;renderList();select(selected,true);}else open(term,term.dataset.scienceTerm);}
  else if(launch)open(launch,null,launch.dataset.openGlossary||'all');
 }
 document.addEventListener('click',onClick);search.addEventListener('input',()=>{selected='';renderList();});filter.addEventListener('change',renderList);
 const skip='button,a,svg,canvas,script,style,input,select,textarea,label,summary,dialog,code,[data-glossary-skip],[role="status"],[aria-live],.interactive-lab,.prediction-block,.prediction-review,.practice,.prep-quiz,.evidence-panel,.keyboard-help,.reaction-equation,.life-equation,.prep-scenes,.oxygen-series,.iron-pair-scene';
 function annotate(card){
  if(!card.isConnected)return;
  const seen=new Set([...card.querySelectorAll('[data-inline-term]')].map(button=>button.dataset.scienceTerm));
  const nodes=[],walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){const node=walker.currentNode,parent=node.parentElement;if(parent&&!parent.closest(skip)&&parent.closest('p,li,dd'))nodes.push(node);}
  for(const node of nodes){
   const matches=matchScienceTerms(node.data).filter(match=>!seen.has(match.term));if(!matches.length)continue;
   const fragment=document.createDocumentFragment();let end=0;
   for(const match of matches){if(seen.has(match.term))continue;fragment.append(document.createTextNode(node.data.slice(end,match.index)));const button=document.createElement('button');button.type='button';button.className='science-term';button.dataset.scienceTerm=match.term;button.dataset.inlineTerm='';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','science-dictionary');button.setAttribute('aria-label','查看'+dictionaryTermById.get(match.term).label+'的定義');button.textContent=match.text;fragment.append(button);seen.add(match.term);end=match.index+match.text.length;}
   fragment.append(document.createTextNode(node.data.slice(end)));node.replaceWith(fragment);
  }
 }
 const pending=new Set();let frame=0,alive=true;
 const observer=new MutationObserver(records=>{
  for(const record of records){const target=record.target.nodeType===3?record.target.parentElement:record.target;if(!target||target.closest(skip))continue;const card=target.closest('.exploration-card');if(card)pending.add(card);}
  if(pending.size&&!frame)frame=requestAnimationFrame(()=>{frame=0;if(!alive)return;observer.disconnect();for(const card of pending)annotate(card);pending.clear();observer.observe(lesson,{childList:true,subtree:true,characterData:true});});
 });
 lesson.querySelectorAll('.exploration-card').forEach(annotate);observer.observe(lesson,{childList:true,subtree:true,characterData:true});
 return {disconnect(){alive=false;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('click',onClick);sideLaunch.remove();floatingLaunch.remove();dialog.remove();}};
}
