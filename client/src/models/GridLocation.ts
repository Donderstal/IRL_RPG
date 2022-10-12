export type GridLocation = {
    index: string;
    tileIndex?: number;
    status?: TileStatus;
    row?: number;
    column?: number;
    movementCost?: number;
    path?: GridLocation[];
}