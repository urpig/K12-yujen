// The file name stays stable for local builds; the activity now uses litmus.
export const bottleSolutions={S:'acid',C:'acid',CO:'neutral'};
export const litmusColours={red:'#c85f78',blue:'#617ab2'};
export function bottleLitmusResult(key,paper){
 if(!['red','blue'].includes(paper)||!bottleSolutions[key])return null;
 return bottleSolutions[key]==='acid'?'red':paper;
}
export function newBottleLitmus(){return {phase:'pour',water:false,shake:0,loaded:false,spotted:{red:false,blue:false}};}
export function bottleNextAction(s){
 if(s.phase==='pour')return {id:'water',tool:'[data-analysis-wash]',target:'[data-analysis-mouth]',label:'① 拿洗瓶',instruction:'下一步：拿起蒸餾水洗瓶，把細口移到亮起的瓶口加水。'};
 if(s.phase==='shake')return {id:'shake',tool:'[data-analysis-shaker]',target:null,label:'② 左右輕搖',instruction:'下一步：按住亮起的瓶身，左右輕搖，讓水接觸瓶內氣體。'};
 if(s.phase==='test'&&!s.loaded)return {id:'sample',tool:'[data-pipette=sample]',target:'[data-analysis-source=sample]',label:'③ 拿滴管取液',instruction:'下一步：拿起亮起的滴管，把尖端移入瓶底亮起的液體區取液。'};
 if(s.phase==='test'){const paper=s.spotted.red?'blue':'red',name=paper==='red'?'紅色':'藍色';return {id:'spot-'+paper,tool:'[data-pipette=sample]',target:'[data-litmus-paper='+paper+']',label:'④ 滴到'+name+'試紙',instruction:'下一步：把滴管尖端移到亮起的'+name+'石蕊試紙，放開滴液。'};}
 return {id:'complete',tool:null,target:null,label:'',instruction:null};
}
export function bottleLitmusStep(s,event){
 const e=event.type,p=s.phase;
 if(e==='water'&&p==='pour')return {...s,phase:'shake',water:true};
 if(e==='shake'&&p==='shake'){const d=Number.isFinite(event.distance)?Math.min(48,Math.abs(event.distance)):0,shake=Math.min(96,s.shake+d);return {...s,shake,phase:shake>=96?'test':'shake'};}
 if(p==='test'){
  if(e==='take'&&!s.loaded)return {...s,loaded:true};
  if(e==='spot'&&s.loaded&&bottleLitmusResult(event.key,event.paper)&&!s.spotted[event.paper]){
   const spotted={...s.spotted,[event.paper]:true};
   return {...s,loaded:false,spotted,phase:spotted.red&&spotted.blue?'complete':'test'};
  }
 }
 return s;
}
