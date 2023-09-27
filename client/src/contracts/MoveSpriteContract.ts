import type { GridCellModel } from "../models/GridCellModel";
import type { IContract } from "./IContract";

export type MoveSpriteContract = IContract & {
    spriteId: string,
    destination: GridCellModel;
}