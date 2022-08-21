import globals from '../../../game-data/globals';
import { determineShortestPath } from '../../../helpers/pathfindingHelpers';
import { GRID_BLOCK_PX } from '../../../game-data/globals';
import type { BackgroundCanvas } from '../../BackgroundCanvas';
import type { ForegroundCanvas } from '../../ForegroundCanvas';
import type { Sprite } from '../../core/Sprite';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import { SpriteStateEnum } from '../../../enumerables/SpriteStateEnum';
import type { GridLocation } from '../../../models/GridLocation';
import type { Tile } from '../../core/Tile';
import type { DirectionXy } from '../../../models/DirectionXyModel';
import { getRoadPathGridLocationList } from '../../../helpers/roadPathfindingHelpers';
import type { GridCellModel } from '../../../models/GridCellModel';

export class Destination {
    column: number;
    row: number;
    originalDestination: { column: number, row: number }
    deleteSprite: boolean;

    path: DirectionXy[];
    foundPath: boolean;
    currentPathIndex: number;
    pathfindingTries: number;
    tryingForPath: boolean;
    inSideStep: boolean;
    constructor( column: number, row: number, sprite: Sprite, deleteSprite = false ) {
        this.column         = column;
        this.row = row;
        this.inSideStep = false;
        this.deleteSprite   = deleteSprite;

        this.path = null;
        this.foundPath = false;
        this.currentPathIndex;
        this.setPath( sprite );

        this.pathfindingTries = 0;
        this.tryingForPath = false;
        this.activateSpriteMovementModule( sprite );
    }

    get backClass(): BackgroundCanvas { return globals.GAME.BACK; };
    get frontClass(): ForegroundCanvas { return globals.GAME.FRONT; };
    get currentStep(): { x: number, y: number, direction: number } { return this.path[this.currentPathIndex]; };
    get spriteHasReachedDestination( ): boolean { return this.currentPathIndex === this.path.length - 1; };

    setPath(sprite: Sprite) {
        const startingTile = this.frontClass.getTileAtCell( sprite.column, sprite.row );
        let gridLocationList = ( sprite.isCar ) ? this.calculateCarPath( sprite ) : this.calculatePath( sprite );
        if ( gridLocationList !== null ) {
            this.startPath( sprite, startingTile, gridLocationList );
            this.pathfindingTries = 0
        }
        else if ( !this.tryingForPath && this.pathfindingTries < 5 ) {
            this.tryingForPath = true;
            this.pathfindingTries++
            setTimeout( () => {
                this.tryingForPath = false;
                this.setPath( sprite )
            }, 1200 )
        }
        else if ( !this.tryingForPath && this.pathfindingTries >= 5 ) {
            if ( !this.deleteSprite ) {
                this.pathfindingTries = 0;
                this.tryingForPath = false;
            }
            else {
                globals.GAME.FRONT.deleteSprite( sprite.spriteId );
            }
        }
    }

    setSideStep( sideStepDestination: GridCellModel, sprite: Sprite ): void {
        this.column = sideStepDestination.column;
        this.row = sideStepDestination.row;
        this.inSideStep = true;
        this.setPath( sprite );
    }

    snapSpriteToCurrentStepTile( sprite: Sprite ): void {
        sprite.y = this.currentStep.y - (sprite.height - GRID_BLOCK_PX);
        sprite.x = this.currentStep.x     
    }

    calculateCarPath( sprite: Sprite ): GridLocation[]  {
        this.currentPathIndex = 0;
        const startingTile = this.frontClass.getTileAtCell( sprite.column, sprite.row );
        const destinationTile = this.frontClass.getTileAtCell(this.column, this.row);
        return getRoadPathGridLocationList( startingTile, sprite.direction, destinationTile );
    }

    calculatePath( sprite: Sprite ): GridLocation[] {
        const grid = { 
            'rows': this.backClass.grid.rows, 'columns': this.backClass.grid.columns,
            'tiles': this.backClass.grid.array.filter( ( tile ) => {
                return !tile.isBlocked && !globals.GAME.FRONT.tileHasBlockingSprite( tile.index );
            })
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
        sprite.direction = this.currentStep.direction;
        sprite.State.set( SpriteStateEnum.moving );
    }

    unsetPath( sprite: Sprite ): void {
        this.currentPathIndex = 0;
        this.path = null;
        sprite.deactivateMovementModule();
    }

    hasNextStep(): boolean {
        return this.currentPathIndex + 1 < this.path.length;
    }

    setNextStep( sprite: Sprite ): void {
        this.currentPathIndex += 1;
        if ( this.getNextStepTile() === null ) {
            console.log( this.currentStep );
        }
        else {
            sprite.setDirection( this.currentStep.direction, this.getNextStepTile() );
        }

    }

    getNextStepTile(): Tile {
        const nextStep = this.path[this.currentPathIndex + 1];
        return nextStep !== undefined ? globals.GAME.getTileOnCanvasAtXY( "BACK", nextStep.x + ( GRID_BLOCK_PX / 2 ), nextStep.y + ( GRID_BLOCK_PX / 2 ) ) : null;
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