# ShakeSecret BGM 素材库

> 来源：Kevin MacLeod (incompetech.com)  
> 授权：CC BY 3.0（署名即可商用）  
> 署名格式：`[曲名] Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 3.0 License`

## 文件清单

| 文件名 | 原曲名 | 时长 | BPM | 风格标签 | 建议场景 |
|--------|--------|------|-----|---------|---------|
| `collection_Fluffing_a_Duck.mp3` | Fluffing a Duck | 1:07 | 122 | Bouncy, Bright, Humorous | 收集墙 — 欢快有趣，浏览已收集 |
| `shake_explore_Itty_Bitty_8_Bit.mp3` | Itty Bitty 8 Bit | 2:51 | 108 | Bouncy, Bright | 摇盒探测 — 电子音色轻快，音量调低不盖音效 |
| `confirm_bet_Sneaky_Snitch.mp3` | Sneaky Snitch | 2:17 | 87 | Bouncy, Dark, Humorous, Mysterious | 确认下注 — 悬疑感双簧管+弦乐，小赌心跳 |
| `reveal_Monkeys_Spinning_Monkeys.mp3` | Monkeys Spinning Monkeys | 2:05 | - | Playful, Fun | 揭晓+收集 — 最欢乐，适合开盒揭晓瞬间 |

## 使用注意

1. **摇盒探测阶段**：BGM 音量必须低于音效（建议 BGM -12dB vs 音效 -3dB），确保玩家能清晰听到摇盒线索
2. **循环播放**：所有曲目适合无缝循环，用 Web Audio API 的 `loop=true`
3. **场景切换**：不同阶段切换 BGM 时用 0.5s crossfade，避免硬切
4. **署名义务**：CC BY 3.0 要求在游戏 credits 中署名，格式见文件头

## 后续升级路径

- 当前为免费原型验证用素材，进入正式开发建议替换为定制 BGM
- 推荐方向：Kawaii Lo-fi / Music Box + Soft Synth / Kalimba 为主乐器
- 参考情绪曲线：收集墙(温暖好奇) → 摇盒(极简留白) → 下注(心跳悬念) → 揭晓(爆点释放) → 收集(满足和弦)
