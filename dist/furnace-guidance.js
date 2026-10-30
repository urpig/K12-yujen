export function furnaceNextAction({loaded=[],loading=false,running=false,paused=false,completed=false,held=null,step=-1}={}){
 if(loading)return {id:'loading',label:'原料輸送中…'};
 if(running)return {id:paused?'resume':'observe',label:paused?'繼續說明':'觀看亮起的步驟',step};
 if(completed)return {id:'replay',label:'重播 1–8'};
 const missing=['ore','coke','lime'].filter(k=>!loaded.includes(k));
 if(!missing.length)return {id:'heat',label:'按加熱'};
 if(held&&missing.includes(held))return {id:'charge',feed:held,label:'放入送料車'};
 return {id:'feed',feed:missing[0],label:'拿取'+({ore:'鐵礦石',coke:'焦炭',lime:'石灰石'})[missing[0]]};
}
