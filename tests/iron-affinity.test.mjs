import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,restoreState,isReady} from '../dist/journey-cards.js';
import {ironCandidates,freshIronTrials,chooseIronTrial,predictIronTrial,beginIronTrial,finishIronTrial,restoreIronTrials} from '../dist/iron-affinity-model.js';
test('each iron comparison starts without a prediction but requires a completed heating observation',()=>{
 const s=freshIronTrials();for(const id of Object.keys(ironCandidates)){
  chooseIronTrial(s,id);assert.equal(finishIronTrial(s),false);
  assert.equal(s.predictions[id],undefined);assert.equal(beginIronTrial(s),true);
  assert.equal(beginIronTrial(s),false);assert.equal(predictIronTrial(s,true),false);assert.equal(s.results[id],undefined);
  assert.equal(finishIronTrial(s),true);assert.equal(s.results[id],true);assert.equal(finishIronTrial(s),false);
 }assert.equal(Object.keys(s.results).length,4);
});
test('changing an unfinished trial does not invent evidence, and restore only accepts observed records',()=>{
 const s=freshIronTrials();predictIronTrial(s,true);beginIronTrial(s);chooseIronTrial(s,'Sn');assert.deepEqual(s.results,{});
 const restored=restoreIronTrials({selected:'Sn',predictions:{C:true,Sn:false,Cu:'false',unknown:true},results:{Pb:true}},['C','unknown']);
 assert.deepEqual(restored.results,{C:true});assert.deepEqual(restored.predictions,{C:true,Sn:false});assert.equal(restored.phase,'ready');
 assert.equal(chooseIronTrial(restored,'invalid'),false);
});
test('the comparison distinguishes elemental oxygen uptake from oxide reduction',()=>{
 assert.deepEqual(Object.entries(ironCandidates).filter(([,v])=>v.canReduce).map(([k])=>k),['C','Zn']);
 for(const id of ['Sn','Cu']){assert.equal(ironCandidates[id].canReduce,false);assert.equal(ironCandidates[id].equation,undefined);}
 assert.equal(ironCandidates.C.equation,'2Fe₂O₃ + 3C → 4Fe + 3CO₂');assert.equal(ironCandidates.Zn.oxide,'氧化鋅 ZnO');
});

// This card now completes from the four individual additions, not obsolete CuO cases.
test('four iron comparisons replace old copper-oxide completion requirements without inventing results',()=>{
 const c=lessons.find(c=>c.id===3);assert.deepEqual(c.required,['iron-C','iron-Zn','iron-Sn','iron-Cu']);
 const old=restoreState(c,{evidence:['alone','carbon','ZnCu','CuZn'],quizOpen:true,answer:c.quiz.answer});assert.equal(isReady(c,old),false);assert.equal(old.quizOpen,false);
 const complete=restoreState(c,{evidence:c.required,quizOpen:true,answer:c.quiz.answer});assert.equal(isReady(c,complete),true);
});

test('retired candidates cannot return from saved progress',()=>{const s=restoreIronTrials({selected:'Cr',predictions:{Cr:true,Pb:false}},['C','Cr','Pb']);assert.equal(s.selected,'C');assert.deepEqual(s.results,{C:true});assert.deepEqual(s.predictions,{});assert.equal(chooseIronTrial(s,'Pb'),false);});
