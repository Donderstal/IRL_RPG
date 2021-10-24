const globals = require('../../../game-data/globals')
const pathFinder = require('../../../helpers/pathfindingHelpers')
const { GRID_BLOCK_PX, FACING_LEFT, FACING_RIGHT, FACING_UP, FACING_DOWN, NPC_MOVE_TYPE_FLYING, OUT_LEFT, OUT_UP, OUT_RIGHT, OUT_DOWN } = require( '../../../game-data/globals' )

class Destination {
    constructor( column, row, spriteId, isRemovable = true ) {
        this.column = column;
        this.row = row;
        this.spriteId = spriteId;
        this.isRemovable = isRemovable;

        this.path = false;
        this.currentPathIndex;
        this.calculatePath( );
    }

    get backClass() { return globals.GAME.BACK; };
    get frontClass() { return globals.GAME.FRONT; };
    get backTile() { return this.backClass.getTileAtCell(this.column, this.row); };
    get frontTile() { return this.frontClass.getTileAtCell(this.column, this.row); };
    get sprite() { return this.frontClass.spriteDictionary[this.spriteId]; };

    get currentStep() { return this.path[this.currentPathIndex]; };
    get currentStepIsLeft() { return this.currentStep.x < this.sprite.left; };
    get currentStepIsRight() { return this.currentStep.x + GRID_BLOCK_PX > this.sprite.right; };
    get currentStepIsUp() { return this.currentStep.y - ( this.sprite.height - GRID_BLOCK_PX ) < this.sprite.top; };    
    get currentStepIsDown() { return this.currentStep.y + GRID_BLOCK_PX > this.sprite.bottom; };
    
    get isBlocked( ) { return this.backTile.isBlocked || this.frontClass.tileHasBlockingSprite( this.frontTile.index ); };
    get isOffScreen( ) { return this.column === OUT_LEFT || this.row === OUT_UP || this.column === OUT_RIGHT || this.row === OUT_DOWN; };
    get spriteHasReachedDestination( ) { return this.currentPathIndex === this.path.length - 1; };
    get spriteHasReachedCurrentStep( ) { 
        let factor = this.sprite.movementSpeed / 2;
        if ( this.currentStep.direction === FACING_LEFT || this.currentStep.direction == FACING_RIGHT ) {
            return this.currentStep.x + factor > this.sprite.x && this.currentStep.x - factor < this.sprite.x;
        }
        else if ( this.currentStep.direction === FACING_UP || this.currentStep.direction == FACING_DOWN ) {
            return this.currentStep.y + factor > this.sprite.bottom - GRID_BLOCK_PX && this.currentStep.y - factor < this.sprite.bottom - GRID_BLOCK_PX;
        }
    };

    snapSpriteToCurrentStepTile( ) {
        this.sprite.y = this.currentStep.y - (this.sprite.height - GRID_BLOCK_PX);
        this.sprite.x = this.currentStep.x     
    }

    calculatePath( ) {
        const grid = { 
            'rows': this.backClass.grid.rows, 'cols': this.backClass.grid.cols,
            'tiles': this.backClass.grid.array.filter((tile) => {return !this.backClass.getTileAtIndex(tile.index).isBlocked && !this.frontClass.tileHasBlockingSprite(tile.index);})
        };
        const startingTile = this.frontClass.getTileAtCell(this.sprite.col, this.sprite.row);
        if ( startingTile.offScreen ) {
            grid.tiles.unshift(startingTile);
        }
        const destinationTile = this.frontClass.getTileAtCell(this.column, this.row);
        if ( destinationTile.offScreen ) {
            grid.tiles.push( destinationTile );
        }
        const indexList = pathFinder.determineShortestPath(startingTile, destinationTile, grid, this.sprite.movementType == NPC_MOVE_TYPE_FLYING);

        this.path = indexList.reduce( (acc, cur, index) => {
            const currentLocation = this.frontClass.getTileAtCell(cur.column, cur.row);
            const step = { 
                "x": currentLocation.x,
                "y": currentLocation.y
            }
            if ( index != 0 ) {
                const lastLocation = acc[index - 1];
                if ( currentLocation.x < lastLocation.x ) {
                    step.direction = FACING_LEFT;
                }
                else if ( currentLocation.y < lastLocation.y ) {
                    step.direction = FACING_UP;
                }
                else if ( currentLocation.x > lastLocation.x ) {
                    step.direction = FACING_RIGHT;
                }
                else if ( currentLocation.y > lastLocation.y ) {
                    step.direction = FACING_DOWN;
                }
            }
            return [ ...acc, step];             
        }, []);
        this.currentPathIndex = 1;
    }

    unsetPath( ) {
        this.currentPathIndex = 0;
        this.path = false;
    }

    checkForNextStep( ) {
        if ( this.currentPathIndex + 1 < this.path.length ) {
            this.snapSpriteToCurrentStepTile( );
            this.currentPathIndex += 1; 
            this.sprite.direction = this.currentStep;    
        }        
        else if ( this.spriteHasReachedDestination ) { 
            this.snapSpriteToCurrentStepTile( );
            this.unsetPath( );
        }
    }
}

module.exports = {
    Destination
}