import globals, { MOVEMENT_SPEED } from '../../../game-data/globals';
import { determineShortestPath } from '../../../helpers/pathfindingHelpers';
import { GRID_BLOCK_PX } from '../../../game-data/globals';
import type { BackgroundCanvas } from '../../BackgroundCanvas';
import type { ForegroundCanvas } from '../../ForegroundCanvas';
import type { Tile } from '../../core/Tile';
import type { Sprite } from '../../core/Sprite';
import { DirectionEnum } from '../../../enumerables/DirectionEnum';
import { SpriteStateEnum } from '../../../enumerables/SpriteStateEnum';

export class Destination {
    column: number;
    row: number;
    spriteId: string;
    deleteSprite: boolean;

    path: { x: number, y: number, direction: number }[];
    foundPath: boolean;
    currentPathIndex: number;
    constructor( column: number, row: number, spriteId: string, deleteSprite = false ) {
        this.column         = column;
        this.row            = row;
        this.spriteId       = spriteId;
        this.deleteSprite   = deleteSprite;

        this.path = null;
        this.foundPath = false;
        this.currentPathIndex;
        if ( this.sprite.isCar ) {
            this.setCarPath( );
        }
        else {
            this.calculatePath( );            
        }
    }

    get backClass(): BackgroundCanvas { return globals.GAME.BACK; };
    get frontClass(): ForegroundCanvas { return globals.GAME.FRONT; };
    get backTile(): Tile { return this.backClass.getTileAtCell(this.column, this.row); };
    get frontTile(): Tile { return this.frontClass.getTileAtCell(this.column, this.row); };
    get sprite(): Sprite { return this.frontClass.spriteDictionary[this.spriteId]; };

    get currentStep(): { x: number, y: number, direction: number } { return this.path[this.currentPathIndex]; };
    get currentStepIsLeft(): boolean { return this.currentStep.x <= this.sprite.left - (MOVEMENT_SPEED / 2) && this.currentStep.direction == DirectionEnum.left; };
    get currentStepIsRight(): boolean { return this.currentStep.x + GRID_BLOCK_PX >= this.sprite.right + (MOVEMENT_SPEED / 2) && this.currentStep.direction == DirectionEnum.right; };
    get currentStepIsUp(): boolean { return this.currentStep.y - ( this.sprite.height - GRID_BLOCK_PX ) <= this.sprite.top - (MOVEMENT_SPEED / 2)&& this.currentStep.direction == DirectionEnum.up; };    
    get currentStepIsDown(): boolean { return this.currentStep.y + GRID_BLOCK_PX >= this.sprite.bottom + (MOVEMENT_SPEED / 2) && this.currentStep.direction == DirectionEnum.down; };
    
    get isBlocked( ): boolean { return this.backTile.isBlocked || this.frontClass.tileHasBlockingSprite( this.frontTile.index ); };
    get spriteHasReachedDestination( ): boolean { return this.currentPathIndex === this.path.length - 1; };

    snapSpriteToCurrentStepTile(): void {
        this.sprite.y = this.currentStep.y - (this.sprite.height - GRID_BLOCK_PX);
        this.sprite.x = this.currentStep.x     
    }

    setCarPath(): void  {
        this.currentPathIndex = 0;
        const currentLocation = this.frontClass.getTileAtCell(this.column, this.row);
        const step = { 
            x: this.sprite.direction == DirectionEnum.left ? currentLocation.x - this.sprite.width: 
                this.sprite.direction == DirectionEnum.right ? currentLocation.x + this.sprite.width : currentLocation.x,
            y: this.sprite.direction == DirectionEnum.up ? currentLocation.y - this.sprite.width: 
                this.sprite.direction == DirectionEnum.down ? currentLocation.y + this.sprite.width : currentLocation.y,
            direction: this.sprite.direction
        };
        this.path = [ step ];
    }

    calculatePath( exceptionTile = { row: null, column: null } ): void {
        const grid = { 
            'rows': this.backClass.grid.rows, 'cols': this.backClass.grid.columns,
            'tiles': this.backClass.grid.array.filter((tile) => {
                return !this.backClass.getTileAtIndex(tile.index).isBlocked && !this.frontClass.tileHasBlockingSprite(tile.index)
                && !( exceptionTile.row == tile.row && exceptionTile.column == tile.column );
            })
        };
        const startingTile = this.frontClass.getTileAtXY(this.sprite.centerX, this.sprite.baseY);
        if ( startingTile.offScreen ) {
            grid.tiles.unshift(startingTile);
        }
        const destinationTile = this.frontClass.getTileAtCell(this.column, this.row);
        if ( destinationTile.offScreen ) {
            grid.tiles.push( destinationTile );
        }
        const indexList = determineShortestPath(startingTile, destinationTile, grid);
        if ( !indexList ) {
            if ( startingTile.offScreen ) {
                this.unsetPath( );
                if ( this.deleteSprite ) {
                    this.frontClass.deleteSprite(this.spriteId);                
                }
            }
            return;
        }
        this.path = indexList.reduce( (acc, cur, index) => {
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
        }, []);
        this.currentPathIndex = 0;
        this.sprite.direction = this.currentStep.direction; 
        this.sprite.State.set(SpriteStateEnum.moving);
    }

    unsetPath( ): void {
        this.currentPathIndex = 0;
        this.path = null;
    }

    checkForNextStep(): void {
        if ( this.currentPathIndex + 1 < this.path.length ) {
            this.snapSpriteToCurrentStepTile( );
            this.currentPathIndex += 1;  
            this.sprite.direction = this.currentStep.direction;
        }        
        else if ( this.spriteHasReachedDestination ) { 
            this.snapSpriteToCurrentStepTile( );
            this.unsetPath( );
            if ( this.deleteSprite ) {
                this.frontClass.deleteSprite(this.spriteId)
            }
            else {
                this.sprite.destination = null;
            }
        }
    }

    goTo(): void {
        if ( this.currentStepIsLeft  ) {
            this.sprite.moveSprite( DirectionEnum.left );
        }
        else if ( this.currentStepIsUp ) {
            this.sprite.moveSprite( DirectionEnum.up );
        }
        else if ( this.currentStepIsRight ) {
            this.sprite.moveSprite( DirectionEnum.right );
        }
        else if ( this.currentStepIsDown ) {
            this.sprite.moveSprite( DirectionEnum.down );
        } 
        else {
            this.checkForNextStep( );
        }
    }
}