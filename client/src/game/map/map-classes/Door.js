const globals           = require('../../../game-data/globals')
const { GRID_BLOCK_PX } = require('../../../game-data/globals')
const { ON_NPC_INTERACTION, ON_LEAVE, EVENT_DOOR, SPEAK, EVENT_TALK } = require('../../../game-data/conditionGlobals')
const { Hitbox }         = require('../../core/Hitbox')
const { conditionIsTrue } = require("../../../helpers/conditionalHelper");
const { Cinematic } = require('../../cutscenes/Cinematic');
const { ITEM_OWNED } = require('../../../game-data/conditionGlobals');
const { inUnlockedDoorsRegistry, addDoorToUnlockedDoorsRegistry } = require('../../../helpers/doorRegistry');
const { PLAYER_NAME, PLAYER_ID } = require('../../../game-data/interactionGlobals');
const { getActionObject } = require('../../../helpers/actionDtoFactory');

const lockedDoorEvent = [
        EVENT_TALK, false, "voice-1.mp3", [ 
            [[SPEAK, "This door is locked!", PLAYER_NAME]],
            [[SPEAK, "I need to find some way to open it...", PLAYER_NAME]]
        ]   
]
const unlockDoorEvent = [
    EVENT_TALK, false, "voice-1.mp3", [ 
        [[SPEAK, "Let's unlock this door now...", PLAYER_NAME, false, "misc/Heavy-Door-Lock--Unlocking.mp3"]]
    ]   
]
/**
 * Hitbox extension that trigger the GAME.switchMap function if the player is in blockedRange
 * this.destination stores the name of the map where the door leads to.
 */
class Door extends Hitbox {
    constructor( x, y, door, id ) {
        super( x, y, GRID_BLOCK_PX * .75 )
        this.mapName        = globals.GAME.activeMapName;
        this.destination    = door.destination;
        this.direction      = door.direction;
        this.locked         = door.locked;
        this.arcColor       = "#FFFF00";
        this.id             = id;

        if ( door.condition && !inUnlockedDoorsRegistry(this.registryString) ) {
            this.condition = true;
            this.conditionType = door.condition.type;
            this.conditionValue = door.condition.value
        }
        else {
            this.condition = false;
        }

        this.metConditionAtLastCheck = ( this.meetsCondition && this.conditionType != ITEM_OWNED );
    }
    get registryString( ) {
        return this.mapName + "_" + this.direction + "_" + this.destination;
    }
    get meetsCondition( ) { 
        return !this.condition || conditionIsTrue( this.conditionType, this.conditionValue );
    }
    handle( ) {
        if ( !this.meetsCondition ) {
            new Cinematic( 
                getActionObject(lockedDoorEvent[0], lockedDoorEvent[1], lockedDoorEvent[2], lockedDoorEvent[3]).scenes, 
                ON_NPC_INTERACTION, [ PLAYER_ID ]
            );
        }
        else if ( this.condition ) {
            new Cinematic( 
                getActionObject(unlockDoorEvent[0], unlockDoorEvent[1], unlockDoorEvent[2], unlockDoorEvent[3]).scenes, 
                ON_LEAVE, [ this.destination, EVENT_DOOR]
            );
            this.metConditionAtLastCheck = true;
            addDoorToUnlockedDoorsRegistry(this.registryString);
            this.dismiss( );
        }
        else if (!this.condition) {
            globals.GAME.switchMap( this.destination, EVENT_DOOR );
            globals.GAME.sound.playEffect( "misc/random5.wav" );
            this.dismiss( );
        }
    }
    dismiss( ) {
        globals.GAME.activeAction = null;
    }
}

module.exports = {
    Door
}