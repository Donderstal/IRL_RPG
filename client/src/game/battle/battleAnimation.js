const handleBattleAnimations = ( GAME ) => {
    GAME.FRONT.battleSlots.forEach( ( slot ) => { slot.drawSpriteInSlot( ); } );
}

module.exports = { 
    handleBattleAnimations
};