const canvas    = require('../../../helpers/canvasHelpers');
const globals   = require('../../../game-data/globals');

class battleButton {
    constructor ( x, y, buttonText, toolTipText, hintText ) {

        this.ctx        = canvas.getFrontCanvasContext()
        this.centralX   = x,
        this.centralY   = y,
        this.range      = globals.GRID_BLOCK_PX * .5
        this.text       = buttonText,
        this.toolTip    = toolTipText,
        this.hint       = hintText
        this.isMenuButton = false;

        this.textColor  = "black"
        this.active     = false

        canvas.setFont( "LARGE" );
        this.textX      = x - ( this.ctx.measureText(buttonText).width * .5 ),
        this.textY      = y + ( globals.SMALL_FONT_SIZE * .75 )
        this.toolTipX   = x - ( ( globals.GRID_BLOCK_PX * .75 ) + this.ctx.measureText(toolTipText).width )
        this.toolTipY   = y + ( globals.SMALL_FONT_SIZE * .5 )

        this.drawButton( );
    }

    setToolTip( toolTipText ) {
        canvas.setFont( "LARGE" );
        this.toolTip    = toolTipText,
        this.toolTipX   = this.centralX - ( ( globals.GRID_BLOCK_PX * .75 ) + this.ctx.measureText(this.toolTip).width ) 
    }

    drawButton( ) {
        canvas.drawCircle( this.centralX, this.centralY, this.range, this.text )
        canvas.writeTextLine( this.text, this.textX, this.textY, "LARGE", this.textColor )
        if ( this.active || this.isMenuButton ) {
            canvas.writeTextLine( this.toolTip, this.toolTipX, this.toolTipY, "LARGE" )            
        }
    }

    setActive( setToActive = false ) {
        if ( setToActive ) {
            this.active = true;
            this.textColor  = "#F6AA1C"
        }
        else {
            this.active = false;
            this.textColor  = "black"
        }
    }
}

module.exports = {
    battleButton
}