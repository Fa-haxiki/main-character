import Link from "next/link";
import { BookOpen, GitBranch, Music2, Users } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroStills } from "@/components/interactive/HeroStills";
import { operaMotifs } from "@/data";

const portals = [
  {
    href: "/characters",
    title: "人物群像",
    desc: "从忆秦娥到胡三元、花彩香、宋雨，看每个配角如何托起主角。",
    icon: Users,
  },
  {
    href: "/relationships",
    title: "关系图谱",
    desc: "用亲缘、师承、情感、竞争、托举和传承重新理解剧团生态。",
    icon: GitBranch,
  },
  {
    href: "/storylines",
    title: "故事线",
    desc: "按三重姓名与四段阶段追踪忆秦娥从山野到舞台中央的轨迹。",
    icon: BookOpen,
  },
  {
    href: "/qinqiang",
    title: "秦腔意象",
    desc: "把《打焦赞》《狐仙劫》等剧目放回人物命运中解读。",
    icon: Music2,
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="relative px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
        <div className="mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <h1 className="hero-title text-[5.7rem] leading-[0.95] text-[#f8ecd0] sm:text-[7rem] md:text-[8rem] lg:text-[7.8rem] xl:text-[8.8rem]">
              娥站在
              <br />
              舞台中央
            </h1>
          </div>

          <div className="relative w-full">
            <HeroStills />
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="EXPLORE"
            title="读懂《主角》"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {portals.map((portal) => {
              const Icon = portal.icon;

              return (
                <Link
                  key={portal.href}
                  href={portal.href}
                  className="group relative block overflow-hidden rounded-[1.5rem] border border-[#d6aa55]/20 bg-[#1d0907] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d6aa55]/60 hover:shadow-[0_12px_36px_rgba(26,8,6,0.8)]"
                >
                  {/* 古典中式回纹折角与鼓钉 - 四角精绘 */}
                  {/* 左上角 */}
                  <span className="absolute left-2.5 top-2.5 size-4 border-l border-t border-[#d6aa55]/40 transition-all duration-300 group-hover:border-[#d6aa55]" />
                  <span className="absolute left-3.5 top-3.5 size-1 rounded-full bg-[#d6aa55]/40 transition-all duration-300 group-hover:bg-[#d6aa55]" />
                  {/* 右上角 */}
                  <span className="absolute right-2.5 top-2.5 size-4 border-r border-t border-[#d6aa55]/40 transition-all duration-300 group-hover:border-[#d6aa55]" />
                  <span className="absolute right-3.5 top-3.5 size-1 rounded-full bg-[#d6aa55]/40 transition-all duration-300 group-hover:bg-[#d6aa55]" />
                  {/* 左下角 */}
                  <span className="absolute left-2.5 bottom-2.5 size-4 border-l border-b border-[#d6aa55]/40 transition-all duration-300 group-hover:border-[#d6aa55]" />
                  <span className="absolute left-3.5 bottom-3.5 size-1 rounded-full bg-[#d6aa55]/40 transition-all duration-300 group-hover:bg-[#d6aa55]" />
                  {/* 右下角 */}
                  <span className="absolute right-2.5 bottom-2.5 size-4 border-r border-b border-[#d6aa55]/40 transition-all duration-300 group-hover:border-[#d6aa55]" />
                  <span className="absolute right-3.5 bottom-3.5 size-1 rounded-full bg-[#d6aa55]/40 transition-all duration-300 group-hover:bg-[#d6aa55]" />

                  {/* 内部双线金线画框 */}
                  <div className="absolute inset-4 rounded-[1rem] border border-[#d6aa55]/10 pointer-events-none transition-all duration-500 group-hover:border-[#d6aa55]/20" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      {/* 朱砂金石印泥底座 */}
                      <div className="relative flex size-14 items-center justify-center rounded-full border border-[#d6aa55]/30 bg-[#a92b1f]/10 shadow-[inset_0_0_10px_rgba(169,43,31,0.2)] transition-all duration-500 group-hover:rotate-12 group-hover:border-[#d6aa55]/60 group-hover:bg-[#a92b1f]/20">
                        <Icon className="size-6 text-[#d6aa55] transition-transform duration-500 group-hover:scale-110" />
                        {/* 印章微晕圈 */}
                        <div className="absolute inset-1.5 rounded-full border border-dashed border-[#d6aa55]/15 transition-opacity duration-500 group-hover:opacity-40" />
                      </div>

                      {/* 标题 */}
                      <h3 className="mt-7 font-display text-3xl tracking-[0.1em] text-[#f8ecd0] transition-colors duration-300 group-hover:text-[#d6aa55]">
                        {portal.title}
                      </h3>
                      
                      {/* 线装书风格金丝分隔线 */}
                      <div className="my-4 h-px w-full bg-gradient-to-r from-[#d6aa55]/40 via-[#d6aa55]/10 to-transparent" />

                      {/* 描述文字 */}
                      <p className="text-sm leading-8 text-[#f8ecd0]/64 tracking-[0.05em] transition-colors duration-300 group-hover:text-[#f8ecd0]/80">
                        {portal.desc}
                      </p>
                    </div>

                    {/* 右下角“戏启 / Enter”古风引导角标 */}
                    <div className="mt-8 flex items-center justify-end gap-1.5 text-[10px] tracking-[0.24em] text-[#d6aa55]/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d6aa55]">
                      <span>戲 啟</span>
                      <span className="font-sans text-[8px] opacity-60">▶</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-12 lg:px-16">
        <div className="paper-card relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
          
          {/* 左侧“戏比天大”朱砂印章背景 */}
          <div className="absolute left-6 top-8 hidden pointer-events-none select-none opacity-[0.08] lg:block">
            <svg width="60" height="220" viewBox="0 0 60 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="56" height="216" rx="8" stroke="#a92b1f" stroke-width="4" stroke-dasharray="6 4" />
              <text x="30" y="50" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">戏</text>
              <text x="30" y="100" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">比</text>
              <text x="30" y="150" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">天</text>
              <text x="30" y="200" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">大</text>
            </svg>
          </div>

          {/* 右侧“大秦正声”朱砂印章背景 */}
          <div className="absolute right-6 top-8 hidden pointer-events-none select-none opacity-[0.08] lg:block">
            <svg width="60" height="220" viewBox="0 0 60 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="56" height="216" rx="8" stroke="#a92b1f" stroke-width="4" stroke-dasharray="6 4" />
              <text x="30" y="50" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">大</text>
              <text x="30" y="100" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">秦</text>
              <text x="30" y="150" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">正</text>
              <text x="30" y="200" text-anchor="middle" fill="#a92b1f" font-family="var(--font-display-cn), serif" font-size="28" font-weight="900" letter-spacing="4">声</text>
            </svg>
          </div>

          <div className="relative z-10 lg:px-12">
            <h2 className="hero-title max-w-4xl text-3xl leading-[1.3] text-[#3a0f0b] sm:text-4xl md:text-5xl">
              《打焦赞》是破茧，《狐仙劫》是高峰与劫数，秦腔本身也是主角。
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {operaMotifs.slice(1, 4).map((opera) => (
                <div
                  key={opera.id}
                  className="group/opera relative overflow-hidden rounded-[1.5rem] border border-[#a92b1f]/15 bg-[#fefaf0]/92 p-6 shadow-[inset_0_0_16px_rgba(135,98,43,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-[#a92b1f]/35 hover:shadow-[0_12px_24px_rgba(135,98,43,0.12)]"
                >
                  {/* 书画朱丝栏——红边纵向装饰细条 */}
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a92b1f]/30 via-[#a92b1f]/5 to-[#a92b1f]/30" />
                  
                  {/* 戏折子顶边框线 */}
                  <div className="absolute top-3 left-4 right-4 h-px border-t border-dashed border-[#a92b1f]/10" />

                  <div className="flex items-center gap-2">
                    {/* 微型朱砂圆点 */}
                    <span className="size-1.5 rounded-full bg-[#a92b1f]/60" />
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-[#87622b]/80">{opera.kind}</p>
                  </div>

                  <h3 className="mt-4 font-display text-3xl text-[#3a0f0b] tracking-[0.05em] transition-colors duration-300 group-hover/opera:text-[#a92b1f]">
                    {opera.title}
                  </h3>

                  <p className="mt-5 text-sm leading-8 text-[#3a0f0b]/72 tracking-[0.03em] transition-colors duration-300 group-hover/opera:text-[#3a0f0b]/85">
                    {opera.narrativeMeaning}
                  </p>

                  {/* 右下角“梨园”红泥篆刻朱砂印章 */}
                  <div className="mt-6 flex justify-end">
                    <div className="flex size-7 items-center justify-center rounded border border-[#a92b1f]/40 bg-[#a92b1f]/5 font-display text-[9px] font-bold leading-none text-[#a92b1f] select-none transition-all duration-500 group-hover/opera:bg-[#a92b1f] group-hover/opera:text-[#fefaf0]">
                      梨
                      <br />
                      园
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
