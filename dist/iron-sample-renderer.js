import {createOreGeometry,createOreTexture} from './ore-geometry.js';
import {vertexSource,fragmentSource} from './ore-orbit.js';

// Reuse card 01's geometry, mineral texture, light and starting orientation.
// Only the right-hand specimen receives a qualitative reduction overlay.
let meshCache,textureCache;
const cy=Math.cos(-.38),sy=Math.sin(-.38),cx=Math.cos(.16),sx=Math.sin(.16);
const rotation=new Float32Array([cy,sx*sy,-cx*sy,0,cx,sx,sy,-sx*cy,cx*cy]);
const sampleFragment=fragmentSource.replace('uniform float uSideLight;', 'uniform float uSideLight;uniform float uReduction;uniform float uMinX;uniform float uMaxX;').replace('gl_FragColor=vec4(col,1.);', `
 float pore=1.-smoothstep(.22,.53,tex.a);
 vec3 metal=vec3(.27,.31,.30)*(.38+diffuse*.76+soft*.17)*(1.-pore*.65);
 metal+=spec*.32;
 metal=pow(metal,vec3(1./2.2));
 float edge=uReduction+sin(gl_FragCoord.y*.06)*.012;
 float reduced=uReduction<=0.?0.:(uReduction>=1.?1.:1.-smoothstep(edge-.015,edge+.015,(gl_FragCoord.x-uMinX)/(uMaxX-uMinX)));
 gl_FragColor=vec4(mix(col,metal,reduced),1.);`);
const bounded=n=>Number.isFinite(n)?Math.max(0,Math.min(1,n)):0;
function projectedBounds(mesh){let min=Infinity,max=-Infinity;for(let k=0;k<mesh.positions.length;k+=3){const [x,y,z]=mesh.positions.slice(k,k+3),px=rotation[0]*x+rotation[3]*y+rotation[6]*z,pz=rotation[2]*x+rotation[5]*y+rotation[8]*z,q=px*1.56/(4.7-pz);min=Math.min(min,q);max=Math.max(max,q);}return [min,max];}
function basicRenderer(canvas){
 const ctx=canvas.getContext('2d'),mesh=createOreGeometry(24,36),texture=createOreTexture(128);
 let fraction=0,alive=true;const [min,max]=projectedBounds(mesh);
 const rotate=p=>[0,1,2].map(i=>rotation[i]*p[0]+rotation[i+3]*p[1]+rotation[i+6]*p[2]);
 function draw(){
  if(!alive)return;const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;
  const dpr=Math.min(devicePixelRatio||1,2),w=r.width,h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  const faces=[];
  for(let k=0;k<mesh.positions.length;k+=9){const local=[0,3,6].map(j=>Array.from(mesh.positions.slice(k+j,k+j+3))),p=local.map(rotate),normal=rotate([0,1,2].map(j=>(mesh.normals[k+j]+mesh.normals[k+3+j]+mesh.normals[k+6+j])/3));if(normal[2]<-.1)continue;faces.push({p,local,normal,z:p.reduce((s,v)=>s+v[2],0)/3});}
  faces.sort((a,b)=>a.z-b.z);
  for(const f of faces){const points=f.p.map(p=>[w/2+p[0]*h*1.56/(4.7-p[2]),h/2-(p[1]+.03)*h*1.56/(4.7-p[2])]);const avg=[0,1].map(i=>f.local.reduce((s,p)=>s+p[i],0)/3),tx=((Math.floor(avg[0]*108)%128)+128)%128,ty=((Math.floor(avg[1]*108)%128)+128)%128,t=(ty*128+tx)*4,light=.65+Math.max(0,f.normal[0]*-.37+f.normal[1]*.58+f.normal[2]*.68)*.6;
   const metallic=fraction>=1||(fraction>0&&points.reduce((s,p)=>s+p[0],0)/3<w/2+h*(min+fraction*(max-min))),color=metallic?[texture[t+3]*.6+15,texture[t+3]*.65+17,texture[t+3]*.62+17]:[texture[t],texture[t+1],texture[t+2]];
   ctx.beginPath();ctx.moveTo(...points[0]);ctx.lineTo(...points[1]);ctx.lineTo(...points[2]);ctx.closePath();ctx.fillStyle='rgb('+color.map(v=>Math.round(Math.min(255,v*light))).join(',')+')';ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=.5;ctx.fill();ctx.stroke();
  }
  canvas.dataset.reduction=fraction.toFixed(3);
 }
 const observer=new ResizeObserver(draw);observer.observe(canvas);canvas.dataset.renderer='canvas-fallback';draw();
 return {setFraction(n){fraction=bounded(n);draw();},dispose(){alive=false;observer.disconnect();}};
}
export function mountIronSample(canvas){
 let gl;try{gl=canvas.getContext('webgl',{alpha:true,antialias:true,preserveDrawingBuffer:true,powerPreference:'low-power'});}catch{}
 if(!gl)return basicRenderer(canvas);
 const resources=[];let program;
 try{
  const compile=(type,source)=>{const shader=gl.createShader(type);resources.push(()=>gl.deleteShader(shader));gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));return shader;};
  program=gl.createProgram();resources.push(()=>gl.deleteProgram(program));gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexSource));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,sampleFragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
 }catch{resources.reverse().forEach(f=>f());const replacement=canvas.cloneNode(false);canvas.replaceWith(replacement);gl.getExtension('WEBGL_lose_context')?.loseContext();return basicRenderer(replacement);}
 gl.useProgram(program);meshCache=meshCache||createOreGeometry();textureCache=textureCache||createOreTexture();
 for(const [name,data] of [['aPosition',meshCache.positions],['aNormal',meshCache.normals]]){const buffer=gl.createBuffer();resources.push(()=>gl.deleteBuffer(buffer));gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);const attr=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,3,gl.FLOAT,false,0,0);}
 const texture=gl.createTexture();resources.push(()=>gl.deleteTexture(texture));gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,512,512,0,gl.RGBA,gl.UNSIGNED_BYTE,textureCache);gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
 const anisotropy=gl.getExtension('EXT_texture_filter_anisotropic');if(anisotropy)gl.texParameterf(gl.TEXTURE_2D,anisotropy.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(4,gl.getParameter(anisotropy.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
 const [min,max]=projectedBounds(meshCache);
 const u=Object.fromEntries(['uRotation','uAspect','uZoom','uSideLight','uSurface','uReduction','uMinX','uMaxX'].map(n=>[n,gl.getUniformLocation(program,n)]));gl.uniform1i(u.uSurface,0);gl.uniformMatrix3fv(u.uRotation,false,rotation);gl.uniform1f(u.uSideLight,0);gl.uniform1f(u.uZoom,1.2);gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
 let fraction=0,alive=true;
 function draw(){if(!alive||gl.isContextLost())return;const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;const scale=Math.min(devicePixelRatio||1,2),w=Math.round(r.width*scale),h=Math.round(r.height*scale);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform1f(u.uAspect,w/h);gl.uniform1f(u.uMinX,w/2+min*h);gl.uniform1f(u.uMaxX,w/2+max*h);gl.uniform1f(u.uReduction,fraction);gl.drawArrays(gl.TRIANGLES,0,meshCache.positions.length/3);canvas.dataset.reduction=fraction.toFixed(3);}
 const observer=new ResizeObserver(draw);observer.observe(canvas);canvas.dataset.renderer='webgl';canvas.dataset.triangles=String(meshCache.triangles);draw();
 return {setFraction(n){fraction=bounded(n);draw();},dispose(){alive=false;observer.disconnect();resources.reverse().forEach(f=>f());gl.getExtension('WEBGL_lose_context')?.loseContext();}};
}
