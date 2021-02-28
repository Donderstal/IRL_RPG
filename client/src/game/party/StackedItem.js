class StackedItem {
    constructor( item ) {
        this.Item = item;
        this.Quantity = 1;
    }

    get Item( ) { return this.Item }
    get IsEmpty( ) { return this.Quantity < 1 }

    add( ) {
        this.Quantity += 1;
    }

    subtract( ) {
        this.Quantity -= 1;
    }
}