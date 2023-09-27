import type { CutsceneSceneModel } from "../models/cutscenes/CutsceneSceneModel";
import type { CutsceneEventScript } from "../models/eventScripts/CutsceneEventScript";
import { checkIfEventScriptSceneIsFinished, dispatchContract } from "./eventScriptsContractHandler";

let activeCutsceneEventScript: CutsceneEventScript = null;
let activeSceneIndex: number = -1;
let activeScene: CutsceneSceneModel = null

export const handleActiveCutsceneEventScript = ( cutsceneEvent: CutsceneEventScript ): boolean => {
    if ( activeCutsceneEventScript === null ) {
        console.log( `Activating cutsceneEventScript!` )
        activateCutsceneEventScript( cutsceneEvent );
    }

    if ( activeScene === null ) {
        activeSceneIndex++;
        activeScene = getNextScene();
    }

    if ( activeScene === undefined ) {
        console.log( `Ending cutsceneEventScript!` )
        clearActiveCutsceneEventScript();
        return false;
    }
    else {
        console.log(`starting new cutscene scene with ${activeScene.length} animations`)
        startScene();
    }

    if ( checkIfEventScriptSceneIsFinished() ) {
        clearScene();
    }

    return true;
};
export const clearActiveCutsceneEventScript = (): void => {
    clearScene();
    activeCutsceneEventScript = null;
    activeSceneIndex = -1;
};
const activateCutsceneEventScript = ( cutsceneEvent: CutsceneEventScript ): void => {
    activeCutsceneEventScript = cutsceneEvent;
};
const getNextScene = (): CutsceneSceneModel => {
    return activeCutsceneEventScript.cutscene[activeSceneIndex];
};
const startScene = (): void => {
    activeScene.forEach( dispatchContract );
};
const clearScene = (): void => {
    console.log( `ending cutscene scene` )
    activeScene = null;
};