import type { TriggerModel } from "../models/TriggerModel";
import type { IContract } from "./IContract";

export type SetTriggerContract = IContract & {
    triggerModel: TriggerModel;
}