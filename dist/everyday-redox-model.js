export const lifeBiology={
 photo:{name:'光合作用',place:'葉綠體',equation:'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',energy:'光能 → 儲存在有機物中的化學能',condition:'光照、葉綠素參與',paths:[{from:'二氧化碳 CO₂',to:'葡萄糖 C₆H₁₂O₆',role:'reduction'},{from:'水 H₂O',to:'氧氣 O₂',role:'oxidation'}],reason:'水被氧化、二氧化碳被還原。光合作用放出的氧氣來自水；放出氧氣的反應也有氧化！'},
 resp:{name:'有氧呼吸',place:'細胞',equation:'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O',energy:'養分中的化學能 → 細胞可利用的能量與熱',condition:'細胞內多步進行，不需火焰',paths:[{from:'葡萄糖 C₆H₁₂O₆',to:'二氧化碳 CO₂',role:'oxidation'},{from:'氧氣 O₂',to:'水 H₂O',role:'reduction'}],reason:'葡萄糖被氧化、氧氣被還原成水。細胞把養分中的能量分步釋出；植物與動物都進行呼吸作用。'}
};
export const lifeBleaches={
 peroxide:{name:'過氧化氫',formula:'H₂O₂',kind:'氧系漂白',role:'reduction',dye:'色素被氧化',reason:'在這類漂白中，過氧化氫使色素被氧化，自己被還原，因此扮演氧化劑。'},
 chlorine:{name:'次氯酸鈉',formula:'NaClO',kind:'含氯漂白',role:'reduction',dye:'色素被氧化',reason:'次氯酸鈉在這類漂白中是氧化劑：讓色素被氧化，自己被還原。'},
 sulfur:{name:'二氧化硫',formula:'SO₂',kind:'還原漂白',role:'oxidation',dye:'色素被還原',reason:'二氧化硫可使某些有色物質被還原而褪色，自己被氧化，因此扮演還原劑。'}
};
export const lifeEvidence=['photo','resp','peroxide','chlorine','sulfur','food'];
export const lifeQuiz={question:'小葵想整理「日常生活中的氧化還原」，哪一句最合理？',options:['光合作用放出氧氣，所以只有還原、沒有氧化。','漂白劑使衣物褪色，所以所有漂白劑都被還原。','維生素 C 可先被氧化，延緩食物氧化；它的保護作用有限。','加了抗氧化劑，就能永久保鮮，也不必留意微生物。'],answer:2,reason:'正確答案是 C。維生素 C 在抗氧化過程中會被消耗，不能永久保護食物。光合作用同時有氧化與還原；漂白可走氧化或還原路徑，不能只憑褪色判斷。抗氧化也不等於殺菌。'};
export function freshLife(){return {tab:0,bio:'photo',bleach:'peroxide',time:0,seen:[],evidence:[],answer:null};}
export function lifeReady(s){return lifeEvidence.every(k=>s.evidence.includes(k));}
export function lifeMastered(s){return lifeReady(s)&&s.answer===lifeQuiz.answer;}
export function restoreLife(raw){const s=freshLife();if(!raw||typeof raw!=='object')return s;
 if([0,1,2].includes(raw.tab))s.tab=raw.tab;if(Object.hasOwn(lifeBiology,raw.bio))s.bio=raw.bio;if(Object.hasOwn(lifeBleaches,raw.bleach))s.bleach=raw.bleach;
 if(Number.isFinite(raw.time))s.time=Math.max(0,Math.min(4,Math.round(raw.time)));
 s.seen=[...new Set((Array.isArray(raw.seen)?raw.seen:[]).filter(k=>(Object.hasOwn(lifeBleaches,k)||Object.hasOwn(lifeBiology,k))))];
 s.evidence=[...new Set((Array.isArray(raw.evidence)?raw.evidence:[]).filter(k=>lifeEvidence.includes(k)))];
 if(lifeReady(s)&&[0,1,2,3].includes(raw.answer))s.answer=raw.answer;return s;
}
export function lifeRecord(s,key,role){
 let correct=false;
 if(Object.hasOwn(lifeBiology,key))correct=(s.seen.includes(key)||s.evidence.includes(key))&&role==='oxidation';
 else if(Object.hasOwn(lifeBleaches,key))correct=s.seen.includes(key)&&role===lifeBleaches[key].role;
 else if(key==='food')correct=s.time>=3&&role==='oxidation';
 if(correct&&!s.evidence.includes(key))s.evidence.push(key);return correct;
}
export function appleComparison(time){const t=Number.isFinite(time)?Math.max(0,Math.min(4,time)):0,i=Math.floor(t),blend=values=>values[i]+((values[Math.min(4,i+1)]-values[i])*(t-i));return {plain:blend([0,.24,.52,.8,1]),protected:blend([0,.01,.04,.12,.46]),reserve:Math.max(0,1-t/3)};}
