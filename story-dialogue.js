export function storySpeech(who,text,expression=who==='kui'?'curious':'gentle'){
 return `<div class="story-speech story-speech--${who}"><span class="story-portrait story-portrait--${who}" data-expression="${expression}" aria-hidden="true"></span><p><b>${({kui:'小葵',grandpa:'阿公',emperor:'皇上'})[who]}</b>${text}</p></div>`;
}
export function definitionDialogue(){return `<section class="prep-definitions" aria-labelledby="prep-definitions-title"><small>先看變化，再認識角色</small><h3 id="prep-definitions-title">五個名詞，一張圖看懂</h3><div class="story-dialogue dialogue-stack">${storySpeech('kui','「氧化、還原和活性有什麼不同？氧化劑、還原劑又是誰？」')}${storySpeech('grandpa','「先追蹤氧的去向，再看誰讓對方改變。把這五個名詞放在一起，就比較不會搞混了。」')}</div>
<div class="redox-definition-map" aria-label="氧化、還原、對氧活性、氧化劑與還原劑定義圖卡">
 <header class="definition-map-heading"><span>O</span><div><small>FOLLOW THE OXYGEN</small><h4>看懂氧的去向，就看懂兩邊的變化</h4><p>用同一個例子認識五個名詞：鎂與二氧化碳反應。</p></div></header>
 <div class="definition-section-label"><b>01</b><span>發生了什麼變化？</span><small>先看自己</small></div>
 <div class="definition-pair">
  <section class="definition-tile definition-tile--oxidation"><div class="definition-term"><h4>氧化</h4><span>OXIDATION</span></div><p class="definition-key">物質<strong>得到氧</strong></p><p>與氧結合，形成氧化物。</p><div class="definition-specimen"><div><small>反應前</small><div class="definition-molecule"><i class="atom-mg">Mg</i></div><b>鎂</b></div><span class="definition-change">得到 O<span>⟶</span></span><div><small>反應後</small><div class="definition-molecule"><i class="atom-mg">Mg</i><i class="atom-o">O</i></div><b>氧化鎂</b></div></div><div class="definition-verdict">鎂得到氧，所以<strong>鎂被氧化</strong>。</div></section>
  <section class="definition-tile definition-tile--reduction"><div class="definition-term"><h4>還原</h4><span>REDUCTION</span></div><p class="definition-key">氧化物<strong>失去氧</strong></p><p>氧被移走，原來結合的物質留下。</p><div class="definition-specimen"><div><small>反應前</small><div class="definition-molecule"><i class="atom-o">O</i><i class="atom-c">C</i><i class="atom-o">O</i></div><b>二氧化碳</b></div><span class="definition-change">失去 O<span>⟶</span></span><div><small>反應後</small><div class="definition-molecule"><i class="atom-c">C</i></div><b>碳</b></div></div><div class="definition-verdict">CO₂ 失去氧，所以<strong>CO₂ 被還原</strong>。</div></section>
 </div>
 <div class="definition-transfer"><span>鎂接走氧</span><b>⟵</b><span>同一批氧，從 CO₂ 轉移到鎂</span><b>⟵</b><span>CO₂ 交出氧</span></div>
 <div class="definition-reaction"><span>點燃的鎂可在 CO₂ 中繼續反應</span><b>2Mg + CO₂ → 2MgO + C</b><strong>一邊氧化，一邊還原；兩者同時發生。</strong><small>球模型用來辨認物質；完整反應的粒子數以反應式為準。</small></div>
 <div class="definition-section-label"><b>02</b><span>誰比較容易與氧結合？</span><small>比較傾向</small></div>
 <section class="definition-affinity"><div><h4>對氧活性</h4><p>元素與氧結合的傾向。<br><strong>活性較大，通常較容易得到氧。</strong></p></div><div class="definition-ranking" aria-label="本課對氧活性由大到小：鎂、碳、鐵、銅"><div><span>較大 · 較容易得氧</span><span>較小</span></div><ol><li><b>Mg</b>鎂</li><li><b>C</b>碳</li><li><b>Fe</b>鐵</li><li><b>Cu</b>銅</li></ol></div><p class="definition-example">這個例子中，鎂的對氧活性比碳大，能從 CO₂ 取氧。實際能否反應，還要看溫度等條件。</p></section>
 <div class="definition-section-label"><b>03</b><span>誰讓對方發生改變？</span><small>辨認角色</small></div>
 <div class="definition-pair definition-agents">
  <section class="definition-tile definition-tile--reductant"><div class="definition-agent-id"><span>Mg</span><div><small>在這個反應中，鎂是</small><h4>還原劑</h4></div></div><p class="definition-agent-action">使對方<strong>被還原</strong></p><p class="definition-example">鎂取走 CO₂ 的氧，讓 CO₂ 被還原。</p><div class="definition-self">自己則<strong>被氧化</strong><span>Mg → MgO</span></div></section>
  <section class="definition-tile definition-tile--oxidant"><div class="definition-agent-id"><span>CO₂</span><div><small>在這個反應中，CO₂ 是</small><h4>氧化劑</h4></div></div><p class="definition-agent-action">使對方<strong>被氧化</strong></p><p class="definition-example">CO₂ 提供氧給鎂，讓鎂被氧化。</p><div class="definition-self">自己則<strong>被還原</strong><span>CO₂ → C</span></div></section>
 </div>
 <p class="definition-memory"><b>記住這個差別</b><span>「氧化／還原」看<strong>自己的變化</strong>；<br>「氧化劑／還原劑」看<strong>讓對方發生的變化</strong>。</span></p>
 <details class="definition-electrons"><summary>進一步理解：用電子也能判斷</summary><p>失去電子是氧化，得到電子是還原。氧化劑接受電子，還原劑提供電子；角色要依這一次反應判斷。得氧、失氧是本圖使用的入門線索，並非所有氧化還原反應都涉及氧的轉移。</p></details>
</div></section>`;}

const notes={
 1:['赤鐵礦主要含氧化鐵 Fe₂O₃；含有鐵元素，不等於已經是金屬鐵。','敲碎、磨細只改變大小；要取得鐵，需要化學反應讓氧化鐵失去氧。'],
 2:['燃燒是劇烈的氧化；銅加熱形成黑色氧化銅，沒有明顯火焰也能被氧化。','火焰顏色、產物外觀和反應式要一起看；變色不一定代表生成新物質。','氧化物遇水不一定都反應。石蕊用來比較酸鹼性：酸使藍色石蕊變紅，鹼使紅色石蕊變藍。'],
 3:['本課比較中：C ＞ Zn ＞ Cr ＞ Fe ＞ Sn ＞ Pb ＞ Cu。','合適高溫下，碳、鋅、鉻可使氧化鐵失氧；錫、鉛、銅在本模型條件下不能取回金屬鐵。','能取氧的材料自己被氧化，是還原劑；氧化鐵失氧被還原，是氧化劑。實際反應仍受條件影響。'],
 4:['Fe₂O₃ + 3CO → 2Fe + 3CO₂（合適高溫）。氧轉移了，原子種類與總數沒有改變。','氧化鐵失氧被還原，是氧化劑；CO 得氧被氧化，是還原劑。','CO 是化合物，不列在元素活性表中。它在合適條件下能再接受氧，形成 CO₂。'],
 5:['焦炭燃燒供熱，並參與生成 CO；CO 是高爐中還原氧化鐵的重要幫手。','石灰石受熱分解產生 CaO，與酸性雜質形成熔渣；除雜與還原的工作不同。','熔渣與鐵水分層排出；生鐵含碳量較高，還要進一步處理與選材。'],
 6:['生鐵含碳較高，通常硬而脆；熟鐵含碳很低，較柔軟、容易變形。','合適鋼材與熱處理能兼顧硬度與韌性；不是含碳越多越適合做刀。','比較材料要控制刀形與施力條件；彎折試驗觀察變形、斷裂，不能直接當作硬度測量。'],
 A:['氧化不一定有火焰：木炭燃燒、鐵生鏽、呼吸作用及光合作用都包含氧化。','生物反應同時有氧化與還原；光合作用是水被氧化、CO₂ 被還原，不能只用有沒有吸收氧氣來判斷。','冰融化只改變狀態，沒有改變物質種類，是物理變化。'],
 B:['對氧活性比較元素與氧結合的傾向；本組排序是 Mg ＞ C ＞ Fe ＞ Cu。','活性較大的元素，能在合適條件下使較小者的氧化物失氧；不能只看加熱或顏色判定。'],
 C:['氧化與還原同時發生；一方得到氧，另一方失去氧。','2Mg + CO₂ → 2MgO + C：鎂得氧被氧化，是還原劑；CO₂ 失氧被還原，是氧化劑。'],
 D:['光合作用：水被氧化並釋出氧氣，CO₂ 被還原並用來合成糖；有氧呼吸：葡萄糖被氧化，氧氣被還原成水。','本課漂白模型中，過氧化氫、次氯酸鈉使色素氧化，自己被還原；二氧化硫使色素還原，自己被氧化。','維生素 C 可先被氧化，延緩食物氧化；保護會消耗，也不等於殺菌或永久保鮮。'],
 end:['氧化是生命活動的一部分；活性氧過多、超過身體防禦能力時，可能造成氧化壓力。','維生素 C、E 在發揮還原作用時，自己也會被氧化；抗氧化不是把所有氧拿走。','化學上的抗氧化作用，不等於已證實能延緩人體老化；白藜蘆醇等成分仍要看人體研究證據。']
};
export function notebookMarkup(key){return `<aside class="kui-notebook" aria-label="小葵的筆記"><header><span class="story-portrait story-portrait--kui" data-expression="thinking" aria-hidden="true"></span><div><small>這個單元，我記住了</small><h3>小葵的筆記</h3></div></header><ul>${notes[key].map(line=>`<li>${line}</li>`).join('')}</ul></aside>`;}
export function bridgeMarkup(c){
 const dialogue={1:[['kui','「氧化是什麼？」'],['grandpa','「先認識物質與氧結合這件事，再到實驗箱觀察。」']],2:[['kui','「氧能不能換個夥伴？」'],['grandpa','「沿用活性紀錄，拿不同材料和氧化鐵比較，看看誰能把氧帶走。」']],3:[['grandpa','「高爐常用的幫手是 CO。它已經含有氧，還能再取得氧嗎？」']],4:[['grandpa','「鐵的去向清楚了。接著用高爐模型看看：熱和 CO 從哪裡來，雜質又怎麼處理？」']],5:[['kui','「終於有了生鐵，可以立刻鍛劍了嗎？」'],['grandpa','「先試刀材。有的會裂，有的彎了就回不來。」']]};
 return dialogue[c.id]?`<div class="story-dialogue dialogue-stack">${dialogue[c.id].map(([who,line])=>storySpeech(who,line)).join('')}</div>`:`<p>${c.bridge}</p>`;
}
