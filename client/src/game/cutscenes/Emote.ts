import { getUiImage } from '../../assets/ui';
import { SceneAnimationType } from '../../enumerables/SceneAnimationTypeEnum';
import { GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_PX } from '../../game-data/globals';
import { drawFromImageToCanvas } from '../../helpers/canvasHelpers';

export class Emote { 
    x: number;
    y: number;
    image: HTMLImageElement;
    type: SceneAnimationType
    constructor( location, src ) {
        this.x = location.x;
        this.y = location.y - GRID_BLOCK_PX;
        this.image = getUiImage( src );
        this.type = SceneAnimationType.emote
    }

    draw( ): void {
        drawFromImageToCanvas( 
            this.image,
            0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
            this.x, this.y, GRID_BLOCK_PX, GRID_BLOCK_PX
        ) 
    }
}