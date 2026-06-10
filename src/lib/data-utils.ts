import {
  characters,
  operaMotifs,
  relationships,
  sources,
  storyEvents,
} from "@/data";

export const characterById = new Map(characters.map((character) => [character.id, character]));
export const sourceById = new Map(sources.map((source) => [source.id, source]));
export const operaById = new Map(operaMotifs.map((opera) => [opera.id, opera]));

export function getSources(sourceIds: string[]) {
  return sourceIds.map((id) => sourceById.get(id)).filter((source) => source !== undefined);
}

export function getRelatedCharacters(characterId: string) {
  const relatedIds = new Set<string>();

  relationships.forEach((relationship) => {
    if (relationship.from === characterId) {
      relatedIds.add(relationship.to);
    }

    if (relationship.to === characterId) {
      relatedIds.add(relationship.from);
    }
  });

  return Array.from(relatedIds)
    .map((id) => characterById.get(id))
    .filter((character) => character !== undefined);
}

export function getCharacterEvents(characterId: string) {
  return storyEvents.filter((event) => event.characterIds.includes(characterId));
}

export function getCharacterRelationships(characterId: string) {
  return relationships.filter(
    (relationship) => relationship.from === characterId || relationship.to === characterId,
  );
}
