import type { DirectionEnum } from "../enumerables/DirectionEnum";

export type DoorModel = {
    row: number;
    column: number;
    destination: string;
    direction: DirectionEnum;
}