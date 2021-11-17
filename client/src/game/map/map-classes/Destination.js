const globals = require('../../../game-data/globals')
const pathFinder = require('../../../helpers/pathfindingHelpers')
const { GRID_BLOCK_PX, FACING_LEFT, FACING_RIGHT, FACING_UP, FACING_DOWN, NPC_MOVE_TYPE_FLYING } = require( '../../../game-data/globals' );


class Destination {
    constructor( column, row, spriteId, deleteSprite = false ) {
        this.column         = column;
        this.row            = row;
        this.spriteId       = spriteId;
        this.deleteSprite   = deleteSprite;

        this.path = false;
        this.currentPathIndex;
        if ( this.sprite.isCar ) {
            this.setCarPath( );
        }
        else {
            this.calculatePath( );            
        }
    }

    get backClass() { return globals.GAME.BACK; };
    get frontClass() { return globals.GAME.FRONT; };
    get backTile() { return this.backClass.getTileAtCell(this.column, this.row); };
    get frontTile() { return this.frontClass.getTileAtCell(this.column, this.row); };
    get sprite() { return this.frontClass.spriteDictionary[this.spriteId]; };

    get currentStep() { return this.path[this.currentPathIndex]; };
    get currentStepIsLeft() { return this.currentStep.x <= this.sprite.left - (globals.MOVEMENT_SPEED / 2) && this.currentStep.direction == FACING_LEFT; };
    get currentStepIsRight() { return this.currentStep.x + GRID_BLOCK_PX >= this.sprite.right + (globals.MOVEMENT_SPEED / 2) && this.currentStep.direction == FACING_RIGHT; };
    get currentStepIsUp() { return this.currentStep.y - ( this.sprite.height - GRID_BLOCK_PX ) <= this.sprite.top - (globals.MOVEMENT_SPEED / 2)&& this.currentStep.direction == FACING_UP; };    
    get currentStepIsDown() { return this.currentStep.y + GRID_BLOCK_PX >= this.sprite.bottom + (globals.MOVEMENT_SPEED / 2) && this.currentStep.direction == FACING_DOWN; };
    
    get isBlocked( ) { return this.backTile.isBlocked || this.frontClass.tileHasBlockingSprite( this.frontTile.index ); };
    get spriteHasReachedDestination( ) { return this.currentPathIndex === this.path.length - 1; };

    snapSpriteToCurrentStepTile( ) {
        this.sprite.y = this.currentStep.y - (this.sprite.height - GRID_BLOCK_PX);
        this.sprite.x = this.currentStep.x     
    }

    setCarPath( ) {
        this.currentPathIndex = 0;
        const currentLocation = this.frontClass.getTileAtCell(this.column, this.row);
        const step = { 
            "x":this.sprite.direction == FACING_LEFT ? currentLocation.x - this.sprite.width: 
                this.sprite.direction == FACING_RIGHT ? currentLocation.x + this.sprite.width : currentLocation.x,
            "y":this.sprite.direction == FACING_UP ? currentLocation.y - this.sprite.width: 
                this.sprite.direction == FACING_DOWN ? currentLocation.y + this.sprite.width : currentLocation.y,
            "direction": this.sprite.direction
        };
        this.path = [ step ];
    }

    calculatePath( ) {
        const grid = { 
            'rows': this.backClass.grid.rows, 'cols': this.backClass.grid.cols,
            'tiles': this.backClass.grid.array.filter((tile) => {
                return !this.backClass.getTileAtIndex(tile.index).isBlocked && !this.frontClass.tileHasBlockingSprite(tile.index);
            })
        };
        const startingTile = this.frontClass.getTileAtXY(this.sprite.centerX(), this.sprite.baseY());
        if ( startingTile.offScreen ) {
            grid.tiles.unshift(startingTile);
        }
        const destinationTile = this.frontClass.getTileAtCell(this.column, this.row);
        if ( destinationTile.offScreen ) {
            grid.tiles.push( destinationTile );
        }
        const indexList = pathFinder.determineShortestPath(startingTile, destinationTile, grid, this.sprite.movementType == NPC_MOVE_TYPE_FLYING);
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
                "x": currentLocation.x,
                "y": currentLocation.y
            }
            const lastLocation = index == 0 ? startingTile : acc[index - 1];
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
            return [ ...acc, step];             
        }, []);
        this.currentPathIndex = 0;
        this.sprite.direction = this.currentStep.direction; 
    }

    unsetPath( ) {
        this.currentPathIndex = 0;
        this.path = false;
    }

    checkForNextStep( ) {
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
                this.sprite.destination = false;
            }
        }
    }

    goTo( ) {
        if ( this.currentStepIsLeft  ) {
            this.sprite.direction = FACING_LEFT;
            this.sprite.x -= this.sprite.speed;
        }
        else if ( this.currentStepIsRight ) {
            this.sprite.direction = FACING_RIGHT;
            this.sprite.x += this.sprite.speed;
        }
        else if ( this.currentStepIsUp ) {
            this.sprite.direction = FACING_UP;
            this.sprite.y -= this.sprite.speed;
        }
        else if ( this.currentStepIsDown ) {
            this.sprite.direction = FACING_DOWN;
            this.sprite.y += this.sprite.speed;
        } 
        else {
            this.checkForNextStep( );
        }
    }
}

module.exports = {
    Destination
}