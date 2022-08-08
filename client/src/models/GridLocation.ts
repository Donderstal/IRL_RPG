export type GridLocation = {
    index: string;

    status?: TileStatus;
    row?: number;
    column?: number;
    movementCost?: number;
    path?: GridLocation[];
}