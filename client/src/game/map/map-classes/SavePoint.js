const { GRID_BLOCK_PX } = require("../../../game-data/globals");
const globals = require("../../../game-data/globals");
const { getEffect } = require("../../../helpers/effectHelpers");
const { MapAction } = require("./MapAction");
const { EVENT_SAVE, SPEAK_YES_NO, SPEAK } = require("../../../game-data/conditionGlobals");
const { getActionObject } = require("../../../helpers/actionDtoFactory");
const { PLAYER_ID } = require("../../../game-data/interactionGlobals");

const actionData = 
    [ EVENT_SAVE, false, "medium-text-blip.ogg", [
        [[SPEAK_YES_NO, "Save the game?",
            [
                [[SPEAK, "Game saved!"]]
            ],
            [
                [[SPEAK, "Why did you press the button then?"]]
            ]
        ]]
    ]]

class Savepoint extends MapAction { 
    constructor( tile ) {
        let x = tile.x + ( GRID_BLOCK_PX / 2 )
        let y = tile.y + ( GRID_BLOCK_PX / 2 )
        super( x, y, getActionObject( actionData[0], actionData[1], actionData[2], actionData[3]  ) )

        this.initSavePointEffect( )
        this.spriteId   = PLAYER_ID;
    }

    initSavePointEffect(  ) {
        this.effect = getEffect( "BLUE_SQUARE", this.x, this.y ); 
    }

    draw( ) {
        this.effect.drawBack( this.x - ( this.effect.effects[0].width / 2 ), this.y - ( this.effect.effects[0].height / 2 ) )
    }

    confirm( ) {
        this.confirmingAction = true;
        globals.GAME.save( );
        this.resetAction( );
    }
}

module.exports = {
    Savepoint
}