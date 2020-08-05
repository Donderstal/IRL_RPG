const BattleChar = require('./battle-init/battleChar').BattleChar
const state = require('../../game-data/state')

class Party {
    constructor( partyMembers, isPlayerParty ) {
        this.isPlayer           = ( isPlayerParty == "PLAYER" ) ? true : false;
        this.inMoveSelection    = false;
        this.members            = [ ];
        this.partySize          = partyMembers.length
        partyMembers.forEach( ( newMember, index ) => {
            this.members.push( new BattleChar( newMember[0], newMember[1], newMember[2], newMember[3], index ) );
        } );

        this.activeMemberIndex  = -1;
        this.targetIndex        = 0;
    }

    get isDefeated( ) {
        console.log( 'is party defeated?' )
        for ( var i = 0; i < this.partySize; i++ ) {
            if ( !this.members[i].isDefeated ) {
                return false;
            }
        }

        return true;
    }

    get isMemberAtNextIndex( ) {
        const nextIndex = ( this.activeMemberIndex + 1 ) == this.partySize ? 0 : this.activeMemberIndex + 1;
        return  ( this.members[nextIndex].isDefeated == false )
    }

    get isMemberAtPreviousIndex( ) {
        const previousIndex = ( this.activeMemberIndex - 1 ) < 0 ? this.partySize - 1 : this.activeMemberIndex - 1;
        return  ( this.members[previousIndex].isDefeated == false  )
    }

    getNextPartyMember( ) {
        if ( this.activeMemberIndex != -1 ) {
            this.activeMember.deActivateUi( );      
        }

        if ( this.activeMemberIndex < this.partySize - 1 ) {
            this.activeMemberIndex += 1
            this.members[this.activeMemberIndex].active = true;
            this.activeMember = this.members[this.activeMemberIndex]
            if ( this.activeMemberIndex != 0 ) {   
                state.battleState.battleUI.switchSlot( this.activeMemberIndex, this.members );      
            }
            this.activeMember.activateUI();
        }
        else {
            this.activeMember.deActivateUi( );
            this.inMoveSelection = false;
        }
    }

    getPreviousPartyMember( ) {
        this.activeMember.nextMove = null;
        this.activeMember.deActivateUi( );      

        if ( this.activeMemberIndex - 1 != -1 ) {
            this.activeMemberIndex -= 1
            this.members[this.activeMemberIndex].active = true;
            this.activeMember = this.members[this.activeMemberIndex]
            state.battleState.battleUI.switchSlot( this.activeMemberIndex, this.members ); 
            this.activeMember.activateUI();
        } 
    }

    activateTarget( newTargetIndex ) {
        this.members[this.targetIndex].deTarget( );
        this.targetIndex = newTargetIndex
        this.members[this.targetIndex].target( );
    }

    getFirstUndefeatedCharacterIndex( ) {
        for ( var i = 0; i < this.partySize; i++ ) {
            if ( !this.members[i].isDefeated ) {
                console.log( "First undefeated character: " + i )
                return i
            }
        }
    }

    prepareMoveSelection( ) {
        this.activeMemberIndex = -1;
        this.inMoveSelection = true;
        this.getNextPartyMember( );
    }

    selectMoves( ) {
        this.members.forEach( ( e ) => {
            if ( !e.isDefeated ) {
                let movesArray = e.moves;
                movesArray[4] = e.standardAttack;

                e.nextMove = e.moves[Math.floor(Math.random() * Math.floor(e.moves.length))]
                e.nextMove.targetIndex = Math.floor(Math.random() * Math.floor(state.battleState.opponentParty.members.length))                
            }
        } )
    }
}

module.exports = {
    Party
}