import { MAP_IDS } from "../../mapIds";
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
    [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_GF]: SardineStudiosStairsBottom,
    [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_COMMUNAL_SPACE]: SardineStudiosCommunalSpace,

        /// Sardine f1
        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_F1]: SardineStudiosStairsFloor1,
        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_CORRIDOR_F1]: SardineStudiosFloor1Hall,
        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_F1_APT1]: SardineStudiosFloor1App1,
        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_F1_APT2]: SardineStudiosFloor1App2,
        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_F1_APT3]: SardineStudiosFloor1App3,
        //

        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_F2]: SardineStudioStairsFloor2,
        [MAP_IDS.LEONARD_HEIGHTS.SARDINE_STUDIOS_HALL_F3]: SardineStudioStairsTop,
    //
}