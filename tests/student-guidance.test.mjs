import test from 'node:test';
import assert from 'node:assert/strict';
import {mountActivity} from '../dist/activity-ladder.js';

test('activity guide identifies the four required metals rather than any four samples',()=>{
 const root={innerHTML:''};
 const records=new Set(['S:burn','S:wet','C:burn','C:wet','P:burn','P:wet','Cu:burn','Cu:wet']);
 mountActivity(root,{has:key=>records.has(key)});
 assert.match(root.innerHTML,/銅、鎂、鋅、鈉/);
 assert.doesNotMatch(root.innerHTML,/還差 銅/);
 for(const name of ['鎂','鋅','鈉'])assert.match(root.innerHTML,new RegExp('還差 '+name+'：加熱觀察、石蕊測試'));
});

test('activity guide distinguishes unobserved samples from unfinished water tests',()=>{
 const root={innerHTML:''};
 const records=new Set(['Cu:burn','Mg:burn','Mg:wet','Zn:burn','Zn:wet','Na:burn','Na:wet']);
 mountActivity(root,{has:key=>records.has(key)});
 assert.match(root.innerHTML,/還差 銅：石蕊測試/);
 assert.doesNotMatch(root.innerHTML,/還差 (鎂|鋅|鈉)/);
});
