class ItemWithPriority {
    constructor( item, priority ) {
        this.item = item;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor( ) {
        this.items = [];
    }

    get isEmpty( ) { this.items.length == 0; }
    get first( ) { return this.isEmpty ? false : this.items[0];}
    get last( ) { return this.isEmpty ? false :this.items[this.items.length - 1];}

    addItemToQueue( item, priority ) {
        const newItem = ItemWithPriority( item, priority );
        const highestPriorityInList = true;

        this.items.some( ( queuedItem, index ) => {
            if ( queuedItem.priority > newItem.priority ) {
                console.log(queuedItem);
                console.log(newItem);
                this.items.splice(index, 0, newItem)
                highestPriorityInList = false;
                return true;
            }
        } );

        if ( highestPriorityInList ) {
            this.items.push(newItem)
        }
    }

    getFirstInQueue( ) {
        if ( this.isEmpty ) {
            console.log( 'queue is empty')
        }
        return this.items.shift( )
    }

    queueToConsole( ) {
        let string = "";
        for (var i = 0; i < this.items.length; i++)
            string += this.items[i].item + " ";
        return string;
    }
}

module.exports = { 
    PriorityQueue
}