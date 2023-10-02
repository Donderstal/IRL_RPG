import { clearContractsRegistry } from "../contracts/contractRegistry";
import { clearTriggerRegistry } from "../event-triggers/triggerRegistry"
import { clearCanvasGridMaps, clearCanvasGrids } from "../game/canvas/canvasSetter";
import { clearBlockedTilesRegistry } from "../game/map/blockedTilesRegistry";
import { clearSpriteModuleRegistries } from "../game/modules/moduleRegistrySetter";
import { clearAllModuleRegistries } from "../game/modules/moduleSetter";
import { clearActiveSoundEffects } from "../game/sound/sound";
import { clearSpriteTriggerRelationRegistry } from "../registries/spriteTriggerRelationRegistry"

export const clearMap = (): void => {
    clearBlockedTilesRegistry();
    clearActiveSoundEffects();

    clearActiveSoundEffects();
    clearCanvasGridMaps();
    clearCanvasGrids();

    clearSpriteModuleRegistries();
    clearAllModuleRegistries();

    clearTriggerRegistry();
    clearSpriteTriggerRelationRegistry();
    clearContractsRegistry();
}