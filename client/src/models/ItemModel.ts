import type { ItemCategoryEnum } from "../enumerables/ItemCategoryEnum";

export type ItemModel = {
    name: string;
    key: string;
    category: ItemCategoryEnum;
    png: string;
    description: string;
}