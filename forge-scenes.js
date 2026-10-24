import {buildFurnaceEffects} from './furnace-effects.js';
import {rodRotation} from './lab-geometry.js';
export function buildForgeScene(config,time=0){
 const o=[],type=config.type,key=config.key,after=config.phase==='after';let animate=false;
 const add=(shape,p,s,c,kind=0,extra={})=>{o.push({shape,p,s,c,kind,...extra});};
 const box=(x,y,z,w,h,d,c,kind=0,extra={})=>add('box',[x,y,z],[w/2,h/2,d/2],c,kind,extra);
 const ball=(x,y,z,r,c,extra={})=>add('sphere',[x,y,z],[r,r,r],c,3,extra);
 const rod=(a,b,r,c,extra={})=>{const d=b.map((v,i)=>v-a[i]);add('cylinder',a.map((v,i)=>(v+b[i])/2),[r,Math.hypot(...d)/2,r],c,0,{r:rodRotation(d),...extra});};
 const metal=[.43,.5,.48],trim=[.69,.73,.68],dark=[.24,.29,.26];
 const size=type==='furnace'?[760,530]:type==='rust'?[760,390]:[760,430];
 box(380,size[1]/2,-180,800,size[1]+50,4,[.91,.94,.88],1);box(380,type==='furnace'?510:size[1]-50,-15,800,12,300,[.78,.82,.73],1);
 function sword(x,y,z,length=340,bend=0,broken=false){
  const h=length/2,col=key==='pig'?[.43,.48,.45]:[.65,.72,.71],shape='blade:'+bend.toFixed(2);
  if(broken){add(shape+':left',[x,y,z],[h,h,80],col);add(shape+':right',[x+4,y+18,z],[h,h,80],col,0,{r:[0,0,.1]});for(let i=0;i<5;i++)add('rock',[x+17+i*7,y+49+i*4,z+2],[3,4,2],dark,3);}
  else add(shape,[x,y,z],[h,h,80],col);
  rod([x-h-8,y-31,z],[x-h-8,y+31,z],5,[.62,.48,.27]);rod([x-h-70,y,z],[x-h-14,y,z],9,[.29,.22,.15]);for(let i=0;i<7;i++)rod([x-h-65+i*7,y-8,z+5],[x-h-62+i*7,y+8,z+5],1.4,[.61,.49,.33]);ball(x-h-77,y,z,12,[.62,.5,.3]);
 }
 if(type==='steel'){
  for(const x of [270,595]){box(x,320,0,32,100,55,metal);box(x,370,0,90,13,100,dark);rod([x,267,-19],[x,267,27],11,trim);for(const y of [300,343])ball(x,y,29,4.5,trim);}
  box(432,380,-7,450,8,100,[.54,.58,.5]);
  const load=config.load||0,deformation=Math.max(0,(load-.3)/.7)*(key==='wrought'?.31:key==='steel'?.16:.035);
  if(config.mounted){const bend=after?(key==='wrought'?.31:0):deformation;sword(432,249,22,340,bend,after&&key==='pig');}
  // A substantial overhead lever with two guide rails and a central rounded contact.
  for(const x of [364,500]){rod([x,61,-45],[x,227,-45],4,trim);box(x,66,-45,18,16,21,dark);}
  const py=after?133:load<.3?133+67*load/.3:200+deformation*170;box(432,py,15,107,35,60,metal);rod([432,py+15,15],[432,py+49,15],11,trim);for(const x of [390,474])ball(x,py,47,4,trim);box(432,py-10,47,65,3,1,[.8,.84,.78]);
 }
 if(type==='rust'){
  if(key){const damp=key==='damp',p=config.rustProgress||0;sword(430,200,25,430);box(380,292,2,580,14,150,[.39,.46,.4]);for(const x of [218,581])box(x,249,0,28,72,50,metal);
   if(key!=='dry'){for(let i=0;i<22;i++){const x=246+(i*67)%370,y=166+(i*31)%57;add('sphere',[x,y,34],[2.5,2.7,1],[.8,.92,.91],2,{alpha:.8});}}
   if(key==='oil')add('blade:0',[430,200,30],[215,215,80],[.91,.79,.32],2,{alpha:.42});
   if(damp)for(let i=0;i<64*p;i++){const x=238+(i*61)%356,y=182+(i*17)%32;add('rock',[x,y,35+(i%2)],[3+(i%5)*1.6,2+(i%3),1.7],[.45+(i%3)*.045,.22+(i%2)*.03,.1],3,{r:[i*.2,i*.4,i*.7]});}
   animate=config.phase==='waiting';
  }
 }
 if(type==='furnace'){
  const e=config.evidence||[],hot=['ore','coke','air'].every(k=>e.includes(k)),full=hot&&e.includes('lime'),cx=405;
  // Steel-clad tapered blast furnace, skip hoist and off-gas main, based on the supplied diagram.
  const profile=[[62,50],[98,50],[151,62],[284,101],[335,105],[400,86],[458,86]],radius=y=>{for(let i=1;i<profile.length;i++)if(y<=profile[i][0]){const [a,r]=profile[i-1],[b,q]=profile[i];return r+(q-r)*(y-a)/(b-a);}return 86;};
  for(const x of [285,535]){box(x,290,-92,15,398,24,dark);box(x,489,-92,58,14,104,metal);}
  add('furnace-shell',[405,260,-5],[105,198,105],[.28,.39,.36]);
  add('furnace-shell',[405,260,-5],[96,195,96],[.53,.37,.22],1);
  for(let i=0;i<26;i++){const y=72+i*14.7,r=radius(y);for(const side of [-1,1]){box(cx+side*r*.844,y,r*.536,10,13,14,[.65,.47,.3],1,{r:[0,side*.58,0]});}}
  for(const y of [99,176,253,330,407,452]){const r=radius(y);for(let i=0;i<44;i++){const a=Math.PI*(.82+1.36*i/44),b=Math.PI*(.82+1.36*(i+1)/44);rod([405+(r+2)*Math.cos(a),y,(r+2)*Math.sin(a)-5],[405+(r+2)*Math.cos(b),y,(r+2)*Math.sin(b)-5],2,trim);}}
  add('cylinder',[405,64,-9],[46,8,46],metal);add('thinring',[405,55,-9],[47,47,47],trim);
  // Top gas outlet bends into the downward main; it is separate from the hot blast inlet.
  rod([444,100,-25],[491,75,-25],14,metal);rod([491,75,-25],[491,39,-25],14,metal);rod([491,39,-25],[548,39,-25],14,metal);
  for(const y of [46,69])add('ring',[491,y,-25],[16,16,16],trim);
  // Paired inclined rails and the charging skip.
  for(const z of [-40,10]){rod([211,203,z],[380,65,z],4,dark);rod([211,211,z],[380,73,z],3,trim);}
  for(let i=0;i<10;i++){const q=i/9;rod([211+q*169,207-q*138,-40],[211+q*169,207-q*138,10],2,metal);}
  const travel=config.charge?Math.max(0,Math.min(1,config.chargeProgress||0)):0,sx=224+travel*152,sy=195-travel*124;
  box(sx,sy,-4,47,25,38,[.39,.43,.38]);box(sx,sy-13,-4,51,4,41,trim);for(const dx of [-16,16])add('cylinder',[sx+dx,sy+16,20],[6,3,6],dark,0,{r:[Math.PI/2,0,0]});
  if(config.charge)for(let i=0;i<6;i++)add('rock',[sx-15+(i%3)*15,sy-18-Math.floor(i/3)*6,-4],[8,6,8],config.charge==='ore'?[.55,.28,.16]:config.charge==='coke'?[.13,.16,.14]:[.76,.74,.61],3);
  rod([213,212,-35],[213,312,-35],5,dark);box(213,316,-35,68,10,70,metal);
  const levelY=[123,157,191,225,259,293,327];
  if(e.includes('ore')||e.includes('coke'))for(let layer=0;layer<7;layer++){const y=levelY[layer]+(hot?(time*5)%24:0),r=radius(y)*.73;for(let j=0;j<8;j++){const x=cx-r+14+j*(r*2-28)/7,iscoke=e.includes('coke')&&(layer%2===1||!e.includes('ore')),isLime=full&&(j+layer)%13===0;add('rock',[x,y,-5+(j%3)*12],[11+(j%3),8,11],isLime?[.76,.74,.61]:iscoke?[.15,.18,.16]:[.55-layer*.024,.28+layer*.02,.16+layer*.025],3,{r:[layer*.3,j*.7,j*.2]});}}
  // Foundation keeps receiving ladles above the floor rather than occluding their surfaces.
  box(cx,496,-12,192,30,155,[.37,.4,.34],1);
  for(const x of [285,535])box(x,499,-92,65,12,110,[.4,.44,.39],1);
  // Dark hearth and two visibly different liquid levels.
  box(cx,447,-9,153,15,122,[.27,.23,.2],1);box(cx,474,12,180,15,140,dark);rod([178,372,16],[cx-81,372,16],13,metal);for(const x of [191,235,282])add('ring',[x,372,16],[18,18,18],trim,0,{r:[0,0,Math.PI/2]});
  if(hot){
   o.push(...buildFurnaceEffects({slag:full},time));
   for(let i=0;i<14;i++){const y=349-(time*31+i*20)%236,x=405+Math.sin(i*2+time)*38;rod([x,y,48],[x,y-12,48],1,[.66,.72,.58],{alpha:.6});rod([x,y-12,48],[x-3,y-8,48],1,[.66,.72,.58],{alpha:.6});rod([x,y-12,48],[x+3,y-8,48],1,[.66,.72,.58],{alpha:.6});}
  }
  animate=hot||!!config.charge;
 }
 return {objects:o,animate,pitch:.07,size};
}
