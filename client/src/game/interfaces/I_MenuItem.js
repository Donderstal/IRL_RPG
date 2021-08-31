const { LARGE_FONT_SIZE, LARGE_FONT_LINE_HEIGHT, BATTLE_FONT_SIZE, BATTLE_FONT_LINE_HEIGHT } = require('../../game-data/globals');
const { writeTextLine, drawRect, drawFromImageToCanvas } = require('../../helpers/canvasHelpers');
const { COLOR_SECONDARY, COLOR_TERTIARY } = require('../../game-data/uiGlobals')
const globals = require('../../game-data/globals');
/**
 * Each tab in the main menu is filled with a set of items. The content of these items vary.
 * In the inventory tab it's items, in the members tab it's a party member.
 * The this.type property stores the name of the active MenuTab
 * The this.content prop stores the selectable content.
 */
class MenuItem { 
    constructor( x, y, width, height, type, content ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.content = content;

        this.isActive = false;        
        this.activeButtonColor = COLOR_SECONDARY;
        this.standardButtonColor = COLOR_TERTIARY;

        this.displayText;
        this.setDisplayText( );
    }
    /**
     * Draw the MenuItem. Its size, and contents vary depending on the active MenuTab
     */
    draw( ) {
        this.setDisplayText( )
        drawRect( "FRONT", this.x, this.y, this.width, this.height, this.standardButtonColor )
        if ( this.isActive ) {
            drawRect( "FRONT", this.x + ( LARGE_FONT_LINE_HEIGHT / 8 ), this.y + ( LARGE_FONT_LINE_HEIGHT / 8), this.width, this.height, this.activeButtonColor )
        }

        if ( this.type == "BUY" ) {
            writeTextLine( 
                " €" + this.content.Item.Price, 
                this.x + ( this.width - ( LARGE_FONT_LINE_HEIGHT * 2 ) ), this.y + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            );    
            if ( this.content.PendingForUsageQuantity > 0 ) {
                writeTextLine( 
                    "Buying " + this.content.PendingForUsageQuantity, 
                    this.x + this.width + LARGE_FONT_LINE_HEIGHT * 2, this.y + LARGE_FONT_LINE_HEIGHT, 
                    LARGE_FONT_SIZE 
                );  
            }
        }

        if ( this.type == "SELL" ) {
            writeTextLine( 
                " €" + (this.content.Item.Price / 2), 
                this.x + ( this.width - ( LARGE_FONT_LINE_HEIGHT * 2 ) ), this.y + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            );    
            if ( this.content.PendingForUsageQuantity > 0 ) {
                writeTextLine( 
                    "Selling " + this.content.PendingForUsageQuantity, 
                    this.x + this.width + LARGE_FONT_LINE_HEIGHT * 2, this.y + LARGE_FONT_LINE_HEIGHT, 
                    LARGE_FONT_SIZE 
                );  
            }
        }

        if ( this.type == "INVENTORY" || this.type == "BUY" || this.type == "SELL" ) {
            if ( this.content.Item.Image != undefined ) {
                drawFromImageToCanvas( 
                    "FRONT", this.content.Item.Image, 
                    0, 0, 807, 806, 
                    this.x + ( this.width - ( LARGE_FONT_LINE_HEIGHT * 4 ) ), this.y + ( ( this.height - LARGE_FONT_LINE_HEIGHT ) / 2 ), 
                    LARGE_FONT_LINE_HEIGHT, LARGE_FONT_LINE_HEIGHT 
                );    
            }
        }

        if ( this.type != "MEMBERS" ) {
            writeTextLine( 
                this.displayText, 
                this.x + LARGE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, this.y + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            );            
            if ( this.type == "STATUS" || this.type == "EQUIP" ) {
                writeTextLine( 
                    this.subText, 
                    this.x + ( LARGE_FONT_LINE_HEIGHT * 3 ), this.y + ( LARGE_FONT_LINE_HEIGHT * 2 ), 
                    LARGE_FONT_SIZE 
                );       
            }
        }
        else {
            writeTextLine( 
                this.displayText, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT, 
                BATTLE_FONT_SIZE
            );    
            writeTextLine( 
                "Hitpoints: " + this.content.CurrentHitpoints +"/"+ this.content.maxHP, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + LARGE_FONT_LINE_HEIGHT, 
                LARGE_FONT_SIZE 
            ); 
            writeTextLine( 
                "Level: " + this.content.Level, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + ( LARGE_FONT_LINE_HEIGHT * 2 ), 
                LARGE_FONT_SIZE 
            ); 
            writeTextLine( 
                "Experience: " + this.content.Experience, 
                this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), this.y + BATTLE_FONT_LINE_HEIGHT + ( LARGE_FONT_LINE_HEIGHT * 3 ), 
                LARGE_FONT_SIZE 
            ); 
            if ( globals.GAME.party.memberActiveOnMapIndex == globals.GAME.PARTY_MEMBERS.indexOf(this.content) ) {
                writeTextLine( 
                    "SHOWN ON MAP", 
                    this.x + ( LARGE_FONT_LINE_HEIGHT * 2 ), (this.y + this.height) - BATTLE_FONT_LINE_HEIGHT, 
                    LARGE_FONT_SIZE 
                ); 
            }
        }
    }
    /**
     * Set the this.isActive prop to true
     */
    activate( ) {
        this.isActive = true;
    }
    /**
     * Set the this.isActive prop to false
     */
    deActivate( ) {
        this.isActive = false;
    }
    /**
     * Assign value of given argument to this.content and call this.setDisplayText( )
     * @param {Object} content 
     */
    updateContent( content ) {
        this.content = content;
        this.setDisplayText( );
    }
    /**
     * Set the this.displayText prop depending on the value of this.type
     */
    setDisplayText( ) {
        switch( this.type ) {
            case "SELECT_MOVE":
                this.displayText = this.content.Name != undefined ? this.content.Name : this.content["NAME"];
                break;
            case "INVENTORY": 
                this.displayText = this.content.Quantity + "x - " + this.content.Item.Name 
                break;
            case "BUY":
                this.displayText = this.content.Quantity + "x - " + this.content.Item.Name
                break;
            case "SELL":
                this.displayText = this.content.Quantity + "x - " + this.content.Item.Name
                break;
            case "GAME":
                this.displayText = this.content.title;
                break;
            case "MEMBERS":
                this.displayText = this.content.Name;
                break;
            case "STATUS":
            case "EQUIP":
                this.displayText = this.content.equipmentType
                this.subText     = this.content.item == null ? "none" : this.content.item.Name;
                break;
        }
    }
}

module.exports = {
    MenuItem
}