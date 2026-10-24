import {rodRotation} from './lab-geometry.js';
import {buildForgeScene} from './forge-scenes.js';
const metal=[.56,.61,.59],steel=[.67,.71,.7],ceramic=[.84,.81,.7],copper=[.69,.34,.18],black=[.12,.13,.12],white=[.91,.9,.82];
const lerp=(a,b,t)=>a.map((x,i)=>x+(b[i]-x)*t);
export function buildLabScene(config,time=0){
 if(['furnace','steel','rust'].includes(config.type))return buildForgeScene(config,time);
 const o=[],key=config.key||'Cu',phase=config.phase||'before',after=phase==='product'||phase==='after',heating=phase==='heating',progress=after?1:heating?Math.min(1,time/4.2):0;
 const add=(shape,p,s,c=metal,kind=0,extra={})=>{const item={shape,p,s,c,kind,...extra};o.push(item);return item;};
 const box=(x,y,z,w,h,d,c=metal,kind=0,extra={})=>add('box',[x,y,z],[w/2,h/2,d/2],c,kind,extra);
 const sphere=(x,y,z,rx,ry,rz,c,kind=3,extra={})=>add('sphere',[x,y,z],[rx,ry,rz],c,kind,extra);
 const cylinder=(x,y,z,r,h,c=metal,extra={})=>add('cylinder',[x,y,z],[r,h/2,r],c,extra.kind||0,extra);
 const ring=(x,y,z,r,c=steel,extra={})=>add(extra.kind===2?'thinring':'ring',[x,y,z],[r,r,r],c,extra.kind||0,extra);
 function rod(a,b,r,c=steel,extra={}){const d=b.map((x,i)=>x-a[i]),len=Math.hypot(...d);const rotation=rodRotation(d);add('cylinder',a.map((x,i)=>(x+b[i])/2),[r,len/2,r],c,0,{r:rotation,...extra});}
 function powder(x,y,z,color,count=32,radius=50){sphere(x,y-1,z,radius*.92,5,radius*.5,color,3);for(let i=0;i<count;i++){const t=i*2.3999,r=Math.sqrt((i+.5)/count)*radius,h=3+(i*7%9);sphere(x+Math.cos(t)*r,y-h*.3,z+Math.sin(t)*r*.55,1.2+i%3*.6,h*.18,1.1+i%3*.5,color,3);}}
 function bowl(x,y,z,r=73){cylinder(x,y+6,z,r,9,[.65,.63,.53],{kind:1});cylinder(x,y,z,r*.94,6,ceramic,{kind:1});ring(x,y-2,z,r*.97,[.91,.89,.77],{kind:1});}
 function specimen(k,x,y,z,oxidized=false,cool=true,amount=1){
  const product={Na:[.88,.82,.52],Mg:white,Zn:cool?white:[.91,.73,.2],Cu:[.1,.11,.1],S:[.82,.72,.1],P:[.92,.91,.86],C:black,CO:black};
  if(oxidized&&k!=='Cu'){powder(x,y,z,product[k]||white,Math.max(6,Math.round(35*amount)),45);return;}
  if(k==='Cu'){const col=oxidized?black:copper;box(x,y-3,z,100,5,50,col,0,{r:[-.12,.18,-.12]});if(oxidized)box(x,y-6,z,97,1,48,black,3,{r:[-.12,.18,-.12]});}
  else if(k==='Mg'){add('beam:.28',[x,y-5,z],[41,41,90],[.78,.8,.77],0,{r:[-.2,.3,-.25]});}
  else if(k==='Na'){box(x,y-10,z,28,20,30,[.73,.75,.72],0,{r:[.04,.3,.05]});}
  else if(k==='C'||k==='CO'){for(let i=0;i<6;i++)add('rock',[x+(i%3-1)*18,y-9-(i%2)*7,z+(i%2)*15],[17,13,15],[.15,.16,.14],3,{r:[.1,i*.7,.2]});}
  else powder(x,y,z,k==='Zn'?[.56,.59,.58]:k==='P'?[.5,.15,.1]:[.85,.72,.12],40,48);
 }
 function fire(x,y,z,h=65,color=[.96,.6,.16],strength=1){const sway=Math.sin(time*7)*2.8;add('flame',[x+sway,y-h/2,z],[h*.28,h*.55,h*.2],color,5,{alpha:.68*strength,glow:1});add('flame',[x-sway*.4,y-h*.34,z+4],[h*.12,h*.32,h*.09],lerp(color,[1,1,.86],.7),5,{alpha:.83*strength,glow:1});}
 function heatStand(x,y,lit=true){
  // Rounded glass alcohol reservoir, liquid, collar and cotton wick.
  cylinder(x,y+55,0,37,4,[.51,.6,.57]);
  sphere(x,y+39,0,35,20,30,[.9,.96,.95],2,{alpha:.75});
  cylinder(x,y+44,0,28,18,[.91,.95,.92],{kind:2,alpha:.48});
  cylinder(x,y+21,0,14,8,[.64,.68,.64]);cylinder(x,y+14,0,4,8,[.82,.79,.65],{kind:1});
  rod([x-25,y+34,22],[x-21,y+45,25],1.2,[.98,.99,.96]);
  cylinder(x+54,y+51,4,12,13,[.62,.67,.63]);ring(x,y-36,0,79,metal);
  for(const d of [-1,1])rod([x+d*64,y-34,-8],[x+d*86,y+58,8],3);
  if(lit)fire(x,y+10,12,46,[.43,.61,.9]);
 }

 function glass(x,top,bottom,r=80,sediment=null){const y=(top+bottom)/2,h=bottom-top;add('shell',[x,y,0],[r,h/2,r],[.89,.94,.94],2,{alpha:.24});ring(x,top,0,r,[.82,.93,.95],{kind:2,alpha:.68});ring(x,bottom,0,r*.97,[.81,.9,.91],{kind:2,alpha:.4});rod([x-r*.89,top+14,r*.42],[x-r*.89,bottom-13,r*.42],.8,[.95,.97,.93]);if(sediment)powder(x,bottom-4,0,sediment,45,r*.77);for(let i=0;i<5;i++)box(x+r*.87,top+20+i*24,r*.35,14,1.2,1,[.54,.64,.62],0,{alpha:.5});}
 function room(){box(320,178,-180,680,440,4,[.91,.93,.88],1);box(320,329,-35,680,12,270,[.81,.83,.75],1);box(320,337,99,680,5,3,[.65,.7,.63]);}
 room();
 let animate=false,pitch=.15,size=config.size||[640,360];
 if(config.type==='burner'){
  heatStand(440,245);bowl(440,184,0,83);if(config.reacting){specimen('Cu',440,175,20,true);if(key!=='alone')specimen(key==='carbon'?'C':key==='ZnCu'?'Zn':'Cu',460,172,25);animate=true;}
 }
 if(config.type==='metal'){
  size=[640,340];heatStand(320,245,heating);bowl(320,207,0,91);const col=key==='Cu'?lerp(copper,black,progress):null;
  if(key==='Cu'){box(320,192,12,105,5,52,col,progress>.8?3:0,{r:[-.1,.15,-.13]});}
  else {if(progress<.65)specimen(key,320,190,14);if(progress>.25)specimen(key,320,195,14,true,key==='Zn'?!!config.cool:true,Math.max(.25,progress));}
  if(heating&&key!=='Cu'){const flame={Mg:[1,.99,.9],Na:[1,.73,.08],Zn:[.25,.84,.64]}[key];fire(320,195,30,key==='Mg'?52:86,flame);if(key==='Mg'){sphere(320,183,35,24,18,20,[1,1,.96],5,{glow:1,alpha:.8});sphere(320,183,34,52,38,8,[1,1,.94],5,{glow:1,alpha:.12});}}
  animate=heating;
 }
 if(config.type==='nonmetal'){
  size=[640,320];bowl(168,227,0,78);if(!after)specimen(key,168,212,10,false);else if(key==='CO')for(let i=0;i<3;i++)add('rock',[152+i*14,216,8],[8,5,6],black,3);
  if(heating){if(key==='C'||key==='CO'){fire(168,282,25,41,[.93,.36,.12]);for(let i=0;i<5;i++)sphere(150+i*9,204-(i%2)*5,27,9,7,6,[.7,.17,.07],5,{glow:.65});}else fire(168,208,20,key==='P'?88:67,key==='S'?[.22,.44,.9]:[1,.9,.64]);if(key==='P')for(let i=0;i<11;i++){const rise=(time*35+i*13)%145;sphere(166+Math.sin(i*1.8+time)*17,180-rise,i%3*7,8+rise*.1,11+rise*.07,7,[.93,.94,.92],1,{alpha:.5*(1-rise/180)});}}
  if(after&&key==='P')powder(168,219,0,white,60,53);
  // Colourless gases are traced with arrows, never rendered as coloured smoke.
  if(key!=='P'&&(heating||after))for(let i=0;i<5;i++){const rise=(time*30+i*31)%155,x=156+Math.sin(i*1.6)*34,y=195-rise;rod([x,y,40],[x,y-15,40],1,[.54,.65,.55],{alpha:.5});rod([x,y-15,40],[x-4,y-10,40],1,[.54,.65,.55],{alpha:.5});rod([x,y-15,40],[x+4,y-10,40],1,[.54,.65,.55],{alpha:.5});}
  animate=heating||(after&&key!=='P');
 }
 if(config.type==='litmus'){
  pitch=.1;glass(370,118,283,112,config.sediment);cylinder(370,234,0,109,93,[.95,.98,.97],{kind:2,alpha:.21});ring(370,187,0,109,[.88,.94,.94],{kind:2,alpha:.5});
  for(const x of [82,202])cylinder(x,148,-10,3,123,[.47,.39,.28]);box(142,96,0,145,8,30,[.48,.43,.32],1);box(142,209,-6,150,9,39,[.58,.51,.38],1);
  if(config.dipping){const radius=14+(time*30)%38;ring(365,187,5,radius,[.79,.87,.85],{kind:2,alpha:.4});animate=true;}
 }
 if(config.type==='redox'){
  if(key==='ZnCu'||key==='CuZn'){bowl(172,229,0);bowl(473,229,0);specimen(key==='ZnCu'?'Zn':'Cu',172,217,15,key==='ZnCu');specimen(key==='ZnCu'?'Cu':'Zn',473,217,15,key==='CuZn');}
  else {bowl(185,229,0,91);if(key==='alone')specimen('Cu',185,217,15,true);else powder(185,217,15,copper,45,67);glass(478,104,257,65);}
 }
 if(config.type==='iron'){
  for(const x of [145,207])sphere(x,135,10,22,22,22,[.49,.56,.52],0);
  for(let i=0;i<3;i++)if(!config.hiddenOxygen?.includes(i)){const transfer=config.transfers?.[i]||0,x=118+i*58+transfer*(330-i*58),y=205-transfer*50;sphere(x,y,20,22,22,22,[.77,.37,.21],1);}
  box(177,254,-4,175,6,100,[.67,.72,.64],1);
 }
 return {objects:o,animate,pitch,size};
}


