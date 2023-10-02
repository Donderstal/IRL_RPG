import { GRID_BLOCK_PX } from '../../../game-data/globals';
import type { Sprite } from '../../core/Sprite';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import type { Tile } from '../../core/Tile';
import type { DirectionXy } from '../../../models/DirectionXyModel';
import type { DestinationType } from '../../../enumerables/DestinationType';
import { CanvasTypeEnum } from '../../../enumerables/CanvasTypeEnum';
import { markModuleAsActive, markModuleAsInActive } from '../../modules/moduleRegistrySetter';
import { SpriteModuleEnum } from '../../../enumerables/SpriteModuleEnum';
import { getTileOnCanvasByCell, getTileOnCanvasByXy } from '../../canvas/canvasGetter';
import { isNullOrUndefined } from '../../../helpers/utilFunctions';
import type { GridCellModel } from '../../../models/GridCellModel';

export class Destination {
    type: DestinationType;
    path: DirectionXy[];
    foundPath: boolean;
    currentPathIndex: number;
    pathfindingTries: number;
    inSideStep: boolean;
    reachedDestination: boolean;
    spriteId: string;
    sprite: Sprite;
    contractId: string;
    constructor( path: DirectionXy[], destination: GridCellModel, sprite: Sprite, contractId: string ) {
        this.type = destination.type;
        this.inSideStep = false;
        this.reachedDestination = false;

        this.path = null;
        this.foundPath = false;
        this.currentPathIndex = 0;

        this.pathfindingTries = 0;
        this.spriteId = sprite.spriteId;
        this.sprite = sprite;
        this.contractId = contractId;

        this.startMovingToDestination( path, sprite );
    }

    get currentStep(): DirectionXy { return this.path[this.currentPathIndex]; };
    get nextStep(): DirectionXy { return this.path[this.currentPathIndex + 1]; };
    get hasNextStep(): boolean { return this.nextStep !== undefined; }
    get spriteHasReachedDestination( ): boolean { return this.currentPathIndex === this.path.length - 1; };

    startMovingToDestination( path: DirectionXy[], sprite: Sprite ) {
        this.path = path;
        this.activateSpriteMovementModule( sprite );
        markModuleAsActive( sprite.spriteId, SpriteModuleEnum.movement );
    }

    snapSpriteToCurrentStepTile( ): void {
        this.sprite.y = this.currentStep.y - ( this.sprite.height - GRID_BLOCK_PX);
        this.sprite.x = this.currentStep.x     
    }

    activateSpriteMovementModule( sprite : Sprite): void {
        sprite.activateMovementModule( this.currentStep.direction );
    }

    unsetPath( sprite: Sprite ): void {
        this.currentPathIndex = 0;
        this.path = null;
        sprite.deactivateMovementModule();
        markModuleAsInActive( sprite.spriteId, SpriteModuleEnum.movement );
    }

    setNextStep( sprite: Sprite ): void {
        this.currentPathIndex += 1;
        if ( !this.hasNextStep ) {
            this.reachedDestination = true;
        }
        else {
            sprite.setDirection( this.currentStep.direction, this.getCurrentStepTile() );
        }

    }

    getStepByIndex( index: number ): DirectionXy {
        return this.path[index];
    }

    getCurrentStepTile(): Tile {
        if ( this.currentStep == undefined ) return null;
        if ( isNullOrUndefined( this.currentStep.tile ) ) {
            return getTileOnCanvasByXy( this.currentStep, CanvasTypeEnum.background )
        }
        return getTileOnCanvasByCell( this.currentStep.tile, CanvasTypeEnum.background );
    }

    getNextStepTile(): Tile {
        if ( this.nextStep == undefined ) return null;
        if ( isNullOrUndefined( this.nextStep.tile ) ) {
            return getTileOnCanvasByXy( this.nextStep, CanvasTypeEnum.background )
        }
        return getTileOnCanvasByCell( this.nextStep.tile, CanvasTypeEnum.background );
    }

    getNextStepDirection( sprite: Sprite ): DirectionEnum {
        let topY = sprite.model.isCharacter ? sprite.bottom - GRID_BLOCK_PX : sprite.top;
        if ( this.currentStep.x <= sprite.left - ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.left ) {
            return DirectionEnum.left;
        }
        else if ( this.currentStep.y <= topY - ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.up ) {
            return DirectionEnum.up;
        }
        else if ( this.currentStep.x >= sprite.right + ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.right ) {
            return DirectionEnum.right;
        }
        else if ( this.currentStep.y >= sprite.bottom + ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.down ) {
            return DirectionEnum.down;
        }
        else {
            return null;
        }
    }
}