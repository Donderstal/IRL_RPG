/**
 * Sort active slots based on the position of their associated sprite in the grid.
 * Then, draw them in sorted order to simulate depth.
 * @param {Game} GAME active Game instance
 */
const handleBattleAnimations = ( GAME ) => {
    const slots = [...GAME.FRONT.battleSlots];
    slots.sort( ( a, b ) => {
        if ( a.sprite.row > b.sprite.row || a.sprite.row === b.sprite.row && a.sprite.y > b.sprite.y ) {
            return 1 
        }
        else if (b.sprite.row > a.sprite.row || b.sprite.row === a.sprite.row && b.sprite.y > a.sprite.y ) {
            return -1
        }
        else {
            return 0
        }          
    })
    slots.forEach( ( slot ) => { 
        if ( slot.character.isLiving || slot.inFadeOutAnimation ) {
            slot.drawSpriteInSlot( );             
        }
    } );

    GAME.FRONT.activeEffects.forEach( ( e ) => {
        e.drawAndMove( );
    })

    GAME.battle.textContainer.drawTextBox( );
}

module.exports = { 
    handleBattleAnimations
};