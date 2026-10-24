export const crucibleHeatingMs=3250;
// The point is the bottom centre of the crucible in the 760 × 430 teaching scene.
export function crucibleNearFlame([x,y]){return Number.isFinite(x)&&Number.isFinite(y)&&Math.abs(x-320)<=38&&y>=214&&y<=252;}
export function crucibleRestPosition(point){return crucibleNearFlame(point)?[320,229]:[160,365];}
export function newCrucibleHeating(){return {heatMs:0,heating:false,ready:false};}
export function advanceCrucibleHeating(state,{near=false,dt=0}={}){
 const s={...state};dt=Number.isFinite(dt)?Math.max(0,dt):0;
 if(near)s.heatMs=Math.min(crucibleHeatingMs,s.heatMs+dt);
 s.ready=s.heatMs>=crucibleHeatingMs;s.heating=!!near&&!s.ready;
 return s;
}
