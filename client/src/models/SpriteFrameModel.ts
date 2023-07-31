import type { DirectionEnum } from "../enumerables/DirectionEnum"

export type FrameModel = {
    x: number,
    y: number,
    width?: number,
    height?: number,
    direction?: DirectionEnum
    column?: number;
    row?: number;
}