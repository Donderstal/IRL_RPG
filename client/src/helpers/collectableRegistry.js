const { COLLECTABLE_COIN, COLLECTABLE_JUICE_CAN } = require("../game-data/interactionGlobals");

class CollectableRegistry {
    constructor( ) {
        this.coins = [];
        this.totalCoins = 100;

        this.juiceCans = [];
        this.totalJuiceCans = 100;
    }

    get hasAllCoins( ) { return this.coins.length === this.totalCoins; };
    get hasAllJuiceCans( ) { return this.juiceCans === this.totalJuiceCans }

    loadRegistry( savedRegistry ) {
        this.coins = savedRegistry.coins;
        this.juiceCans = savedRegistry.juiceCans;
    }

    addToRegistry( collectableId, type ) {
        switch( type ) {
            case COLLECTABLE_COIN: 
                this.coins.push(collectableId);
                break;
            case COLLECTABLE_JUICE_CAN:
                this.juiceCans.push(collectableId);
                break;
            default:
                console.log(`${type} is not a valid collectable type`)
        }
    }

    isInRegistry( collectableId, type ) {
        switch( type ) {
            case COLLECTABLE_COIN: 
                return this.coins.indexOf(collectableId) > -1;
            case COLLECTABLE_JUICE_CAN:
                return this.juiceCans.indexOf(collectableId) > -1;
            default:
                console.log(`${type} is not a valid collectable type`)
        }
    }

    getCollectableId( col, row, type, mapName ) {
        return `col_${col}_row_${row}_${mapName}_${type}`;
    }

    exportRegistry( ) {
        return {
            'coins': this.coins,
            'juiceCans': this.juiceCans
        }
    }

    loadRegistry( registryObject ) {
        this.coins      = registryObject.coins;
        this.juiceCans  = registryObject.juiceCans;
    }
}

module.exports = {
    CollectableRegistry
}