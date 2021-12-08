/**
 * Format data for display in Modal based on modalContentType
 * @param {string} modalContentType string representing the type of content the modal requests
 * @param {array} contentSource list of source objects for modal content
 */
const getModalContent = ( modalContentType, contentSource = null ) => {
    switch( modalContentType ) {
        case "YES_OR_NO":
            return [ { "text": "YES"}, { "text": " NO" } ];
        case "SELECT_PARTY_MEMBER":
            return getPartyMembersForModal( contentSource );
        case "SELECT_ITEM":
            return getActiveItemsInCategory( contentSource );
    }
}

/**
 * Return member data formatted for display in I_Modal
 * @param {array} members globals.GAME.PARTY_MEMBERS
 */
const getPartyMembersForModal = ( members ) => {
    let modalContent = []
    members.forEach( ( member, index ) => {
        modalContent.push( 
            { text: member.Name, index: index, png: member.Sprite }
        )
    });

    return modalContent;
}
/**
 * Filter items from the player inventory based on the equipmenttype select in the menu
 * @param {Game} GAME 
 */
const getActiveItemsInCategory = ( GAME ) => {
    let items = GAME.PLAYER_ITEMS;
    let filteredItems;
    let equipmentType = GAME.MENU.ACTIVE_TAB.activeItem[0];
    if ( equipmentType == "W" ) {
        filteredItems = items.filter( ( e ) => { console.log(e); return e.Item.Category == equipmentType && e.Quantity > 0 } );
    }
    else {
        filteredItems = items.filter( ( e ) => { console.log(e); return e.Item.Type == equipmentType && e.Quantity > 0 } );
    }
    return filteredItems;
}

module.exports = {
    getModalContent
}