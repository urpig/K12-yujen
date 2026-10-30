export const biologyStages={
 photo:[{id:'water',label:'水 H₂O',name:'光反應',instruction:'先把水放進葉綠體，觀察水的裂解。',running:'在光照下，水被氧化，形成氧氣並排出。',done:'水被氧化，O₂ 已排出。接著加入 CO₂，看看碳反應如何製造養分。'},
 {id:'co2',label:'二氧化碳 CO₂',name:'碳反應',instruction:'把 CO₂ 放進葉綠體的碳反應區。',running:'二氧化碳參與碳反應，被還原並逐步形成糖。',done:'CO₂ 被還原成三碳糖，再用來合成葡萄糖等養分。水被氧化、CO₂ 被還原，是相連的整體過程。'}],
 resp:[{id:'glucose',label:'葡萄糖 C₆H₁₂O₆',name:'追蹤養分',instruction:'先加入葡萄糖，追蹤養分分解與 CO₂ 的去向。',running:'葡萄糖被氧化，形成二氧化碳並釋放能量。',done:'葡萄糖被氧化，形成 CO₂。接著加入氧氣，看看氧氣變成什麼。'},
 {id:'oxygen',label:'氧氣 O₂',name:'追蹤氧氣',instruction:'加入氧氣，觀察形成的產物。',running:'氧氣參與有氧呼吸，被還原成水。',done:'葡萄糖被氧化成二氧化碳，氧氣被還原成水；有氧呼吸同時釋放能量。'}]
};
export function freshBiology(key,complete=false){if(!biologyStages[key])throw Error('Unknown biology scene');return {key,step:complete?2:0,phase:complete?'complete':'ready'};}
export function addBiologyReactant(s,id){if(s.phase!=='ready'||biologyStages[s.key][s.step]?.id!==id)return false;s.phase='running';return true;}
export function finishBiologyStage(s){if(s.phase!=='running')return false;s.step++;s.phase=s.step===2?'complete':'ready';return true;}