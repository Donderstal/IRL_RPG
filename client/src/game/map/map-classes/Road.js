const globals       = require('../../../game-data/globals');
/**
 * Some outdoor maps have roads. They are represented by a Road instance.
 * If hasStart is set true, they can generate car sprites to drive down the road.
 */
class Road {
    constructor ( roadData, index ) {
        this.index = index;
        this.direction = roadData.direction;

        this.hasStart = roadData.hasStart == undefined;
        this.endsAtIntersection = roadData.endsAtIntersection;

        this.isHorizontal = this.direction == "FACING_LEFT" || this.direction == "FACING_RIGHT";

        this.startCell = {};
        this.endCell = {};

        this.setRoadCoordinates( roadData )
    }

    get startCellIsBlocked( ) { 
        return globals.GAME.getTileOnCanvasAtCell( 
            "FRONT",
            this.startCell.col,
            this.isHorizontal ? this.startCell.row - 1 : this.startCell.row
        ).hasSprite 
    }
    /**
     * Set the start and end location of the road based on the direction prop of roadData.
     * @param {Object} roadData object from a mapResources map containing information about the road.
     */
    setRoadCoordinates( roadData ) {
        const activeGrid = globals.GAME.front.class.grid;

        switch( roadData.direction ) {
            case "FACING_LEFT" :
                this.startCell["row"]  = roadData.row;
                this.startCell["col"]  = activeGrid.cols
                this.endCell["row"] = roadData.row
                this.endCell["col"] = 1
                break;
            case "FACING_UP" :
                this.startCell["row"]  = activeGrid.rows
                this.startCell["col"]  = roadData.col;
                this.endCell["row"] = 1
                this.endCell["col"] = roadData.col
                break;
            case "FACING_RIGHT" :
                this.startCell["row"]  = roadData.row;
                this.startCell["col"]  = 1
                this.endCell["row"] = roadData.row
                this.endCell["col"] = activeGrid.cols
                break;
            case "FACING_DOWN" :
                this.startCell["row"]  = 1
                this.startCell["col"]  = roadData.col;
                this.endCell["row"] = activeGrid.rows
                this.endCell["col"] = roadData.col
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
            if ( index != this.index ) { 
                if  ( this.isHorizontal && !road.isHorizontal ) {
                    const cell = { 'row': this.startCell.row, 'col': road.startCell.col }
                    const tile = globals.GAME.getTileOnCanvasAtCell( "FRONT", cell.col, cell.row )
                    this.setIntersection( tile, road )
                }
                else if ( !this.isHorizontal && road.isHorizontal ) {
                    const cell = { 'row': road.startCell.row, 'col': this.startCell.col }
                    const tile = globals.GAME.getTileOnCanvasAtCell( "FRONT", cell.col, cell.row )
                    this.setIntersection( tile, road )
                }
            }
        } )
    }
    /**
     * Set tile.hasIntersection to true.
     * For each available path at the intersection, push a string representing its direction to tile.intersectingDirections.
     * @param {I_Tile} tile I_Tile instance to set intersection to
     * @param {Road} road Road instance intersecting with this Road
     */
    setIntersection( tile, road ) {
        tile.hasIntersection        = true;
        tile.intersectingDirections = [ ];

        if ( !road.endsAtIntersection ) {
            tile.intersectingDirections.push( road.direction );
        }

        if ( !this.endsAtIntersection ) {
            tile.intersectingDirections.push( this.direction );
        }
    }
    /**
     * Randomly select a car sprite from the available sprites.
     * Return an object with the information needed generate a car sprite.
     */
    getCarDataForTile( ) {
        const carNames = [ "car_a", "car_b", "car_c", "car_d" ]
        let randomIndex = Math.floor(Math.random() * carNames.length);
        return {
            "direction": this.direction,
            "moving": true,
            "type": carNames[randomIndex],
            "col": this.startCell.col,
            "row": this.startCell.row,
            "destination": this.endCell
        }
    }
}
module.exports = {
    Road
}