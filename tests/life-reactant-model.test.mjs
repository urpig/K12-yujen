import test from 'node:test';
import assert from 'node:assert/strict';
import {lifeLabDefinition,freshLifeMix,addLifeReactant,finishLifeMix} from '../dist/life-reactant-model.js';
const keys=['photo','resp','peroxide','chlorine','sulfur','food'];
test('both distinct supplies are required in either order, with no early reaction',()=>{
 for(const key of ['photo','resp','food'])for(const reverse of [false,true]){
  const ids=lifeLabDefinition(key).inputs.map(x=>x.id);if(reverse)ids.reverse();const s=freshLifeMix(key);
  assert.equal(finishLifeMix(s),false);assert.equal(addLifeReactant(s,ids[0]),true);assert.equal(s.phase,'ready');assert.equal(s.added.length,1);
  assert.equal(addLifeReactant(s,ids[0]),false);assert.equal(addLifeReactant(s,'wrong-material'),false);assert.equal(s.phase,'ready');
  assert.equal(addLifeReactant(s,ids[1]),true);assert.equal(s.phase,'running');assert.equal(s.added.length,2);
  assert.equal(addLifeReactant(s,ids[1]),false);assert.equal(finishLifeMix(s),true);assert.equal(finishLifeMix(s),false);assert.equal(s.phase,'complete');
 }
});
test('completed observations can display results, while taking fresh materials clears only the current mix',()=>{
 for(const key of keys){const previous=freshLifeMix(key,true);assert.equal(previous.added.length,lifeLabDefinition(key).inputs.length);assert.equal(previous.phase,'complete');
  const next=freshLifeMix(key);assert.equal(next.added.length,0);assert.equal(next.phase,'ready');assert.equal(previous.added.length,lifeLabDefinition(key).inputs.length);
 }
 assert.throws(()=>lifeLabDefinition('bad'));
});
test('photo supplies belong in a chloroplast and the other models preserve their reaction boundaries',()=>{
 assert.deepEqual(lifeLabDefinition('photo').inputs.map(x=>x.id),['co2','water']);assert.equal(lifeLabDefinition('photo').zone,'葉綠體');
 assert.match(lifeLabDefinition('resp').note,/並非全部只在粒線體/);assert.match(lifeLabDefinition('food').note,/並非保鮮時要加入/);
 for(const key of ['peroxide','chlorine','sulfur']){const d=lifeLabDefinition(key);assert.equal(d.inputs.length,1);const s=freshLifeMix(key);assert.equal(addLifeReactant(s,'dye'),false);assert.equal(addLifeReactant(s,key),true);assert.equal(s.phase,'running');assert.equal(addLifeReactant(s,key),false);assert.equal(finishLifeMix(s),true);}
});