const res                   = require('../../../resources/resourceStrings')
const state                 = require('../../../game-data/state')
const battleGlobals         = require('../battleGlobals')
const Sound                 = require('../../interfaces/I_Sound').Sound
const BattleStats           = require('../battle-ui/battleStats').BattleStats
const moveAnimationScripts  = require('../../character/character-resources/moveAnimationScripts')
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
        this.moves          = this.character.moves
        this.hasTurn        = false;
        this.isPlayer       = isPlayer;
        this.isDefeated     = this.character.HP > 0 ? false : true;
        this.standardAttack = this.character.standardAttack
        this.startingAttrs  = Object.assign( {}, this.character.attributes );
        this.nextMove, this.nextMoveTarget

        this.getMoves( );
    }

    getMoves( ) {
        let directionSuffix = ( this.sprite.initialRow == battleGlobals.SHEET_ROW_BATTLE_LEFT ) ? "_L" : "_R";

        for ( var i = 0; i < this.moves.length; i++ ) {
            let classAnimations = moveAnimationScripts[this.className]
            this.moves[i].animation = classAnimations[this.moves[i].animation + directionSuffix]
        }
    }

    animateHit( ) {
        this.sprite.animateHit()
    }

    animateAttack( ) {
        const sfx = new Sound( "battle-baba.mp3", true )
        sfx.play()
        this.sprite.animateAttack( this.nextMove.animation )
        this.sprite.setShout(res.getBattleShout( this.className, "FIGHT" ))
    }

    chooseMove( moveIndex, moveTarget ) {
        this.nextMoveTarget = moveTarget;
        this.nextMove       = this.moves[moveIndex].doDamage
    }

    doMove( targetCharacter ) {
        this.animateAttack(  );
        let moveResult = this.character.getMoveResult( this.nextMove, targetCharacter.character )
        targetCharacter.animateHit( );
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
            this.sprite.drawSprite();
            this.statsBar.draw( );            
        }
    }
}

module.exports = {
    BattleChar
}