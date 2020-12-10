const animationFrameController = require('./animationFrameController')
const { CANVAS_WIDTH, CANVAS_HEIGHT }  = require('../game-data/globals')
const controls      = require('./controls')
const getMapData    = require('../resources/mapResources').getMapData
const tilesheets    = require('../resources/tilesheetResources').sheets

const { ForegroundCanvas } = require('./ForegroundCanvas');
const { BackgroundCanvas } = require('./BackgroundCanvas');

const firstMapUrl = 'my-neighbourhood/A1/my-house';

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
    
        this.back.class.setBackgroundData( mapData );
        this.back.class.loadImageWithCallback( '/static/tilesets/' + sheetData.src, this.back.class.drawMapFromGridData );
    
        this.front.class.setForegroundData( mapData );
        this.front.class.setSpritesToGrid( );
    }

    clearMapFromCanvases( ) {
        [ this.back, this.front ].forEach( ( canvasWrapper ) => {
            canvasWrapper.ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );
            canvasWrapper.class.clearMap( );
        })
    }

    switchMap ( destination, type ) {
        controls.clearPressedKeys( );
        controls.stopListenForKeyPress( );

        const newMapData = getMapData( destination );
        console.log('new map data')
        console.log(newMapData)
        this.clearMapFromCanvases( );

        this.loadMapToCanvases( newMapData );
        this.setPlayerInNewMap( newMapData, type );
        this.storeMapData( newMapData, destination );
        controls.listenForKeyPress(); 
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
                        console.log(key)
                        switch ( key ) {
                            case 'up' : 
                                break;
                            case 'right' :
                                newPlayerCell.row = this.front.class.playerSprite.row;
                                newPlayerCell.col = mapData.columns;
                                break;
                            case 'down' :
                                break;
                            case 'left' :
                                newPlayerCell.row = this.front.class.playerSprite.row;
                                newPlayerCell.col = 1;
                                break;
                            
                        }
                    }
                })
                break;
            case 'BUS' :
                break;
        }

        this.front.class.playerSprite.setNewLocationInGrid( newPlayerCell, direction );
        this.front.class.allSprites.push( this.front.class.playerSprite );
    }
}

module.exports = {
    Game
}