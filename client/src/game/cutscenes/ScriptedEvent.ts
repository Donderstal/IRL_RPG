import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import { getAction } from '../../helpers/actionDtoFactory';
import type { CellPosition } from '../../models/CellPositionModel';
import type { ConditionModel } from '../../models/ConditionModel';
import type { GridCellModel } from '../../models/GridCellModel';
import type { InteractionModel } from '../../models/InteractionModel';
import type { StoryEventModel } from '../../models/StoryEventModel';
import { ScriptedInteraction } from './ScriptedInteraction';

export class ScriptedEvent {
    mapName: string;
    name: string;
    id: string;

    trigger: CinematicTrigger;
    condition: ConditionModel;
    action: InteractionModel;

    fired: boolean;
    passScene: boolean;
    position: CellPosition;
    constructor( scriptedEventData: StoryEventModel ) {
        this.mapName        = scriptedEventData.mapName;
        this.trigger        = scriptedEventData.trigger;
        const eventScript   = getAction(scriptedEventData.condition, scriptedEventData.scenes);
        this.action         = eventScript.action;
        this.condition      = eventScript.condition;
        this.fired          = false;
        this.name           = scriptedEventData.name
        this.id             = scriptedEventData.id;

        if ( scriptedEventData.trigger == CinematicTrigger.interaction ) {
            this.position = scriptedEventData.position
        }
    }

    fireEvent( args = null ) {
        if ( !this.fired ) {
            new ScriptedInteraction( this.action, this.trigger, args );
            this.fired = true;           
        }
    }
}

module.exports = {
    ScriptedEvent
}