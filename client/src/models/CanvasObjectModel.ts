import type { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import type { DirectionEnum } from "../enumerables/DirectionEnum";
import type { MovementType } from "../enumerables/MovementTypeEnum";
import type { OutOfMapEnum } from "../enumerables/OutOfMapEnum";
import type { CellPosition } from "./CellPositionModel";
import type { ConditionModel } from "./ConditionModel";
import type { DoorModel } from "./DoorModel";
import type { InteractionModel } from "./InteractionModel";
import type { SpriteDataModel } from "./SpriteDataModel";

export type CanvasObjectModel = {
    type: string;
    row: number | OutOfMapEnum;
    column: number | OutOfMapEnum;
    spriteDataModel: SpriteDataModel;

    name?: string
    sfx?: string;
    animationType?: AnimationTypeEnum;
    movementType?: MovementType;
    direction?: DirectionEnum;

    hasCondition: boolean;
    condition?: ConditionModel;
    hasAction: boolean;
    action?: InteractionModel[];

    hasDoor: boolean;
    door?: DoorModel;

    destination?: CellPosition; 
}