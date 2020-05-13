const docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Get value of input fiel with ID
const getInputVal = (id) => {
    return document.getElementById(id).value
}   

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


let buttonsAreHidden = false;

const hideButtons = ( ) => {
    switchHideButtonStyle( buttonsAreHidden )    
    const allButtons = Array.from( document.getElementsByTagName('button') );

    allButtons.forEach( ( e ) => {
        if ( e.id !== 'hide-buttons-button' ) {
            if ( buttonsAreHidden ) {
                e.style.visibility = 'visible'
                document.getElementById('hide-buttons-button').innerText = "HIDE BUTTONS"
            }
            else {
                e.style.visibility =  'hidden'
                document.getElementById('hide-buttons-button').innerText = "SHOW"                    
            }

        }
    })


    buttonsAreHidden = !buttonsAreHidden;
}

const switchHideButtonStyle = ( buttonsAreHidden ) => {
    const hideUiButton = document.getElementById('hide-buttons-button')
    if ( !buttonsAreHidden ) {
        hideUiButton.style.border = "1px groove white";
        hideUiButton.style.borderRadius = "6.25vh";
        hideUiButton.style.backgroundColor = "black";
        hideUiButton.style.color = "white";
        hideUiButton.style.opacity = "0.5";        
    }
    else {
        hideUiButton.style.border = "1px groove #D68Fd6;";
        hideUiButton.style.borderRadius = "5px;"
        hideUiButton.style.backgroundColor = "#464F51;";
        hideUiButton.style.color = "w#defff2";
        hideUiButton.style.opacity = "1";        
    }

}

module.exports = {
    docReady,
    getInputVal,
    fetchJSONWithCallback,
    downloadObjectAsJson,
    hideButtons,
    switchHideButtonStyle
}
