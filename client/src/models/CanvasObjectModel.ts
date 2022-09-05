import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { MovementType } from "../enumerables/MovementTypeEnum";
import type { ConditionModel } from "./ConditionModel";
import type { DestinationCellModel } from "./DestinationCellModel";
import type { DoorModel } from "./DoorModel";
import type { InteractionModel } from "./InteractionModel";
import type { SpriteDataModel } from "./SpriteDataModel";

export type CanvasObjectModel = {
    type: string;
    row: number;
    column: number;
    spriteDataModel: SpriteDataModel;

    name?: string
    sfx?: string;
    animationType?: AnimationTypeEnum;
    animationName?: string;
    movementType?: MovementType;
    direction?: DirectionEnum;

    hasCondition: boolean;
    condition?: ConditionModel;
    hasAction: boolean;
    action?: InteractionModel[];

    hasDoor: boolean;
    door?: DoorModel;

    destination?: DestinationCellModel; 
}