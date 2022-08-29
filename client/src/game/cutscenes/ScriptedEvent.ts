import { CinematicTrigger } from '../../enumerables/CinematicTriggerEnum';
import type { CellPosition } from '../../models/CellPositionModel';
import type { ConditionModel } from '../../models/ConditionModel';
import type { InteractionModel } from '../../models/InteractionModel';
import type { StoryEventModel } from '../../models/StoryEventModel';
import { setActiveCinematic } from '../controllers/cinematicController';

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
        this.action         = scriptedEventData.interaction[0];
        this.condition      = scriptedEventData.interaction[0].condition;
        this.fired          = false;
        this.name           = scriptedEventData.name
        this.id             = scriptedEventData.id;

        if ( scriptedEventData.trigger == CinematicTrigger.position ) {
            this.position = scriptedEventData.position
        }
    }

    fireEvent( args = null ) {
        if ( !this.fired ) {
            setActiveCinematic( this.action, this.trigger, args );
            this.fired = true;           
        }
    }
}