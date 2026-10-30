import {bindDrop} from './direct-manipulation.js';

const hammerArt=`<img src="./assets/story/realistic-club.png" alt="" draggable="false">`;
export function mountOreHammer(host,{onCrushed=()=>{}}={}){
 const stage=host.querySelector('.ore-render-stage'),source=stage.querySelector('canvas'),hint=stage.querySelector('.ore-gesture-hint');
 const tools=document.createElement('div');tools.className='ore-hammer-tools';tools.innerHTML=`<button type="button" class="ore-hammer-tool" aria-pressed="false" aria-label="拿起槌子敲碎鐵礦">${hammerArt}<span>拿起槌子</span></button><button type="button" class="ore-hammer-reset">重新敲一次</button>`;host.append(tools);
 const overlay=document.createElement('img');overlay.src='./assets/story/hematite-pile-realistic.png';overlay.alt='敲碎後的小顆赤鐵礦自然堆在鍛刀房地面';overlay.draggable=false;overlay.className='ore-fracture-canvas ore-realistic-pile';overlay.hidden=true;overlay.setAttribute('role','img');stage.append(overlay);
 const target=document.createElement('button');target.type='button';target.className='ore-strike-target';target.setAttribute('aria-label','用槌子敲擊鐵礦');target.hidden=true;stage.append(target);
 const swing=document.createElement('div');swing.className='ore-hammer-swing';swing.innerHTML=hammerArt;swing.hidden=true;swing.setAttribute('aria-hidden','true');stage.append(swing);
 const result=document.createElement('div');result.className='ore-crush-result';result.hidden=true;result.innerHTML='<b>碎成小塊，仍是氧化鐵 Fe₂O₃。</b><p>敲碎只改變大小，沒有把氧移走；還不能直接拿來鍛劍。</p>';host.append(result);
 const tool=tools.querySelector('.ore-hammer-tool');stage.append(tool);const reset=tools.querySelector('.ore-hammer-reset');
 let hits=0,armed=false,busy=false,alive=true,frame=0,start=0,snapshot=null;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function draw(t=1){const ease=1-Math.pow(1-t,3);overlay.style.opacity=String(Math.min(1,t*3));overlay.style.transform=`translateY(${-10*(1-ease)}px) scale(${.92+.08*ease})`;}
 function arm(){if(hits===1)return;armed=true;tool.setAttribute('aria-pressed','true');target.hidden=false;hint.textContent='點擊礦石敲擊 · Enter 也可以';}
 function strike(){if(!alive||busy||hits>=1)return;arm();hits++;busy=true;host.dataset.oreHits=hits;overlay.hidden=false;source.style.visibility='hidden';host.querySelectorAll('[data-ore-view],[data-ore-reset]').forEach(b=>b.disabled=true);swing.hidden=false;swing.classList.remove('swinging');void swing.offsetWidth;swing.classList.add('swinging');start=performance.now();
  function animate(now){if(!alive)return;const t=reduced?1:Math.min(1,(now-start)/440);draw(t);if(t<1){frame=requestAnimationFrame(animate);return;}busy=false;swing.hidden=true;hint.textContent=hits===1?'敲碎前後：都是氧化鐵 Fe₂O₃':'再敲一下，觀察裂縫';if(hits===1){armed=false;target.hidden=true;tool.disabled=true;tool.setAttribute('aria-pressed','false');result.hidden=false;onCrushed();}}
  frame=requestAnimationFrame(animate);
 }
 function restore(){cancelAnimationFrame(frame);hits=0;busy=false;armed=false;snapshot=null;host.dataset.oreHits='0';overlay.hidden=true;swing.hidden=true;source.style.visibility='';target.hidden=true;tool.disabled=false;tool.setAttribute('aria-pressed','false');result.hidden=true;host.querySelectorAll('[data-ore-view],[data-ore-reset]').forEach(b=>b.disabled=false);hint.textContent='拖曳旋轉 · 滾輪縮放';}
 tool.onclick=arm;target.onclick=strike;reset.onclick=restore;
 // A separate visible drop zone lets students drag the actual hammer onto the ore.
 const drop=document.createElement('div');drop.className='ore-hammer-drop';stage.append(drop);
 const release=bindDrop(tool,drop,{highlightOnPickup:false,disabled:()=>busy||hits>=1,onDrop:()=>{strike();release();},onMiss:()=>{arm();release();}});
 tool.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopImmediatePropagation();arm();}},true);tool.setAttribute('aria-label','拿起槌子敲碎鐵礦');
 restore();return ()=>{alive=false;cancelAnimationFrame(frame);release();};
}
