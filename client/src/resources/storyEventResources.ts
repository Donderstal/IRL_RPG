import { DirectionEnum } from "../enumerables/DirectionEnum";
import { getDefaultCondition } from "./../factories/conditionFactory";
import { getDefaultTalkInteraction } from "./../factories/interactionFactory";
import { LH_BAKER_STREET_12_F3_APT_KEY, LH_NEWTOWN_APP_3_KEY, LH_NEWTOWN_APP_4_KEY, LH_NEWTOWN_APP_5_KEY, LH_NEWTOWN_APP_HALL_KEY } from "./mapResources/leonard_heights/leonard_heights_res";
import { CINSCRIPT_INTRO_CINEMATIC, CINSCRIPT_STORY_1, CINSCRIPT_STORY_2, CINSCRIPT_STORY_3, CINSCRIPT_STORY_4 } from "./storyCinematicResources";
import { getOnInteractionStoryEvent, getOnPositionStoryEvent, getOnEnterStoryEvent, getOnLeaveStoryEvent } from "./../factories/storyEventFactory";

const EVENTKEY_INTRO_CINEMATIC = "STORY_INTRO_CINEMATIC";

const EVENTKEY_STORY_EVENT_1 = "EVENTKEY_SE1";
const EVENTKEY_STORY_EVENT_2 = "EVENTKEY_SE2";
const EVENTKEY_STORY_EVENT_3 = "EVENTKEY_SE3";
const EVENTKEY_STORY_EVENT_4 = "EVENTKEY_SE4";

const INTRO_CINEMATIC_EVENT = [getDefaultTalkInteraction( CINSCRIPT_INTRO_CINEMATIC, getDefaultCondition() )]
const STORY_INTRO_CINEMATIC_EVENT = getOnEnterStoryEvent(
    LH_BAKER_STREET_12_F3_APT_KEY, EVENTKEY_INTRO_CINEMATIC, INTRO_CINEMATIC_EVENT
);


const INTERACTION_STORY_EVENT_1 = [getDefaultTalkInteraction( CINSCRIPT_STORY_1, getDefaultCondition() )]
const STORY_EVENT_1 = getOnPositionStoryEvent(
    LH_NEWTOWN_APP_4_KEY, EVENTKEY_STORY_EVENT_1, INTERACTION_STORY_EVENT_1, { column: 3, direction: DirectionEnum.right }
);

const INTERACTION_STORY_EVENT_2 = [getDefaultTalkInteraction( CINSCRIPT_STORY_2, getDefaultCondition() )]
const STORY_EVENT_2 = getOnInteractionStoryEvent(
    LH_NEWTOWN_APP_5_KEY, EVENTKEY_STORY_EVENT_2, INTERACTION_STORY_EVENT_2, "Shady guy"
);

const INTERACTION_STORY_EVENT_3 = [getDefaultTalkInteraction( CINSCRIPT_STORY_3, getDefaultCondition() )]
const STORY_EVENT_3 = getOnLeaveStoryEvent(
    LH_NEWTOWN_APP_3_KEY, EVENTKEY_STORY_EVENT_3, INTERACTION_STORY_EVENT_3
);

const INTERACTION_STORY_EVENT_4 = [getDefaultTalkInteraction( CINSCRIPT_STORY_4, getDefaultCondition() )]
const STORY_EVENT_4 = getOnEnterStoryEvent(
    LH_NEWTOWN_APP_HALL_KEY, EVENTKEY_STORY_EVENT_4, INTERACTION_STORY_EVENT_4
);


export const STORY_EVENT_LIST = [
    STORY_INTRO_CINEMATIC_EVENT
]