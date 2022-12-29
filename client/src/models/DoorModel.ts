import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { ConditionModel } from "./ConditionModel";

export type DoorModel = {
    id: string;
    row?: number;
    column?: number;
    doorTo: string;
    direction: DirectionEnum;
    condition?: ConditionModel;
}