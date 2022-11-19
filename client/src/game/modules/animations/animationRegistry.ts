import type { SpriteAnimation } from "../../map/map-classes/SpriteAnimation";

let animationDictionary: { [key in string]: SpriteAnimation } = {};

export const addAnimationToRegistry = ( id: string, animation: SpriteAnimation ): void => {
	animationDictionary[id] = animation;
}
export const deleteAnimationFromRegistry = ( id: string ): void => {
	delete animationDictionary[id];
}
export const getAnimationRegistry = (): { [key in string]: SpriteAnimation } => {
	return animationDictionary;
}
export const clearAnimationRegistry = (): void => {
	animationDictionary = {};
}