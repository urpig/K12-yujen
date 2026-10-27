export const lessons=[
 {
  "id": 1,
  "act": "序章｜回家的條件",
  "day": "皇宮工坊",
  "type": "ore",
  "title": "礦石裡的鐵，去了哪裡？",
  "question": "礦石含有鐵，為什麼不能直接鍛成劍？",
  "opening": "皇帝沒收時空裝置，命人把兩人關進鍛刀房。阿公拿起礦石，和小葵一起找線索。一箱鐵礦石從小門送來：「造出神兵，才能離開。」",
  "task": "拖曳旋轉礦石，近看岩面。找得到能直接取出的金屬嗎？",
  "required": [
   "ore"
  ],
  "labels": [
   "轉動礦石，查看不同表面"
  ],
  "finding": "轉動後仍看見粗糙岩面；外觀不能單獨證明成分。",
  "explanation": "成分紀錄：赤鐵礦主要含氧化鐵 Fe₂O₃，鐵已與氧結合。 敲碎只改變大小；取得金屬鐵，需要化學反應移走氧。",
  "equation": "含有鐵元素 ≠ 已經是可使用的金屬鐵",
  "bridge": "小葵圈起「氧化鐵」：「氧化是什麼？」阿公攤開工坊圖卡：「先認識物質與氧結合這件事，再到實驗箱觀察。」",
  "quiz": {
   "question": "為什麼不能只敲碎赤鐵礦，就得到可鍛造的鐵？",
   "options": [
    "敲碎只改變大小，沒有讓氧化鐵失去氧",
    "礦石裡完全沒有鐵元素",
    "所有紅棕色物質都是金屬鐵",
    "只要磨得夠細，鐵就自然出現"
   ],
   "answer": 0,
   "explanations": [
    "對。要取得金屬鐵，需要讓其中的氧離開；碎石只是改變形狀與大小。",
    "成分資料指出它含鐵元素，但主要以氧化鐵的形式存在。",
    "顏色不能單獨確認成分；氧化鐵也不等於金屬鐵。",
    "研磨不會自動把氧化鐵變成鐵，還需要化學反應。"
   ]
  },
  "sourceId": 1,
  "purpose": "替小葵找出第一道難關：礦石怎麼變成刀材？",
  "conceptTitle": "先取回金屬，才能鍛造",
  "points": [
   "成分紀錄：赤鐵礦主要含氧化鐵 Fe₂O₃，鐵已與氧結合。",
   "敲碎只改變大小；取得金屬鐵，需要化學反應移走氧。"
  ],
  "benefit": "小葵記下第一個目標：先讓氧離開氧化鐵，才能取回金屬鐵。",
  "previousId": 1,
  "dialogue": [
   [
    "kui",
    "只有石頭？這要怎麼打成寶劍？"
   ],
   [
    "grandpa",
    "先看看它的表面，再查查裡面有什麼。"
   ]
  ],
  "portraits": {
   "kui": "wonder",
   "grandpa": "gentle"
  }
 },
 {
  "id": 2,
  "act": "第一章｜跟著氧找線索",
  "day": "隨身實驗箱",
  "type": "combustion",
  "title": "從樣本架，追查氧的去向",
  "question": "金屬留下固體，木炭卻變小了：氧究竟去了哪裡？",
  "opening": "生活中的漂白讓小葵發現：顏色變了，還不能直接判定氧化或還原。她和阿公把金屬與非金屬排上架，這次要收好燃燒後的產物，再用試紙補上證據，找出氧的去向。",
  "task": "拖樣本上匙加熱。氣體留在瓶內：自動取匙並示意冷卻後，加水、輕搖（玻璃片自動開合）；用一支滴管取瓶內液體，分別滴到紅、藍石蕊試紙上。固體也用石蕊比較。",
  "required": [
   "Cu:burn",
   "Cu:wet",
   "Mg:burn",
   "Mg:wet",
   "Zn:burn",
   "Zn:cool",
   "Zn:wet",
   "Na:burn",
   "Na:wet",
   "rank:Na",
   "rank:Mg",
   "rank:Zn",
   "rank:Cu",
   "S:burn",
   "S:ph",
   "P:burn",
   "P:wet",
   "C:burn",
   "C:ph"
  ],
  "labels": [
   "銅：加熱",
   "銅：兩張試紙",
   "鎂：燃燒",
   "鎂：兩張試紙",
   "鋅：燃燒",
   "鋅：白色產物",
   "鋅：兩張試紙",
   "鈉：燃燒",
   "鈉產物：兩張試紙",
   "活性階梯：鈉",
   "活性階梯：鎂",
   "活性階梯：鋅",
   "活性階梯：銅",
   "硫：燃燒",
   "硫：瓶內取液，紅、藍石蕊試紙",
   "紅磷：燃燒",
   "紅磷：兩張試紙",
   "碳：燃燒",
   "CO₂：瓶內取液，紅、藍石蕊試紙"
  ],
  "finding": "金屬留下不同固體；磷的白煙是微粒，碳完全燃燒後生成無色的 CO₂。",
  "explanation": "得到氧叫氧化；沒有明顯火焰的銅片也會氧化。Na ＞ Mg ＞ Zn ＞ Cu，不能只按火焰亮度排列。 鈉燃燒產物與水作用生成 NaOH，呈鹼性；MgO 較慢與水作用。CuO 是鹼性氧化物、ZnO 是兩性氧化物，兩者難溶於水，試紙不變色不代表氧化物中性。 硫、磷與碳完全燃燒的產物，與水作用後可使水呈酸性。",
  "equation": "2Cu + O₂ → 2CuO　｜　2Mg + O₂ → 2MgO\n2Zn + O₂ → 2ZnO　｜　2Na + O₂ → Na₂O₂（氧充足代表式）\nS + O₂ → SO₂　｜　4P + 5O₂ → P₄O₁₀\nC + O₂ → CO₂",
  "bridge": "小葵看著黑色氧化銅：「氧能不能換個夥伴？」阿公指著先前的活性紀錄：「碳比銅更容易與氧結合。現在試試，它能不能把銅取回來。」",
  "quiz": {
   "question": "從樣本架完成實驗後，哪一個推論值得接著驗證？",
   "options": [
    "鎂最亮，所以一定比鈉更活潑",
    "碳能與氧結合，值得再試它能否取走氧化物中的氧",
    "氧化銅遇水不變色，表示它沒有和氧結合",
    "所有白色產物都是同一種物質"
   ],
   "answer": 1,
   "explanations": [
    "火焰亮度受形態與條件影響，不能直接當作對氧活性的量尺。",
    "對。燃燒提供候選線索；是否能取回金屬，要做下一張的氧化銅對照試驗。",
    "CuO 已含有氧；它難溶於水，石蕊不變色不能用來否定氧化反應。",
    "顏色相同不能證明成分相同；MgO、冷卻的 ZnO 與磷氧化物都須分別比較。"
   ]
  },
  "sourceId": 2,
  "purpose": "追查氧的去向，為「取回金屬」找候選幫手。",
  "conceptTitle": "先看氧去了哪裡，再試著把氧移走",
  "points": [
   "得到氧叫氧化；沒有明顯火焰的銅片也會氧化。Na ＞ Mg ＞ Zn ＞ Cu，不能只按火焰亮度排列。",
   "鈉燃燒產物與水作用生成 NaOH，呈鹼性；CuO、ZnO 難溶於水，不能由試紙不變色就判定氧化物中性。",
   "硫、磷與碳完全燃燒的產物，與水作用後可使水呈酸性。"
  ],
  "benefit": "小葵圈起兩條線索：銅得氧變黑，碳也能得氧。遇水性質能辨認產物，卻不能代替還原試驗。",
  "stageGoals": {
   "burn": "從同一個樣本架取樣，比較元素如何得到氧。",
   "wet": "氣體在瓶內加水、輕搖後，用滴管取液滴在紅、藍石蕊試紙上；固體也用石蕊比較。"
  },
  "previousId": 2,
  "dialogue": [
   [
    "kui",
    "有的變成粉末，有的卻不見了？"
   ],
   [
    "grandpa",
    "先收好產物。看不見的，也可能留下線索。"
   ]
  ],
  "portraits": {
   "kui": "surprised",
   "grandpa": "curious"
  }
 },
 {
  "id": 3,
  "act": "第一章｜跟著氧找線索",
  "day": "小爐試煉",
  "type": "redox",
  "title": "誰能拿走氧化物的氧？",
  "question": "碳、鋅、鉻、錫、鉛、銅，誰能還原氧化鐵？",
  "opening": "小葵拿出碳、鋅、鉻、錫、鉛和銅。先沿用 01 的對氧活性線索，逐一預測誰能帶走氧化鐵的氧，再加熱看結果。氧化鐵已放在加熱架上，這次由小葵親手加入每一種幫手。",
  "task": "先預測，再從樣本架抓取碳、鋅、鉻、錫、鉛或銅，放進已在加熱架上的氧化鐵，觀察前後差別。",
  "required": [
   "iron-C",
   "iron-Zn",
   "iron-Cr",
   "iron-Sn",
   "iron-Pb",
   "iron-Cu"
  ],
  "labels": [
   "碳與氧化鐵：預測後觀察",
   "鋅與氧化鐵：預測後觀察",
   "鉻與氧化鐵：預測後觀察",
   "錫與氧化鐵：預測後觀察",
   "鉛與氧化鐵：預測後觀察",
   "銅與氧化鐵：預測後觀察"
  ],
  "finding": "本課高溫模型中，碳、鋅、鉻能帶走氧化鐵的氧；錫、鉛、銅未能取回金屬鐵。",
  "explanation": "氧化鐵失氧被還原；取走氧的材料得氧被氧化，兩者同時發生。 還原劑本身也會參與反應，奪氧方向仍受溫度與氧化物種類等條件影響。",
  "equation": "2Fe₂O₃ + 3C → 4Fe + 3CO₂（合適高溫；總反應）\nFe₂O₃ + 3Zn → 2Fe + 3ZnO\nFe₂O₃ + 2Cr → 2Fe + Cr₂O₃",
  "bridge": "六種材料的比較留下了活性線索。阿公指著 CO：「高爐常用的是這個含氧的幫手，它還能再取得氧嗎？」",
  "quiz": {
   "question": "依本課的對氧活性與高溫模型，哪組材料能把氧化鐵還原成金屬鐵？",
   "options": [
    "六種材料都可以，只要加熱夠久",
    "只有碳可以，其他材料都不行",
    "錫、鉛、銅，因為活性比鐵小",
    "碳、鋅、鉻，因為對氧活性比鐵大"
   ],
   "answer": 3,
   "explanations": [
    "加熱不是唯一線索，仍要比較候選元素與鐵對氧的活性。",
    "除了碳，鋅與鉻在本模型條件下也能取得氧化鐵的氧。",
    "方向相反：錫、鉛、銅的對氧活性比鐵小，不能在本模型條件下把氧化鐵還原成金屬鐵。",
    "對。它們得到氧、自己被氧化；氧化鐵同時失氧被還原，實際反應仍受條件影響。"
   ]
  },
  "sourceId": 5,
  "purpose": "先預測六種材料能否還原氧化鐵，再親手加入材料，用同一條件比較氧的去向。",
  "conceptTitle": "取回金屬，要看氧是否離開",
  "points": [
   "活性大的元素較容易得氧、自己被氧化；活性較小金屬的氧化物可能失氧、被還原。",
   "本課模型中：C、Zn、Cr 的對氧活性比 Fe 大，能還原氧化鐵；Sn、Pb、Cu 比 Fe 小，未能取回金屬鐵。",
   "氧化鐵失氧被還原，取走氧的元素得氧被氧化，兩者同時發生。",
   "還原劑本身也參與反應；活性表用來比較方向，實際結果仍須考慮反應條件。"
  ],
  "benefit": "小葵找出了能幫氧化鐵失氧的材料；接下來，要追蹤高爐裡常用的 CO 如何把氧帶走。",
  "previousId": 4,
  "dialogue": [
   [
    "kui",
    "都是加熱，六種材料都能幫鐵拿走氧嗎？"
   ],
   [
    "grandpa",
    "先看誰更容易得到氧，再用預測和對照來查證。"
   ]
  ],
  "portraits": {
   "kui": "excited",
   "grandpa": "idea"
  }
 },
 {
  "id": 4,
  "act": "第二章｜讓鐵回來",
  "day": "粒子推演",
  "type": "iron",
  "title": "看不見的幫手，怎樣帶走氧？",
  "question": "CO 已經含氧，還能再從氧化鐵接走氧嗎？",
  "opening": "兩人回到最初的氧化鐵。阿公打開粒子模型，讓小葵追蹤高溫反應中每一個氧的去向。",
  "task": "把三份 CO 拖進左側反應區，追蹤氧的去向；數一數原子有沒有少。",
  "required": [
   "oxygen1",
   "oxygen2",
   "oxygen3"
  ],
  "labels": [
   "追蹤第 1 個氧",
   "追蹤第 2 個氧",
   "追蹤第 3 個氧"
  ],
  "finding": "每份 CO 多接一個氧成為 CO₂；鐵仍在，原子沒有消失。",
  "explanation": "合適高溫下，Fe₂O₃ 失氧被還原；CO 得氧被氧化，是還原劑。 模型追蹤總反應的原子收支；實際還原分多步進行。",
  "equation": "Fe₂O₃ + 3CO → 2Fe + 3CO₂\n前後皆為：2 個 Fe、3 個 C、6 個 O",
  "bridge": "鐵的去向清楚了。鐵匠問：「整爐的熱和 CO 從哪來？雜質怎麼辦？」阿公展開高爐模型，和小葵一起推演。",
  "quiz": {
   "question": "為什麼在合適的高爐條件下，CO 能還原氧化鐵？",
   "options": [
    "CO 能再接氧形成 CO₂，使氧化鐵失氧",
    "CO 把氧原子消滅",
    "CO 是最後得到的金屬",
    "CO 不參與反應，只負責運送鐵"
   ],
   "answer": 0,
   "explanations": [
    "對。C ＞ Fe 是碳材的活性線索；CO 的還原能力則須看溫度與氣體條件。它接氧成 CO₂，自己也被氧化。",
    "氧仍在 CO₂ 中，沒有消失。",
    "最後得到的金屬是 Fe；CO 是氣體。",
    "CO 得到氧而形成 CO₂，確實參與化學反應。"
   ]
  },
  "sourceId": 6,
  "purpose": "看懂 CO 如何協助取鐵，把銅的線索用回鐵礦。",
  "conceptTitle": "氧去了 CO₂，鐵被留了下來",
  "points": [
   "合適高溫下，Fe₂O₃ 失氧被還原；CO 得氧被氧化，是還原劑。",
   "模型追蹤總反應的原子收支；實際還原分多步進行。"
  ],
  "benefit": "小葵在圖上標出：氧進了 CO₂，鐵留下來。接著要讓這件事在爐中持續發生。",
  "previousId": 5,
  "dialogue": [
   [
    "kui",
    "CO 已經有氧了，還能再拿嗎？"
   ],
   [
    "grandpa",
    "跟著氧走一遍，再數數原子有沒有少。"
   ]
  ],
  "portraits": {
   "kui": "thinking",
   "grandpa": "thoughtful"
  }
 },
 {
  "id": 5,
  "act": "第二章｜讓鐵回來",
  "day": "爐場藍圖",
  "type": "furnace",
  "title": "看見爐內的分工",
  "question": "煉出鐵與去掉雜質，是同一份工作嗎？",
  "opening": "工坊還缺一套煉鐵安排。阿公借現代高爐模型推演，和小葵、鐵匠一起分清供熱、還原與除雜。",
  "task": "把礦石、焦炭與石灰石拖進送料車，再點「加熱」。跟著 1–8 亮起，對照右側反應式。",
  "required": [
   "ore",
   "coke",
   "air",
   "lime"
  ],
  "labels": [
   "送入礦石",
   "加入焦炭",
   "加熱並完成 1–8 觀察",
   "加入石灰石，觀察分層"
  ],
  "finding": "礦料下降、氣體上升；加入石灰石後可見上層熔渣、下層鐵水。",
  "explanation": "焦炭與熱風建立熱源，並經反應產生 CO。 CO 是高爐還原氧化鐵的主要還原劑。 石灰石分解成 CaO，與 SiO₂ 等形成熔渣除雜；石灰石不是主要還原劑。",
  "equation": "C + O₂ → CO₂　；　CO₂ + C → 2CO\nCaCO₃ → CaO + CO₂　；　CaO + SiO₂ → CaSiO₃（熔渣代表式）",
  "bridge": "終於有了生鐵，小葵想立刻鍛劍。鐵匠搖頭：「先試刀材。有的會裂，有的彎了就回不來。」",
  "quiz": {
   "question": "加入石灰石的主要作用是？",
   "options": [
    "直接把氧化鐵還原",
    "提供所有熱量",
    "形成熔渣，協助移除雜質",
    "保證煉出的生鐵立刻成為鋼劍"
   ],
   "answer": 2,
   "explanations": [
    "高爐主要靠 CO 還原氧化鐵；石灰石負責不同工作。",
    "主要熱源是焦炭等燃料的反應，不是石灰石。",
    "對。分解形成 CaO，再與 SiO₂ 等形成熔渣。",
    "生鐵還需調整成分、製程與熱處理，不能直接等同鋼。"
   ]
  },
  "sourceId": 7,
  "purpose": "分清爐內工作，替工坊找出取得生鐵的思路。",
  "conceptTitle": "煉出鐵與去雜質，各有分工",
  "points": [
   "焦炭與熱風建立熱源，並經反應產生 CO。",
   "CO 是高爐還原氧化鐵的主要還原劑。",
   "石灰石分解成 CaO，與 SiO₂ 等形成熔渣除雜；石灰石不是主要還原劑。"
  ],
  "benefit": "小葵把供熱、還原、除雜分別記好；鐵匠依工坊條件安排煉製，接下來還得挑刀材。",
  "previousId": 6,
  "dialogue": [
   [
    "kui",
    "爐子裡這麼忙，每種原料都在做什麼？"
   ],
   [
    "grandpa",
    "一樣一樣加，看看氣體和熔渣往哪走。"
   ]
  ],
  "portraits": {
   "kui": "curious",
   "grandpa": "confident"
  }
 },
 {
  "id": 6,
  "act": "第三章｜神兵的考驗",
  "day": "試刀之日",
  "type": "steel",
  "title": "從生鐵到鋼，再到熟鐵",
  "question": "把碳減少，刀就一定越好用嗎？",
  "opening": "鐵匠拿出生鐵、鋼與熟鐵的代表刀材。小葵要選的，是能符合用途的材料，不只是名字響亮的「鐵」。",
  "task": "從上架抓刀，放到支點上；拉右側把手到金線再鬆開。直接換下一把，比較卸載結果。",
  "required": [
   "pig",
   "steel",
   "wrought"
  ],
  "labels": [
   "生鐵刀：觀察脆裂",
   "鋼刀：觀察回彈",
   "熟鐵刀：觀察永久彎曲"
  ],
  "finding": "本組案例中，生鐵脆裂、經適當熱處理的鋼回彈、熟鐵留下彎曲。",
  "explanation": "生鐵含碳較多，通常硬脆；熟鐵含碳極低，通常較軟。 鋼需控制含碳量、雜質與熱處理，讓性質符合用途。 彎折試驗不直接測硬度；形狀、組織與熱處理也會影響結果。",
  "equation": "生鐵（高碳） → 減碳、除雜與製鋼 → 鋼\n繼續減碳至極低含量：比較熟鐵的柔軟與可加工性",
  "bridge": "小葵選好刀材，和阿公完成神兵。兩人獻上寶劍、取回時空裝置；回家後，小葵又想到細胞裡的氧化。",
  "quiz": {
   "question": "這三把刀的結果，支持哪個選材原則？",
   "options": [
    "碳越多，刀一定越耐彎折",
    "把碳全部去掉，刀一定更硬",
    "綜合含碳量與製程，平衡硬度、韌性與用途",
    "所有含 0.8% 碳的刀都不會斷"
   ],
   "answer": 2,
   "explanations": [
    "高碳生鐵的代表案例發生脆裂；硬不等於韌。",
    "熟鐵的低碳特性通常使它較柔軟，刀刃容易變形。",
    "對。這組對照讓你看出取捨；還要考慮加工、組織和熱處理。",
    "0.8% 只描述含碳量；製程、缺陷、形狀與實際負荷仍可能使刀損壞。"
   ]
  },
  "sourceId": 8,
  "purpose": "用受力結果選刀材，和鐵匠完成神兵。",
  "conceptTitle": "好刀材，要兼顧用途與取捨",
  "points": [
   "生鐵含碳較多，通常硬脆；熟鐵含碳極低，通常較軟。",
   "鋼需控制含碳量、雜質與熱處理，讓性質符合用途。",
   "彎折試驗不直接測硬度；形狀、組織與熱處理也會影響結果。"
  ],
  "benefit": "小葵選擇合適鋼材，與鐵匠配合鍛造、熱處理；好刀要兼顧硬度、韌性和用途。",
  "previousId": 7,
  "dialogue": [
   [
    "kui",
    "就要交劍了，哪種刀材才撐得住？"
   ],
   [
    "grandpa",
    "拉一拉，再放手。結果會幫我們選。"
   ]
  ],
  "portraits": {
   "kui": "determined",
   "grandpa": "encourage"
  }
 }
];
export const materialCases={"metals":[["Cu","銅片"],["Mg","鎂帶"],["Zn","鋅粉"],["Na","鈉"]],"nonmetals":[["S","硫"],["P","紅磷"],["C","碳"]],"redox":[["alone","只有 CuO"],["carbon","CuO ＋ 碳"],["ZnCu","Zn ＋ CuO"],["CuZn","Cu ＋ ZnO"]],"steel":[["pig","① 生鐵 · 3.5% C"],["steel","② 鋼 · 0.8% C"],["wrought","③ 熟鐵 · 0.01% C"]],"combustion":[["Cu","銅片"],["Mg","鎂帶"],["Zn","鋅粉"],["Na","鈉"],["S","硫"],["P","紅磷"],["C","碳"]]};
export function freshState(c){return {selected:materialCases[c.type]?.[0][0]||'',evidence:[],quizOpen:false,answer:null,tab:'burn'};}
export function isReady(c,s){return c.required.every(key=>s.evidence.includes(key));}
export function restoreState(c,raw){const s=freshState(c);if(!raw||typeof raw!=='object')return s;s.evidence=[...new Set((Array.isArray(raw.evidence)?raw.evidence:[]).filter(k=>c.required.includes(k)))];if(materialCases[c.type]?.some(([key])=>key===raw.selected))s.selected=raw.selected;s.quizOpen=isReady(c,s)&&raw.quizOpen===true;s.answer=s.quizOpen&&Number.isInteger(raw.answer)&&raw.answer>=0&&raw.answer<4?raw.answer:null;return s;}
export function massBalance(key){return key==='Mg'?{solidBefore:24,oxygen:16,solidAfter:40,gas:0}:{solidBefore:12,oxygen:32,solidAfter:0,gas:44};}
export function litmusResult(type,paper){return type==='acid'?'#c46579':type==='base'?'#526eb9':paper==='red'?'#c46579':'#526eb9';}

export function migrateLegacy(c,raw){if(!raw||['steel','rust'].includes(c.type))return freshState(c);const s=restoreState(c,raw[c.sourceId]);if(c.type==='ore'){s.answer=null;s.quizOpen=false;}return s;}


export function migrateEight(c,raw){if(c.type!=='combustion')return restoreState(c,raw[c.previousId]);const a=raw[2]||{},b=raw[3]||{};return restoreState(c,{evidence:[...(Array.isArray(a.evidence)?a.evidence:[]),...(Array.isArray(b.evidence)?b.evidence:[])],selected:a.selected});}
