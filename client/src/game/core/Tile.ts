import type { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { TileModel } from "../../models/TileModel";
import { GRID_BLOCK_PX } from '../../game-data/globals';
import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { getTilesheetImageForTile, getTilesheetXy } from "../../helpers/tileSheetHelpers";
import type { TilesheetModel } from "../../models/TilesheetModel";
import { cameraFocus } from "../cameraFocus";
import { getGameState } from "../../state/state";
import { StateType } from "../../enumerables/StateType";
/**
 * The Tile class is the most basic building block of the game.
 * Each map is divided up in a grid of rows and columns with an Grid instance.
 * Each cell in that map is represented by a Tile instance with an array-index and xy position.
 * The Tile stores information about a tile's state and interactivity
 * This could be the presence of a door or sprite or wether a tile can be crossed by sprites
 */
export class Tile {
    index: number;

    x: number;
    y: number;
    ctx: OffscreenCanvasRenderingContext2D;
    row: number;
    column: number;
    drawn: boolean;

    model: TileModel;
    blocked: boolean;
    movementCost: number;
    canvasType: CanvasTypeEnum

    direction: DirectionEnum;
    constructor( index: number, x: number, y: number, ctx: OffscreenCanvasRenderingContext2D, row: number, column: number, canvasType: CanvasTypeEnum ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.index = index;  
        this.canvasType = canvasType;
        this.model = {
            id: null,
            angle: 0,
            mirrored: false
        }

        this.row = row;
        this.column = column;

        this.blocked = false;
        this.direction = null;
        this.drawn = false;

        this.movementCost = 1;
    };

    get width(): number { return GRID_BLOCK_PX; }
    get height(): number { return GRID_BLOCK_PX; }
    get isEmpty( ): boolean {
        return this.model.id === null;
    }

    setMovementCost( value: number ): void {
        this.movementCost = value;
    }

    drawTileInMap( sheetModel: TilesheetModel ): void {
        if ( this.isEmpty ) {
            return;
        }
        else {
            const tilesheetXy = getTilesheetXy( this.model, sheetModel );
            const sheet = getTilesheetImageForTile( this.model, sheetModel )

            this.ctx.drawImage(
                sheet, 
                tilesheetXy.x, tilesheetXy.y,
                GRID_BLOCK_PX, GRID_BLOCK_PX,
                this.x, this.y,
                GRID_BLOCK_PX, GRID_BLOCK_PX
            )
            if ( getGameState( StateType.debugMode ) ) {
                this.ctx.beginPath( )
                this.ctx.rect( this.x, this.y,GRID_BLOCK_PX, GRID_BLOCK_PX )
                this.ctx.stroke()
                this.ctx.fillStyle = 'black';
                this.ctx.fillText( `ID:${this.model.id.toString()}`, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .25, )
                this.ctx.fillText( `C:${this.column}`, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .50, )
                this.ctx.fillText( `R:${this.row}`, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .75, )
            }            
        }
        this.drawn = true;
    }

    setSettings( settings: {} ): void {
        this.model.mirrored = settings['mirrored'];
        this.model.angle = settings['angle'];
    }

    setTileID( id: number ): void {
        this.model.id = id;
    };

    clearTileID( ): void {
        this.model.id = null;
    };

    isVisible(): boolean {
        return cameraFocus.xyValueIsInView( this.x, this.y )
            || cameraFocus.xyValueIsInView( this.x + GRID_BLOCK_PX, this.y )
            || cameraFocus.xyValueIsInView( this.x, this.y + GRID_BLOCK_PX )
            || cameraFocus.xyValueIsInView( this.x + GRID_BLOCK_PX, this.y + GRID_BLOCK_PX );
    }
};