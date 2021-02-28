const { getItemDataById } = require('../../resources/itemResources')

const uiSpritesFolder = "/static/ui/"

class GameItem {
    constructor( itemTypeId ) {
        this.ItemTypeId = itemTypeId;
        this.setItemData( );
        this.setImage( );
    }

    setItemData(  ) {
        const data = getItemDataById( this.itemTypeId )
        this.Name = data.name;
        this.Category = data.category;
        this.Price = data.price
        this.SpriteSrc = data.png;
        this.Description = data.description
    }

    setImage( ) {
        this.ImageLoaded = false;
        this.Image = new Image( );
        this.Image.src = uiSpritesFolder + this.SpriteSrc + ".png";
        this.Image.onload = ( ) => {
            this.ImageLoaded = true;
            console.log(this)
        }
    }

    performAction( actor, target ) {
        this.action.execute( );
    }
}

module.exports = {
    GameItem
}