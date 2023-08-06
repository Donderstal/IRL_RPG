import { DirectionEnum } from "../enumerables/DirectionEnum";
import { State } from "../enumerables/StateEnum";
import { actionButtonKey, returnButtonKey, menuButtonKey } from "./controlConstants";

export const controlSettings: {[key in State]: any[]} = {
    [State.website]: [DirectionEnum.up, DirectionEnum.down, actionButtonKey, returnButtonKey],
    [State.open_world]: [DirectionEnum.left, DirectionEnum.up, DirectionEnum.right, DirectionEnum.down, actionButtonKey, menuButtonKey],
    [State.menu]: [DirectionEnum.left, DirectionEnum.up, DirectionEnum.right, DirectionEnum.down, actionButtonKey, menuButtonKey],
    [State.cinematic]: [DirectionEnum.left, DirectionEnum.right, actionButtonKey]
} 