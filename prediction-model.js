export const predictionQuestions={
 'main-1':{question:'把赤鐵礦敲碎、再磨細，能直接得到可鍛造的金屬鐵嗎？',choices:['能，鐵原本藏在石頭裡，磨細就會出來。','不能，還需要讓礦石裡的物質發生化學變化。','只要加水，金屬鐵就會分離出來。','我還不確定，想先觀察礦石。']},
 'prep-0':{question:'鐵釘沒有出現火焰，慢慢生鏽也算氧化嗎？',choices:['算，氧化可能慢慢進行。','不算，有火焰才算氧化。','只要外觀改變，都算氧化。','我還不確定，想比較四種現象。']},
 'prep-1':{question:'在合適條件下，碳能讓鐵的氧化物失去氧嗎？',choices:['可能，碳比鐵更容易和氧結合。','不能，碳自己不含鐵。','一定可以，而且所有金屬氧化物都一樣。','我還不確定，想找碳和鐵的位置。']},
 'prep-2':{question:'一個反應中，有物質被氧化時，另一邊會怎麼變？',choices:['只有一邊改變，另一邊完全不變。','另一邊同時被還原，兩邊成對改變。','看不見火焰，就不會有氧化還原。','我還不確定，想按反應鍵比較不同情境。']},
 'prep-3':{question:'葉子製造養分、衣物褪色、蘋果保鮮，也能找到成對的氧化與還原嗎？',choices:['能，每個反應都能追蹤一起改變的兩邊。','不能，日常生活中只有氧化，沒有還原。','只看顏色變淡，就能判定哪一種物質被還原。','我還不確定，想把反應物放在一起，觀察兩邊的變化。']},
 'life-0':{question:'葉片製造養分、細胞利用養分，這兩種過程都有氧化與還原嗎？',choices:['都有，兩邊都能找到成對的變化。','只有細胞利用養分時才有。','葉片放出氧氣，所以不會有氧化。','我還不確定，想比較兩種反應。']},
 'life-1':{question:'兩種物質都能讓色素變淡，能判定它們都以同一種方式漂白嗎？',choices:['能，結果一樣，反應方式就一樣。','不能，背後可能有不同的氧化還原方向。','只要變淡，就一定只有還原發生。','我還不確定，想看看電子的方向。']},
 'life-2':{question:'蘋果切面加了維生素 C，放久以後會怎樣？',choices:['永遠維持原色，氧化完全停止。','可能較慢變色，但保護作用會逐漸減弱。','一定比沒有加的蘋果更快變褐。','我還不確定，想比較相同時間的變化。']},
 'main-2':{question:'金屬和非金屬燃燒後，產物遇水的表現都一樣嗎？',choices:['都一樣，因為它們都和氧反應。','可能不同，要比較各種產物。','只要產物看不見，就不會留下任何線索。','我還不確定，想收集產物再用試紙比較。']},
 'main-3-affinity':{question:'碳、鋅、鉻、錫、鉛、銅遇上氧化鐵，都能把鐵還原出來嗎？',choices:['全部都能，只要加熱就好。','可能不同，要比較它們與鐵的對氧活性。','活性越小的元素，越容易把氧搶走。','我還不確定，想逐一預測並觀察。']},
 'main-3':{question:'同樣加熱氧化銅，加入碳和不加入碳會有差別嗎？',choices:['不會，只有溫度會影響結果。','可能，碳能參與反應，幫忙移走氧。','任何粉末加入後，都能讓銅出現。','我還不確定，想做有碳和無碳的對照。']},
 'main-4':{question:'CO 已經含有氧，還能再從氧化鐵接走氧嗎？',choices:['不能，CO 已經有氧，無法再改變。','可能，CO 還能變成另一種含氧物質。','能，但接到的氧會在途中消失。','我還不確定，想追蹤每一個原子。']},
 'main-5':{question:'爐中同時加入焦炭和石灰石，它們的工作相同嗎？',choices:['相同，都是把鐵礦直接變成鐵。','可能不同，一種幫助供熱與還原，一種幫助除雜。','石灰石能代替全部焦炭，不需要熱源。','我還不確定，想分別追蹤原料和出口。']},
 'main-6':{question:'外形一樣的生鐵、鋼與熟鐵刀，受力再放開後會一樣嗎？',choices:['一樣，外形相同，受力結果就相同。','可能不同，材料可能裂開、回彈或留下彎曲。','含碳越多，就一定越適合所有刀具。','我還不確定，想用相同方式比較。']},
 'main-7':{question:'同樣的鐵片放進乾燥、潮濕與完整塗油的環境，哪組較容易生鏽？',choices:['潮濕又能接觸氧的那組。','乾燥的那組，因為空氣更多。','三組都一樣，環境不影響生鏽。','我還不確定，想並排觀察三組。']}
};
export function predictionEntry(value,id){const q=predictionQuestions[id];if(!q||!value||!Number.isInteger(value.choice)||value.choice<0||value.choice>=q.choices.length)return null;return {choice:value.choice,reason:typeof value.reason==='string'?value.reason.slice(0,240):'',review:typeof value.review==='string'?value.review.slice(0,400):''};}
export function restorePredictions(raw){const out={};if(!raw||typeof raw!=='object')return out;for(const id of Object.keys(predictionQuestions)){const entry=predictionEntry(raw[id],id);if(entry)out[id]=entry;}return out;}
export function commitPrediction(records,id,choice,reason=''){if(records[id])return false;const entry=predictionEntry({choice,reason},id);if(!entry)return false;records[id]=entry;return true;}
export function clearPredictionRecord(records,id){delete records[id];}
export function escapePredictionText(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);}
