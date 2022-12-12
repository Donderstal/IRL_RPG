import { GRID_BLOCK_PX } from "../../../game-data/globals";
import { getEffect, GraphicalEffect } from "../../../helpers/effectHelpers";
import { PLAYER_ID } from "../../../game-data/interactionGlobals";
import type { Tile } from "../../core/Tile";
import { getDebugModeGameState } from "../../gameState/gameState";
import { FX_BLUE_SQUARE } from "../../../resources/effectResources";
import { ActionSelector } from "./ActionSelector";
import { loggedIn } from "../../../game-container/stores";
import { get } from "svelte/store";
import { INTERACTION_SAVE_GAME, INTERACTION_SAVE_NOT_LOGGED_IN } from "../../../resources/mapResources/interactionResources";
import type { InteractionModel } from "../../../models/InteractionModel";

const getInteraction = (): InteractionModel => {
    if ( get(loggedIn) ) {
        return INTERACTION_SAVE_GAME;
    }
    else {
        return INTERACTION_SAVE_NOT_LOGGED_IN
    }
}

export class SavePoint extends ActionSelector { 
    spriteId: string;
    effect: GraphicalEffect;
    constructor( tile: Tile ) {
        let x = tile.x + ( GRID_BLOCK_PX / 2 )
        let y = tile.y + ( GRID_BLOCK_PX / 2 )
        super( x, y, [getInteraction()], PLAYER_ID )

        this.initSavePointEffect();
        this.spriteId   = PLAYER_ID;
    }

    initSavePointEffect(): void {
        this.effect = getEffect( FX_BLUE_SQUARE, this.x, this.y ); 
    }

    draw(): void {
        this.effect.drawBack( this.x - ( this.effect.effects[0].width / 2 ), this.y - ( this.effect.effects[0].height / 2 ) )
        if ( getDebugModeGameState() ) {
            super.draw();
        }
    }
}