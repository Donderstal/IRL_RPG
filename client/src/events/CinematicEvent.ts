import type { CinematicTrigger } from "../enumerables/CinematicTriggerEnum";
import type { InteractionModel } from "../models/InteractionModel";

export class CinematicEvent {
    interaction: InteractionModel;
    trigger: CinematicTrigger;
    options: any[];
    constructor( interaction: InteractionModel, trigger: CinematicTrigger, options: any[] ) {
        this.interaction = interaction;
        this.trigger = trigger;
        this.options = options;
    }
}