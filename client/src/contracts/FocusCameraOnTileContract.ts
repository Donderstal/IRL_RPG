import type { GridCellModel } from "../models/GridCellModel";
import type { IContract } from "./IContract";

export type FocusCameraOnTileContract = IContract & {
    tile: GridCellModel;
    snap: boolean;
}