"use client";

import { useMemo, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";

import type { Character, Relationship, RelationshipType } from "@/data";
import { SourceBadges } from "@/components/ui/SourceBadges";

const relationColors: Record<RelationshipType, string> = {
  亲缘: "#d6aa55",
  师承: "#f0c36b",
  情感: "#df4d31", // 朱砂红牵丝
  竞争: "#8f3b2f",
  托举: "#e6d7a5",
  传承: "#9fc78c",
  创作: "#caa0ff",
};

// 命运批注彩蛋库 (宿命题跋)
const fateEpilogues: Record<string, string> = {
  "hu-yi-family": "【引路题跋】 宁州深山的一根羊鞭，换了省城大剧院的一身戏服。舅舅一槌定音，敲开了来娣一世的角儿路。",
  "hu-yi-support": "【托举题跋】 西北司鼓胡三元，人能老，鼓槌不能秃。他的鼓点就是忆秦娥台上的魂，只要槌在，主角的天塌不下来。",
  "hua-yi-mentor": "【师承题跋】 县团台柱花彩香，台上争了半生风光，却对烧火丫头倾囊相授。那是戏曲长河里最温热的交棒。",
  "gou-yi-mentor": "【严师题跋】 存字辈老艺人们的硬功夫，是用柳条子和冷汗在夜里抽出来的。不留情面，却把最撑腰的筋骨传了下去。",
  "hua-mi-rivalry": "【镜像题跋】 花彩香与米兰，台上互为镜子，争做主角；台下红尘辗转，殊途同归，都在自己的人生账本里画了押。",
  "liu-yi-marriage": "【婚姻题跋】 烈火遇了凡尘，刘红兵的纠缠是一场世俗的避风港，却也是忆秦娥半生婚姻悲凉、育儿夭亡的起废劫数。",
  "feng-yi-first-love": "【初恋题跋】 十七岁的封潇潇与易青娥，躲在夕阳后怕被命运找到。可板胡一紧，少年归于沉默，徒留一生错过的叹息。",
  "qin-yi-name": "【文人题跋】 戏子唱戏，剧作家造戏。秦八娃这一管墨笔，取名‘忆秦娥’，将李白长乐悲歌的宿命，牢牢定在了她身上。",
  "chu-yi-rivalry": "【同行题跋】 楚嘉禾的一生，都在向忆秦娥掰手腕。她虽刻薄，却也成了忆秦娥在规则靶心不得不一再蜕变的逆流铁砧。",
  "yi-song-inheritance": "【传承题跋】 宋雨在舞台中央接过了那一束亮光。忆秦娥淡入后台，顿悟：唱戏是一棒接一棒的火火相传，主角不独属于个人。"
};

const positions: Record<string, { x: number; y: number }> = {
  "yi-qine": { x: 400, y: 250 },
  "hu-sanyuan": { x: 140, y: 110 },
  "hua-caixiang": { x: 130, y: 290 },
  "mi-lan": { x: 40, y: 460 },
  "gou-cunzhong": { x: 250, y: 460 },
  "qin-bawa": { x: 440, y: 490 },
  "song-yu": { x: 630, y: 460 },
  "chu-jiahe": { x: 830, y: 340 },
  "feng-xiaoxiao": { x: 740, y: 190 },
  "liu-hongbing": { x: 660, y: 70 },
};

function CharacterNodeLabel({ character }: { character: Character }) {
  const [hasError, setHasError] = useState(false);
  const isYiQine = character.id === "yi-qine";

  return (
    <div className="flex flex-col items-center justify-center text-center group">
      {/* 🎬 剧中名伶精致微方头像 */}
      <div className={`relative mb-2 shrink-0 overflow-hidden rounded-xl border border-[#d6aa55]/30 bg-[#1a0806] p-0.5 shadow-md transition-all duration-300 group-hover:border-[#d6aa55]/60 ${
        isYiQine ? "size-20" : "size-16"
      }`}>
        {!hasError ? (
          <img
            src={`/avatars/${character.id}.jpg`}
            alt={character.name}
            onError={() => setHasError(true)}
            className="size-full rounded-lg object-cover scale-100 transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex size-full items-center justify-center rounded-lg bg-gradient-to-br from-[#2a0e0b] to-[#120403] font-display text-[#d6aa55] ${
            isYiQine ? "text-lg" : "text-sm"
          }`}>
            {character.name[0]}
          </div>
        )}
      </div>
      <span className={`font-display font-bold tracking-wide text-[#f8ecd0] transition-colors duration-300 group-hover:text-[#d6aa55] ${
        isYiQine ? "text-[19px]" : "text-[16px]"
      }`}>
        {character.name}
      </span>
    </div>
  );
}

type RelationshipGraphProps = {
  characters: Character[];
  relationships: Relationship[];
};

export function RelationshipGraph({ characters, relationships }: RelationshipGraphProps) {
  const [activeType, setActiveType] = useState<RelationshipType | "全部">("全部");
  const [selectedRelationshipId, setSelectedRelationshipId] = useState(relationships[0]?.id ?? "");
  const [selectedCharacterId, setSelectedCharacterId] = useState("yi-qine");

  // 关系类型字典
  const relationTypes: Array<RelationshipType | "全部"> = [
    "全部",
    "亲缘",
    "师承",
    "情感",
    "竞争",
    "托举",
    "传承",
    "创作",
  ];

  // 1. 点击节点（人物框）
  const handleNodeClick = (nodeId: string) => {
    setSelectedCharacterId(nodeId);

    // 自动切换右侧关系：优先寻找当前筛选下，与此人相关的关系
    const curFilteredRels = activeType === "全部" 
      ? relationships 
      : relationships.filter(r => r.type === activeType);

    let nextRel = curFilteredRels.find(r => r.from === nodeId || r.to === nodeId);
    
    // 如果当前筛选下找不到，则在全部关系中寻找涉及该人的关系
    if (!nextRel) {
      nextRel = relationships.find(r => r.from === nodeId || r.to === nodeId);
    }

    if (nextRel) {
      setSelectedRelationshipId(nextRel.id);
    }
  };

  // 2. 点击边（关系线）
  const handleEdgeClick = (edgeId: string) => {
    setSelectedRelationshipId(edgeId);

    const rel = relationships.find(r => r.id === edgeId);
    if (rel) {
      // 自动切换右侧人物：设为关系的起点人物（如胡三元 -> 忆秦娥，切换为胡三元）
      setSelectedCharacterId(rel.from);
    }
  };

  // 3. 点击筛选类型时，如果当前选中的关系不属于该筛选，自动重置选中的关系为该筛选下的第一条
  const handleTypeChange = (type: RelationshipType | "全部") => {
    setActiveType(type);
    const nextFiltered = type === "全部" 
      ? relationships 
      : relationships.filter(r => r.type === type);
    
    if (nextFiltered.length > 0) {
      // 检查当前选中的关系是否仍在筛选中，不在则重置为第一条
      const isStillVisible = nextFiltered.some(r => r.id === selectedRelationshipId);
      if (!isStillVisible) {
        const firstRel = nextFiltered[0];
        setSelectedRelationshipId(firstRel.id);
        // 同时同步更新对应人物
        setSelectedCharacterId(firstRel.from);
      }
    }
  };

  const visibleRelationships = useMemo(() => {
    if (activeType === "全部") {
      return relationships;
    }
    return relationships.filter((relationship) => relationship.type === activeType);
  }, [activeType, relationships]);

  const graphCharacters = useMemo(() => {
    return characters.filter((c) => positions[c.id]);
  }, [characters]);

  const nodes: Node[] = useMemo(
    () =>
      graphCharacters.map((character) => {
        // 根据角色分配国风彩色框和彩色渐变底
        let borderColors = "rgba(214, 170, 85, 0.45)"; // 默认暗金
        let bgGradient = "linear-gradient(135deg, #1f0a07, #0e0403)"; // 默认墨黑

        if (character.id === "yi-qine") {
          // 主角: 朱砂红/帝王金
          borderColors = "#e94e3d";
          bgGradient = "linear-gradient(135deg, #a92b1f, #541610)";
        } else if (character.role === "亲缘") {
          // 亲缘: 赭石金/琥珀
          borderColors = "#d6aa55";
          bgGradient = "linear-gradient(135deg, #8c6023, #2e1a06)";
        } else if (character.role === "师承") {
          // 师承: 皇家金/秋黄
          borderColors = "#f0c36b";
          bgGradient = "linear-gradient(135deg, #997327, #3d2403)";
        } else if (character.role === "情感") {
          // 情感: 绯红/桃花
          borderColors = "#df4d31";
          bgGradient = "linear-gradient(135deg, #9c2e1c, #3d0a03)";
        } else if (character.role === "同行") {
          // 同行: 翡翠/青黛/孔雀绿
          borderColors = "#4ba396";
          bgGradient = "linear-gradient(135deg, #1e5a52, #041a18)";
        } else if (character.role === "传承") {
          // 传承: 碧玉/鲜绿
          borderColors = "#9fc78c";
          bgGradient = "linear-gradient(135deg, #3f692d, #0d2105)";
        } else if (character.role === "创作") {
          // 创作: 紫藤/暮紫
          borderColors = "#b085f5";
          bgGradient = "linear-gradient(135deg, #51278f, #1b0538)";
        }

        const isYiQine = character.id === "yi-qine";
        const isSelected = selectedCharacterId === character.id;

        return {
          id: character.id,
          position: positions[character.id] ?? { x: 0, y: 0 },
          data: {
            label: <CharacterNodeLabel character={character} />,
          },
          style: {
            width: isYiQine ? 155 : 130,
            borderRadius: isYiQine ? 24 : 20,
            border: isSelected
              ? `2px solid #f8ecd0`
              : `1px solid ${borderColors}`,
            background: bgGradient,
            color: "#f8ecd0",
            fontSize: 13,
            boxShadow: isSelected
              ? `0 0 25px ${borderColors}dd`
              : `0 4px 12px rgba(0,0,0,0.4)`,
            padding: isYiQine ? "20px 8px 16px 8px" : "16px 8px 14px 8px",
            transition: "all 0.3s ease",
          },
        };
      }),
    [graphCharacters, selectedCharacterId],
  );

  const edges: Edge[] = useMemo(
    () =>
      visibleRelationships.map((relationship) => ({
        id: relationship.id,
        source: relationship.from,
        target: relationship.to,
        label: relationship.label,
        animated: relationship.type === "传承" || relationship.type === "托举" || relationship.type === "情感",
        style: {
          stroke: relationColors[relationship.type],
          strokeWidth: selectedRelationshipId === relationship.id ? 3.5 : 2,
        },
        labelStyle: {
          fill: "#f8ecd0",
          fontSize: 11,
          fontFamily: "var(--font-serif-cn), serif",
        },
        labelBgStyle: {
          fill: "#1d0907",
          fillOpacity: 0.9,
        },
      })),
    [visibleRelationships, selectedRelationshipId],
  );

  const selectedRelationship = useMemo(() => {
    return relationships.find((r) => r.id === selectedRelationshipId) ?? visibleRelationships[0];
  }, [relationships, selectedRelationshipId, visibleRelationships]);

  const selectedCharacter = useMemo(() => {
    return characters.find((c) => c.id === selectedCharacterId);
  }, [characters, selectedCharacterId]);

  // 从选中的关系中得到关系的双方（起点和终点）
  const relationPartyFrom = useMemo(() => {
    if (!selectedRelationship) return null;
    return characters.find(c => c.id === selectedRelationship.from);
  }, [characters, selectedRelationship]);

  const relationPartyTo = useMemo(() => {
    if (!selectedRelationship) return null;
    return characters.find(c => c.id === selectedRelationship.to);
  }, [characters, selectedRelationship]);

  // 计算选中的关系题跋彩蛋
  const selectedFate = selectedRelationship ? fateEpilogues[selectedRelationship.id] : null;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      
      {/* 左侧关系图区域 */}
      <section className="stage-card relative overflow-hidden rounded-[2rem]">
        {/* 四边暗金花角装饰 */}
        <span className="absolute left-2 top-2 size-2 border-l border-t border-[#d6aa55]/30" />
        <span className="absolute right-2 top-2 size-2 border-r border-t border-[#d6aa55]/30" />

        <div className="flex flex-wrap gap-2 border-b border-[#d6aa55]/15 p-4 bg-black/10">
          {relationTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`rounded-full border px-3 py-1 text-xs font-display transition-all duration-300 ${
                activeType === type
                  ? "border-[#d6aa55] bg-[#d6aa55] text-[#261310] shadow-[0_2px_6px_rgba(214,170,85,0.2)]"
                  : "border-[#d6aa55]/20 text-[#f8ecd0]/65 hover:border-[#d6aa55]/40 hover:text-[#f8ecd0]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="h-[640px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            minZoom={0.5}
            maxZoom={1.3}
            onNodeClick={(_, node) => handleNodeClick(node.id)}
            onEdgeClick={(_, edge) => handleEdgeClick(edge.id)}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="rgba(214,170,85,0.12)" gap={24} />
            <Controls />
          </ReactFlow>
        </div>
      </section>

      {/* 右侧宣纸题词折页 */}
      <aside className="paper-card relative overflow-hidden rounded-[2rem] p-7 flex flex-col justify-between">
        
        <div className="relative z-10">
          <p className="text-[10px] tracking-[0.3em] text-[#87622b]/80">卷二 · 梨园姻亲簿</p>
          
          {/* 🌟 1. 当前聚焦的特定人物详情 (框) */}
          {selectedCharacter ? (
            <div className="mt-4 flex items-center gap-4">
              {/* 🎬 人物精致小头像 */}
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-[#a92b1f]/20 bg-[#fefaf0] p-0.5 shadow-md">
                <img
                  src={`/avatars/${selectedCharacter.id}.jpg`}
                  alt={selectedCharacter.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const placeholder = document.createElement("div");
                      placeholder.className = "flex size-full items-center justify-center rounded-lg bg-gradient-to-br from-[#fefaf0] to-[#f5f0e1] text-lg font-display text-[#a92b1f]";
                      placeholder.innerText = selectedCharacter.name[0];
                      parent.appendChild(placeholder);
                    }
                  }}
                  className="size-full rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-3xl text-[#3a0f0b] tracking-wide truncate">{selectedCharacter.name}</h3>
                <p className="mt-1 text-xs leading-5 text-[#3a0f0b]/70 font-sans font-medium line-clamp-2">{selectedCharacter.headline}</p>
              </div>
            </div>
          ) : null}

          {/* 🌟 2. 关系线切换与双方人物快捷互切区域 */}
          {selectedRelationship ? (
            <div className="mt-6 rounded-2xl bg-[#3a0f0b]/3 p-4 border border-[#3a0f0b]/8">
              
              {/* 人物互切标头 (显示关系中的双方，允许点击在二者间切换详情) */}
              <div className="mb-4 flex items-center justify-between border-b border-[#a92b1f]/10 pb-2.5 text-xs text-[#3a0f0b]/60">
                <span className="font-sans font-semibold">关联人物交互：</span>
                <div className="flex items-center gap-1.5 font-display text-xs">
                  {relationPartyFrom && (
                    <button
                      type="button"
                      onClick={() => setSelectedCharacterId(relationPartyFrom.id)}
                      className={`px-1.5 py-0.5 rounded transition ${
                        selectedCharacterId === relationPartyFrom.id 
                          ? "bg-[#a92b1f] text-[#fefaf0] font-bold" 
                          : "hover:text-[#a92b1f] hover:underline"
                      }`}
                    >
                      {relationPartyFrom.name}
                    </button>
                  )}
                  <span className="text-[#a92b1f]/50">⇄</span>
                  {relationPartyTo && (
                    <button
                      type="button"
                      onClick={() => setSelectedCharacterId(relationPartyTo.id)}
                      className={`px-1.5 py-0.5 rounded transition ${
                        selectedCharacterId === relationPartyTo.id 
                          ? "bg-[#a92b1f] text-[#fefaf0] font-bold" 
                          : "hover:text-[#a92b1f] hover:underline"
                      }`}
                    >
                      {relationPartyTo.name}
                    </button>
                  )}
                </div>
              </div>

              {/* 关系类型与具体标签 */}
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#a92b1f]/10 border border-[#a92b1f]/20 px-2.5 py-0.5 text-xs font-semibold text-[#a92b1f] font-display">
                  {selectedRelationship.type}
                </span>
                <span className="text-xs font-bold text-[#3a0f0b] tracking-wider">
                  {selectedRelationship.label}
                </span>
              </div>
              <p className="text-xs leading-7 text-[#3a0f0b]/75">{selectedRelationship.summary}</p>
              
              {/* 🌟 命运题跋彩蛋 */}
              {selectedFate && (
                <div className="mt-4 border-t border-dashed border-[#a92b1f]/20 pt-3">
                  <p className="font-display text-sm leading-8 text-[#a92b1f] italic [text-shadow:0_0_1px_rgba(169,43,31,0.05)]">
                    {selectedFate}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <SourceBadges sourceIds={selectedRelationship.sourceIds} compact />
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative z-10 mt-6 pt-4 border-t border-dashed border-[#a92b1f]/15 text-[10px] leading-7 text-[#3a0f0b]/60 select-none">
          💡 点击人物框：切换右侧生平，并自动聚焦该人的主要关系。
          <br />
          💡 点击关系线：切换对应命运，并支持一键在两端人物生平间来回互切！
        </div>
      </aside>
    </div>
  );
}
