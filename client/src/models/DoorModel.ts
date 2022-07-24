import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { ConditionModel } from "./ConditionModel";

export type DoorModel = {
    row?: number;
    column?: number;
    doorTo: string;
    direction: DirectionEnum;
    condition?: ConditionModel;
}