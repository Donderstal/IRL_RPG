const globals       = require('../../../game-data/globals');
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../../../game-data/globals")
/**
 * Some outdoor maps have roads. They are represented by a Road instance.
 * If hasStart is set true, they can generate car sprites to drive down the road.
 */
class Road {
    constructor ( roadData, index ) {
        this.index = index;
        Object.keys( roadData ).forEach( ( e ) => {
            this[e] = roadData[e]
        } );

        this.isHorizontal = roadData.alignment == "HORI";
        this.startCell = {};
        this.secondCell = {}
        this.endCell = {};

        this.setRoadAligment( roadData )
        this.setRoadCoordinates( roadData )

        this.intersections = { 
            [FACING_LEFT]: [],
            [FACING_UP]: [],
            [FACING_RIGHT]: [],
            [FACING_DOWN]: []
        };
        this.activeCarIds = [];
        
        if ( this.hasBusLine ) {
            this.setBusStopLocation( )
        }
    }

    get startCellIsBlocked( ) { 
        let FRONT = globals.GAME.FRONT;
        let firstTile = globals.GAME.getTileOnCanvasAtCell(  "FRONT", this.startCell.col, this.startCell.row )
        let secondTile = globals.GAME.getTileOnCanvasAtCell(  "FRONT", this.secondCell.col, this.secondCell.row )
        return FRONT.tileHasBlockingSprite( firstTile.index ) || FRONT.tileHasBlockingSprite( secondTile.index )
    }

    get carsOnRoad( ) {
        return this.activeCarIds.map( ( id ) => { return globals.GAME.FRONT.spriteDictionary[id]; })
    }

    get priorityIntersections( ) {
        switch( this.direction ) {
            case FACING_LEFT :
                return this.intersections[FACING_DOWN];
            case FACING_UP :
                return this.intersections[FACING_LEFT];
            case FACING_RIGHT :
                return this.intersections[FACING_UP];
            case FACING_DOWN :
                return this.intersections[FACING_RIGHT];
            default:
                console.log("error! Direction " + this.direction + " not recognized")
        }
    }

    checkIfCarsAreNearingIntersection( ) {
        this.carsOnRoad.forEach( ( e ) => {
            const car = e;
            let inRange = false;
            if ( car.currentTileFront != undefined ) {
                this.priorityIntersections.forEach( ( tile ) => {
                    switch( this.direction ) {
                        case FACING_LEFT :
                            inRange = tile.col == ( car.currentTileFront.col - 7 );
                            break;
                        case FACING_UP :
                            inRange = tile.row == ( car.currentTileFront.row - 4 );
                            break;
                        case FACING_RIGHT :
                            inRange = tile.col == ( car.currentTileFront.col + 4 );
                            break;
                        case FACING_DOWN :
                            inRange = tile.row == ( car.currentTileFront.row + 7 );
                            break;
                        default:
                            console.log("error! Direction " + this.direction + " not recognized")
                    }
                    if ( inRange && !car.waitingAtIntersection && this.checkForComingCars( tile ) ) {
                        car.setWaitAtIntersection( );
                    }
                    else if ( inRange && car.waitingAtIntersection && !this.checkForComingCars( tile ) ) {
                        car.unsetWaitAtIntersection( );
                    }
                });                
            }
        });
    }
    checkForComingCars( intersectionTile ) {
        let priorityRoad = this.getIntersectingRoadAtTile( intersectionTile );
        let tileInRange = [];
        if ( priorityRoad.carsOnRoad.length > 0 ) {
            tileInRange = priorityRoad.carsOnRoad.filter( ( car ) => {
                if ( priorityRoad.alignment == 'VERT' ) {
                    return ( 
                        (car.middleTileFront != undefined && intersectionTile.row == car.middleTileFront.row ) ||
                        (car.currentTileFront != undefined && intersectionTile.row == car.currentTileFront.row ) ||
                        (car.nextTileFront != undefined && intersectionTile.row == car.nextTileFront.row ) ||
                        (car.secondNextTileFront != undefined && intersectionTile.row == car.secondNextTileFront.row )
                    );
                }
                else {
                    return ( 
                        (car.middleTileFront != undefined && intersectionTile.col == car.middleTileFront.col) || 
                        (car.currentTileFront != undefined && intersectionTile.col == car.currentTileFront.col) || 
                        (car.nextTileFront != undefined && intersectionTile.col == car.nextTileFront.col) ||
                        (car.secondNextTileFront != undefined && intersectionTile.col == car.secondNextTileFront.col )
                    );
                }
            })
        }
        return tileInRange.length > 0;
    }
    getIntersectingRoadAtTile( tile ) {
        return globals.GAME.FRONT.roadNetwork.roads.filter( ( road ) => {
            if ( road.direction == tile.intersectionTo ) {
                if ( road.alignment == "HORI" && ( road.topRow == tile.row || road.bottomRow == tile.row ) ) {
                    return true;
                }
                else if ( road.leftCol == tile.col || road.rightCol == tile.col ) {
                    return true;                    
                }
            }
            return false;
        })[0]
    }
    /**
     * Store the column numbers of the road if vertical, rows if horizontal
     * @param {Object} roadData object from a mapResources map containing information about the road.
     */
    setRoadAligment( roadData ) {
        if ( roadData.alignment == "VERT" ) {
            this.leftCol    = roadData["leftCol"];
            this.rightCol   = roadData["rightCol"];
        } 
        else if ( roadData.alignment == "HORI" ) {
            this.topRow     = roadData["topRow"];
            this.bottomRow  = roadData["bottomRow"];    
        }
    }
    /**
     * Set the start and end location of the road based on the direction prop of roadData.
     * @param {Object} roadData object from a mapResources map containing information about the road.
     */
    setRoadCoordinates( roadData ) {
        const activeGrid = globals.GAME.front.class.grid;

        this.startCol = (roadData.startCol != undefined ? roadData.startCol : (roadData.direction == FACING_LEFT ? activeGrid.cols : 1));
        this.endCol = (roadData.endCol != undefined ? roadData.endCol : (roadData.direction == FACING_LEFT ? 1 : activeGrid.cols));
        this.startRow = (roadData.startRow != undefined ? roadData.startRow : (roadData.direction == FACING_UP ? activeGrid.rows : 1));
        this.endRow = (roadData.endCol != undefined ? roadData.endCol : (roadData.direction == FACING_UP ? 1 : activeGrid.rows));

        switch( roadData.direction ) {
            case FACING_LEFT :
                this.setCells( this.topRow, this.startCol, this.bottomRow, this.startCol, this.topRow, this.endCol );
                break;
            case FACING_UP :
                this.setCells( this.startRow, this.rightCol, this.startRow, this.leftCol, this.endRow, this.rightCol );
                break;
            case FACING_RIGHT :
                this.setCells( this.bottomRow, this.startCol, this.topRow, this.startCol, this.bottomRow, this.endCol );
                break;
            case FACING_DOWN :
                this.setCells( this.startRow, this.leftCol, this.startRow, this.rightCol, this.endRow, this.leftCol );
                break;
            default:
                console.log("error! Direction " + roadData.direction + " not recognized")
        }

        this.setMovementCostToRoadTiles( roadData );
    }
    /**
     * @param {Number} startRow row of the start cell
     * @param {Number} startCol col of the start cell
     * @param {Number} secondRow row of the second cell
     * @param {Number} secondCol col of the second cell
     * @param {Number} endRow row of the end cell
     * @param {Number} endCol col of the end cell
     */
    setCells( startRow, startCol, secondRow, secondCol, endRow, endCol ) {
        this.startCell["row"]   = startRow;
        this.startCell["col"]   = startCol;
        this.secondCell["row"]  = secondRow;
        this.secondCell["col"]  = secondCol;
        this.endCell["row"]     = endRow;
        this.endCell["col"]     = endCol;
    }
    setMovementCostToRoadTiles( roadData ) {
        switch( roadData.direction ) {
            case FACING_LEFT :
                for ( var i = this.endCol; i <= this.startCol; i++ ) {
                    if ( this.crossings.indexOf(i) < 0 ) {
                        let tileTop = globals.GAME.getTileOnCanvasAtCell( "BACK", i, this.topRow );
                        let tileBottom = globals.GAME.getTileOnCanvasAtCell( "BACK", i,this.bottomRow );
                        tileTop.setMovementCost( 5 )
                        tileBottom.setMovementCost( 5 )                       
                    }
                }
                break;
            case FACING_UP :
                for ( var i = this.endRow; i <= this.startRow; i++ ) {
                    if ( this.crossings.indexOf(i) < 0 ) {
                        let tileLeft = globals.GAME.getTileOnCanvasAtCell( "BACK", this.leftCol, i );
                        let tileRight = globals.GAME.getTileOnCanvasAtCell( "BACK", this.rightCol, i );
                        tileLeft.setMovementCost( 5 )
                        tileRight.setMovementCost( 5 )
                    }
                }
                break;
            case FACING_RIGHT :
                for ( var i = this.startCol; i <= this.endCol; i++ ) {
                    if ( this.crossings.indexOf(i) < 0 ) {
                        let tileTop = globals.GAME.getTileOnCanvasAtCell( "BACK", i, this.topRow );
                        let tileBottom = globals.GAME.getTileOnCanvasAtCell( "BACK", i,this.bottomRow );
                        tileTop.setMovementCost( 5 )
                        tileBottom.setMovementCost( 5 )
                    }
                } 
                break;
            case FACING_DOWN :
                for ( var i = this.startRow; i <= this.endRow; i++ ) {
                    if ( this.crossings.indexOf(i) < 0 ) {
                        let tileLeft = globals.GAME.getTileOnCanvasAtCell( "BACK", this.leftCol, i );
                        let tileRight = globals.GAME.getTileOnCanvasAtCell( "BACK", this.rightCol, i );
                        tileLeft.setMovementCost( 5 )
                        tileRight.setMovementCost( 5 )
                    }
                } 
                break;
            default:
                console.log("error! Direction " + roadData.direction + " not recognized")
        }
    }
    /**
     * Loop through the given array of Road instance and check if they intersect this Road.
     * If so, call setIntersection, passing the Road and intersecting I_Tile as arguments.
     * @param {Road[]} roads array of Road instances
     */
    checkForIntersections( roads ) {
        roads.forEach( ( road, index ) => { 
            if ( index != this.index && ( ( this.isHorizontal && !road.isHorizontal ) || ( !this.isHorizontal && road.isHorizontal ) )) { 
                let cell;
                switch( this.direction ) {
                    case FACING_LEFT :
                        cell = { 'row': this.topRow, 'col': road.leftCol }
                        break;
                    case FACING_UP :
                        cell = { 'row': road.topRow, 'col': this.rightCol }
                        break;
                    case FACING_RIGHT :
                        cell = { 'row': this.bottomRow, 'col': road.rightCol }
                        break;
                    case FACING_DOWN :
                        cell = { 'row': road.bottomRow, 'col': this.leftCol }
                        break;
                }
                const tile = globals.GAME.getTileOnCanvasAtCell( "FRONT", cell.col, cell.row )
                this.setIntersection( tile, road )
            }
        } )
    }
    /**
     * Set tile.hasIntersection to true.
     * Assign this.direction to tile's intersectionFrom and give road direction to intersectionTo
     * @param {I_Tile} tile I_Tile instance to set intersection to
     * @param {Road} road Road instance intersecting with this Road
     */
    setIntersection( tile, road ) {
        tile.hasIntersection    = true;
        tile.intersectionFrom   = this.direction;
        tile.intersectionTo     = road.direction;
        switch ( this.direction ) {
            case FACING_LEFT :
                if ( road.direction == FACING_DOWN ) {
                    console.log("LEFT F has DOWN F to its right")                    
                }
                globals.GAME.BACK.ctx.fillStyle = "orange";
                break;
            case FACING_UP :
                if ( road.direction == FACING_LEFT ) {
                    console.log("UP F has LEFT F to its right")                    
                }
                globals.GAME.BACK.ctx.fillStyle = "yellow";
                break;
            case FACING_RIGHT :
                if ( road.direction == FACING_UP ) {
                    console.log("RIGHT F has UP F to its right")              
                }
                globals.GAME.BACK.ctx.fillStyle = "red";
                break;
            case FACING_DOWN :
                if ( road.direction == FACING_RIGHT ) {
                    console.log("DOWN F has RIGHT F to its right")          
                }
                globals.GAME.BACK.ctx.fillStyle = "lightblue";
                break;
        }
        globals.GAME.BACK.ctx.fillRect( tile.x, tile.y, globals.GRID_BLOCK_PX, globals.GRID_BLOCK_PX )
        this.intersections[road.direction].push(tile);
    }
    /**
     * Randomly select a car sprite from the available sprites.
     * Return an object with the information needed generate a car sprite.
     */
    getCarDataForTile( isBus = false ) {
        const carNames = [ "car_a", "car_b", "car_c", "car_d", "bus" ]
        let randomIndex = Math.floor(Math.random() * carNames.length);
        return {
            "direction": this.direction,
            "moving": true,
            "type": isBus ? "bus" : carNames[randomIndex],
            "col": this.startCell.col,
            "row": this.startCell.row,
            "destination": isBus ? this.busStopLocation : this.endCell
        }
    }

    setBusStopLocation( ) {
        this.busStopLocation = ( this.isHorizontal ) ? { row: this.startCell.row, col: this.busStopLocation.col + 3 } : { row: this.busStopLocation.row, col: this.startCell.col }
    }
}
module.exports = {
    Road
}