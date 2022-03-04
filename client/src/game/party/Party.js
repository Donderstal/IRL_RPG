const { Character } = require('./Character');
const { Inventory } = require('./Inventory');

const globals = require('../../game-data/globals');
const { getUniqueId } = require('../../helpers/utilFunctions');
/**
 * A Party is a set of Character instances with a shared Inventory instance.
 * It is instantiated for the player on starting a new Game.
 * A Party is also instantiated for the opponents of the player when a battle begins.
 */
class Party {
    constructor( partyMembers ) {
        this.memberIds          = [ ];
        this.members            = [ ];
        this.inventory          = new Inventory( );
        this.characterOnMapId   = "";

        partyMembers.forEach(this.addMember.bind(this));        
    }
    get characterActiveOnMap( ) { return this.members.filter((e)=>{ return e.Id == this.characterOnMapId })[0]; }
    get partySize() { return partyMembers.length; }
    /**
     * Instantiate a Character and add it to the this.members array;
     * @param {object} memberData 
     */
    addMember( memberData ) {
        const id = getUniqueId( this.memberIds );
        this.members.push( new Character( memberData.name, memberData.className, id ) );
    }
    /**
     * Remove member with given id from Party properties
     * @param {string} id
     */
    removeMember( id ) {
        this.memberIds = this.memberIds.filter((e)=>{ return e != id });
        this.members = this.members.filter((e)=>{ return e.Id != id });
    }
    /**
     * 
     * @param {string} spriteId
     */
    setSpriteAsActiveOnMap( spriteId ) {
        this.characterOnMapId = spriteId
    }
    /**
     * Set the active sprite on the map as the sprite of the party member at given index
     * @param {Number} index 
     */
    switchSprite( index ) {
        this.characterOnMapIndex = index;
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
}

module.exports = {
    Party
}