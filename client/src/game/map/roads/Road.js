const globals       = require('../../../game-data/globals');
const { Counter } = require('../../../helpers/Counter');
const { FACING_RIGHT, FACING_LEFT, FACING_UP, FACING_DOWN } = require("../../../game-data/globals")

class Road {
    constructor ( roadData, id ) {
        this.id = id;
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
        this.carCounter = new Counter( globals.GAME.activeNeighbourhood.cars_spawn_rate, true );

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

    handleCarCounter( ) {
        if ( this.hasStart && this.carCounter.countAndCheckLimit( ) ) {
            this.generateCar( );
            this.carCounter.resetCounter( );
        }
    }

    generateCar(  ) {
        if ( !this.startCellIsBlocked ) {
            globals.GAME.FRONT.setVehicleToTile( this.getCarDataForTile( ) )
        }
    }

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

    setRoadCoordinates( roadData ) {
        const activeGrid = globals.GAME.front.class.grid;

        this.startCol = (roadData.startCol != undefined ? roadData.startCol : (roadData.direction == FACING_LEFT ? activeGrid.cols : 1));
        this.endCol = (roadData.endCol != undefined ? roadData.endCol : (roadData.direction == FACING_LEFT ? 1 : activeGrid.cols));
        this.startRow = (roadData.startRow != undefined ? roadData.startRow : (roadData.direction == FACING_UP ? activeGrid.rows : 1));
        this.endRow = (roadData.endRow != undefined ? roadData.endRow : (roadData.direction == FACING_UP ? 1 : activeGrid.rows));

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
                    this.setTilesMovementCost(i, this.topRow, i, this.bottomRow) 
                }
                break;
            case FACING_UP :
                for ( var i = this.endRow; i <= this.startRow; i++ ) {
                    this.setTilesMovementCost(this.leftCol, i, this.rightCol, i)
                }
                break;
            case FACING_RIGHT :
                for ( var i = this.startCol; i <= this.endCol; i++ ) {
                    this.setTilesMovementCost(i, this.topRow, i, this.bottomRow)
                } 
                break;
            case FACING_DOWN :
                for ( var i = this.startRow; i <= this.endRow; i++ ) {
                    this.setTilesMovementCost(this.leftCol, i, this.rightCol, i)
                } 
                break;
            default:
                console.log("error! Direction " + roadData.direction + " not recognized")
        }
    }
    setTilesMovementCost( colParam1, rowParam1, colParam2, rowParam2) {
        let tile1 = globals.GAME.getTileOnCanvasAtCell( "BACK", colParam1, rowParam1 );
        let tile2 = globals.GAME.getTileOnCanvasAtCell( "BACK", colParam2, rowParam2 );
        tile1.setMovementCost( 5 );
        tile2.setMovementCost( 5 );
    }

    getCarDataForTile( isBus = false ) {
        const carNames = globals.GAME.activeNeighbourhood.cars;
        let randomIndex = Math.floor(Math.random() * carNames.length);
        return {
            "direction": this.direction,
            "moving": true,
            "type": isBus ? "bus" : carNames[randomIndex],
            "col": this.startCell.col,
            "row": this.startCell.row,
            "destination": { 
                col: this.direction === FACING_LEFT ? globals.OUT_LEFT : this.direction === FACING_RIGHT ? globals.OUT_RIGHT : this.endCell.col, 
                row: this.direction === FACING_UP ? globals.OUT_UP : this.direction === FACING_DOWN ? globals.OUT_DOWN : this.endCell.row, 
            }
        }
    }

    setBusStopLocation( ) {
        this.busStopLocation = ( this.isHorizontal ) ? { row: this.startCell.row, col: this.busStopLocation.col + 3 } : { row: this.busStopLocation.row, col: this.startCell.col }
    }
}
module.exports = {
    Road
}