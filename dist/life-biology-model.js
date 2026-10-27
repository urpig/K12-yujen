export const biologyStages={
 photo:[{id:'water',label:'水 H₂O',name:'光反應',instruction:'先把水放進葉綠體，觀察水的裂解。',running:'光能驅動水裂解：氧形成 O₂ 並排出；電子與氫離子接續參與反應。',done:'水被氧化，O₂ 已排出。接著加入 CO₂，看看碳反應如何製造養分。'},
 {id:'co2',label:'二氧化碳 CO₂',name:'碳反應',instruction:'把 CO₂ 放進葉綠體的碳反應區。',running:'CO₂ 被固定，利用光反應提供的 ATP、NADPH，逐步還原成糖。',done:'CO₂ 被還原成三碳糖，再用來合成葡萄糖等養分。水被氧化、CO₂ 被還原，是相連的整體過程。'}],
 resp:[{id:'glucose',label:'葡萄糖 C₆H₁₂O₆',name:'追蹤養分',instruction:'先加入葡萄糖，追蹤養分分解與 CO₂ 的去向。',running:'葡萄糖經多步分解、被氧化；CO₂ 釋出，電子由攜帶者送往後續反應。',done:'葡萄糖中的碳逐步成為 CO₂。再加入 O₂，追蹤電子最後去哪裡。'},
 {id:'oxygen',label:'氧氣 O₂',name:'追蹤氧氣',instruction:'加入 O₂，觀察末端接受電子後的變化。',running:'O₂ 在電子傳遞鏈末端接受電子，與氫離子形成水；這個過程協助製造 ATP。',done:'葡萄糖被氧化，O₂ 被還原成水；兩邊透過電子攜帶者連接，同屬有氧呼吸。'}]
};
export function freshBiology(key,complete=false){if(!biologyStages[key])throw Error('Unknown biology scene');return {key,step:complete?2:0,phase:complete?'complete':'ready'};}
export function addBiologyReactant(s,id){if(s.phase!=='ready'||biologyStages[s.key][s.step]?.id!==id)return false;s.phase='running';return true;}
export function finishBiologyStage(s){if(s.phase!=='running')return false;s.step++;s.phase=s.step===2?'complete':'ready';return true;}