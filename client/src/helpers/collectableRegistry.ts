import { CollectableType } from "../enumerables/CollectableTypeEnum";

export class CollectableRegistry {
    coins: string[];
    totalCoins: number;

    juiceCans: string[];
    totalJuiceCans: number;
    constructor( ) {
        this.coins = [];
        this.totalCoins = 100;

        this.juiceCans = [];
        this.totalJuiceCans = 100;
    }

    get hasAllCoins(): boolean { return this.coins.length === this.totalCoins; };
    get hasAllJuiceCans( ): boolean { return this.juiceCans.length === this.totalJuiceCans }

    loadRegistry( savedRegistry: { coins: string[]; juiceCans: string[] } ): void {
        this.coins = savedRegistry.coins;
        this.juiceCans = savedRegistry.juiceCans;
    }

    addToRegistry( collectableId: string, type: CollectableType ): void {
        switch( type ) {
            case CollectableType.coin: 
                this.coins.push(collectableId);
                break;
            case CollectableType.can:
                this.juiceCans.push(collectableId);
                break;
        }
    }

    isInRegistry( collectableId: string, type: CollectableType ): boolean {
        switch( type ) {
            case CollectableType.coin: 
                return this.coins.indexOf(collectableId) > -1;
            case CollectableType.can:
                return this.juiceCans.indexOf(collectableId) > -1;
        }
    }

    getCollectableId( column: number, row: number, type: CollectableType, mapName: string ): string {
        return `col_${column}_row_${row}_${mapName}_${type}`;
    }

    exportRegistry(): { coins: string[]; juiceCans: string[] } {
        return {
            coins: this.coins,
            juiceCans: this.juiceCans
        }
    }

    setRegistry( registryObject: { coins: string[]; juiceCans: string[] } ): void {
        this.coins      = registryObject.coins;
        this.juiceCans  = registryObject.juiceCans;
    }
}