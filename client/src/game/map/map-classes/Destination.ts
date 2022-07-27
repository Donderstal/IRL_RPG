import globals from '../../../game-data/globals';
import { determineShortestPath } from '../../../helpers/pathfindingHelpers';
import { GRID_BLOCK_PX } from '../../../game-data/globals';
import type { BackgroundCanvas } from '../../BackgroundCanvas';
import type { ForegroundCanvas } from '../../ForegroundCanvas';
import type { Sprite } from '../../core/Sprite';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import { SpriteStateEnum } from '../../../enumerables/SpriteStateEnum';

export class Destination {
    column: number;
    row: number;
    deleteSprite: boolean;

    path: { x: number, y: number, direction: number }[];
    foundPath: boolean;
    currentPathIndex: number;
    constructor( column: number, row: number, sprite: Sprite, deleteSprite = false ) {
        this.column         = column;
        this.row            = row;
        this.deleteSprite   = deleteSprite;

        this.path = null;
        this.foundPath = false;
        this.currentPathIndex;
        if ( sprite.isCar ) {
            this.setCarPath( sprite );
        }
        else {
            this.calculatePath( sprite );            
        }
    }

    get backClass(): BackgroundCanvas { return globals.GAME.BACK; };
    get frontClass(): ForegroundCanvas { return globals.GAME.FRONT; };
    get currentStep(): { x: number, y: number, direction: number } { return this.path[this.currentPathIndex]; };
    get spriteHasReachedDestination( ): boolean { return this.currentPathIndex === this.path.length - 1; };

    snapSpriteToCurrentStepTile( sprite: Sprite ): void {
        sprite.y = this.currentStep.y - (sprite.height - GRID_BLOCK_PX);
        sprite.x = this.currentStep.x     
    }

    setCarPath( sprite: Sprite ): void  {
        this.currentPathIndex = 0;
        const currentLocation = this.frontClass.getTileAtCell(this.column, this.row);
        const step = { 
            x: sprite.direction == DirectionEnum.left ? currentLocation.x - sprite.width: 
                sprite.direction == DirectionEnum.right ? currentLocation.x + sprite.width : currentLocation.x,
            y: sprite.direction == DirectionEnum.up ? currentLocation.y - sprite.width: 
                sprite.direction == DirectionEnum.down ? currentLocation.y + sprite.width : currentLocation.y,
            direction: sprite.direction
        };
        this.path = [ step ];
    }

    calculatePath( sprite: Sprite ): void {
        const grid = { 
            'rows': this.backClass.grid.rows, 'columns': this.backClass.grid.columns,
            'tiles': this.backClass.grid.array.filter( ( tile ) => {
                return !this.backClass.getTileAtIndex(tile.index).isBlocked && !this.frontClass.tileHasBlockingSprite(tile.index);
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
        const gridLocationList = determineShortestPath(startingTile, destinationTile, grid);
        if ( !gridLocationList ) {
            if ( startingTile.offScreen ) {
                this.unsetPath( sprite );
                if ( this.deleteSprite ) {
                    this.frontClass.deleteSprite(sprite.spriteId);                
                }
            }
            return;
        }
        this.path = gridLocationList.reduce( (acc, cur, index) => {
            const currentLocation = this.frontClass.getTileAtCell(cur.column, cur.row);
            const step = { 
                x: currentLocation.x,
                y: currentLocation.y,
                direction: null
            }
            const lastLocation = index == 0 ? startingTile : acc[index - 1];
            if ( currentLocation.x < lastLocation.x ) {
                step.direction = DirectionEnum.left;
            }
            else if ( currentLocation.y < lastLocation.y ) {
                step.direction = DirectionEnum.up;
            }
            else if ( currentLocation.x > lastLocation.x ) {
                step.direction = DirectionEnum.right;
            }
            else if ( currentLocation.y > lastLocation.y ) {
                step.direction = DirectionEnum.down;
            }
            return [ ...acc, step];             
        }, [] );
        console.log( this.path[0] );
        console.log( this.path[this.path.length - 2] )
        console.log( this.path[this.path.length - 1] );
        this.currentPathIndex = 0;
        sprite.activateMovementModule( this.currentStep.direction );
        sprite.direction = this.currentStep.direction; 
        sprite.State.set(SpriteStateEnum.moving);
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
        this.snapSpriteToCurrentStepTile( sprite );
        this.currentPathIndex += 1;
        sprite.changeDirection( this.currentStep.direction );
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
}