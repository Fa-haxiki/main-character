export type SourceTier = "A" | "B" | "C";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  tier: SourceTier;
  note: string;
};

export type CharacterRole =
  | "主角"
  | "亲缘"
  | "师承"
  | "同行"
  | "情感"
  | "传承"
  | "创作";

export type Character = {
  id: string;
  name: string;
  aliases: string[];
  actor?: string;
  role: CharacterRole;
  headline: string;
  summary: string;
  traits: string[];
  arc: string;
  quote?: string;
  sourceIds: string[];
};

export type RelationshipType =
  | "亲缘"
  | "师承"
  | "情感"
  | "竞争"
  | "托举"
  | "传承"
  | "创作";

export type Relationship = {
  id: string;
  from: string;
  to: string;
  type: RelationshipType;
  label: string;
  summary: string;
  sourceIds: string[];
};

export type StoryPhase = "山野起点" | "县团淬炼" | "省团成名" | "传承回望";

export type StoryEvent = {
  id: string;
  phase: StoryPhase;
  title: string;
  period: string;
  summary: string;
  characterIds: string[];
  operaIds?: string[];
  sourceIds: string[];
};

export type OperaMotif = {
  id: string;
  title: string;
  kind: "经典剧目" | "原创剧目" | "文化背景";
  summary: string;
  narrativeMeaning: string;
  sourceIds: string[];
};
