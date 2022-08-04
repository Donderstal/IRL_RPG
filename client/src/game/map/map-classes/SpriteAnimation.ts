import { FRAME_LIMIT } from "../../../game-data/globals";
import type { SpriteAnimationModel } from "../../../models/SpriteAnimationModel";
import type { SpriteFrameModel } from "../../../models/SpriteFrameModel";
import type { Sprite } from "../../core/Sprite";

export class SpriteAnimation {
    model: SpriteAnimationModel;
    index: number;
    currentLoop: number;
    framesInAnimation: number
    animationFinished: boolean;
    constructor( model: SpriteAnimationModel ) {
        this.model = model;
        this.index = 0;
        this.currentLoop = 0;
        this.framesInAnimation = model.frames.length;
        this.animationFinished = false;
    }

    spriteAnimationCounter( sprite: Sprite ): void {
        sprite.countFrame();
        this.checkFrameLimit( sprite );
        sprite.setActiveFrame( this.getActiveFrame() );
        this.checkForAnimationEnd();
    }

    getActiveFrame(): SpriteFrameModel {
        return this.model.frames[this.index];
    }

    checkFrameLimit( sprite: Sprite ): void {
        if ( sprite.frameCount >= FRAME_LIMIT ) {
            sprite.frameCount = 0;
            this.index++;
        }
    }

    checkForAnimationEnd(): void {
        if ( this.index + 1 == this.framesInAnimation ) {
            this.checkForLoop()
        }
    }

    checkForLoop(): void {
        const currentLoopIsLast = this.model.loops == this.currentLoop

        if ( this.model.looped && ( this.model.loops == null || !currentLoopIsLast ) ) {
            this.currentLoop++
            this.index = 0;
        }
        else {
            this.animationFinished = true;
        }
    }

}