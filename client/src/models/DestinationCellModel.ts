import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { DestinationType } from "../enumerables/DestinationType";

export type DestinationCellModel = {
    row: number;
    column: number;
    type: DestinationType;
    direction?: DirectionEnum;
}