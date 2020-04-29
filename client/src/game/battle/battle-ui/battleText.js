const canvas = require( '../../../helpers/canvasHelpers' )
const state = require( '../../../game-data/state' )
const globals = require( '../../../game-data/globals' )

const initTextContainer = ( isDebug = false ) => {
    if ( isDebug ) {
        state.battleState.debugText = new TextContainer( "Debug", false, isDebug )  
    }
    else {
        state.battleState.textContainer = new TextContainer( )        
    }
}

class TextContainer {
    constructor( text = "", showUI = true, isDebug = false ) {
        this.isDebug = isDebug        
        this.animationFrame = 0

        if ( !isDebug ) {
            this.width  = globals.CANVAS_WIDTH / 2
            this.height = globals.CANVAS_HEIGHT / 6
            this.x      = globals.CANVAS_WIDTH / 4
            this.y      = (globals.CANVAS_HEIGHT / 6) * 5     
            this.isMoveMenu = false;       
        }
        else {
            this.width  = globals.CANVAS_WIDTH / 3
            this.height = globals.CANVAS_HEIGHT / 12
            this.x      = globals.CANVAS_WIDTH / 3
            this.y      = globals.CANVAS_HEIGHT * .05           
        }


        this.text           = text
        this.waiting        = false;
        this.buttonColor    = "black"

        this.drawContainer( showUI )
    }

    drawContainer( showUI ) {
        this.animationFrame++
        if ( this.animationFrame > ( globals.FRAME_LIMIT * 2 ) ) {
            this.switchButtonColor()
            this.animationFrame = 0
        }

        if ( !this.isDebug && !this.isMoveMenu ) {
            canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, "rgba(0,0,0, 0.66)" );
            canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, 'rgba(255,255,255, 0.66)' );
            canvas.writeTextLine( this.text, this.x + globals.LARGE_FONT_SIZE, this.y + ( globals.LARGE_FONT_SIZE * 2 ), 'LARGE', "black" )  
            canvas.writeTextLine( "(Q) Ok", this.x + globals.LARGE_FONT_SIZE, this.y + this.height - globals.SMALL_FONT_SIZE, "SMALL", this.buttonColor )                  
        }
        else if ( this.isMoveMenu ) {
            canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, "rgba(0,0,0, 0.66)" );
            canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, 'rgba(255,255,255, 0.66)' );
            canvas.writeTextLine( this.text, this.x + globals.LARGE_FONT_SIZE, this.y + ( globals.LARGE_FONT_SIZE * 2 ), 'LARGE', "black" )  
            canvas.writeTextLine("(Q) Ok", this.x + globals.LARGE_FONT_SIZE, this.y + this.height - globals.SMALL_FONT_SIZE, "SMALL", this.buttonColor)                  
            canvas.writeTextLine("(E) Back",  this.x + ( this.width / 2 ) + globals.LARGE_FONT_SIZE, this.y + this.height - globals.SMALL_FONT_SIZE, "SMALL", this.buttonColor) 
        }
        else {
            var turn = ( state.battleState.player.hasTurn ) ? "Player" : "Computer"
            var phases = {
                PHASE_BEGIN_TURN    : 0,
                PHASE_SELECT_MOVE   : 1,
                PHASE_DO_MOVE       : 2,
                PHASE_STAT_CHECK    : 3,
                END                 : 4
            }
            var phase = Object.keys(phases).find(key => phases[key] === state.battleState.battlePhase)
            
            canvas.drawRect( "FRONT", this.x - 2, this.y - 2, this.width + 4, this.height + 4, "rgba(0,0,0, 0.66)" );
            canvas.drawRect( "FRONT", this.x, this.y, this.width, this.height, 'rgba(255,255,255, 0.66)' );
            canvas.writeTextLine( "Phase: " + phase, this.x + globals.LARGE_FONT_SIZE, this.y + ( globals.LARGE_FONT_SIZE * 2 ), 'LARGE', "black" )  
            canvas.writeTextLine( "Turn: " + turn, this.x + globals.LARGE_FONT_SIZE, this.y + globals.LARGE_FONT_SIZE * 4, 'LARGE', "black" )  
        }
      
    }
    
    setMoveMenu( ) {
        this.isMoveMenu = true;
    }

    unsetMoveMenu( ) {
        this.isMoveMenu = false
    }

    switchButtonColor( ) {
        this.buttonColor = ( this.buttonColor == "black" ) ? "#800020" : "black"
    }

    setText( text ) {
        this.text = text
    }
}

module.exports = {
    initTextContainer
}