import test from 'node:test';
import assert from 'node:assert/strict';
import {createIronReaction,ironReactionMarkup} from '../dist/iron-paired-reaction.js';
import {magnesiumReactionMarkup,oxygenTransferExamples,oxygenTransferMarkup} from '../dist/magnesium-paired-reaction.js';

function clock(){
 let time=0,next=0;const pending=new Map(),all=[];
 return {requestFrame:f=>{pending.set(++next,f);all.push(f);return next;},cancelFrame:id=>pending.delete(id),now:()=>time,step:()=>{time+=100;const queue=[...pending.values()];pending.clear();queue.forEach(f=>f(time));},all,pending};
}
test('one button press commits all three transfers only at completion; rapid clicks cannot stack runs',()=>{
 const c=clock(),progress=[];let finished=0;
 const run=createIronReaction({...c,onProgress:p=>progress.push(p),onComplete:()=>finished++});
 assert.equal(run.start(),true);assert.equal(run.start(),false);
 for(let i=0;i<31;i++)c.step();assert.equal(finished,0);assert.ok(progress.at(-1)<1);
 c.step();assert.equal(finished,1);assert.equal(progress.at(-1),1);assert.equal(c.pending.size,0);
 assert.equal(run.start(),true);for(let i=0;i<32;i++)c.step();assert.equal(finished,2);run.dispose();
});
test('hidden scenes pause; reset and switching away cancel even stale animation callbacks',()=>{
 const c=clock();let finished=0;const run=createIronReaction({...c,onComplete:()=>finished++});
 run.start();c.step();run.setVisible(false);for(let i=0;i<50;i++)c.step();assert.equal(finished,0);
 run.setVisible(true);c.step();run.dispose();c.all.forEach(f=>f(90000));assert.equal(finished,0);assert.equal(run.start(),false);
});
test('reduced motion reaches the same outcome without scheduling moving frames',()=>{
 const c=clock();let progress=0,finished=0;
 createIronReaction({...c,reducedMotion:true,onProgress:p=>progress=p,onComplete:()=>finished++}).start();
 assert.equal(progress,1);assert.equal(finished,1);assert.equal(c.pending.size,0);
});
test('initial and saved results keep the iron reaction balanced with exactly three oxygen destinations',()=>{
 const initial=ironReactionMarkup([]),complete=ironReactionMarkup([0,1,2]);
 assert.equal((initial.match(/data-oxygen-source=/g)||[]).length,3);
 assert.equal((initial.match(/data-oxygen-target=/g)||[]).length,3);
 assert.match(initial,/氧化鐵端 3 ＋ 氣體端 3 ＝ 6/);
 assert.match(complete,/氧化鐵端 0 ＋ 氣體端 6 ＝ 6/);
 assert.match(complete,/金屬鐵 · 2Fe/);assert.match(complete,/二氧化碳 · 3CO₂/);
});

test('magnesium transfers both CO2 oxygens to two separate Mg destinations and preserves the saved outcome',()=>{
 const initial=magnesiumReactionMarkup(),complete=magnesiumReactionMarkup([0,1],[0,1]);
 assert.equal((initial.match(/data-oxygen-source=/g)||[]).length,2);
 assert.equal((initial.match(/data-oxygen-target=/g)||[]).length,2);
 assert.match(initial,/CO₂ 端 2 ＋ 鎂這一端 0 ＝ 2/);
 assert.match(complete,/CO₂ 端 0 ＋ 鎂這一端 2 ＝ 2/);
 assert.match(complete,/留下碳 · C/);
 assert.match(complete,/氧化鎂 · 2MgO/);
 assert.match(complete,/CO₂ 被還原/);
 assert.match(complete,/鎂被氧化/);
 assert.match(complete,/data-phase="complete"/);
});

test('one-second preparation holds progress, ignores repeated starts, and cancels on leaving',()=>{
 const c=clock(),progress=[];let finished=0;
 const run=createIronReaction({...c,delay:1000,onProgress:p=>progress.push(p),onComplete:()=>finished++});
 run.start();for(let i=0;i<9;i++)c.step();assert.deepEqual(progress,[]);
 assert.equal(run.start(),false);c.step();assert.equal(progress.at(-1),0);
 c.step();assert.ok(progress.at(-1)>0);run.dispose();c.all.forEach(f=>f(100000));assert.equal(finished,0);
});
test('reduced motion still preserves the one-second reactant preview',()=>{
 const c=clock();let finished=0,progress=-1;
 const run=createIronReaction({...c,delay:1000,reducedMotion:true,onProgress:p=>progress=p,onComplete:()=>finished++});
 run.start();for(let i=0;i<9;i++)c.step();assert.equal(progress,-1);assert.equal(finished,0);
 c.step();assert.equal(progress,1);assert.equal(finished,1);run.dispose();
});
test('new copper oxide examples conserve every element and move each oxygen to one destination',()=>{
 const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4'};
 const atoms=terms=>{const counts={};for(const [n,formula] of terms){const normal=formula.replace(/[₀₁₂₃₄]/g,c=>subs[c]);for(const m of normal.matchAll(/([A-Z][a-z]?)(\d*)/g))counts[m[1]]=(counts[m[1]]||0)+(n||1)*(Number(m[2])||1);}return counts;};
 for(const e of oxygenTransferExamples.slice(1)){
  assert.deepEqual(atoms(e.species.slice(0,2)),atoms(e.species.slice(2)));
  const initial=oxygenTransferMarkup(e.id),complete=oxygenTransferMarkup(e.id,true);
  assert.equal((initial.match(/data-oxygen-source=/g)||[]).length,e.count);
  assert.equal((initial.match(/data-oxygen-target=/g)||[]).length,e.count);
  assert.match(initial,/data-phase="ready"/);assert.match(complete,/data-phase="complete"/);
  assert.ok(complete.includes(e.donorAfter));assert.ok(complete.includes(e.receiverAfter));
 }
});
