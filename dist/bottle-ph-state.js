// The file name stays stable for local builds; the activity now uses litmus.
export const bottleSolutions={S:'acid',C:'acid',CO:'neutral'};
export const litmusColours={red:'#c85f78',blue:'#617ab2'};
export function bottleLitmusResult(key,paper){
 if(!['red','blue'].includes(paper)||!bottleSolutions[key])return null;
 return bottleSolutions[key]==='acid'?'red':paper;
}
export function newBottleLitmus(){return {phase:'pour',water:false,shake:0,loaded:false,spotted:{red:false,blue:false}};}
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
