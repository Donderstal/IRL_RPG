const { MapAction } = require("./MapAction");

class ActionSelector {
    constructor( x, y, actionList, spriteId = null ) {
        this.spriteId = spriteId;
        this.activateAction;
        this.actionList = JSON.parse(JSON.stringify(actionList));
        this.conditionalActions = [];

        this.initializeConditionList( x, y, actionList, spriteId );
    }

    get action( ) { return this.activeAction };

    draw( ) {
        this.activeAction.draw( );
    }

    updateXy( x, y ) {
        this.checkForConditions( );
        this.conditionalActions.forEach( ( action ) => { 
            action.updateXy( x, y )
        })
    }

    checkForActionRange( ) {
        this.activeAction.checkForActionRange( )
    }

    checkForBlockedRange( ) {
        this.activeAction.checkForBlockedRange( )
    }

    handle( ) {
        this.activeAction.handle( );
    }

    confirm( ) {
        this.activeAction.dismiss( );
    }

    checkForEventOnBattleEnd( ) {
        this.activeAction.checkForEventOnBattleEnd( );
    }

    initializeConditionList( x, y, actionList, spriteId ) {
        actionList.forEach( ( item ) =>{
            this.conditionalActions.push( new MapAction( x, y, item.action, spriteId, item.condition ) );
        })
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