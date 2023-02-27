import { LH_BAKER_STREET_12_F1_APT_KEY, LH_BAKER_STREET_12_F1_STAIRS_KEY, LH_BAKER_STREET_12_F2_APT_KEY, LH_BAKER_STREET_12_F2_STAIRS_KEY, LH_BAKER_STREET_12_F3_APT_KEY, LH_BAKER_STREET_12_F3_STAIRS_KEY, LH_BAKER_STREET_12_F4_APT_KEY, LH_BAKER_STREET_12_F4_STAIRS_KEY, LH_BAKER_STREET_12_GF_KEY, LH_NEWTOWN_APP_1_KEY, LH_NEWTOWN_APP_2_KEY, LH_NEWTOWN_APP_3_KEY, LH_NEWTOWN_APP_4_KEY, LH_NEWTOWN_APP_5_KEY, LH_NEWTOWN_APP_HALL_KEY } from "../leonard_heights_res";
import BakerStreet12F1 from "./Baker-Street-12/Baker-Street-12-F1";
import BakerStreet12F1Hall from "./Baker-Street-12/Baker-Street-12-F1-Hall";
import BakerStreet12F2 from "./Baker-Street-12/Baker-Street-12-F2";
import BakerStreet12F2Hall from "./Baker-Street-12/Baker-Street-12-F2-Hall";
import BakerStreet12F3 from "./Baker-Street-12/Baker-Street-12-F3";
import BakerStreet12F3Hall from "./Baker-Street-12/Baker-Street-12-F3-Hall";
import BakerStreet12F4 from "./Baker-Street-12/Baker-Street-12-F4";
import BakerStreet12F4Hall from "./Baker-Street-12/Baker-Street-12-F4-Hall";
import BakerStreet12GF from "./Baker-Street-12/Baker-Street-12-GF";
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
    [LH_NEWTOWN_APP_5_KEY]: NewtownRightBottom,
    //

    //Baker Street 12
    [LH_BAKER_STREET_12_GF_KEY]: BakerStreet12GF,
    [LH_BAKER_STREET_12_F1_STAIRS_KEY]: BakerStreet12F1Hall,
    [LH_BAKER_STREET_12_F1_APT_KEY]: BakerStreet12F1,
    [LH_BAKER_STREET_12_F2_STAIRS_KEY]: BakerStreet12F2Hall,
    [LH_BAKER_STREET_12_F2_APT_KEY]: BakerStreet12F2,
    [LH_BAKER_STREET_12_F3_STAIRS_KEY]: BakerStreet12F3Hall,
    [LH_BAKER_STREET_12_F3_APT_KEY]: BakerStreet12F3,
    [LH_BAKER_STREET_12_F4_STAIRS_KEY]: BakerStreet12F4Hall,
    [LH_BAKER_STREET_12_F4_APT_KEY]: BakerStreet12F4,

    //
}