import test from 'node:test';
import assert from 'node:assert/strict';
import {furnaceNextAction} from '../dist/furnace-guidance.js';
test('furnace guidance follows only missing feeds, then heat, and does not invite input while busy',()=>{
 assert.equal(furnaceNextAction().feed,'ore');
 assert.deepEqual(furnaceNextAction({held:'coke'}),{id:'charge',feed:'coke',label:'放入送料車'});
 assert.equal(furnaceNextAction({loaded:['ore'],held:'ore'}).feed,'coke');
 assert.equal(furnaceNextAction({loaded:['ore','coke']}).feed,'lime');
 assert.equal(furnaceNextAction({loaded:['lime','coke','ore']}).id,'heat');
 assert.equal(furnaceNextAction({held:'ore',loading:true}).id,'loading');
 assert.equal(furnaceNextAction({running:true,step:3}).id,'observe');
 assert.equal(furnaceNextAction({running:true,paused:true,step:3}).id,'resume');
 assert.equal(furnaceNextAction({completed:true}).id,'replay');
});
