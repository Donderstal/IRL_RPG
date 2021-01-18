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

const getUniqueId = ( idList ) => {
    const newId         = generateId( )
    const isUniqueId    = true;

    for( var i = 0; i < idList.length; i++ ) {
        if ( idList[i] == newId ) {
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
    getUniqueId,
    fetchJSONWithCallback,
    toggleLetterBoxDivs
}
