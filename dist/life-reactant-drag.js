// Reactants must be moved into the target. Keyboard movement uses the same drop test.
export function bindReactantPickup(item,zone,{disabled=()=>false,onDrop,onMiss=()=>{},onCancel=()=>{}}){
 let drag=null;
 const hit=(x,y)=>{const r=zone.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;};
 const clear=()=>{const old=drag;drag=null;item.style.transform='';item.classList.remove('life-being-dragged');item.setAttribute('aria-pressed','false');zone.classList.remove('life-drop-hover');if(old?.id!==undefined&&item.hasPointerCapture(old.id))item.releasePointerCapture(old.id);return old;};
 const paint=()=>{item.style.transform=`translate(${drag.dx}px,${drag.dy}px)`;item.classList.add('life-being-dragged');const r=item.getBoundingClientRect();zone.classList.toggle('life-drop-hover',hit(r.left+r.width/2,r.top+r.height/2));};
 const cancel=()=>{if(!drag)return;clear();onCancel();};
 const down=e=>{if(e.button!==0||disabled()||drag)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,dx:0,dy:0,moved:false};item.setPointerCapture(e.pointerId);};
 const move=e=>{if(drag?.id!==e.pointerId)return;drag.dx=e.clientX-drag.x;drag.dy=e.clientY-drag.y;if(Math.hypot(drag.dx,drag.dy)>6)drag.moved=true;if(!drag.moved)return;e.preventDefault();item.setAttribute('aria-pressed','true');paint();};
 const up=e=>{if(drag?.id!==e.pointerId)return;const moved=drag.moved,inside=hit(e.clientX,e.clientY);clear();if(moved){if(inside&&!disabled())onDrop();else onMiss();}};
 const click=e=>e.preventDefault();
 const key=e=>{
  if(e.key==='Escape'){if(drag){e.preventDefault();cancel();}return;}
  if(disabled())return;
  if(e.key==='Enter'||e.key===' '){e.preventDefault();if(e.repeat)return;if(drag?.keyboard){const r=item.getBoundingClientRect(),inside=drag.moved&&hit(r.left+r.width/2,r.top+r.height/2);clear();if(inside)onDrop();else onMiss();}else if(!drag){drag={keyboard:true,dx:0,dy:0,moved:false};item.setAttribute('aria-pressed','true');}return;}
  if(drag?.keyboard&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const n=e.shiftKey?30:12;drag.dx+=e.key==='ArrowRight'?n:e.key==='ArrowLeft'?-n:0;drag.dy+=e.key==='ArrowDown'?n:e.key==='ArrowUp'?-n:0;drag.moved=true;paint();}
 };
 const events=[['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',cancel],['lostpointercapture',cancel],['click',click],['keydown',key]];
 for(const [name,fn] of events)item.addEventListener(name,fn);window.addEventListener('resize',cancel);
 const dispose=()=>{for(const [name,fn] of events)item.removeEventListener(name,fn);window.removeEventListener('resize',cancel);clear();};
 dispose.cancel=cancel;
 return dispose;
}
