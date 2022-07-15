import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { ConditionModel } from "./ConditionModel";

export type DoorModel = {
    row: number;
    column: number;
    destination: string;
    direction: DirectionEnum;
    condition?: ConditionModel;
}