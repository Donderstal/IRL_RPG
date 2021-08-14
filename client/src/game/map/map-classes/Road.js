const globals       = require('../../../game-data/globals');
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
        return globals.GAME.getTileOnCanvasAtCell( 
            "FRONT",
            this.startCell.col,
            this.startCell.row
        ).hasSprite 
        || globals.GAME.getTileOnCanvasAtCell( 
            "FRONT",
            this.secondCell.col,
            this.secondCell.row
        ).hasSprite 
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
        switch( roadData.direction ) {
            case "FACING_LEFT" :
                this.setCells( this.topRow, activeGrid.cols, this.bottomRow, activeGrid.cols, this.topRow, 1 );
                break;
            case "FACING_UP" :
                this.setCells( activeGrid.rows, this.rightCol, activeGrid.rows, this.leftCol, 1, this.rightCol );
                break;
            case "FACING_RIGHT" :
                this.setCells( this.bottomRow, 1, this.topRow, 1, this.bottomRow, activeGrid.cols );
                break;
            case "FACING_DOWN" :
                this.setCells( 1, this.leftCol, 1, this.rightCol, activeGrid.rows, this.leftCol );
                break;
            default:
                console.log("error! Direction " + roadData.direction + " not recognized")
        }
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
0   }
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
                    case "FACING_LEFT" :
                        cell = { 'row': this.topRow, 'col': road.leftCol }
                        break;
                    case "FACING_UP" :
                        cell = { 'row': road.topRow, 'col': this.rightCol }
                        break;
                    case "FACING_RIGHT" :
                        cell = { 'row': this.bottomRow, 'col': road.rightCol }
                        break;
                    case "FACING_DOWN" :
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
        const carNames = [ "car_a", "car_b", "car_c", "car_d" ]
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