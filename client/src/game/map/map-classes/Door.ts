import { Hitbox } from '../../core/Hitbox';
import { conditionIsTrue } from "../../../helpers/conditionalHelper";
import { inUnlockedDoorsRegistry } from '../../../registries/doorRegistry';;
import type { DoorModel } from "../../../models/DoorModel";
import { ConditionType } from '../../../enumerables/ConditionTypeEnum';
import { getActiveMapKey } from '../../neighbourhoodModule';
import type { FrameModel } from '../../../models/SpriteFrameModel';

export class Door extends Hitbox {
    mapName: string;
    model: DoorModel;
    arcColor: string;
    id: string;
    metConditionAtLastCheck: boolean;
    isUnlocked: boolean;
    constructor( frame: FrameModel, door: DoorModel, id: string ) {
        super( frame )
        this.mapName        = getActiveMapKey();
        this.model          = door;
        this.arcColor       = "#FFFF00";
        this.id             = id;
        this.isUnlocked     = inUnlockedDoorsRegistry( this.registryString );
        this.metConditionAtLastCheck = this.isUnlocked || ( this.meetsCondition && this.model.condition != undefined && this.model.condition.type != ConditionType.ownsItem );
    }
    get registryString(): string {
        return this.mapName + "_" + this.model.direction + "_" + this.model.doorTo;
    }
    get meetsCondition(): boolean { 
        return this.isUnlocked || this.model.condition === undefined || conditionIsTrue( this.model.condition.type, this.model.condition.value );
    }
}