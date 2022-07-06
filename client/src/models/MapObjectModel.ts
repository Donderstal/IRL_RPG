import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { CanvasObjectModel } from "./CanvasObjectModel";

export type MapObjectModel = CanvasObjectModel & {
    type: string;
    direction?: DirectionEnum;
}