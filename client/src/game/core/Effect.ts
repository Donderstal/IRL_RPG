import type { SpriteFrameModel } from "../../models/SpriteFrameModel";

import { getEffectData } from "../../resources/effectResources";
import { FRAME_LIMIT, GRID_BLOCK_PX } from "../../game-data/globals";
import { drawFromImageToCanvas } from "../../helpers/canvasHelpers";
import { getTilesheetPng } from "../../assets/tilesheets";
/**
 * Effect instances represent a ( part of ) a graphical effect in the game.
 */
export class Effect {
    name: string;
    x: number;
    y: number;
    frameWidth: number;
    frameHeight: number;
    width: number;
    height: number;

    src: string;
    sheet: HTMLImageElement;

    frames: Frame[];
    frameCount: number;
    sheetFrameLimit: number;
    activeFrameIndex: number;
    active: boolean;
    constructor( name: string, x: number, y: number ) {
        this.name   = name;
        this.x      = x;
        this.y      = y;
        this.frames = [];

        this.frameCount = 0;    
        this.activeFrameIndex = 0;

        this.setEffectData( )
    }

    get activeFrame( ) { return this.frames[this.activeFrameIndex]; };

    initialiseAnimationFrames( frames: { x: number, y: number }[] ): void {
        frames.forEach( ( frameData ) => {
            this.pushFramesToList( frameData );
        })
        this.sheetFrameLimit = frames.length;
    }

    pushFramesToList( frameData: { x: number, y: number } ): void {
        this.frames.push( 
            new Frame( 
                frameData.x, frameData.y, 
                this.frameWidth, this.frameHeight
            )
        )
    }

    setEffectData(): void {
        const data      = getEffectData( this.name );
        this.frameWidth = data.frameWidth;
        this.frameHeight = data.frameHeight;
        this.width  = data.widthInBlocks * GRID_BLOCK_PX;
        this.height = data.heightInBlocks * GRID_BLOCK_PX;
        
        this.setSprite( data.src );
        this.initialiseAnimationFrames( data.frames );
    }

    countFrame(): void {
        this.frameCount++ 
        
        if ( this.frameCount >= FRAME_LIMIT ) {
            this.frameCount = 0;
            this.activeFrameIndex++;

            if (this.activeFrameIndex >= this.sheetFrameLimit ) {
                this.activeFrameIndex = 0;
            }
        }
    }

    deActivate(): void {
        this.active = false;
    }

    setSprite( src: string ): void {
        this.src        = src;
        this.sheet      = getTilesheetPng( src );
        this.active     = true;
    }

    updateXY( x: number, y: number ): void {
        this.x = x;
        this.y = y;
    }

    draw( x: number, y: number ): void {
        this.updateXY( x, y )
        if ( this.active ) {
            this.activeFrame.draw( this.sheet, this.x, this.y, this.width, this.height );
            this.countFrame( );
        }
    }

}

class Frame { 
    model: SpriteFrameModel
    constructor( x: number, y: number, width: number, height: number ) {
        this.model = {
            x: x,
            y: y,
            width: width,
            height: height
        }
    }

    draw( image: HTMLImageElement, x: number, y: number, width: number, height: number ): void {
        drawFromImageToCanvas( 
            image, 
            this.model.x, this.model.y, this.model.width, this.model.height,
            x, y, width, height
        );
    }
}