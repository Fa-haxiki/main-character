"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "总览" },
  { href: "/characters", label: "人物" },
  { href: "/relationships", label: "关系图" },
  { href: "/storylines", label: "故事线" },
  { href: "/qinqiang", label: "秦腔" },
  { href: "/sources", label: "来源" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 当路径改变时，自动关闭移动端菜单
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 防止打开菜单时底层页面滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-[#d6aa55]/20 bg-[#1a0806]/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            {/* 非遗中式铜鼓艺术 Logo - 暂时隐藏但完整保留其精细组件代码 */}
            {/*
            <div className="relative flex size-11 items-center justify-center">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-700 group-hover:rotate-45"
              >
                <defs>
                  <radialGradient id="drum-face" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#4e2118" />
                    <stop offset="65%" stop-color="#2a0d08" />
                    <stop offset="100%" stop-color="#140402" />
                  </radialGradient>
                  <linearGradient id="bronze-metal" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#f5e3bd" />
                    <stop offset="35%" stop-color="#d6aa55" />
                    <stop offset="70%" stop-color="#87622b" />
                    <stop offset="100%" stop-color="#49130c" />
                  </linearGradient>
                  <linearGradient id="bronze-accent" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#fff5db" />
                    <stop offset="45%" stop-color="#f0c36b" />
                    <stop offset="90%" stop-color="#b83324" />
                  </linearGradient>
                  <filter id="drum-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity="0.5" />
                  </filter>
                </defs>

                <path
                  d="M 12,38 C 2,38 2,62 12,62"
                  stroke="url(#bronze-metal)"
                  stroke-width="5"
                  fill="none"
                  stroke-linecap="round"
                />
                <path
                  d="M 88,38 C 98,38 98,62 88,62"
                  stroke="url(#bronze-metal)"
                  stroke-width="5"
                  fill="none"
                  stroke-linecap="round"
                />

                <g filter="url(#drum-shadow)">
                  <circle cx="50" cy="50" r="41" fill="url(#drum-face)" stroke="url(#bronze-metal)" stroke-width="2.5" />
                  <circle cx="50" cy="50" r="35" stroke="url(#bronze-accent)" stroke-width="1.2" stroke-opacity="0.4" fill="none" />
                  
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const cx = 50 + 35 * Math.cos(rad);
                    const cy = 50 + 35 * Math.sin(rad);
                    return <circle key={i} cx={cx} cy={cy} r="1.8" fill="url(#bronze-accent)" />;
                  })}

                  <circle cx="50" cy="50" r="28" stroke="url(#bronze-metal)" stroke-width="1" stroke-dasharray="2 2" stroke-opacity="0.6" fill="none" />
                  <circle cx="50" cy="50" r="23" stroke="url(#bronze-accent)" stroke-width="0.8" stroke-opacity="0.3" fill="none" />
                  <circle cx="50" cy="50" r="18" stroke="url(#bronze-metal)" stroke-width="1.2" stroke-opacity="0.5" fill="none" />

                  <path
                    d="M 50,30 L 53,43 L 64,36 L 55,47 L 70,50 L 55,53 L 64,64 L 50,57 L 36,64 L 45,53 L 30,50 L 45,47 L 36,36 L 47,43 Z"
                    fill="url(#bronze-accent)"
                  />
                  <circle cx="50" cy="50" r="4.5" fill="url(#drum-face)" stroke="url(#bronze-metal)" stroke-width="1" />
                </g>
              </svg>
            </div>
            */}
            
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.12em] text-[#f8ecd0] transition-colors duration-300 group-hover:text-[#d6aa55]">
                《主角》
              </span>
              <span className="text-[9px] font-medium tracking-[0.24em] text-[#d6aa55]/70">
                QINQIANG ATLAS
              </span>
            </div>
          </Link>

          {/* 🌟 移动端：菜单图标按钮（棂窗古风修边） */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex size-9 items-center justify-center rounded border border-[#d6aa55]/25 bg-[#a92b1f]/10 text-[#f8ecd0] transition hover:border-[#d6aa55]/50 md:hidden"
            aria-label="打开菜单"
          >
            <Menu className="size-5" />
          </button>

          {/* 戏台木雕棂窗式国风导航栏 - 大屏 (md以上) */}
          <div className="relative hidden items-center gap-1 border-y border-[#d6aa55]/20 bg-[#1a0806]/40 px-4 py-1.5 md:flex">
            {/* 左右抱框金耳 */}
            <span className="absolute left-0 top-0 bottom-0 w-1 border-l-2 border-y-2 border-[#d6aa55]/30 rounded-l" />
            <span className="absolute right-0 top-0 bottom-0 w-1 border-r-2 border-y-2 border-[#d6aa55]/30 rounded-r" />

            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <div key={item.href} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-1 h-3 w-px bg-gradient-to-b from-transparent via-[#d6aa55]/25 to-transparent" />
                  )}
                  <Link
                    href={item.href}
                    className="group/nav relative px-3.5 py-1.5 text-sm font-display tracking-[0.12em] transition-all duration-300"
                  >
                    {/* 左上折角 「 */}
                    <span className={`absolute left-0.5 top-0.5 size-1.5 border-l border-t border-[#d6aa55] transition-all duration-300 ${
                      isActive 
                        ? "opacity-100 translate-x-0 translate-y-0" 
                        : "opacity-0 -translate-x-1 -translate-y-1 group-hover/nav:opacity-60 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0"
                    }`} />
                    {/* 右下折角 」 */}
                    <span className={`absolute right-0.5 bottom-0.5 size-1.5 border-r border-b border-[#d6aa55] transition-all duration-300 ${
                      isActive 
                        ? "opacity-100 translate-x-0 translate-y-0" 
                        : "opacity-0 translate-x-1 translate-y-1 group-hover/nav:opacity-60 group-hover/nav:translate-x-0 group-hover/nav:translate-y-0"
                    }`} />

                    <span className={`relative z-10 block transition-all duration-300 ${
                      isActive 
                        ? "text-[#d6aa55] font-semibold scale-105 [text-shadow:0_0_8px_rgba(214,170,85,0.25)]" 
                        : "text-[#f8ecd0]/75 hover:text-[#f8ecd0] hover:scale-105"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </header>

      {/* 🌟 移动端：折扇宣纸式右拉侧边栏菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* 半透明背景虚化遮罩 */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
            aria-label="关闭菜单"
          />

          {/* 宣纸竹简材质侧拉柜 */}
          <aside className="relative flex h-full w-[280px] flex-col justify-between border-l border-[#d6aa55]/25 bg-[#1f0a07] p-6 shadow-2xl transition-transform duration-300 animate-slide-in">
            {/* 顶底雕花边边 */}
            <span className="absolute left-4 top-4 size-4 border-l border-t border-[#d6aa55]/30" />
            <span className="absolute right-4 bottom-4 size-4 border-r border-b border-[#d6aa55]/30" />

            <div>
              {/* 头部：秦腔名号与关闭按钮 */}
              <div className="flex items-center justify-between border-b border-[#d6aa55]/15 pb-4">
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold tracking-[0.1em] text-[#f8ecd0]">《主角》菜单</span>
                  <span className="text-[8px] font-medium tracking-[0.2em] text-[#d6aa55]/60 mt-0.5">QINQIANG NAVIGATION</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex size-8 items-center justify-center rounded border border-[#d6aa55]/20 bg-[#a92b1f]/10 text-[#f8ecd0] hover:border-[#d6aa55]/40"
                  aria-label="关闭菜单"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* 列表：竖向排版大字体导航 */}
              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative overflow-hidden rounded-xl border px-5 py-3.5 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#d6aa55] bg-[#a92b1f]/20 text-[#d6aa55] font-semibold"
                          : "border-[#d6aa55]/8 bg-black/15 text-[#f8ecd0]/75 hover:border-[#d6aa55]/25 hover:text-[#f8ecd0]"
                      }`}
                    >
                      {/* 中式小印角装饰 */}
                      <span className={`absolute left-1 top-1 size-1.5 border-l border-t border-[#d6aa55]/40 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                      <span className={`absolute right-1 bottom-1 size-1.5 border-r border-b border-[#d6aa55]/40 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
                      
                      <span className="font-display text-lg tracking-[0.18em]">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 底部文创题词 */}
            <div className="text-center pt-4 border-t border-dashed border-[#d6aa55]/10">
              <p className="font-display text-xs text-[#d6aa55]/50 italic tracking-[0.1em]">我站在 舞台中央</p>
              <p className="text-[8px] font-sans text-[#f8ecd0]/20 mt-1">—— 秦腔百科 · 群像分析 ——</p>
            </div>
          </aside>
        </div>
      )}

      <main>{children}</main>

      <footer className="border-t border-[#d6aa55]/18 px-4 py-10 text-center text-sm text-[#f8ecd0]/56">
        <p>本站为《主角》电视剧资料整理与互动分析项目，首版仅使用公开文字资料与原创视觉元素。</p>
      </footer>

      {/* CSS 过渡动效注入 */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out forwards;
        }
        .animate-slide-in {
          animation: slide-in 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
