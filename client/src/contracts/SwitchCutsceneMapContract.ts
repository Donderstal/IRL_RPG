import type { GridCellModel } from "../models/GridCellModel";
import type { IContract } from "./IContract";

export type SwitchCutsceneMapContract = IContract & {
    mapId: string;
    focusTile: GridCellModel;
    setPlayerSprite: boolean;
    playerStart: GridCellModel;
}