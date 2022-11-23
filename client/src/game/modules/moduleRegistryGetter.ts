import type { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import { spriteModuleIsRunning } from "./moduleRegistry";

export const moduleIsRunningForSprite = ( spriteId: string, moduleType: SpriteModuleEnum ): boolean => {
    return spriteModuleIsRunning( spriteId, moduleType );
}