import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import type { CellPosition } from '../../models/CellPositionModel';
import type { ConditionModel } from '../../models/ConditionModel';
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
        this.action         = scriptedEventData.interaction;
        this.condition      = scriptedEventData.interaction.cinematic.condition;
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