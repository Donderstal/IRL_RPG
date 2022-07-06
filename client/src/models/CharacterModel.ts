import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum"
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { CanvasObjectModel } from "./CanvasObjectModel";

export type CharacterModel = CanvasObjectModel & {
    animation_type: AnimationTypeEnum;
    sprite: string;
    direction: DirectionEnum;
}