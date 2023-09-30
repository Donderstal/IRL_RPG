import type { InteractionAnswer } from "../enumerables/InteractionAnswer";
import type { GridCellModel } from "./GridCellModel";

export type SaveGame = {
    time: string;
    playerData: SaveGamePlayerData;
    activeMap: SaveGameMapData;
    keyLists: SaveGameKeyLists;
}
export type SaveGamePlayerData = {
    name: string;
    position: GridCellModel;
}
export type SaveGameMapData = {
    mapName: string;
    location: string;
}

export type SaveGameKeyLists = {
    interactionRegistry: { [key: string]: InteractionAnswer };
    collectableRegistry: { coins: string[], juiceCans: string[] };
    unlockedDoors: string[]
}