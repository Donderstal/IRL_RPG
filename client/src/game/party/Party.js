const { Character } = require('../character/Character');
const { Inventory } = require('./Inventory');
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
            this.members.push( new Character( newMember.name, 5, "no", 5, newMember.className ) );
        } );
        
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
}

module.exports = {
    Party
}