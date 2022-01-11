const { EVENT_BATTLE, EVENT_SHOP, EVENT_SLEEP } = require("../../../game-data/conditionGlobals");
const { getAction } = require("../../../helpers/actionDtoFactory");
const { MapAction } = require("./MapAction");

class ActionSelector {
    constructor( x, y, actionList, spriteId = null ) {
        this.spriteId = spriteId;
        this.activateAction;
        this.actionList = actionList.map((e)=>{
            console.log(e)
            return getAction(e[0], e[1]);}
        )
        this.conditionalActions = [];

        this.initializeConditionList( x, y, spriteId );
        this.outerTop       = ( ) => { return this.action.outerTop() }
        this.outerLeft      = ( ) => { return this.action.outerLeft() }
        this.outerRight     = ( ) => { return this.action.outerRight() }
        this.outerBottom    = ( ) => { return this.action.outerBottom() }       
        this.top            = ( ) => { return this.action.top() }
        this.left           = ( ) => { return this.action.left() }
        this.right          = ( ) => { return this.action.right() }
        this.bottom         = ( ) => { return this.action.bottom() }
        this.innerTop       = ( ) => { return this.action.innerTop() }
        this.innerLeft      = ( ) => { return this.action.innerLeft() }
        this.innerRight     = ( ) => { return this.action.innerRight() }
        this.innerBottom    = ( ) => { return this.action.innerBottom() }
    }

    get action( ) { return this.activeAction; };
    get inventory( ) { return this.activeAction.inventory; };
    get dismissAtCinematicEnd( ) { 
        return this.activeAction.type != EVENT_SLEEP && this.activeAction.type != EVENT_SHOP && this.activeAction.type != EVENT_BATTLE
    }

    draw( ) {
        this.activeAction.draw( );
    }

    updateXy( x, y ) {
        this.checkForConditions( );
        this.conditionalActions.forEach( ( action ) => { 
            action.updateXy( x, y )
        })
    }

    registerSelection( selection ) {
        this.activeAction.registerSelection( selection )
    }

    handle( ) {
        this.activeAction.handle( );
    }

    confirm( ) {
        this.activeAction.dismiss( );
    }

    dismiss( ) {
        this.activeAction.dismiss( );
    }

    resetAction( ) {
        this.activeAction.resetAction( );
    }

    checkForEventOnBattleEnd( ) {
        this.activeAction.checkForEventOnBattleEnd( );
    }

    initializeConditionList( x, y, spriteId ) {
        this.actionList.forEach( ( item ) =>{
            this.conditionalActions.push( new MapAction( x, y, item.action, spriteId, item.condition ) );
        })
        this.checkForConditions( );
    }

    checkForConditions( ) {
        for( var i = 0; i < this.conditionalActions.length; i++ ) {
            let currentAction = this.conditionalActions[i];
            if ( currentAction.meetsCondition ) {
                this.activeAction = currentAction;
                return;
            }
        }
    }

    evaluate( ) {
        this.checkForConditions( );
        return this.action;
    }
}

module.exports = {
    ActionSelector
}