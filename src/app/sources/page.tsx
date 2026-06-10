import { ExternalLink } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sourceTierLabels, sources } from "@/data";
import type { SourceTier } from "@/data";

const tierDescriptions: Record<SourceTier, string> = {
  A: "官方机构、权威媒体或非遗资料，优先用于基础事实。",
  B: "百科、地方媒体或主流媒体补充资料，需要与 A 级来源交叉核验。",
  C: "剧情解读与观众向报道，只用于辅助理解，页面中不把它写成官方事实。",
};

export default function SourcesPage() {
  return (
    <SiteShell>
      <section className="px-6 py-16 sm:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            title="每一条判断都要有出处"
            description="本站把资料分为权威来源、交叉核验、剧情解读三个等级。人物和关系页面展示来源徽章，便于回到这里查看原始出处。"
          />

          {/* 顶层评级卡片 */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(Object.keys(sourceTierLabels) as SourceTier[]).map((tier) => (
              <div key={tier} className="paper-card relative overflow-hidden rounded-[2rem] p-6 shadow-xs border border-[#a92b1f]/10">
                {/* 淡淡的书法红色竖红格 */}
                <div className="absolute inset-x-6 top-0 bottom-0 border-x border-[#a92b1f]/3 pointer-events-none" />

                <p className="text-[10px] tracking-[0.25em] text-[#87622b]/80">史料鉴 · 等级 {tier}</p>
                <h2 className="mt-2 font-display text-2xl text-[#3a0f0b]">
                  {sourceTierLabels[tier]}
                </h2>
                <p className="mt-3 text-xs leading-7 text-[#3a0f0b]/70 tracking-wide">{tierDescriptions[tier]}</p>
              </div>
            ))}
          </div>

          {/* 主体文献折 */}
          <div className="mt-10 space-y-5">
            {sources.map((source) => (
              <article key={source.id} className="stage-card relative overflow-hidden rounded-[2rem] p-6 md:p-8 border border-[#d6aa55]/12 bg-[#1a0806]">
                
                {/* 回纹饰边 */}
                <span className="absolute left-2 top-2 size-2 border-l border-t border-[#d6aa55]/20" />
                <span className="absolute right-2 bottom-2 size-2 border-r border-b border-[#d6aa55]/20" />

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-4xl">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-md border border-[#d6aa55]/20 bg-[#d6aa55]/5 px-2.5 py-0.5 text-[10px] text-[#d6aa55] font-display">
                        {sourceTierLabels[source.tier]}
                      </span>
                      <span className="text-xs text-[#f8ecd0]/45 font-sans">{source.publisher}</span>
                    </div>
                    
                    <h3 className="font-display text-2xl text-[#f8ecd0] tracking-wide">{source.title}</h3>
                    
                    <p className="mt-3 text-xs leading-7 text-[#f8ecd0]/60 tracking-[0.03em]">{source.note}</p>
                  </div>
                  
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#d6aa55]/28 bg-black/15 px-4 py-2 text-xs text-[#f8ecd0]/80 transition hover:bg-[#d6aa55]/10 hover:text-[#f8ecd0]"
                  >
                    研读考异
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* 卷尾印章彩蛋版 */}
          <div className="paper-card relative overflow-hidden mt-10 rounded-[2.5rem] p-8 md:p-10 shadow-md">
            {/* 书籍装订折痕线 */}
            <div className="absolute top-4 left-6 right-6 h-px border-t border-dashed border-[#a92b1f]/10" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="max-w-3xl">
                <h2 className="font-display text-3xl text-[#3a0f0b] tracking-wide">考异与素材声明</h2>
                <p className="mt-4 leading-8 text-[#3a0f0b]/75 text-xs tracking-[0.04em]">
                  本互动分析站之所有考证，皆本于实事求是。剧中舞台形象之呈现，均由文字排版、CSS
                  手绘国风动效实现，以极简主义呈现秦腔之魂。本卷收讫，不设商业盈利用途，专供戏曲爱好者、电视剧拥趸考镜源流、研读戏理。
                </p>
              </div>

              {/* 🌟 朱砂泥印章彩蛋 */}
              <div className="relative shrink-0 flex items-center justify-center size-28 rounded-full border-4 border-dashed border-[#a92b1f]/15 p-1 select-none group/seal">
                <div className="flex size-20 flex-col items-center justify-center border-[3px] border-[#a92b1f] bg-[#a92b1f]/3 text-center rotate-12 transition-transform duration-500 group-hover/seal:rotate-0">
                  <p className="font-display text-[9px] font-bold text-[#a92b1f] leading-none tracking-[0.1em] mb-1">
                    陝西省
                  </p>
                  <p className="font-display text-sm font-extrabold text-[#a92b1f] leading-tight tracking-[0.05em]">
                    秦腔劇團
                  </p>
                  <p className="font-display text-[8px] font-bold text-[#a92b1f] leading-none mt-1">
                    修撰專用章
                  </p>
                </div>
                {/* 鼠标悬浮气印泥 */}
                <div className="absolute -inset-1 rounded-full border border-[#a92b1f]/30 opacity-0 scale-95 group-hover/seal:opacity-100 group-hover/seal:scale-105 transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
