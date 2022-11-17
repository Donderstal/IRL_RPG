import { CollectableType } from "../enumerables/CollectableTypeEnum";

let coins: string[] = [];
let totalCoins = 100;

let juiceCans: string[] = [];
let totalJuiceCans = 100;

export const loadCollectableRegistry = ( savedRegistry: { coins: string[]; juiceCans: string[] } ): void => {
    coins = savedRegistry.coins;
    juiceCans = savedRegistry.juiceCans;
}

export const addCollectableToRegistry = ( collectableId: string, type: CollectableType ): void => {
    switch ( type ) {
        case CollectableType.coin:
            coins.push( collectableId );
            break;
        case CollectableType.can:
            juiceCans.push( collectableId );
            break;
    }
}

export const isInCollectableRegistry = ( collectableId: string, type: CollectableType ): boolean => {
    switch ( type ) {
        case CollectableType.coin:
            return coins.indexOf( collectableId ) > -1;
        case CollectableType.can:
            return juiceCans.indexOf( collectableId ) > -1;
    }
}

export const getCollectableId = ( column: number, row: number, type: CollectableType, mapName: string ): string => {
    return `col_${column}_row_${row}_${mapName}_${type}`;
}

export const exportCollectableRegistry = (): { coins: string[]; juiceCans: string[] } => {
    return {
        coins: coins,
        juiceCans: juiceCans
    }
}

export const setCollectableRegistry = ( registryObject: { coins: string[]; juiceCans: string[] } ): void => {
    coins = [...registryObject.coins];
    juiceCans = [...registryObject.juiceCans];
}