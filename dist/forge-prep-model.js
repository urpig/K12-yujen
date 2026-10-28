export const prepScenes=[
 {id:'burn',title:'木炭燃燒',tag:'爐火中的線索',kind:'fast',symbol:'C',detail:'碳與氧氣反應，生成二氧化碳。',equation:'C + O₂ → CO₂'},
 {id:'rust',title:'鐵釘生鏽',tag:'潮濕角落的線索',kind:'slow',symbol:'Fe',detail:'鐵在有氧與水的環境中逐漸生鏽；沒有火焰，也有氧化。',equation:'鐵 ＋ 氧氣 ＋ 水 → 鐵鏽（組成較複雜）'},
 {id:'breath',title:'呼吸作用及光合作用',tag:'細胞裡的線索',kind:'slow',symbol:'O₂',detail:'兩者都包含沒有火焰、由多步反應完成的氧化與還原，本活動歸在「緩慢的氧化」。有氧呼吸中，葡萄糖被氧化、氧氣被還原；光合作用中，水被氧化、二氧化碳被還原。這不是說光合作用整體只是氧化，也不是比較兩者的實際反應速度。',equation:'呼吸：葡萄糖被氧化，氧氣被還原成水。光合：水被氧化成氧氣，CO₂ 被還原並用來合成糖。'},
 {id:'ice',title:'冰塊融化',tag:'水碗旁的線索',kind:'physical',symbol:'H₂O',detail:'冰變成水，仍是 H₂O；這是狀態改變，不是氧化。',equation:'H₂O（固態） → H₂O（液態）'}
];
export const affinityOrder=['Mg','C','Fe','Cu'];
export const affinityNames={Mg:'鎂',C:'碳',Fe:'鐵',Cu:'銅'};
// The user's teaching sequence; ordinal positions are not numerical reactivities.
export const oxygenAffinitySeries=[['K','鉀'],['Na','鈉'],['Ca','鈣'],['Mg','鎂'],['Al','鋁'],['C','碳'],['Zn','鋅'],['Cr','鉻'],['Fe','鐵'],['Sn','錫'],['Pb','鉛'],['H','氫'],['Cu','銅'],['Hg','汞'],['Ag','銀'],['Pt','鉑'],['Au','金']].map(([symbol,name])=>({symbol,name}));
export function compareWithCarbon(symbol){
 const index=oxygenAffinitySeries.findIndex(x=>x.symbol===symbol),carbon=oxygenAffinitySeries.findIndex(x=>x.symbol==='C');
 return index<0?null:{...oxygenAffinitySeries[index],relation:index<carbon?'greater':index===carbon?'same':'less'};
}
export function ironOxygenLedger(pairs){
 const count=new Set((Array.isArray(pairs)?pairs:[]).filter(x=>Number.isInteger(x)&&x>=0&&x<3)).size;
 return {count,oxideOxygen:3-count,gasOxygen:3+count,carbonDioxide:count,total:{Fe:2,C:3,O:6}};
}
export const prepQuizzes=[
 {question:'哪個說法能解釋沒有火焰的生鏽？',options:['沒有火焰，就不算氧化','生鏽也涉及鐵與氧結合，只是進行較慢','冰含有氧，所以融冰就是氧化'],answer:1,reason:'生鏽是較緩慢的氧化；判斷要看化學變化，不能只看火焰或物質名稱裡有沒有氧。'},
 {question:'為什麼碳可以用來還原鐵，卻不能照樣用來提煉鎂？',options:['碳對氧活性比鐵大、比鎂小；還原仍需要合適條件','只要溫度夠高，碳就能還原所有金屬氧化物','因為碳是金屬，而且比鐵重'],answer:0,reason:'本課排列為 Mg ＞ C ＞ Fe。碳較能與氧結合，可在合適高溫條件下使鐵的氧化物失氧；MgO 較難把氧交給碳。高爐中，碳還會生成 CO，由 CO 帶走鐵礦中的氧。'},
 {question:'追蹤同一批氧後，哪個說法正確？',options:['氧化物失去氧，氧就消失了','只有失氧的一方反應，得氧的一方沒有變化','得氧的一方被氧化，失氧的一方被還原；兩者同時發生'],answer:2,reason:'在這裡的氧轉移反應中，氧離開一方，也同時與另一方結合。氧化必定伴隨還原，還原也必定伴隨氧化；更一般的判斷是失去電子與得到電子必須配對。'}
];
export function freshPrep(){return {version:3,tab:0,sorted:[],order:[],moved:[],targets:[],ironPairs:[],reaction:'magnesium',referenceElement:'Fe',answers:[null,null,null]};}
export function restorePrep(raw){
 const s=freshPrep();if(!raw||typeof raw!=='object')return s;
 s.tab=Number.isInteger(raw.tab)&&raw.tab>=0&&raw.tab<4?raw.tab:0;
 s.sorted=[...new Set(Array.isArray(raw.sorted)?raw.sorted:[])].filter(id=>prepScenes.some(x=>x.id===id));
 s.order=[...new Set(Array.isArray(raw.order)?raw.order:[])].filter(id=>affinityOrder.includes(id)).slice(0,4);
 s.moved=[...new Set(Array.isArray(raw.moved)?raw.moved:[])].filter(id=>id===0||id===1);
 s.targets=[...new Set(Array.isArray(raw.targets)?raw.targets:s.moved)].filter(id=>id===0||id===1).slice(0,s.moved.length);if(s.targets.length!==s.moved.length)s.targets=[...s.moved];
 s.ironPairs=[...new Set(Array.isArray(raw.ironPairs)?raw.ironPairs:[])].filter(id=>Number.isInteger(id)&&id>=0&&id<3);
 s.reaction=['magnesium','biology','bleach','food'].includes(raw.reaction)?raw.reaction:'magnesium';
 // Move the old C life selection to D, without changing evidence or quiz answers.
 if(raw.version!==3&&s.tab===2&&s.reaction!=='magnesium')s.tab=3;
 s.referenceElement=compareWithCarbon(raw.referenceElement)?raw.referenceElement:'Fe';
 // Preserve previous observations; revised B/C questions need a fresh answer.
 s.answers=s.answers.map((_,i)=>(i===0||[2,3].includes(raw.version))&&prepReady(s,i)&&Number.isInteger(raw.answers?.[i])&&raw.answers[i]>=0&&raw.answers[i]<3?raw.answers[i]:null);return s;
}
export function prepReady(s,i){return i===0?s.sorted.length===4:i===1?s.order.length===4&&s.order.every((v,j)=>v===affinityOrder[j]):i===2&&s.moved.length===2;}
export function prepMastered(s,i){return prepReady(s,i)&&s.answers[i]===prepQuizzes[i].answer;}
export function checkAffinity(order){return order.length===4&&order.every((v,i)=>v===affinityOrder[i]);}
export function ironAppearanceStage(n){const count=Number.isFinite(n)?Math.max(0,Math.min(3,Math.floor(n))):0;return {count,fraction:count/3,label:['氧化鐵 · 紅棕色','還原進行中 · 觀察外觀改變','還原持續 · 氧逐步離開','金屬鐵 · 灰黑、多孔'][count],description:['先把上方的 CO 拖入反應區，觀察這份樣本。','樣本的外觀隨還原而改變；還沒有全部成為金屬鐵。','還原繼續進行。畫面的灰色範圍只表示進度，不是成分比例。','留下的是多孔的固態鐵示意，還不是亮晶晶的寶劍，也不是熔融鐵水。'][count]};}
