const { MenuTab } = require('../interfaces/I_MenuTab')
const { drawRect, writeTextLine } = require('../../helpers/canvasHelpers');
const globals = require('../../game-data/globals');
const { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE } = require('../../game-data/globals');

class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT", 6 )
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 4 );
        this.activeCharacter = null;
    }

    setButtons( selectedCharacter = null ) {
        this.activeCharacter = selectedCharacter == null ? globals.GAME.PARTY_MEMBERS[0] : selectedCharacter;
        const equipmentNames = [ 
            { equipmentType: "WEAPON", item: this.activeCharacter.Equipment["Weapon"] },
            { equipmentType: "HEAD", item: this.activeCharacter.Equipment["Head"] },
            { equipmentType: "ACCESSORY", item: this.activeCharacter.Equipment["Accessory"] },
            { equipmentType: "UPPER BODY", item: this.activeCharacter.Equipment["UpperBody"] },
            { equipmentType: "LOWER BODY", item: this.activeCharacter.Equipment["LowerBody"] },
        ]

        this.setButtonsInColumn( ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), equipmentNames );
    }

    draw( ) {
        this.drawLeftPanel( );
        this.drawRightPanel( );
        super.draw( );
    }

    drawLeftPanel( ) {
        drawRect( "FRONT", 
            GRID_BLOCK_PX / 2, GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .66 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
        "#FADADD" )
        writeTextLine( "CHARACTER", GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, "#000000" )
    }

    drawRightPanel( ) {
        drawRect( "FRONT", 
            ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .33 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
        "#FADADD" )
        writeTextLine( "EQUIPMENT", GRID_BLOCK_PX + ( CANVAS_WIDTH * .66 ), ( GRID_BLOCK_PX * 2 ) + LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE, "#000000" )
    }
}

module.exports = { 
    StatusMenuTab
}