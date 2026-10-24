// These material branches are used only by the furnace's combustion, coke and liquids.
export const thermalNoise=`
float noise2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);float a=hash(vec3(i,1.)),b=hash(vec3(i+vec2(1.,0.),1.)),c=hash(vec3(i+vec2(0.,1.),1.)),d=hash(vec3(i+vec2(1.),1.));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
float turbulence(vec2 p){float f=0.;float a=.54;for(int i=0;i<4;i++){f+=a*noise2(p);p=mat2(1.64,1.18,-1.18,1.64)*p+vec2(5.7,9.2);a*=.48;}return f;}
`;
export const thermalMaterials=`
if(uKind==6.){
 vec2 uv=vec2(vLocal.x,(1.-vLocal.y)*.5);float h=uv.y;
 // Upward advection and warped noise produce connected, irregular flame tongues.
 float curl=turbulence(vec2(uv.x*3.1,h*3.3-uTime*1.35));
 float warp=uv.x+(curl-.46)*(.18+h*.38)+sin(h*7.-uTime*3.1)*.045;
 float n=turbulence(vec2(warp*5.,h*4.8-uTime*2.35));
 float edge=1.-abs(warp)/(1.05-h*.74);
 float density=edge*.72+n*.68-h*.68;
 float mask=smoothstep(.21,.43,density)*smoothstep(0.,.09,h)*(1.-smoothstep(.87,1.,h));
 float core=clamp((density-.32)*1.8,0.,1.);
 vec3 fire=mix(vec3(.64,.10,.012),vec3(1.,.46,.025),smoothstep(.02,.55,core));
 fire=mix(fire,vec3(1.,.91,.48),smoothstep(.44,.9,core));
 gl_FragColor=vec4(fire,mask*uAlpha);return;
}
if(uKind==7.){
 vec2 uv=vLocal.xy;float t=uTime*(uColor.g>.5?.7:1.3);
 float eddy=turbulence(vec2(uv.x*5.-t,uv.y*3.+sin(uv.x*5.-t)*.24));
 float streak=pow(.5+.5*sin(uv.x*32.-t*8.+eddy*7.+uv.y*4.),8.);
 float highlight=pow(.5+.5*sin(uv.y*17.+eddy*5.+uv.x*8.-t*2.),12.);
 vec3 liquid=uColor*(.65+eddy*.55)+vec3(1.,.72,.29)*(streak*.34+highlight*.21);
 float border=1.-smoothstep(.77,1.,abs(uv.y));
 gl_FragColor=vec4(liquid,border*uAlpha);return;
}
if(uKind==8.){
 float pores=turbulence(vLocal.xy*5.+vLocal.z*2.);
 float cracks=pow(1.-abs(noise2(vLocal.xy*13.+vLocal.z*4.)-.5)*2.,13.);
 float pulse=.8+.2*sin(uTime*3.7+vP.x*.12+vP.y*.08);
 vec3 charcoal=uColor*(.65+.5*pores);
 gl_FragColor=vec4(charcoal+vec3(.95,.14,.015)*cracks*pulse,uAlpha);return;
}
`;
