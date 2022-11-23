import { GRID_BLOCK_PX } from "../../../game-data/globals";
import { getEffect, GraphicalEffect } from "../../../helpers/effectHelpers";
import { PLAYER_ID, PLAYER_NAME } from "../../../game-data/interactionGlobals";
import { InteractionType } from "../../../enumerables/InteractionType";
import { ConditionType } from "../../../enumerables/ConditionTypeEnum";
import { SceneAnimationType } from "../../../enumerables/SceneAnimationTypeEnum";
import type { Tile } from "../../core/Tile";
import { Hitbox } from "../../core/Hitbox";

const actionData = [
    InteractionType.save, false, null, "medium-text-blip.ogg",
    [ConditionType.default, false],
    [
        [[SceneAnimationType.speakYesNo, true, "Save the game?",
        [
            [[SceneAnimationType.speak, true, "Game saved!"]]
        ],
        [
            [[SceneAnimationType.speak, true, "Why did you press the button then?", false]]
        ],
            false, PLAYER_NAME
        ]],
    ]
]

export class Savepoint extends Hitbox { 
    spriteId: string;
    effect: GraphicalEffect;
    confirmingAction: boolean;
    constructor( tile: Tile ) {
        let x = tile.x + ( GRID_BLOCK_PX / 2 )
        let y = tile.y + ( GRID_BLOCK_PX / 2 )
        super( x, y, GRID_BLOCK_PX / 2 )

        this.initSavePointEffect();
        this.confirmingAction = false;
        this.spriteId   = PLAYER_ID;
    }

    initSavePointEffect(): void {
        this.effect = getEffect( "BLUE_SQUARE", this.x, this.y ); 
    }

    draw(): void {
        this.effect.drawBack( this.x - ( this.effect.effects[0].width / 2 ), this.y - ( this.effect.effects[0].height / 2 ) )
    }

    confirm( ): void {

    }
}