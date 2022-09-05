import { TileSquare } from "../../../helpers/TileSquare";
import globals from "../../../game-data/globals";
import { DirectionEnum } from "../../../enumerables/DirectionEnum";
import type { Road } from './Road';
import type { Sprite } from "../../core/Sprite";

export class I_Junction {
    directions: DirectionEnum[];
    directionsIn: DirectionEnum[];
    directionsOut: DirectionEnum[];
    openLanes: { [key in DirectionEnum]: boolean };
    intersectionCars: Sprite[]
    roads: Road[];

    laneDepth: number;
    core: TileSquare;
    leftFacingInLane: TileSquare;
    leftFacingOutLane: TileSquare;
    upFacingInLane: TileSquare;
    upFacingOutLane: TileSquare;
    rightFacingInLane: TileSquare;
    rightFacingOutLane: TileSquare;
    downFacingInLane: TileSquare;
    downFacingOutLane: TileSquare;
    constructor( ) {
        this.directions = [];
        this.roads      = [];

        this.core;
        this.intersectionCars = [];

        this.directionsIn = [];
        this.directionsOut = [];

        this.leftFacingInLane = null;
        this.leftFacingOutLane = null;

        this.upFacingInLane = null;
        this.upFacingOutLane = null;
        
        this.rightFacingInLane = null;
        this.rightFacingOutLane = null;

        this.downFacingInLane = null;
        this.downFacingOutLane = null;
    }

    get leftFacingRoad(): Road { return this.roads.filter( ( e ) => { return e.model.direction == DirectionEnum.left; })[0]; };
    get upFacingRoad(): Road { return this.roads.filter( ( e ) => { return e.model.direction == DirectionEnum.up; })[0]; };
    get rightFacingRoad(): Road { return this.roads.filter( ( e ) => { return e.model.direction == DirectionEnum.right; })[0]; };
    get downFacingRoad(): Road { return this.roads.filter( ( e ) => { return e.model.direction == DirectionEnum.down; })[0]; };

    hasDirection( direction: DirectionEnum ): boolean {
        return this.directions.indexOf(direction) > -1;
    }

    directionEnds( direction: DirectionEnum ): boolean {
        return this.directionsIn.indexOf(direction) > -1 && this.directionsOut.indexOf(direction) == -1;
    }

    directionStarts( direction: DirectionEnum ): boolean {
        return this.directionsOut.indexOf(direction) > -1 && this.directionsIn.indexOf(direction) == -1;
    }

    checkIfRoadsEndOrStartAtIntersection( ): void {
        this.roads.forEach( ( road ) => {
            switch ( road.model.direction ) {
                case DirectionEnum.left:
                    if ( this.core.leftColumn != road.model.secondaryColumn )
                        this.directionsOut.push( DirectionEnum.left );
                    if ( this.core.rightColumn != road.model.primaryColumn )
                        this.directionsIn.push( DirectionEnum.left );
                    break;
                case DirectionEnum.up:
                    if ( this.core.topRow != road.model.secondaryRow )
                        this.directionsOut.push( DirectionEnum.up );
                    if ( this.core.bottomRow != road.model.primaryRow )
                        this.directionsIn.push( DirectionEnum.up );
                    break;                
                case DirectionEnum.right:
                    if ( this.core.rightColumn != road.model.secondaryColumn )
                        this.directionsOut.push( DirectionEnum.right );
                    if ( this.core.leftColumn != road.model.primaryColumn )
                        this.directionsIn.push( DirectionEnum.right );
                    break; 
                case DirectionEnum.down:
                    if ( this.core.bottomRow != road.model.secondaryRow )
                        this.directionsOut.push( DirectionEnum.down );
                    if ( this.core.topRow != road.model.primaryRow )
                        this.directionsIn.push( DirectionEnum.down );
                    break; 
            }
        })
    }

    setLanes( ): void {
        this.directions.forEach( ( e ) => {
            this.setLane( e )
        });
    }

    setLane( direction: DirectionEnum ): void {
        if ( direction == DirectionEnum.left ) {
            if (!this.directionStarts(DirectionEnum.left) ) {
                this.leftFacingInLane = new TileSquare(
                    this.pushTilesToList(this.core.rightColumn, this.leftFacingRoad.model.primaryRow, this.core.rightColumn, this.leftFacingRoad.model.secondaryRow, direction)
                );         
            }
            if (!this.directionEnds(DirectionEnum.left) ) {
                this.leftFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.core.leftColumn - 3, this.leftFacingRoad.model.primaryRow, this.core.leftColumn - 3, this.leftFacingRoad.model.secondaryRow, direction)
                );
            }
        }
        if ( direction == DirectionEnum.up) {
            if ( !this.directionStarts(DirectionEnum.up) ) {
                this.upFacingInLane = new TileSquare(
                    this.pushTilesToList(this.upFacingRoad.model.primaryColumn, this.core.bottomRow, this.upFacingRoad.model.secondaryColumn, this.core.bottomRow, direction)
                );
            }
            if (!this.directionEnds(DirectionEnum.up)) {
                this.upFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.upFacingRoad.model.primaryColumn, this.core.topRow - 3, this.upFacingRoad.model.secondaryColumn, this.core.topRow - 3, direction)
                );
            }
        }
        if ( direction == DirectionEnum.right ) {
            if (!this.directionStarts(DirectionEnum.right)) {
                this.rightFacingInLane = new TileSquare(
                    this.pushTilesToList(this.core.leftColumn - 3, this.rightFacingRoad.model.primaryRow, this.core.leftColumn - 3, this.rightFacingRoad.model.secondaryRow, direction)
                );
            }
            if (!this.directionEnds(DirectionEnum.right)) {
                this.rightFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.core.rightColumn, this.rightFacingRoad.model.primaryRow, this.core.rightColumn, this.rightFacingRoad.model.secondaryRow, direction)
                );
            }         
        }
        if ( direction == DirectionEnum.down ) {
            if ( !this.directionStarts(DirectionEnum.down) ) {
                this.downFacingInLane = new TileSquare(
                    this.pushTilesToList(this.downFacingRoad.model.primaryColumn, this.core.topRow - 3, this.downFacingRoad.model.secondaryColumn, this.core.topRow - 3, direction)
                );
            }
            if ( !this.directionEnds(DirectionEnum.down)) {
                this.downFacingOutLane = new TileSquare(
                    this.pushTilesToList(this.downFacingRoad.model.primaryColumn, this.core.bottomRow, this.downFacingRoad.model.secondaryColumn, this.core.bottomRow, direction)
                );
            }
        }
    }

    pushTilesToList( col1: number, row1: number, col2: number, row2: number, direction: DirectionEnum ) {
        const FRONT = globals.GAME.FRONT
        return [
            FRONT.getTileAtCell( col1, row1 ),
            FRONT.getTileAtCell( col1, row2 ),
            FRONT.getTileAtCell( col2, row1 ),
            FRONT.getTileAtCell( col2, row2 ),
        ];
    }

    checkForCarsOnSquare( cars: Sprite[], square: TileSquare ): boolean {
        let carOnLane = null;
        cars.forEach( (car) => {
            if ( square.spriteIsInTileSquare(car) ) {
                carOnLane = true;
            }
        })
        return carOnLane;
    }
}