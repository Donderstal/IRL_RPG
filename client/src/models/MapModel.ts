import type { CanvasObjectModel } from "./CanvasObjectModel";
import type { DoorModel } from "./DoorModel";
import type { ElevatorModel } from "./ElevatorModel";
import type { MapActionModel } from "./MapActionModel";
import type { RoadModel } from "./RoadModel";
import type { SpawnPointModel } from "./SpawnPointModel";
import type { TileModel } from "./TileModel";

export type MapModel = {
    key: string;
    location: string;

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

    doors: DoorModel[];
    actions: MapActionModel[];

    spawnPoints?: SpawnPointModel[];
    roads?: RoadModel[];
    elevators?: ElevatorModel[];

    savepoint?: any;
}