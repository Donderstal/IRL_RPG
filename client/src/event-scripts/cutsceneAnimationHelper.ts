import type { AnimationScene } from "../models/cutscenes/SceneAnimationModel";

export const checkIfCutsceneAnimationHasEnded = ( scene: AnimationScene ): boolean => {
    return true;
}
export const startCutsceneAnimation = ( scene: AnimationScene ): void => {
    console.log(`start animationScene ${scene.type}`)
}