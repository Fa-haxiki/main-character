import { StoryTimeline } from "@/components/interactive/StoryTimeline";
import { SiteShell } from "@/components/layout/SiteShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { characters, operaMotifs, storyEvents } from "@/data";

export default function StorylinesPage() {
  return (
    <SiteShell>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="STORYLINES"
            title="三重姓名，一条主角路"
            description="故事线按山野起点、县团淬炼、省团成名、传承回望四个阶段展开，让人物命运、秦腔剧目和时代变迁在同一条时间轴上互相照亮。"
          />
          <div className="mt-10">
            <StoryTimeline events={storyEvents} characters={characters} operas={operaMotifs} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
