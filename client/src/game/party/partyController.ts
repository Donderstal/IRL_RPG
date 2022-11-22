import { MAIN_CHARACTER } from "../../resources/spriteTypeResources";
import type { Inventory } from "./Inventory";
import { Party } from "./Party";

const startingItemIDs = ["phone_misc_1", "kitty_necklace_armor_3", "dirty_beanie_armor_3", "key_1"];
let party: Party = null;

export const setNewParty =  ( name: string ): void => {
    party = new Party( [
        { name: name, className: MAIN_CHARACTER }
    ] );
    party.addItemsToInventory( startingItemIDs );
}
export const getParty = (): Party => {
    return party;
}
export const getInventory = (): Inventory => {
    return party.inventory;
}