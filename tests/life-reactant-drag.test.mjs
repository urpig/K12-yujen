import test from 'node:test';
import assert from 'node:assert/strict';
import {bindReactantPickup} from '../dist/life-reactant-drag.js';

function element(left,top,width=40,height=40){
 const listeners=new Map(),classes=new Set(),capture=new Set();
 return {style:{transform:''},attrs:{},classList:{add:(...names)=>names.forEach(n=>classes.add(n)),remove:(...names)=>names.forEach(n=>classes.delete(n)),toggle:(n,on)=>on?classes.add(n):classes.delete(n)},
  setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,f){listeners.set(k,f);},removeEventListener(k){listeners.delete(k);},
  setPointerCapture:id=>capture.add(id),hasPointerCapture:id=>capture.has(id),releasePointerCapture:id=>capture.delete(id),
  getBoundingClientRect(){const [x,y]=(this.style.transform.match(/-?\d+(?:\.\d+)?/g)||[0,0]).map(Number);return {left:left+x,top:top+y,right:left+x+width,bottom:top+y+height,width,height};},
  send(type,extra={}){listeners.get(type)?.({button:0,pointerId:1,clientX:left+20,clientY:top+20,preventDefault(){},...extra});}
 };
}
test('reactants only enter after movement into the target, with retry, cancel and keyboard parity',()=>{
 const prior=globalThis.window;globalThis.window=element(0,0);
 try{
  const item=element(0,0),zone=element(100,0,80,80);let drops=0,misses=0,cancels=0,blocked=false;
  const dispose=bindReactantPickup(item,zone,{disabled:()=>blocked,onDrop:()=>drops++,onMiss:()=>misses++,onCancel:()=>cancels++});
  item.send('click');item.send('pointerdown');item.send('pointerup');assert.equal(drops,0);
  item.send('pointerdown');item.send('pointermove',{clientX:70});item.send('pointerup',{clientX:70});assert.equal(misses,1);assert.equal(item.style.transform,'');
  item.send('pointerdown');item.send('pointermove',{clientX:120});item.send('pointercancel');assert.equal(cancels,1);assert.equal(drops,0);
  item.send('pointerdown');item.send('pointermove',{clientX:120});item.send('pointerup',{clientX:120});item.send('click');assert.equal(drops,1);
  blocked=true;item.send('pointerdown');item.send('pointermove',{clientX:120});item.send('pointerup',{clientX:120});assert.equal(drops,1);blocked=false;
  item.send('keydown',{key:'Enter'});item.send('keydown',{key:'ArrowRight',shiftKey:true});item.send('keydown',{key:'Escape'});assert.equal(cancels,2);assert.equal(item.style.transform,'');
  item.send('keydown',{key:'Enter'});for(let i=0;i<4;i++)item.send('keydown',{key:'ArrowRight',shiftKey:true});item.send('keydown',{key:'Enter'});assert.equal(drops,2);assert.equal(item.attrs['aria-pressed'],'false');
  item.send('keydown',{key:'Enter'});item.send('keydown',{key:'ArrowRight',shiftKey:true});dispose.cancel();assert.equal(item.style.transform,'');assert.equal(cancels,3);item.send('keydown',{key:'Enter'});item.send('keydown',{key:'Enter'});assert.equal(drops,2);
  dispose();item.send('pointerdown');item.send('pointermove',{clientX:120});item.send('pointerup',{clientX:120});assert.equal(drops,2);
 }finally{globalThis.window=prior;}
});
