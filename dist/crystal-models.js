import {crystalData} from './crystal-data.js';
import {elements} from './model.js';

const ionicRadii={K:1.38,Na:1.02,Ca:1,Mg:.72,Al:.535,Zn:.6,Cr:.615,Fe:.645,Sn:.69,Pb:1.19,Cu:.73,Hg:1.02,Ag:.67,Pt:.625,Au:.68,O:1.35};
export function cellBasis(record){
 const [a,b,c]=record.lattice,[alpha,beta,gamma]=record.angles.map(d=>d*Math.PI/180);
 const cx=c*Math.cos(beta),cy=c*(Math.cos(alpha)-Math.cos(beta)*Math.cos(gamma))/Math.sin(gamma);
 return[[a,0,0],[b*Math.cos(gamma),b*Math.sin(gamma),0],[cx,cy,Math.sqrt(Math.max(0,c*c-cx*cx-cy*cy))]];
}
export function fractionalToCartesian(f,basis){return[0,1,2].map(i=>f.reduce((sum,v,j)=>sum+v*basis[j][i],0));}
export function formulaUnitsPerCell(symbol){return crystalData[symbol]?crystalData[symbol].atoms.filter(a=>a.symbol==='O').length/elements[symbol].oxideOxygen:1;}
const gcd=(a,b)=>b?gcd(b,a%b):a;
const lcm=(a,b)=>a*b/gcd(a,b);
export function reactionMultiple(a,b,reaction){
 const kb=formulaUnitsPerCell(b),mb=kb/gcd(kb,reaction.counts.oxideB);
 if(!reaction.reacts)return mb;
 const ka=formulaUnitsPerCell(a),ma=ka/gcd(ka,reaction.counts.oxideA);
 return lcm(ma,mb);
}
function gridDimensions(count,lengths=[1,1,1]){
 let best=[count,1,1],score=Infinity;
 for(let x=1;x<=count;x++)if(count%x===0)for(let y=1;y<=count/x;y++)if(count/x%y===0){
  const dimensions=[x,y,count/x/y],spans=dimensions.map((v,i)=>v*lengths[i]),candidate=Math.max(...spans)/Math.min(...spans);
  if(candidate<score){score=candidate;best=dimensions;}
 }
 return best;
}
export function compoundAtoms(symbol,formulaUnits=formulaUnitsPerCell(symbol)){
 if(symbol==='C'||symbol==='H'){
  const angle=104.4776*Math.PI/360;
  const molecule=symbol==='C'?[{symbol:'C',p:[0,0,0],radius:.76},{symbol:'O',p:[-1.1621,0,0],radius:.66},{symbol:'O',p:[1.1621,0,0],radius:.66}]:[{symbol:'O',p:[0,0,0],radius:.66},{symbol:'H',p:[Math.sin(angle)*.9578,Math.cos(angle)*.9578,0],radius:.31},{symbol:'H',p:[-Math.sin(angle)*.9578,Math.cos(angle)*.9578,0],radius:.31}];
  const [nx,ny,nz]=gridDimensions(formulaUnits),result=[];
  for(let x=0;x<nx;x++)for(let y=0;y<ny;y++)for(let z=0;z<nz;z++)for(const atom of molecule)result.push({...atom,p:atom.p.map((v,i)=>v+[x,y,z][i]*4.2)});
  return result;
 }
 const record=crystalData[symbol],basis=cellBasis(record),cells=formulaUnits/formulaUnitsPerCell(symbol);
 if(!Number.isInteger(cells)||cells<1)throw Error('Compound requires whole cells: '+symbol);
 const [nx,ny,nz]=gridDimensions(cells,record.lattice),result=[];
 for(let x=0;x<nx;x++)for(let y=0;y<ny;y++)for(let z=0;z<nz;z++)for(const atom of record.atoms){
  result.push({symbol:atom.symbol,p:fractionalToCartesian(atom.f.map((v,i)=>v+[x,y,z][i]),basis),radius:atom.symbol==='O'?1.05:Math.max(.9,ionicRadii[atom.symbol])});
 }
 return result;
}
function elementalAtoms(symbol,count){
 const units=symbol==='H'?count/2:count,[nx,ny,nz]=gridDimensions(units),result=[];
 for(let x=0;x<nx;x++)for(let y=0;y<ny;y++)for(let z=0;z<nz;z++){
  const p=[x*2.5,y*2.5,z*2.5];
  if(symbol==='H')for(const sign of [-1,1])result.push({symbol,p:[p[0]+sign*.7414/2,p[1],p[2]],radius:.38});
  else result.push({symbol,p,radius:1.05});
 }
 return result;
}
function fittedGroup(atoms,center){
 const low=[0,1,2].map(i=>Math.min(...atoms.map(a=>a.p[i]-a.radius))),high=[0,1,2].map(i=>Math.max(...atoms.map(a=>a.p[i]+a.radius)));
 const scale=Math.min(...high.map((v,i)=>[2.3,2.05,1.9][i]/(v-low[i]))),middle=high.map((v,i)=>(v+low[i])/2);
 return atoms.map(a=>({...a,p:a.p.map((v,i)=>(v-middle[i])*scale+center[i]),radius:a.radius*scale}));
}
export function createReactionGeometry(a,b,reaction){
 const multiple=reactionMultiple(a,b,reaction),counts={a:reaction.counts.a*multiple,b:reaction.counts.b*multiple,oxygen:reaction.counts.oxygen*multiple};
 const left=[-1.55,.1,0],right=[1.55,.1,0];
 const initialA=fittedGroup(elementalAtoms(a,counts.a),left),initialB=fittedGroup(compoundAtoms(b,reaction.counts.oxideB*multiple),right);
 const finalA=reaction.reacts?fittedGroup(compoundAtoms(a,reaction.counts.oxideA*multiple),left):initialA;
 const finalB=reaction.reacts?fittedGroup(elementalAtoms(b,counts.b),right):initialB;
 const aEnd=finalA.filter(atom=>atom.symbol!=='O'),bStart=initialB.filter(atom=>atom.symbol!=='O');
 const oxygenStart=initialB.filter(atom=>atom.symbol==='O'),oxygenEnd=reaction.reacts?finalA.filter(atom=>atom.symbol==='O'):oxygenStart;
 const atoms=[];
 for(let i=0;i<counts.a;i++)atoms.push({symbol:a,before:initialA[i].p,after:aEnd[i].p,radiusBefore:initialA[i].radius,radiusAfter:aEnd[i].radius});
 for(let i=0;i<counts.b;i++)atoms.push({symbol:b,before:bStart[i].p,after:finalB[i].p,radiusBefore:bStart[i].radius,radiusAfter:finalB[i].radius});
 for(let i=0;i<counts.oxygen;i++)atoms.push({symbol:'O',before:oxygenStart[i].p,after:oxygenEnd[i].p,radiusBefore:oxygenStart[i].radius,radiusAfter:oxygenEnd[i].radius});
 if(!reaction.reacts)atoms.forEach(atom=>{atom.after=atom.before;atom.radiusAfter=atom.radiusBefore;});
 return{atoms,multiple,counts};
}
export function compoundDescription(symbol){
 if(symbol==='C')return{name:'CO₂・直線形分子',detail:'O=C=O，鍵角 180°',source:'https://cccbdb.nist.gov/expgeom2x.asp?casno=124389'};
 if(symbol==='H')return{name:'H₂O・彎曲形分子',detail:'H–O–H，鍵角約 104.5°',source:'https://cccbdb.nist.gov/expgeom2x.asp?casno=7732185'};
 const record=crystalData[symbol];return{name:record.name,detail:'晶體片段 · COD '+record.cod,source:record.source};
}
