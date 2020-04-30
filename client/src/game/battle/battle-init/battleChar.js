const res           = require('../../../resources/resourceStrings')
const state         = require('../../../game-data/state')
const Sound         = require('../../interfaces/I_Sound').Sound
const BattleStats      = require('../battle-ui/battleStats').BattleStats
const CharacterBlueprint  = require('../../character/character-init/characterBlueprint').CharacterBlueprint
const BattleSprite  = require('./battleSprite').BattleSprite

class BattleChar {
    constructor( isPlayer, name, className, xy ) {
        const spriteSrc = '/static/battlesprites/' + className.toLowerCase() + ( ( isPlayer ) ? '_fight.png' : '_fight_L.png' ) 
        this.sprite     = new BattleSprite( xy, spriteSrc, true )
        this.character  = new CharacterBlueprint( name, className )
        this.statsBar   = new BattleStats( this.character, isPlayer )
        this.name       = name,
        this.className  = className,
        this.moves      = this.character.moves
        this.hasTurn    = false;
        this.isPlayer   = isPlayer;
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
         
        defender.stats.Health -= ( attacker.stats.Attack - defender.stats.Defence )
        this.sprite.setShout( res.getBattleShout( this.className, "FIGHT" ) )
    }

    animateAttack( tilesheetPositionArray ) {
        this.sprite.animateAttack( tilesheetPositionArray )
    }

    setMoveMenu( ) {
        state.battleState.menuIsActive = true;
        state.battleState.textContainer.setMoveMenu( )
        this.sprite.initBattleMovesMenu( this.moves )
    }
    
    unsetMoveMenu( ) {
        state.battleState.menuIsActive = false;;
        state.battleState.textContainer.unsetMoveMenu(  )    
        this.sprite.initBattleUI( )     
        this.sprite.setButtonAsActive( "2" )
    }

    activateUI( par = false ) {
        this.sprite.activateUI( par )
    }

    deActivateUi( ) {
        this.sprite.hasActiveButton = false;
        this.sprite.buttonSprites.forEach( (e) => { e.setActive( false ) } )
    }

    draw( ) {
        this.sprite.drawSprite();
        /* this.statsBar.drawStats(); */
    }
}

module.exports = {
    BattleChar
}