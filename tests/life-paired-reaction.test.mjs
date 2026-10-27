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
test('all six scenes expose the same explicit reaction control and model boundaries',()=>{
 for(const key of ['photo','resp','peroxide','chlorine','sulfur','food']){
  const initial=lifePairedMarkup(key);assert.match(initial,/data-phase="ready"/);assert.match(initial,/開始反應/);assert.match(initial,/不代表數量或實際路徑/);
  assert.equal((initial.match(/data-life-pair-label/g)||[]).length,2);
  assert.match(lifePairedMarkup(key,true),/data-phase="complete"/);
 }
 assert.match(lifePairedMarkup('food'),/保護用完後仍會褐變/);
});
