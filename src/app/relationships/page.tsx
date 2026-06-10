import { RelationshipGraph } from "@/components/interactive/RelationshipGraph";
import { SiteShell } from "@/components/layout/SiteShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { characters, relationships } from "@/data";

export default function RelationshipsPage() {
  return (
    <SiteShell>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="RELATION MAP"
            title="看见舞台背后的线"
            description="以忆秦娥为中心，关系图把亲缘、师承、情感、竞争、托举、传承和创作线并置，点击节点或连线即可查看解释与来源。"
          />
          <div className="mt-10">
            <RelationshipGraph characters={characters} relationships={relationships} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
