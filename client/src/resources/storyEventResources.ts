import { DirectionEnum } from "../enumerables/DirectionEnum";
import { getDefaultCondition } from "./../factories/conditionFactory";
import { getDefaultTalkInteraction } from "./../factories/interactionFactory";
import { LH_BAKER_STREET_12_F3_APT_KEY } from "./mapResources/leonard_heights/leonard_heights_res";
import { CINSCRIPT_INTRO_CINEMATIC } from "./storyCinematicResources";
import { getOnEnterStoryEvent } from "./../factories/storyEventFactory";

const INTRO_CINEMATIC_EVENT = [getDefaultTalkInteraction( CINSCRIPT_INTRO_CINEMATIC, getDefaultCondition() )]
const STORY_INTRO_CINEMATIC_EVENT = getOnEnterStoryEvent(
    LH_BAKER_STREET_12_F3_APT_KEY, "STORY_INTRO_CINEMATIC", INTRO_CINEMATIC_EVENT
);


export const STORY_EVENT_LIST = [
    STORY_INTRO_CINEMATIC_EVENT
]