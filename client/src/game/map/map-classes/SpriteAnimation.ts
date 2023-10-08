import { FRAME_LIMIT } from "../../../game-data/globals";
import type { SpriteAnimationModel } from "../../../models/SpriteAnimationModel";
import type { FrameModel } from "../../../models/SpriteFrameModel";
import type { Sprite } from "../../core/Sprite";

export class SpriteAnimation {
    model: SpriteAnimationModel;
    index: number;
    currentLoop: number;
    framesInAnimation: number
    animationFinished: boolean;
    loops: number;
    looped: boolean;
    contractId: string;
    constructor( model: SpriteAnimationModel, contractId: string ) {
        this.model = model;
        this.index = 0;
        this.currentLoop = 0;
        this.framesInAnimation = model.frames.length;
        this.animationFinished = false;
        this.loops = model.loops;
        this.looped = model.looped;
        this.contractId = contractId;
    }

    spriteAnimationCounter( sprite: Sprite ): void {
        sprite.countFrame();
        this.checkFrameLimit( sprite );
        sprite.setActiveFrame( this.getActiveFrame() );
        this.checkForAnimationEnd();
    }

    getActiveFrame(): FrameModel {
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
            if ( !this.looped ) {
                if ( this.loops === this.currentLoop ) {
                    this.animationFinished = true;
                    return;
                }
                else {
                    this.currentLoop++;
                }
            }
            this.index = 0;
        }
    }
}