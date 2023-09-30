import type { CellPosition } from "../models/CellPositionModel";
import type { IContract } from "./IContract";

export type EnterMapContract = IContract & {
    doorId: string,
    mapId: string,
    playerStart: CellPosition
}