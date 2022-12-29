import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { ConditionModel } from "./ConditionModel";

export type ElevatorModel = {
    id: string;
    row?: number;
    column?: number;
    direction: DirectionEnum;
    floors: { [key in string]: string };
    condition?: ConditionModel;
}