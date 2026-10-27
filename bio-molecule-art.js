// Ball-and-stick teaching models; colours and sizes are schematic.
export function moleculeDefinitions(prefix){return `<defs>
 ${[['O','#ffe3c1','#cb7153','#743b2c'],['H','#ffffff','#dceae6','#6e9997'],['C','#d6e4dc','#546d64','#223b35']].map(([atom,light,mid,dark])=>`<radialGradient id="${prefix}-${atom}" cx="30%" cy="24%" r="78%"><stop stop-color="${light}"/><stop offset=".3" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></radialGradient>`).join('')}
 <filter id="${prefix}-shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#173e32" flood-opacity=".24"/></filter>
 </defs>`;}
export function moleculeFragment(kind,prefix){
 let atoms=[],bonds=[];
 if(kind==='water'){atoms=[['O',80,43,22],['H',43,71,15],['H',117,71,15]];bonds=[[0,1],[0,2]];}
 if(kind==='co2'){atoms=[['O',28,57,23],['C',80,57,23],['O',132,57,23]];bonds=[[0,1,2],[1,2,2]];}
 if(kind==='oxygen'){atoms=[['O',54,57,25],['O',106,57,25]];bonds=[[0,1,2]];}
 if(kind==='glucose'){
  // Glucopyranose: five ring carbons, one ring oxygen, CH2OH and five OH groups.
  atoms=[['C',110,48,10],['C',108,75,10],['C',76,84,10],['C',48,65,10],['C',51,36,10],['O',82,27,10],['C',28,18,10],['O',137,33,9],['O',129,94,9],['O',70,108,9],['O',20,79,9],['O',6,7,8],['H',150,22,6],['H',145,101,6],['H',53,112,6],['H',7,93,6],['H',3,-5,6],['H',26,0,6],['H',10,29,6],['H',43,20,6],['H',32,56,6],['H',87,99,6],['H',97,96,6],['H',125,56,6]];
  bonds=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[4,6],[0,7],[1,8],[2,9],[3,10],[6,11],[7,12],[8,13],[9,14],[10,15],[11,16],[6,17],[6,18],[4,19],[3,20],[2,21],[1,22],[0,23]];
 }
 return `<g data-molecule="${kind}">${bonds.map(([a,b,order])=>{const x=atoms[a],y=atoms[b];return `<path d="M${x[1]} ${x[2]}L${y[1]} ${y[2]}" fill="none" stroke="#667e70" stroke-width="${order===2?10:8}" stroke-linecap="round"/><path d="M${x[1]} ${x[2]-2}L${y[1]} ${y[2]-2}" fill="none" stroke="#f7f8e0" stroke-width="2"/>`;}).join('')}${atoms.map(([a,x,y,r])=>`<g data-atom="${a}" filter="url(#${prefix}-shadow)"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${prefix}-${a})" stroke="#fff8" stroke-width=".6"/><ellipse cx="${x-r*.3}" cy="${y-r*.42}" rx="${r*.34}" ry="${r*.14}" fill="#fff" opacity=".25"/><text x="${x}" y="${y+r*.28}" text-anchor="middle" font-family="Georgia,serif" font-size="${r*.85}" font-weight="bold" fill="${a==='H'?'#476c66':'#fff8ed'}">${a}</text></g>`).join('')}</g>`;
}
export function moleculeModel(kind,prefix){return `<svg class="bio-molecule-model" viewBox="${kind==='glucose'?'-10 -16 178 144':'0 0 160 114'}" aria-hidden="true" focusable="false">${moleculeDefinitions(prefix)}${moleculeFragment(kind,prefix)}</svg>`;}
