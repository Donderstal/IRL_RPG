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

const downloadObjectAsJson = ( exportObj, exportName ) => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
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

module.exports = {
    fetchJSONWithCallback,
    downloadObjectAsJson,
    toggleLetterBoxDivs
}
