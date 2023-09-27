import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { IContract } from "./IContract";

export type CreateSpriteContract = IContract & {
    canvasObjectModel: CanvasObjectModel;
}