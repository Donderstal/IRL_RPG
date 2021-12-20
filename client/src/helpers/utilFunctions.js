const { FACING_LEFT, FACING_RIGHT, FACING_UP, FACING_DOWN } = require("../game-data/globals");

/**
 * Do a HTTP request to given url. Then, call the callback with the json response and callbackparams as arguments
 * @param {String} url 
 * @param {Function} callback 
 * @param {Any[]} callbackParams 
 */
const fetchJSONWithCallback = ( url, callback, callbackParams = [] ) => {
    fetch(url)
        .then( (response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status + " on url " + url);
            }
            return response.json()
        })
        .then( (json) => {
            callback(json, callbackParams) 
        }
    )
}
/**
 * Slides a div in at the bottom and top of screen to create a 'letterbox effect'
 */
const toggleLetterBoxDivs = ( ) => {
    const topDiv = document.getElementById('letterbox-top')
    const bottomDiv = document.getElementById('letterbox-bottom')
    const letterBoxDivHeight = topDiv.style.height;

    if ( topDiv.style.top == '0px' && bottomDiv.style.bottom == '0px' ) {
        topDiv.style.top = '-' + letterBoxDivHeight
        bottomDiv.style.bottom = '-' + letterBoxDivHeight
    }
    else {
        topDiv.style.top = '0px'
        bottomDiv.style.bottom = '0px'
    }

}

const idChars   = "abcdefghijklmnopqrstuvwxyz1234567890";
const idLength  = 10;
/**
 * Generate a 10-character idea that is not already in this list.
 * Recursive until a unique string has been found
 * @param {String[]} idList - list of already present ID's
 */
const getUniqueId = ( idList ) => {
    const newId         = generateId( )
    const isUniqueId    = true;

    if ( idList.length > 1 ) {
        for( var i = 0; i < idList.length; i++ ) {
            if ( idList[i] == newId ) {
                isUniqueId = false;
            }
        }
    }

    return ( isUniqueId ) ? newId : getUniqueId( idList );
}
/**
 * Construct and return a rondom 10-character string
 */
const generateId = ( ) => {
    let id = "";

    for( var i = 0; i < idLength; i++ ) {
        let randomPosition =  Math.floor( Math.random( ) * idChars.length );
        id += idChars.slice( randomPosition, randomPosition + 1 )
    }
    return id
}
/**
 * If currentIndex is not the last position in array, increment it by one.
 * Else, return 0 to start at the beginning of the array. 
 * @param {Number} currentIndex 
 * @param {Any[]} array 
 */
const getNextIndexInArray = ( currentIndex, array ) => {
    return ( currentIndex + 1 == array.length ) ? 0 : currentIndex += 1 ;
};
/**
 * If currentIndex is not the first position in array, decrement it by one.
 * Else, return the last index at the end of the array. 
 * @param {Number} currentIndex 
 * @param {Any[]} array 
 */
const getPreviousIndexInArray = ( currentIndex, array ) => {
    return ( currentIndex - 1 < 0 ) ? array.length - 1 : currentIndex - 1
};
/**
 * Return a by-value clone of given instance
 * @param {objecy} instance 
 */
const cloneInstance = ( instance ) => {
    return Object.assign(
        Object.create(
          Object.getPrototypeOf(instance),
        ),
        JSON.parse(JSON.stringify(instance)),
    );
}
/**
 * Return the opposite of given direction
 * @param {int} direction
 */
const getOppositeDirection = ( direction ) => {
    switch( direction ) {
        case FACING_LEFT:
            return FACING_RIGHT;
        case FACING_UP:
            return FACING_DOWN;
        case FACING_RIGHT:
            return FACING_LEFT;
        case FACING_DOWN: 
            return FACING_UP;
    }
}

const getRelativeRight = ( direction ) => {
    switch( direction ) {
        case FACING_LEFT:
            return FACING_DOWN;
        case FACING_UP:
            return FACING_LEFT;
        case FACING_RIGHT:
            return FACING_UP;
        case FACING_DOWN: 
            return FACING_RIGHT;
    }
}

const getRelativeLeft = ( direction ) => {
    switch( direction ) {
        case FACING_LEFT:
            return FACING_UP;
        case FACING_UP:
            return FACING_RIGHT;
        case FACING_RIGHT:
            return FACING_DOWN;
        case FACING_DOWN: 
            return FACING_LEFT;
    }
}

module.exports = {
    getUniqueId,
    fetchJSONWithCallback,
    toggleLetterBoxDivs,
    getNextIndexInArray,
    getPreviousIndexInArray,
    cloneInstance,
    getOppositeDirection,
    getRelativeLeft,
    getRelativeRight
}
