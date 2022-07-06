import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { RoadAlignmentEnum } from "../enumerables/RoadAlignmentEnum";

export type RoadModel = {
    direction: DirectionEnum;
    alignment: RoadAlignmentEnum;
    hasStart: boolean;

    primaryColumn: number;
    secondaryColumn: number;
    primaryRow: number;
    secondaryRow: number;
}