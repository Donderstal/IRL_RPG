import { PLAYER_ID } from "../../../game-data/interactionGlobals";
import type { ElevatorModel } from "../../../models/ElevatorModel";
import { INTERACTION_ELEVATOR } from "../../../resources/interactionResources";
import { setElevatorBubble } from "../../controllers/bubbleController";
import { getActiveMapKey } from "../../neighbourhoodModule";
import { ActionSelector } from "./ActionSelector";

export class Elevator extends ActionSelector {
    mapName: string;
    elevatorModel: ElevatorModel;
    constructor( x: number, y: number, elevator: ElevatorModel ) {
        super( x, y, INTERACTION_ELEVATOR, PLAYER_ID );
        this.mapName = getActiveMapKey();
        this.elevatorModel = elevator;
        this.arcColor = "#00FF00";
    }
    get registryString(): string {
        return this.mapName + "_" + this.elevatorModel.direction + "_" + this.elevatorModel.column + "_" + this.elevatorModel.row + "_ELEVATOR";
    }
    dismiss() {
        setElevatorBubble( this.elevatorModel.floors );
        super.dismiss();
    }
}