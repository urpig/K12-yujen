import test from 'node:test';
import assert from 'node:assert/strict';
import {biologyStages,freshBiology,addBiologyReactant,finishBiologyStage} from '../dist/life-biology-model.js';
import {biologyMarkup} from '../dist/life-biology-lab.js';
test('biology requires ordered additions and completed observation of each stage',()=>{
 for(const key of ['photo','resp']){
  const [first,second]=biologyStages[key],s=freshBiology(key);
  assert.equal(addBiologyReactant(s,second.id),false);assert.equal(finishBiologyStage(s),false);
  assert.equal(addBiologyReactant(s,first.id),true);assert.equal(s.phase,'running');
  assert.equal(addBiologyReactant(s,second.id),false);assert.equal(addBiologyReactant(s,first.id),false);
  assert.equal(finishBiologyStage(s),true);assert.equal(s.step,1);assert.equal(s.phase,'ready');
  assert.equal(addBiologyReactant(s,first.id),false);assert.equal(addBiologyReactant(s,second.id),true);
  assert.equal(finishBiologyStage(s),true);assert.equal(s.phase,'complete');assert.equal(s.step,2);
  assert.equal(addBiologyReactant(s,second.id),false);assert.equal(finishBiologyStage(s),false);
  assert.deepEqual(freshBiology(key,true),s);assert.equal(freshBiology(key).step,0);
 }
});
test('staged biology preserves the paired processes and does not imply direct carbon-to-glucose or oxygen-free respiration',()=>{
 assert.deepEqual(biologyStages.photo.map(s=>s.id),['water','co2']);
 assert.match(biologyMarkup('photo'),/水被氧化/);assert.match(biologyMarkup('photo'),/三碳糖/);assert.match(biologyMarkup('photo'),/NADPH/);
 assert.match(biologyMarkup('resp'),/氧氣被還原/);assert.match(biologyMarkup('resp'),/不是在無氧下先完成全部氧化/);
});
