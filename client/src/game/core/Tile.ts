import type { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { TileModel } from "../../models/TileModel";
import { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES } from '../../game-data/globals';
import globals from '../../game-data/globals';
import { OutOfMapEnum } from "../../enumerables/OutOfMapEnum";
import type { CanvasTypeEnum } from "../../enumerables/CanvasTypeEnum";
import { drawTileToUtilityCanvas, getUtilityCanvas } from "../controllers/uiCanvasController";
/**
 * The Tile class is the most basic building block of the game.
 * Each map is divided up in a grid of rows and columns with an Grid instance.
 * Each cell in that map is represented by a Tile instance with an array-index and xy position.
 * The Tile stores information about a tile's state and interactivity
 * This could be the presence of a door or sprite or wether a tile can be crossed by sprites
 */
export class Tile {
    index: number | OutOfMapEnum;

    x: number;
    y: number;
    ctx: OffscreenCanvasRenderingContext2D;
    row: number;
    column: number;

    model: TileModel;
    blocked: boolean;
    movementCost: number;
    canvasType: CanvasTypeEnum

    direction: DirectionEnum;
    constructor( index: number | OutOfMapEnum, x: number, y: number, ctx: OffscreenCanvasRenderingContext2D, row: number, column: number, canvasType: CanvasTypeEnum ) {
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

        this.movementCost = 1;
    };

    get isBlocked( ): boolean { 
        return !this.offScreen && this.blocked;
    }

    get isEmpty( ): boolean {
        return this.model.id === "E" || this.model.id === null;
    }

    get offScreen(): boolean {
        return this.index === OutOfMapEnum.left || this.index === OutOfMapEnum.up || this.index === OutOfMapEnum.right || this.index === OutOfMapEnum.down;
    }

    setMovementCost( value: number ): void {
        this.movementCost = value;
    }

    drawTileInMap( sheetImage: HTMLImageElement ): void {
        if ( this.isEmpty ) {
            return;
        }
        else {
            const tilesheetXy = SHEET_XY_VALUES[this.model.id];
            drawTileToUtilityCanvas( this, sheetImage, this.canvasType );
        
            this.ctx.drawImage(
                getUtilityCanvas( this.canvasType ), 
                0, 0,
                GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                this.x, this.y,
                GRID_BLOCK_PX, GRID_BLOCK_PX
            )
            if ( globals.GAME.debugMode ) {
                this.ctx.beginPath( )
                this.ctx.rect( this.x, this.y,GRID_BLOCK_PX, GRID_BLOCK_PX )
                this.ctx.stroke()
                this.ctx.fillStyle = 'white';
                this.ctx.fillText( `ID:${this.model.id.toString()}`, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .25, )
                this.ctx.fillText( `C:${this.column}`, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .50, )
                this.ctx.fillText( `R:${this.row}`, this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .75, )
            }            
        }
    }

    setSettings( settings: {} ): void {
        this.model.mirrored = settings['mirrored'];
        this.model.angle = settings['angle'];
    }

    setTileID( id: number|string ): void {
        this.model.id = id;
    };

    clearTileID( ): void {
        this.model.id = null;
    };
};