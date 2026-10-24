import test from 'node:test';
import assert from 'node:assert/strict';
import {predictionQuestions,restorePredictions,commitPrediction,clearPredictionRecord,escapePredictionText} from '../dist/prediction-model.js';
test('13個操作單元都有獨立問題；所有選項含不確定都可留猜想',()=>{
 const ids=[...Array.from({length:7},(_,i)=>'main-'+(i+1)),...Array.from({length:3},(_,i)=>'prep-'+i),...Array.from({length:3},(_,i)=>'life-'+i)];
 assert.deepEqual(Object.keys(predictionQuestions).sort(),ids.sort());
 for(const id of ids){assert.equal(predictionQuestions[id].choices.length,4);assert.match(predictionQuestions[id].choices[3],/不確定/);for(let choice=0;choice<4;choice++){const data={};assert.equal(commitPrediction(data,id,choice,'我的理由'),true);assert.equal(data[id].choice,choice);}}
});
test('未送出、不合法題號和選項不能產生操作通行紀錄',()=>{
 const data={};for(const choice of [null,undefined,-1,4,NaN,Infinity,'0',0.5])assert.equal(commitPrediction(data,'main-2',choice),false);assert.equal(commitPrediction(data,'invented',0),false);assert.deepEqual(data,{});
});
test('原始猜想不可被重複送出改寫；回顧另存且刷新仍有原始選項',()=>{
 const data={};commitPrediction(data,'main-3',0,'加熱就會變');assert.equal(commitPrediction(data,'main-3',1,'已看答案'),false);data['main-3'].review='觀察後我修改了想法';const restored=restorePredictions(JSON.parse(JSON.stringify(data)));assert.deepEqual(restored,data);assert.equal(restored['main-3'].choice,0);
});
test('重設某一子卡只刪自己的猜想，未改其他卡或觀察進度',()=>{
 const data={};for(const id of ['prep-0','prep-1','life-2','main-2'])commitPrediction(data,id,3);const evidence={burn:['S'],answers:[1,0,2]},before=structuredClone(evidence);clearPredictionRecord(data,'prep-0');assert.equal(data['prep-0'],undefined);assert.equal(Object.keys(data).length,3);assert.deepEqual(evidence,before);assert.ok(data['prep-1']);
});
test('儲存入口過濾無效內容與限制長度，使用者文字安全顯示',()=>{
 const data=restorePredictions({'main-1':{choice:1,reason:'x'.repeat(999),review:'y'.repeat(999)},'prep-0':{choice:'0'},unknown:{choice:0}});assert.equal(Object.keys(data).length,1);assert.equal(data['main-1'].reason.length,240);assert.equal(data['main-1'].review.length,400);assert.equal(escapePredictionText('<img onerror="x"> & \'text\''),'&lt;img onerror=&quot;x&quot;&gt; &amp; &#39;text&#39;');assert.deepEqual(restorePredictions(null),{});
});
