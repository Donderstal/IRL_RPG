import type { RoadAlignmentEnum } from "../../../enumerables/RoadAlignmentEnum";
import type { CellPosition } from "../../../models/CellPositionModel";
import type { RoadModel } from "../../../models/RoadModel";

import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { TileSquare } from "../../../helpers/TileSquare";
import { getAllActiveSprites } from "../../modules/sprites/spriteGetter";
import type { Tile } from "../../core/Tile";

export class RoadPosition extends TileSquare {
    direction: DirectionEnum;
    alignment: RoadAlignmentEnum;

    constructor( tiles: Tile[], model: RoadModel ) {
        super( tiles );
        this.direction = model.direction;
        this.alignment = model.alignment;
    }

    getRelativeStartingCell(): CellPosition {
        return { column: this.leftColumn, row: this.bottomRow, direction: this.direction };
    }

    isNotOccupied(): boolean {
        const sprites = getAllActiveSprites().filter( ( e ) => { return e.model.canMove });
        let notOccupied = true;
        let spriteIndex = 0;
        while ( notOccupied && spriteIndex < sprites.length ) {
            notOccupied = !this.spriteIsInTileSquare( sprites[spriteIndex] );
            spriteIndex++
        }
        return notOccupied;
    }

    getDirectionXy() {
        switch ( this.direction ) {
            case DirectionEnum.left:
                return { x: this.left, y: this.top, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow } };
            case DirectionEnum.up:
                return { x: this.left, y: this.top, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow } };
            case DirectionEnum.right:
                return { x: this.right, y: this.top, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow } };
            case DirectionEnum.down:
                return { x: this.left, y: this.bottom, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow } };
        }
    }
}