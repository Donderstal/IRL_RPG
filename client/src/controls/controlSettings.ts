import { DirectionEnum } from "../enumerables/DirectionEnum";
import { ControlState } from "../enumerables/ControlState";
import { actionButtonKey, returnButtonKey, menuButtonKey } from "./controlConstants";

export const controlSettings: {[key in ControlState]: any[]} = {
    [ControlState.website]: [DirectionEnum.up, DirectionEnum.down, actionButtonKey, returnButtonKey],
    [ControlState.open_world]: [DirectionEnum.left, DirectionEnum.up, DirectionEnum.right, DirectionEnum.down, actionButtonKey, menuButtonKey],
    [ControlState.menu]: [DirectionEnum.left, DirectionEnum.up, DirectionEnum.right, DirectionEnum.down, actionButtonKey, menuButtonKey],
    [ControlState.cinematic]: [DirectionEnum.left, DirectionEnum.right, actionButtonKey]
} 