import { LH_NEWTOWN_APP_1_KEY, LH_NEWTOWN_APP_2_KEY, LH_NEWTOWN_APP_3_KEY, LH_NEWTOWN_APP_4_KEY, LH_NEWTOWN_APP_5_KEY, LH_NEWTOWN_APP_HALL_KEY } from "../leonard_heights_res";
import NewtownHall from "./Newtown-Appartments/Newtown-Hall";
import NewtownLeftBottom from "./Newtown-Appartments/Newtown-left-bottom";
import NewtownLeftTop from "./Newtown-Appartments/Newtown-left-top";
import NewtownRightBottom from "./Newtown-Appartments/Newtown-right-bottom";
import NewtownRightTop from "./Newtown-Appartments/Newtown-right-top";
import NewtownTop from "./Newtown-Appartments/Newtown-top";

export default {
    // Newtown appartments.
    [LH_NEWTOWN_APP_HALL_KEY]: NewtownHall,
    [LH_NEWTOWN_APP_1_KEY]: NewtownLeftBottom,
    [LH_NEWTOWN_APP_2_KEY]: NewtownLeftTop,
    [LH_NEWTOWN_APP_3_KEY]: NewtownTop,
    [LH_NEWTOWN_APP_4_KEY]: NewtownRightTop,
    [LH_NEWTOWN_APP_5_KEY]: NewtownRightBottom
    //
}