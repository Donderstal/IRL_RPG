import { GameItem } from "./GameItem";

/**
 * A StackedItem class represents a stack of a GameItem in an Inventory instance
 * This class tracks how many of the GameItem are equipped or in the inventory
 */
export class StackedItem {
    Item: GameItem;
    BaseQuantity: number;
    EquippedQuantity: number;
    constructor( itemTypeId ) {
        this.Item = new GameItem( itemTypeId );
        this.BaseQuantity = 1;
        this.EquippedQuantity = 0;
    }

    get ItemTypeId( ): string { return this.Item.ItemTypeId; }
    get Quantity( ): number { return this.BaseQuantity - this.EquippedQuantity; }
    get IsEmpty( ): boolean { return this.Quantity < 1; }

    addItem(): void {
        this.BaseQuantity += 1;
    }

    subtractItem(): void {
        this.BaseQuantity -= 1;
    }

    equipItem(): void {
        this.EquippedQuantity += 1;
    }

    unequipItem( ): void {
        this.EquippedQuantity -= 1;
    }
}