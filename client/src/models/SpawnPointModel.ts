import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { OutOfMapEnum } from "../enumerables/OutOfMapEnum";

export type SpawnPointModel = {
    column: number | OutOfMapEnum;
    row: number | OutOfMapEnum;
    direction: DirectionEnum
}