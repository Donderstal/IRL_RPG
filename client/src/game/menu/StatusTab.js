const { MenuTab } = require('../interfaces/I_MenuTab')
const { drawRect, writeTextLine, drawFromImageToCanvas } = require('../../helpers/canvasHelpers');
const { cloneInstance } = require('../../helpers/utilFunctions');
const globals = require('../../game-data/globals');
const { 
    GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT, LARGE_FONT_LINE_HEIGHT, LARGE_FONT_SIZE,
    MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
    STRD_SPRITE_WIDTH, STRD_SPRITE_HEIGHT,
    ATTRIBUTE_MENU_TEXTS, EQUIPMENT_SLOTS_LIST, ATTRIBUTE_LIST
} = require('../../game-data/globals');
/**
 * In the StatusMenuTab, the player can have a detailed look at the attributes of the members of the party.
 * The player can scroll between different characters and equip or unequip items.
 */
class StatusMenuTab extends MenuTab {
    constructor( ) {
        super( "STATUS", "VERT", 6 )
        this.setButtonHeight( this.height / 6 );
        this.setButtonWidth( this.width / 5 );
        this.itemSubMenuOptions = [ "EQUIP", "UNEQUIP", "RETURN" ];

        this.redArrow = new Image();
        this.redArrow.src = "/static/ui/red_arrow_down.png";
        this.redArrow.onload = ( ) => {
            this.redArrow.loaded = true;
        };

        this.greenArrow = new Image();
        this.greenArrow.src = "/static/ui/green_arrow_up.png";
        this.greenArrow.onload = ( ) => {
            this.greenArrow.loaded = true;
        };

        this.activeOption;
        this.activeCharacter = null;
        this.activeCharacterIndex = 0;
    }
    /**
     * Return an array of objects containing the names of equipment slots and current items in it.
     */
    getEquipmentData( ) {
        let equipmentDataArray = [];
        EQUIPMENT_SLOTS_LIST.forEach( ( slot ) => {
            equipmentDataArray.push( { equipmentType: slot, item: this.activeCharacter.Equipment[slot] } )
        })
        return equipmentDataArray
    }
    /**
     * Set active character and active index. 
     * Then, set buttons in a column with this.getEquipmentData as content.
     * Finally, call activateButtonAndSetSubMenuPosition
     * @param {Number} selectedCharacterIndex 
     */
    setButtons( selectedCharacterIndex = null) {
        this.buttons = [];
        this.activeCharacterIndex = selectedCharacterIndex != null ? selectedCharacterIndex : 0; 
        this.activeCharacter = globals.GAME.PARTY_MEMBERS[this.activeCharacterIndex];
        this.setButtonsInColumn( ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), this.getEquipmentData( ) );
        super.activateButtonAndSetSubMenuPosition( )
    }
    /**
     * Depending on the value of this.activeOption, call the associated functions.
     * Then, unset the active modal and reset the button with this.activeCharacterIndex
     */
    doActiveModalOption( ) {
        if ( this.activeOption == "EQUIP" && this.modal.activeButton.item != undefined && this.modal.activeButton.text != "OK!" ) {
            globals.GAME.PLAYER_INVENTORY.unequipItemAtCharacterEquipmentSlot( this.activeItem, this.activeCharacter );
            globals.GAME.PLAYER_INVENTORY.equipItem( this.activeCharacter, this.modal.activeButton.item.ItemTypeId );
        }
        if ( this.activeOption == "UNEQUIP" && this.modal.activeButton.text == "YES" ) {
            globals.GAME.PLAYER_INVENTORY.unequipItemAtCharacterEquipmentSlot( this.activeItem, this.activeCharacter );
        }
        this.unsetModal( );
        this.setButtons( this.activeCharacterIndex );
    }
    /**
     * Copy the Equipment class instance belonging to the active character.
     * Call equipItem for each item in the equipment to set its values.
     * Equip or unequip the selected item based on actionType.
     * Then, apply the equipments' effects to attributes and set it 
     * to this.selectedEquipmentAttributesValues
     * @param {String} actionType 
     */
    setSelectedEquipmentAttributesValues( actionType ) {
        const Equipment = cloneInstance(this.activeCharacter.Equipment);
        EQUIPMENT_SLOTS_LIST.forEach( ( key ) => {
            if ( Equipment[key] != null ) {
                Equipment.equipItem( Equipment[key] )
            }
        } );

        if ( actionType == "EQUIP" ) {
            Equipment.equipItem( this.modal.activeButton.item );
        } 
        else if ( actionType == "UNEQUIP" ) {
            Equipment[this.activeItem] = null;
            Equipment.effects[this.activeItem] = null;
        };

        let attributes = this.activeCharacter.getAttributesBeforeEquipment( );        
        this.selectedEquipmentAttributesValues = Equipment.applyEquipmentEffectsToAttributes( attributes );
    }
    /**
     * Call drawLeftPanel and drawRightPanel before super.draw
     */
    draw( ) {
        this.drawLeftPanel( );
        this.drawRightPanel( );
        super.draw( );
    }
    /**
     * Call a series of canvas functions to draw the StatusTab left panel
     * TODO: Replace canvas rects with UI sprites when they are finished
     */
    drawLeftPanel( ) {
        drawRect( "FRONT", 
            GRID_BLOCK_PX / 2, GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .66 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
        "#FADADD" )
        
        const statusTexts = [ 
            "CHARACTER", "NAME: " + this.activeCharacter.Name, "CLASS: " + this.activeCharacter.ClassName,
            "LEVEL: " + this.activeCharacter.Level, "EXPERIENCE: " + this.activeCharacter.Experience
        ];
        statusTexts.forEach( ( text, index ) => {
            writeTextLine( 
                text, 
                GRID_BLOCK_PX, ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1 ) ), 
                LARGE_FONT_SIZE, "#000000" 
            );
        })

        ATTRIBUTE_LIST.forEach( ( attribute, index ) => {
            const currentTextY = ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * ( index + 1) )
            const currentArrowY = ( this.height / 2 ) + ( GRID_BLOCK_PX * 2 ) + ( LARGE_FONT_LINE_HEIGHT * index ) + LARGE_FONT_SIZE;
            if ( index < 2 ) { // HP or PP
                this.drawHealthOrPowerLine( attribute, currentTextY, currentArrowY, index )
            }
            else { // Other attributes
                this.drawAttributeLine( attribute, currentTextY, currentArrowY )
            }
        })

        drawFromImageToCanvas( 
            "FRONT", this.activeCharacter.Sprite,
            0, 0,
            MAP_SPRITE_WIDTH_IN_SHEET, MAP_SPRITE_HEIGHT_IN_SHEET,
            CANVAS_WIDTH * .33, GRID_BLOCK_PX * 3,
            STRD_SPRITE_WIDTH * 4, STRD_SPRITE_HEIGHT * 4
        );
    }
    /**
     * @param {String} key attribute key from globals file
     * @param {Number} currentTextY y position for text lines
     * @param {Number} currentArrowY y position for the ui arrow
     * @param {Number} index index of key in attributes array
     */
    drawHealthOrPowerLine( key, currentTextY, currentArrowY, index ) {
        writeTextLine( 
            ATTRIBUTE_MENU_TEXTS[key], 
            GRID_BLOCK_PX, currentTextY, 
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine(
            (index == 0 ? this.activeCharacter.CurrentHitpoints : this.activeCharacter.CurrentPowerpoints) + " / ", 
            GRID_BLOCK_PX * 3.5, currentTextY, 
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine( 
            this.activeCharacter.activeAttributeValues[key], 
            GRID_BLOCK_PX * 4, currentTextY, 
            LARGE_FONT_SIZE, "#000000" 
        );
        this.drawAttributeArrows( key, currentArrowY );
    }
    /**
     * @param {String} key attribute key from globals file
     * @param {Number} currentTextY y position for text lines
     * @param {Number} currentArrowY y position for the ui arrow
     */
    drawAttributeLine( key, currentTextY, currentArrowY ) {
        writeTextLine( 
            ATTRIBUTE_MENU_TEXTS[key], 
            GRID_BLOCK_PX, currentTextY, 
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine( 
            this.activeCharacter.activeAttributeValues[key], 
            GRID_BLOCK_PX * 4, currentTextY, 
            LARGE_FONT_SIZE, "#000000" 
        );
        this.drawAttributeArrows( key, currentArrowY );
    }
    /**
     * If the given attribute will be raised or lowered by the pending un/equip action
     * draw a red or green arrow to communicate that change to the user
     * @param {String} key attribute key from globals file
     * @param {Number} y y position of the arrow on canvas
     */
    drawAttributeArrows( key, y ) {
        if ( this.modal && this.activeCharacter.activeAttributeValues[key] < this.selectedEquipmentAttributesValues[key] ) {
            drawFromImageToCanvas(
                "FRONT", this.greenArrow, 
                0, 0, 768, 768, 
                GRID_BLOCK_PX * 5, y, 
                LARGE_FONT_SIZE, LARGE_FONT_SIZE
            ); 
        }
        else if ( this.modal && this.activeCharacter.activeAttributeValues[key] > this.selectedEquipmentAttributesValues[key] ) {
            drawFromImageToCanvas(
                "FRONT", this.redArrow, 
                0, 0, 1200, 1200, 
                GRID_BLOCK_PX * 5, y, 
                LARGE_FONT_SIZE, LARGE_FONT_SIZE
            ); 
        }
    }
    /**
     * Call a series of canvas functions to draw the StatusTab right panel
     * TODO: Replace canvas rects with UI sprites when they are finished
     */
    drawRightPanel( ) {
        drawRect( 
            "FRONT", 
            ( CANVAS_WIDTH * .66 ) + ( GRID_BLOCK_PX / 2 ), GRID_BLOCK_PX * 2, 
            ( CANVAS_WIDTH * .33 ) - GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ), 
            "#FADADD" 
        );
        writeTextLine( 
            "EQUIPMENT", 
            GRID_BLOCK_PX + ( CANVAS_WIDTH * .66 ), ( GRID_BLOCK_PX * 2 ) + LARGE_FONT_LINE_HEIGHT, 
            LARGE_FONT_SIZE, "#000000"
        );
        writeTextLine( 
            "Previous character - [ A ]", 
            ( CANVAS_WIDTH * .66 ) + GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ) - (LARGE_FONT_LINE_HEIGHT * 2), 
            LARGE_FONT_SIZE, "#000000" 
        );
        writeTextLine( 
            "Next character - [ D ]", 
            ( CANVAS_WIDTH * .66 ) + GRID_BLOCK_PX, CANVAS_HEIGHT - ( GRID_BLOCK_PX * 2 ) - LARGE_FONT_LINE_HEIGHT, 
            LARGE_FONT_SIZE, "#000000" 
        );
    }
}

module.exports = { 
    StatusMenuTab
}