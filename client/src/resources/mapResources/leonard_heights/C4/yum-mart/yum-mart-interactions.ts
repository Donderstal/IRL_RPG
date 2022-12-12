import { ANIM_TURN_CIRCLE_POSITIONAL } from "../../../../../game-data/animationGlobals";
import { EMOTE_HEART } from "../../../../../game-data/textboxGlobals";
import type { CinematicModel } from "../../../../../models/CinematicModel";
import { getAnimateSpriteScene, getEmoteScene, getSpeakScene } from "../../../../cinematicFactory";
import { getDefaultCondition } from "../../../../conditionFactory";
import { getDefaultTalkInteraction } from "../../../../interactionFactory";

const CINSCRIPT_YUM_MART_OFFICE_GUY: CinematicModel = [
    [getSpeakScene( "I hate my wife..." )],
    [getSpeakScene( "But I'm loving these profits!" )],
    [getAnimateSpriteScene( ANIM_TURN_CIRCLE_POSITIONAL )],
    [getEmoteScene( EMOTE_HEART )]
]
export const C4_INTERACTION_YUM_MART_OFFICE_GUY = [
    getDefaultTalkInteraction( CINSCRIPT_YUM_MART_OFFICE_GUY, getDefaultCondition() )
];