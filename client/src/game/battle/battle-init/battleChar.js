const res                   = require('../../../resources/resourceStrings')
const state                 = require('../../../game-data/state')
const globals               = require('../../../game-data/globals')
const Sound                 = require('../../interfaces/I_Sound').Sound
const BattleStats           = require('../battle-ui/battleStats').BattleStats
const moveAnimationScripts  = require('../../character/character-resources/moveAnimationScripts')
const CharacterBlueprint    = require('../../character/character-init/characterBlueprint').CharacterBlueprint
const BattleSprite          = require('./battleSprite').BattleSprite

class BattleChar {
    constructor( isPlayer, name, className, xy, index ) {
        const spriteSrc = '/static/sprites/' + className.toLowerCase() + '.png' 
        this.sprite     = new BattleSprite( xy, spriteSrc, isPlayer )
        this.character  = new CharacterBlueprint( name, className )
        this.statsBar   = new BattleStats( this, isPlayer, index )
        this.name       = name,
        this.index      = index
        this.className  = className,
        this.moves      = this.character.moves
        this.hasTurn    = false;
        this.isPlayer   = isPlayer;
        this.nextMove, this.nextMoveTarget

        this.getMoves( )
    }

    getMoves( ) {
        console.log(moveAnimationScripts)
        let directionSuffix;
        if ( this.sprite.initialRow == globals.SHEET_ROW_BATTLE_LEFT ) {
            directionSuffix = "_L";
        }
        else {
            directionSuffix = "_R";
        }

        for ( var i = 0; i < this.moves.length; i++ ) {
            console.log(this.className)
            let classAnimations = moveAnimationScripts[this.className]
            this.moves[i].animation = classAnimations[this.moves[i].animation + directionSuffix]
        }
    }

    animateHit( ) {
        this.sprite.animateHit()
    }

    standardAttack( ) {
        const battleState = state.battleState
        const sfx = new Sound( "battle-baba.mp3", true )
        sfx.play()
        this.animateAttack( )

        let attacker = this.isPlayer ? battleState.player.character : battleState.opponent.character;
        let defender = this.isPlayer ? battleState.opponent.character : battleState.player.character;
         
        defender.stats.HP -= ( attacker.stats.Attack - defender.stats.Defence )
        this.sprite.setShout( res.getBattleShout( this.className, "FIGHT" ) )
    }

    animateAttack( tilesheetPositionArray ) {
        this.sprite.animateAttack( tilesheetPositionArray )
    }

    chooseMove( moveIndex, moveTarget ) {
        this.nextMoveTarget = moveTarget;
        this.nextMove       = this.moves[moveIndex].doDamage
    }

    doMove( moveTarget ) {
        this.nextMove( this.character, moveTarget )
    }

    target( ) {
        this.targeted = true;
        const moveName = state.battleState.playerParty.activeMember.nextMove.name
        state.battleState.targetedCharacter = this
        state.battleState.textContainer.setText( "Use  " + moveName + " on " + this.name )
        this.sprite.target()
    }

    deTarget( ) {
        this.targeted = false;
        this.sprite.deTarget()
    }

    activateUI( ) {
        state.battleState.textContainer.setText( "Choose your move!" )
        state.battleState.battleMenu.activeCharacter = this;
        this.sprite.activateUI( );
    }

    deActivateUi( ) {
        this.sprite.deActivateUI( )
    }

    draw( ) {
        this.sprite.drawSprite();
        this.statsBar.draw( );
    }
}

module.exports = {
    BattleChar
}