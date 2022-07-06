import type { MapModel } from "./MapModel";

export type NeighbourhoodModel = {
    name: string;
    music?: string;
    horizontalSlots: string[];
    verticalSlots: string[];

    charcters?: string[];
    characterSpawnRate?: number;
    cars?: string[];
    carSpawnRate?: number;

    spawnableActions?: string[];
    mapDictionary: { [key: string]: MapModel };
}