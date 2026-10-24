import {compoundAtoms,formulaUnitsPerCell,compoundDescription} from './crystal-models.js';
import {moleculeData} from './molecule-data.js';

const modelRadii={H:.31,C:.76,O:.66,S:1.05,P:1.07};
const nist='https://cccbdb.nist.gov/expgeom2x.asp?casno=';
export function lessonSpecies(key){
 let atoms,name,detail,source;
 if(moleculeData[key]){
  const d=moleculeData[key];atoms=d.atoms.map(a=>({...a,radius:modelRadii[a.symbol]}));source=d.source;detail=d.method;
  name={S8:'硫 S₈ · 環狀分子',P4O10:'P₄O₁₀ · 籠狀分子',glucose:'葡萄糖 C₆H₁₂O₆ · 一種環狀構形'}[key];
 }else if(key==='SO2'){
  const t=119.5*Math.PI/360;
  atoms=[{symbol:'S',p:[0,0,0],radius:1.05},...[-1,1].map(x=>({symbol:'O',p:[x*Math.sin(t)*1.432,Math.cos(t)*1.432,0],radius:.66}))];
  name='SO₂ · 彎曲形分子';detail='O–S–O 鍵角 119.5°，S–O 約 1.432 Å';source=nist+'7446095';
 }else if(key==='O2'||key==='CO'){
  const length=key==='O2'?1.2075:1.1282;
  atoms=[{symbol:key==='O2'?'O':'C',p:[-length/2,0,0],radius:key==='O2'?.66:.76},{symbol:'O',p:[length/2,0,0],radius:.66}];
  name=key==='O2'?'氧氣 O₂ · 雙原子分子':'一氧化碳 CO · 雙原子分子';detail='NIST 實驗分子幾何';source=nist+(key==='O2'?'7782447':'630080');
 }else if(key==='H2O'||key==='CO2'){
  const s=key==='H2O'?'H':'C',d=compoundDescription(s);atoms=compoundAtoms(s);name=d.name;detail=d.detail;source=d.source;
 }else if(key.endsWith('-oxide')){
  const s=key.replace('-oxide',''),d=compoundDescription(s);atoms=compoundAtoms(s);name=d.name;detail=d.detail;source=d.source;
 }else{
  const s=key.replace('2+','');atoms=[{symbol:s,p:[0,0,0],radius:1}];name=key.includes('2+')?key.replace('2+','²⁺')+' · 離子球示意':s+' · 元素原子示意';detail='元素球色參考肉眼外觀；單球不是金屬晶格';source='';
 }
 return{atoms,name,detail,source};
}

export function fitLessonAtoms(atoms,center=[0,.15,0],size=[4.5,2.6,2.4]){
 const lo=[0,1,2].map(i=>Math.min(...atoms.map(a=>a.p[i]-a.radius))),hi=[0,1,2].map(i=>Math.max(...atoms.map(a=>a.p[i]+a.radius)));
 const mid=hi.map((v,i)=>(v+lo[i])/2),scale=Math.min(...size.map((v,i)=>v/(hi[i]-lo[i])));
 return atoms.map(a=>({...a,p:a.p.map((v,i)=>(v-mid[i])*scale+center[i]),radius:a.radius*scale}));
}
export function staticLessonGeometry(key){
 const atoms=fitLessonAtoms(lessonSpecies(key).atoms).map(a=>({symbol:a.symbol,before:a.p,after:a.p,radiusBefore:a.radius,radiusAfter:a.radius}));
 return{atoms,multiple:1,counts:atoms.reduce((r,a)=>(r[a.symbol]=(r[a.symbol]||0)+1,r),{})};
}

// The same complete hematite cell as card 01, with one CO per oxide O.
// Every atom keeps its identity through the interpolated oxygen accounting.
export function furnaceReductionGeometry(){
 const oxide=compoundAtoms('Fe'),units=formulaUnitsPerCell('Fe'),feCount=oxide.filter(a=>a.symbol==='Fe').length,oCount=oxide.filter(a=>a.symbol==='O').length;
 const molecules=[],products=[];
 const n=Math.ceil(Math.sqrt(oCount));
 for(let i=0;i<oCount;i++){
  const offset=[(i%n)*3.8,Math.floor(i/n)*3.8,0];
  for(const a of lessonSpecies('CO').atoms)molecules.push({...a,p:a.p.map((v,j)=>v+offset[j])});
  for(const a of lessonSpecies('CO2').atoms)products.push({...a,p:a.p.map((v,j)=>v+offset[j])});
 }
 const initial=fitLessonAtoms(oxide,[-1.6,.1,0],[2.2,2.15,2]),co=fitLessonAtoms(molecules,[1.6,.1,0],[2.3,2.3,1.8]),co2=fitLessonAtoms(products,[1.6,.1,0],[2.3,2.3,1.8]);
 const iron=fitLessonAtoms(Array.from({length:feCount},(_,i)=>({symbol:'Fe',p:[i%3*2,Math.floor(i/3)%2*2,Math.floor(i/6)*2],radius:1})),[-1.6,.1,0],[2.2,2.15,2]);
 const pairs=[];
 const connect=(from,to)=>from.forEach((a,i)=>pairs.push({symbol:a.symbol,before:a.p,after:to[i].p,radiusBefore:a.radius,radiusAfter:to[i].radius}));
 connect(initial.filter(a=>a.symbol==='Fe'),iron);
 connect(co.filter(a=>a.symbol==='C'),co2.filter(a=>a.symbol==='C'));
 const outO=co2.filter(a=>a.symbol==='O');
 connect(co.filter(a=>a.symbol==='O'),outO.filter((_,i)=>i%2===0));
 connect(initial.filter(a=>a.symbol==='O'),outO.filter((_,i)=>i%2===1));
 return{atoms:pairs,multiple:units,counts:{Fe:feCount,C:oCount,O:2*oCount}};
}
