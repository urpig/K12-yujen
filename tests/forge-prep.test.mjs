import test from 'node:test';
import assert from 'node:assert/strict';
import {freshPrep,restorePrep,prepReady,prepMastered,checkAffinity,ironAppearanceStage,oxygenAffinitySeries,compareWithCarbon,ironOxygenLedger} from '../dist/forge-prep-model.js';
test('readiness requires complete correct evidence; a quiz answer alone is insufficient',()=>{const s=freshPrep();s.answers=[1,0,2];for(let i=0;i<3;i++)assert.equal(prepMastered(s,i),false);s.sorted=['burn','rust','breath','ice'];s.order=['Mg','C','Fe','Cu'];s.moved=[0,1];for(let i=0;i<3;i++)assert.equal(prepMastered(s,i),true);s.order=['C','Mg','Fe','Cu'];assert.equal(prepReady(s,1),false);assert.equal(checkAffinity(['Mg','C','Fe','Cu']),true);});
test('restoration filters invalid duplicates and does not grant unearned quiz completion',()=>{const s=restorePrep({tab:9,sorted:['burn','burn','fake'],order:['Mg','Mg','fake'],moved:[0,0,4],answers:[1,0,2]});assert.deepEqual(s,{...freshPrep(),sorted:['burn'],order:['Mg'],moved:[0],targets:[0]});assert.deepEqual(restorePrep(null),freshPrep());});
test('old A answer is cleared while B completion and partial transfers survive reload',()=>{const raw={version:2,tab:2,sorted:['burn','rust','breath','ice'],order:['Mg','C','Fe','Cu'],moved:[1],answers:[1,0,2]};const s=restorePrep(raw);assert.equal(prepMastered(s,0),false);assert.equal(prepMastered(s,1),true);assert.equal(prepReady(s,2),false);assert.equal(s.answers[2],2);});
test('appearance remains bounded and distinguishes solid porous metal from molten iron',()=>{assert.equal(ironAppearanceStage(-5).fraction,0);assert.equal(ironAppearanceStage(NaN).fraction,0);assert.equal(ironAppearanceStage(1).fraction,1/3);assert.equal(ironAppearanceStage(2).fraction,2/3);assert.equal(ironAppearanceStage(30).fraction,1);assert.match(ironAppearanceStage(3).description,/固態/);assert.match(ironAppearanceStage(2).description,/不是成分比例/);});
test('requested sequence has seventeen distinct elements and compares carbon on both sides',()=>{
 assert.equal(oxygenAffinitySeries.map(x=>x.name).join('、'),'鉀、鈉、鈣、鎂、鋁、碳、鋅、鉻、鐵、錫、鉛、氫、銅、汞、銀、鉑、金');
 for(const id of ['K','Na','Ca','Mg','Al'])assert.equal(compareWithCarbon(id).relation,'greater');
 for(const id of ['Zn','Cr','Fe','Sn','Pb','H','Cu','Hg','Ag','Pt','Au'])assert.equal(compareWithCarbon(id).relation,'less');
 assert.equal(compareWithCarbon('C').relation,'same');assert.equal(compareWithCarbon('CO'),null);
});
test('each accepted oxygen leaves the oxide and arrives at CO without duplicating any atom',()=>{
 for(const pairs of [[],[2],[2,0],[2,0,1],[2,0,1,1,-1,'2',NaN]]){
  const ledger=ironOxygenLedger(pairs);
  assert.equal(ledger.oxideOxygen+ledger.gasOxygen,6);
  assert.deepEqual(ledger.total,{Fe:2,C:3,O:6});
  assert.equal(ledger.count,ledger.carbonDioxide);
 }
 assert.equal(ironOxygenLedger([2,2]).count,1);assert.equal(ironOxygenLedger(null).count,0);
});
test('migration keeps earlier operations but does not carry answers into revised B/C questions',()=>{
 const raw={tab:1,sorted:['burn','rust','breath','ice'],order:['Mg','C','Fe','Cu'],moved:[1,0],targets:[0,1],answers:[1,0,2]};
 const s=restorePrep(raw);assert.deepEqual(s.order,raw.order);assert.deepEqual(s.moved,raw.moved);assert.deepEqual(s.answers,[null,null,null]);assert.equal(s.version,3);
});
test('removed iron intro migrates to magnesium without awarding its observation',()=>{
 const raw={...freshPrep(),ironPairs:[2,1,0],reaction:'iron',answers:[null,null,2]};
 const restored=restorePrep(raw);assert.equal(restored.reaction,'magnesium');assert.equal(prepMastered(restored,2),false);assert.equal(restored.answers[2],2);
 for(const reaction of ['magnesium','biology','bleach','food'])assert.equal(restorePrep({...raw,reaction}).reaction,reaction);
 const complete=restorePrep({...raw,moved:[0,1],targets:[0,1]});assert.equal(prepMastered(complete,2),true);
});

test('moving life examples to D preserves records and keeps C independently selectable',()=>{
 for(const reaction of ['biology','bleach','food']){
  const raw={...freshPrep(),version:2,tab:2,reaction,moved:[0,1],targets:[0,1],answers:[null,null,2]};
  const migrated=restorePrep(raw);assert.equal(migrated.tab,3);assert.equal(migrated.reaction,reaction);assert.equal(prepMastered(migrated,2),true);
  const backToC=restorePrep({...migrated,tab:2});assert.equal(backToC.tab,2);assert.equal(backToC.reaction,reaction);
  assert.equal(prepReady(migrated,3),false);assert.equal(prepMastered(migrated,3),false);
 }
 assert.equal(restorePrep({...freshPrep(),version:2,tab:2,reaction:'magnesium'}).tab,2);
 assert.equal(restorePrep({...freshPrep(),tab:3}).tab,3);
});

test('new A answer survives reload after answering the revised question',()=>{const raw={...freshPrep(),sorted:['burn','rust','breath','ice'],answers:[1,null,null]};assert.equal(prepMastered(restorePrep(raw),0),true);});

test('early A-C answers persist, while mastery still requires the corresponding operation',()=>{for(const answers of [[1,0,2],[0,1,0]]){const raw={...freshPrep(),answers};const restored=restorePrep(raw);assert.deepEqual(restored.answers,answers);for(let i=0;i<3;i++)assert.equal(prepMastered(restored,i),false);}assert.deepEqual(restorePrep({...freshPrep(),answers:[3,-1,'2']}).answers,[null,null,null]);});
