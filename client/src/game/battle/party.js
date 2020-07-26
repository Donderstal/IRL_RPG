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

        this.activeMember       = this.members[0]
        state.battleState.battleMenu.activeCharacter = this.activeMember;
        this.activeMemberIndex  = 0;
        this.targetIndex        = 0;
    }

    getNextPartyMember( ) {
        this.activeMember.deActivateUi( );
        if ( this.activeMemberIndex < this.partySize - 1 ) {
            this.activeMemberIndex += 1
            this.members[this.activeMemberIndex].active = true;
            this.activeMember = this.members[this.activeMemberIndex]
            this.activeMember.activateUI();
        }
        else {
            this.inMoveSelection = false;
        }
    }

    activateTarget( newTargetIndex ) {
        this.members[this.targetIndex].deTarget( );
        this.targetIndex = newTargetIndex
        this.members[this.targetIndex].target( );
    }

    prepareMoveSelection( ) {
        this.inMoveSelection = true;
        this.activeMemberIndex = 0;
        this.activeMember = this.members[this.activeMemberIndex];
        this.activeMember.activateUI();
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