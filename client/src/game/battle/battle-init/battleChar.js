const res                   = require('../../../resources/resourceStrings')
const state                 = require('../../../game-data/state')
const Sound                 = require('../../interfaces/I_Sound').Sound
const BattleStats           = require('../battle-ui/battleStats').BattleStats
const Move                  = require('../battle-moves/Move').Move
const CharacterBlueprint    = require('../../character/character-init/characterBlueprint').CharacterBlueprint
const BattleSprite          = require('./battleSprite').BattleSprite

class BattleChar {
    constructor( isPlayer, name, className, xy, index ) {
        const spriteSrc     = '/static/sprites/' + className.toLowerCase() + '.png' 
        this.sprite         = new BattleSprite( xy, spriteSrc, isPlayer )
        this.character      = new CharacterBlueprint( name, className, 10 )
        this.statsBar       = new BattleStats( this, isPlayer, index )
        this.name           = name,
        this.index          = index
        this.className      = className,
        this.moves          = []
        this.hasTurn        = false;
        this.isPlayer       = isPlayer;
        this.isDefeated     = this.character.HP > 0 ? false : true;
        this.startingAttrs  = Object.assign( {}, this.character.attributes );
        this.attributes     = Object.assign( {}, this.character.attributes );
        this.nextMove, this.nextMoveTarget

        this.initMoves( )
    }

    initMoves( ) {
        this.standardAttack = new Move( this.character.standardAttack, this )
        this.character.moves.forEach( ( move ) => {
            this.moves.push( new Move( move, this ) )
        } )
    }

    setDestinationAndStartWalking( destination ) {
        this.sprite.setDestination( destination, this.isPlayer ? 4 : 5 )
    }

    animateAttack( animation ) {
        const sfx = new Sound( "battle-baba.mp3", true )
        sfx.play()
        this.sprite.animateAttack( animation )
        this.sprite.setShout(res.getBattleShout( this.className, "FIGHT" ))
    }

    doMove( targetCharacter ) {
        let moveResult = this.character.getMoveResult( this.nextMove, targetCharacter.character )
        setTimeout( ( ) => {
            this.updateStatsBarAndCheckIfDefeated ( moveResult, targetCharacter )
        }, 500 );
    }

    updateStatsBarAndCheckIfDefeated ( moveResult, targetCharacter ) {
        targetCharacter.statsBar.update( moveResult, null );
        state.battleState.UI.setText( 
            this.name + " does " + moveResult + " damage to " + targetCharacter.name + "!" 
        );

        if ( targetCharacter.isDefeated ) {
            targetCharacter.sprite.fadeOut( );
        }
    }

    target( ) {
        this.targeted = true;
        const moveName = state.battleState.playerParty.activeMember.nextMove.name
        state.battleState.targetedCharacter = this
        state.battleState.UI.setText( "Use  " + moveName + " on " + this.name )
        this.sprite.target()
    }

    deTarget( ) {
        this.targeted = false;
        state.battleState.targetedCharacter = null;
        this.sprite.deTarget()
    }

    activateUI( ) {
        const UI = state.battleState.UI
        UI.setText( "Choose your move!" )
        UI.setCharacterAsActive( this );
        this.sprite.activateUI( );
    }

    deActivateUi( ) {
        this.sprite.deActivateUI( )
    }

    draw( ) {
        if ( !this.isDefeated ) {
            this.sprite.draw();
            this.statsBar.draw( );            
        }
    }
}

module.exports = {
    BattleChar
}