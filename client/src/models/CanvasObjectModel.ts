import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { MovementType } from "../enumerables/MovementTypeEnum";
import type { OutOfMapEnum } from "../enumerables/OutOfMapEnum";
import type { ConditionModel } from "./ConditionModel";
import type { InteractionModel } from "./InteractionModel";
import type { SpriteDataModel } from "./SpriteDataModel";

export type CanvasObjectModel = {
    type: string;
    row: number | OutOfMapEnum;
    column: number | OutOfMapEnum;
    spriteDataModel: SpriteDataModel;

    sfx?: string;
    animationType?: AnimationTypeEnum;
    movementType?: MovementType;
    direction?: DirectionEnum;

    hasCondition: boolean;
    condition?: ConditionModel;
    hasAction: boolean;
    action?: InteractionModel;

    hasDoor: boolean;
    destination?: string;
}