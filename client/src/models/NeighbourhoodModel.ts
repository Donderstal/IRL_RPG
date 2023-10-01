import type { GridCellModel } from "./GridCellModel";
import type { MapModel } from "./MapModel";
import type { RoadModel } from "./RoadModel";

export type NeighbourhoodModel = {
    key: string;
    location: string;
    music?: string;
    horizontalSlots: string[];
    verticalSlots: string[];

    characterTypes?: string[];
    characterSpawnRate?: number;
    carTypes?: string[];
    carSpawnRate?: number;

    spawnableActions?: string[];
    mapDictionary: { [key: string]: MapModel };
    roads: RoadModel[];
    spawnPoints: GridCellModel[];
}