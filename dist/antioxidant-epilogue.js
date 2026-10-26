const speech=(who,expression,text)=>`<div class="story-speech story-speech--${who}"><span class="story-portrait story-portrait--${who}" data-expression="${expression}" aria-hidden="true"></span><p><b>${who==='kui'?'小葵':'阿公'}</b>${text}</p></div>`;
function foodIllustration(kind){
 const fruit=kind==='C'?`<ellipse cx="110" cy="118" rx="69" ry="7" fill="#596244" opacity=".12"/><circle cx="83" cy="72" r="43" fill="#b6b96a"/><path d="M80 28Q105 10 122 27Q101 43 80 28" fill="#728b50"/><circle cx="130" cy="83" r="40" fill="#eab75e" stroke="#c79d51" stroke-width="2"/><circle cx="130" cy="83" r="33" fill="#fbefd0"/>${Array.from({length:8},(_,i)=>`<path d="M130 83L${130+29*Math.cos(i*Math.PI/4)} ${83+29*Math.sin(i*Math.PI/4)}A29 29 0 0 1 ${130+29*Math.cos((i+1)*Math.PI/4)} ${83+29*Math.sin((i+1)*Math.PI/4)}Z" fill="#eac16b" stroke="#fff2cd" stroke-width="2"/>`).join('')}`:
 kind==='E'?`<ellipse cx="111" cy="118" rx="67" ry="7" fill="#6a5940" opacity=".12"/><path d="M56 101Q36 64 73 36Q99 74 56 101" fill="#b58957" stroke="#8e6844" stroke-width="2"/><path d="M58 94L73 43M52 82L68 50M60 88L78 57" stroke="#d8b783" fill="none"/><path d="M113 113Q81 90 99 49Q138 66 113 113" fill="#c19760" stroke="#916e45" stroke-width="2"/><path d="M111 106L102 56M118 94L107 61" stroke="#e0bd83" fill="none"/><path d="M155 99Q129 64 162 32Q192 65 155 99" fill="#ad8052" stroke="#886441" stroke-width="2"/><path d="M156 91L162 40M149 81L158 47M165 79L166 49" stroke="#d3ae78" fill="none"/>`:
 `<ellipse cx="111" cy="119" rx="64" ry="7" fill="#5a4a59" opacity=".12"/><path d="M107 39Q111 18 132 13" stroke="#8a7951" stroke-width="5" fill="none"/><path d="M111 30Q78 5 60 26Q81 47 111 30" fill="#8a9e66"/>${[[83,48],[116,46],[146,53],[69,74],[101,73],[133,79],[87,100],[119,102],[103,122]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="18" fill="${i%2?'#77748e':'#8f829e'}" stroke="#6e6884" stroke-width="1.5"/><path d="M${x-9} ${y-4}Q${x-5} ${y-13} ${x+2} ${y-11}" stroke="#c7b9cd" stroke-width="2" fill="none" opacity=".75"/>`).join('')}`;
 return `<svg viewBox="0 0 220 146" role="img" aria-label="${kind==='C'?'柑橘水果的示意':kind==='E'?'杏仁等堅果的示意':'葡萄皮含白藜蘆醇，葡萄的示意'}">${fruit}</svg>`;
}
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
 <article class="antioxidant-note"><figure>${foodIllustration('C')}</figure><div class="antioxidant-note-body"><small>WATER · 水溶性</small><h3>維生素 C</h3><h4>在含水環境中支援</h4><p>能提供電子，參與對抗部分自由基；也能幫助再生維生素 E 等其他抗氧化物，參與細胞的保護。</p><p class="antioxidant-food">食物線索：柑橘、奇異果、甜椒。</p><a href="https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 C 的作用 ↗</a></div></article>
 <article class="antioxidant-note"><figure>${foodIllustration('E')}</figure><div class="antioxidant-note-body"><small>LIPID · 脂溶性</small><h3>維生素 E</h3><h4>在脂質環境中保護</h4><p>能幫忙中斷脂質氧化的連鎖反應，保護細胞膜等含脂質的部分，減少氧化造成的傷害。</p><p class="antioxidant-food">食物線索：堅果、種子、植物油。</p><a href="https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 E 的作用 ↗</a></div></article>
 <article class="antioxidant-note"><figure>${foodIllustration('R')}</figure><div class="antioxidant-note-body"><small>POLYPHENOL · 植物多酚</small><h3>白藜蘆醇</h3><h4>作用仍要看研究證據</h4><p>試管、細胞研究中可見抗氧化等作用；人體攝入後會快速代謝，不能直接推論能延緩人體老化或延長壽命。</p><p class="antioxidant-food">食物線索：葡萄皮、花生等。</p><a href="https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" target="_blank" rel="noopener">OSU：白藜蘆醇的研究限制 ↗</a></div></article>
 </div>
 <div class="epilogue-redox-link"><b>把這一課的觀念接回來</b><p>像維生素 C、E 在發揮還原作用時，自己也會被氧化；體內還有讓部分抗氧化物再生的機制。抗氧化保護是彼此配合的過程，不能只用「把氧全部拿走」來理解。</p></div>
 <div class="epilogue-dialogue epilogue-closing">
 ${speech('kui','excited','「原來是幫忙保護細胞，不是把阿公變回小孩！那我多吃好多抗氧化劑，也不能讓你返老還童？」')}
 ${speech('grandpa','encourage','「對啦！<strong>有抗氧化作用，不代表吃越多越好，也不保證抗老。</strong>再說，沒有細胞呼吸提供能量，我哪來力氣陪你穿越、打鐵呀？」')}
 </div><p class="epilogue-endnote">小葵笑著補上一筆：<br>「氧化不全是壞事。看懂作用，也要看懂證據。」</p>
 <details class="epilogue-sources"><summary>阿公這段話的科學依據</summary><p>這是生物與營養的概念延伸。圖中的食物只舉例來源，沒有比較含量。成分具有化學作用，與補充後能否帶來人體健康效益，需要分別看證據。</p><ul><li><a href="https://www.nccih.nih.gov/health/antioxidant-supplements-what-you-need-to-know" target="_blank" rel="noopener">NCCIH：正常活性氧、身體防禦與抗氧化補充劑</a></li><li><a href="https://www.medlineplus.gov/ency/article/004012.htm" target="_blank" rel="noopener">MedlinePlus：老化是複雜的過程</a></li><li><a href="https://ods.od.nih.gov/factsheets/VitaminC-Consumer/" target="_blank" rel="noopener">NIH：維生素 C 與食物來源</a></li><li><a href="https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/" target="_blank" rel="noopener">NIH：維生素 E 與食物來源</a></li><li><a href="https://lpi.oregonstate.edu/mic/dietary-factors/phytochemicals/resveratrol" target="_blank" rel="noopener">OSU：白藜蘆醇的體外作用與人體證據</a></li></ul></details></div>
 <footer class="chapter-footer"><a class="previous" href="#card-6">← 回看刀材的比較</a><span>小葵與阿公的鍛造筆記 · 完</span><a class="next" href="#card-1">回到故事起點 <b>↑</b></a></footer>`;
 lesson.append(section);return section;
}
