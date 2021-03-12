const YES_OR_NO = [ { "text": "YES"}, { "text": " NO" } ];

/**
 * Format data for display in Modal based on modalContentType
 * @param {string} modalContentType string representing the type of content the modal requests
 * @param {array} contentSource list of source objects for modal content
 */
const getModalContent = ( modalContentType, contentSource = null ) => {
    switch( modalContentType ) {
        case "YES_OR_NO":
            return YES_OR_NO;
        case "SELECT_PARTY_MEMBER":
            return getPartyMembersForModal( contentSource )
    }
}

/**
 * Return member data formatted for display in I_Modal
 * @param {array} members globals.GAME.PARTY_MEMBERS
 */
const getPartyMembersForModal = ( members ) => {
    let modalContent = []
    members.forEach( ( member ) => {
        modalContent.push( 
            { text: member.Name }
        )
    });

    return modalContent;
}

module.exports = {
    getModalContent
}