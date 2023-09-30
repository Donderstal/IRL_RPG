import type { EnterMapContract } from "../contracts/EnterMapContract";
import { registerNewContract } from "../contracts/contractRegistry";
import { AnimationTypeEnum } from "../enumerables/AnimationTypeEnum";
import { PlayerMapEntry } from "../enumerables/PlayerMapEntryEnum";
import { getCreateSpriteContract, getFocusCameraOnSpriteContract, getSetTriggerContract } from "../factories/contractFactory";
import { initCanvasObjectModel } from "../factories/modelFactory";
import { CANVAS_COLUMNS, CANVAS_HEIGHT, CANVAS_ROWS, CANVAS_WIDTH, GRID_BLOCK_PX } from "../game-data/globals";
import { PLAYER_ID, PLAYER_NAME } from "../game-data/interactionGlobals";
import { getBackTilesGrid } from "../game/canvas/canvasGetter";
import { initializeCanvasGrids, setCanvasGridsDimensions, setMapModelToCanvasGrids } from "../game/canvas/canvasSetter";
import { registerNewMap, registerTilesBlockedByStaticSprites } from "../game/map/blockedTilesRegistry";
import { getStaticSprites } from "../game/modules/sprites/spriteGetter";
import { getActiveMap, getNeighbourhoodModel, initializeNeighbourhood, markMapAsActive } from "../game/neighbourhoodModule";
import { setActiveMusic } from "../game/sound/sound";
import { conditionIsTrue } from "../helpers/conditionalHelper";
import { getOppositeDirection } from "../helpers/utilFunctions";
import type { CanvasObjectModel } from "../models/CanvasObjectModel";
import type { MapModel } from "../models/MapModel";
import type { TriggerModel } from "../models/TriggerModel";
import { determineMapNeighbourhood } from "../resources/mapResources/mapIds";
import { MAIN_CHARACTER } from "../resources/spriteTypeResources";
import { getTilesheetModelByKey } from "../resources/tilesheetResources";
import { setLoadingMapGameState } from "../state/state";

export const loadMap = ( contract: EnterMapContract ): void => {
    setLoadingMapGameState( true );

    const neighbourhoodKey = determineMapNeighbourhood( contract.mapId );
    initializeNeighbourhood( neighbourhoodKey );
    markMapAsActive( contract.mapId, PlayerMapEntry.door );

    setCanvasDimensions();

    const mapModelToLoad: MapModel = getActiveMap();
    initializeCanvasGrids( mapModelToLoad.columns, mapModelToLoad.rows );

    const sheetData = getTilesheetModelByKey( mapModelToLoad.tileSet );
    setMapModelToCanvasGrids( mapModelToLoad, sheetData, 0 );

    registerCreateSpriteContracts( mapModelToLoad.sprites );
    registerCreatePlayerSpriteContract( contract, mapModelToLoad );

    registerTriggerContracts( mapModelToLoad.triggers );

    let neighbourhoodModel = getNeighbourhoodModel();
    setActiveMusic( mapModelToLoad.music ?? neighbourhoodModel.music );

    registerNewContract( getFocusCameraOnSpriteContract( PLAYER_ID, true ) );
}
export const registerBlockedTilesOnMap = (): void => {
    const backGrid = getBackTilesGrid();
    const sprites = getStaticSprites();

    registerNewMap( backGrid );
    registerTilesBlockedByStaticSprites( sprites );
}
const registerTriggerContracts = ( triggers: TriggerModel[] ): void => {
    triggers.forEach( ( e ) => {
        const contract = getSetTriggerContract( e );
        registerNewContract( contract );
    })
}
const registerCreateSpriteContracts = ( spriteDtos: CanvasObjectModel[] ): void => {
    let spritesToCreate = spriteDtos.filter( ( e ) => {
        return e.hasCondition ? conditionIsTrue( e.condition.type, e.condition.value ) : true;
    } )
    spritesToCreate.forEach( ( e ) => {
        const contract = getCreateSpriteContract( e );
        registerNewContract( contract );
    } );
}
const registerCreatePlayerSpriteContract = ( contract: EnterMapContract, mapModelToLoad: MapModel ): void => {
    let playerStart = contract.doorId === null || contract.doorId === undefined
        ? contract.playerStart
        : mapModelToLoad.triggers.filter( e => e.eventId === contract.doorId )[0];
    console.log( `setting player sprite to column ${playerStart.column}, row ${playerStart.row}` );

    if ( playerStart === undefined ) {
        console.error( `Found no start for PlayerSprite while loading map!` );
        console.log( contract );
    }

    const playerSpriteModel = initCanvasObjectModel(
        {
            type: MAIN_CHARACTER,
            direction: getOppositeDirection( playerStart.direction ) ?? 0,
            column: playerStart.column,
            row: playerStart.row,
            anim_type: AnimationTypeEnum.idle,
            name: PLAYER_NAME,
            id: PLAYER_ID
        }
    );
    const createSpriteContract = getCreateSpriteContract( playerSpriteModel );
    registerNewContract( createSpriteContract );
}
const setCanvasDimensions = (): void => {
    const map = getActiveMap();
    if ( map.outdoors ) {
        let neighbourhoodModel = getNeighbourhoodModel();
        const width = neighbourhoodModel.horizontalSlots.length * CANVAS_WIDTH;
        const height = neighbourhoodModel.verticalSlots.length * CANVAS_HEIGHT;
        setCanvasGridsDimensions( width, height )
    }
    else if ( map.columns > CANVAS_COLUMNS || map.rows > CANVAS_ROWS ) {
        setCanvasGridsDimensions( map.columns * GRID_BLOCK_PX, map.rows * GRID_BLOCK_PX );
    }
    else {
        setCanvasGridsDimensions( CANVAS_WIDTH, CANVAS_HEIGHT );
    }
}
