// Shared optical model for the active laboratory and furnace scenes.
// Several translucent depth layers give luminous flame edges, rather than a solid silhouette.
export const flameGLSL=`
float flameHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float flameNoise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(flameHash(i),flameHash(i+vec2(1.,0.)),f.x),mix(flameHash(i+vec2(0.,1.)),flameHash(i+vec2(1.)),f.x),f.y);}
float flameFbm(vec2 p){float v=0.,a=.55;for(int i=0;i<4;i++){v+=a*flameNoise(p);p=mat2(1.64,1.13,-1.13,1.64)*p+3.73;a*=.48;}return v;}
vec4 flameOver(vec4 a,vec4 b){float o=a.a+b.a*(1.-a.a);return vec4((a.rgb*a.a+b.rgb*b.a*(1.-a.a))/max(.0001,o),o);}
float alcoholShellPath(float radius,float thickness,float x){float outer=radius+thickness,inner=max(0.,radius-thickness);return 2.*(sqrt(max(0.,outer*outer-x*x))-sqrt(max(0.,inner*inner-x*x)));}
vec4 alcoholFlame(vec2 p,vec2 base,vec2 size,float t){
 vec2 q=(base-p)/size;if(q.y<-.055||q.y>1.3||abs(q.x)>1.05)return vec4(0.);
 // Each disturbance travels upwards. The wick is pinned; there is no rigid sway/scale.
 float tipGrowth=(flameNoise(vec2(t*2.1,8.4))-.5)*.25+.045*sin(t*4.7);
 float h=q.y/(1.+tipGrowth*pow(clamp(q.y,0.,1.2),2.));
 float rise=h*5.7-t*3.3,root=smoothstep(.025,.23,h);
 float centre=root*((flameNoise(vec2(h*3.8-t*2.05,4.2))-.5)*(.055+.5*h)
              +sin(h*9.2-t*4.6)*h*.04+pow(max(h,0.),2.8)*.09*sin(t*2.6-h*4.));
 float x=q.x-centre;
 // Narrow shoulders and a long tapered tongue, rather than a round bulb.
 float profile=(.055+.25*(1.-exp(-max(h,0.)*13.)))*pow(max(.0001,1.-smoothstep(.28,1.035,h)),.72);
 float leftWave=(flameNoise(vec2(rise,1.7))-.5)*(.025+.22*h)*root;
 float rightWave=(flameNoise(vec2(rise*.86+2.1,7.8))-.5)*(.025+.22*h)*root;
 float leftWidth=max(.008,profile+leftWave),rightWidth=max(.008,profile+rightWave);
 float width=x<0.?leftWidth:rightWidth;
 float endFade=smoothstep(-.012,.085,h)*(1.-smoothstep(.91,1.08,h));
 float edgeSoft=.025+.025*smoothstep(.25,1.,h);
 float mantle=.65*alcoholShellPath(width,edgeSoft,x)+.35*alcoholShellPath(width,edgeSoft*1.8,x);
 float innerWidth=.13*pow(max(.001,1.-h/.37),.72);
 float innerShell=alcoholShellPath(innerWidth,.022,x)*(1.-smoothstep(.27,.39,h));
 float interior=2.*sqrt(max(0.,width*width-x*x));
 float streak=flameNoise(vec2(x*16.+h*3.,h*10.-t*6.5));
 float density=(mantle*(1.25-.35*h)+innerShell*1.2+interior*(.10+.3*streak))*endFade;
 float sheetFlow=flameFbm(vec2(x*5.+h*.9,h*6.-t*3.8));
 density*=mix(.65,1.25,sheetFlow)*(1.+.85*smoothstep(.2,.85,h));
 density*=.91+.09*flameNoise(vec2(x*13.+1.7,h*17.-t*8.));
 vec3 colour=mix(vec3(.12,.35,.97),vec3(.38,.7,1.),smoothstep(.025,.22,h));
 colour=mix(colour,vec3(1.,.74,.36),smoothstep(.19,.57,h)*.86);
 colour=mix(colour,vec3(1.,.9,.66),smoothstep(.62,1.,h)*.35);
 colour=mix(colour,vec3(.24,.77,1.),clamp(innerShell*3.,0.,1.));
 float opacity=1.-exp(-density*1.85);
 vec2 haloQ=vec2(x/.48,(h-.4)/.7);float halo=exp(-dot(haloQ,haloQ)*3.8)*.025*endFade;
 vec4 flame=vec4(colour,opacity);
 return flameOver(flame,vec4(.25,.5,1.,halo));
}
vec4 luminousFlame(vec2 p,vec2 base,vec2 size,vec3 tint,float t,float whiteHot){
 vec2 q=(base-p)/size;float h=q.y;if(h<-.08||h>1.25||abs(q.x)>1.65)return vec4(0.);
 float rise=t*(1.3+h*.7),curl=flameFbm(vec2(q.x*1.8,h*2.2-rise*.45));
 float centre=q.x+(curl-.5)*(.22+h*.48)+sin(h*5.-t*1.4)*h*.055;
 float width=max(.025,.61-h*.46),alpha=0.;vec3 light=vec3(0.);
 for(int i=0;i<5;i++){
  float z=(float(i)-2.)*.23,rad=sqrt(centre*centre+z*z*.65);
  float n=flameFbm(vec2(centre*4.8+z*4.,h*5.6-rise*2.3+z*7.));
  float detail=flameNoise(vec2(centre*21.+z*17.,h*18.-rise*6.));
  float density=smoothstep(.19,.66,(1.-rad/width)*.73+n*.58-h*.31+(detail-.5)*.08);
  density*=smoothstep(-.06,.06,h)*(1.-smoothstep(.81,1.18,h));
  float temperature=clamp(density*.7+n*.4+.2*(1.-h),0.,1.);
  vec3 emission=mix(tint*.35,tint*1.2,temperature);
  emission=mix(emission,mix(vec3(1.,.92,.67),vec3(1.,1.,.97),whiteHot),pow(temperature,3.)*(.55+whiteHot*.4));
  float opacity=1.-exp(-density*.46);light+=emission*opacity*(1.-alpha);alpha+=opacity*(1.-alpha);
 }
 float halo=exp(-dot(q/vec2(.74,.85),q/vec2(.74,.85))*3.2)*.035*smoothstep(0.,.09,h);
 vec4 f=vec4(light/max(alpha,.001),alpha);return flameOver(f,vec4(tint,halo));
}
vec4 oxidePlume(vec2 p,vec2 base,vec2 size,float t,float strength){
 vec2 q=(base-p)/size;float h=q.y;if(h<0.||h>1.35||abs(q.x)>1.5)return vec4(0.);
 float curl=flameFbm(vec2(q.x*2.1,h*3.-t*.37));
 float x=q.x+(curl-.5)*(.28+h*.65)+sin(h*5.4-t*.6)*h*.12;
 float width=.11+h*.5,env=exp(-x*x/max(.004,width*width)*2.7)*smoothstep(0.,.11,h)*(1.-smoothstep(.85,1.3,h));
 float billow=flameFbm(vec2(x*5.,h*6.-t*.8)+vec2(curl*2.3,0.));
 float filament=flameFbm(vec2(x*14.+t*.12,h*15.-t*1.9));
 float density=env*smoothstep(.2,.7,billow*.8+filament*.3)*strength;
 vec3 c=mix(vec3(.64,.69,.7),vec3(.99,.99,.97),billow*.8+.2);
 return vec4(c,1.-exp(-density*1.7));
}
`;
