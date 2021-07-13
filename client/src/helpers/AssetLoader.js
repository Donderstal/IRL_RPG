const { CANVAS_WIDTH, CANVAS_HEIGHT, BATTLE_FONT_SIZE } = require("../game-data/globals");
const { Asset } = require("./Asset");
const { drawRect, writeTextLine } = require("./canvasHelpers");
const { getUniqueId } = require("./utilFunctions");

class AssetLoader {
    constructor( ) {
        this.assetList = [];
        this.assetIDList = [];
    }

    get loadingAssets( ) { return this.assetList.length >= 1; }

    getAssetByID( ID ) {
        return this.assetList[assetID];
    }

    drawLoadingScreen( ) {
        drawRect( "FRONT", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#000000" )
        writeTextLine( "Loading...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, BATTLE_FONT_SIZE);
        
        if ( this.loadingAssets ) {
            console.log( "are the assets loaded?");
            console.log( this.checkIfAssetsAreLoaded( ) );            
        }
    }

    checkIfAssetsAreLoaded( ) {
        this.assetList.forEach( ( e ) => {
            if ( !e.isLoaded ) {
                return false;
            }
        });

        return true;
    }

    addAsset( src, type ) {
        console.log( src + " " + type )
        const assetID = getUniqueId( this.assetIDList )
        this.assetIDList.push( assetID );
        this.assetList.push( new Asset( src, type, assetID ) );
        return assetID;
    }
}

module.exports = {
    AssetLoader
}