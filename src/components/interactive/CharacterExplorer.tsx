"use client";

import { useMemo, useState, useEffect } from "react";
import { X } from "lucide-react";

import type { Character, CharacterRole } from "@/data";
import { getCharacterEvents, getCharacterRelationships, getRelatedCharacters } from "@/lib/data-utils";
import { SourceBadges } from "@/components/ui/SourceBadges";

const roleFilters: Array<CharacterRole | "全部"> = [
  "全部",
  "主角",
  "亲缘",
  "师承",
  "同行",
  "情感",
  "传承",
];

export function CharacterExplorer({ characters }: { characters: Character[] }) {
  const [activeRole, setActiveRole] = useState<CharacterRole | "全部">("全部");
  const [selectedId, setSelectedId] = useState(characters[0]?.id ?? "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // 吹火彩蛋状态
  const [isBreathingFire, setIsBreathingFire] = useState(false);
  // 击鼓彩蛋状态
  const [isDrumming, setIsDrumming] = useState(false);
  const [drumBeat, setDrumBeat] = useState("");

  const filteredCharacters = useMemo(() => {
    if (activeRole === "全部") {
      return characters;
    }
    return characters.filter((character) => character.role === activeRole);
  }, [activeRole, characters]);

  const selected = characters.find((character) => character.id === selectedId) ?? filteredCharacters[0];
  const related = selected ? getRelatedCharacters(selected.id) : [];
  const events = selected ? getCharacterEvents(selected.id) : [];
  const relationCount = selected ? getCharacterRelationships(selected.id).length : 0;

  // 吹火动画自动复位
  useEffect(() => {
    if (isBreathingFire) {
      const timer = setTimeout(() => setIsBreathingFire(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [isBreathingFire]);

  // 击鼓动画自动复位
  useEffect(() => {
    if (isDrumming) {
      const timer = setTimeout(() => setIsDrumming(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isDrumming]);

  // 当移动端抽屉打开时，在小屏（小于1024px）下锁定主页面背景滚动，大屏下不锁定
  useEffect(() => {
    const handleResize = () => {
      if (isDrawerOpen && window.innerWidth < 1024) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // 模拟西北鼓王打点
  const beats = ["咚！", "哒！", "咚咚锵！", "哒，咚咚锵！", "仓，令嗒，仓！"];
  const handleDrumClick = () => {
    setIsDrumming(true);
    const randomBeat = beats[Math.floor(Math.random() * beats.length)];
    setDrumBeat(randomBeat);
  };

  // 点击角色项，桌面端只做选择，移动端打开抽屉
  const handleSelectCharacter = (id: string) => {
    setSelectedId(id);
    setIsDrawerOpen(true);
  };

  return (
    <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      
      {/* 💥 吹火彩蛋全屏 CSS 粒子特效层 */}
      {isBreathingFire && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all duration-500">
          <div className="relative flex flex-col items-center">
            {/* 火焰粒子 */}
            <div className="relative flex size-40 items-end justify-center">
              <span className="absolute bottom-0 size-24 rounded-full bg-gradient-to-t from-[#df4d31] via-[#d6aa55] to-transparent opacity-80 blur-sm animate-ping" />
              <span className="absolute bottom-2 size-20 rounded-full bg-gradient-to-t from-[#a92b1f] via-[#df4d31] to-transparent opacity-90 animate-bounce" />
              <span className="absolute bottom-6 size-12 rounded-full bg-gradient-to-t from-[#f8ecd0] to-transparent opacity-95 animate-pulse" />
              {/* 火星粒子上升效果 */}
              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="absolute bottom-4 size-2 rounded-full bg-[#f8ecd0]"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    animation: `fire-sparks ${1 + Math.random() * 1}s infinite ease-out`,
                    animationDelay: `${Math.random() * 1}s`,
                  }}
                />
              ))}
            </div>
            <p className="hero-title mt-4 text-4xl text-[#f8ecd0] tracking-[0.15em] [text-shadow:0_0_12px_#df4d31]">
              戏比天大 炉火纯青！
            </p>
            <p className="mt-2 text-sm text-[#d6aa55]/80 font-display">
              —— 忆秦娥绝活「吹火」重现舞台
            </p>
          </div>
        </div>
      )}

      {/* 🎭 击鼓金光余波特效层 */}
      {isDrumming && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="rounded-full border-4 border-[#d6aa55]/60 bg-black/60 px-8 py-5 text-center shadow-[0_0_40px_rgba(214,170,85,0.4)] transition-all">
            <p className="font-sans text-xs tracking-[0.3em] text-[#d6aa55]">西北鼓王 胡三元</p>
            <p className="hero-title mt-2 text-5xl text-[#f8ecd0] tracking-[0.1em]">{drumBeat}</p>
          </div>
        </div>
      )}

      {/* 🌟 移动端抽屉遮罩背景（仅在小屏显露） */}
      {isDrawerOpen && (
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          aria-label="关闭详情"
        />
      )}

      {/* 左侧人物卡片面板 */}
      <section className="stage-card relative overflow-hidden rounded-[2rem] p-6">
        {/* 背景丝绸暗纹饰条 */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#d6aa55]/20 via-transparent to-[#d6aa55]/20 pointer-events-none" />
        
        <div className="mb-6 flex flex-wrap gap-2.5">
          {roleFilters.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setActiveRole(role)}
              className={`rounded-full border px-4 py-1.5 text-xs font-display tracking-[0.1em] transition-all duration-300 ${
                activeRole === role
                  ? "border-[#d6aa55] bg-[#d6aa55] text-[#261310] shadow-[0_2px_8px_rgba(214,170,85,0.3)]"
                  : "border-[#d6aa55]/20 bg-black/15 text-[#f8ecd0]/65 hover:border-[#d6aa55]/45 hover:text-[#f8ecd0]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredCharacters.map((character) => {
            const isSelected = selected?.id === character.id;
            return (
              <button
                key={character.id}
                type="button"
                onClick={() => handleSelectCharacter(character.id)}
                className={`group/card relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 flex items-center gap-4 ${
                  isSelected
                    ? "border-[#d6aa55] bg-[#a92b1f]/20 shadow-[inset_0_0_12px_rgba(169,43,31,0.2)]"
                    : "border-[#d6aa55]/12 bg-black/10 hover:border-[#d6aa55]/38"
                }`}
              >
                {/* 四边精细中式挂饰角标 */}
                <span className={`absolute left-1.5 top-1.5 size-1.5 border-l border-t border-[#d6aa55]/30 transition-opacity duration-300 ${
                  isSelected ? "opacity-100 border-[#d6aa55]" : "opacity-0 group-hover/card:opacity-60"
                }`} />
                <span className={`absolute right-1.5 bottom-1.5 size-1.5 border-r border-b border-[#d6aa55]/30 transition-opacity duration-300 ${
                  isSelected ? "opacity-100 border-[#d6aa55]" : "opacity-0 group-hover/card:opacity-60"
                }`} />

                {/* 🎬 剧中名伶精致微方头像 */}
                <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-[#d6aa55]/20 bg-[#1a0806] p-0.5 shadow-md">
                  <img
                    src={`/avatars/${character.id}.jpg`}
                    alt={character.name}
                    className={`size-full rounded-lg object-cover transition-all duration-500 ${
                      isSelected ? "grayscale-0 scale-105" : "grayscale group-hover/card:grayscale-0 group-hover/card:scale-105"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl text-[#f8ecd0] transition-colors duration-300 group-hover/card:text-[#d6aa55] truncate">
                      {character.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-[#f8ecd0]/8 px-2 py-0.5 text-[9px] text-[#d6aa55] border border-[#d6aa55]/15">
                      {character.role}
                    </span>
                  </div>
                  <p className="text-[11px] leading-5 text-[#f8ecd0]/60 tracking-[0.03em] line-clamp-1">
                    {character.headline}
                  </p>
                  {character.actor ? (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-[#d6aa55]/60">
                      <span className="size-1 rounded-full bg-[#d6aa55]/40" />
                      <span>饰：{character.actor}</span>
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 右侧印章宣纸画页（自适应：移动端为底部弹性滑出抽屉，桌面端为右侧静止列） */}
      {selected ? (
        <aside
          className={`paper-card fixed inset-x-0 bottom-0 z-50 h-[80vh] flex flex-col justify-between overflow-y-auto rounded-t-[2.5rem] rounded-b-none p-6 shadow-[0_-15px_40px_rgba(26,8,6,0.6)] bg-[#fefaf0] transition-transform duration-300 ease-out
            ${isDrawerOpen ? "translate-y-0" : "translate-y-full"}
            lg:static lg:z-10 lg:h-full lg:translate-y-0 lg:rounded-[2rem] lg:p-7 lg:md:p-8 lg:shadow-none lg:bg-transparent lg:overflow-visible`}
        >
          
          {/* 移动端专用：顶部下拉把手 */}
          <div className="flex flex-col items-center lg:hidden">
            <span className="h-1 w-12 rounded-full bg-[#a92b1f]/20" />
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between mt-2 lg:mt-0">
            <div>
              <div className="flex items-start justify-between gap-4">
                {/* 🎬 剧中名角悬挂式戏折剧照 */}
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0 overflow-hidden rounded-xl border border-[#a92b1f]/20 bg-[#a92b1f]/5 p-0.5 shadow-[2px_4px_12px_rgba(58,15,11,0.15)]">
                    <img
                      src={`/avatars/${selected.id}.jpg`}
                      alt={selected.name}
                      className="h-44 w-32 rounded-lg object-cover"
                    />
                    {/* 中式包角角标 */}
                    <span className="absolute left-0.5 top-0.5 size-1 border-l border-t border-[#a92b1f]/40" />
                    <span className="absolute right-0.5 bottom-0.5 size-1 border-r border-b border-[#a92b1f]/40" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-[#87622b]/80">卷首 · 梨园人物志</p>
                    <h3 className="mt-1 font-display text-4xl text-[#3a0f0b] tracking-[0.08em]">{selected.name}</h3>
                    {selected.actor ? (
                      <p className="mt-1 text-xs font-semibold tracking-wider text-[#a92b1f]/80 font-sans">
                        饰演：{selected.actor}
                      </p>
                    ) : null}
                  </div>
                </div>
                
                {/* 移动端专属：朱漆红关闭抽屉按钮 + 原有的关系折数 */}
                <div className="flex items-center gap-3">
                  <span className="rounded-md border border-[#a92b1f]/35 bg-[#a92b1f]/5 px-2.5 py-1 font-display text-xs text-[#a92b1f] shadow-sm">
                    {relationCount} 折交颈
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex size-8 items-center justify-center rounded-full border border-[#a92b1f]/25 bg-[#a92b1f]/5 text-[#a92b1f] hover:bg-[#a92b1f]/10 lg:hidden"
                    aria-label="关闭详情"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="my-5 h-px bg-gradient-to-r from-[#a92b1f]/30 via-[#a92b1f]/10 to-transparent" />

              <p className="leading-8 text-[#3a0f0b]/80 tracking-[0.04em] text-[15px]">{selected.summary}</p>
              
              <p className="mt-5 border-l-2 border-[#a92b1f] pl-4 text-xs leading-8 text-[#3a0f0b]/70 bg-[#a92b1f]/3 py-1 rounded-r-md">
                {selected.arc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {selected.traits.map((trait) => (
                  <span key={trait} className="rounded-full bg-[#a92b1f]/8 border border-[#a92b1f]/15 px-3 py-1 text-xs text-[#a92b1f] font-medium">
                    {trait}
                  </span>
                ))}
              </div>

              {/* 彩蛋区域 */}
              {(selected.id === "yi-qine" || selected.id === "hu-sanyuan" || selected.id === "gou-cunzhong") && (
                <div className="mt-8 rounded-2xl border border-dashed border-[#a92b1f]/35 bg-[#a92b1f]/5 p-4 transition-all hover:bg-[#a92b1f]/8">
                  <p className="text-xs font-semibold text-[#a92b1f] tracking-[0.1em]">✨ 梨园隐藏绝活 (Easter Egg)</p>
                  {selected.id === "yi-qine" && (
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-xs leading-7 text-[#3a0f0b]/70">忆秦娥一唱封神，苦练苟师嫡传绝活！你可以点击右侧朱砂按钮，现场吹火：</p>
                      <button
                        type="button"
                        onClick={() => setIsBreathingFire(true)}
                        className="shrink-0 flex size-9 items-center justify-center rounded border border-[#a92b1f] bg-[#a92b1f] text-sm text-[#fefaf0] font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                        title="点击吹火"
                      >
                        火
                      </button>
                    </div>
                  )}
                  {selected.id === "gou-cunzhong" && (
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-xs leading-7 text-[#3a0f0b]/70">苟师一生痴情于秦腔，《鬼怨·杀生》三口连珠火壮怀激烈！点击喷出传承烈火：</p>
                      <button
                        type="button"
                        onClick={() => setIsBreathingFire(true)}
                        className="shrink-0 flex size-9 items-center justify-center rounded border border-[#a92b1f] bg-[#a92b1f] text-sm text-[#fefaf0] font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                        title="点击吹火"
                      >
                        火
                      </button>
                    </div>
                  )}
                  {selected.id === "hu-sanyuan" && (
                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p className="text-xs leading-7 text-[#3a0f0b]/70">西北鼓王胡三元坐镇武场，双槌一落，万马杀出！点击敲击战鼓，呼风唤雨：</p>
                      <button
                        type="button"
                        onClick={handleDrumClick}
                        className="shrink-0 flex size-9 items-center justify-center rounded border border-[#87622b] bg-[#87622b] text-sm text-[#fefaf0] font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                        title="点击打鼓"
                      >
                        鼓
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 grid gap-4 rounded-2xl bg-[#3a0f0b]/3 p-4 border border-[#3a0f0b]/8 text-xs">
                <div>
                  <p className="font-semibold text-[#3a0f0b]">相关戏骨</p>
                  <p className="mt-2 leading-7 text-[#3a0f0b]/72">
                    {related.map((character) => character.name).join("、") || "暂无"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#3a0f0b]">梨园行实</p>
                  <p className="mt-2 leading-7 text-[#3a0f0b]/72">
                    {events.map((event) => event.title).join("、") || "暂无"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-[#a92b1f]/15">
              <SourceBadges sourceIds={selected.sourceIds} />
            </div>
          </div>
        </aside>
      ) : null}

      {/* 💥 吹火全屏关键帧动画样式注入 */}
      <style jsx global>{`
        @keyframes fire-sparks {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-160px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
