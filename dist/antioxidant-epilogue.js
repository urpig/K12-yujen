import {storySpeech,notebookMarkup} from './story-dialogue.js';
const speech=(who,expression,text)=>storySpeech(who,text,expression);
function foodPhoto(kind){const names={C:'整顆柳橙與切開果肉的實拍照片',E:'帶殼杏仁的實拍照片',R:'一串紫葡萄的實拍照片'};return `<span class="antioxidant-food-photo food-photo-${kind}" role="img" aria-label="${names[kind]}"></span>`;}
export function mountAntioxidantEpilogue(lesson){
 const section=document.createElement('section');section.id='epilogue-antioxidants';section.className='exploration-card antioxidant-epilogue';section.tabIndex=-1;section.setAttribute('aria-labelledby','epilogue-title');
 section.innerHTML=`<header class="chapter-header"><div class="chapter-kicker"><span>回家後的小問題</span><span>故事尾聲 · 把氧化還原帶回生活</span></div><h2 id="epilogue-title">「阿公，你也是被氧化了嗎？」</h2><p class="core-question">從細胞呼吸的小玩笑，認識身體裡的抗氧化保護。</p></header>
 <div class="chapter-body"><p class="epilogue-intro">兩人獻上寶劍，皇帝歸還時空裝置。回到熟悉的實驗室，小葵翻開「細胞呼吸」那一頁，突然抬頭看著阿公。</p>
 <div class="epilogue-dialogue" aria-label="小葵與阿公的回家對話">
 ${speech('kui','curious','「阿公，細胞呼吸作用會氧化養分……那你這麼老，也是被氧化了嗎？」')}
 ${speech('grandpa','gentle','「哈哈哈，你這臭小孩！<span class="epilogue-joke">是有關係啦，但可不能把老化全算在氧化頭上。</span>阿公可不是一把生鏽的鐵劍！」')}
 ${speech('grandpa','mentor','「細胞靠呼吸作用把養分中的能量釋放出來，這是活著需要的工作。身體正常活動也會產生<strong>活性氧</strong>；它們有些還參與細胞傳遞訊息，可不是全都該消滅。」')}
 </div>
 <aside class="epilogue-science" aria-label="阿公補充：氧化壓力與老化"><h3>當活性氧太多，保護跟不上</h3><p>活性氧是一群反應活躍的含氧物質，其中有些是自由基。當它們過多，超過身體防禦、調節與修復的能力，就可能造成<strong>氧化壓力</strong>，傷害細胞。</p><p>氧化壓力可能參與老化；但老化也和遺傳、細胞修復、環境等許多因素有關。<strong>「有關」不等於「全部都由它造成」。</strong> <a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/oxidative-stress" target="_blank" rel="noopener">資料依據 ↗</a></p></aside>
 <div class="epilogue-dialogue">
 ${speech('kui','wonder','「那維生素 C、E，還有白藜蘆醇，這些抗氧化劑是來保護阿公的嗎？」')}
 ${speech('grandpa','idea','「身體本來就有抗氧化酵素等保護系統。有些食物成分也能參與幫忙，但要分清楚：<strong>在哪裡作用、能做什麼，還有人體研究支持到哪裡。</strong>」')}
 </div>
 <div class="antioxidant-notes" aria-label="維生素C、維生素E與白藜蘆醇的比較">
 <article class="antioxidant-note"><figure>${foodPhoto('C')}</figure><div class="antioxidant-note-body"><small>WATER · 水溶性</small><h3>維生素 C</h3><h4>在含水環境中支援</h4><p>能提供電子，參與對抗部分自由基；也能幫助再生維生素 E 等其他抗氧化物，參與細胞的保護。</p><p class="antioxidant-food">食物線索：柑橘、奇異果、甜椒。</p><a href="https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 C 的作用 ↗</a></div></article>
 <article class="antioxidant-note"><figure>${foodPhoto('E')}</figure><div class="antioxidant-note-body"><small>LIPID · 脂溶性</small><h3>維生素 E</h3><h4>在脂質環境中保護</h4><p>能幫忙中斷脂質氧化的連鎖反應，保護細胞膜等含脂質的部分，減少氧化造成的傷害。</p><p class="antioxidant-food">食物線索：堅果、種子、植物油。</p><a href="https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 E 的作用 ↗</a></div></article>
 <article class="antioxidant-note"><figure>${foodPhoto('R')}</figure><div class="antioxidant-note-body"><small>POLYPHENOL · 植物多酚</small><h3>白藜蘆醇</h3><h4>作用仍要看研究證據</h4><p>試管、細胞研究中可見抗氧化等作用；人體攝入後會快速代謝，不能直接推論能延緩人體老化或延長壽命。</p><p class="antioxidant-food">食物線索：葡萄皮、花生等。</p><a href="https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" target="_blank" rel="noopener">OSU：白藜蘆醇的研究限制 ↗</a></div></article>
 </div>
 <div class="epilogue-redox-link"><b>把這一課的觀念接回來</b><p>像維生素 C、E 在發揮還原作用時，自己也會被氧化；體內還有讓部分抗氧化物再生的機制。抗氧化保護是彼此配合的過程，不能只用「把氧全部拿走」來理解。</p></div>
 <div class="epilogue-dialogue epilogue-closing">
 ${speech('kui','excited','「原來是幫忙保護細胞，不是把阿公變回小孩！那我多吃好多抗氧化劑，也不能讓你返老還童？」')}
 ${speech('grandpa','encourage','「對啦！<strong>有抗氧化作用，不代表吃越多越好，也不保證抗老。</strong>再說，沒有細胞呼吸提供能量，我哪來力氣陪你穿越、打鐵呀？」')}
 </div>${speech('kui','thinking','「氧化不全是壞事。看懂作用，也要看懂證據。」')}${notebookMarkup('end')}
 <details class="epilogue-sources epilogue-photo-credits"><summary>食物照片來源</summary><p>柑橘：<a href="https://commons.wikimedia.org/wiki/File:Orange-Fruit-Pieces.jpg" target="_blank" rel="noopener">Evan-Amos</a>；杏仁：<a href="https://commons.wikimedia.org/wiki/File:Almonds_1.jpg" target="_blank" rel="noopener">David R. Tribble（Loadmaster）</a>。兩張照片採 <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC BY-SA 3.0</a>，依版面縮放、裁切顯示。葡萄：<a href="https://commons.wikimedia.org/wiki/File:USDA_Eat_Healthy_Food_Group_Gallery_serving_size_medium_bunch_purple_grapes.jpg" target="_blank" rel="noopener">USDA，公有領域</a>。照片僅舉例食物來源。</p></details>
 <details class="epilogue-sources"><summary>阿公這段話的科學依據</summary><p>這是生物與營養的概念延伸。圖中的食物只舉例來源，沒有比較含量。成分具有化學作用，與補充後能否帶來人體健康效益，需要分別看證據。</p><ul><li><a href="https://www.nccih.nih.gov/health/antioxidant-supplements-what-you-need-to-know" target="_blank" rel="noopener">NCCIH：正常活性氧、身體防禦與抗氧化補充劑</a></li><li><a href="https://www.medlineplus.gov/ency/article/004012.htm" target="_blank" rel="noopener">MedlinePlus：老化是複雜的過程</a></li><li><a href="https://ods.od.nih.gov/factsheets/VitaminC-Consumer/" target="_blank" rel="noopener">NIH：維生素 C 與食物來源</a></li><li><a href="https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 E 與食物來源</a></li><li><a href="https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" target="_blank" rel="noopener">OSU：白藜蘆醇的體外作用與人體證據</a></li></ul></details></div>
 <footer class="chapter-footer"><a class="previous" href="#card-6">← 回看刀材的比較</a><span>小葵的筆記 · 完</span><a class="next" href="#card-1">回到故事起點 <b>↑</b></a></footer>`;
 lesson.append(section);return section;
}
