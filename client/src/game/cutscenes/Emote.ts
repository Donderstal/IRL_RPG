import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
import globals from '../../game-data/globals';
import { drawFromImageToCanvas } from "../../helpers/canvasHelpers";

export class Emote { 
    x: number;
    y: number;
    image: HTMLImageElement;
    type: SceneAnimationType
    constructor( location, src ) {
        this.x = location.x;
        this.y = location.y - globals.GRID_BLOCK_PX;
        this.image = globals.PNG_DICTIONARY[src];
        this.type = SceneAnimationType.emote
    }

    draw( ): void {
        drawFromImageToCanvas( 
            "FRONT", this.image,
            0, 0, globals.GRID_BLOCK_IN_SHEET_PX, globals.GRID_BLOCK_IN_SHEET_PX,
            this.x, this.y, globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX
        ) 
    }
}