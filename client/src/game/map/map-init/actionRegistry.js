let actionRegistry;
const idChars   = "abcdefghijklmnopqrstuvwxyz1234567890";
const idLength  = 10;

const getNewActionId = ( ) => {
    var actionId = getUniqueId( )

    actionRegistry.push( actionId );

    return actionId;
}

const initNewActionRegistry = ( ) => {
    actionRegistry = [];
}

const getUniqueId = ( ) => {
    const newId         = generateId( )
    const isUniqueId    = true;

    for( var i = 0; i < actionRegistry.length; i++ ) {
        if ( actionRegistry[i] == newId ) {
            isUniqueId = false;
        }
    }

    return ( isUniqueId ) ? newId : getUniqueId( );
}

const generateId = ( ) => {
    let id = "";

    for( var i = 0; i < idLength; i++ ) {
        let randomPosition =  Math.floor( Math.random( ) * idChars.length );
        id += idChars.slice( randomPosition, randomPosition + 1 )
    }
    return id
}
module.exports = {
    getNewActionId,
    initNewActionRegistry
}