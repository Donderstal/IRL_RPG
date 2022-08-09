import globals from '../../../game-data/globals';
import { GRID_BLOCK_PX } from '../../../game-data/globals';
import { Hitbox } from '../../core/Hitbox';
import { conditionIsTrue } from "../../../helpers/conditionalHelper";
import { inUnlockedDoorsRegistry, addDoorToUnlockedDoorsRegistry } from '../../../helpers/doorRegistry';
import { PLAYER_ID } from '../../../game-data/interactionGlobals';
//import { switchMap } from '../../../helpers/loadMapHelpers';
import type { DoorModel } from "../../../models/DoorModel";
import { ConditionType } from '../../../enumerables/ConditionTypeEnum';
import { initInteractionModel } from '../../../helpers/modelFactory';
import { lockedDoorEvent, unlockDoorEvent } from '../../../resources/actionResources';
import { CinematicTrigger } from '../../../enumerables/CinematicTriggerEnum';
import { InteractionType } from '../../../enumerables/InteractionType';
import { setActiveCinematic } from '../../controllers/cinematicController';

/**
 * Hitbox extension that trigger the GAME.switchMap function if the player is in blockedRange
 * this.destination stores the name of the map where the door leads to.
 */
export class Door extends Hitbox {
    mapName: string;
    model: DoorModel;
    arcColor: string;
    id: string;
    metConditionAtLastCheck: boolean;
    isUnlocked: boolean;
    constructor( x: number, y: number, door: DoorModel, id: string ) {
        super( x, y, GRID_BLOCK_PX * .75 )
        this.mapName        = globals.GAME.activeMapName;
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
    handle( ): void {
        if ( !this.meetsCondition ) {
            setActiveCinematic(
                initInteractionModel( lockedDoorEvent ), CinematicTrigger.interaction, [PLAYER_ID]
            );
        }
        else if ( this.model.condition !== undefined ) {
            setActiveCinematic(
                initInteractionModel( unlockDoorEvent ), CinematicTrigger.leave, [this.model.doorTo, InteractionType.door.toString()]
            );
            this.metConditionAtLastCheck = true;
            addDoorToUnlockedDoorsRegistry(this.registryString);
        }
        else {
            globals.GAME.switchMap( this.model.doorTo, InteractionType.door );
            globals.GAME.sound.playEffect( "misc/random5.wav" );
        }
    }
}