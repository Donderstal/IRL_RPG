import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { GridCellModel } from "./GridCellModel";

export type DirectionXy = {
    x: number;
    y: number;
    direction: DirectionEnum;
    tile?: GridCellModel
}