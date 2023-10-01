import type { DestinationType } from "../enumerables/DestinationType";
import type { DirectionEnum } from "../enumerables/DirectionEnum";

export type GridCellModel = {
    row: number;
    column: number;
    direction?: DirectionEnum;
    type?: DestinationType;
}