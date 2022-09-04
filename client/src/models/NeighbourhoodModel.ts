import type { InteractionModel } from "./InteractionModel";
import type { MapModel } from "./MapModel";
import type { RoadModel } from "./RoadModel";

export type NeighbourhoodModel = {
    name: string;
    music?: string;
    horizontalSlots: string[];
    verticalSlots: string[];

    characterTypes?: string[];
    characterSpawnRate?: number;
    carTypes?: string[];
    carSpawnRate?: number;

    spawnableActions?: InteractionModel[][];
    mapDictionary: { [key: string]: MapModel };
    roads: RoadModel[];
}