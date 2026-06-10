import { CharacterExplorer } from "@/components/interactive/CharacterExplorer";
import { SiteShell } from "@/components/layout/SiteShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { characters } from "@/data";

export default function CharactersPage() {
  return (
    <SiteShell>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="CHARACTERS"
            title="人物群像不是陪衬"
            description="《主角》的力量来自群像。忆秦娥被推到舞台中央，但每一个托举、竞争、错过与传承她的人，也在唱自己的主角戏。"
          />
          <div className="mt-10">
            <CharacterExplorer characters={characters} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
