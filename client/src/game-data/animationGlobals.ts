// Generic non-directional animations
export const ANIM_TURN_CIRCLE           = "ANIM TURN CIRCLE";
export const ANIM_BACK_AND_FORTH        = "BACK AND FORTH";
export const ANIM_LEFT_AND_RIGHT        = "LEFT AND RIGHT";
export const ANIM_BACK_AND_FORTH_STEP   = "BACK AND FORTH STEP";
export const ANIM_LEFT_AND_RIGHT_STEP = "LEFT AND RIGHT STEP";

// Generic positional animations
export const ANIM_TURN_CIRCLE_POSITIONAL = "ANIM TURN CIRCLE_POSITIONAL";
export const ANIM_BACK_AND_FORTH_POSITIONAL = "BACK AND FORTH_POSITIONAL";
export const ANIM_BACK_AND_FORTH_STEP_POSITIONAL = "BACK AND FORTH STEP_POSITIONAL";

// Fighting animations (for right/left directions only)
export const ANIM_PUNCH                 = "ANIM_PUNCH"
export const ANIM_SPRITE_HIT          = "ANIM_STANDARD_HIT";
export const ANIM_CAST                  = "ANIM_CAST";
export const ANIM_SELECTION             = "ANIM_SELECTION"
export const ANIM_BREATHE               = "ANIM_BREATHE"
export const ANIM_POWER_UP              = "ANIM_POWER_UP"

// Generic directional animations
export const ANIM_BOP                   = "ANIM_BOP";
export const ANIM_BLINK                 = "ANIM_BLINK";
export const ANIM_TALK                  = "ANIM_TALK";

// Unique sprite-specific animations
export const ANIM_LIFT                  = "LIFT";
export const ANIM_HACK                  = "ANIM_NECKBEARD_HACK"

// Non-character idle animation
export const ANIM_SIGN_IDLE_HORI        = "ANIM_SIGN_IDLE_HORI";
export const ANIM_SIGN_IDLE_HORI_LONG   = "ANIM_SIGN_IDLE_HORI_LONG";

export const ANIM_SIGN_IDLE_VERT        = "ANIM_SIGN_IDLE_VERT";
export const ANIM_SIGN_IDLE_VERT_LONG   = "ANIM_SIGN_IDLE_VERT_LONG";

export const ANIM_COLLECTABLE_IDLE      = "ANIM_COLLECTABLE_IDLE";
export const ANIM_COLLECTABLE_IDLE_LONG = "ANIM_COLLECTABLE_IDLE";

///
export const DIRECTIONAL_ANIMS = [
    ANIM_HACK, ANIM_TALK, ANIM_BLINK, ANIM_BOP,
    ANIM_POWER_UP, ANIM_BREATHE, ANIM_SELECTION,
    ANIM_CAST, ANIM_SPRITE_HIT, ANIM_PUNCH
]

export const POSITIONAL_ANIMS = [
    ANIM_TURN_CIRCLE_POSITIONAL, ANIM_BACK_AND_FORTH_POSITIONAL, ANIM_BACK_AND_FORTH_STEP_POSITIONAL
];

export const CHARACTER_IDLE_ANIMS = [ANIM_BACK_AND_FORTH_POSITIONAL, ANIM_BOP, ANIM_BLINK]
export const COLLECTABLE_ANIMS = [ANIM_COLLECTABLE_IDLE, ANIM_COLLECTABLE_IDLE_LONG];
export const SIGN_HORI_ANIMS = [ANIM_SIGN_IDLE_HORI, ANIM_SIGN_IDLE_HORI_LONG];
export const SIGN_VERT_ANIMS = [ANIM_SIGN_IDLE_VERT, ANIM_SIGN_IDLE_VERT_LONG];