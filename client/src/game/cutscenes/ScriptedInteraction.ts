import globals from "../../game-data/globals";
import { Interaction } from "./Interaction";
import { addEventToRegistry } from '../../helpers/interactionRegistry';
import { initCinematicGrids, clearCinematicGrids, clearMapFromCanvases } from '../../helpers/loadMapHelpers';
import type { InteractionModel } from "../../models/InteractionModel";
import type { CinematicTrigger } from "../../enumerables/CinematicTriggerEnum";

export class ScriptedInteraction extends Interaction {
    constructor( interactionModel: InteractionModel, trigger: CinematicTrigger, args: any[] ) {      
        globals.GAME.usingCinematicMap = true;
        initCinematicGrids( );
        super( interactionModel, trigger, args );
    }

    handleEndOfCinematicTrigger( ) {
        const GAME = globals.GAME;
        GAME.usingCinematicMap = false;
        clearMapFromCanvases(GAME)
        if ( this.model.shouldBeRegistered ) {
            if ( this.registeredSelection !== null ) {
                addEventToRegistry( this.model.registryKey, this.registeredSelection )
            }
            else {
                addEventToRegistry( this.model.registryKey )  
            }
        }

        clearCinematicGrids( );

        super.handleEndOfCinematicTrigger( );
    }
}