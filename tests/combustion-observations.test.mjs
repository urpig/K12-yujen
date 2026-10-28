import test from 'node:test';
import assert from 'node:assert/strict';
import {reactionObservations,specimenFlames,waterReactions} from '../dist/combustion-observations.js';
import {newSpoonHeating,advanceSpoonHeating} from '../dist/spoon-heating.js';
import {newBottleLitmus,bottleLitmusStep} from '../dist/bottle-ph-state.js';

function atoms(side){const result={};for(const term of side.split('+')){const text=term.trim().replace(/[₀-₉]/g,c=>'₀₁₂₃₄₅₆₇₈₉'.indexOf(c));const coefficient=Number(text.match(/^\d+/)?.[0]||1);const expanded=text.replace(/\(([^)]+)\)(\d+)/g,(_,group,n)=>group.repeat(Number(n)));for(const [,element,count] of expanded.matchAll(/([A-Z][a-z]?)(\d*)/g))result[element]=(result[element]||0)+coefficient*Number(count||1);}return result;}
test('equations follow actual heating, ignition, completion, and water addition',()=>{
 for(const key of Object.keys(specimenFlames)){
  const metal=['Cu','Mg','Zn','Na'].includes(key);let heat=newSpoonHeating(key,metal,true);
  assert.equal(reactionObservations(key,heat).burn,null,key);
  heat=advanceSpoonHeating(heat,{near:true,dt:900});assert.ok(reactionObservations(key,heat).burn,key);
  assert.equal(reactionObservations(key,{completed:true}).water,null,key);
  assert.equal(reactionObservations(key,{waterAdded:true}).water,null,key);
  assert.ok(reactionObservations(key,{completed:true,waterAdded:true}).water,key);
  assert.deepEqual(reactionObservations(key,{}),{burn:null,water:null});
 }
});
test('bottle equation becomes visible after water is actually added and stays visible during testing',()=>{
 let bottle=newBottleLitmus();assert.equal(reactionObservations('S',{completed:true,waterAdded:bottle.water}).water,null);
 bottle=bottleLitmusStep(bottle,{type:'water'});assert.match(reactionObservations('S',{completed:true,waterAdded:bottle.water}).water.equation,/⇌/);
 bottle=bottleLitmusStep(bottle,{type:'shake',distance:48});bottle=bottleLitmusStep(bottle,{type:'shake',distance:48});assert.equal(bottle.phase,'test');assert.ok(reactionObservations('S',{completed:true,waterAdded:bottle.water}).water);
});
test('water equations conserve atoms and preserve peroxide and partial-equilibrium chemistry',()=>{
 for(const d of Object.values(waterReactions)){if(!d.equation)continue;const [left,right]=d.equation.split(/[→⇌]/);assert.deepEqual(atoms(left),atoms(right),d.equation);}
 assert.match(waterReactions.Na.equation,/Na₂O₂/);assert.match(waterReactions.Na.equation,/O₂$/);
 assert.equal(waterReactions.Cu.equation,null);assert.equal(waterReactions.Zn.equation,null);
 assert.match(waterReactions.C.equation,/⇌/);assert.match(waterReactions.S.detail,/簡化/);
 assert.match(specimenFlames.Cu.text,/沒有/);assert.match(specimenFlames.S.detail,/無色氣體/);assert.match(specimenFlames.C.text,/通常沒有/);
});
