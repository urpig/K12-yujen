import {createOreGeometry} from './ore-geometry.js';
export function rodRotation(d){return [Math.atan2(d[2],Math.hypot(d[0],d[1])),0,-Math.atan2(d[0],d[1])];}
export function labMesh(kind){
 if(kind==='rock')return createOreGeometry(12,18);
 const p=[],n=[];const tri=(a,b,c,na,nb=na,nc=na)=>{p.push(...a,...b,...c);n.push(...na,...nb,...nc);};
 if(kind==='effect-plane'){
  // Subdivided camera-facing sheet for smooth flame fields and wavy liquid ribbons.
  for(let i=0;i<48;i++){const x=-1+i/24,y=x+1/24;tri([x,-1,0],[y,-1,0],[x,1,0],[0,0,1]);tri([y,-1,0],[y,1,0],[x,1,0],[0,0,1]);}
 }else if(kind==='furnace-shell'){
  // Turned steel shell with the front sector cut away to expose the burden and hearth.
  const profile=[[-1,.48],[-.82,.48],[-.55,.59],[.12,.96],[.38,1],[.71,.82],[1,.82]];
  for(let j=0;j<profile.length-1;j++)for(let i=0;i<64;i++){
   const [y0,r0]=profile[j],[y1,r1]=profile[j+1],a=Math.PI*(.82+1.36*i/64),b=Math.PI*(.82+1.36*(i+1)/64);
   const point=(y,r,t)=>[r*Math.cos(t),y,r*Math.sin(t)],normal=t=>{const slope=(r0-r1)/(y1-y0),len=Math.hypot(1,slope);return [Math.cos(t)/len,slope/len,Math.sin(t)/len];};
   tri(point(y0,r0,a),point(y1,r1,a),point(y0,r0,b),normal(a),normal(a),normal(b));tri(point(y0,r0,b),point(y1,r1,a),point(y1,r1,b),normal(b),normal(a),normal(b));
  }
 }else if(kind.startsWith('blade:')){
  const [,amount,part='whole']=kind.split(':'),bend=Number(amount),lo=part==='right'?.12:-1,hi=part==='left'?.08:1;
  const point=(x,edge)=>{const width=x>.65?Math.max(.002,(1-x)/.35):1,center=bend*(1-x*x);return [x,center+edge*width*.13,edge===0?.045:0];};
  for(let i=0;i<50;i++){const x=lo+(hi-lo)*i/50,y=lo+(hi-lo)*(i+1)/50;for(const edge of [-1,1]){const a=point(x,edge),b=point(y,edge),c=point(x,0),d=point(y,0),nn=[0,edge*.78,.62];tri(a,b,c,nn);tri(b,d,c,nn);const aa=[...a],bb=[...b],cc=[c[0],c[1],-.035],dd=[d[0],d[1],-.035];tri(aa,cc,bb,[0,edge*.78,-.62]);tri(bb,cc,dd,[0,edge*.78,-.62]);}}
 }else if(kind==='box'){
  for(const [axis,sign] of [[0,-1],[0,1],[1,-1],[1,1],[2,-1],[2,1]]){const axes=[0,1,2].filter(k=>k!==axis),normal=[0,0,0];normal[axis]=sign;const v=[[-1,-1],[1,-1],[1,1],[-1,1]].map(q=>{const a=[0,0,0];a[axis]=sign;a[axes[0]]=q[0];a[axes[1]]=q[1];return a;});tri(v[0],v[1],v[2],normal);tri(v[0],v[2],v[3],normal);}
 }else if(kind.startsWith('beam:')){
  const bend=Number(kind.split(':')[1]),point=(x,y,z)=>[x,y+bend*(1-x*x),z];
  for(let i=0;i<40;i++){const a=-1+i/20,b=a+.05;for(const [side,sy,sz] of [['top',-1,0],['bottom',1,0],['front',0,1],['back',0,-1]]){let v,normal;if(side==='top'||side==='bottom'){v=[point(a,sy*.06,-.1),point(b,sy*.06,-.1),point(b,sy*.06,.1),point(a,sy*.06,.1)];const len=Math.hypot(2*bend*(a+b)/2,1);normal=[2*bend*(a+b)/2*sy/len,sy/len,0];}else {v=[point(a,-.06,sz*.1),point(b,-.06,sz*.1),point(b,.06,sz*.1),point(a,.06,sz*.1)];normal=[0,0,sz];}tri(v[0],v[1],v[2],normal);tri(v[0],v[2],v[3],normal);}}
 }else{
  const sphere=kind==='sphere'||kind==='flame',torus=kind==='ring'||kind==='thinring',shell=kind==='shell';const U=torus?48:sphere?32:40,V=torus?10:sphere?20:1;
  const pt=(u,v)=>{const a=u*Math.PI*2;if(torus){const b=v*Math.PI*2,q=kind==='thinring'?.014:.07;return {p:[(1+q*Math.cos(b))*Math.cos(a),q*Math.sin(b),(1+q*Math.cos(b))*Math.sin(a)],n:[Math.cos(b)*Math.cos(a),Math.sin(b),Math.cos(b)*Math.sin(a)]};}if(sphere){const t=v*Math.PI,r=Math.sin(t),y=-Math.cos(t),flame=kind==='flame',f=flame?(.48+.5*v):1;return {p:[r*Math.cos(a)*f+(flame?.1*Math.sin(v*7):0),y,r*Math.sin(a)*f],n:[r*Math.cos(a),y,r*Math.sin(a)]};}return {p:[Math.cos(a),v*2-1,Math.sin(a)],n:[Math.cos(a),0,Math.sin(a)]};};
  for(let j=0;j<V;j++)for(let i=0;i<U;i++){const a=pt(i/U,j/V),b=pt((i+1)/U,j/V),c=pt(i/U,(j+1)/V),d=pt((i+1)/U,(j+1)/V);tri(a.p,c.p,b.p,a.n,c.n,b.n);tri(b.p,c.p,d.p,b.n,c.n,d.n);}
  if(!sphere&&!torus&&!shell)for(const sy of [-1,1])for(let i=0;i<U;i++){const a=i/U*2*Math.PI,b=(i+1)/U*2*Math.PI;tri([0,sy,0],[Math.cos(a),sy,Math.sin(a)],[Math.cos(b),sy,Math.sin(b)],[0,sy,0]);}
 }
 return {positions:new Float32Array(p),normals:new Float32Array(n)};
}
export function basis(rx=0,ry=0,rz=0){const x=Math.cos(rx),a=Math.sin(rx),y=Math.cos(ry),b=Math.sin(ry),z=Math.cos(rz),c=Math.sin(rz);return new Float32Array([z*y,c*y,-b,z*b*a-c*x,c*b*a+z*x,y*a,z*b*x+c*a,c*b*x-z*a,y*x]);}
