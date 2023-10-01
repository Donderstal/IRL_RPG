import type { GridCellModel } from "../models/GridCellModel";
import type { IContract } from "./IContract";

export type EnterMapContract = IContract & {
    doorId: string,
    mapId: string,
    playerStart: GridCellModel
}