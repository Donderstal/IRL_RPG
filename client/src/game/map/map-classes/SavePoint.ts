import { GRID_BLOCK_PX } from "../../../game-data/globals";
import { getEffect, GraphicalEffect } from "../../../helpers/effectHelpers";
import { PLAYER_ID, PLAYER_NAME } from "../../../game-data/interactionGlobals";
import { InteractionType } from "../../../enumerables/InteractionType";
import { ConditionType } from "../../../enumerables/ConditionTypeEnum";
import { SceneAnimationType } from "../../../enumerables/SceneAnimationTypeEnum";
import type { Tile } from "../../core/Tile";
import { initInteractionModel } from "../../../helpers/modelFactory";
import { getDebugModeGameState } from "../../gameState/gameState";
import { FX_BLUE_SQUARE } from "../../../resources/effectResources";
import { ActionSelector } from "./ActionSelector";

const actionData = [
    InteractionType.save, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speakYesNo, true, "Save the game?",
        [
            [[SceneAnimationType.speak, true, "Game saved!"]]
        ],
        [
            [[SceneAnimationType.speak, true, "Why did you press the button then?"]]
        ],
           PLAYER_NAME
        ]],
    ]
]

export class SavePoint extends ActionSelector { 
    spriteId: string;
    effect: GraphicalEffect;
    constructor( tile: Tile ) {
        let x = tile.x + ( GRID_BLOCK_PX / 2 )
        let y = tile.y + ( GRID_BLOCK_PX / 2 )
        super( x, y, [initInteractionModel( actionData )], PLAYER_ID )

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