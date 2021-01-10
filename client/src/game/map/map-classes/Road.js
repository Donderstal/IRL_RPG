const globals       = require('../../../game-data/globals');

class Road {
    constructor ( roadData, index ) {
        this.index = index;
        this.direction = roadData.direction;

        this.startCell = {};
        this.endCell = {};

        this.setRoadCoordinates( roadData )
    }

    get startCellIsBlocked( ) { return globals.GAME.front.class.grid.getTileAtCell( this.startCell.row - 1, this.startCell.col ).hasSprite }

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

    getCarDataForTile( ) {
        return {
            "direction": this.direction,
            "moving": true,
            "type": "Car_A",
            "col": this.startCell.col,
            "row": this.startCell.row,
            "destination": this.endCell
        }
    }
}
module.exports = {
    Road
}