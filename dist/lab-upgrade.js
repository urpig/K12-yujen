import {createLabRenderer} from './lab-renderer.js';
import {buildLabScene} from './lab-scenes.js';
const sharedViewers=new WeakMap();
export function upgradeInteractiveLab(root,card,context){
 if(card.id===1||['steel','rust','iron'].includes(card.type))return ()=>{};
 const owner=root.closest('article');let shared=sharedViewers.get(owner);if(!shared){shared={canvas:null,renderer:null,scene:()=>({objects:[],animate:false})};sharedViewers.set(owner,shared);window.addEventListener('pagehide',()=>shared.renderer?.dispose(),{once:true});}
 const entries=new Map();let pending=0,alive=true;
 const selector='.hands-board > svg,.metal-observation > svg,.physical-bench > svg,.story-scene > svg,.reaction-result > svg';
 function config(source,entry,time){
  const s=context.s,box=source.closest('.hands-board'),story=source.closest('.story-scene'),metal=source.closest('.metal-observation'),nonmetal=source.closest('.physical-bench');let type=card.type,key=s.selected,phase='before';
  const result={key,evidence:s.evidence,size:[640,360]};
  if(box?.classList.contains('burn-board')){type='burner';result.reacting=root.classList.contains('reacting');}
  else if(metal){type='metal';key=metal.dataset.metalScene;phase=metal.dataset.phase;result.cool=metal.dataset.cool==='true';}
  else if(nonmetal){type='nonmetal';phase=nonmetal.classList.contains('nonmetal-heating')?'heating':nonmetal.classList.contains('nonmetal-product')?'product':'before';}
  else if(box?.classList.contains('litmus-board')){type='litmus';result.sediment=box.dataset.preparation!=='ready'?null:key==='Cu'?[.1,.11,.1]:key==='Mg'||key==='Zn'?[.87,.87,.82]:null;result.dipping=!!root.querySelector('.litmus-paper.dragging');}
  else if(type==='mass'){result.massComplete=(root.querySelector('.mass-readout')?.textContent||'').startsWith('完整收支');}
  else if(type==='redox'){phase=story?.classList.contains('phase-after')||source.closest('.reaction-result')?'after':'before';}
  else if(type==='iron'){result.hiddenOxygen=[...root.querySelectorAll('[data-ore-oxygen]')].filter(e=>e.style.visibility==='hidden').map(e=>Number(e.dataset.oreOxygen));result.transfers={};for(const e of root.querySelectorAll('[data-ore-oxygen].oxygen-transit')){const i=Number(e.dataset.oreOxygen);if(!entry.transferStarts.has(i))entry.transferStarts.set(i,time);result.transfers[i]=Math.min(1,(time-entry.transferStarts.get(i))/.8);}}
  else if(type==='steel'){phase=root.dataset.bladeResult?'after':'before';result.load=Number(root.style.getPropertyValue('--load'))||0;result.mounted=root.dataset.bladeMounted==='true';}
  else if(type==='furnace'){result.evidence=(root.dataset.furnaceFeeds||'').split(',').filter(Boolean);result.charge=root.dataset.furnaceLoading||'';result.chargeProgress=Math.min(1,(performance.now()-Number(root.dataset.furnaceStart||0))/1600);}
  else if(type==='rust'){key=root.dataset.rustCase||'';phase=root.dataset.rustPhase||'before';result.rustProgress=phase==='after'?1:phase==='waiting'?Math.min(1,(performance.now()-Number(root.dataset.rustStart))/2600):0;}
  result.type=type;result.key=key;result.phase=phase;return result;
 }
 function labels(entry){const source=entry.source,signature=source.textContent+[...source.querySelectorAll('text,[data-ore-oxygen]')].map(e=>e.getAttribute('class')+e.getAttribute('style')+e.getAttribute('visibility')).join('');if(signature===entry.labelSignature)return;entry.labelSignature=signature;
  const copy=source.cloneNode(true);function trim(node){for(const child of [...node.children]){if(child.tagName.toLowerCase()==='text')continue;if(child.querySelector('text'))trim(child);else child.remove();}}trim(copy);copy.removeAttribute('style');copy.removeAttribute('id');copy.setAttribute('class','labgl-labels');copy.setAttribute('aria-hidden','true');for(const e of copy.querySelectorAll('*')){e.removeAttribute('id');for(const a of [...e.attributes])if(a.name.startsWith('data-'))e.removeAttribute(a.name);}if(card.type==='mass')for(const e of copy.querySelectorAll('text[y="205"]'))e.setAttribute('y','160');if(card.type==='mass'){const key=context.s.selected,completed=(root.querySelector('.mass-readout')?.textContent||'').startsWith('完整收支'),values=key==='Mg'?(completed?[40,40]:[24,40]):completed?[44,44]:[12,0];for(let i=0;i<2;i++){const label=document.createElementNS('http://www.w3.org/2000/svg','text');label.setAttribute('x',String(i?480:170));label.setAttribute('y','286');label.setAttribute('text-anchor','middle');label.setAttribute('font-size','13');label.setAttribute('class','digital-readout');label.setAttribute('fill','#ccedd0');label.setAttribute('stroke','none');label.textContent=values[i]+'.0 g';copy.append(label);}}entry.labels?.remove();entry.wrapper.append(copy);entry.labels=copy;
 }
 function refresh(){pending=0;if(!alive)return;for(const [source,e] of entries)if(!root.contains(source)){entries.delete(source);}
  for(const source of root.querySelectorAll(selector))if(!entries.has(source)&&!source.classList.contains('labgl-labels')){
   const wrapper=document.createElement('div');wrapper.className='labgl-stage';const view=source.getAttribute('viewBox')?.split(/\s+/).map(Number)||[0,0,640,360];wrapper.style.aspectRatio=view[2]+'/'+view[3];source.replaceWith(wrapper);wrapper.append(source);source.classList.add('labgl-source');source.setAttribute('aria-hidden','true');const canvas=shared.canvas||document.createElement('canvas');shared.canvas=canvas;canvas.className='labgl-canvas';canvas.setAttribute('role','img');canvas.setAttribute('aria-label',source.getAttribute('aria-label')||card.title+'立體互動場景');wrapper.append(canvas);const entry={source,wrapper,canvas,renderer:null,labels:null,labelSignature:null,transferStarts:new Map()};entries.set(source,entry);let startedAt=null;shared.scene=time=>{if(startedAt===null)startedAt=time;const elapsed=time-startedAt;const cfg=config(source,entry,elapsed);const scene=buildLabScene(cfg,elapsed);if(cfg.type==='iron'&&Object.values(cfg.transfers||{}).some(x=>x<1))scene.animate=true;return scene;};shared.renderer=shared.renderer||createLabRenderer(canvas,time=>shared.scene(time));entry.renderer=shared.renderer;if(entry.renderer){wrapper.classList.add('labgl-ready');wrapper.dataset.scene=card.type;labels(entry);}else{wrapper.classList.add('labgl-fallback');canvas.remove();}
  }
  for(const e of entries.values()){if(e.renderer){labels(e);e.renderer.render();}}
 }
 function schedule(){if(!pending&&alive)pending=requestAnimationFrame(refresh);}
 const observer=new MutationObserver(records=>{if(records.some(r=>{const e=r.target.nodeType===1?r.target:r.target.parentElement;return !e?.closest('.labgl-labels')&&e?.tagName!=='CANVAS';}))schedule();});observer.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style','d','hidden','visibility','data-blade-mounted','data-blade-result','data-rust-case','data-rust-phase','data-furnace-feeds','data-preparation','data-furnace-loading']});refresh();
 return ()=>{alive=false;cancelAnimationFrame(pending);observer.disconnect();shared.scene=()=>({objects:[],animate:false});shared.renderer?.render();entries.clear();};
}
