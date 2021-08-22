const { EVENT_BATTLE, EVENT_SHOP, EVENT_SLEEP } = require("../../../game-data/conditionGlobals");
const { MapAction } = require("./MapAction");

class ActionSelector {
    constructor( x, y, actionList, spriteId = null ) {
        this.spriteId = spriteId;
        this.activateAction;
        this.actionList = JSON.parse(JSON.stringify(actionList));
        this.conditionalActions = [];

        this.initializeConditionList( x, y, actionList, spriteId );
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

    initializeConditionList( x, y, actionList, spriteId ) {
        actionList.forEach( ( item ) =>{
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
}

module.exports = {
    ActionSelector
}