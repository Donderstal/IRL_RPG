import type { DirectionEnum } from "../../enumerables/DirectionEnum";
import type { TileModel } from "../../models/TileModel";
import { GRID_BLOCK_PX, GRID_BLOCK_IN_SHEET_PX, SHEET_XY_VALUES } from '../../game-data/globals';
import globals from '../../game-data/globals';
import { getBackCanvasContext } from '../../helpers/canvasHelpers';
import { OutOfMapEnum } from "../../enumerables/OutOfMapEnum";
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
    ctx: CanvasRenderingContext2D;
    row: number;
    column: number;

    model: TileModel;
    blocked: boolean;
    movementCost: number;

    direction: DirectionEnum;
    constructor( index: number|OutOfMapEnum, x: number, y: number, ctx: CanvasRenderingContext2D, row: number, column: number ) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.index = index;  
        this.model = {
            id: "E",
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
            const tilesheetXy = SHEET_XY_VALUES[this.model.id]
            this.drawTileToUtilityCanvas( sheetImage, tilesheetXy );
        
            this.ctx.drawImage(
                this.ctx == getBackCanvasContext( ) ? globals.GAME.utilBack.canvas : globals.GAME.utilFront.canvas, 
                0, 0,
                GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                this.x, this.y,
                GRID_BLOCK_PX, GRID_BLOCK_PX
            )
            if ( globals.GAME.debugMode ) {
                this.ctx.beginPath( )
                this.ctx.rect( this.x, this.y,GRID_BLOCK_PX, GRID_BLOCK_PX )
                this.ctx.stroke( )
                this.ctx.fillText( this.model.id.toString(), this.x + GRID_BLOCK_PX * .33, this.y + GRID_BLOCK_PX * .5, )
            }            
        }
    }

    drawTileToUtilityCanvas( sheetImage: HTMLImageElement, tilesheetXy: {x: number, y: number} ): void {
        const ctx = this.ctx == getBackCanvasContext( ) ? globals.GAME.utilBack.ctx : globals.GAME.utilFront.ctx;
        ctx.clearRect(0,0,GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX)
        this.model.mirrored ? ctx.setTransform( -1, 0, 0, 1, GRID_BLOCK_IN_SHEET_PX, 0 ) : ctx.setTransform(1,0,0,1,0,0);
        switch( this.model.angle ) {
            case 0: 
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                );
                break;
            case 90:
                ctx.translate( 0 + GRID_BLOCK_IN_SHEET_PX, 0 );
                ctx.rotate( 90 * ( Math.PI / 180 ) );
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                );  
                ctx.rotate( -(90 * ( Math.PI / 180 ) ))
                ctx.setTransform(1,0,0,1,0,0);
                break;
            case 180:
                ctx.translate( 0 + GRID_BLOCK_IN_SHEET_PX, 0 + GRID_BLOCK_IN_SHEET_PX );
                ctx.rotate( Math.PI );
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                ); 
                ctx.rotate( -Math.PI )
                ctx.setTransform(1,0,0,1,0,0);
                break;
            case 270:
                ctx.translate( 0, 0 + GRID_BLOCK_IN_SHEET_PX );
                ctx.rotate( 270 * ( Math.PI / 180 ) )
                ctx.drawImage( 
                    sheetImage, 
                    tilesheetXy.x, tilesheetXy.y, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX,
                    0, 0, GRID_BLOCK_IN_SHEET_PX, GRID_BLOCK_IN_SHEET_PX 
                );     
                ctx.rotate( -(270 * ( Math.PI / 180 )) )
                ctx.setTransform(1,0,0,1,0,0);
                break;
            default:
                alert('Error in flipping tile. Call the police!')
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
        this.model.id = "E"
    };
};