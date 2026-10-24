import test from 'node:test';
import assert from 'node:assert/strict';
import {createMoltenFlow} from '../dist/molten-flow.js';
test('molten drawing survives earlier RAF timestamps and clears safely on reset',()=>{
 const keys=['requestAnimationFrame','cancelAnimationFrame','ResizeObserver','IntersectionObserver','matchMedia','devicePixelRatio'],saved=Object.fromEntries(keys.map(k=>[k,globalThis[k]]));let next,radii=[],clears=0;
 try{
  globalThis.requestAnimationFrame=cb=>{next=cb;return 1;};globalThis.cancelAnimationFrame=()=>{next=null;};globalThis.ResizeObserver=class{observe(){}disconnect(){}};globalThis.IntersectionObserver=class{observe(){}disconnect(){}};globalThis.matchMedia=()=>({matches:false});globalThis.devicePixelRatio=1;
  const context=new Proxy({ellipse:(x,y,rx,ry)=>{assert.ok([x,y,rx,ry].every(Number.isFinite));assert.ok(rx>=0&&ry>=0);radii.push([rx,ry]);},clearRect:()=>clears++,createRadialGradient:()=>({addColorStop(){}})}, {get:(target,key)=>key in target?target[key]:()=>{}});
  const canvas={dataset:{},getContext:()=>context,getBoundingClientRect:()=>({width:900,height:650}),width:0,height:0};
  const flow=createMoltenFlow(canvas);flow.set({iron:true,slag:true,ironTapped:true,slagTapped:true});next(0);assert.ok(radii.length>20);assert.equal(canvas.dataset.renderer,'flowing-liquid');
  flow.set({iron:true,slag:true,ironTapped:true,slagTapped:true},true);radii=[];next(10000);const paused=JSON.stringify(radii);flow.set({iron:true,slag:true,ironTapped:true,slagTapped:true},true);radii=[];next(20000);assert.equal(JSON.stringify(radii),paused);
  flow.set({});radii=[];next(21000);assert.equal(radii.length,0);assert.ok(clears>=4);flow.dispose();
 }finally{for(const k of keys)if(saved[k]===undefined)delete globalThis[k];else globalThis[k]=saved[k];}
});
