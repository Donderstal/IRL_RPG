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

    get isEmpty( ) { return this.items.length == 0; }
    get first( ) { return this.isEmpty ? false : this.items[0];}
    get last( ) { return this.isEmpty ? false :this.items[this.items.length - 1];}

    addItemToQueue( item, priority ) {
        const newItem = new ItemWithPriority( item, priority );
        let highestPriorityInList = true;

        for( var index = 0; index < this.items.length; index++ ) {
            if ( this.items[index].priority > newItem.priority ) {
                this.items.splice(index, 0, newItem)
                highestPriorityInList = false;
                return true;
            }
        }

        if ( highestPriorityInList ) {
            this.items.push(newItem)
        }
    }

    getFirstItemFromQueue( ) {
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