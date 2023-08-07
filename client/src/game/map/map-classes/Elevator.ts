import { PLAYER_ID } from "../../../game-data/interactionGlobals";
import type { ElevatorModel } from "../../../models/ElevatorModel";
import type { FrameModel } from "../../../models/SpriteFrameModel";
import { INTERACTION_ELEVATOR } from "../../../resources/interactionResources";
import { setElevatorBubble } from "../../controllers/bubbleController";
import { getActiveMapKey } from "../../neighbourhoodModule";
import { ActionSelector } from "./ActionSelector";

export class Elevator extends ActionSelector {
    mapName: string;
    elevatorModel: ElevatorModel;
    constructor( frame: FrameModel, elevator: ElevatorModel ) {
        super( frame, INTERACTION_ELEVATOR, PLAYER_ID );
        this.mapName = getActiveMapKey();
        this.elevatorModel = elevator;
        this.arcColor = "#00FF00";
    }
    get registryString(): string {
        return this.mapName + "_" + this.elevatorModel.direction + "_" + this.elevatorModel.column + "_" + this.elevatorModel.row + "_ELEVATOR";
    }
    dismiss() {
        setElevatorBubble( this.elevatorModel.floors, this.elevatorModel.id, this.mapName );
    }
}