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

module.exports = {
    getUniqueId,
    fetchJSONWithCallback,
    toggleLetterBoxDivs
}
