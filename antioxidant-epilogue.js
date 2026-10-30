import {storySpeech} from './story-dialogue.js';
const speech=(who,expression,text)=>storySpeech(who,text,expression);
function foodPhoto(kind){const names={C:'整顆柳橙與切開果肉的實拍照片',E:'帶殼杏仁的實拍照片',R:'一串紫葡萄的實拍照片'};return `<span class="antioxidant-food-photo food-photo-${kind}" role="img" aria-label="${names[kind]}"></span>`;}
export function mountAntioxidantEpilogue(lesson){
 const section=document.createElement('section');section.id='epilogue-antioxidants';section.className='exploration-card antioxidant-epilogue';section.tabIndex=-1;section.setAttribute('aria-labelledby','epilogue-title');
 section.innerHTML=`<header class="chapter-header"><div class="chapter-kicker"><span>回家後的小問題</span><span>故事尾聲</span></div><h2 id="epilogue-title">「阿公，你也是被氧化了嗎？」</h2></header>
 <div class="chapter-body"><p class="epilogue-intro">寶劍完成了，兩人取回時空裝置，回到熟悉的實驗室。</p>
 <div class="epilogue-dialogue" aria-label="小葵與阿公的回家對話">
 ${speech('kui','curious','「阿公，呼吸作用會氧化養分，那你這麼老，也是被氧化了嗎？」')}
 ${speech('grandpa','gentle','「哈哈，你這臭小孩！氧化壓力可能傷害細胞，但老化不只這個原因。<strong>抗氧化劑能幫忙減少氧化傷害，卻不是返老還童的魔法。</strong>」')}
 </div>
 <div class="antioxidant-notes" aria-label="三種抗氧化劑的重點">
 <article class="antioxidant-note"><figure>${foodPhoto('C')}</figure><div class="antioxidant-note-body"><h3>維生素 C</h3><p><strong>水溶性</strong>，能提供電子，幫助保護細胞。</p></div></article>
 <article class="antioxidant-note"><figure>${foodPhoto('E')}</figure><div class="antioxidant-note-body"><h3>維生素 E</h3><p><strong>脂溶性</strong>，幫助保護細胞膜，減少脂質氧化。</p></div></article>
 <article class="antioxidant-note"><figure>${foodPhoto('R')}</figure><div class="antioxidant-note-body"><h3>白藜蘆醇</h3><p>葡萄皮等含有的<strong>植物多酚</strong>；有體外抗氧化研究，不能直接當成人體抗老效果。</p></div></article>
 </div>
 <div class="epilogue-redox-link"><b>記住這一點</b><p>維生素 C、E 發揮還原作用時，<strong>自己也會被氧化</strong>。氧化與還原，仍然一起發生。</p></div>
 <details class="epilogue-sources epilogue-photo-credits"><summary>食物照片來源</summary><p>柑橘：<a href="https://commons.wikimedia.org/wiki/File:Orange-Fruit-Pieces.jpg" target="_blank" rel="noopener">Evan-Amos</a>；杏仁：<a href="https://commons.wikimedia.org/wiki/File:Almonds_1.jpg" target="_blank" rel="noopener">David R. Tribble（Loadmaster）</a>。兩張照片採 <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>，依版面縮放、裁切顯示。葡萄：<a href="https://commons.wikimedia.org/wiki/File:USDA_Eat_Healthy_Food_Group_Gallery_serving_size_medium_bunch_purple_grapes.jpg" target="_blank" rel="noopener">USDA，公有領域</a>。照片僅舉例食物來源。</p></details>
 <details class="epilogue-sources"><summary>阿公這段話的科學依據</summary><p>這是生物與營養的概念延伸。圖中的食物只舉例來源，沒有比較含量。成分具有化學作用，與補充後能否帶來人體健康效益，需要分別看證據。</p><ul><li><a href="https://www.nccih.nih.gov/health/antioxidant-supplements-what-you-need-to-know" target="_blank" rel="noopener">NCCIH：正常活性氧、身體防禦與抗氧化補充劑</a></li><li><a href="https://www.medlineplus.gov/ency/article/004012.htm" target="_blank" rel="noopener">MedlinePlus：老化是複雜的過程</a></li><li><a href="https://ods.od.nih.gov/factsheets/VitaminC-Consumer/" target="_blank" rel="noopener">NIH：維生素 C 與食物來源</a></li><li><a href="https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 E 與食物來源</a></li><li><a href="https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" target="_blank" rel="noopener">OSU：白藜蘆醇的體外作用與人體證據</a></li></ul></details></div>
 <footer class="chapter-footer"><a class="previous" href="#card-6">← 回看刀材的比較</a><span>小葵的筆記 · 完</span><a class="next" href="#card-1">回到故事起點 <b>↑</b></a></footer>`;
 lesson.append(section);return section;
}
