// Pointer drag and click/keyboard placement share the same drop callback.
export function bindReactantPickup(item,zone,{disabled=()=>false,onSelect,onDrop,onMiss=()=>{},onCancel=()=>{}}){
 let drag=null,suppressClick=false;
 const clear=()=>{const old=drag;drag=null;item.style.transform='';item.classList.remove('life-being-dragged');zone.classList.remove('life-drop-hover');if(old&&item.hasPointerCapture(old.id))item.releasePointerCapture(old.id);return old;};
 const hit=(x,y)=>{const r=zone.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;};
 const down=e=>{if(e.button!==0||disabled())return;suppressClick=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,moved:false};item.setPointerCapture(e.pointerId);};
 const move=e=>{if(drag?.id!==e.pointerId)return;const x=e.clientX-drag.x,y=e.clientY-drag.y;if(Math.hypot(x,y)>6)drag.moved=true;if(!drag.moved)return;e.preventDefault();item.classList.add('life-being-dragged');item.style.transform=`translate(${x}px,${y}px)`;zone.classList.toggle('life-drop-hover',hit(e.clientX,e.clientY));};
 const up=e=>{if(drag?.id!==e.pointerId)return;const moved=drag.moved,inside=hit(e.clientX,e.clientY);clear();if(!moved)return;suppressClick=true;if(inside)onDrop();else onMiss();};
 const cancel=()=>{if(!drag)return;suppressClick=true;clear();onCancel();};
 const click=e=>{const pointerFollowup=suppressClick&&e.detail>0;suppressClick=false;if(pointerFollowup){e.preventDefault();return;}if(!disabled())onSelect();};
 const key=e=>{if(e.key==='Escape'){e.preventDefault();if(drag)cancel();else onCancel();}};
 const events=[['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',cancel],['lostpointercapture',cancel],['click',click],['keydown',key]];
 for(const [name,fn] of events)item.addEventListener(name,fn);window.addEventListener('resize',cancel);
 return ()=>{for(const [name,fn] of events)item.removeEventListener(name,fn);window.removeEventListener('resize',cancel);clear();};
}
