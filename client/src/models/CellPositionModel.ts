import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { OutOfMapEnum } from "../enumerables/OutOfMapEnum";

export type CellPosition = {
    column?: number|OutOfMapEnum;
    row?: number | OutOfMapEnum;
    direction?: DirectionEnum
}