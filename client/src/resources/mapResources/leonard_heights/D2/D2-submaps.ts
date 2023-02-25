import { LH_SARDINE_STUDIOS_COMMON_AREA_KEY, LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY, LH_SARDINE_STUDIOS_FLOOR1_APP2_KEY, LH_SARDINE_STUDIOS_FLOOR1_APP3_KEY, LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY, LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY, LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY, LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY, LH_SARDINE_STUDIOS_STAIRS_TOP_KEY } from "../leonard_heights_res";
import SardineStudioStairsFloor2 from "./Sardine-Studios/Sardine-Studio-stairs-floor-2";
import SardineStudioStairsTop from "./Sardine-Studios/Sardine-Studio-stairs-top";
import SardineStudiosCommunalSpace from "./Sardine-Studios/Sardine-Studios-communal-space";
import SardineStudiosFloor1App1 from "./Sardine-Studios/Sardine-Studios-floor1-app1";
import SardineStudiosFloor1App2 from "./Sardine-Studios/Sardine-Studios-floor1-app2";
import SardineStudiosFloor1App3 from "./Sardine-Studios/Sardine-Studios-floor1-app3";
import SardineStudiosFloor1Hall from "./Sardine-Studios/Sardine-Studios-floor1-hall";
import SardineStudiosStairsBottom from "./Sardine-Studios/Sardine-Studios-stairs-bottom";
import SardineStudiosStairsFloor1 from "./Sardine-Studios/Sardine-studios-stairs-floor-1";

export default {
    // Sardine Studios
    [LH_SARDINE_STUDIOS_STAIRS_BOTTOM_KEY]: SardineStudiosStairsBottom,
    [LH_SARDINE_STUDIOS_COMMON_AREA_KEY]: SardineStudiosCommunalSpace,

        /// Sardine f1
        [LH_SARDINE_STUDIOS_STAIRS_FLOOR1_KEY]: SardineStudiosStairsFloor1,
        [LH_SARDINE_STUDIOS_FLOOR1_HALL_KEY]: SardineStudiosFloor1Hall,
        [LH_SARDINE_STUDIOS_FLOOR1_APP1_KEY]: SardineStudiosFloor1App1,
        [LH_SARDINE_STUDIOS_FLOOR1_APP2_KEY]: SardineStudiosFloor1App2,
        [LH_SARDINE_STUDIOS_FLOOR1_APP3_KEY]: SardineStudiosFloor1App3,
        //

        [LH_SARDINE_STUDIOS_STAIRS_FLOOR2_KEY]: SardineStudioStairsFloor2,
        [LH_SARDINE_STUDIOS_STAIRS_TOP_KEY]: SardineStudioStairsTop,
    //
}