const BattleChar = require('./battle-init/battleChar').BattleChar
const state = require('../../game-data/state')

class Party {
    constructor( partyMembers, isPlayerParty ) {
        this.isPlayer           = ( isPlayerParty == "PLAYER" ) ? true : false;
        this.inMoveSelection    = false;
        this.members            = [ ];
        this.partySize          = partyMembers.length
        partyMembers.forEach( ( newMember, index ) => {
            this.members.push( new BattleChar( newMember[0], newMember[1], newMember[2], newMember[3], index ) )
        } )

        this.activeMemberIndex = -1
        this.targetIndex        = 0;
        if ( this.isPlayer ) {
            this.getNextPartyMember( );
        }
    }

    getNextPartyMember( ) {
        if ( this.activeMemberIndex != -1 ) {
            this.activeMember.deActivateUi( );            
        }

        if ( this.activeMemberIndex < this.partySize - 1 ) {
            this.activeMemberIndex += 1
            this.members[this.activeMemberIndex].active = true;
            this.activeMember = this.members[this.activeMemberIndex]
            this.activeMember.activateUI();
        }
        else {
            this.activeMember.deActivateUi( );
            this.inMoveSelection = false;
        }
    }

    activateTarget( newTargetIndex ) {
        this.members[this.targetIndex].deTarget( );
        this.targetIndex = newTargetIndex
        this.members[this.targetIndex].target( );
    }

    prepareMoveSelection( ) {
        this.activeMemberIndex = -1;
        this.inMoveSelection = true;
        this.getNextPartyMember( );
    }

    selectMoves( ) {
        this.members.forEach( ( e ) => {
            e.nextMove = e.moves[Math.floor(Math.random() * Math.floor(e.moves.length))]
            e.nextMove.targetIndex = Math.floor(Math.random() * Math.floor(state.battleState.opponentParty.members.length))
        } )
    }
}

module.exports = {
    Party
}