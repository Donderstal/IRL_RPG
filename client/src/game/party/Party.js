const { Character } = require('../character/Character');
const { Inventory } = require('./Inventory');
const { handleMoveExecution } = require('../../helpers/moveHelpers')

const globals = require('../../game-data/globals');
/**
 * A Party is a set of Character instances with a shared Inventory instance.
 * It is instantiated for the player on starting a new Game.
 * A Party is also instantiated for the opponents of the player when a battle begins.
 */
class Party {
    constructor( partyMembers, isPlayerParty ) {
        this.isPlayer           = isPlayerParty;
        this.inMoveSelection    = false;
        this.members            = [ ];
        this.partySize          = partyMembers.length
        this.inventory          = new Inventory( );
        
        partyMembers.forEach( ( newMember, index ) => {
            this.members.push( new Character( newMember.name, newMember.className, newMember.level ) );
        } );        

        this.memberActiveOnMapIndex = 0;
    }

    get isDefeated( ) {
        for ( var i = 0; i < this.partySize; i++ ) {
            if ( !this.members[i].isDead ) {
                return false;
            }
        }

        return true;
    }
    /**
     * Set the active sprite on the map as the sprite of the party member at given index
     * @param {Number} index 
     */
    switchSprite( index ) {
        this.memberActiveOnMapIndex = index;
        const selectedPlayer = this.members[index];
        globals.GAME.PLAYER.sheet = selectedPlayer.Sprite;
    }
    /**
     * Call the addItemsToInnerListByID method of this.inventory with itemIDList as argument
     * @param {String[]} itemIDList list of item IDs. ItemIDs are the keys of the itemData properties in the itemresources file
     */
    addItemsToInventory( itemIDList ) {
        this.inventory.addItemsToInnerListByID( itemIDList );
    }
    /**
     * Call the removeItemsFromInnerListByID method of this.inventory with itemIDList as argument
     * @param {String[]} itemIDList list of item IDs. ItemIDs are the keys of the itemData properties in the itemresources file
     */
    removeItemsFromInventory( itemIDList ) {
        this.inventory.removeItemsFromInnerListByID( itemIDList )
    }

    doMoveOnTarget( move, moveTarget, performer ) {
        handleMoveExecution( move, moveTarget, performer )
    }
}

module.exports = {
    Party
}