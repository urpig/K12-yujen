export const elements=Object.fromEntries([
 ['K','鉀','K2O','氧化鉀',2,1,'#c4c8cc','銀白色金屬','白色固體'],
 ['Na','鈉','Na2O','氧化鈉',2,1,'#ccd0d4','銀白色金屬','白色固體'],
 ['Ca','鈣','CaO','氧化鈣',1,1,'#bfc4c8','銀白色金屬','白色固體'],
 ['Mg','鎂','MgO','氧化鎂',1,1,'#c9ced3','銀白色金屬','白色固體'],
 ['Al','鋁','Al2O3','氧化鋁',2,3,'#c0c5c9','銀白色金屬','白色固體'],
 ['C','碳','CO2','二氧化碳',1,2,'#343536','黑色石墨','無色氣體'],
 ['Zn','鋅','ZnO','氧化鋅',1,1,'#adb9c7','微帶藍色的銀白色金屬','熱時黃色，冷卻後白色'],
 ['Cr','鉻','Cr2O3','氧化鉻(III)',2,3,'#b7bec5','銀灰色金屬','綠色固體'],
 ['Fe','鐵','Fe2O3','氧化鐵(III)',2,3,'#a0a6ac','銀灰色金屬','紅褐色固體'],
 ['Sn','錫','SnO2','氧化錫(IV)',1,2,'#c7cccf','銀白色金屬','白色固體'],
 ['Pb','鉛','PbO','氧化鉛(II)',1,1,'#888f9c','藍灰色金屬','可呈黃色或紅色固體'],
 ['H','氫','H2O','水',2,1,'#e7edf1','無色氣體 H₂','常溫下為無色液體；高溫為水蒸氣'],
 ['Cu','銅','CuO','氧化銅(II)',1,1,'#c4764a','紅銅色金屬','黑色固體'],
 ['Hg','汞','HgO','氧化汞(II)',1,1,'#bfc7cd','銀白色液態金屬','可呈紅色或黃色固體'],
 ['Ag','銀','Ag2O','氧化銀(I)',2,1,'#dce0e3','銀白色金屬','棕黑色固體'],
 ['Pt','鉑','PtO2','氧化鉑(IV)',1,2,'#bbc1c5','銀白色金屬','深色固體；實際外觀與含水等條件有關'],
 ['Au','金','Au2O3','氧化金(III)',2,3,'#d8b14a','金黃色金屬','棕色固體；加熱穩定性需另作討論']
].map(([symbol,name,oxide,oxideName,oxideElement,oxideOxygen,colour,appearance,oxideAppearance],rank)=>[symbol,{name,rank,oxide,oxideName,oxideElement,oxideOxygen,colour,appearance,oxideAppearance,formula:symbol==='H'?'H2':symbol,elementUnit:symbol==='H'?2:1}]));
export function formulaText(formula){return formula.replace(/([A-Za-z)])(\d+)/g,(_,letter,digits)=>letter+digits.replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[+d]));}
export function compete(a,b){
 if(!elements[a]||!elements[b])throw new Error('Unknown element');
 const first=elements[a],second=elements[b],yes=first.rank<second.rank;
 const gcd=(x,y)=>y?gcd(y,x%y):x;
 const oxygen=yes?first.oxideOxygen*second.oxideOxygen/gcd(first.oxideOxygen,second.oxideOxygen):second.oxideOxygen;
 const oxideA=yes?oxygen/first.oxideOxygen:0,oxideB=oxygen/second.oxideOxygen;
 const atomsA=yes?oxideA*first.oxideElement:first.elementUnit,atomsB=oxideB*second.oxideElement;
 const coefficientA=atomsA/first.elementUnit,coefficientB=atomsB/second.elementUnit;
 const term=(coefficient,formula)=>(coefficient===1?'':coefficient)+formula;
 const terms=yes?[[coefficientA,first.formula],[oxideB,second.oxide],[oxideA,first.oxide],[coefficientB,second.formula]]:null;
 const known=['Mg:Cu','Mg:Zn','Zn:Cu','Al:Fe','Al:Cr','Mg:C','C:Cu','H:Cu'].includes(a+':'+b)||(['Mg','Zn','Cu'].includes(a)&&['Mg','Zn','Cu'].includes(b));
 const comparisonOnly=!known&&a!==b;
 const equation=yes?terms.slice(0,2).map(x=>term(...x)).join(' + ')+' → '+terms.slice(2).map(x=>term(...x)).join(' + '):`${first.formula} + ${second.oxide} → ${comparisonOnly?'本表序不預測奪氧':'不發生淨奪氧反應'}`;
 const explanation=a===b?'同一種元素沒有活性差異，不會發生淨奪氧反應。':yes?`${first.name}在本表中排得較前，對氧的活性較大；模型把氧由${second.oxide}移向${first.name}，比較得到氧與失去氧。`:`${first.name}在本表中排得較後，模型中的氧仍留在${second.oxide}一側。`;
 const notes=[];
 if(comparisonOnly)notes.push('這是依本卡活性表建立的比較模型；配平式只表示原子收支，不保證該組合在加熱時就依此反應。');
 if(a==='K'||a==='Na'||b==='K'||b==='Na')notes.push('鉀、鈉在此選用 K₂O、Na₂O 比較；實際燃燒還可能產生超氧化物或過氧化物。');
 if(b==='H')notes.push('此處以 H₂O 表示氫與氧的組成；活潑金屬與水可能生成氫氧化物，需另看實際條件。');
 if(a==='C')notes.push('本比較式選擇 CO₂；實際碳還原也可能生成 CO，並受溫度影響。');
 if(a==='H'&&b==='Fe')notes.push('延伸：在合適的高溫等條件下，H₂ 可以還原氧化鐵；不能只憑本表序判定所有實際反應。');
 if(['Hg','Ag','Pt','Au'].includes(a)||['Hg','Ag','Pt','Au'].includes(b))notes.push('這些元素的氧化物需考慮熱穩定性；本模型沒有模擬受熱分解或特殊製備條件。');
 return{reacts:yes,equation,explanation,comparisonOnly,notes,terms,counts:{a:atomsA,b:atomsB,oxygen,oxideA,oxideB,coefficientA,coefficientB}};
}
export function furnace({ore,coke,lime,air}){for(const n of [ore,coke,lime])if(!Number.isInteger(n)||n<0||n>4)throw new Error('Invalid recipe');const running=!!air&&coke>0;const reduced=running?Math.min(ore,coke):0;const cleaned=Math.min(reduced,lime);const slag=running?Math.min(ore,lime):0;return{running,reduced,cleaned,slag,unreduced:ore-reduced,unusedCoke:running?Math.max(0,coke-ore):coke,unremovedImpurity:ore-slag,full:ore>0&&reduced===ore&&slag===ore};}
export const metals={
Na:{name:'鈉',flame:'黃',color:'#f6b632',phenomenon:'劇烈反應，出現黃色火焰。',product:'國中簡化：白色氧化鈉 Na₂O；實際也可能生成淡黃色 Na₂O₂。',equation:'4Na + O₂ → 2Na₂O',extra:'充足氧氣中常以過氧化鈉為主：2Na + O₂ → Na₂O₂。',waterTitle:'呈鹼性：紅色石蕊變藍',water:'Na₂O + H₂O → 2NaOH。Na₂O₂ 與水作用也會產生 NaOH；此處只呈現酸鹼判斷。',litmus:'base'},
Mg:{name:'鎂',flame:'白',color:'#fffbe5',phenomenon:'燃燒時放出耀眼白光。',product:'白色固體，氧化鎂 MgO。',equation:'2Mg + O₂ → 2MgO',extra:'氧氣中以 MgO 為主；在空氣中燃燒也可能有少量氮化鎂，本卡不模擬。',waterTitle:'微溶的鹼性懸浮液：紅色石蕊變藍',water:'MgO + H₂O → Mg(OH)₂。反應較慢，氫氧化鎂難溶，但溶出的少量可使水呈鹼性。',litmus:'base'},
Zn:{name:'鋅',flame:'藍綠',color:'#7acabb',phenomenon:'鋅粉充分加熱可燃燒，呈藍綠色火焰，產生氧化鋅。',product:'氧化鋅 ZnO：熱時黃色，冷卻後白色。',equation:'2Zn + O₂ → 2ZnO',extra:'延伸：ZnO 是兩性氧化物，可以和酸、強鹼反應；不能因為它是金屬氧化物就斷定其水溶液呈鹼性。',waterTitle:'難溶於水：石蕊通常無明顯變色',water:'ZnO 不易與水形成可觀察的鹼性溶液。熱黃、冷白是物理性質的改變，並非變成另一種物質。',litmus:'neutral'},
Cu:{name:'銅',flame:'無明顯火焰',color:'#d28b54',phenomenon:'銅片加熱時表面逐漸變黑，通常沒有明顯燃燒火焰。',product:'黑色固體，氧化銅 CuO。',equation:'2Cu + O₂ → 2CuO',extra:'這裡模擬銅片加熱形成 CuO，不把銅的焰色反應當成銅片燃燒現象。',waterTitle:'不溶於水：石蕊無明顯變色',water:'CuO 是鹼性氧化物，但不溶於水、不與水生成鹼性溶液；它可以與酸反應。',litmus:'neutral'}
};
export const nonmetals={
S:{name:'硫',color:'#6f9cdb',phenomenon:'燃燒呈藍色火焰，生成無色、有刺激性的氣體。',product:'二氧化硫 SO₂，無色氣體。',equation:'S + O₂ → SO₂',extra:'SO₂ 有刺激性，不能靠直接嗅聞辨認。火焰是藍色，不代表氣體是藍色。',waterTitle:'呈酸性：藍色石蕊變紅',water:'SO₂ 溶入水後呈酸性；國中常以 SO₂ + H₂O ⇌ H₂SO₃ 表示。',litmus:'acid'},
P:{name:'磷',color:'#fff1aa',phenomenon:'紅磷燃燒發出明亮的光，出現大量白煙。',product:'白色固體微粒 P₄O₁₀，俗稱五氧化二磷。',equation:'4P + 5O₂ → P₄O₁₀',extra:'「白煙」是細小固體微粒懸浮在空氣中，不是白色氣體；課本也常寫成 P₂O₅。',waterTitle:'呈酸性：藍色石蕊變紅',water:'P₄O₁₀ + 6H₂O → 4H₃PO₄，生成磷酸。',litmus:'acid'},
C:{name:'碳',color:'#e9813b',phenomenon:'木炭在充足氧氣中發出紅光，通常沒有明顯火焰。',product:'二氧化碳 CO₂，無色氣體。',equation:'C + O₂ → CO₂',extra:'CO₂ 可使澄清石灰水變混濁：CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O。',waterTitle:'弱酸性：藍色石蕊可變紅',water:'少量 CO₂ 與水反應生成碳酸：CO₂ + H₂O ⇌ H₂CO₃。',litmus:'acid'},
CO:{name:'碳',color:'#dc7b44',phenomenon:'供氧不足時，碳可能不完全燃燒。',product:'可能生成一氧化碳 CO；實際可能混有 CO₂ 與未反應的碳。',equation:'2C + O₂ → 2CO',extra:'CO 無色、無味且有毒。本卡用 CO 代表氧不足時可能出現的產物；不是所有氧不足情況都只生成 CO。',waterTitle:'CO 不使水明顯呈酸性：石蕊無明顯變色',water:'CO 與 CO₂ 性質不同；CO 是中性氧化物，難溶於水。切勿把「非金屬氧化物」一概當成酸性。',litmus:'neutral'}
};
export const quizzes={
1:{question:'為什麼鋅與氧化銅一起加熱會生成氧化鋅和銅呢?',options:['因為銅對氧的活性比鋅大，能把氧轉移給鋅','因為鋅對氧的活性比銅大，能奪取氧化銅中的氧','因為鋅和銅對氧的活性相同，加熱後就會交換氧','因為所有金屬氧化物只要加熱，就一定會失去氧'],answer:1,explanation:'Zn + CuO → ZnO + Cu。鋅對氧的活性比銅大，所以在適當加熱下，鋅能奪取氧化銅中的氧，形成氧化鋅；氧化銅失去氧後生成銅。鋅得氧被氧化，氧化銅失氧被還原，兩者同時發生。'},
2:{question:'把銅片加熱後，將黑色產物放入水中。哪個預測正確？',options:['黑色 CuO 不溶於水，石蕊無明顯變色','黑色 CuO 會完全溶解，紅色石蕊變藍','黑色產物是碳，所以不會與酸反應','黑色 CuO 溶於水後，會使藍色石蕊變紅'],answer:0,explanation:'2Cu + O₂ → 2CuO，黑色產物是氧化銅。CuO 雖是鹼性氧化物，卻不溶於水、不與水形成鹼性溶液；因此石蕊無明顯變色。'},
3:{question:'紅磷充分燃燒產生大量白煙，產物與足量水作用後，哪個描述正確？',options:['白煙是白色氣體，水呈鹼性','白煙是細小固體微粒，水呈酸性','產物是一氧化碳，水保持中性','白煙是細小固體微粒，產物加水後呈鹼性'],answer:1,explanation:'白煙是細小的磷氧化物固體微粒，不是氣體。P₄O₁₀ 與水反應生成磷酸 H₃PO₄，使水呈酸性，藍色石蕊變紅。'},
4:{question:'CuO + Mg → Cu + MgO 中，哪個敘述正確？',options:['鎂失去氧，因此被還原','氧化銅得到氧，因此被氧化','鎂得到氧被氧化；氧化銅失去氧被還原','鎂與氧化銅只是混合，沒有物質得到或失去氧'],answer:2,explanation:'鎂從氧化銅中得到氧，形成氧化鎂，因此鎂被氧化；氧化銅失去氧，生成銅，因此氧化銅被還原。氧化與還原同時發生。'},
5:{question:'高爐已有礦石、焦炭和熱空氣，加入石灰石的主要目的是什麼？',options:['由石灰石直接把 Fe₂O₃ 還原成鐵','石灰石分解出 CaO，與 SiO₂ 形成爐渣','把所有 CO 轉成氧氣，供給燃燒','石灰石只增加生鐵的含碳量，不會處理雜質'],answer:1,explanation:'CaCO₃ → CaO + CO₂，接著 CaO + SiO₂ → CaSiO₃（熔渣），讓雜質以爐渣分離。還原氧化鐵主要靠 CO：Fe₂O₃ + 3CO → 2Fe + 3CO₂。石灰石負責除雜質。'},
6:{question:'關於光合作用、呼吸作用與抗氧化，哪個敘述正確？',options:['光合作用只有還原，呼吸作用只有氧化','光合與呼吸各自都同時包含氧化和還原','維他命 C、E 抗氧化，所以自己不會被氧化','只要物品變白，就一定是氧化還原反應'],answer:1,explanation:'光合作用中水被氧化、CO₂ 被還原；有氧呼吸中葡萄糖被氧化、O₂ 被還原。每個過程的氧化與還原都同時發生。維他命 C、E 發揮還原作用時，自身會被氧化；漂白也可能涉及非氧化還原的脫色反應。'}
};
