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

        this.isHorizontal = roadData.alignment == "HORI";
        this.startCell = {};
        this.endCell = {};

        this.setRoadAligment( roadData )
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
                this.startCell["row"]   = this.topRow;
                this.startCell["col"]   = activeGrid.cols;
                this.endCell["row"]     = this.topRow;
                this.endCell["col"]     = 1;
                break;
            case "FACING_UP" :
                this.startCell["row"]   = activeGrid.rows;
                this.startCell["col"]   = this.rightCol;
                this.endCell["row"]     = 1;
                this.endCell["col"]     = this.rightCol;
                break;
            case "FACING_RIGHT" :
                this.startCell["row"]   = this.bottomRow;
                this.startCell["col"]   = 1;
                this.endCell["row"]     = this.bottomRow;
                this.endCell["col"]     = activeGrid.cols;
                break;
            case "FACING_DOWN" :
                this.startCell["row"]   = 1;
                this.startCell["col"]   = this.leftCol;
                this.endCell["row"]     = activeGrid.rows;
                this.endCell["col"]     = this.leftCol;
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
     * For each available path at the intersection, push a string representing its direction to tile.intersectingDirections.
     * @param {I_Tile} tile I_Tile instance to set intersection to
     * @param {Road} road Road instance intersecting with this Road
     */
    setIntersection( tile, road ) {
        tile.hasIntersection        = true;
        /* tile.intersectingDirections = [ ]; */
        tile.intersectionFrom = this.direction;
        tile.intersectionTo = road.direction;

        /* if ( !road.endsAtIntersection ) {
            tile.intersectingDirections.push( road.direction );
        }

        if ( !this.endsAtIntersection ) {
            tile.intersectingDirections.push( this.direction );
        } */
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