import { LONG_TALK_4, RANDOM_TALK_2, RANDOM_TALK_3, RANDOM_TALK_4, RANDOM_TALK_1, RANDOM_TALK_5 } from '../../actionResources';
import A1 from './A1/A1';
import A2 from './A2/A2';
import A3 from './A3/A3';
import A4 from './A4/A4';
import B1 from './B1/B1';
import B2 from './B2/B2';
import B3 from './B3/B3';
import B4 from './B4/B4';
import C1 from './C1/C1';
import C2 from './C2/C2';
import C3 from './C3/C3';
import C4 from './C4/C4';
import D1 from './D1/D1';
import D2 from './D2/D2';
import D3 from './D3/D3';
import D4 from './D4/D4';
import E3 from './E3/E3';
import E4 from './E4/E4';
import NewtownHall from './C2/Newtown-Appartments/Newtown-Hall';
import NewtownAppartment1 from './C2/Newtown-Appartments/Newtown-left-bottom';
import NewtownAppartment2 from './C2/Newtown-Appartments/Newtown-left-top';
import NewtownAppartment3 from './C2/Newtown-Appartments/Newtown-top';
import NewtownAppartment4 from './C2/Newtown-Appartments/Newtown-right-top';
import NewtownAppartment5 from './C2/Newtown-Appartments/Newtown-right-bottom';
import { BALD_BEER_BELLY_GUY, BLACK_PONY_TAIL_LADY, BLONDE_BEER_BELLY_GUY, BLONDE_NERD_LADY, BURLY_GUY, DARK_HAIR_NERD_LADY, DORKY_GUY, FAT_BUFF_GUY, FAT_FEDORA_GUY, GRANNY, GREEN_HAIR_LADY, PINK_HAIR_NERD_LADY, STRONG_GUY, TOUGH_GUY, TOUGH_GUY_WITH_DARK_HAIR, WHITE_PONY_TAIL_LADY } from '../../spriteTypeResources';

export default {
    "name": "Leonard Heights",
    "horizontal_slots": ["A", "B", "C", "D", "E"], 
    "vertical_slots": ["1", "2", "3", "4"],
    "music": "Theme_Overworld_1_HDR.mp3",
    "cars": [ "car_b", "car_c", "bus" ], 
    "cars_spawn_rate" : 15000,
    "characters" : [
        TOUGH_GUY, STRONG_GUY, BURLY_GUY, GREEN_HAIR_LADY,
        DORKY_GUY, GRANNY, TOUGH_GUY_WITH_DARK_HAIR, FAT_BUFF_GUY,
        BALD_BEER_BELLY_GUY, BLONDE_BEER_BELLY_GUY, FAT_FEDORA_GUY, WHITE_PONY_TAIL_LADY,
        BLACK_PONY_TAIL_LADY, PINK_HAIR_NERD_LADY, BLONDE_NERD_LADY, DARK_HAIR_NERD_LADY
    ],
    "characters_spawn_rate": 10000,
    "spawnable_actions": [
        RANDOM_TALK_1,
        RANDOM_TALK_2,
        RANDOM_TALK_3,
        RANDOM_TALK_4, 
        RANDOM_TALK_5,
        LONG_TALK_4
    ],
    
    "mapDictionary": {
        // MAIN MAPS
        "A1": A1,
        "A2": A2,
        "A3": A3,
        "A4": A4,
        "B1": B1,
        "B2": B2,
        "B3": B3,
        "B4": B4,
        "C1": C1,
        "C2": C2,
        "C3": C3,
        "C4": C4,
        "D1": D1,
        "D2": D2,
        "D3": D3,
        "D4": D4,
        "E3": E3,
        "E4": E4,

        // C2 submaps
        // Newtown appartments.
        "Newtown-Hall": NewtownHall,
        "Newtown-appartment-1": NewtownAppartment1,
        "Newtown-appartment-2": NewtownAppartment2,
        "Newtown-appartment-3": NewtownAppartment3,
        "Newtown-appartment-4": NewtownAppartment4,
        "Newtown-appartment-5": NewtownAppartment5
    }
}