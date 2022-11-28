import type { InteractionAnswer } from "../enumerables/InteractionAnswer";

export type SaveGame = {
    time: string;
    playerData: SaveGamePlayerData;
    activeMap: SaveGameMapData;
    keyLists: SaveGameKeyLists;
}
export type SaveGamePlayerData = {
    name: string;
}
export type SaveGameMapData = {
    mapName: string;
    sprites: any[];
    playerStart: { column: number; row: number; type: string };
}

export type SaveGameKeyLists = {
    storyEvents: string[];
    interactionRegistry: { [key: string]: InteractionAnswer };
    collectableRegistry: { coins: string[], juiceCans: string[] };
    unlockedDoors: string[]
}