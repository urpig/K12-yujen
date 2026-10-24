export const spoonTiming={copper:2600,ignition:900,metal:1700,nonmetal:2800};
// Teaching time, not a calibrated temperature or a reaction-speed control.
export function spoonNearFlame([x,y]){return Number.isFinite(x)&&Number.isFinite(y)&&Math.abs(x-320)<=27&&y>=211&&y<=263;}
export function spoonInJar([x,y]){return x>=492&&x<=628&&y>=170&&y<=329;}
export function spoonAtMouth([x,y]){return x>=522&&x<=598&&y>=78&&y<=137;}
export function newSpoonHeating(key,isMetal,loaded=false){return {key,isMetal,loaded,heatMs:0,burnMs:0,observationMs:0,ignited:false,externalHeating:false,complete:false};}
export function advanceSpoonHeating(state,{near=false,inJar=false,dt=0}={}){
 const s={...state};dt=Number.isFinite(dt)?Math.max(0,dt):0;s.externalHeating=!!(s.loaded&&!s.complete&&near);
 if(!s.loaded||s.complete)return s;
 if(s.key==='Cu'){if(near)s.heatMs=Math.min(spoonTiming.copper,s.heatMs+dt);s.complete=s.heatMs>=spoonTiming.copper;return s;}
 let remaining=dt;
 if(!s.ignited){if(!near)return s;const needed=spoonTiming.ignition-s.heatMs;s.heatMs=Math.min(spoonTiming.ignition,s.heatMs+dt);if(s.heatMs<spoonTiming.ignition)return s;s.ignited=true;remaining=Math.max(0,dt-needed);}
 // Removing the heat source is different from extinguishing an ignited specimen.
 if(s.isMetal){s.burnMs=Math.min(spoonTiming.metal,s.burnMs+remaining);s.complete=s.burnMs>=spoonTiming.metal;}
 else if(inJar){s.observationMs=Math.min(spoonTiming.nonmetal,s.observationMs+remaining);s.complete=s.observationMs>=spoonTiming.nonmetal;}
 return s;
}
