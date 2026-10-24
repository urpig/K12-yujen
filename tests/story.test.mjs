import test from 'node:test';import assert from 'node:assert/strict';
import {chapters} from '../dist/story-data.js';import {required,initialState,ready,sanitize,cases} from '../dist/story-state.js';import {storyScene} from '../dist/story-scenes.js';
import {scopeMarkup} from '../dist/card-markup.js';import {wetLabMarkup} from '../dist/wet-lab.js';import {nonmetals} from '../dist/model.js';
test('16 individual stories, quizzes and option-specific feedback',()=>{assert.equal(chapters.length,16);for(const [i,c] of chapters.entries()){assert.equal(c.id,i+1);for(const key of ['title','question','opening','task','conclusion','bridge','safety'])assert.ok(c[key]?.trim().length,`${c.id} ${key}`);assert.equal(c.quiz.options.length,4);assert.equal(c.quiz.explanations.length,4);assert.equal(new Set(c.quiz.explanations).size,4);assert.ok(c.quiz.answer>=0&&c.quiz.answer<4);}});
test('no card unlocks before every required observation',()=>{for(const c of chapters){const s=initialState(c),needed=required(c);assert.equal(ready(c,s),false);for(const k of needed){assert.equal(ready(c,s),false);s.evidence.push(k);}assert.equal(ready(c,s),true);}});
test('persisted incomplete observations cannot open a quiz or create mastery',()=>{for(const c of chapters){const s=sanitize(c,{quizOpen:true,answer:c.quiz.answer,evidence:['bogus']});assert.equal(s.quizOpen,false);assert.equal(s.answer,null);assert.deepEqual(s.evidence,[]);}});
test('completed progress survives reload, invalid values are discarded',()=>{for(const c of chapters){const s=sanitize(c,{evidence:required(c),quizOpen:true,answer:c.quiz.answer,phase:'after'});assert.ok(ready(c,s));assert.equal(s.answer,c.quiz.answer);assert.equal(s.phase,'after');assert.equal(sanitize(c,{evidence:required(c),quizOpen:true,answer:99}).answer,null);}});
test('every material and comparison is required',()=>{assert.deepEqual(required(chapters[5]),['Na','Mg','Zn','Cu']);assert.deepEqual(required(chapters[9]),['S','P','C','CO']);assert.deepEqual(required(chapters[4]),['burn','cool']);assert.deepEqual(required(chapters[8]),['C','CO']);assert.deepEqual(required(chapters[13]),['ore','coke','full']);});
test('each new physical scene responds to its supported controls',()=>{for(const type of ['mine','activity','redox','reduction','furnace','slag','steel']){assert.notEqual(storyScene(type,{phase:'before'}),storyScene(type,{phase:'after'}));assert.match(storyScene(type),/preserveAspectRatio="xMidYMid meet"/);}for(const type of ['furnace','steel','activity']){const views=cases[type].map(([key])=>storyScene(type,{phase:'after',recipe:key,material:key,pair:key}));assert.equal(new Set(views).size,views.length);}});
test('key scientific qualifications remain explicit',()=>{assert.match(chapters[3].conclusion,/Na₂O₂/);assert.match(chapters[5].conclusion,/兩性/);assert.match(chapters[7].conclusion,/白煙不是白色氣體/);assert.match(chapters[8].conclusion,/混有/);assert.match(chapters[13].safety,/非所有古代/);assert.match(chapters[15].conclusion,/古代也有煉鋼/);});
test('repeated sulfur experiments have independent SVG paint servers on the same page',()=>{const markup=[7,10].map(id=>scopeMarkup(wetLabMarkup(nonmetals.S,'S'),'card-'+id)).join('');const ids=[...markup.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);for(const ref of markup.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(ref[1]));assert.match(markup,/fill="#c46579"/);});
test('card labels are scoped while links to the next card remain real page anchors',()=>{const markup=scopeMarkup('<h2 id="title">題目</h2><section aria-labelledby="title"><a href="#card-8">下一張</a></section>','card-7');assert.match(markup,/aria-labelledby="card-7-title"/);assert.match(markup,/href="#card-8"/);});
test('ore exploration resumes at the last completed step after interrupted animation',()=>{
 const c=chapters[0];
 for(const [evidence,phase,expected] of [[['inspect'],'heating','inspected'],[['inspect','heat'],'cooling','hot'],[['inspect','heat','cool'],'after','after']]){
  const state=sanitize(c,{evidence,phase,quizOpen:true});
  assert.equal(state.phase,expected);assert.deepEqual(state.evidence,evidence);
  assert.equal(state.quizOpen,evidence.length===3);
 }
});
test('old one-click progress and out-of-order ore observations cannot bypass exploration',()=>{
 const c=chapters[0];
 for(const evidence of [['run'],['heat','cool'],['inspect','cool']]){
  const state=sanitize(c,{evidence,phase:'after',quizOpen:true,answer:c.quiz.answer});
  assert.equal(ready(c,state),false);assert.equal(state.quizOpen,false);assert.equal(state.answer,null);
  assert.deepEqual(state.evidence,evidence.includes('inspect')?['inspect']:[]);
 }
});
