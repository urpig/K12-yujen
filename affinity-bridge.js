const links={
 3:{title:'誰較容易得到氧？先比較，再預測',chain:['活性大的元素','→','得到氧 · 被氧化','｜','金屬氧化物失氧 · 被還原'],text:'元素與氧化物要分開看：對氧活性大的元素較容易得氧，自己被氧化；活性較小金屬的氧化物則可能失氧、被還原。先把這條線索用在六種材料與氧化鐵的比較。',next:'先預測每種材料能不能帶走氧化鐵的氧，完成六次觀察後，再用氧化銅做對照。'},
 4:{title:'CO 已經有氧，為什麼還能還原鐵？',chain:['氧化鐵的氧','→','CO','→','CO₂'],text:'01 的線索是 C ＞ Fe：碳對氧活性比鐵大。高爐中，碳參與生成 CO；在合適高溫與 CO／CO₂ 比例下，CO 接氧變成 CO₂ 的反應，能使鐵的氧化物失氧。',next:'拖一份 CO 試試看：CO 多接一個氧，自己被氧化；氧化鐵同時被還原。'},
 5:{title:'把活性線索，放進整座高爐',chain:['焦炭中的碳','→','產生 CO','→','接氧成 CO₂'],text:'碳比鐵更容易與氧結合，是選用碳材的線索。焦炭提供熱，也參與生成 CO；在合適的爐內條件下，CO 接走鐵礦中的氧，鐵才被還原出來。',next:'留意第 3、4 步：先生成 CO，再由 CO 還原鐵礦。石灰石的工作是除雜。'}
};
export function affinityBridge(id){const d=links[id];return d?`<aside class="affinity-bridge" aria-label="對氧活性與還原能力"><small>沿用 01 的活性線索</small><h3>${d.title}</h3><div class="affinity-chain">${d.chain.map((x,i)=>i%2?`<i aria-hidden="true">${x}</i>`:`<b>${x}</b>`).join('')}</div><p>${d.text}</p><p class="affinity-next">${d.next}</p><small>CO 是化合物，不列入元素活性表；能否還原也取決於溫度與氣體組成。</small></aside>`:'';}
