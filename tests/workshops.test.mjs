import test from 'node:test';
import assert from 'node:assert/strict';
import {furnaceState} from '../dist/furnace-workshop.js';
import {waterCases} from '../dist/bench-water.js';
test('every feed subset respects separate heat, reduction and slag prerequisites',()=>{const keys=['ore','coke','air','lime'];for(let bits=0;bits<16;bits++){const s=new Set(keys.filter((_,i)=>bits&(1<<i))),r=furnaceState(s);assert.equal(r.heat,s.has('coke')&&s.has('air'));assert.equal(r.iron,r.heat&&s.has('ore'));assert.equal(r.slag,r.iron&&s.has('lime'));}});
test('same-bench routes do not treat gases as solid spoon products or quietly replace sodium peroxide',()=>{for(const k of ['Cu','Mg','Zn','Na','P'])assert.equal(waterCases[k].route,'solid');for(const k of ['S','C'])assert.equal(waterCases[k].route,'gas');assert.equal(waterCases.CO.route,'reference');assert.match(waterCases.Na.text,/Na₂O₂.*NaOH/);assert.equal(waterCases.Na.kind,'base');assert.equal(waterCases.CO.kind,'neutral');});
