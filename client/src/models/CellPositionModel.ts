import type { DirectionEnum } from "../enumerables/DirectionEnum";

export type CellPosition = {
    column: number;
    row: number;
    direction?: DirectionEnum
}