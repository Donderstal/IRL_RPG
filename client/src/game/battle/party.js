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
        for ( var i = 0; i < this.partySize; i++ ) {
            if ( !this.members[i].isDefeated ) {
                return false;
            }
        }

        return true;
    }

    getMemberStatuses( ) {
        const memberStatuses = { };
        this.members.forEach( ( member, index ) => {
            memberStatuses[index] = member.isDefeated;
        } );

        return memberStatuses;
    }

    findNextActiveMemberIndex( modifier, loop, currentIndex = this.activeMemberIndex ) {
        const memberStatuses = this.getMemberStatuses( );
        
        if ( this.partySize != 1 ) {
            if ( modifier == "NEXT" ) {
                for ( var i = currentIndex; i < Object.keys(memberStatuses).length; i++  ) { 
                    if ( i != currentIndex && !memberStatuses[i] ) {
                        return i;                
                    }
                }
                if ( loop ) {
                    for ( var i = 0; i <= currentIndex; i++  ) { 
                        if ( i != currentIndex && !memberStatuses[i] ) {
                            return i;                
                        }
                    }
                }
            }
            else if ( modifier == "PREV" ) {
                for ( var i = currentIndex; i >= 0; i-- ) { 
                    if ( i != currentIndex && !memberStatuses[i] ) {
                        return i;                
                    }
                } 
                if ( loop ) {
                    for ( var i = Object.keys(memberStatuses).length - 1; i >= currentIndex; i-- ) { 
                        if ( i != currentIndex && !memberStatuses[i] ) {
                            return i;                
                        }
                    }
                }
            }
        }

        return false;
    }

    getNextPartyMember( ) {
        if ( this.activeMemberIndex != -1 ) {
            this.activeMember.deActivateUi( );      
        }

        const newIndex = this.findNextActiveMemberIndex( "NEXT", false )

        if ( this.activeMemberIndex < this.partySize - 1 && newIndex !== false ) {
            this.activeMemberIndex += 1
            this.members[this.activeMemberIndex].active = true;
            this.activeMember = this.members[this.activeMemberIndex]
            if ( this.activeMemberIndex != 0 ) {   
                state.battleState.UI.switchSlot( this.activeMemberIndex, this.members );      
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
        
        const newIndex = this.findNextActiveMemberIndex( "PREV", false )

        if ( this.activeMemberIndex - 1 != -1 && newIndex !== false ) {
            this.activeMemberIndex -= 1
            this.members[this.activeMemberIndex].active = true;
            this.activeMember = this.members[this.activeMemberIndex]
            state.battleState.UI.switchSlot( this.activeMemberIndex, this.members ); 
            this.activeMember.activateUI();
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