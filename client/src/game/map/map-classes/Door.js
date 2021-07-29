const globals           = require('../../../game-data/globals')
const { GRID_BLOCK_PX } = require('../../../game-data/globals')
const { I_Hitbox }         = require('../../interfaces/I_Hitbox')
const { conditionIsTrue } = require("../../../helpers/conditionalHelper");
const { Cinematic } = require('../../cutscenes/Cinematic');
const { ITEM_OWNED } = require('../../../game-data/conditionGlobals');
const { inUnlockedDoorsRegistry, addDoorToUnlockedDoorsRegistry } = require('../../../helpers/doorRegistry')

const lockedDoorEvent = {
    scenes: [
        { 
            type: "SPEAK", spriteName: "Player",
            text: "This door is locked!"
        },
        { 
            type: "SPEAK", spriteName: "Player",
            text: "I need to find some way to open it..."
        }
    ]
}

const unlockDoorEvent = {
    scenes: [
        { 
            type: "SPEAK", spriteName: "Player",
            sfx: "misc/Heavy-Door-Lock--Unlocking.mp3", text: "Let's unlock this door now..."
        }
    ]
}
/**
 * I_Hitbox extension that trigger the GAME.switchMap function if the player is in blockedRange
 * this.to stores the name of the map where the door leads to.
 */
class Door extends I_Hitbox {
    constructor( x, y, door ) {
        super( x, y, GRID_BLOCK_PX * .75 )
        this.from           = door.from;
        this.to             = door.to;
        this.directionIn    = door.directionIn
        this.directionOut   = door.directionOut
        this.locked         = door.locked
        this.arcColor       = "#FFFF00";

        if ( door.condition && !inUnlockedDoorsRegistry( this.from + "_" + this.directionIn + "_" + this.to ) ) {
            this.condition = true;
            this.conditionType = door.condition.type;
            this.conditionValue = door.condition.value
        }
        else {
            this.condition = false;
        }

        this.metConditionAtLastCheck = ( this.meetsCondition && this.conditionType != ITEM_OWNED );
    }
    get meetsCondition( ) { 
        return !this.condition || conditionIsTrue( this.conditionType, this.conditionValue );
    }
    handle( ) {
        if ( !this.meetsCondition ) {
            new Cinematic( lockedDoorEvent, "ON_NPC_INTERACTION" )
        }
        else if ( this.condition ) {
            new Cinematic( unlockDoorEvent, "ON_LEAVE", [ this.to, "DOOR"] )
            this.metConditionAtLastCheck = true;
            addDoorToUnlockedDoorsRegistry( this.from + "_" + this.directionIn + "_" + this.to )
        }
    }
    dismiss( ) {
        globals.GAME.activeAction = null;
    }
    /**
     * Override of the base checkForBlockedRange.
     * If super.checkForBlockedRange, call GAME.switchMap to go the the map in the this.to prop.
     * @param {I_Hitbox} targetHitbox 
     * @param {String} targetDirection 
     */
    checkForBlockedRange( targetHitbox, targetDirection ) {
        if ( super.checkForBlockedRange( targetHitbox, targetDirection ) ) {
            if ( ( this.meetsCondition && this.metConditionAtLastCheck ) || !this.condition ) {
                globals.GAME.switchMap( this.to, "DOOR" );
                globals.GAME.sound.playEffect( "misc/random5.wav" );
            }
        }
    }
}

module.exports = {
    Door
}