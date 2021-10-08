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
                    let tileTop = globals.GAME.getTileOnCanvasAtCell( "BACK", i, this.topRow );
                    let tileBottom = globals.GAME.getTileOnCanvasAtCell( "BACK", i,this.bottomRow );
                    tileTop.setMovementCost( 3 )
                    tileBottom.setMovementCost( 3 )
                }
                break;
            case FACING_UP :
                for ( var i = this.endRow; i <= this.startRow; i++ ) {
                    let tileLeft = globals.GAME.getTileOnCanvasAtCell( "BACK", this.leftCol, i );
                    let tileRight = globals.GAME.getTileOnCanvasAtCell( "BACK", this.rightCol, i );
                    tileLeft.setMovementCost( 3 )
                    tileRight.setMovementCost( 3 )
                }
                break;
            case FACING_RIGHT :
                for ( var i = this.startCol; i <= this.endCol; i++ ) {
                    let tileTop = globals.GAME.getTileOnCanvasAtCell( "BACK", i, this.topRow );
                    let tileBottom = globals.GAME.getTileOnCanvasAtCell( "BACK", i,this.bottomRow );
                    tileTop.setMovementCost( 3 )
                    tileBottom.setMovementCost( 3 )
                } 
                break;
            case FACING_DOWN :
                for ( var i = this.startRow; i <= this.endRow; i++ ) {
                    let tileLeft = globals.GAME.getTileOnCanvasAtCell( "BACK", this.leftCol, i );
                    let tileRight = globals.GAME.getTileOnCanvasAtCell( "BACK", this.rightCol, i );
                    tileLeft.setMovementCost( 3 )
                    tileRight.setMovementCost( 3 )
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
        tile.hasIntersection        = true;
        tile.intersectionFrom = this.direction;
        tile.intersectionTo = road.direction;
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