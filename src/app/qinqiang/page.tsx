import { Music2 } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadges } from "@/components/ui/SourceBadges";
import { operaMotifs } from "@/data";

export default function QinqiangPage() {
  const heritage = operaMotifs.find((opera) => opera.id === "qinqiang-heritage");
  const operas = operaMotifs.filter((opera) => opera.id !== "qinqiang-heritage");

  return (
    <SiteShell>
      <section className="px-6 py-16 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="秦腔是另一位主角"
            description="剧中的戏不是装饰：唱腔、身段、板式和具体剧目都参与了人物塑造。《主角》的叙事，正是一个人和一个剧种互为命运的过程。"
          />

          {heritage ? (
            <div className="paper-card relative overflow-hidden mt-10 rounded-[2.5rem] p-8 md:p-10 shadow-md">
              {/* 装订线针脚 */}
              <div className="absolute top-4 left-6 right-6 h-px border-t border-dashed border-[#a92b1f]/10" />

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-4 flex items-center gap-3 text-[#a92b1f]">
                    <Music2 className="size-5" />
                    <span className="text-xs font-semibold tracking-[0.2em]">国家级第一批非遗代表名录</span>
                  </div>
                  <h2 className="font-display text-5xl text-[#3a0f0b] tracking-wide">{heritage.title}</h2>
                  <p className="mt-5 leading-8 text-[#3a0f0b]/80 text-sm tracking-[0.04em]">{heritage.summary}</p>
                  <p className="mt-4 border-l-4 border-[#a92b1f] pl-4 leading-8 text-[#3a0f0b]/72 bg-[#a92b1f]/3 py-2 rounded-r-md text-sm">
                    {heritage.narrativeMeaning}
                  </p>
                </div>
                <div className="min-w-64 rounded-2xl bg-[#3a0f0b]/4 p-5 border border-[#3a0f0b]/10">
                  <p className="text-xs font-bold text-[#3a0f0b] tracking-wider mb-3">非遗见证来源</p>
                  <div className="mt-3">
                    <SourceBadges sourceIds={heritage.sourceIds} compact />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {operas.map((opera) => (
              <article key={opera.id} className="stage-card relative overflow-hidden rounded-[2rem] p-7 border border-[#d6aa55]/20 bg-[#1d0907]">
                
                {/* 戏折子回纹雕花折角 */}
                <span className="absolute left-2.5 top-2.5 size-3 border-l border-t border-[#d6aa55]/30" />
                <span className="absolute right-2.5 bottom-2.5 size-3 border-r border-b border-[#d6aa55]/30" />

                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-md border border-[#d6aa55]/25 bg-[#d6aa55]/5 px-3 py-1 text-xs text-[#d6aa55] font-display tracking-wider">
                    {opera.kind}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[#f8ecd0]/40">剧目意象折</span>
                </div>

                <h3 className="font-display text-4xl text-[#f8ecd0] tracking-wide">{opera.title}</h3>
                
                <p className="mt-4 text-xs leading-7 text-[#f8ecd0]/60 tracking-[0.03em]">{opera.summary}</p>
                
                {/* 木质屏风分割线 */}
                <div className="opera-divider my-6" />
                
                <p className="text-sm leading-8 text-[#f8ecd0]/80 tracking-[0.04em] italic pl-4 border-l border-[#d6aa55]/30">
                  {opera.narrativeMeaning}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dashed border-[#d6aa55]/10">
                  <SourceBadges sourceIds={opera.sourceIds} compact />
                  <div className="flex size-7 items-center justify-center rounded border border-[#d6aa55]/40 bg-[#d6aa55]/5 font-display text-[9px] font-bold leading-none text-[#d6aa55]">
                    古
                    <br />
                    谱
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
