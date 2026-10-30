import test from 'node:test';
import assert from 'node:assert/strict';
import {lifeReactionPair,lifePairedMarkup} from '../dist/life-paired-reaction.js';
test('each life example tracks both changed partners, including opposite bleaching routes',()=>{
 for(const key of ['photo','resp','peroxide','chlorine','sulfur','food']){
  const p=lifeReactionPair(key);assert.notEqual(p.oxidation.from,p.oxidation.to);assert.notEqual(p.reduction.from,p.reduction.to);
 }
 assert.equal(lifeReactionPair('photo').oxidation.from,'水 H₂O');assert.equal(lifeReactionPair('photo').oxidation.to,'氧氣 O₂');
 assert.equal(lifeReactionPair('photo').reduction.from,'二氧化碳 CO₂');
 assert.equal(lifeReactionPair('resp').oxidation.from,'葡萄糖 C₆H₁₂O₆');
 assert.match(lifeReactionPair('peroxide').reduction.from,/過氧化氫/);assert.match(lifeReactionPair('chlorine').reduction.from,/次氯酸鈉/);
 assert.match(lifeReactionPair('sulfur').oxidation.from,/二氧化硫/);assert.equal(lifeReactionPair('food').oxidation.from,'維生素 C');
 assert.throws(()=>lifeReactionPair('unknown'));
});
test('all scenes expose manual supply and paired changes with model boundaries',()=>{
 for(const key of ['photo','resp','peroxide','chlorine','sulfur']){
  const initial=lifePairedMarkup(key);assert.match(initial,/data-phase="ready"/);assert.match(initial,/data-life-drop/);assert.equal((initial.match(/data-life-input=/g)||[]).length,['peroxide','chlorine','sulfur'].includes(key)?1:2);assert.doesNotMatch(initial,/data-life-play/);if(['photo','resp'].includes(key))assert.doesNotMatch(initial,/電子|life-pair-model/);
  assert.equal((initial.match(/data-life-pair-label/g)||[]).length,2);
  assert.doesNotMatch(initial,/電子|有色物質|色素結構改變|life-pair-model/);
  assert.match(lifePairedMarkup(key,true),/data-phase="complete"/);
 }
 const food=lifePairedMarkup('food');assert.match(food,/data-life-input="vitaminc"/);assert.match(food,/data-apple-reset/);assert.match(food,/對照組/);assert.match(food,/實驗組/);assert.match(food,/data-life-drop/);assert.doesNotMatch(food,/褐變中間產物|data-apple-start/);
});
