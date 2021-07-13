/**
 * An Asset instance stores the source of and asset as a string.
 * The instance will try to load the asset.
 */

class Asset {
    constructor( src, type, ID ) {
        this.isLoaded   = false;
        this.src        = src;
        this.type       = type;
        this.ID         = ID;

        this.startLoading( );
    }

    startLoading( ) {
        this.Asset      = this.type == "Image" ? new Image( ) : new Audio( );
        this.Asset.src  = this.src;
        this.Asset.onload = ( ) => {
            console.log( 'loaded ' + this.src + '!');
            this.loaded = true;
        }
    }
}

module.exports = {
    Asset
}