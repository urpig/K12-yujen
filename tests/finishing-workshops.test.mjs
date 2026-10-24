import test from 'node:test';
import assert from 'node:assert/strict';
import {bladeResponse,bladeCurve,rustSurface} from '../dist/finishing-model.js';
import {finishingDefs,bladeMachine,chamberArt,surfaceArt,fineSword} from '../dist/finishing-art.js';
import {scopeMarkup} from '../dist/card-markup.js';
test('partial or invalid pull cannot produce evidence and unloading has three distinct endpoints',()=>{
 for(const k of ['pig','steel','wrought']){assert.equal(bladeResponse(k,.84,true).complete,false);assert.equal(bladeResponse(k,1,false).complete,false);assert.equal(bladeResponse(k,NaN,true).complete,false);assert.equal(bladeResponse(k,.4,true).bend,0);}
 assert.equal(bladeResponse('pig',1,true).broken,true);assert.equal(bladeResponse('steel',1,true).bend,0);assert.equal(bladeResponse('wrought',1,true).bend,40);assert.equal(bladeResponse('unknown',1,true).complete,false);
});
test('visible bend is finite, bounded, and grows during the intended load range',()=>{
 for(const key of ['pig','steel','wrought']){let prev=-1;for(let i=0;i<=100;i++){const r=bladeResponse(key,i/100);assert.ok(r.bend>=prev);prev=r.bend;assert.doesNotMatch(bladeCurve(r.bend).edge,/NaN|Infinity/);}}
 for(const v of [-Infinity,NaN,Infinity,-50,1000])assert.doesNotMatch(bladeCurve(v).edge,/NaN|Infinity/);
});
test('rust growth only affects exposed moist specimen, with a bounded endpoint',()=>{
 for(const k of ['dry','oil'])for(const p of [0,.5,1,99])assert.equal(rustSurface(k,p).rust,0);
 assert.equal(rustSurface('damp',0).rust,0);assert.equal(rustSurface('damp',1).rust,1);assert.ok(rustSurface('damp',.7).rust>rustSurface('damp',.3).rust);assert.equal(rustSurface('oil',1).oil,true);
});
test('entire custom apparatus has unique paint servers and no dangling local references',()=>{
 const parts=[fineSword(),fineSword(),fineSword(),bladeMachine(),...['dry','damp','oil'].flatMap(k=>[chamberArt(k),surfaceArt(k)])];
 const markup=parts.map((s,i)=>scopeMarkup(s,'case-'+i)).join(''),ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size);for(const [,id] of markup.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id),id);
});
