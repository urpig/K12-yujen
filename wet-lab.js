// A time-compressed observation of collected, cooled products and litmus.
// Colours belong to the paper. Acidic and alkaline solutions remain colourless.
export function wetLabMarkup(d,key){
 const base=d.litmus==='base',acid=d.litmus==='acid';
 const solid=['Na','Mg','Zn','Cu','P'].includes(key);
 const sediment=key==='Cu'?'#252923':key==='Zn'||key==='Mg'?'#f0eee0':null;
 const result=base?'紅 → 藍；藍 → 藍':acid?'紅 → 紅；藍 → 紅':'紅 → 紅；藍 → 藍';
 return `<section class="wet-lab" data-wet-lab data-result="${d.litmus}" aria-label="產物加水與石蕊實驗">
 <div class="observation-heading"><span>把產物的性質「顯影」</span><b data-wet-stage>① 產物與水接觸</b></div>
 <svg viewBox="0 0 640 320" role="img" aria-label="${solid?'收集並冷卻的固體產物加入水中':'收集的無色氣體通入水中'}，接著浸入紅、藍石蕊試紙">
 <defs><linearGradient id="wet-glass-${key}" x2="1" y2=".2"><stop stop-color="#b4d0cb" stop-opacity=".3"/><stop offset=".24" stop-color="#fff" stop-opacity=".7"/><stop offset=".7" stop-color="#dbeae5" stop-opacity=".1"/><stop offset="1" stop-color="#9bbcb1" stop-opacity=".45"/></linearGradient><linearGradient id="wet-water-${key}" x2="0" y2="1"><stop stop-color="#e4f3f1" stop-opacity=".6"/><stop offset="1" stop-color="#b3d8d5" stop-opacity=".45"/></linearGradient></defs>
 <path d="M0 0H640V320H0Z" fill="#edf0e6"/><path d="M0 265H640V320H0Z" fill="#dce5d5"/>
 <ellipse cx="329" cy="280" rx="147" ry="17" fill="#48654e" opacity=".12"/>
 <path d="M208 100V260Q208 282 330 282Q452 282 452 260V100" fill="url(#wet-glass-${key})" stroke="#8daaa3" stroke-width="2"/>
 <path d="M211 169Q330 184 449 169V257Q330 280 211 257Z" fill="url(#wet-water-${key})"/><ellipse cx="330" cy="169" rx="119" ry="13" fill="#ebf7f0" fill-opacity=".65" stroke="#a8c9c0"/>
 ${sediment?`<path class="wet-sediment" d="M220 252Q246 247 263 252L282 247L302 252L333 247L358 253L384 248L438 256Q330 273 220 259Z" fill="${sediment}"/>`:''}
 <g stroke="#91aaa0" opacity=".6"><path d="M422 125H443M428 145H443M422 165H443M428 185H443M422 205H443M428 225H443"/></g>
 <path d="M220 113V250" stroke="white" stroke-width="5" opacity=".7"/>
 ${solid?`<g class="wet-spoon"><path d="M52 80L172 117" stroke="#82948c" stroke-width="9" stroke-linecap="round"/><ellipse cx="188" cy="121" rx="29" ry="11" fill="#bdc9c2" stroke="#82948c"/><path d="M168 118Q185 105 207 119" fill="${key==='Cu'?'#252923':'#ecece0'}"/></g><g class="wet-falling" fill="${key==='Cu'?'#30342d':'#f9f6e9'}">${Array.from({length:9},(_,i)=>`<path d="M${256+i%3*13} ${113+i*5}l5 -2 3 4 -6 3Z"/>`).join('')}</g>`:`<path d="M68 64H150Q180 64 180 92V232H260" stroke="#9bb5a8" stroke-width="7" fill="none"/><path d="M68 64H150Q180 64 180 92V232H260" stroke="#fafff9" stroke-width="3" fill="none"/><g class="wet-bubbles" fill="none" stroke="#98bdb8">${[0,1,2,3].map(i=>`<ellipse cx="${265+i%2*14}" cy="${225-i*15}" rx="${4+i%2}" ry="5" style="animation-delay:${i*.17}s"/>`).join('')}</g><text x="44" y="47" fill="#5d7869" font-size="14">通入收集的氣體</text>`}
 <g class="wet-papers"><g><path d="M303 24H321V139H303Z" fill="#c46579"/><path class="wet-tip wet-red-tip" d="M303 109H321V139H303Z" fill="${base?'#526eb9':'#c46579'}"/><path d="M306 28V105" stroke="white" opacity=".2"/><text x="311" y="13" text-anchor="middle" font-size="13" fill="#8b4059">原紅色</text></g><g><path d="M359 24H377V139H359Z" fill="#526eb9"/><path class="wet-tip wet-blue-tip" d="M359 109H377V139H359Z" fill="${acid?'#c46579':'#526eb9'}"/><path d="M362 28V105" stroke="white" opacity=".2"/><text x="367" y="13" text-anchor="middle" font-size="13" fill="#4a61a0">原藍色</text></g></g>
 <ellipse class="wet-ripple" cx="337" cy="173" rx="58" ry="5" fill="none" stroke="#84b2a4"/>
 <text x="496" y="163" fill="#627e72" font-size="13">觀察浸水端</text><path d="M483 170L392 190" stroke="#849f8e" fill="none"/>
 </svg><div class="wet-verdict" aria-live="polite"><b data-wet-verdict>正在觀察，先看試紙浸水端……</b><p data-wet-explanation>試紙會先浸入水中，再顯示觀察結果。</p></div><div class="wet-foot"><span>收集、冷卻後的產物；動畫壓縮反應時間。不是實驗操作指引。</span><button type="button" class="text-button" data-wet-replay>重看測試</button></div>
 <template data-wet-answer><b>${d.waterTitle}｜${result}</b><p>${d.water}</p></template></section>`;
}
const activeWetLabs=new WeakMap();
export function stopWetLab(root){const active=activeWetLabs.get(root);if(active){active.forEach(clearTimeout);activeWetLabs.delete(root);}}
export function mountWetLab(root,onComplete=()=>{}){
 stopWetLab(root);const panel=root.querySelector('[data-wet-lab]');if(!panel)return;
 function play(){
  stopWetLab(root);panel.classList.remove('wet-playing','wet-complete');
  panel.querySelector('[data-wet-stage]').textContent='① 產物與水接觸';
  panel.querySelector('.wet-verdict').innerHTML='<b>正在觀察，先看試紙浸水端……</b><p>液體的顏色不代表酸鹼性；這次比較兩張試紙。</p>';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  void panel.offsetWidth;panel.classList.add('wet-playing');
  const stages=[setTimeout(()=>{if(!panel.isConnected)return;panel.querySelector('[data-wet-stage]').textContent='② 浸入紅、藍石蕊試紙';},reduced?0:1200),setTimeout(()=>{
   if(!panel.isConnected)return;panel.classList.add('wet-complete');panel.querySelector('[data-wet-stage]').textContent='③ 比較原色與浸水端';
   panel.querySelector('.wet-verdict').replaceChildren(panel.querySelector('[data-wet-answer]').content.cloneNode(true));onComplete();
  },reduced?30:3300)];activeWetLabs.set(root,stages);
 }
 panel.querySelector('[data-wet-replay]').addEventListener('click',play);play();
}
