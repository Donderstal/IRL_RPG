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

            this.members.forEach( ( e ) => {
                console.log(e)
                setTimeout( ( ) => {
                    e.animateAttack( e.nextMove.animation )
                }, 500 )
            })            
            
            setTimeout( ( ) => {
                this.activeMemberIndex = 0;                
                this.activeMember = this.members[this.activeMemberIndex];
                this.activeMember.activateUI( true )
            }, 2000 )
        }
    }
}

module.exports = {
    Party
}