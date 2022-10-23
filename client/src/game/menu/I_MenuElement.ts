import { GRID_BLOCK_PX, CANVAS_WIDTH, CANVAS_HEIGHT } from "../../game-data/globals";
import { BUBBLE_TOP, BUBBLE_MIDDLE, BUBBLE_BOTTOM, BUBBLE_LEFT_TOP, BUBBLE_RIGHT_TOP, BUBBLE_LEFT_BOTTOM, BUBBLE_RIGHT_BOTTOM, BUBBLE_RIGHT, BUBBLE_LEFT } from "../../game-data/textboxGlobals";
import { drawBubblePart } from "./menuHelpers";

export class I_MenuElement {
    utilCanvas: OffscreenCanvas;
    utilCtx: OffscreenCanvasRenderingContext2D;
    isActive: boolean;
    borders: string[];
    frameCounter: number;
    frameLimit: number;
    animate: boolean;

    x: number;
    y: number;
    columns: number;
    rows: number;
    width: number;
    height: number;
    rowStyles: string[];
    constructor( x: number, y, columns: number, rows: number, rowStyles: string[], borders: string[] = null, isActive = false ) {
        this.utilCanvas = new OffscreenCanvas( CANVAS_WIDTH, CANVAS_HEIGHT );
        this.utilCtx = this.utilCanvas.getContext( '2d' );
        this.isActive = isActive;
        this.borders = borders;
        this.frameCounter = 0;
        this.frameLimit = 20;
        this.animate = false;

        this.initElement( x, y, columns, rows, rowStyles );
    }

    initElement( x: number, y, columns: number, rows: number, rowStyles: string[] ): void {
        this.x = x;
        this.y = y;
        this.columns = columns;
        this.rows = rows;
        this.height = this.rows * GRID_BLOCK_PX;
        this.width = this.columns * GRID_BLOCK_PX
        this.rowStyles = rowStyles;
    }

    drawElement( ctx: OffscreenCanvasRenderingContext2D ): void {
        this.utilCtx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT )
        for( let i = 0; i < this.rows; i++ ) {
            const rowStyle = this.rowStyles[i];
            if ( rowStyle === BUBBLE_TOP ) {
                this.drawRow( BUBBLE_LEFT_TOP, BUBBLE_TOP, BUBBLE_RIGHT_TOP, i )
            }
            else if ( rowStyle === BUBBLE_MIDDLE ) {
                this.drawRow( BUBBLE_LEFT, BUBBLE_MIDDLE, BUBBLE_RIGHT, i )            
            }
            else if ( rowStyle === BUBBLE_BOTTOM ) {
                this.drawRow( BUBBLE_LEFT_BOTTOM, BUBBLE_BOTTOM, BUBBLE_RIGHT_BOTTOM, i )
            }
        }

        ctx.drawImage(
            this.utilCanvas,
            0, 0,
            GRID_BLOCK_PX * this.columns, GRID_BLOCK_PX * this.rows,
            this.x, this.y, 
            GRID_BLOCK_PX * this.columns, GRID_BLOCK_PX * this.rows
        );
    }

    drawRow( first: string, middle: string, last: string, rowCounter: number ): void {
        for( let i = 0; i < this.columns; i++ ) {
            if ( i === 0 ) {
                drawBubblePart( first, { x: GRID_BLOCK_PX * i, y : rowCounter * GRID_BLOCK_PX }, this.utilCtx );
            }
            else if ( i === this.columns - 1 ) {
                drawBubblePart( last, { x: GRID_BLOCK_PX * i, y : rowCounter * GRID_BLOCK_PX }, this.utilCtx );
            }
            else {
                drawBubblePart( middle, { x: GRID_BLOCK_PX * i, y : rowCounter * GRID_BLOCK_PX }, this.utilCtx );                
            }
        }
    }

    drawBorders( ctx: OffscreenCanvasRenderingContext2D ): void {
        this.borders.forEach( ( e ): void => {
            let startX;
            let startY;
            let endX;
            let endY;
            switch(e) {
                case "L":
                    startX = this.x;
                    startY = this.y;
                    startX = this.x;
                    startY = this.y + this.height;                    
                    break;
                case "T":
                    startX = this.x;
                    startY = this.y;
                    startX = this.x + this.width;
                    startY = this.y;     
                    break;
                case "R":
                    startX = this.x + this.width;
                    startY = this.y;
                    startX = this.x + this.width;
                    startY = this.y + this.height;     
                    break;
                case "B":
                    startX = this.x;
                    startY = this.y + this.height;
                    startX = this.x + this.width;
                    startY = this.y + this.height;   
                    break;
            }

            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        })
    }

    countFrameForAnimation( ctx: OffscreenCanvasRenderingContext2D ): void {
        this.frameCounter++
        if ( this.frameCounter > this.frameLimit ) {
            this.frameCounter = 0;
            this.animate = !this.animate;
        }

        if ( this.animate ) {
            this.elementAnimation( ctx )
        }
    }

    elementAnimation( ctx: OffscreenCanvasRenderingContext2D ): void { }
}