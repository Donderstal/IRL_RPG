import { MapAction } from "./MapAction";
import type { InteractionModel } from "../../../models/InteractionModel";
import type { InteractionAnswer } from "../../../enumerables/InteractionAnswer";
import { initInteractionModel } from "../../../helpers/modelFactory";

export class ActionSelector {
    activeAction: MapAction;
    spriteId: string;
    actionList: InteractionModel[];
    conditionalActions: any[]
    constructor( x, y, actionList, spriteId = null ) {
        this.spriteId = spriteId;
        this.actionList = actionList.map( ( e ) => { return initInteractionModel( e ); } );
        this.conditionalActions = [];

        this.initializeConditionList( x, y, spriteId );
    }

    get x(): number { return this.action.x }
    get y(): number { return this.action.y }

    get needsConfirmation(): boolean { return this.action.needsConfirmation }
    get outerTop(): number { return this.action.outerTop }
    get outerLeft(): number { return this.action.outerLeft }
    get outerRight(): number { return this.action.outerRight }
    get outerBottom(): number { return this.action.outerBottom }
    get top(): number { return this.action.top }
    get left(): number { return this.action.left }
    get right(): number { return this.action.right }
    get bottom(): number { return this.action.bottom }
    get innerTop(): number { return this.action.innerTop }
    get innerLeft(): number { return this.action.innerLeft }
    get innerRight(): number { return this.action.innerRight }
    get innerBottom(): number { return this.action.innerBottom }

    get action(): MapAction { return this.activeAction; };

    draw( ): void {
        this.activeAction.draw( );
    }

    updateXy( x: number, y: number ): void {
        this.checkForConditions( );
        this.conditionalActions.forEach( ( action: MapAction ) => { 
            action.updateXy( x, y );
        })
    }

    registerSelection( selection: InteractionAnswer ): void {
        this.activeAction.registerSelection( selection );
    }

    handle( ): void {
        this.activeAction.handle( );
    }

    confirm(): void {
        this.activeAction.dismiss( );
    }

    dismiss(): void {
        this.activeAction.dismiss( );
    }

    resetAction(): void {
        this.activeAction.resetAction( );
    }

    initializeConditionList( x: number, y: number, spriteId: string ): void {
        this.actionList.forEach( ( item ) =>{
            this.conditionalActions.push( new MapAction( x, y, item, spriteId, item.cinematic.condition ) );
        })
        this.checkForConditions( );
    }

    checkForConditions(): void {
        for( var i = 0; i < this.conditionalActions.length; i++ ) {
            let currentAction = this.conditionalActions[i];
            if ( currentAction.meetsCondition ) {
                this.activeAction = currentAction;
                return;
            }
        }
    }

    evaluate(): MapAction {
        this.checkForConditions( );
        return this.action;
    }
}