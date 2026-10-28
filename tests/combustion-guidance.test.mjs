import test from 'node:test';
import assert from 'node:assert/strict';
import {combustionNextAction,solidNextAction} from '../dist/combustion-guidance.js';
test('combustion guides sample, heat, bottle, then observation',()=>{
 assert.equal(combustionNextAction({loaded:false}).id,'load');
 assert.equal(combustionNextAction({loaded:true,near:false}).id,'heat');
 assert.equal(combustionNextAction({loaded:true,near:true}).id,'observe');
 assert.equal(combustionNextAction({loaded:true,ignited:true,isMetal:false,inJar:false}).id,'bottle');
 assert.equal(combustionNextAction({loaded:true,ignited:true,isMetal:false,inJar:true}).id,'observe');
 assert.equal(combustionNextAction({loaded:true,ignited:true,isMetal:true}).id,'observe');
});
test('solid route highlights only untested litmus, in either order',()=>{
 assert.equal(solidNextAction({completed:false}).id,'wait');
 assert.equal(solidNextAction({completed:true}).id,'water');
 assert.equal(solidNextAction({completed:true,adding:true}).id,'adding');
 assert.equal(solidNextAction({completed:true,ready:true}).id,'paper-red');
 assert.equal(solidNextAction({completed:true,ready:true,dipped:['red']}).id,'paper-blue');
 assert.equal(solidNextAction({completed:true,ready:true,dipped:['blue']}).id,'paper-red');
 assert.equal(solidNextAction({completed:true,ready:true,dipped:['red','blue']}).id,'complete');
});
