const { Character } = require('../character/Character');
const { Inventory } = require('./Inventory');

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
        
        console.log(this)
    }

    get isDefeated( ) {
        for ( var i = 0; i < this.partySize; i++ ) {
            if ( !this.members[i].isDead ) {
                return false;
            }
        }

        return true;
    }
}

module.exports = {
    Party
}