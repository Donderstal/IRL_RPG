import type { InteractionModel } from "./InteractionModel";
import type { MapModel } from "./MapModel";
import type { RoadModel } from "./RoadModel";
import type { SpawnPointModel } from "./SpawnPointModel";

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

    spawnableActions?: InteractionModel[][];
    mapDictionary: { [key: string]: MapModel };
    roads: RoadModel[];
    spawnPoints: SpawnPointModel[];
}