import type { CanvasObjectModel } from "./CanvasObjectModel";
import type { RoadModel } from "./RoadModel";
import type { SpawnPointModel } from "./SpawnPointModel";
import type { TileModel } from "./TileModel";
import type { TriggerModel } from "./TriggerModel";

export type MapModel = {
    key: string;
    location: string;

    columns: number;
    rows: number;
    tileSet: string;

    outdoors: boolean;
    music?: string;
    playerStart?: any;

    grid: TileModel[];
    frontGrid: TileModel[];

    sprites: CanvasObjectModel[];
    frontSprites: CanvasObjectModel[];

    spawnPoints?: SpawnPointModel[];
    roads?: RoadModel[];

    triggers?: TriggerModel[];

    blockedTileIds?: number[];
    unblockedTileIds?: number[];
}