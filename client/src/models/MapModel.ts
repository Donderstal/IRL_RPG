import type { CanvasObjectModel } from "./CanvasObjectModel";
import type { DoorModel } from "./DoorModel";
import type { MapActionModel } from "./MapActionModel";
import type { RoadModel } from "./RoadModel";
import type { SpawnPointModel } from "./SpawnPointModel";
import type { TileModel } from "./TileModel";

export type MapModel = {
    name: string;
    columns: number;
    rows: number;
    tileSet: string;

    outdoors: boolean;
    music?: string;
    neighbours?: { left: string, up: string, right: string, down: string}
    playerStart?: any;

    grid: TileModel[];
    frontGrid: TileModel[];

    sprites: CanvasObjectModel[];
    frontSprites: CanvasObjectModel[];

    spawnPoints: SpawnPointModel[];
    roads?: RoadModel[];
    doors: DoorModel[];
    actions?: MapActionModel[];
    savepoint?: any;
}