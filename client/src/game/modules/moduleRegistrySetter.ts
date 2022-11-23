import type { SpriteModuleEnum } from "../../enumerables/SpriteModuleEnum";
import { clearSpriteModules, setModuleState } from "./moduleRegistry";
import type { ModuleState } from "./ModuleState";

export const markModuleAsActive = ( spriteId: string, moduleType: SpriteModuleEnum ) => {
	const state = createModuleState( true, true );
	setModuleState( spriteId, moduleType, state );
}
export const markModuleAsInActive = ( spriteId: string, moduleType: SpriteModuleEnum ) => {
	const state = createModuleState( true, false )
	setModuleState( spriteId, moduleType, state );
}
export const clearSpriteModuleRegistries = (): void => {
	clearSpriteModules();
}
const createModuleState = ( set: boolean, active: boolean ): ModuleState => {
	const state: ModuleState = {
		set: set,
		active: active
	};
	return state;
}