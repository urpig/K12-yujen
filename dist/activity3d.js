// Real molecular/CIF endpoint coordinates; oxygen bookkeeping during interpolation.
import {createReactionGeometry} from './crystal-models.js';
import {elements,compete} from './model.js';
export function createActivity3D(host, onProgress) {
  const canvas = host.querySelector('canvas');
  let labels = [...host.querySelectorAll('.model-atom-label')];
  const gl = canvas.getContext('webgl', {alpha:false, antialias:true, preserveDrawingBuffer:true});
  const identity = [1,0,0, 0,1,0, 0,0,1];
  let a='Zn', b='Cu', reacts=true, progress=0, yaw=0.55, pitch=0.28, zoom=1, frame=0, drag=null;
  let reaction=compete(a,b),atoms=[],customGeometry=null,customDescription='';
  const colours=Object.fromEntries(Object.entries({...elements,S:{colour:'#dfc449'},P:{colour:'#a54a39'},N:{colour:'#8aa3b2'},Si:{colour:'#7d8790'}}).map(([s,e])=>[s,[1,3,5].map(n=>parseInt(e.colour.slice(n,n+2),16)/255)]));
  let program, sphere, roomGrid, roomEdges, position, normal, uniforms;
  function compile(type, source) {
    const shader=gl.createShader(type); gl.shaderSource(shader,source); gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  function init() {
    const vertex=compile(gl.VERTEX_SHADER, `
      attribute vec3 aPosition; attribute vec3 aNormal;
      uniform mat3 uBasis; uniform mat3 uView;
      uniform vec3 uCenter; uniform vec3 uScale;
      uniform vec2 uProjection;
      varying vec3 vNormal;
      void main(){
        vec3 p=uView*(uCenter+uBasis*(aPosition*uScale));
        vNormal=normalize(uView*uBasis*aNormal);
        gl_Position=vec4(p.x/uProjection.x,p.y/uProjection.y,-p.z/12.0,1.0-p.z/9.0);
      }`);
    const fragment=compile(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec3 vNormal; uniform vec3 uColor; uniform float uAlpha; uniform float uUnlit;
      void main(){
        vec3 n=normalize(vNormal), light=normalize(vec3(-0.55,0.85,1.35));
        float diffuse=max(dot(n,light),0.0);
        float specular=pow(max(dot(reflect(-light,n),vec3(0.,0.,1.)),0.0),42.0);
        float rim=pow(1.0-abs(n.z),2.0);
        vec3 colour=uColor*(0.39+0.64*diffuse)+vec3(0.83)*specular;
        float alpha=uAlpha<0.9?min(1.0,uAlpha+rim*0.35+specular*0.15):uAlpha;
        gl_FragColor=vec4(mix(colour,uColor,uUnlit),alpha);
      }`);
    program=gl.createProgram(); gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
    gl.deleteShader(vertex);gl.deleteShader(fragment);
    position=gl.getAttribLocation(program,'aPosition');normal=gl.getAttribLocation(program,'aNormal');
    uniforms=Object.fromEntries(['Basis','View','Center','Scale','Projection','Color','Alpha','Unlit'].map(k=>[k,gl.getUniformLocation(program,'u'+k)]));
    const ball=[];
    function vertexAt(t,p){const v=[Math.sin(t)*Math.cos(p),Math.cos(t),Math.sin(t)*Math.sin(p)];return [...v,...v];}
    for(let y=0;y<32;y++)for(let x=0;x<48;x++){
      const t=y*Math.PI/32,dt=Math.PI/32,p=x*Math.PI*2/48,dp=Math.PI*2/48;
      for(const v of [vertexAt(t,p),vertexAt(t,p+dp),vertexAt(t+dt,p),vertexAt(t,p+dp),vertexAt(t+dt,p+dp),vertexAt(t+dt,p)])ball.push(...v);
    }
    function mesh(vertices){const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);return{buffer,count:vertices.length/6};}
    sphere=mesh(ball);
    const grid=[],edges=[];
    const line=(out,from,to)=>{for(const v of [from,to])out.push(...v,0,0,1);};
    for(let i=0;i<=16;i++){
      const x=-3.2+i*.4;
      line(grid,[x,-1.15,-1.6],[x,-1.15,1.6]);
      line(grid,[x,-1.15,-1.6],[x,2.05,-1.6]);
    }
    for(let i=0;i<=8;i++){
      const z=-1.6+i*.4,y=-1.15+i*.4;
      line(grid,[-3.2,-1.15,z],[3.2,-1.15,z]);
      line(grid,[-3.2,y,-1.6],[3.2,y,-1.6]);
      line(grid,[3.2,y,-1.6],[3.2,y,1.6]);
      line(grid,[3.2,-1.15,z],[3.2,2.05,z]);
    }
    line(edges,[-3.2,-1.15,-1.6],[3.2,-1.15,-1.6]);
    line(edges,[3.2,-1.15,-1.6],[3.2,2.05,-1.6]);
    line(edges,[3.2,-1.15,-1.6],[3.2,-1.15,1.6]);
    roomGrid=mesh(grid);roomEdges=mesh(edges);
    gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    host.dataset.renderer='webgl';
  }
  let ready=false;
  try{if(gl){init();ready=true;}}catch(error){console.error('3D scene:',error);}
  if(!ready){host.dataset.renderer='unavailable';host.querySelector('.model-fallback').hidden=false;}
  function viewMatrix(){const c=Math.cos(yaw),s=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);return[c,s*sp,-s*cp, 0,cp,sp, s,-c*sp,c*cp];}
  function transform(v,m){return[m[0]*v[0]+m[3]*v[1]+m[6]*v[2],m[1]*v[0]+m[4]*v[1]+m[7]*v[2],m[2]*v[0]+m[5]*v[1]+m[8]*v[2]];}
  function drawMesh(mesh,center,scale,colour,alpha=1,basis=identity,mode=gl.TRIANGLES){
    gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);gl.enableVertexAttribArray(position);gl.enableVertexAttribArray(normal);
    gl.vertexAttribPointer(position,3,gl.FLOAT,false,24,0);gl.vertexAttribPointer(normal,3,gl.FLOAT,false,24,12);
    gl.uniformMatrix3fv(uniforms.Basis,false,basis);gl.uniform3fv(uniforms.Center,center);gl.uniform3fv(uniforms.Scale,scale);
    gl.uniform3fv(uniforms.Color,colour);gl.uniform1f(uniforms.Alpha,alpha);gl.drawArrays(mode,0,mesh.count);
  }
  function buildAtoms(){
    labels.forEach(label=>label.remove());labels=[];
    const geometry=customGeometry||createReactionGeometry(a,b,reaction);atoms=geometry.atoms;
    const counts=geometry.counts;
    host.dataset.reactionMultiple=String(geometry.multiple);
    host.dataset.atomCounts=JSON.stringify(counts);
    atoms.forEach(atom=>{
      const label=document.createElement('span');label.className='model-atom-label'+(atom.symbol==='O'?' oxygen-label':'');
      label.textContent=atom.symbol;label.style.fontSize='14px';
      if(atom.symbol==='C')label.style.color='#fff';host.append(label);labels.push(label);
    });

    host.dataset.view='crystal-spheres';host.dataset.bondStyle='none';
  }
  function render(){
    const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;
    const ratio=Math.min(devicePixelRatio||1,2),m=viewMatrix();
    const xExtent=Math.max(3.15,2.3*width/height)/zoom,yExtent=xExtent*height/width;
    const t=reacts?progress:0;
    const radii=atoms.map(atom=>atom.radiusBefore+(atom.radiusAfter-atom.radiusBefore)*t);
    const points=atoms.map(atom=>{
      const p=atom.before.map((v,i)=>v+(atom.after[i]-v)*t);
      if(atom.symbol==='O'){p[1]+=Math.sin(t*Math.PI)*.35;p[2]+=Math.sin(t*Math.PI)*.28;}
      return p;
    });
    if(ready){
      const w=Math.round(width*ratio),h=Math.round(height*ratio);
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
      gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(.967,.965,.937,1);gl.depthMask(true);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(program);
      gl.uniformMatrix3fv(uniforms.View,false,m);gl.uniform2f(uniforms.Projection,xExtent,yExtent);
      gl.uniform1f(uniforms.Unlit,1);gl.depthMask(false);
      drawMesh(roomGrid,[0,0,0],[1,1,1],[.57,.66,.63],.43,identity,gl.LINES);
      drawMesh(roomEdges,[0,0,0],[1,1,1],[.38,.5,.46],.65,identity,gl.LINES);
      gl.depthMask(true);gl.uniform1f(uniforms.Unlit,0);
      atoms.map((atom,i)=>({atom,i,z:transform(points[i],m)[2]})).sort((x,y)=>y.z-x.z).forEach(({atom,i})=>{
        drawMesh(sphere,points[i],[radii[i],radii[i],radii[i]],atom.symbol==='O'?[.82,.88,.92]:colours[atom.symbol],1);
      });
    }
    const projected=points.map((point,i)=>{
      const v=transform(point,m),perspective=1-v[2]/9;
      return{x:(.5+v[0]/xExtent/perspective*.5)*width,y:(.5-v[1]/yExtent/perspective*.5)*height,z:v[2],r:radii[i]/xExtent/perspective*width/2};
    });
    projected.forEach((p,i)=>{
      labels[i].style.left=p.x+'px';labels[i].style.top=p.y+'px';labels[i].style.fontSize=Math.max(9,Math.min(18,p.r*.9))+'px';
      labels[i].style.zIndex=String(Math.round(p.z*100)+400);
      const occluded=projected.some((q,j)=>j!==i&&q.z>p.z+radii[i]*.3&&Math.hypot(q.x-p.x,q.y-p.y)<q.r*.85);
      labels[i].hidden=occluded;
    });
    canvas.setAttribute('aria-label',customDescription||`${a} 與 ${b} 的無連接棒 3D 原子模型；${reacts&&progress===1?'氧已移到 '+a:'氧原本連在 '+b}。可拖曳或使用方向鍵旋轉。`);
  }
  function stop(){if(frame)cancelAnimationFrame(frame);frame=0;}
  function setProgress(value){stop();progress=Math.max(0,Math.min(1,value));render();onProgress(progress);}
  function play(){
    stop();progress=0;onProgress(0);const started=performance.now();
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    function animate(now){
      const elapsed=reduced?1:Math.min(1,(now-started)/2600);progress=elapsed*elapsed*(3-2*elapsed);render();onProgress(progress);
      if(elapsed<1)frame=requestAnimationFrame(animate);else frame=0;
    }
    frame=requestAnimationFrame(animate);
  }
  function orbit(dx,dy){yaw+=dx;pitch=Math.max(-1.1,Math.min(1.1,pitch+dy));render();}
  canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);canvas.focus({preventScroll:true});});
  canvas.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;orbit((e.clientX-drag.x)*0.012,(e.clientY-drag.y)*0.009);drag={x:e.clientX,y:e.clientY,id:e.pointerId};});
  const endDrag=()=>{drag=null;};canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
  canvas.addEventListener('keydown',e=>{const d={ArrowLeft:[-.15,0],ArrowRight:[.15,0],ArrowUp:[0,-.12],ArrowDown:[0,.12]}[e.key];if(d){e.preventDefault();orbit(...d);}});
  const resize=new ResizeObserver(render);resize.observe(host);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();stop();ready=false;host.dataset.renderer='unavailable';host.querySelector('.model-fallback').hidden=false;});
  canvas.addEventListener('webglcontextrestored',()=>{init();ready=true;host.querySelector('.model-fallback').hidden=true;render();});
  return {
    setGeometry(geometry,description){stop();customGeometry=geometry;customDescription=description;reacts=true;progress=0;buildAtoms();render();onProgress(0);},
    configure(nextA,nextB,result){stop();customGeometry=null;customDescription='';a=nextA;b=nextB;reaction=result;reacts=result.reacts;progress=0;buildAtoms();render();onProgress(0);},
    play,setProgress,
    rotate(direction){orbit(direction*.3,0);},
    magnify(direction){zoom=Math.min(1.25,Math.max(.8,zoom+direction*.1));render();},
    resetView(){yaw=.55;pitch=.28;zoom=1;render();},
    dispose(){stop();resize.disconnect();if(gl){for(const mesh of [sphere,roomGrid,roomEdges])if(mesh)gl.deleteBuffer(mesh.buffer);if(program)gl.deleteProgram(program);gl.getExtension('WEBGL_lose_context')?.loseContext();}}
  };
}
