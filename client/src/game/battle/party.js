const BattleChar = require('./battle-init/battleChar').BattleChar

const maxPartySize = 3

class Party {
    constructor( partyMembers, isPlayerParty ) {
        this.isPlayer           = ( isPlayerParty == "PLAYER" ) ? true : false;
        this.inMoveSelection    = false;
        this.members            = [ ];

        console.log(partyMembers)

        partyMembers.forEach( ( newMember ) => {
            this.members.push( new BattleChar( newMember[0], newMember[1], newMember[2], newMember[3] ) )
        } )
    }
}

module.exports = {
    Party
}