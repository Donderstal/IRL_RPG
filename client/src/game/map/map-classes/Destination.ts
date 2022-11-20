import { determineShortestPath } from '../../../helpers/pathfindingHelpers';
import { GRID_BLOCK_PX } from '../../../game-data/globals';
import type { Sprite } from '../../core/Sprite';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import type { GridLocation } from '../../../models/GridLocation';
import type { Tile } from '../../core/Tile';
import type { DirectionXy } from '../../../models/DirectionXyModel';
import { getRoadPathGridLocationList } from '../../../helpers/roadPathfindingHelpers';
import type { DestinationCellModel } from '../../../models/DestinationCellModel';
import type { DestinationType } from '../../../enumerables/DestinationType';
import { CanvasTypeEnum } from '../../../enumerables/CanvasTypeEnum';
import { markModuleAsActive, markModuleAsInActive } from '../../spriteModuleHandler';
import { SpriteModuleEnum } from '../../../enumerables/SpriteModuleEnum';
import { getBackSpritesGrid, getBackTilesGrid, getTileOnCanvasByXy } from '../../canvas/canvasGetter';
import type { BackTileGrid } from '../../canvas/BackTileGrid';
import type { BackSpriteGrid } from '../../canvas/BackSpriteGrid';

export class Destination {
    column: number;
    row: number;
    type: DestinationType;
    originalDestination: { column: number, row: number }

    path: DirectionXy[];
    foundPath: boolean;
    currentPathIndex: number;
    pathfindingTries: number;
    failedToFindPath: boolean;
    inSideStep: boolean;
    reachedDestination: boolean;
    spriteId: string;
    sprite: Sprite;
    constructor( destination: DestinationCellModel, sprite: Sprite ) {
        this.column = destination.column;
        this.row = destination.row;
        this.type = destination.type;

        this.originalDestination = destination;
        this.inSideStep = false;
        this.reachedDestination = false;

        this.path = null;
        this.foundPath = false;
        this.currentPathIndex = 0;

        this.pathfindingTries = 0;
        this.failedToFindPath = false;
        this.spriteId = sprite.spriteId;
        this.sprite = sprite;

        this.setPath( sprite );
    }

    get backClass(): BackTileGrid { return getBackTilesGrid(); };
    get frontClass(): BackSpriteGrid { return getBackSpritesGrid(); };
    get currentStep(): { x: number, y: number, direction: number } { return this.path[this.currentPathIndex]; };
    get nextStep(): { x: number, y: number, direction: number } { return this.path[this.currentPathIndex + 1]; };
    get hasNextStep(): boolean { return this.nextStep !== undefined; }
    get spriteHasReachedDestination( ): boolean { return this.currentPathIndex === this.path.length - 1; };

    setPath( sprite: Sprite ) {
        const startingTile = this.frontClass.getTileAtCell( sprite.column, sprite.row );
        let gridLocationList = ( sprite.isCar ) ? this.calculateCarPath( sprite ) : this.calculatePath( sprite );

        if ( gridLocationList === null ) {
            if ( this.pathfindingTries >= 5 ) {
                this.unsetPath( sprite );
                this.failedToFindPath = true;
            }
            else {
                this.pathfindingTries++;
                this.setPath( sprite )
            }
        }
        else {
            this.pathfindingTries = 0;
            this.startPath( sprite, startingTile, gridLocationList );
            this.activateSpriteMovementModule( sprite );
            markModuleAsActive( sprite.spriteId, SpriteModuleEnum.movement );
        }
    }

    setSideStep( sideStepDestination: DestinationCellModel, sprite: Sprite ): void {
        this.column = sideStepDestination.column;
        this.row = sideStepDestination.row;
        this.inSideStep = true;
        this.setPath( sprite );
    }

    snapSpriteToCurrentStepTile( ): void {
        this.sprite.y = this.currentStep.y - ( this.sprite.height - GRID_BLOCK_PX);
        this.sprite.x = this.currentStep.x     
    }

    calculateCarPath( sprite: Sprite ): GridLocation[]  {
        this.currentPathIndex = 0;
        const startingTile = this.frontClass.getTileAtCell( sprite.column, sprite.row );
        const destinationTile = this.frontClass.getTileAtCell( this.column, this.row );
        return getRoadPathGridLocationList( startingTile, sprite.direction, destinationTile );
    }

    calculatePath( sprite: Sprite ): GridLocation[] {
        const grid = { 
            'rows': this.backClass.grid.rows, 'columns': this.backClass.grid.columns,
            'tiles': this.backClass.grid.array,
            'blockedIndexes': this.backClass.grid.array.filter( ( tile ) => {
                return tile.isBlocked || this.frontClass.tileHasBlockingSprite( tile.index );
            } ).map( ( e: Tile ) => { return e.index })
        };
        const startingTile = this.frontClass.getTileAtXY(sprite.centerX, sprite.baseY);
        if ( startingTile.offScreen ) {
            grid.tiles.unshift(startingTile);
        }
        const destinationTile = this.frontClass.getTileAtCell(this.column, this.row);
        if ( destinationTile.offScreen ) {
            grid.tiles.push( destinationTile );
        }
        return determineShortestPath(startingTile, destinationTile, grid);
    }

    startPath( sprite: Sprite, startingTile: Tile, gridLocationList: GridLocation[] ) {
        this.path = this.reduceGridLocationList( startingTile, gridLocationList );
        this.currentPathIndex = 0;
    }

    reduceGridLocationList( startingTile: Tile, gridLocationList: GridLocation[] ): DirectionXy[] {
        let previousDirection = null;
        return gridLocationList.reduce( ( acc, cur, index ) => {
            const currentLocation = this.frontClass.getTileAtCell( cur.column, cur.row );
            const step = {
                x: currentLocation.x,
                y: currentLocation.y,
                direction: null
            }
            const lastLocation = index == 0 ? startingTile : acc[index - 1];
            if ( currentLocation.x < lastLocation.x && (previousDirection === null || previousDirection !== DirectionEnum.right) ) {
                step.direction = DirectionEnum.left;
                previousDirection = DirectionEnum.left;
            }
            else if ( currentLocation.y < lastLocation.y && ( previousDirection === null || previousDirection !== DirectionEnum.down ) ) {
                step.direction = DirectionEnum.up;
                previousDirection = DirectionEnum.up;
            }
            else if ( currentLocation.x > lastLocation.x && ( previousDirection === null || previousDirection !== DirectionEnum.left ) ) {
                step.direction = DirectionEnum.right;
                previousDirection = DirectionEnum.right;
            }
            else if ( currentLocation.y > lastLocation.y && ( previousDirection === null || previousDirection !== DirectionEnum.up ) ) {
                step.direction = DirectionEnum.down;
                previousDirection = DirectionEnum.down;
            }
            return [...acc, step];
        }, [] );
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
            console.log( this.currentStep );
        }
        else {
            sprite.setDirection( this.currentStep.direction, this.getNextStepTile() );
        }

    }

    getNextStepTile(): Tile {
        if ( this.nextStep == undefined ) {
            return null;
        }
        else {
            return getTileOnCanvasByXy(
                { x: this.nextStep.x + ( GRID_BLOCK_PX / 2 ), y: this.nextStep.y + ( GRID_BLOCK_PX / 2 ) },
                CanvasTypeEnum.background
            );
        }
    }

    getNextStepDirection( sprite: Sprite ): DirectionEnum {
        if ( this.currentStep.x <= sprite.left - ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.left ) {
            return DirectionEnum.left;
        }
        else if ( this.currentStep.y - ( sprite.height - GRID_BLOCK_PX ) <= sprite.top - ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.up ) {
            return DirectionEnum.up;
        }
        else if ( this.currentStep.x + GRID_BLOCK_PX >= sprite.right + ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.right ) {
            return DirectionEnum.right;
        }
        else if ( this.currentStep.y + GRID_BLOCK_PX >= sprite.bottom + ( sprite.speed / 2 ) && this.currentStep.direction == DirectionEnum.down ) {
            return DirectionEnum.down;
        }
        else {
            return null;
        }
    }

    resetOriginalDestination( sprite: Sprite ): void {
        this.column = this.originalDestination.column;
        this.row = this.originalDestination.row;
        this.inSideStep = false;
        this.setPath( sprite );
    }
}