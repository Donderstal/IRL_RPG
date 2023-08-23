import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { MovementType } from "../enumerables/MovementTypeEnum";
import type { ConditionModel } from "./ConditionModel";
import type { DestinationCellModel } from "./DestinationCellModel";
import type { SpriteDataModel } from "./SpriteDataModel";

export type CanvasObjectModel = {
    type: string;
    row: number;
    column: number;
    spriteDataModel: SpriteDataModel;

    id?: string;
    name?: string
    sfx?: string;
    animationType?: AnimationTypeEnum;
    animationName?: string;
    movementType?: MovementType;
    direction?: DirectionEnum;

    hasCondition: boolean;
    condition?: ConditionModel;

    destination?: DestinationCellModel; 
}