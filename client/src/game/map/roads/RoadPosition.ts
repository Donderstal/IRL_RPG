import type { RoadAlignmentEnum } from "../../../enumerables/RoadAlignmentEnum";
import type { RoadModel } from "../../../models/RoadModel";
import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import { TileSquare } from "../../../helpers/TileSquare";
import { getAllActiveSprites } from "../../modules/sprites/spriteGetter";
import type { Tile } from "../../core/Tile";
import type { DirectionXy } from "../../../models/DirectionXyModel";
import { cameraFocus } from "../../cameraFocus";
import type { GridCellModel } from "../../../models/GridCellModel";

export class RoadPosition extends TileSquare {
    id: string;
    direction: DirectionEnum;
    alignment: RoadAlignmentEnum;

    constructor( tiles: Tile[], model: RoadModel, id: string ) {
        super( tiles );
        this.id = id;
        this.direction = model.direction;
        this.alignment = model.alignment;
    }

    getRelativeStartingCell(): GridCellModel {
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

    getDirectionXy(): DirectionXy {
        switch ( this.direction ) {
            case DirectionEnum.left:
                return { x: this.left, y: this.top, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow }, id: this.id };
            case DirectionEnum.up:
                return { x: this.left, y: this.top, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow }, id: this.id };
            case DirectionEnum.right:
                return { x: this.right, y: this.top, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow }, id: this.id };
            case DirectionEnum.down:
                return { x: this.left, y: this.bottom, direction: this.direction, tile: { column: this.leftColumn, row: this.bottomRow }, id: this.id };
        }
    }

    isVisible(): boolean {
        const camera = cameraFocus;
        return camera.xyValueIsInView( this.left, this.top ) || camera.xyValueIsInView( this.left, this.bottom )
            || camera.xyValueIsInView( this.right, this.top ) || camera.xyValueIsInView( this.right, this.bottom )
    }
}