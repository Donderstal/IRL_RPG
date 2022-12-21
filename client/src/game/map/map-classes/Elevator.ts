import type { DoorModel } from "../../../models/DoorModel";
import type { ElevatorModel } from "../../../models/ElevatorModel";
import { Door } from "./Door";

export class Elevator extends Door {
    elevatorModel: ElevatorModel;
    constructor( x: number, y: number, elevator: ElevatorModel, id: string ) {
        const dummyDoor: DoorModel = {
            column: elevator.column,
            row: elevator.row,
            direction: elevator.direction,
            doorTo: null
		}
        super( x, y, dummyDoor, id )
        this.elevatorModel = elevator;
        this.arcColor = "#00FF00";
    }
    get registryString(): string {
        return this.mapName + "_" + this.model.direction + "_" + this.model.column + "_" + this.model.row + "_ELEVATOR";
    }
}