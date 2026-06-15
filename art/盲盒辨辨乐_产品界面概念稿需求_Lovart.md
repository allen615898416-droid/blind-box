# 《盲盒辨辨乐（暂名）》产品界面概念稿需求 · 给 Lovart

> 版本 v1.0 · 2026-06-15 · 用途：交付给 Lovart 等生图 AI，产出**产品的 4 个核心页面 UI 概念稿**（带布局、定风格）。
> 目标：先看到"这个 App 长什么样"，方向定了之后，策划再据此出可玩 demo。
> 粒度：**界面概念图（含布局）**——既要画出每个页面"哪个区域放什么"，也要定下整体美术风格。
> 输出：竖屏手机界面（手机比例，竖版）。本阶段不限制创意发挥，鼓励大胆、可爱、有潮玩感。

---

## 〇、先理解这是个什么产品（建立语境，必读）

一款治愈系休闲收集手游。玩家在一面"收集墙"上看到一组可爱的潮玩，有些还没拿到（空格）；点一个想要的，进入关卡，面对一组"长得/听起来很像、但其实不同"的盲盒，通过摇一摇、对比、推理，赌出哪个是它，猜对就收进收集墙，集齐一整套（含稀有隐藏款）。

- **核心情绪**：好奇 + 收集欲 + 小赌怡情。
- **要给人的第一眼感觉**：可爱到想伸手摸、想拥有、想集齐。

---

## 一、全局美术风格（4 个页面统一，先锁定）

**风格定位：潮流盲盒萌系 —— 大胆往泡泡玛特那一挂的潮玩审美靠。**

| 维度 | 设定 |
|------|------|
| 风格 | 现代潮玩盲盒风、可爱萌系、软糯、解压治愈；大眼睛、圆润、奶油质感 |
| 质感 | 哑光软胶玩具感、奶油厚涂、想捏一下；不要写实、不要金属强反光 |
| UI 调性 | 干净、圆角、留白舒服；糖果色但不刺眼；像一款精致的休闲手游 |
| 色板 | 奶油底 #FBF3E7 / 薄荷 #9FE3CB / 樱花粉 #F6B8CE / 稀有金 #FBD96B / 丁香紫 #C9BEF0 / 天空蓝 #7CB8E0 |
| 情绪词（喂AI） | `kawaii designer toy mobile game UI, blind box collectible aesthetic, soft vinyl, pastel macaron, chubby cute, premium relaxing, clean rounded UI` |

> 底线：**学风格不抄商标**——尽情靠近潮玩萌系审美；但不出现 Labubu / Pop Mart / Molly 等名字或其标志性形象的直接复制，要做"我们自己的可爱系列"。画面里的潮玩角色用"风/小动物/萌物"等占位即可，**重点是页面布局和整体调性，不是某个角色长什么样。**

---

## 二、要画的 4 个核心页面（逐页：作用 + 布局区域 + prompt）

> 每页都是竖屏手机界面。下面"布局区域"是策划要求的信息结构，请在概念图里体现；"画面氛围"是风格引导。

---

### 页面 1 · 主页（玩家的家）

**作用**：打开 App 第一眼，去任何地方的出发点，传达"可爱、想玩"。

**布局区域（从上到下）**：
- 顶部：游戏 Logo / 名称区，旁边小的设置入口
- 中部（主视觉）：一个大的、可爱的主推内容（如当期主题的明星潮玩 + "开始收集"大按钮）
- 下部：总收集进度条（如"已收集 12/40"）、每日任务 / 奖励入口
- 底部：导航（主页 / 收集墙 等 tab）

**prompt**：
```
[全局风格词] mobile game home screen UI concept, portrait, 
top: cute game logo and a small settings icon, 
center: a big adorable featured collectible toy mascot with a large rounded "start" button, 
lower area: an overall collection progress bar and a daily reward entry, 
bottom: a rounded tab navigation bar, 
warm cream background, candy pastel, clean cozy layout, premium casual game feel
```

---

### 页面 2 · 收集墙（= 主题列表，二合一）

**作用**：本作的核心驱动页。玩家在这里看见"我拥有了什么、还缺什么"，并选一个想要的进入关卡。**缺口要明显、想补全。**

**布局区域**：
- 顶部：主题切换（横向可滑的主题标签 / 小卡片，如"四季的风""森林精灵"…，可切换不同收集墙）
- 中部（主体）：当前主题的**格子墙**——网格排布的收藏格：
  - 已收集格：点亮、显示可爱潮玩
  - 未收集格：灰暗、带问号"?"（缺口感）
  - 隐藏款格：金色、带星标★（稀有、显眼、勾人）
- 底部：该主题收集百分比、晒图/分享按钮

**prompt**：
```
[全局风格词] mobile game collection wall screen UI concept, portrait, 
top: a horizontal row of switchable theme tabs/cards, 
main area: a grid of collection slots — some filled with cute collectible toys (unlocked), 
some grayed with a question mark (not yet collected), 
and one special golden slot with a star (rare hidden edition), 
bottom: collection percentage and a share button, 
the empty slots should feel inviting to fill, warm cream background, candy pastel, cozy premium layout
```

---

### 页面 3 · 核心游戏页（最重要，80% 体验在这）

**作用**：玩家摇盒、听/看线索、组内对比、押注的地方。**所有动作在这一页完成，不跳页。**

**布局区域（从上到下）**：
- 顶部：当前目标提示（"找出：大风"）+ 进度（"已押 2/4"）；若触发隐藏款，顶部有醒目的"⚡隐藏款"提示条
- 中上：**一组盲盒**（如 4-5 个并排/网格的可爱盒子），可点选；选中的盒子高亮
- 中部：**探测/摇一摇区**——一个明显的"摇一摇"按钮 + 线索反馈视觉（音波/晃动粒子等），显示该盒剩余探测次数
- 中下：**候选项**——玩家给当前盒子押答案的选项（一排可爱的候选小图标）
- 底部：大的"确认整组"按钮

**prompt**：
```
[全局风格词] mobile game core gameplay screen UI concept, portrait, 
top: an objective hint "find: XX" with a small progress counter, and an eye-catching special "hidden edition" banner, 
upper-center: a row/grid of cute mystery blind boxes, one highlighted as selected, 
center: a prominent "shake" button with a clue feedback visual (sound wave / motion particles) and remaining shake count, 
lower-center: a row of candidate answer icons for the player to bet on, 
bottom: a big rounded "confirm" button, 
clean uncluttered layout so the boxes are the star, warm cream background, candy pastel, playful premium feel
```

---

### 页面 4 · 结果弹窗（揭晓的高潮）

**作用**：赌的揭晓瞬间 + 收获的满足。这是情绪爆发点，要有"赢了！"的爽快或隐藏款的惊喜。

**布局区域**：
- 这是一个**弹窗/覆盖层**（不是整页），中央浮起一个卡片
- 卡片顶部：结果状态（"找到了！"/"押中 3/4"）
- 卡片中部：揭晓——每个盒子翻开、显示真身 + 对错标记；拿到的潮玩有"飞入收集墙"的感觉
- 若隐藏款解锁：金色的隐藏款特别揭晓（闪光、星星、最显眼）
- 卡片底部：两个按钮（"回收集墙看看" / "继续")

**prompt**：
```
[全局风格词] mobile game result popup UI concept, portrait, a celebratory reward card floating over a dimmed background, 
top of card: a happy result status like "you found it!" with a small "3/4 correct" tag, 
middle: revealed boxes flipping open to show their cute contents with check/cross marks, the won toy flying into a collection, 
if a hidden edition is unlocked: a special golden reveal with sparkles and a star, most eye-catching element, 
bottom: two rounded buttons, 
joyful satisfying moment, candy pastel, soft glow celebration, premium cute
```

---

## 三、出图建议（怎么用最高效）

1. **先统一风格**：先生成"主页"，把整体调性、配色、圆角语言定下来；满意后让其余 3 页 "same UI style as previous"，保证四页是一套。
2. **一页可出 2-3 版**：每个页面让 AI 出几版不同布局/氛围，你挑最顺眼的方向。
3. **重点看 4 件事**：
   - 整体够不够"可爱、想玩、潮玩感"？
   - 收集墙的"缺口感"勾不勾人？
   - 核心游戏页是否清爽、盒子是不是主角？
   - 结果弹窗有没有"赢了"的爽快？
4. **角色/内容是占位**：画面里具体画什么潮玩不重要（风、小动物、萌物都行），**这一轮是看页面长什么样、整体什么调性**，不是定角色。

---

## 四、概念稿确认后的下一步（策划侧）

你挑出满意的页面概念稿方向后：
- 我据此调整、重做可玩 demo，让交互和这套视觉对齐；
- 再补一份精确的"界面切图 / 尺寸规格表"给开发与美术（那时才需要谈尺寸）。

> 本文聚焦"产品有哪些页面、每页放什么、什么调性"，具体藏品角色长相、精确尺寸、命名规范均留到方向确定后再细化，避免现在限制 Lovart 发挥。
