import type { EnterMapContract } from "../contracts/EnterMapContract";
import { registerNewContract } from "../contracts/contractRegistry";
import { CanvasTypeEnum } from "../enumerables/CanvasTypeEnum";
import { PlayerMapEntry } from "../enumerables/PlayerMapEntryEnum";
import { setTrigger } from "../event-triggers/triggerSetter";
import { getFocusCameraOnSpriteContract } from "../factories/contractFactory";
import { PLAYER_ID } from "../game-data/interactionGlobals";
import { getBackTilesGrid, getTileOnCanvasByCell } from "../game/canvas/canvasGetter";
import { initializeCanvasGrids, setMapModelToCanvasGrids } from "../game/canvas/canvasSetter";
import { registerNewMap, registerTilesBlockedByStaticSprites } from "../game/map/blockedTilesRegistry";
import { getSpriteById, getStaticSprites } from "../game/modules/sprites/spriteGetter";
import { getActiveMap, initializeNeighbourhood, markMapAsActive } from "../game/neighbourhoodModule";
import { setActiveMusic } from "../game/sound/sound";
import type { MapModel } from "../models/MapModel";
import type { TriggerModel } from "../models/TriggerModel";
import { determineMapNeighbourhood } from "../resources/mapResources/mapIds";
import { getTilesheetModelByKey } from "../resources/tilesheetResources";

export const loadMap = ( contract: EnterMapContract ): void => {
    const neighbourhoodKey = determineMapNeighbourhood( contract.mapId );
    initializeNeighbourhood( neighbourhoodKey );
    markMapAsActive( contract.mapId, PlayerMapEntry.door );

    const mapModelToLoad: MapModel = getActiveMap();
    initializeCanvasGrids( mapModelToLoad.columns, mapModelToLoad.rows );

    const sheetData = getTilesheetModelByKey( mapModelToLoad.tileSet );
    setMapModelToCanvasGrids( mapModelToLoad, sheetData, 0, true, [] );

    setTriggers( mapModelToLoad.triggers );
    setActiveMusic( mapModelToLoad.music );

    registerNewContract( getFocusCameraOnSpriteContract( PLAYER_ID, true ) );
    registerBlockedTilesOnMap();
}
const registerBlockedTilesOnMap = (): void => {
    const backGrid = getBackTilesGrid();
    const sprites = getStaticSprites();

    registerNewMap( backGrid );
    registerTilesBlockedByStaticSprites( sprites );
}
const setTriggers = ( triggerList: TriggerModel[] ): void => {
    triggerList.forEach( ( e ) => {
        if ( e.spriteId !== null && e.spriteId !== undefined ) {
            setSpriteBasedTrigger( e );
        }
        else if ( e.triggerType !== null && e.triggerType !== undefined ) {
            setTrigger( e );
        }
        else {
            setTileBasedTrigger( e );
        }
    } )
}
const setSpriteBasedTrigger = ( trigger: TriggerModel ): void => {
    const sprite = getSpriteById( trigger.spriteId );
    if ( sprite == null ) {
        console.error( `Error setting trigger ${trigger.eventId}. No sprite could be found with id ${sprite}` );
    }
    setTrigger( trigger, sprite );
}
const setTileBasedTrigger = ( trigger: TriggerModel ): void => {
    const tile = getTileOnCanvasByCell( {column: trigger.column, row: trigger.row }, CanvasTypeEnum.background )
    if ( tile == null ) {
        console.error( `Error setting trigger ${trigger.eventId}. No tile could be found a column ${trigger.column}, row ${trigger.row}` );
    }
    setTrigger( trigger, tile );
}