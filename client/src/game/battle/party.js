const BattleChar = require('./battle-init/battleChar').BattleChar

const maxPartySize = 3

class Party {
    constructor( partyMembers, isPlayerParty ) {
        this.isPlayer           = ( isPlayerParty == "PLAYER" ) ? true : false;
        this.inMoveSelection    = false;
        this.members            = [ ];
        this.partySize          = partyMembers.length
        partyMembers.forEach( ( newMember ) => {
            this.members.push( new BattleChar( newMember[0], newMember[1], newMember[2], newMember[3] ) )
        } )

        this.activeMember       = this.members[0]
        this.activeMemberIndex  = 0;
    }

    getNextPartyMember( ) {
        this.activeMember.deActivateUi( );
        if ( this.activeMemberIndex + 1 < this.partySize ) {
            this.activeMemberIndex += 1
            this.activeMember = this.members[this.activeMemberIndex]
            this.activeMember.activateUI()
        }
        else {
            this.inMoveSelection = false;
        }
    }

    prepareMoveSelection( ) {
        this.inMoveSelection = true;
        this.activeMemberIndex = 0;
        this.activeMember = this.members[this.activeMemberIndex]
        this.activeMember.activateUI( true );
    }

    selectMoves( ) {
        this.members.forEach( ( e ) => {
            e.nextMove = e.moves[Math.floor(Math.random() * Math.floor(e.moves.length))]
        } )
    }
}

module.exports = {
    Party
}