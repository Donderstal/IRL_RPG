const animationFrameController = require('./animationFrameController')
const { CANVAS_WIDTH, CANVAS_HEIGHT }  = require('../game-data/globals')
const controls      = require('./controls')
const getMapData    = require('../resources/mapResources').getMapData
const tilesheets    = require('../resources/tilesheetResources').sheets

const { ForegroundCanvas } = require('./ForegroundCanvas');
const { BackgroundCanvas } = require('./BackgroundCanvas');

const firstMapUrl =  'my-neighbourhood/A1/my-house';

class Game {
    constructor( ) {
        console.log('initializing game!')
        this.mode; // 'MAP' || 'BATTLE'        
        this.inCinematic; // bool
        this.paused; // bool
        this.listeningForPress; // bool

        this.front = { }; // class Foreground
        this.back  = { };  // class Background
        this.util  = { };
        this.battle; // class Battle
        this.party; // class Party

        this.activeMap; 
        this.activeMapName; // string

        this.initGameCanvases( );
    }

    get PLAYER( ) { return this.front.class.playerSprite }

    getTileOnCanvasAtIndex( canvasName, index) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        return canvasClass.getTileAtIndex( index );
    }

    getTileOnCanvasAtXY( canvasName, x, y ) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        return canvasClass.getTileAtXY( x, y );
    }

    getTileOnCanvasAtCell( canvasName, column, row ) {
        const canvasClass = canvasName == 'FRONT' ? this.front.class : this.back.class
        return canvasClass.getTileAtCell( column, row );
    }

    initGameCanvases( ) {
        this.initCanvas( 'FRONT', this.front );
        this.initCanvas( 'BACK', this.back );
        this.initCanvas( 'UTIL', this.util );
    }

    initCanvas( type, object ) {
        const id = type == 'FRONT' ? 'game-front-canvas' : type == 'BACK' ? 'game-background-canvas' : 'game-utility-canvas';
        object.canvas = document.getElementById( id );
        object.ctx = object.canvas.getContext( '2d' );
        
        if ( type != 'UTIL' ) {
            object.canvas.width = CANVAS_WIDTH;
            object.canvas.height = CANVAS_HEIGHT;
            const xy = object.canvas.getBoundingClientRect( );
            object.class = type == 'FRONT' ?  new ForegroundCanvas( xy.x, xy.y, object.ctx ) : new BackgroundCanvas( xy.x, xy.y, object.ctx );
        }
    }

    startNewGame( name, className ) {
        const mapData = getMapData(firstMapUrl);
        this.storeMapData( mapData, firstMapUrl );
        mapData.playerStart.playerClass = className;
        mapData.playerStart.name = name;
        this.loadMapToCanvases( mapData )
        setTimeout( this.initControlsAndAnimation, 1000 );
    }

    initControlsAndAnimation( ) {
        controls.initTouchControls( );
        controls.listenForKeyPress();  
        animationFrameController.startRequestingFrame( );
    }

    loadMapToCanvases( mapData ) {
        this.back.class.initGrid( mapData.rows, mapData.columns );
        this.front.class.initGrid( mapData.rows, mapData.columns );
    
        const sheetData = tilesheets[mapData.tileSet];
    
        this.back.class.setBackgroundData( mapData, sheetData );
        this.back.class.loadImageWithCallback( '/static/tilesets/' + sheetData.src, this.back.class.drawMapFromGridData );
    
        this.front.class.setForegroundData( mapData );
        this.front.class.setSpritesToGrid( );
        
        this.front.class.spriteDictionary["PLAYER"] = this.PLAYER
    }

    clearMapFromCanvases( ) {
        this.front.class.clearMap( );
        this.back.class.clearMap( );

        this.front.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
        this.back.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
    }

    switchMap ( destination, type ) {
        this.paused = true;
        controls.stopListenForKeyPress( );

        const newMapData = getMapData( destination );
        this.clearMapFromCanvases( );
        this.loadMapToCanvases( newMapData );
        this.setPlayerInNewMap( newMapData, type );
        this.storeMapData( newMapData, destination );

        setTimeout( ( ) => {
            controls.listenForKeyPress(); 
            this.paused = false;   
        }, 100 )
    }

    storeMapData( mapData, mapName ) {
        this.activeMapName = mapName;
        this.activeMap = mapData;
    }

    setPlayerInNewMap( mapData, type ) {
        const newPlayerCell = {};
        let direction;

        switch ( type ) {
            case 'DOOR' :
                mapData.doors.forEach( ( door ) => {
                    if ( this.activeMapName == door.to ) {
                        newPlayerCell.row = door.row;
                        newPlayerCell.col = door.col;
                        direction = door.directionOut;
                    }
                } )
                break;
            case 'NEIGHBOUR' :
                Object.keys( mapData.neighbours ).forEach( ( key ) => {
                    if ( this.activeMapName == mapData.neighbours[key] ) {
                        switch ( key ) {
                            case 'up' : 
                                newPlayerCell.row = 1;
                                newPlayerCell.col = this.PLAYER.col;
                                break;
                            case 'right' :
                                newPlayerCell.row = this.PLAYER.row;
                                newPlayerCell.col = mapData.columns;
                                break;
                            case 'down' :
                                newPlayerCell.row = mapData.rows;
                                newPlayerCell.col = this.PLAYER.col;
                                break;
                            case 'left' :
                                newPlayerCell.row = this.PLAYER.row;
                                newPlayerCell.col = 1;
                                break;
                            
                        }
                    }
                })
                break;
            case 'BUS' :
                mapData.mapObjects.forEach( ( object ) => {
                    if ( object.action != undefined && object.action.type == "BUS" ) {
                        newPlayerCell.row = object.row;
                        newPlayerCell.col = object.col;
                    }
                } )
                break;
        }

        console.log(newPlayerCell)

        this.PLAYER.setNewLocationInGrid( newPlayerCell, direction );
        this.front.class.allSprites.push( this.PLAYER );
        this.front.class.spriteDictionary["PLAYER"] = PLAYER
    }
}

module.exports = {
    Game
}