export const biologyStages={
 photo:[{id:'water',label:'水 H₂O',name:'追蹤水',instruction:'先加入水，看看誰被氧化。',running:'水被氧化，形成氧氣。',done:'水被氧化。接著加入二氧化碳。'},
 {id:'co2',label:'二氧化碳 CO₂',name:'追蹤二氧化碳',instruction:'把二氧化碳放進葉綠體。',running:'二氧化碳被還原。',done:'光合作用：水被氧化，二氧化碳被還原。'}],
 resp:[{id:'glucose',label:'葡萄糖 C₆H₁₂O₆',name:'追蹤養分',instruction:'先加入葡萄糖，追蹤養分分解與 CO₂ 的去向。',running:'葡萄糖被氧化，形成二氧化碳並釋放能量。',done:'葡萄糖被氧化，形成 CO₂。接著加入氧氣，看看氧氣變成什麼。'},
 {id:'oxygen',label:'氧氣 O₂',name:'追蹤氧氣',instruction:'加入氧氣，觀察形成的產物。',running:'氧氣被還原成水。',done:'有氧呼吸：葡萄糖被氧化，氧氣被還原。'}]
};
export function freshBiology(key,complete=false){if(!biologyStages[key])throw Error('Unknown biology scene');return {key,step:complete?2:0,phase:complete?'complete':'ready'};}
export function addBiologyReactant(s,id){if(s.phase!=='ready'||biologyStages[s.key][s.step]?.id!==id)return false;s.phase='running';return true;}
export function finishBiologyStage(s){if(s.phase!=='running')return false;s.step++;s.phase=s.step===2?'complete':'ready';return true;}
