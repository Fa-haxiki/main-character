import type { StoryEvent } from "./types";

export const storyEvents: StoryEvent[] = [
  {
    id: "mountain-origin",
    phase: "山野起点",
    title: "秦岭深处的放羊娃",
    period: "童年",
    summary:
      "忆秦娥原是秦岭深处的山乡女孩，命运起点极低，也因此让后来的舞台跃迁带着强烈的生命反差。",
    characterIds: ["yi-qine"],
    sourceIds: ["xinhua-trilogy", "baike-main-character", "netease-names"],
  },
  {
    id: "uncle-entry",
    phase: "山野起点",
    title: "胡三元带她进入剧团",
    period: "十一岁前后",
    summary:
      "县剧团招学员，胡三元替外甥女报名并带她学唱秦腔，易青娥由此踏入梨园。",
    characterIds: ["yi-qine", "hu-sanyuan"],
    sourceIds: ["baike-main-character", "nrta-screening"],
  },
  {
    id: "kitchen-training",
    phase: "县团淬炼",
    title: "从学员到烧火丫头",
    period: "县剧团初期",
    summary:
      "她因剧团风波与现实排挤被推到后厨，却在烟火、孤独和偷偷练功中积蓄了登台的根基。",
    characterIds: ["yi-qine", "gou-cunzhong", "hua-caixiang"],
    sourceIds: ["baike-main-character", "netease-names", "xinhua-qinqiang"],
  },
  {
    id: "first-stage-dajiaozan",
    phase: "县团淬炼",
    title: "《打焦赞》破蒙惊山乡",
    period: "县团会演",
    summary:
      "《打焦赞》让易青娥的杨排风与自身处境重合：同是烧火丫头，却在关键一刻以功夫与胆气完成破茧。",
    characterIds: ["yi-qine", "hua-caixiang", "hu-sanyuan"],
    operaIds: ["da-jiao-zan"],
    sourceIds: ["baike-main-character", "xinhua-qinqiang", "xinhua-trilogy"],
  },
  {
    id: "rename-yiqine",
    phase: "省团成名",
    title: "从易青娥到忆秦娥",
    period: "调入省团前后",
    summary:
      "秦八娃建议她改名忆秦娥。这个名字既与既有姓名区分，也让离别、孤独和艺术命运成为人物底色。",
    characterIds: ["yi-qine", "qin-bawa"],
    sourceIds: ["baike-main-character", "netease-names"],
  },
  {
    id: "provincial-success",
    phase: "省团成名",
    title: "省团舞台上的秦腔名伶",
    period: "成名期",
    summary:
      "忆秦娥在更大舞台上屡获成功，成为名震西北的秦腔名伶，但主角之位也让她卷入更复杂的是非、情感和选择。",
    characterIds: ["yi-qine", "liu-hongbing", "feng-xiaoxiao", "chu-jiahe"],
    sourceIds: ["nrta-screening", "xinhua-premiere", "xinhua-trilogy"],
  },
  {
    id: "fox-spirit-peak",
    phase: "省团成名",
    title: "《狐仙劫》与艺术巅峰",
    period: "艺术高峰",
    summary:
      "《狐仙劫》作为剧中原创剧目，既对应忆秦娥的舞台高峰，也预示其人生风波与精神代价。",
    characterIds: ["yi-qine", "qin-bawa"],
    operaIds: ["hu-xian-jie"],
    sourceIds: ["xinhua-trilogy", "xinhua-qinqiang"],
  },
  {
    id: "inheritance-songyu",
    phase: "传承回望",
    title: "主角之位交给后来者",
    period: "晚年",
    summary:
      "面对宋雨在舞台上脱颖而出，忆秦娥从短暂困惑走向顿悟：秦腔传承比守住自己的光环更重要。",
    characterIds: ["yi-qine", "song-yu", "qin-bawa"],
    sourceIds: ["baike-main-character", "tencent-finale"],
  },
];
