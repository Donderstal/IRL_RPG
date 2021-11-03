const globals       = require('../../../game-data/globals')
const { I_Hitbox }     = require('../../interfaces/I_Hitbox')
const { Cinematic }     = require('../../cutscenes/Cinematic')
const { conditionIsTrue } = require("../../../helpers/conditionalHelper");
const { addEventToRegistry } = require('../../../helpers/interactionRegistry');
const { INTERACTION_YES } = require('../../../game-data/interactionGlobals');
const { Inventory } = require('../../party/Inventory');
const { initShopMenu } = require('../map-ui/ShopMenu');
const { 
    WAIT, FADE_IN_OUT, FADE_OUT, FADE_IN, ON_LEAVE, ON_BATTLE_END, ON_BATTLE_START, ON_NPC_INTERACTION, 
    EVENT_BUS, EVENT_BATTLE, EVENT_SHOP, EVENT_RESTORE, EVENT_TALK
} = require('../../../game-data/conditionGlobals');
/**
 * A Mapaction is a I_Hitbox extension that has an event tied to it.
 * If the player is in the action range of the MapAction and hits space, the event is triggered.
 */
class MapAction extends I_Hitbox {
    constructor ( x, y, action, spriteId = null, condition = null ) {
        super( x, y, globals.GRID_BLOCK_PX / 2 )

        Object.keys( action ).forEach( ( key ) => {
            this[key] = action[key];  
        } )

        this.arcColor   = "#FF0000";
        this.spriteId   = spriteId;
        this.registeredSelection = false;
        this.confirmingAction    = false;

        this.setScenesNameAndSfx( );
        if ( condition != null ) {
            this.conditionType = condition["type"];
            this.conditionValue = condition["value"];
        }
        if ( this["available_items"] ) {
            this.inventory = new Inventory( );
            this.idList = [];
            Object.keys( this["available_items"] ).forEach( ( itemID ) => {
                let item = this["available_items"][itemID]
                for ( var i = 0; i < item.amount; i++ ) {
                    this.idList.push( item.id );
                }
            } )
            this.inventory.addItemsToInnerListByID( this.idList );
            this.inventory.addMoney( this["money"] )
        }
    }
    get meetsCondition( ) { return conditionIsTrue( this.conditionType, this.conditionValue ) }
    get needsConfirmation( ) { return this.type != EVENT_TALK; }
    /**
     * 
     */
    setScenesNameAndSfx( ) {
        if ( this.scenes ) {
            this.checkPropsForScenes(this.scenes)
        }
        if ( this.events ) {
            this.events.forEach( ( e ) => { 
                let event = e;
                this.checkPropsForScenes( event.scenes )
            } )
        }
    }
    /**
     * 
     */
    checkPropsForScenes( scenes ) {
        scenes.forEach( ( e ) => {
            if ( !e.spriteName && e.type != FADE_IN_OUT && e.type != FADE_OUT && e.type != FADE_IN && e.type != WAIT ) {
                e.spriteName = globals.GAME.FRONT.spriteDictionary[this.spriteId].name;
                e.spriteId = this.spriteId;
            }
            if ( !e.sfx  && e.type != "WAIT" ) {
                e.sfx = this.sfx;
            }
            if ( e.pathNo ) {
                this.checkPropsForScenes( e.pathNo )
            }
            if ( e.pathYes ) {
                this.checkPropsForScenes( e.pathYes )
            }
        } )
    }
    /**
     * Handle and in-range actionbutton click by the player based on the this.type prop
     */
    handle( ) { 
        this.startCinematicScript( )
    }
    /**
     * Confirm that the globals.GAME.activeAction set in the this.handle method should be triggered
     */
    confirm( ) {
        this.confirmingAction = true;
        switch ( this.type ) {
            case EVENT_BUS :
                this.events.forEach( ( e ) => {
                    if ( e["trigger"] == ON_LEAVE ) {
                        new Cinematic( e, e["trigger"], [ this.destination, EVENT_BUS ] );                            
                    }
                } )
                break;
            case EVENT_BATTLE : 
                if ( this.hasEvent ) {
                    this.events.forEach( ( e ) => {
                        if ( e["trigger"] == ON_BATTLE_START ) {
                            new Cinematic( e, e.trigger, [ this.party, this.name ] );                            
                        }
                    } )
                }
                else {
                    globals.GAME.initializeBattle( this.party, this.name );                    
                };
                break;
            case EVENT_SHOP :
                initShopMenu( );
                break;
            case EVENT_RESTORE :
                this.healPlayerPartyOnRest( );
                break;
            default: 
                console.log('Error! ' + this.type + " is not a valid action type")
                break;
        }
    }

    dismiss( ) {
        if ( this.needsConfirmation && this.registeredSelection == INTERACTION_YES && !this.confirmingAction ) {
            this.confirm( )
        }
        else {
            this.resetAction( );   
        }
    }
    /**
     * Play the sound effect at the location of this.sfx. Call displayText.getSpeechBubble with this as argument
     */
    startCinematicScript( ) {
        new Cinematic( this, ON_NPC_INTERACTION, [ this.spriteId ] );
    } 

    checkForEventOnBattleEnd( playerLostBattle ) {
        if ( !playerLostBattle ) {
            this.addEventToRegistry( );
        }
        this.events.forEach( ( e ) => {
            if ( e["trigger"] == ON_BATTLE_END ) {
                new Cinematic( e, e.trigger, [ this.party, this.name ] );                            
            }
        } )
    }

    registerSelection( selection ) {
        this.registeredSelection = selection;
    }

    addEventToRegistry( ) {
        if ( this.shouldBeRegistered && this.registeredSelection ) {
            addEventToRegistry( this.registryKey, this.registeredSelection )   
        }
        else if ( this.shouldBeRegistered ) {
            addEventToRegistry( this.registryKey )   
        }
    }

    healPlayerPartyOnRest( ) {
        globals.GAME.party.fullHealParty( );
    }

    resetAction( ) {
        this.addEventToRegistry( ); 
        globals.GAME.activeAction = null;
        this.confirmingAction = false;
    }
}

module.exports = {
    MapAction
}