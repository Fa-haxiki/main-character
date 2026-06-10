import Link from "next/link";

import { sourceTierLabels } from "@/data";
import { getSources } from "@/lib/data-utils";

type SourceBadgesProps = {
  sourceIds: string[];
  compact?: boolean;
};

export function SourceBadges({ sourceIds, compact = false }: SourceBadgesProps) {
  const entries = getSources(sourceIds);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map((source) => (
        <Link
          key={source.id}
          href="/sources"
          className={`rounded-full border border-[#87622b]/35 bg-[#f8ecd0]/58 text-[#3a0f0b] transition hover:bg-[#f8ecd0] ${
            compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
          }`}
          title={`${source.publisher}：${source.title}`}
        >
          {sourceTierLabels[source.tier]} · {source.publisher}
        </Link>
      ))}
    </div>
  );
}
