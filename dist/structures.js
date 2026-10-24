// Idealised nearest-neighbour environments, not isolated oxide molecules.
// Distortions and more distant neighbours are deliberately omitted.
export const oxideStructures={
 K:['tetra','反螢石型','K 周圍 4 個 O；氧由相鄰單元共享'],
 Na:['tetra','反螢石型','Na 周圍 4 個 O；氧由相鄰單元共享'],
 Ca:['octa','岩鹽型','Ca 周圍 6 個 O，呈八面體配位'],
 Mg:['octa','岩鹽型','Mg 周圍 6 個 O，呈八面體配位'],
 Al:['octa','α-Al₂O₃・剛玉型','Al 周圍 6 個 O；實際八面體略有畸變'],
 C:['linear','CO₂ 分子','O=C=O，直線形，鍵角 180°'],
 Zn:['tetra','ZnO・纖鋅礦型','Zn 周圍 4 個 O，呈四面體配位'],
 Cr:['octa','Cr₂O₃・剛玉型','Cr 周圍 6 個 O；實際八面體略有畸變'],
 Fe:['octa','α-Fe₂O₃・赤鐵礦','Fe 周圍 6 個 O；實際八面體略有畸變'],
 Sn:['octa','SnO₂・金紅石型','Sn 周圍 6 個 O，呈畸變八面體配位'],
 Pb:['pyramid','α-PbO・密陀僧型','Pb 位於 4 個 O 所成底面的上方'],
 H:['water','H₂O 分子','H–O–H，彎曲形，鍵角約 104.5°'],
 Cu:['square','CuO・黑銅礦型','Cu 最近的 4 個 O 近似共平面排列'],
 Hg:['linear','HgO・斜方晶型','Hg 的 2 個近鄰 O 近似直線排列'],
 Ag:['linear','Ag₂O・赤銅礦型','Ag 連接 2 個 O，呈直線配位'],
 Pt:['octa','α-PtO₂・CdI₂ 型','Pt 周圍 6 個 O；配位八面體形成層狀晶體'],
 Au:['square','Au₂O₃・斜方晶型','Au 周圍 4 個 O，近似平面四方配位']
};
export function localStructure(symbol,oxide){
 if(!oxide)return symbol==='H'?{atoms:[{symbol:'H',p:[-.3,0,0]},{symbol:'H',p:[.3,0,0]}],bonds:[[0,1]]}:{atoms:[{symbol,p:[0,0,0]}],bonds:[]};
 const type=oxideStructures[symbol][0];
 if(type==='water'){
  const angle=104.5*Math.PI/360;
  return{atoms:[{symbol:'O',p:[0,0,0]},{symbol:'H',p:[Math.sin(angle),Math.cos(angle),0]},{symbol:'H',p:[-Math.sin(angle),Math.cos(angle),0]}],bonds:[[0,1],[0,2]]};
 }
 const tetra=[[0,1,0],[Math.sqrt(8/9),-1/3,0],[-Math.sqrt(2/9),-1/3,Math.sqrt(2/3)],[-Math.sqrt(2/9),-1/3,-Math.sqrt(2/3)]];
 const points=type==='tetra'?tetra:type==='octa'?[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]:type==='square'?[[.8,.6,0],[-.8,-.6,0],[-.6,.8,0],[.6,-.8,0]]:type==='pyramid'?[[.65,-.55,.65],[-.65,-.55,.65],[.65,-.55,-.65],[-.65,-.55,-.65]]:[[-1,0,0],[1,0,0]];
 return{atoms:[{symbol,p:[0,0,0]},...points.map(p=>({symbol:'O',p}))],bonds:points.map((_,i)=>[0,i+1,symbol==='C'?2:1])};
}
export const oxideColours={K:'#f2efe4',Na:'#f6f3e9',Ca:'#f1eee2',Mg:'#faf9f1',Al:'#f2f1ec',C:'transparent',Zn:'#e7c74b',Cr:'#427b40',Fe:'#924932',Sn:'#f0efea',Pb:'#b6513c',H:'transparent',Cu:'#242321',Hg:'#be4230',Ag:'#3a2925',Pt:'#3d332c',Au:'#794334'};
export function specimenColour(symbol,oxide,cool=false){return oxide?(symbol==='Zn'&&cool?'#f8f7ed':oxideColours[symbol]):null;}
