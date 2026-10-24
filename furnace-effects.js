import {rodRotation} from './lab-geometry.js';
export function buildFurnaceEffects({slag=false},time=0){
 const objects=[];
 const add=(shape,p,s,c,kind=0,extra={})=>objects.push({shape,p,s,c,kind,...extra});
 const rod=(a,b,r,c,extra={})=>{const d=b.map((v,i)=>v-a[i]);add('cylinder',a.map((v,i)=>(v+b[i])/2),[r,Math.hypot(...d)/2,r],c,0,{r:rodRotation(d),...extra});};
 const ribbon=(a,b,width,c,flow)=>{const dx=b[0]-a[0],dy=b[1]-a[1];add('effect-plane',[(a[0]+b[0])/2,(a[1]+b[1])/2,74],[Math.hypot(dx,dy)/2,width,1],c,7,{alpha:.97,r:[0,0,Math.atan2(dy,dx)],flow});};
 const iron=[1,.42,.055],slagColour=[.73,.56,.25];
 // A continuous noise-advection field, with no yellow solid geometry posing as fire.
 add('effect-plane',[405,323,51],[76,77,1],[1,.4,.04],6,{alpha:.94,effect:'combustion'});
 for(const side of [-1,1])add('effect-plane',[405+side*49,372,66],[18,39,1],[1,.6,.1],6,{alpha:.83,r:[0,0,-side*Math.PI/2],effect:'tuyere'});
 // Incandescent coke stays dark and irregular, with fine glowing fissures.
 for(let i=0;i<23;i++){const a=i*2.39996,r=Math.sqrt((i+.5)/23),x=405+Math.cos(a)*r*66,y=367+Math.sin(a)*r*21;add('rock',[x,y,64+(i%3)*2],[7+i%4,6+i%3,7],[.16+(i%3)*.025,.06,.028],8,{r:[i*.7,i*.4,i*.9],effect:'coke'});}
 for(let i=0;i<14;i++){const q=(time*.27+i*.071)%1;add('sphere',[348+(i*37)%114+Math.sin(time*1.8+i)*5,365-q*102,72],[.65+i%2*.3,1.1,.7],[1,.49,.09],0,{glow:.8,alpha:(1-q)*.7,effect:'spark'});}
 // Molten metal collects below slag. Surface eddies keep both pools visibly liquid.
 add('effect-plane',[405,431,68],[76,15,1],iron,7,{alpha:.97,flow:'iron-pool'});
 if(slag)add('effect-plane',[405,408,69],[79,8,1],slagColour,7,{alpha:.97,flow:'slag-pool'});
 function outlet(flow,points,color,ladle){
  const [a,b,c,d]=points;
  // Dark refractory-lined runners frame the surface rather than replacing it.
  rod([a[0],a[1]+4,39],[b[0],b[1]+4,47],9,[.33,.29,.23]);rod([b[0],b[1]+4,47],[c[0],c[1]+4,47],8,[.33,.29,.23]);
  ribbon(a,b,5.2,color,flow);ribbon(b,c,5.2,color,flow);ribbon(c,d,3.8,color,flow);
  add('cylinder',[ladle[0],ladle[1]+15,39],[29,15,29],[.27,.33,.3]);
  if(flow==='slag'){for(const x of [ladle[0]-19,ladle[0]+19])rod([x,ladle[1]+29,36],[x,503,36],3,[.35,.4,.36]);rod([ladle[0]-28,503,36],[ladle[0]+28,503,36],4,[.35,.4,.36]);}
  add('effect-plane',[ladle[0],ladle[1]+1,78],[26,4.6,1],color,7,{alpha:.97,flow:flow+'-receiving'});
  // Short ripples and droplets travel from the stream impact, with separate rates for slag.
  const speed=flow==='iron'?.95:.55;
  for(let i=0;i<4;i++){const q=(time*speed+i*.25)%1;add('thinring',[d[0]+6,ladle[1]+1,79],[3+q*17,1.1+q*1.7,1],color,0,{alpha:(1-q)*.7,glow:.6,flow:flow+'-ripple'});}
  for(let i=0;i<5;i++){const q=(time*(flow==='iron'?1.4:.8)+i*.2)%1;add('sphere',[d[0]+Math.sin(i*2.4)*(3+q*4),d[1]-Math.sin(q*Math.PI)*7+q*4,80],[.7,1.2,.7],color,0,{alpha:1-q,glow:.8,flow:flow+'-drop'});}
 }
 outlet('iron',[[448,440],[486,461],[552,461],[570,477]],iron,[583,477]);
 if(slag)outlet('slag',[[481,403],[521,413],[556,413],[570,427]],slagColour,[583,427]);
 return objects;
}
