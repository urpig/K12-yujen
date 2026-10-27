import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,restoreState,isReady} from '../dist/journey-cards.js';
import {ironCandidates,freshIronTrials,chooseIronTrial,predictIronTrial,beginIronTrial,finishIronTrial,restoreIronTrials} from '../dist/iron-affinity-model.js';
test('each iron comparison requires its own prediction and a completed heating observation',()=>{
 const s=freshIronTrials();for(const id of Object.keys(ironCandidates)){
  chooseIronTrial(s,id);assert.equal(beginIronTrial(s),false);assert.equal(finishIronTrial(s),false);
  assert.equal(predictIronTrial(s,!ironCandidates[id].canReduce),true);assert.equal(beginIronTrial(s),true);
  assert.equal(beginIronTrial(s),false);assert.equal(predictIronTrial(s,true),false);assert.equal(s.results[id],undefined);
  assert.equal(finishIronTrial(s),true);assert.equal(s.results[id],true);assert.equal(finishIronTrial(s),false);
 }assert.equal(Object.keys(s.results).length,6);
});
test('changing an unfinished trial does not invent evidence, and restore only accepts observed records',()=>{
 const s=freshIronTrials();predictIronTrial(s,true);beginIronTrial(s);chooseIronTrial(s,'Sn');assert.deepEqual(s.results,{});
 const restored=restoreIronTrials({selected:'Sn',predictions:{C:true,Sn:false,Cu:'false',unknown:true},results:{Pb:true}},['C','unknown']);
 assert.deepEqual(restored.results,{C:true});assert.deepEqual(restored.predictions,{C:true,Sn:false});assert.equal(restored.phase,'ready');
 assert.equal(chooseIronTrial(restored,'invalid'),false);
});
test('the comparison distinguishes elemental oxygen uptake from oxide reduction',()=>{
 assert.deepEqual(Object.entries(ironCandidates).filter(([,v])=>v.canReduce).map(([k])=>k),['C','Zn','Cr']);
 for(const id of ['Sn','Pb','Cu']){assert.equal(ironCandidates[id].canReduce,false);assert.equal(ironCandidates[id].equation,undefined);}
 assert.equal(ironCandidates.C.equation,'2Fe₂O₃ + 3C → 4Fe + 3CO₂');assert.equal(ironCandidates.Zn.oxide,'氧化鋅 ZnO');assert.equal(ironCandidates.Cr.oxide,'氧化鉻 Cr₂O₃');
});

// This card now completes from the six individual additions, not obsolete CuO cases.
test('six iron comparisons replace old copper-oxide completion requirements without inventing results',()=>{
 const c=lessons.find(c=>c.id===3);assert.deepEqual(c.required,['iron-C','iron-Zn','iron-Cr','iron-Sn','iron-Pb','iron-Cu']);
 const old=restoreState(c,{evidence:['alone','carbon','ZnCu','CuZn'],quizOpen:true,answer:c.quiz.answer});assert.equal(isReady(c,old),false);assert.equal(old.quizOpen,false);
 const complete=restoreState(c,{evidence:c.required,quizOpen:true,answer:c.quiz.answer});assert.equal(isReady(c,complete),true);
});
