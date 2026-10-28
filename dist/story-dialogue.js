export function storySpeech(who,text,expression=who==='kui'?'curious':'gentle'){
 return `<div class="story-speech story-speech--${who}"><span class="story-portrait story-portrait--${who}" data-expression="${expression}" aria-hidden="true"></span><p><b>${({kui:'小葵',grandpa:'阿公',emperor:'皇上'})[who]}</b>${text}</p></div>`;
}
export function definitionDialogue(){return `<section class="prep-definitions" aria-labelledby="prep-definitions-title"><small>先聽小葵問，再跟阿公找答案</small><h3 id="prep-definitions-title">氧化、還原、活性：誰改變，誰讓它改變？</h3><div class="story-dialogue dialogue-stack">${[
 ['kui','「氧化和還原，到底是什麼？」'],
 ['grandpa','「先追蹤氧：<strong>物質得到氧，是氧化；氧化物失去氧，是還原。</strong>例如鐵與氧結合成氧化鐵，鐵被氧化；氧化鐵失去氧、留下金屬鐵，則是氧化鐵被還原。」'],
 ['kui','「那誰比較容易把氧拿走？這就是活性嗎？」'],
 ['grandpa','「<strong>對氧活性，是元素與氧結合的傾向。</strong>活性較大，通常較容易得到氧；能不能從另一種氧化物取氧，還要比較兩者，並看溫度等反應條件。」'],
 ['kui','「氧化劑和還原劑，是看自己變成什麼嗎？」'],
 ['grandpa','「名字要看它讓對方做什麼！<strong>氧化劑使別的物質氧化，自己被還原；還原劑使別的物質還原，自己被氧化。</strong>木炭燃燒時，氧氣使碳氧化，氧氣是氧化劑。煉鐵時，CO 使氧化鐵失氧，自己變成 CO₂，所以 CO 是還原劑。」'],
 ['grandpa','「更一般地說，<strong>失去電子是氧化，得到電子是還原</strong>，兩者同時發生。氧化劑接受電子，還原劑提供電子；角色要依這一次反應判斷。」']
 ].map(([who,line])=>storySpeech(who,line)).join('')}</div></section>`;}
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
