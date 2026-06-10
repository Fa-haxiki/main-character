"use client";

import { useMemo, useState } from "react";

import type { Character, OperaMotif, StoryEvent, StoryPhase } from "@/data";
import { SourceBadges } from "@/components/ui/SourceBadges";

const phases: Array<StoryPhase | "全部"> = [
  "全部",
  "山野起点",
  "县团淬炼",
  "省团成名",
  "传承回望",
];

// 精细手书唱词彩蛋库
const arias: Record<string, { playName: string; arias: string[] }> = {
  "da-jiao-zan": {
    playName: "《打焦赞》杨排风唱段",
    arias: [
      "出门来只觉得脊背朝后，",
      "为的是把肚子放在前头！",
      "虽然是一个烧火的丫头，",
      "三军帐前大显身手，",
      "手中使起烧火棍，扫尽奸谗！",
    ],
  },
  "hu-xian-jie": {
    playName: "《狐仙劫》原创核心唱段",
    arias: [
      "天哪！天哪！",
      "雷霆劈开山海重重，",
      "万丈红尘不过是一朝春梦！",
      "狐九妹披荆斩棘踏歌去，",
      "台前笑，台后空，百年一声长啸！",
    ],
  },
  "guiyuan-shasheng": {
    playName: "《鬼怨·杀生》苟师连珠火绝唱",
    arias: [
      "恨只恨贾似道作恶多端，",
      "逼得我慧娘魂断西湖岸！",
      "今日里重现人间吐烈火，",
      "一口喷出这三千丈的九天怒焰！",
    ],
  },
};

type StoryTimelineProps = {
  events: StoryEvent[];
  characters: Character[];
  operas: OperaMotif[];
};

export function StoryTimeline({ events, characters, operas }: StoryTimelineProps) {
  const [activePhase, setActivePhase] = useState<StoryPhase | "全部">("全部");
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id ?? "");

  const visibleEvents = useMemo(() => {
    if (activePhase === "全部") {
      return events;
    }
    return events.filter((event) => event.phase === activePhase);
  }, [activePhase, events]);

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? visibleEvents[0];
  const characterMap = new Map(characters.map((character) => [character.id, character]));
  const operaMap = new Map(operas.map((opera) => [opera.id, opera]));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      
      {/* 左侧垂直丝绸画卷 */}
      <section className="stage-card relative rounded-[2rem] p-5 md:p-6">
        {/* 背景大红丝绸画轴侧梁 */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#a92b1f]/40 via-[#d6aa55]/20 to-[#a92b1f]/40" />

        <div className="mb-8 flex flex-wrap gap-2">
          {phases.map((phase) => (
            <button
              key={phase}
              type="button"
              onClick={() => setActivePhase(phase)}
              className={`rounded-full border px-4 py-1.5 text-xs font-display tracking-[0.1em] transition-all duration-300 ${
                activePhase === phase
                  ? "border-[#d6aa55] bg-[#d6aa55] text-[#261310] shadow-[0_2px_8px_rgba(214,170,85,0.3)]"
                  : "border-[#d6aa55]/20 bg-black/15 text-[#f8ecd0]/65 hover:border-[#d6aa55]/45 hover:text-[#f8ecd0]"
              }`}
            >
              {phase}
            </button>
          ))}
        </div>

        <div className="relative space-y-6 pl-8">
          {visibleEvents.map((event) => {
            const isSelected = selectedEvent?.id === event.id;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEventId(event.id)}
                className={`relative block w-full rounded-[1.5rem] border p-5 text-left transition-all duration-500 ${
                  isSelected
                    ? "border-[#d6aa55] bg-[#a92b1f]/15 shadow-[inset_0_0_12px_rgba(169,43,31,0.15)]"
                    : "border-[#d6aa55]/12 bg-black/10 hover:border-[#d6aa55]/38"
                }`}
              >
                {/* 戏剧梅花印泥时间节点 */}
                <span className={`absolute -left-[27px] top-6 size-3 rounded-full border transition-all duration-500 ${
                  isSelected
                    ? "bg-[#df4d31] scale-125 border-[#f8ecd0] shadow-[0_0_8px_#df4d31]"
                    : "bg-[#1a0806] border-[#d6aa55]/50 scale-100"
                }`} />

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-md border border-[#d6aa55]/15 bg-[#d6aa55]/5 px-2.5 py-0.5 text-[10px] text-[#d6aa55] font-display">
                    {event.phase}
                  </span>
                  <span className="text-[11px] font-sans tracking-wide text-[#f8ecd0]/45">{event.period}</span>
                </div>
                
                <h3 className="mt-3 font-display text-2xl text-[#f8ecd0] tracking-wide group-hover:text-[#d6aa55]">
                  {event.title}
                </h3>
                
                <p className="mt-3 max-w-4xl text-xs leading-7 text-[#f8ecd0]/60 tracking-[0.03em] line-clamp-2">
                  {event.summary}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 右侧宣纸信手卷 */}
      {selectedEvent ? (
        <aside className="paper-card relative overflow-hidden rounded-[2rem] p-7">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#87622b]/80">编年史 · 主角沉浮折页</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-[#3a0f0b] tracking-wide">
                {selectedEvent.title}
              </h3>
              
              <div className="my-5 h-px bg-gradient-to-r from-[#a92b1f]/30 via-[#a92b1f]/10 to-transparent" />

              <p className="leading-8 text-[#3a0f0b]/78 text-sm tracking-[0.04em]">{selectedEvent.summary}</p>

              <div className="mt-6 rounded-2xl bg-[#3a0f0b]/3 p-4 border border-[#3a0f0b]/8">
                <p className="text-xs font-semibold text-[#3a0f0b]">登场角色</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedEvent.characterIds.map((id) => (
                    <span key={id} className="rounded-md bg-[#a92b1f]/5 border border-[#a92b1f]/10 px-2.5 py-0.5 text-xs text-[#a92b1f] font-medium font-display">
                      {characterMap.get(id)?.name ?? id}
                    </span>
                  ))}
                </div>
              </div>

              {selectedEvent.operaIds?.length ? (
                <div className="mt-4 space-y-4">
                  {selectedEvent.operaIds.map((id) => {
                    const opera = operaMap.get(id);
                    const ariaData = arias[id];

                    return opera ? (
                      <div key={id} className="space-y-3">
                        <div className="rounded-2xl bg-[#3a0f0b]/3 p-4 border border-[#3a0f0b]/8">
                          <p className="text-xs font-semibold text-[#3a0f0b]">关联经典折子</p>
                          <p className="mt-2 font-display text-lg text-[#a92b1f] tracking-wide">{opera.title}</p>
                          <p className="mt-2 text-xs leading-7 text-[#3a0f0b]/70">
                            {opera.narrativeMeaning}
                          </p>
                        </div>

                        {/* 🌟 唱段留声信笺彩蛋 */}
                        {ariaData && (
                          <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#a92b1f]/35 bg-[#a92b1f]/3 p-4 text-center">
                            <span className="absolute left-1/2 top-2 size-1.5 rounded-full bg-[#a92b1f]/60 -translate-x-1/2" />
                            <p className="text-[10px] font-semibold text-[#a92b1f] tracking-[0.2em]">{ariaData.playName}</p>
                            <div className="mt-3 space-y-2.5 font-display text-[15px] text-[#3a0f0b] italic leading-none tracking-[0.1em]">
                              {ariaData.arias.map((line, i) => (
                                <p key={i} className="hover:scale-102 transition-transform duration-300">{line}</p>
                              ))}
                            </div>
                            <p className="mt-4 text-[9px] text-[#87622b]/50 tracking-[0.2em]">—— 手抄戏词 · 戏骨留声 ——</p>
                          </div>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              ) : null}
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-[#a92b1f]/15">
              <SourceBadges sourceIds={selectedEvent.sourceIds} />
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
